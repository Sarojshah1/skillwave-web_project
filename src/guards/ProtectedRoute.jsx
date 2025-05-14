import { Navigate, useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredRole }) => {
  const role = localStorage.getItem('role');
  if (!role || role !== requiredRole) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute;
