import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../app/store';
import { SideBar } from '@/components/shared';
import { useAppStore } from '@/app/store/appStore';

const RootLayout = () => {
  const { isAuthenticated } = useAuthStore();
  const { isScrolling } = useAppStore();

  return (
    <div className='h-dvh w-screen flex flex-col relative overflow-hidden'>
      <div className=' min-h-full h-1 flex flex-col lg:flex-row overflow-y-scroll lg:overflow-hidden gap-5 py-2 pb-0 lg:pb-2 lg:pl-20 px-2 md:px-0'>
        {isAuthenticated ? (
          <div className='w-full lg:border lg:border-r-0 lg:border-input rounded-lg rounded-r-none px-1'>
            <Outlet />
          </div>
        ) : (
          <Navigate to={'/sign-in'} />
        )}
      </div>
      <SideBar
        classNames={`absolute bottom-0 h-16 ${isScrolling ? 'translate-y-16 lg:translate-y-0' : 'translate-y-0'} transition-all duration-300`}
      />
    </div>
  );
};

export default RootLayout;
