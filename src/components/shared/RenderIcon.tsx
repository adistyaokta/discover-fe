import type { IconType } from 'react-icons/lib';
import { GoHome, GoSearch } from 'react-icons/go';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { CgProfile } from 'react-icons/cg';

type RenderIconProps = {
  IconComponent: IconType;
  className?: string;
};

export const RenderIcon = ({ IconComponent, className }: RenderIconProps) => {
  switch (IconComponent) {
    case GoHome:
      return <GoHome className={className} />;
    case GoSearch:
      return <GoSearch className={className} />;
    case IoMdAddCircleOutline:
      return <IoMdAddCircleOutline className={className} />;
    case CgProfile:
      return <CgProfile className={className} />;
    default:
      return null;
  }
};
