import type { IPostData } from '@/app/type';
import { PostForm } from '@/components/forms/PostForm';
import { PostCard, SearchComponent } from '@/components/shared';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useGetMostLikedPost, useGetRecentPost } from '@/lib/react-query/queriesAndMutation';

export const HomePage = () => {
  const { data: posts } = useGetRecentPost();
  const { data: mostLikedPosts } = useGetMostLikedPost();

  return (
    <div className='w-full h-full px-4 py-2 flex flex-row justify-center gap-1'>
      <div className='w-2/3 h-full flex flex-col gap-5'>
        <div className='h-1/6 pr-5'>
          <PostForm />
        </div>
        <ScrollArea className='w-full h-full pr-5 scroll-smooth'>
          <div className='grid grid-cols-1 gap-2'>
            {posts?.map((post: IPostData) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </ScrollArea>
      </div>
      <div className='w-1/3 h-full border border-input border-y-0 border-r-0 flex flex-col justify-between gap-2'>
        <SearchComponent />
        <p className='px-2 text-center font-outfit font-bold tracking-wider'> • Trending Moment • </p>
        <ScrollArea className='h-full flex px-2'>
          {mostLikedPosts?.map((post) => (
            <PostCard key={post.id} post={post} className='my-1' />
          ))}
        </ScrollArea>
      </div>
    </div>
  );
};
