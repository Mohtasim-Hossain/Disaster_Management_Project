import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import axiosInstance from '../api/axios';

const AdminVolunteerListPage = () => {
  const [volunteers, setVolunteers] = useState([]);

  useEffect(() => {
    const fetchVolunteers = async () => {
      const response = await axiosInstance.get('/admin/volunteer/');
      setVolunteers(response.data);
    };

    fetchVolunteers();
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-6">Admin Volunteer List</h1>
        <ul className="divide-y divide-gray-200">
          {volunteers.map((volunteer) => (
            <li key={volunteer.id} className="py-4 flex justify-between items-center">
              <div>
                <span className="font-bold">{volunteer.name}</span>
                <span className="text-gray-600 ml-2">({volunteer.email}) </span>
              
              <Link
                to={`/admin/volunteer/update/${volunteer.id}`}
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

export default AdminVolunteerListPage;
