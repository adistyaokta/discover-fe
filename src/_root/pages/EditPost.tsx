import { PostForm } from '@/components/forms/PostForm';
import { Loader } from '@/components/shared';
import { useGetPostById } from '@/lib/react-query/queriesAndMutations';
import { useParams } from 'react-router-dom';

export const EditPost = () => {
  const { id } = useParams();
  const { data: post, isPending } = useGetPostById(id || '');

  if (isPending) return <Loader />;

  return (
    <div className='fuseInfiniteQuerylex flex-1'>
      <div className='container'>
        <div className='max-w-5xl flex justify-start items-start gap-2'>
          Edit post
        </div>
        <PostForm action='Update' post={post} />
      </div>
    </div>
  );
};
