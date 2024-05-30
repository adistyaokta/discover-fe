type ProfileSectionProps = {
  likes?: string;
  bio: string;
  id: number | string;
  stat: number;
};

export const ProfileSection = ({ bio, stat }: ProfileSectionProps) => {
  return (
    <div className='w-full h-full border-b flex flex-row justify-start px-2 py-3'>
      <div className='w-1/2 px-2 py-1 items-center flex flex-row justify-start text-left gap-2'>
        <div className='w-32'>{stat} Moments</div>
        <div className='w-32'>200 Follower</div>
        <div className='w-32'>102 Following</div>
      </div>
      <div className='w-1/2 max-h-20 overflow-hidden p-2 flex items-start'>
        <p className='text-pretty'>{bio}</p>
      </div>
    </div>
  );
};
