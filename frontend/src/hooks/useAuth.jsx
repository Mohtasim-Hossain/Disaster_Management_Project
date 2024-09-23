import { useContext } from 'react';
import { AuthContext } from '../hooks/AuthContext';  

export const useAuth = () => {
  const { isAuthenticated } = useContext(AuthContext);
  return { isAuthenticated };
};
