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
    <nav className='sidebar'>
      <div className='flex flex-col w-1/3 h-screen justify-start items-center gap-3 py-2 bg-red-900 '>
        <div className='w-full h-16 flex justify-center items-center '>
          <Link to='/'>
            <span className='bg-primary p-2 rounded-lg text-white font-black'>
              DisMoment
            </span>
          </Link>
        </div>
        <Link
          to={`/profile/${user.id}`}
          className='flex justify-start items-center w-full h-16 py-2 px-3 gap-5 bg-teal-50'
        >
          <div
            className={`bg-[url(${user.imageUrl})] w-10 h-10 bg-teal-200 rounded-full`}
          />
          <div className='flex flex-col'>
            <p className='font-bold text-lg'>{user.name}</p>
            <p className='font-thin text-sm'>@{user.username}</p>
          </div>
        </Link>

        <ul className='group bg-yellow-10 flex flex-col gap-5 w-full'>
          {sideBarLinks.map((link: INavLink) => {
            const isActive = pathname === link.route;
            return (
              <li
                className={`h-16 flex justify-center items-center hover:bg-teal-700  ${
                  isActive && 'bg-teal-200'
                }`}
                key={link.label}
              >
                <NavLink to={link.route}>{link.label}</NavLink>
              </li>
            );
          })}
        </ul>
      </div>
      <Button variant='ghost' className='' onClick={() => signOut()}>
        Logout
      </Button>
    </nav>
  );
};
