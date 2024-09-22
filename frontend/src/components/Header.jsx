import React from 'react';
import { Link } from 'react-router-dom';
import AuthButton from './AuthButton';  // Dynamic SignIn/SignOut button
import { useAuth } from '../hooks/useAuth';  // Hook to check auth status

const Header = () => {
  const { isAuthenticated } = useAuth();

  return (
    <header>
      <nav>
        <Link to="/">Home</Link>
        {isAuthenticated && <Link to="/account">Account</Link>}
        <AuthButton />
      </nav>
    </header>
  );
};

export default Header;
