import React, { useState } from 'react';
import axiosInstance from '../api/axios'; // Import Axios instance for API requests
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

const ReportCrisisPage = () => {
  // Initialize form data state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    severity: 'low',
    required_help: '',
    submitted_by: '',
    image: null, // For file upload
  });
  const [isSubmitted, setIsSubmitted] = useState(false); // Track submission status
  const navigate = useNavigate(); // Create navigate function for redirection

  // Handle changes in input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle file input changes
  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Get the first file
    setFormData({
      ...formData,
      image: file ? file : null, // Set image to null if no file is selected
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission

    // Create a FormData object for file upload
    const formDataToSend = new FormData();
    for (const key in formData) {
      if (formData[key] !== null) { // Only append if the value is not null
        formDataToSend.append(key, formData[key]);
      }
    }

    // Send a POST request to report the crisis
    axiosInstance.post('crisis/report/', formDataToSend, {
      headers: {
        'Content-Type': 'multipart/form-data', // Set content type for file upload
      }
    })
      .then(response => {
        setIsSubmitted(true); // Update submission status
      })
      .catch(error => {
        console.error('Error reporting crisis:', error.response ? error.response.data : error.message);
      });
  };

  // Redirect to the crisis list page
  const handleRedirect = () => {
    navigate('/crisis'); // Use navigate to redirect
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Report a Crisis</h1>
      {isSubmitted ? (
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <p>Thank you! Your crisis has been reported and will be visible to others after admin approval.</p>
          <button onClick={handleRedirect} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
            Go to Crisis List
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
          <input
            type="text"
            name="title"
            placeholder="Crisis Title"
            value={formData.title}
            onChange={handleChange}
            required
            className="mb-4 p-2 border border-gray-300 rounded w-full"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            required
            className="mb-4 p-2 border border-gray-300 rounded w-full"
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            required
            className="mb-4 p-2 border border-gray-300 rounded w-full"
          />
          <select name="severity" value={formData.severity} onChange={handleChange} className="mb-4 p-2 border border-gray-300 rounded w-full">
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
            className="mb-4 p-2 border border-gray-300 rounded w-full"
          />
          <input
            type="text"
            name="submitted_by"
            placeholder="Your Name (optional)"
            value={formData.submitted_by}
            onChange={handleChange}
            className="mb-4 p-2 border border-gray-300 rounded w-full"
          />
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
            className="mb-4"
          />
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded w-full">
            Report Crisis
          </button>
        </form>
      )}
    </div>
  );
};

export default ReportCrisisPage; // Export the ReportCrisisPage component
