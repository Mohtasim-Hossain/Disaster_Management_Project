import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axios';

const VolunteerDashboard = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    axiosInstance.get('volunteer-dashboard/')  // Fetch volunteer dashboard data
      .then((response) => {
        setMessage(response.data.message);
      })
      .catch(() => {
        setMessage('Error loading dashboard.');
      });
  }, []);

  return (
    <div>
      <h2>Volunteer Dashboard</h2>
      <p>{message}</p>
    </div>
  );
};

export default VolunteerDashboard;
