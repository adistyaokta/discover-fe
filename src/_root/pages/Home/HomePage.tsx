import type { IPostData } from '@/app/type';
import { PostForm } from '@/components/forms/PostForm';
import { PostCard } from '@/components/shared/PostCard';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useGetRecentPost } from '@/lib/react-query/queriesAndMutation';
import UploadImage from './upload';

export const HomePage = () => {
  const { data: posts } = useGetRecentPost();

  return (
    <div className='w-full h-full px-4 py-2 flex flex-row gap-1'>
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
      <div className='w-1/3 border border-input border-y-0 border-r-0'>{/* <UploadImage /> */}</div>
    </div>
  );
};
