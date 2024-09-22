import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CrisisSection = () => {
  const [crises, setCrises] = useState([]);

  useEffect(() => {
    axios.get('/api/crisis/')
      .then(response => setCrises(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h2>Recent Crises</h2>
      <ul>
        {crises.slice(0, 5).map(crisis => (
          <li key={crisis.id}>{crisis.title} - {crisis.location}</li>
        ))}
      </ul>
      <button onClick={() => window.location.href = '/crisis'}>Go to Crisis Page</button>
    </div>
  );
};

export default CrisisSection;
