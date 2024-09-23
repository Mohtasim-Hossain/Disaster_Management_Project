import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import axiosInstance from '../api/axios';

const AdminCrisisListPage = () => {
  const [crises, setCrises] = useState([]);

  useEffect(() => {
    const fetchCrises = async () => {
      const response = await axiosInstance.get('/admin/crisis/');
      setCrises(response.data);
    };

    fetchCrises();
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-6">Admin Crisis List</h1>
        <ul className="divide-y divide-gray-200">
          {crises.map((crisis) => (
            <li key={crisis.id} className="py-4 flex justify-between items-center">
              <div>
                <span className="font-bold">{crisis.title}</span>
                <span className="text-gray-600 ml-2">({crisis.location}) </span>
                <Link
                  to={`/admin/crisis/update/${crisis.id}`}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
              Update
              </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </div>
  );
};

export default AdminCrisisListPage;
