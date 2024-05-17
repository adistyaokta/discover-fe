import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../app/store';

const RootLayout = () => {
  const { isAuthenticated } = useAuthStore();
  return (
    <div className='w-full flex flex-col sm:flex-row min-h-screen'>
      <section className='flex-grow flex flex-wrap'>
        {isAuthenticated ? <Outlet /> : <Navigate to={'/sign-in'} />}
      </section>
    </div>
  );
};

export default RootLayout;
