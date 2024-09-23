import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';
import CrisisListPage from './pages/CrisisListPage';
import CrisisDetailsPage from './pages/CrisisDetailsPage';
import ReportCrisisPage from './pages/ReportCrisisPage';
import DonationPage from './pages/DonationPage';
import VolunteerListPage from './pages/VolunteerListPage';
import VolunteerDetailsPage from './pages/VolunteerDetailsPage';
import AdminVolunteerListPage from './pages/AdminVolunteerListPage';
import AdminCrisisListPage from './pages/AdminCrisisListPage';
import CrisisUpdatePage from './pages/CrisisUpdatePage';
import VolunteerUpdatePage from './pages/VolunteerUpdatePage';
import AdminReportsPage from './pages/AdminReportsPage';
import ProtectedRoute from './components/PrivateRoute';  // Add your ProtectedRoute

function App() {
  return (
    <Router>
      <Routes>
        {/* Public pages */}
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/crisis" element={<CrisisListPage />} />
        <Route path="/crisis/:id" element={<CrisisDetailsPage />} />
        <Route path="/crisis/report" element={<ReportCrisisPage />} />
        <Route path="/donation" element={<DonationPage />} />
        <Route path="/volunteer" element={<VolunteerListPage />} />
        <Route path="/volunteer/:id" element={<VolunteerDetailsPage />} />
        
        {/* Protect /admin routes (Admin only) */}
        <Route path="/admin-dashboard" element={
          <ProtectedRoute adminOnly={true}>
            <AdminDashboard />
          </ProtectedRoute>
        } />
        <Route path="/admin/crisis" element={
          <ProtectedRoute adminOnly={true}>
            <AdminCrisisListPage />
          </ProtectedRoute>
        } />
        <Route path="/admin/crisis/update/:id" element={
          <ProtectedRoute adminOnly={true}>
            <CrisisUpdatePage />
          </ProtectedRoute>
        } />
        <Route path="/admin/volunteer" element={
          <ProtectedRoute adminOnly={true}>
            <AdminVolunteerListPage />
          </ProtectedRoute>
        } />
        <Route path="/admin/volunteer/update/:id" element={
          <ProtectedRoute adminOnly={true}>
            <VolunteerUpdatePage />
          </ProtectedRoute>
        } />
        <Route path="/admin/reports" element={
          <ProtectedRoute adminOnly={true}>
            <AdminReportsPage />
          </ProtectedRoute>
        } />

        {/* Protect /account route (Volunteers only) */}
        <Route path="/accounts" element={
          <ProtectedRoute volunteerOnly={true}>
            <VolunteerUpdatePage />
          </ProtectedRoute>
        } />

        {/* Redirect for unknown paths */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
