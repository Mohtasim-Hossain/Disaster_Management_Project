import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../api/axios';
import Header from '../components/Header';
import Footer from '../components/Footer';

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
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="container mx-auto p-4 flex-grow">
        <h1 className="text-3xl font-bold">{crisis.title}</h1>
        <p className="mt-2">{crisis.description}</p>
        <p><strong>Location:</strong> {crisis.location}</p>
        <p><strong>Severity:</strong> {crisis.severity}</p>
        <p><strong>Required Help:</strong> {crisis.required_help}</p>
        <p><strong>Status:</strong> {crisis.status}</p>

        {crisis.image && (
          <img 
            src={crisis.image} 
            alt={crisis.title} 
            className="mt-4 w-full h-auto" // Responsive styling
          />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default CrisisDetailsPage;
