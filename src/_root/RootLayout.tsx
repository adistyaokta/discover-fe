import { ThemeSwitcher } from '@/components/shared/ThemeSwitcher';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../app/store';
import { Button } from '@/components/ui/button';
import { RiLogoutCircleRFill, RiLogoutCircleRLine } from 'react-icons/ri';
import { useTheme } from '@/components/shared/ThemeProvider';
import { GoHome, GoSearch } from 'react-icons/go';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { CgProfile } from 'react-icons/cg';

const RootLayout = () => {
  const { isAuthenticated } = useAuthStore();
  const { theme } = useTheme();
  return (
    <div className='w-full py-5 flex flex-row min-h-screen'>
      <div className='w-16 py-3 px-1 flex flex-col items-center justify-between '>
        <ThemeSwitcher />
        <div className='bg-background w-10 h-1/4 py-3 flex flex-col justify-between items-center border border-input hover:bg-accent hover:text-accent-foreground rounded-md'>
          <GoHome className='w-5 h-5 ' />
          <GoSearch className='w-5 h-5' />
          <IoMdAddCircleOutline className='w-5 h-5' />
          <CgProfile className='w-5 h-5' />
        </div>
        <Button variant='outline' size='icon'>
          {theme === 'light' ? (
            <RiLogoutCircleRFill className='h-7 w-7 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
          ) : (
            <RiLogoutCircleRLine className='h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
          )}
        </Button>
      </div>
      <section className='flex-grow flex flex-wrap border border-input bg-background rounded-md rounded-r-none border-r-0'>
        {isAuthenticated ? <Outlet /> : <Navigate to={'/sign-in'} />}
      </section>
    </div>
  );
};

export default RootLayout;
