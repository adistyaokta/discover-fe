import type { INavLink } from '@/app/type';
import { GoHome, GoSearch } from 'react-icons/go';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { CgProfile } from 'react-icons/cg';

export const sideBarLinks: INavLink[] = [
  {
    label: 'Home',
    route: '/',
    icon: GoHome
  },
  {
    label: 'Explore',
    route: '/explore',
    icon: GoSearch
  },
  {
    label: 'Post',
    route: '/create-post',
    icon: IoMdAddCircleOutline
  },
  {
    label: 'Profile',
    route: '/profile',
    icon: CgProfile
  }
];
