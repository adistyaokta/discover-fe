import type { IUser } from '@/app/type';

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
        <div className='w-32'>{stat} Moments</div>
        <div className='w-32'>{followers?.length} Follower</div>
        <div className='w-32'>{following?.length} Following</div>
      </div>
    </div>
  );
};
