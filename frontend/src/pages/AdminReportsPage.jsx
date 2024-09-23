import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import axiosInstance from '../api/axios';

const AdminReportsPage = () => {
  const [loading, setLoading] = useState(false);

  const downloadReport = async (type, format) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/admin/reports`, {
        params: { type, format },
        responseType: 'blob', // Important for file download
      });
      
      // Create a link element to download the file
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${type}_report.${format}`); // Filename
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading report:', error);
      alert('Failed to download report. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-6">Admin Reports</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white shadow-md rounded-lg p-6 text-center">
            <h2 className="text-2xl font-semibold mb-4">Daily Donation Report</h2>
            <div className="flex justify-center space-x-4">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                onClick={() => downloadReport('donations', 'csv')}
                disabled={loading}
              >
                Download CSV
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
                onClick={() => downloadReport('donations', 'excel')}
                disabled={loading}
              >
                Download Excel
              </button>
            </div>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6 text-center">
            <h2 className="text-2xl font-semibold mb-4">Daily Expense Report</h2>
            <div className="flex justify-center space-x-4">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                onClick={() => downloadReport('expenses', 'csv')}
                disabled={loading}
              >
                Download CSV
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
                onClick={() => downloadReport('expenses', 'excel')}
                disabled={loading}
              >
                Download Excel
              </button>
            </div>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6 text-center">
            <h2 className="text-2xl font-semibold mb-4">Inventory Report</h2>
            <div className="flex justify-center space-x-4">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                onClick={() => downloadReport('inventory', 'csv')}
                disabled={loading}
              >
                Download CSV
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
                onClick={() => downloadReport('inventory', 'excel')}
                disabled={loading}
              >
                Download Excel
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminReportsPage;
