import type { IPostData } from '@/app/type';
import { HeroProfile } from '@/components/shared/HeroProfile';
import { PostCard } from '@/components/shared/PostCard';
import { ProfileSection } from '@/components/shared/ProfileSection';
import { useGetPostByAuthor, useGetUserDetail } from '@/lib/react-query/queriesAndMutation';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

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
    return <p>Loading...</p>;
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
      <div className='min-h-1 lg:max-h-full lg:min-h-[90%] lg:h-full'>
        <ScrollArea
          scrollHideDelay={300}
          className='w-full h-full lg:min-h-full flex flex-col items-center justify-center scroll-smooth py-1 snap-y'
        >
          {posts?.map((post: IPostData) => (
            <div key={post.id} className='snap-center first:mt-2 last:mt-2 my-2 w-full lg:w-1/2 mx-auto flex gap-10'>
              <PostCard post={post} />
            </div>
          ))}
        </ScrollArea>
      </div>
    </div>
  );
};
