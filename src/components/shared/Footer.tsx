import { sideBarLinks } from '@/constant';
import { INavLink } from '@/types';
import { Link, useLocation } from 'react-router-dom';

export const Footer = () => {
  const { pathname } = useLocation();
  return (
    <section className='footer'>
      {sideBarLinks.map((link: INavLink) => {
        const isActive = pathname === link.route;
        return (
          <li
            className={`h-16 flex justify-center items-center hover:bg-teal-700  ${
              isActive && 'bg-teal-200'
            }`}
            key={link.label}
          >
            <Link to={link.route}>{link.label}</Link>
          </li>
        );
      })}
    </section>
  );
};
