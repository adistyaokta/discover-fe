import type { INavLink } from '@/app/type';
import { CgProfile } from 'react-icons/cg';
import { GoHome } from 'react-icons/go';
import { MdOutlineExplore } from 'react-icons/md';

export const sideBarLinks: INavLink[] = [
  {
    label: 'Home',
    route: '/',
    icon: GoHome
  },
  {
    label: 'Explore',
    route: '/explore',
    icon: MdOutlineExplore
  },
  // {
  //   label: 'Post',
  //   route: '/post/:id',
  //   icon: IoMdAddCircleOutline
  // },
  {
    label: 'Profile',
    route: '/profile/:userId',
    icon: CgProfile
  }
];
