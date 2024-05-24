import type { IPostData } from '@/app/type';
import { HeroProfile } from '@/components/shared/HeroProfile';
import { PostCard } from '@/components/shared/PostCard';
import { ProfileSection } from '@/components/shared/ProfileSection';
import { useGetPostByAuthor, useGetUserDetail } from '@/lib/react-query/queriesAndMutation';
import { ScrollArea } from '@/components/ui/scroll-area';

type ProfileProps = {
  id: number;
};

export const ProfilePage = ({ id }: ProfileProps) => {
  const { data: user } = useGetUserDetail(id);
  const { data: posts } = useGetPostByAuthor(id);

  return (
    <div className='w-full h-full overflow-hidden flex flex-col px-4 py-2'>
      <div className='h-1/3'>
        <HeroProfile name={user?.name || ''} username={user?.username || ''} />
      </div>
      <div className='h-1/12'>
        <ProfileSection bio={user?.bio || ''} id={id} stat={posts?.length!} />
      </div>
      <ScrollArea scrollHideDelay={300} className='w-full h-full scroll-smooth py-2 '>
        <div className='grid grid-cols-2 gap-2 '>
          {posts?.map((post: IPostData) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};
