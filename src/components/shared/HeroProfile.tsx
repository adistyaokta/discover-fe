import { getInitials } from '@/app/utils/utils';
import { IoSettingsOutline } from 'react-icons/io5';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';

type HeroProfileProps = {
  name: string;
  username: string;
};

export const HeroProfile = ({ name, username }: HeroProfileProps) => {
  return (
    <div className='w-full h-full relative border-b flex flex-col justify-around '>
      <div className='text-9xl h-full tracking-normal flex items-center'>{name}</div>
      <div className='w-full  flex flex-row justify-between items-center p-2'>
        <div className='flex items-center gap-2'>
          <Avatar>
            <AvatarImage />
            <AvatarFallback>{getInitials(name)}</AvatarFallback>
          </Avatar>
          <p className='text-lg'>@{username}</p>
        </div>
        <Button variant={'outline'}>Edit Profile</Button>
      </div>
      <Button
        className='absolute top-2 right-2 w-8 h-8 flex items-center justify-center group'
        variant={'circle'}
        size={'icon'}
      >
        <IoSettingsOutline size={20} className='text-white group-hover:text-primary transition-all duration-300' />
      </Button>
    </div>
  );
};
