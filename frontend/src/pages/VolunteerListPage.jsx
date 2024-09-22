import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axios';
import { Link } from 'react-router-dom';

const VolunteerListPage = () => {
  const [volunteers, setVolunteers] = useState([]);

  useEffect(() => {
    axiosInstance.get('volunteer/')
      .then(response => {
        setVolunteers(response.data);
      })
      .catch(error => {
        console.error('Error fetching volunteers:', error);
      });
  }, []);

  return (
    <div>
      <h1>Volunteer List</h1>
      <ul>
        {volunteers.map((volunteer) => (
          <li key={volunteer.id}>
            <Link to={`/volunteer/${volunteer.id}`}>
              {volunteer.username} - {volunteer.email} 
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VolunteerListPage;
