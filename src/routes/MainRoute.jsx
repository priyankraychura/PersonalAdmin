import React from 'react';
import { Route, Routes } from 'react-router-dom';
import DashboardContent from '../components/DashboardContent';
import ContactTable from '../components/ContactTable/ContactTable';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';
import ComingSoon from '../components/Misc/ComingSoon';
import NotFound from '../components/Misc/NotFound';
import AuthForm from '../components/AuthForm/AuthForm';
import ProfileEditForm from '../components/ProfileEditForm/ProfileEditForm';
import VerifyEmailPage from '../components/VerifyEmailPage';

const protectedRoutes = [
  { path: "/dashboard", element: <DashboardContent /> },
  { path: "/contacts", element: <ContactTable /> },
  { path: "/users", element: <ComingSoon /> },
  { path: "/settings", element: <ProfileEditForm /> },
  { path: "/comming-soon", element: <ComingSoon /> },
  { path: "/not-found", element: <NotFound /> },
  { path: "/verify-email/:token", element: <VerifyEmailPage /> },
];

const MainRoute = ({ onAuthSuccess }) => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PublicRoute>
            <AuthForm />
          </PublicRoute>
        }
      />

      {protectedRoutes.map((route, index) => (
        <Route
          key={index} 
          path={route.path}
          element={
            <ProtectedRoute>
              {route.element}
            </ProtectedRoute>
          }
        />
      ))}

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default MainRoute;
