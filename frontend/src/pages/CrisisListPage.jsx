import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../api/axios';

const CrisisListPage = () => {
  const [crises, setCrises] = useState([]);

  useEffect(() => {
    axiosInstance.get('crisis/')
      .then(response => {
        setCrises(response.data);
      })
      .catch(error => {
        console.error('Error fetching crises:', error);
      });
  }, []);

  return (
    <div>
      <h1>Crisis List</h1>
      <button>
        <Link to="/crisis/report">Report a Crisis</Link>
      </button>
      <ul>
        {crises.map(crisis => (
          <li key={crisis.id}>
            <Link to={`/crisis/${crisis.id}`}>
              {crisis.title} - {crisis.severity}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CrisisListPage;
