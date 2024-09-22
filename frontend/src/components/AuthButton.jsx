import React from 'react';
import { useAuth } from '../hooks/useAuth';  // Hook to check auth status

const AuthButton = () => {
  const { isAuthenticated, signOut } = useAuth();

  if (isAuthenticated) {
    return <button onClick={signOut}>Sign Out</button>;
  } else {
    return <a href="/login">Sign In</a>;
  }
};

export default AuthButton;
