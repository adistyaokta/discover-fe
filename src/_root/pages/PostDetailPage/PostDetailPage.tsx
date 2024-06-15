import { CommentCard, PostDetailForm } from '@/components/shared';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useGetPostDetail } from '@/lib/react-query/queriesAndMutation';
import { useParams } from 'react-router-dom';

export const PostDetailPage = () => {
  const { id } = useParams();
  const postId = parseInt(id!);

  const { data: post, isPending, isError } = useGetPostDetail(postId);

  const comments = post?.comments || [];

  if (isPending) {
    return <p>Loading...</p>;
  }

  if (isError || !post) {
    return <p>Error loading post!</p>;
  }

  return (
    <div className='w-full h-full px-4 py-2 flex flex-row gap-1'>
      <div className='w-2/3 border border-input rounded-md'>
        <PostDetailForm post={post} />
      </div>
      <ScrollArea className='w-1/3 border border-input border-y-0 border-r-0 px-4'>
        <div className='flex flex-col gap-1'>
          {comments.map((comment) => (
            <CommentCard key={comment.id} comment={comment} postId={post.id} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};
