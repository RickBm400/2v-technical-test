import { createBrowserRouter, Navigate } from 'react-router';
import { Debts, Login, Signup } from '../pages';
import Middleware from '@/components/Middleware';

const ProtectedAuthRoute = ({
  Component,
}: {
  Component: React.ComponentType;
}) => {
  const token = localStorage.getItem('token');
  return token ? <Navigate to='/debts' replace /> : <Component />;
};

const router = createBrowserRouter([
  {
    path: '/',
    Component: () => (
      <ProtectedAuthRoute Component={() => <Navigate to='/login' replace />} />
    ),
  },
  {
    path: '/login',
    Component: () => <ProtectedAuthRoute Component={Login} />,
  },
  {
    path: '/sign-up',
    Component: () => <ProtectedAuthRoute Component={Signup} />,
  },
  {
    path: '/debts',
    Component: Middleware,
    children: [
      {
        index: true,
        Component: Debts,
      },
    ],
  },
  {
    path: '*',
    Component: () => <Navigate to='/' replace />,
  },
]);

export default router;
