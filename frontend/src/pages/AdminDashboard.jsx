import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axios';

const AdminDashboard = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    axiosInstance.get('admin-dashboard/')  // Fetch admin dashboard data
      .then((response) => {
        setMessage(response.data.message);
      })
      .catch(() => {
        setMessage('Error loading dashboard.');
      });
  }, []);

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <p>{message}</p>
    </div>
  );
};

export default AdminDashboard;
