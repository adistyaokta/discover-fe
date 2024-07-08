import type { INavLink } from '@/app/type';
import { sideBarLinks } from '@/constant';
import { RiLogoutCircleRFill, RiLogoutCircleRLine } from 'react-icons/ri';
import { NavLink, useLocation } from 'react-router-dom';
import { Button } from '../ui/button';
import { RenderIcon } from './RenderIcon';
import { ThemeSwitcher } from './ThemeSwitcher';
import { useAuthStore } from '@/app/store';
import { useTheme } from '.';

export const SideBar = () => {
  const { logout, user } = useAuthStore();
  const { theme } = useTheme();
  const { pathname } = useLocation();

  async function handleLogout() {
    await logout();
  }

  return (
    <div className='h-full lg:h-full w-full lg:w-16 py-3 px-3 flex flex-row lg:flex-col justify-between items-end'>
      <ThemeSwitcher />
      <div className='bg-background w-1/2 lg:w-10 h-10 lg:h-1/4 border border-input hover:bg-accent hover:text-accent-foreground rounded-md'>
        <ul className='w-full h-full flex flex-row lg:flex-col justify-between gap-1 items-center '>
          {sideBarLinks.map((link: INavLink) => {
            const route = link.route.replace(':userId', user?.id.toString() || '');
            const isActive = pathname === route;
            return (
              <li
                className={`w-full h-full group first:rounded-l-md last:rounded-r-md lg:first:rounded-b-none lg:first:rounded-t-md lg:last:rounded-t-none lg:last:rounded-b-md ${
                  isActive
                    ? 'bg-secondary-foreground text-primary-foreground dark:text-primary dark:bg-primary-foreground'
                    : ''
                }`}
                key={link.label}
              >
                <NavLink
                  to={route}
                  className='w-full h-full flex items-center justify-center  
              '
                >
                  <RenderIcon
                    IconComponent={link.icon}
                    className='w-5 h-5 group-hover:scale-110 transition-all duration-300'
                  />
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
      <Button variant='outline' size='icon' onClick={handleLogout}>
        {theme === 'light' ? (
          <RiLogoutCircleRFill className='h-7 w-7 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
        ) : (
          <RiLogoutCircleRLine className='h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
        )}
      </Button>
    </div>
  );
};
