// import React, { useEffect, useState } from 'react';
// import { Link  } from 'react-router-dom';

// const FundSection = ({ donation }) => {
//   return (
//     <div className="bg-gray-100 p-6 rounded-lg shadow-md">
//       <h2 className="text-2xl font-semibold mb-4">Total Donations</h2>
//       <p className="text-lg">Total Amount Donated: ${donation}</p>
//       <div className="mt-4">
//       <Link to="/donation">
//   <button className="bg-blue-500 text-white py-2 px-4 rounded">
//     View Donations
//   </button>
// </Link>
//       </div>
//     </div>
//   );
// };

// export default FundSection;


import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../api/axios'; // Ensure this path is correct
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables); // Register Chart.js components

const FundSection = () => {
  const [totalDonations, setTotalDonations] = useState(0);
  const [chartData, setChartData] = useState({ donations: [], expenses: [] });

  useEffect(() => {
    // Fetch today's donations and expenses
    const today = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format

    axiosInstance.get(`/donation/`)
      .then(response => {
        console.log('Today\'s donation response:', response.data);
        setTotalDonations(response.data.total_donations);
        setChartData(response.data.chart_data);
      })
      .catch(error => {
        console.error('Error fetching today\'s donation data:', error);
      });
  }, []);

  // Prepare data for the bar chart
const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
console.log(today);

// Filter chart data for the current date
const todayDonations = chartData.donations.filter(d => d.date === today);
const todayExpenses = chartData.expenses.filter(e => e.date === today);

// Prepare data for the bar chart
const chartLabels = todayDonations.map(d => d.date);
const donationValues = todayDonations.map(d => d.total);
const expenseValues = todayExpenses.map(e => e.total);

const data = {
  labels: chartLabels.length > 0 ? chartLabels : [today], // Show today if no data
  datasets: [
    {
      label: 'Today\'s Donations',
      data: donationValues.length > 0 ? donationValues : [0], // Default to 0 if no data
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
    },
    {
      label: 'Today\'s Expenses',
      data: expenseValues.length > 0 ? expenseValues : [0], // Default to 0 if no data
      backgroundColor: 'rgba(255, 99, 132, 0.6)',
    },
  ],
};

const options = {
  indexAxis: 'y', // Change to horizontal
  responsive: true,
  maintainAspectRatio: false,
};

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Total Donations</h2>
      <h3 className="text-lg"> BDT {totalDonations.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h3>
      
      <p className="text-xl mt-4">Today's Donations and Expenses</p>
      <div style={{ width: '100%', maxWidth: '400px', height: '200px' }}>
        <Bar data={data} options={options} />
      </div>

      <div className="mt-4">
        <Link to="/donation/">
          <button className="bg-blue-500 text-white py-2 px-4 rounded">
            View Donations
          </button>
        </Link>
      </div>
    </div>
  );
};

export default FundSection;
