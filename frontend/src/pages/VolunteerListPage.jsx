// import React, { useEffect, useState } from 'react';
// import axiosInstance from '../api/axios';
// import { Link } from 'react-router-dom';

// const VolunteerListPage = () => {
//   const [volunteers, setVolunteers] = useState([]);

//   useEffect(() => {
//     axiosInstance.get('volunteer/')
//       .then(response => {
//         setVolunteers(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching volunteers:', error);
//       });
//   }, []);

//   return (
//     <div>
//       <h1>Volunteer List</h1>
//       <ul>
//         {volunteers.map((volunteer) => (
//           <li key={volunteer.id}>
//             <Link to={`/volunteer/${volunteer.id}`}>
//               {volunteer.username} - {volunteer.email} 
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default VolunteerListPage;



import React, { useEffect, useState } from 'react'; // Import React and hooks
import Header from '../components/Header'; // Import the Header component
import Footer from '../components/Footer'; // Import the Footer component
import axiosInstance from '../api/axios'; // Import Axios instance for API requests
import ListView from '../components/ListView'; // Import ListView to display volunteers

const VolunteerPage = () => {
  const [volunteers, setVolunteers] = useState([]); // State to hold volunteers list

  useEffect(() => {
    // Function to fetch volunteers from the API
    const fetchVolunteers = async () => {
      try {
        const response = await axiosInstance.get('/volunteer/'); // Fetch volunteers
        setVolunteers(response.data); // Update state with the fetched data
      } catch (error) {
        console.error('Error fetching volunteers:', error); // Log any errors
      }
    };

    fetchVolunteers(); // Call the fetch function
  }, []); // Empty dependency array to run once on mount

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Header /> {/* Render the Header */}
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center">All Volunteers</h1> {/* Page title */}
        <div className="mt-8">
          <ListView items={volunteers} type="volunteer" /> {/* Render the ListView with volunteers */}
        </div>
      </div>
      <Footer /> {/* Render the Footer */}
    </div>
  );
};

export default VolunteerPage; // Export the component for use in other parts of the app

