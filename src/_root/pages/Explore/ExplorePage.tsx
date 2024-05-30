import type { IPostData } from '@/app/type';
import { PostCard } from '@/components/shared/PostCard';
import { useGetRandomPosts } from '@/lib/react-query/queriesAndMutation';

export const ExplorePage = () => {
  const { data: posts } = useGetRandomPosts(8);
  return (
    <div className='w-full h-full px-4 py-2 flex flex-col justify-between'>
      <div className='w-full h-1/2 py-2 flex flex-row justify-around'>
        <div className='w-1/6 h-full rounded-lg border border-input '>lalala</div>
        <div className='w-1/6 h-full rounded-lg border border-input '>lalala</div>
        <div className='w-1/6 h-full rounded-lg border border-input '>lalala</div>
        <div className='w-1/6 h-full rounded-lg border border-input '>lalala</div>
        <div className='w-1/6 h-full rounded-lg border border-input '>lalala</div>
      </div>
      <div className='w-full h-1/2 grid grid-cols-4 gap-3 py-2'>
        {posts?.map((post: IPostData) => (
          <div key={post.id} className=''>
            <PostCard key={post.id} post={post} />
          </div>
        ))}
      </div>
    </div>
  );
};
