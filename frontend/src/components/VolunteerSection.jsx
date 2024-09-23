// import React, { useState, useEffect } from 'react';
// import axiosInstance from '../api/axios';

// const VolunteerSection = () => {
//   const [volunteers, setVolunteers] = useState([]);

//   useEffect(() => {
//     axiosInstance.get('/volunteer/')
//       .then(response => setVolunteers(response.data))
//       .catch(error => console.error(error));
//   }, []);

//   return (
//     <div>
//       <h2>Available Volunteers</h2>
//       <ul>
//          {volunteers.slice(0, 5).map(volunteer => (
//          <li key={volunteer.username}>
//             {volunteer.username} - {volunteer.email}
//          </li>
//            ))}
//       </ul>

//       <button onClick={() => window.location.href = '/volunteer'}>Go to Volunteer Page</button>
//     </div>
//   );
// };

// export default VolunteerSection;


import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axios';
import ListView from './ListView';
import { Link } from 'react-router-dom';

const VolunteerSection = ({ basePath = "" }) => {
  const [volunteers, setVolunteers] = useState([]);

  useEffect(() => {
    const fetchVolunteers = async () => {
      const response = await axiosInstance.get(`${basePath}/volunteer/`);
      setVolunteers(response.data);
    };

    fetchVolunteers();
  }, [basePath]); // Add basePath to the dependency array

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Available Volunteers</h2>
      <ListView items={volunteers.slice(0, 5)} type="volunteer" />
      <div className="mt-4">
        <Link to={`${basePath}/volunteer/`}>
          <button className="bg-yellow-500 text-white py-2 px-4 rounded">
            View All Volunteers
          </button>
        </Link>
      </div>
    </div>
  );
};

export default VolunteerSection;
