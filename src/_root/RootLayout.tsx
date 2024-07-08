import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../app/store';
import { SideBar } from '@/components/shared';

const RootLayout = () => {
  const { isAuthenticated } = useAuthStore();

  return (
    <div className='w-screen h-dvh relative'>
      <div className='h-full w-full flex flex-col lg:flex-row-reverse justify-between p-2 pt-0 lg:pt-2 lg:pr-0'>
        <section className='flex-1'>
          {isAuthenticated ? (
            <div className='h-full w-full flex px-1 py-2 border-2 border-t-0 lg:border-t-2 lg:border-r-0 rounded-md'>
              <Outlet />
            </div>
          ) : (
            <Navigate to={'/sign-in'} />
          )}
        </section>
        <div className='sticky bottom-0 lg:left-0 lg:h-full lg:w-16 lg:max-h-dvh lg:overflow-hidden'>
          <SideBar />
        </div>
      </div>
    </div>
  );
};

export default RootLayout;
