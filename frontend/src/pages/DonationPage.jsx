import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axios';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables); // Register Chart.js components

const DonationPage = () => {
  const [donations, setDonations] = useState([]); // Initialize as an empty array
  const [chartData, setChartData] = useState({ donations: [], expenses: [] });
  const [donorName, setDonorName] = useState('');
  const [amount, setAmount] = useState('');
  const [totalDonations, setTotalDonations] = useState(0);

  useEffect(() => {
    // Fetch donations and chart data
    axiosInstance.get('donation/')
      .then(response => {
        console.log('Donation response:', response.data); // Log the response
        setDonations(response.data.all_donations || []); // Safely handle the case where all_donations is not present
        setTotalDonations(response.data.total_donations);
        setChartData(response.data.chart_data);
      })
      .catch(error => {
        console.error('Error fetching donation data:', error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const donationData = {
      donor_name: donorName || null,
      amount: parseFloat(amount),
    };

    axiosInstance.post('donation/', donationData)
      .then(response => {
        alert('Donation successful!');
        // Optionally update donations list or perform other actions
        setDonorName('');
        setAmount('');
      })
      .catch(error => {
        console.error('Error submitting donation:', error);
      });
  };

  // Prepare data for the bar chart
  const chartLabels = chartData.donations.map(d => d.date);
  const donationValues = chartData.donations.map(d => d.total);
  const expenseValues = chartData.expenses.map(e => e.total);

  const data = {
    labels: chartLabels,
    datasets: [
      {
        label: 'Daily Donations',
        data: donationValues,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'Daily Expenses',
        data: expenseValues,
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
    ],
  };

  return (
    <div>
      <h1>Donation Page</h1>
      <h2>Total Donations: BDT {totalDonations.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h2>
      <h3>All-Time Donations</h3>
      <ul>
        {Array.isArray(donations) && donations.length > 0 ? (
          donations.map((donation, index) => (
            <li key={index}>
              {donation.donor_name || 'Anonymous'} - ${donation.amount} on {new Date(donation.created_at).toLocaleDateString()}
            </li>
          ))
        ) : (
          <li>No donations available.</li>
        )}
      </ul>

      <h3>Daily Donations and Expenses</h3>
      <Bar data={data} />

      <h3>Make a Donation</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Donor Name (optional)"
          value={donorName}
          onChange={(e) => setDonorName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <button type="submit">Donate</button>
      </form>
    </div>
  );
};

export default DonationPage;
