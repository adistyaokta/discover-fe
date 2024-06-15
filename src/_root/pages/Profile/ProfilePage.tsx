import type { IPostData } from '@/app/type';
import { HeroProfile } from '@/components/shared/HeroProfile';
import { PostCard } from '@/components/shared/PostCard';
import { ProfileSection } from '@/components/shared/ProfileSection';
import { useGetPostByAuthor, useGetUserDetail } from '@/lib/react-query/queriesAndMutation';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useParams } from 'react-router-dom';

export const ProfilePage = () => {
  const { userId } = useParams();
  const { data: user } = useGetUserDetail(parseInt(userId!));
  const { data: posts } = useGetPostByAuthor(parseInt(userId!));

  return (
    <div className='w-full h-full overflow-hidden flex flex-col px-4 py-2'>
      <div className='h-1/3'>
        <HeroProfile user={user!} />
      </div>
      <div className='h-1/12'>
        <ProfileSection bio={user?.bio || ''} id={userId!} stat={posts?.length!} />
      </div>
      <ScrollArea
        scrollHideDelay={300}
        className='w-1/2 mx-auto h-full flex flex-col justify-center scroll-smooth py-1 px-5 '
      >
        {posts?.map((post: IPostData, index: number) => (
          <div key={post.id} className={index !== 0 ? 'mt-2' : ''}>
            <PostCard post={post} />
          </div>
        ))}
      </ScrollArea>
    </div>
  );
};
