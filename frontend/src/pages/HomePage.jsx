// import React from 'react';
// import Layout from '../components/Layout';
// import FundSection from '../components/FundSection';
// import CrisisSection from '../components/CrisisSection';
// import VolunteerSection from '../components/VolunteerSection';

// const HomePage = () => {
//   return (
//     <Layout>
//       <FundSection />
//       <CrisisSection />
//       <VolunteerSection />
//     </Layout>
//   );
// };

// export default HomePage;




import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FundSection from '../components/FundSection';
import CrisisSection from '../components/CrisisSection';
import VolunteerSection from '../components/VolunteerSection';
import axiosInstance from '../api/axios';

const HomePage = () => {
  const [donation, setDonation] = useState(0);

  useEffect(() => {
    // Fetch total donations in real-time
    const fetchDonation = async () => {
      const response = await axiosInstance.get('/donation');
      setDonation(response.data.total);
    };

    // const intervalId = setInterval(fetchDonation, 5000); // Poll every 5 seconds
    // return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center">Disaster Management Dashboard</h1>
        <div className="mt-8">
          <FundSection  />
        </div>
        <div className="mt-8">
          <CrisisSection />
        </div>
        <div className="mt-8">
          <VolunteerSection />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
