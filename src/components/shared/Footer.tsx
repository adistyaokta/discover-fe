import { sideBarLinks } from '@/constant';
import { INavLink } from '@/types';
import { Link, useLocation } from 'react-router-dom';

export const Footer = () => {
  const { pathname } = useLocation();
  return (
    <section className='footer sm:hidden w-full h-full bg-primary text-secondary'>
      <div className='flex flex-row justify-evenly space-x-4 p-2'>
        {sideBarLinks.map((link: INavLink) => {
          const isActive = pathname === link.route;
          return (
            <Link
              to={link.route}
              key={link.label}
              className={`h-12 w-full flex justify-center items-center rounded-full hover:bg-card-foreground hover:text-secondary ${
                isActive && 'bg-secondary text-primary'
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </section>
  );
};
