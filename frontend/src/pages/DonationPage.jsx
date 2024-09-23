import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axios'; // Import Axios instance for API requests
import { Bar } from 'react-chartjs-2'; // Import Bar chart component from Chart.js
import { Chart, registerables } from 'chart.js'; // Import Chart.js components

Chart.register(...registerables); // Register Chart.js components

const DonationPage = () => {
  const [donations, setDonations] = useState([]); // Initialize donations state as an empty array
  const [chartData, setChartData] = useState({ donations: [], expenses: [] }); // State for chart data
  const [donorName, setDonorName] = useState(''); // State for donor name input
  const [amount, setAmount] = useState(''); // State for donation amount input
  const [totalDonations, setTotalDonations] = useState(0); // State for total donations

  useEffect(() => {
    // Fetch donations and chart data when the component mounts
    axiosInstance.get('donation/')
      .then(response => {
        console.log('Donation response:', response.data); // Log the response for debugging
        setDonations(response.data.all_donations || []); // Set donations or an empty array
        setTotalDonations(response.data.total_donations); // Set total donations
        setChartData(response.data.chart_data); // Set chart data
      })
      .catch(error => {
        console.error('Error fetching donation data:', error); // Log any errors
      });
  }, []); // Empty dependency array to run once on mount

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    const donationData = {
      donor_name: donorName || null, // Set donor name or null if empty
      amount: parseFloat(amount), // Parse amount as a float
    };

    // Post the donation data to the API
    axiosInstance.post('donation/', donationData)
      .then(response => {
        alert('Donation successful!'); // Notify user of success
        setDonorName(''); // Reset donor name input
        setAmount(''); // Reset amount input
      })
      .catch(error => {
        console.error('Error submitting donation:', error); // Log any errors
      });
  };

  // Prepare data for the bar chart
  const chartLabels = chartData.donations.map(d => d.date); // Extract labels from chart data
  const donationValues = chartData.donations.map(d => d.total); // Extract donation values
  const expenseValues = chartData.expenses.map(e => e.total); // Extract expense values

  // Data structure for the bar chart
  const data = {
    labels: chartLabels,
    datasets: [
      {
        label: 'Daily Donations',
        data: donationValues,
        backgroundColor: 'rgba(75, 192, 192, 0.6)', // Color for donations
      },
      {
        label: 'Daily Expenses',
        data: expenseValues,
        backgroundColor: 'rgba(255, 99, 132, 0.6)', // Color for expenses
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Header /> {/* Render the Header component */}
      <div className="flex-grow flex flex-col justify-center items-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-3xl">
          <h1 className="text-3xl font-bold text-center mb-6">Donation Page</h1>

          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold">
              Total Donations: BDT {totalDonations.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </h2>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">All-Time Donations</h3>
            <ul className="list-disc pl-5 space-y-2">
              {Array.isArray(donations) && donations.length > 0 ? (
                donations.map((donation, index) => (
                  <li key={index}>
                    {donation.donor_name || 'Anonymous'} - BDT {donation.amount} on {new Date(donation.created_at).toLocaleString()}
                  </li>
                ))
              ) : (
                <li>No donations available.</li>
              )}
            </ul>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Daily Donations and Expenses</h3>
            <div className="p-4 bg-gray-200 rounded-lg shadow-sm">
              <Bar data={data} /> {/* Render the Bar chart */}
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Make a Donation</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col">
                <label className="text-gray-700">Donor Name (optional)</label>
                <input
                  type="text"
                  placeholder="Donor Name"
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-gray-700">Amount (BDT)</label>
                <input
                  type="number"
                  placeholder="Amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                  className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors duration-200"
                >
                  Donate
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer /> {/* Render the Footer component */}
    </div>
  );
};

export default DonationPage; // Export the DonationPage component
