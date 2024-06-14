import { PostDetail } from '@/components/shared/PostDetail';
import { useGetComment } from '@/lib/react-query/queriesAndMutation';
import { useParams } from 'react-router-dom';

export const PostDetailPage = () => {
  const { id } = useParams();
  const { data: c } = useGetComment(parseInt(id!));

  console.log(c);

  return (
    <div className='w-full h-full px-4 py-2 flex flex-row gap-1'>
      <div className='w-2/3 border border-input rounded-md'>
        <PostDetail />
      </div>
      <div className='w-1/3 border border-input border-y-0 border-r-0'>
        <div>{id}</div>
      </div>
    </div>
  );
};
