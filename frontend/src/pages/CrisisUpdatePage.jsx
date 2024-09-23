import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axios';
import Header from '../components/Header';
import Footer from '../components/Footer';

const CrisisUpdatePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();  
  const [crisis, setCrisis] = useState({
    status: '',
    severity: '',
    is_visible: false,
  });

  useEffect(() => {
    axiosInstance.get(`/admin/crisis/update/${id}`)
      .then(response => {
        setCrisis(response.data);
      })
      .catch(error => {
        console.error('Error fetching crisis:', error);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosInstance.patch(`/admin/crisis/update/${id}/`, crisis)
      .then(() => {
        alert('Crisis updated successfully!');
        navigate('/admin/dashboard');  
      })
      .catch(error => {
        console.error('Error updating crisis:', error);
      });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Update Crisis</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Status</label>
            <input
              type="text"
              value={crisis.status}
              onChange={(e) => setCrisis({ ...crisis, status: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block text-gray-700">Severity</label>
            <input
              type="text"
              value={crisis.severity}
              onChange={(e) => setCrisis({ ...crisis, severity: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="flex items-center space-x-2">
            <label className="text-gray-700">Visible</label>
            <input
              type="checkbox"
              checked={crisis.is_visible}
              onChange={(e) => setCrisis({ ...crisis, is_visible: e.target.checked })}
              className="form-checkbox"
            />
          </div>

          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
            Update Crisis
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default CrisisUpdatePage;
