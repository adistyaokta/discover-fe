import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../ui/button';
import { useSignOutAccount } from '@/lib/react-query/queriesAndMutations';
import { useEffect } from 'react';
import { useUserContext } from '@/context/AuthContext';
import { sideBarLinks } from '@/constant';
import { INavLink } from '@/types';

export const Sidebar = () => {
  const { pathname } = useLocation();
  const { mutate: signOut, isSuccess } = useSignOutAccount();
  const navigate = useNavigate();
  const { user } = useUserContext();

  useEffect(() => {
    if (isSuccess) navigate(0);
  }, [isSuccess]);

  return (
    <nav className='sidebar hidden sm:flex'>
      <div className='flex flex-col min-w-64 h-screen justify-between items-center gap-3 p-2 bg-primary'>
        <div className='w-full flex flex-col gap-2'>
          <div className='w-full h-10 flex justify-center items-center'>
            <Link to='/'>
              <span className='p-2 rounded-lg text-white font-black tracking-wider'>
                DisMoment
              </span>
            </Link>
          </div>
          <Link
            to={`/profile/${user.id}`}
            className='flex justify-start items-center h-16 w-full gap-3 rounded-md px-2 bg-card-foreground text-secondary hover:bg-secondary hover:text-primary'
          >
            <div
              className={`bg-[url(${user.imageUrl})] w-10 h-10 bg-teal-200 rounded-full`}
            />
            <div className='flex flex-col'>
              <p className='font-bold text-lg'>{user.name}</p>
              <p className='font-thin text-sm'>@{user.username}</p>
            </div>
          </Link>

          <ul className='group w-full bg-primary text-secondary flex flex-col gap-5'>
            {sideBarLinks.map((link: INavLink) => {
              const isActive = pathname === link.route;
              return (
                <li className='w-full h-16' key={link.label}>
                  <NavLink
                    to={link.route}
                    className={`w-full h-full flex justify-center items-center rounded-md transition-colors text-primary-foreground hover:bg-foreground hover:text-secondary ${
                      isActive && 'bg-secondary text-secondary-foreground'
                    }`}
                  >
                    {link.label}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>
        <div className='flex justify-start items-center h-16 w-full gap-3 rounded-md bg-primary text-secondary hover:bg-secondary hover:text-primary transition-colors ease-in'>
          {' '}
          <Button
            variant='ghost'
            className='w-full h-full flex justify-center items-center rounded-md transition-all'
            onClick={() => signOut()}
          >
            Logout
          </Button>
        </div>
      </div>
    </nav>
  );
};
