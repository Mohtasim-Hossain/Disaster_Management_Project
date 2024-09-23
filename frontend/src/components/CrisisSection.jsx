// import React, { useState, useEffect } from 'react';
// import axiosInstance from '../api/axios';

// const CrisisSection = () => {
//   const [crises, setCrises] = useState([]);

//   useEffect(() => {
//     axiosInstance.get('/crisis/')
//       .then(response => setCrises(response.data))
//       .catch(error => console.error(error));
//   }, []);

//   return (
//     <div>
//       <h2>Recent Crises</h2>
//       <ul>
//         {crises.slice(0, 5).map(crisis => (
//           <li key={crisis.id}>{crisis.title} - {crisis.location}</li>
//         ))}
//       </ul>
//       <button onClick={() => window.location.href = '/crisis'}>Go to Crisis Page</button>
//     </div>
//   );
// };

// export default CrisisSection;




import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../api/axios'; // Adjust the import path as necessary
import ListView from '../components/ListView'; // Ensure this import is correct

const CrisisSection = ({ basePath = "" }) => {
  const [crises, setCrises] = useState([]);

  useEffect(() => {
    const fetchCrises = async () => {
      const response = await axiosInstance.get(`${basePath}/crisis/`);
      setCrises(response.data);
    };

    fetchCrises();
  }, [basePath]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Recent Crises</h2>
      <ListView items={crises.slice(0, 2)} type="crisis" />
      <div className="mt-4">
        <Link to={`${basePath}/crisis/`}>
          <button className="bg-green-500 text-white py-2 px-4 rounded">
            View All Crises
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CrisisSection;
