import { useAuthStore } from '@/app/store/authStore';
import type { IPostData } from '@/app/type';
import { useGetRecentPost } from '@/lib/react-query/queriesAndMutation';

export const HomePage = () => {
  const { user } = useAuthStore();
  const { data: posts } = useGetRecentPost();

  return (
    <div>
      <h1>Welcome {user?.name}</h1>
      <ul>
        {posts?.map((post: IPostData) => (
          <li key={post.id}>{post.caption}</li>
        ))}
      </ul>
    </div>
  );
};
