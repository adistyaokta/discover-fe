import { Loader } from '@/components/shared';
import { PostCard } from '@/components/shared/PostCard';
import { useGetRecentPosts } from '@/lib/react-query/queriesAndMutations';
import type { Models } from 'appwrite';

export const Home = () => {
  const {
    data: posts,
    isPending: isLoading,
    isError: isErrorPosts,
  } = useGetRecentPosts();

  return (
    <div>
      <div>
        <h2>Home Feed</h2>
        {isLoading && !posts ? (
          <Loader />
        ) : (
          <div>
            {posts?.documents.map((post: Models.Document) => (
              <PostCard post={post} key={post.$id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
