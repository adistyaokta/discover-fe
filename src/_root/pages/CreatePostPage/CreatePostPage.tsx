import { PostForm } from '@/components/forms/PostForm';
import { PostDetail } from '@/components/shared/PostDetail';

export const PostDetailPage = () => {
  return (
    <div className='w-full h-full px-4 py-2 flex flex-row gap-1'>
      <div className='w-2/3 border border-input rounded-md'>
        <PostDetail />
      </div>
      <div className='w-1/3 border border-input border-y-0 border-r-0'>aaa</div>
    </div>
  );
};
