import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../api/axios';

const VolunteerDetailsPage = () => {
  const { id } = useParams();
  const [volunteer, setVolunteer] = useState(null);

  useEffect(() => {
    axiosInstance.get(`volunteer/${id}/`)
      .then(response => {
        setVolunteer(response.data);
      })
      .catch(error => {
        console.error('Error fetching volunteer details:', error);
      });
  }, [id]);

  if (!volunteer) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{volunteer.username}</h1>
      <p>Age: {volunteer.age}</p>
      <p>Email: {volunteer.email}</p>
      <p>Availability: {volunteer.is_available ? 'Available' : 'Unavailable'}</p>
      <p>Skills: {volunteer.skills}</p>
      <p>Assigned Task: {volunteer.assigned_task}</p>
      <p>Assigned Location: {volunteer.assigned_location}</p>
      <p>Status: {volunteer.is_verified ? 'Verified' : 'Unverified'}</p>
    </div>
  );
};

export default VolunteerDetailsPage;
