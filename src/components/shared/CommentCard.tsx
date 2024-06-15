import { Link } from 'react-router-dom';
import { Card, CardContent } from '../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { getInitials, multiFormatDateString } from '@/app/utils/utils';
import type { IComment } from '@/app/type';
import { Button } from '../ui/button';
import { MdDelete } from 'react-icons/md';
import { useAuthStore } from '@/app/store/index';
import { useDeleteComment } from '@/lib/react-query/queriesAndMutation';
import { useToast } from '../ui/use-toast';

type CommentCardProps = {
  comment: IComment;
  postId: number;
};

export const CommentCard = ({ comment, postId }: CommentCardProps) => {
  if (!comment) return null;
  const { user: isUser } = useAuthStore();
  const { mutateAsync: deleteComment } = useDeleteComment();
  const { toast } = useToast();

  const validUser = isUser?.id === comment.author.id;

  async function hadleDeleteComment(commentId: number) {
    try {
      const deletedComment = await deleteComment({ postId, commentId });

      return deletedComment;
    } catch (error: any) {
      toast({ title: error });
    }
  }

  return (
    <Card className='w-full overflow-hidden flex flex-col gap-1'>
      <CardContent className='flex w-full min-h-12 items-center truncate py-3 flex-row gap-2 bg-secondary rounded-t-md'>
        <Link to={`/profile/${comment?.author?.id}`} className='flex items-center gap-2 group'>
          <Avatar>
            <AvatarImage src={comment?.author?.avaUrl} />
            <AvatarFallback>{getInitials(comment?.author?.name || '')}</AvatarFallback>
          </Avatar>
          <p className='font-bold group-hover:underline'>{comment?.author?.name}</p>
          <p className='text-secondary-foreground'>@{comment?.author?.username}</p>
        </Link>
        <p>• {multiFormatDateString(comment?.createdAt?.toString())}</p>
        {validUser && (
          <Button className='ml-auto' variant={'ghost'} onClick={() => hadleDeleteComment(comment.id)}>
            <MdDelete size={20} />
          </Button>
        )}
      </CardContent>
      <Link to={`/post/${comment?.id}`} className='w-full flex flex-col py-1'>
        <CardContent className='flex-1 text-pretty items-start'>
          <div className='overflow-hidden'>
            <div className='h-fit'>{comment.content}</div>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
};
