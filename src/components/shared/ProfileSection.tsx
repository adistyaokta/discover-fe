import type { IUser } from '@/app/type';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { getInitials } from '@/app/utils/utils';
import { DialogDescription } from '@radix-ui/react-dialog';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';

type FollowerModalProps = {
  follow: Partial<IUser[]>;
  label: string;
};

const FollowerModal = ({ follow, label }: FollowerModalProps) => {
  return (
    <Dialog aria-describedby={`${label}-modal`}>
      <DialogTrigger>
        <Button className='w-24 lg:w-32 capitalize font-outfit text-base' variant={'ghost'}>
          {follow.length} {follow.length === 1 ? label : `${label}s`}
        </Button>
      </DialogTrigger>

      <DialogContent id='follower-modal'>
        <DialogHeader>
          <DialogTitle className='capitalize flex flex-col gap-3 py-2 text-center'>{label}</DialogTitle>
          {follow?.map((foll) => (
            <Link
              key={foll?.id}
              to={`/profile/${foll?.id}`}
              onClick={() => {
                const dial = document.getElementById('follower-modal') as HTMLDialogElement;
                dial.close();
              }}
              className='flex items-center justify-start gap-2 lg:gap-4 p-1 rounded-md hover:bg-secondary'
            >
              <Avatar>
                <AvatarImage src={foll?.avaUrl} className='aspect-square' />
                <AvatarFallback>{getInitials(foll?.name ?? '')}</AvatarFallback>
              </Avatar>
              <div className=' h-full flex flex-col text-left items-center'>
                <p className='text-lg font-bold font-outfit w-full'>@{foll?.username!}</p>
                <p className='text-lg font-outfit w-full'>{foll?.name!}</p>
              </div>
            </Link>
          ))}
          <DialogDescription />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

type ProfileSectionProps = {
  likes?: string;
  bio: string;
  id: number | string;
  stat: number;
  followers?: Partial<IUser[]>;
  following?: Partial<IUser[]>;
};

export const ProfileSection = ({ bio, stat, followers, following }: ProfileSectionProps) => {
  return (
    <div className='w-full h-full border-b flex flex-col lg:flex-row justify-start px-2 py-3'>
      <div className='w-full h-full lg:w-1/2 max-h-20 overflow-hidden justify-center lg:justify-start p-2 flex items-center'>
        <p className='text-pretty'>{bio}</p>
      </div>
      <div className='w-full max-h-20 lg:w-1/2 px-2 py-1 items-center flex flex-row justify-center lg:justify-end text-left gap-2'>
        <p className='w-24 lg:w-32 text-center font-outfit text-base'>
          {stat} {stat === 1 ? 'Post' : 'Posts'}
        </p>
        <FollowerModal follow={followers!} label='follower' />
        <FollowerModal follow={following!} label='following' />
      </div>
    </div>
  );
};
