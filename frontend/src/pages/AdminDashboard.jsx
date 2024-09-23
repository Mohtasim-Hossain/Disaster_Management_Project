// import React, { useEffect, useState } from 'react';
// import Header from '../components/Header';
// import Footer from '../components/Footer';
// import FundSection from '../components/FundSection';
// import CrisisSection from '../components/CrisisSection';
// import VolunteerSection from '../components/VolunteerSection';
// import axiosInstance from '../api/axios';

// const AdminDashboard = () => {
//   const [donation, setDonation] = useState(0);

//   useEffect(() => {
//     // Fetch total donations in real-time
//     const fetchDonation = async () => {
//       const response = await axiosInstance.get('/donation');
//       setDonation(response.data.total);
//     };

//     // const intervalId = setInterval(fetchDonation, 5000); // Poll every 5 seconds
//     // return () => clearInterval(intervalId);
//   }, []);

//   return (
//     <div className="min-h-screen flex flex-col justify-between">
//       <Header />
//       <div className="container mx-auto px-4 py-8">
//         <h1 className="text-4xl font-bold text-center">Disaster Management Dashboard</h1>
//         <div className="mt-8">
//           <FundSection donation={donation} />
//         </div>
//         <div className="mt-8">
//           <CrisisSection basePath={"/admin"}/>
//         </div>
//         <div className="mt-8">
//           <VolunteerSection basePath={"/admin"}/>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default AdminDashboard;



import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FundSection from '../components/FundSection';
import CrisisSection from '../components/CrisisSection';
import VolunteerSection from '../components/VolunteerSection';
import axiosInstance from '../api/axios';
import { Link } from 'react-router-dom'; // Import Link for navigation

const AdminDashboard = () => {
  const [donation, setDonation] = useState(0);

  useEffect(() => {
    // Fetch total donations in real-time
    const fetchDonation = async () => {
      const response = await axiosInstance.get('/donation');
      setDonation(response.data.total);
    };

    // Uncomment to enable polling every 5 seconds
    // const intervalId = setInterval(fetchDonation, 5000);
    // return () => clearInterval(intervalId);
    
    fetchDonation(); // Initial fetch
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center">Disaster Management Admin Dashboard</h1>
        
        {/* Link to the reports page */}
        <div className="text-center mb-8">
          <Link to="/admin/reports" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
            View Reports
          </Link>
        </div>

        <div className="mt-8">
          <FundSection donation={donation} />
        </div>
        <div className="mt-8">
          <CrisisSection basePath={"/admin"} />
        </div>
        <div className="mt-8">
          <VolunteerSection basePath={"/admin"} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
