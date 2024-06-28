import type { IUser } from '@/app/type';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { getInitials } from '@/app/utils/utils';
import { DialogDescription } from '@radix-ui/react-dialog';

type FollowerModalProps = {
  follow: Partial<IUser[]>;
  label: string;
};

const FollowerModal = ({ follow, label }: FollowerModalProps) => {
  return (
    <Dialog aria-describedby={`${label}-modal`}>
      <DialogTrigger className='capitalize'>
        {follow.length} {label}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='capitalize flex flex-col gap-3 py-2 text-center'>{label}</DialogTitle>
          {follow?.map((foll) => (
            <div key={foll?.id} className='flex items-center justify-start gap-4 px-1'>
              <Avatar>
                <AvatarImage src={foll?.avaUrl} className='aspect-square' />
                <AvatarFallback>{getInitials(foll?.name!)}</AvatarFallback>
              </Avatar>
              <div className='flex flex-col justify-center items-center w-full'>
                <p className='text-lg font-bold font-outfit w-full'>@{foll?.username!}</p>
                <p className='text-lg font-outfit w-full'>{foll?.name!}</p>
              </div>
            </div>
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
    <div className='w-full h-full border-b flex flex-row justify-start px-2 py-3'>
      <div className='w-1/2 max-h-20 overflow-hidden p-2 flex items-start'>
        <p className='text-pretty'>{bio}</p>
      </div>
      <div className='w-1/2 px-2 py-1 items-center flex flex-row justify-end text-left gap-2'>
        <div className='w-32 text-center'>{stat} Moments</div>
        <div className='w-32 text-center'>
          <FollowerModal follow={followers!} label='follower' />
        </div>
        <div className='w-32 text-center'>
          <FollowerModal follow={following!} label='following' />
        </div>
      </div>
    </div>
  );
};
