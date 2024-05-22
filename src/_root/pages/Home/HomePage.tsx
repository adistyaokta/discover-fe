import { useAuthStore } from '@/app/store/authStore';
import type { IPostData } from '@/app/type';
import { PostForm } from '@/components/forms/PostForm';
import { SearchComponent } from '@/components/shared/SearchComponent';
import { useGetRecentPost } from '@/lib/react-query/queriesAndMutation';

export const HomePage = () => {
  const { user } = useAuthStore();
  const { data: posts } = useGetRecentPost();

  return (
    <div className=' w-full  h-full p-2 flex flex-col'>
      {/* <SearchComponent /> */}
      <div className='w-1/2 p-2'>
        <PostForm />
      </div>
      <div>
        <ul>
          {posts?.map((post: IPostData) => (
            <li key={post.id}>{post.caption}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
