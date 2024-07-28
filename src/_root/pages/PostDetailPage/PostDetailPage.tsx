import { CommentCard, PostDetailForm } from '@/components/shared';
import { Loader } from '@/components/shared/Loader';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useGetPostDetail } from '@/lib/react-query/queriesAndMutation';
import { Suspense } from 'react';
import { useParams } from 'react-router-dom';

export const PostDetailPage = () => {
  const { id } = useParams();
  const postId = parseInt(id!);

  const { data: post, isPending, isError } = useGetPostDetail(postId);

  const comments = post?.comments || [];

  if (isPending) {
    return <Loader />;
  }

  if (isError || !post) {
    return <p>Error loading post!</p>;
  }

  return (
    <div className='w-full h-full lg:px-4 py-2 flex flex-col lg:flex-row gap-2'>
      <div className='h-full min-h-full w-full lg:w-2/3 border border-input rounded-md'>
        <Suspense fallback={<Loader />}>
          <PostDetailForm post={post} />
        </Suspense>
      </div>
      <ScrollArea className='min-h-[50%] lg:min-h-full h-1 w-full lg:w-1/3 lg:border lg:border-input lg:border-y-0 lg:border-r-0 lg:px-4'>
        <div className='w-full max-w-full flex flex-col gap-1'>
          {comments.map((comment) => (
            <div key={comment.id}>
              <CommentCard comment={comment} postId={post.id} />
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};
