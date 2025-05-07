import { createBrowserRouter } from 'react-router-dom';
import AppLayout from '../layouts/AppLayout';
import NoLayout from '../layouts/NoLayout';
import TutorLayout from '../layouts/TutorLayout';
import ProtectedRoute from '../guards/ProtectedRoute';
import NotFound from '../shared/components/Failure/NotFound';

import Landing from '../pages/LandingPage/LandingPage';
import AboutUsPage from '../pages/aboutUs/AboutUsPage';
import Signup from '../features/shared_features//auth/pages/signUp';
import LoginPage from '../features/shared_features/auth/pages/LoginPage';


export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <NotFound />,
    children: [
      { path: '/', element: <Landing /> },
      { path: '/aboutus', element: <AboutUsPage/> },
      { path: '/signup', element: <Signup/> },
      { path: '/login', element: <LoginPage/> },
     
    ],
  },
  {
    element: <NoLayout />,
    children: [
   
    ],
  },
  {
    element: (
      <ProtectedRoute requiredRole="tutor">
        <TutorLayout />
      </ProtectedRoute>
    ),
    errorElement: <NotFound />,
    children: [
      
    ],
  },
]);
