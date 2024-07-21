import type { IPostData } from '@/app/type';
import { HeroProfile } from '@/components/shared/HeroProfile';
import { PostCard } from '@/components/shared/PostCard';
import { ProfileSection } from '@/components/shared/ProfileSection';
import { useGetPostByAuthor, useGetUserDetail } from '@/lib/react-query/queriesAndMutation';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { Loader } from '@/components/shared/Loader';

export const ProfilePage = () => {
  const { userId } = useParams();
  const {
    data: user,
    isLoading: userLoading,
    isError: userError,
    refetch: refetchUser
  } = useGetUserDetail(parseInt(userId!));
  const {
    data: posts,
    isLoading: postsLoading,
    isError: postsError,
    refetch: refetchPosts
  } = useGetPostByAuthor(parseInt(userId!));

  useEffect(() => {
    refetchUser();
    refetchPosts();
  }, [userId, refetchUser, refetchPosts]);

  if (userLoading || postsLoading) {
    return <Loader />;
  }

  if (userError || postsError) {
    return <p>Error fetching data</p>;
  }

  return (
    <div className='w-full h-full overflow-hidden'>
      <div className='lg:h-1/3'>
        <HeroProfile user={user!} />
      </div>
      <div className='h-24 lg:h-20'>
        <ProfileSection
          bio={user?.bio || ''}
          id={userId!}
          stat={posts?.length!}
          followers={user?.followers}
          following={user?.following}
        />
      </div>
      <div className='w-full overflow-hidden h-full flex justify-center items-center'>
        <ScrollArea scrollHideDelay={300} className='flex flex-col w-full lg:w-1/2 min-h-full h-full lg:pb-96'>
          {posts?.map((post: IPostData) => (
            <PostCard post={post} key={post.id} className='my-2 last:mb-96' />
          ))}
          <div className='my-40' />
        </ScrollArea>
      </div>
    </div>
  );
};
