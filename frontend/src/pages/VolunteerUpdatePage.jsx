import React, { useState, useEffect } from 'react'; // Import necessary React hooks
import { useParams, useNavigate } from 'react-router-dom'; // Import routing hooks
import axiosInstance from '../api/axios'; // Import Axios instance for API requests
import Header from '../components/Header'; // Import Header component
import Footer from '../components/Footer'; // Import Footer component

const VolunteerUpdatePage = () => {
  const { id } = useParams(); // Get the volunteer ID from URL parameters
  const navigate = useNavigate(); // Initialize navigation
  const [volunteer, setVolunteer] = useState({
    is_verified: false, // Initial verification status
    assigned_task: '', // Initial assigned task
    assigned_location: '', // Initial assigned location
  });

  // Fetch the volunteer details on component mount
  useEffect(() => {
    axiosInstance.get(`/admin/volunteer/update/${id}`)
      .then(response => {
        setVolunteer(response.data); // Set volunteer data in state
      })
      .catch(error => {
        console.error('Error fetching volunteer:', error); // Log any errors
      });
  }, [id]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    axiosInstance.patch(`/admin/volunteer/update/${id}/`, volunteer) // Update volunteer data
      .then(() => {
        alert('Volunteer updated successfully!'); // Notify user of success
        navigate('/admin/dashboard'); // Redirect to dashboard
      })
      .catch(error => {
        console.error('Error updating volunteer:', error); // Log any errors
      });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header /> {/* Render the Header */}
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Update Volunteer</h1> {/* Page title */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Verification Status */}
          <div className="flex items-center space-x-2">
            <label className="text-gray-700">Verified</label>
            <input
              type="checkbox"
              checked={volunteer.is_verified} // Controlled checkbox
              onChange={(e) => setVolunteer({ ...volunteer, is_verified: e.target.checked })} // Update state on change
              className="form-checkbox"
            />
          </div>

          {/* Assigned Task */}
          <div>
            <label className="block text-gray-700">Assigned Task</label>
            <input
              type="text"
              value={volunteer.assigned_task} // Controlled input for task
              onChange={(e) => setVolunteer({ ...volunteer, assigned_task: e.target.value })} // Update state on change
              className="w-full px-4 py-2 border border-gray-300 rounded"
              placeholder="Assign a task"
            />
          </div>

          {/* Assigned Location */}
          <div>
            <label className="block text-gray-700">Assigned Location</label>
            <input
              type="text"
              value={volunteer.assigned_location} // Controlled input for location
              onChange={(e) => setVolunteer({ ...volunteer, assigned_location: e.target.value })} // Update state on change
              className="w-full px-4 py-2 border border-gray-300 rounded"
              placeholder="Assign a location"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Update Volunteer
          </button>
        </form>
      </div>
      <Footer /> {/* Render the Footer */}
    </div>
  );
};

export default VolunteerUpdatePage; // Export the component
