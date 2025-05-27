import { storageService } from '@/infrastructure/storage/authstorageService';
import { Navigate, useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredRole }) => {
  const role = storageService.getRole();
  if (!role || role !== requiredRole) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute;
