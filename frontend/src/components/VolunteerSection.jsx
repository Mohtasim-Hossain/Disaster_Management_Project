import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VolunteerSection = () => {
  const [volunteers, setVolunteers] = useState([]);

  useEffect(() => {
    axios.get('/api/volunteers/')
      .then(response => setVolunteers(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h2>Available Volunteers</h2>
      <ul>
        {volunteers.slice(0, 5).map(volunteer => (
          <li key={volunteer.id}>{volunteer.name} - {volunteer.role}</li>
        ))}
      </ul>
      <button onClick={() => window.location.href = '/volunteer'}>Go to Volunteer Page</button>
    </div>
  );
};

export default VolunteerSection;
