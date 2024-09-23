import React, { createContext, useState, useEffect } from 'react';
import axiosInstance from '../api/axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false); // Track if the user is an admin
  const [isVolunteer, setIsVolunteer] = useState(false); // Track if the user is a volunteer

  useEffect(() => {
    // Check if user details are stored in local storage (for persistent login)
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
      setIsAdmin(storedUser.user_type === 'ADMIN');
      setIsVolunteer(storedUser.user_type === 'VOLUNTEER');
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axiosInstance.post('/login', { username: email, password });
      const loggedInUser = response.data;
      setUser(loggedInUser);
      
      // Store user details in local storage
      localStorage.setItem('user', JSON.stringify(loggedInUser));
      
      // Set roles based on user_type
      setIsAdmin(loggedInUser.user_type === 'ADMIN');
      setIsVolunteer(loggedInUser.user_type === 'VOLUNTEER');
    } catch (error) {
      console.error('Login failed:', error);
      setUser(null);
      setIsAdmin(false);
      setIsVolunteer(false);
    }
  };

  const logout = async () => {
    try {
      await axiosInstance.post('/logout');
      setUser(null);
      setIsAdmin(false);
      setIsVolunteer(false);
      localStorage.removeItem('user'); // Clear user from local storage on logout
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin, isVolunteer, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
