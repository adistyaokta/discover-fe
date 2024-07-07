import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../app/store';
import { SideBar } from '@/components/shared';

const RootLayout = () => {
  const { isAuthenticated } = useAuthStore();

  return (
    <div className='bg-red-900 min-h-dvh min-w-full h-dvh w-dvw flex '>
      <div className='relative'>
        <SideBar />
      </div>
      <section className='bg-teal-900 flex-grow'>{isAuthenticated ? <Outlet /> : <Navigate to={'/sign-in'} />}</section>
    </div>
  );
};

export default RootLayout;
