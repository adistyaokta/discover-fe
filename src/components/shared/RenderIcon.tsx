import { CgProfile } from 'react-icons/cg';
import { GoHome } from 'react-icons/go';
import { IoMdAddCircleOutline } from 'react-icons/io';
import type { IconType } from 'react-icons/lib';
import { MdOutlineExplore } from 'react-icons/md';

type RenderIconProps = {
  IconComponent: IconType;
  className?: string;
};

export const RenderIcon = ({ IconComponent, className }: RenderIconProps) => {
  switch (IconComponent) {
    case GoHome:
      return <GoHome className={className} />;
    case MdOutlineExplore:
      return <MdOutlineExplore className={className} />;
    case IoMdAddCircleOutline:
      return <IoMdAddCircleOutline className={className} />;
    case CgProfile:
      return <CgProfile className={className} />;
    default:
      return null;
  }
};
