// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import axiosInstance from '../api/axios';

// const CrisisListPage = () => {
//   const [crises, setCrises] = useState([]);

//   useEffect(() => {
//     axiosInstance.get('crisis/')
//       .then(response => {
//         setCrises(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching crises:', error);
//       });
//   }, []);

//   return (
//     <div>
//       <h1>Crisis List</h1>
//       <button>
//         <Link to="/crisis/report">Report a Crisis</Link>
//       </button>
//       <ul>
//         {crises.map(crisis => (
//           <li key={crisis.id}>
//             <Link to={`/crisis/${crisis.id}`}>
//               {crisis.title} - {crisis.severity}
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default CrisisListPage;


import React, { useEffect, useState } from 'react';
import Header from '../components/Header'; 
import Footer from '../components/Footer'; 
import axiosInstance from '../api/axios'; 
import ListView from '../components/ListView'; 

const CrisisPage = () => {
  // State to hold the list of crises
  const [crises, setCrises] = useState([]);

  // useEffect hook to fetch crises when the component mounts
  useEffect(() => {
    const fetchCrises = async () => {
      try {
        // Make GET request to fetch all crises
        const response = await axiosInstance.get('/crisis/');
        // Update the state with the fetched crises data
        setCrises(response.data);
      } catch (error) {
        console.error('Error fetching crises:', error); // Log error if the request fails
      }
    };

    fetchCrises(); // Call the fetch function
  }, []); // Empty dependency array ensures this runs once when the component mounts

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Header /> {/* Render the Header component */}
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center">All Crises</h1> {/* Page title */}
        <div className="mt-8">
          {/* Render ListView component with crises data */}
          <ListView items={crises} type="crisis" />
        </div>
      </div>
      <Footer /> {/* Render the Footer component */}
    </div>
  );
};

export default CrisisPage; // Export the CrisisPage component for use in other parts of the app
