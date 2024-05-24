import { useAuthStore } from '@/app/store/authStore';
import type { IPostData } from '@/app/type';
import { PostForm } from '@/components/forms/PostForm';
import { PostCard } from '@/components/shared/PostCard';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useGetRecentPost } from '@/lib/react-query/queriesAndMutation';

export const HomePage = () => {
  const { user } = useAuthStore();
  const { data: posts } = useGetRecentPost();

  return (
    <div className='w-full h-full px-4 py-2 flex flex-col'>
      {/* <SearchComponent /> */}
      <div className='w-2/3 h-full flex flex-col gap-5'>
        <div className='h-1/6'>
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
    </div>
  );
};
