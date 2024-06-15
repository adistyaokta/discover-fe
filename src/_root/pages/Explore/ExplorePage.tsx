import { PostMedia } from '@/components/shared/PostMedia';
import { useGetPostWithMedia } from '@/lib/react-query/queriesAndMutation';

export const ExplorePage = () => {
  const { data: posts } = useGetPostWithMedia();

  return (
    <div className='w-full h-full px-4 py-2 '>
      <div className='w-full h-1/2 py-2 flex flex-row gap-2'>
        {posts?.map((post) => (
          <PostMedia key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};
