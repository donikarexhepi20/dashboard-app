import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { JSX } from 'react';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated, allowDashboardAccess } = useAuth();

  if (!isAuthenticated || !allowDashboardAccess) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;