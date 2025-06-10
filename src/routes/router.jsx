import { createBrowserRouter } from 'react-router-dom';
import AppLayout from '../layouts/AppLayout';
import NoLayout from '../layouts/NoLayout';
import TutorLayout from '../layouts/TutorLayout';
import ProtectedRoute from '../guards/ProtectedRoute';
import NotFound from '../shared/components/Failure/NotFound';
import CheckoutPage from '@/features/students_features/checkOut/page/checkoutPage';
import Landing from '../pages/LandingPage/LandingPage';
import AboutUsPage from '../pages/aboutUs/AboutUsPage';
import Signup from '../features/shared_features//auth/pages/signUp';
import LoginPage from '../features/shared_features/auth/pages/LoginPage';
import CoursesPage from '../features/shared_features/courses/pages/course-page';
import ForumPage from '@/features/shared_features/post/page/post';
import { CourseDetailsPage } from '@/features/shared_features/courseDetailsPage/page/CourseDetailPage';
import BlogPage from '../features/shared_features/blogs/page/BlogPage';
import BlogDetailPage from '../features/shared_features/blogs/page/BlogDetailPage';
import ProfileScreen from '@/features/students_features/student_profile/components/profile-screen';
import AuthProtectedRoute from '@/guards/AuthProtectedRoute';
import EditProfilePage from '@/features/students_features/edit_profile/pages/editProfile';
import MyLearnings from '@/features/students_features/MyLearnings/pages/My-Learning';


export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <NotFound />,
    children: [
      { path: '/', element: <Landing /> },
      { path: '/aboutus', element: <AboutUsPage/> },
      { path: '/signup', element: <Signup/> },
      { path: '/login', element: <LoginPage/> },
      {
        path: '/courses',
        element: (
          <AuthProtectedRoute>
            <CoursesPage />
          </AuthProtectedRoute>
        ),
      },
      {
        path: '/course/:courseId',
        element: (
          <AuthProtectedRoute>
            <CourseDetailsPage />
          </AuthProtectedRoute>
        ),
      },
      {
        path: '/posts',
        element: (
          <AuthProtectedRoute>
            <ForumPage />
          </AuthProtectedRoute>
        ),
      },
      {
        path: '/payment',
        element: (
          <AuthProtectedRoute>
            <CheckoutPage />
          </AuthProtectedRoute>
        ),
      },
      {
        path: '/Blogs',
        element: (
          <AuthProtectedRoute>
            <BlogPage />
          </AuthProtectedRoute>
        ),
      },
      {
        path: '/blogs/:id',
        element: (
          <AuthProtectedRoute>
            <BlogDetailPage />
          </AuthProtectedRoute>
        ),
      },
      {
        path: '/profile',
        element: (
          <AuthProtectedRoute>
            <ProfileScreen />
          </AuthProtectedRoute>
        ),
      },
       {
        path: '/edit-profile',
        element: (
          <AuthProtectedRoute>
            <EditProfilePage/>
          </AuthProtectedRoute>
        ),
      },
      {
          path: '/learnings',
          element: <AuthProtectedRoute>
            <MyLearnings/>
          </AuthProtectedRoute>,
        },
     
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
