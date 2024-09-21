import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../api/axios';

const CrisisDetailsPage = () => {
  const { id } = useParams();
  const [crisis, setCrisis] = useState(null);

  useEffect(() => {
    axiosInstance.get(`crisis/${id}/`)
      .then(response => {
        setCrisis(response.data);
      })
      .catch(error => {
        console.error('Error fetching crisis details:', error);
      });
  }, [id]);

  if (!crisis) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{crisis.title}</h1>
      <p>{crisis.description}</p>
      <p>Location: {crisis.location}</p>
      <p>Severity: {crisis.severity}</p>
      <p>Required Help: {crisis.required_help}</p>
      <p>Status: {crisis.status}</p>

      {crisis.image && (
        <img 
          src={`${crisis.image}`} 
          alt={crisis.title} 
          style={{ width: '100%', height: 'auto' }} // Optional: Responsive styling
        />
      )}
    </div>
  );
};

export default CrisisDetailsPage;
// ${process.env.REACT_APP_API_URL}