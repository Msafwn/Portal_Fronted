import React from 'react';
import { useSelector } from 'react-redux';
import { NotFoundView } from '../components/notFound/NotFoundView';
import { selectIsAuthenticated, selectCurrentUser } from '../store/slices/authSlice';

const NotFound = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectCurrentUser);

  return (
    <NotFoundView>
      <NotFoundView.Badge />
      <NotFoundView.Visual />
      <NotFoundView.Title>Lost in Career Orbit?</NotFoundView.Title>
      <NotFoundView.Description>
        The page you are looking for doesn't exist or has been relocated. Let's get you back to discovering role-tailored career opportunities.
      </NotFoundView.Description>
      <NotFoundView.Actions isAuth={isAuthenticated} userRole={user?.role} />
      <NotFoundView.QuickLinks isAuth={isAuthenticated} userRole={user?.role} />
    </NotFoundView>
  );
};

export default NotFound;
