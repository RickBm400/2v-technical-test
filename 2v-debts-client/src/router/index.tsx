import { createBrowserRouter, Navigate } from 'react-router';
import { Login } from '../pages';

const router = createBrowserRouter([
  {
    path: '/login',
    Component: Login,
  },
  {
    path: '*',
    Component: () => <Navigate to='/login' replace />,
  },
]);

export default router;
