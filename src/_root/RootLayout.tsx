import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../app/store';
import { SideBar } from '@/components/shared';
import { useAppStore } from '@/app/store/appStore';

const RootLayout = () => {
  const { isAuthenticated } = useAuthStore();
  const { isScrolling } = useAppStore();

  return (
    <div className='h-dvh w-screen flex flex-col relative overflow-hidden'>
      <div className=' min-h-full h-1 flex flex-col overflow-y-scroll gap-5 py-2 pb-0'>
        {isAuthenticated ? <Outlet /> : <Navigate to={'/sign-in'} />}
      </div>
      <SideBar
        classNames={`absolute bottom-0 h-16 ${isScrolling ? 'translate-y-16' : 'translate-y-0'} transition-all duration-300`}
      />
    </div>
  );
};

export default RootLayout;
