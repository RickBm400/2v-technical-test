import { Navigate, Outlet } from 'react-router';

export default function Middleware() {
  if (!localStorage.getItem('token')) {
    return <Navigate to='/login' replace />;
  }

  return <Outlet />;
}
