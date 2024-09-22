import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const PrivateRoute = ({ children, ...rest }) => {
  const { isAuthenticated } = useAuth();

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <Navigate to={{ pathname: "/login", state: { from: location } }} />
        )
      }
    />
  );
};

export default PrivateRoute;
