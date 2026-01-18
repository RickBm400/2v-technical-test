import { createBrowserRouter } from 'react-router';
import { Debts, Login } from '../pages';

const router = createBrowserRouter([
  {
    path: '/login',
    Component: Login,
  },
  {
    path: '/debts',
    Component: Debts,
  },
  // {
  //   path: '*',
  //   Component: () => <Navigate to='/login' replace />,
  // },
]);

export default router;
