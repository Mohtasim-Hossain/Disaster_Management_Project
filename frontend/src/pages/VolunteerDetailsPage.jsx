import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams to access URL parameters
import axiosInstance from '../api/axios'; // Import the Axios instance for API requests

const VolunteerDetailsPage = () => {
  const { id } = useParams(); // Get the volunteer ID from the URL parameters
  const [volunteer, setVolunteer] = useState(null); // State to store volunteer details

  useEffect(() => {
    // Fetch volunteer details when the component mounts or the ID changes
    axiosInstance.get(`volunteer/${id}/`)
      .then(response => {
        setVolunteer(response.data); // Update state with fetched data
      })
      .catch(error => {
        console.error('Error fetching volunteer details:', error); // Log any errors
      });
  }, [id]);

  // Show loading message while data is being fetched
  if (!volunteer) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold mb-4">{volunteer.username}</h1>
        <p><strong>Age:</strong> {volunteer.age}</p>
        <p><strong>Email:</strong> {volunteer.email}</p>
        <p><strong>Availability:</strong> {volunteer.is_available ? 'Available' : 'Unavailable'}</p>
        <p><strong>Skills:</strong> {volunteer.skills.join(', ')}</p> {/* Assuming skills is an array */}
        <p><strong>Assigned Task:</strong> {volunteer.assigned_task}</p>
        <p><strong>Assigned Location:</strong> {volunteer.assigned_location}</p>
        <p><strong>Status:</strong> {volunteer.is_verified ? 'Verified' : 'Unverified'}</p>
      </div>
    </div>
  );
};

export default VolunteerDetailsPage; // Export the component for use in other parts of the app
