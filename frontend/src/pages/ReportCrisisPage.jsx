import React, { useState } from 'react';
import axiosInstance from '../api/axios';
import { useNavigate } from 'react-router-dom';

const ReportCrisisPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    severity: 'low',
    required_help: '',
    submitted_by: '',
    image: null,  // For file upload
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      image: file ? file : null,  // Set image to null if no file is selected
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    for (const key in formData) {
      if (formData[key] !== null) {  // Only append if the value is not null
        formDataToSend.append(key, formData[key]);
      }
    }

    axiosInstance.post('crisis/report/', formDataToSend, {
      headers: {
        'Content-Type': 'multipart/form-data',  // Ensure correct encoding
      }
    })
      .then(response => {
        setIsSubmitted(true);  // Show confirmation message
      })
      .catch(error => {
        console.error('Error reporting crisis:', error.response ? error.response.data : error.message);
      });
};

  const handleRedirect = () => {
    navigate('/crisis');  // Redirect to the crisis list page
  };

  return (
    <div>
      <h1>Report a Crisis</h1>
      {isSubmitted ? (
        <div>
          <p>Thank you! Your crisis has been reported and will be visible to others after admin approval.</p>
          <button onClick={handleRedirect}>Go to Crisis List</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Crisis Title"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            required
          />
          <select name="severity" value={formData.severity} onChange={handleChange}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
          </select>
          <textarea
            name="required_help"
            placeholder="Required Help"
            value={formData.required_help}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="submitted_by"
            placeholder="Your Name (optional)"
            value={formData.submitted_by}
            onChange={handleChange}
          />
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
          />
          <button type="submit">Report Crisis</button>
        </form>
      )}
    </div>
  );
};

export default ReportCrisisPage;
