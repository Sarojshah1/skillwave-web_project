
import { Navigate } from 'react-router-dom';
import { storageService } from '@/infrastructure/storage/authstorageService';

const AuthProtectedRoute = ({ children }) => {
  const token = storageService.getToken(); 

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default AuthProtectedRoute;
