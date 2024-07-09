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
      <CardContent className='flex w-full min-h-12 items-center truncate py-3 flex-row justify-between gap-2 bg-secondary rounded-t-md'>
        <Link to={`/profile/${comment?.author?.id}`} className='flex items-center gap-2 group'>
          <Avatar>
            <AvatarImage src={comment?.author?.avaUrl} />
            <AvatarFallback>{getInitials(comment?.author?.name || '')}</AvatarFallback>
          </Avatar>
          <div className='px-2 py-1 flex flex-col justify-between text-xs lg:text-base'>
            <p className='font-bold group-hover:underline'>{comment?.author?.name}</p>
            <p className='text-secondary-foreground'>@{comment?.author?.username}</p>
          </div>
        </Link>
        {validUser && (
          <Button className='' variant={'ghost'} onClick={() => hadleDeleteComment(comment.id)}>
            <MdDelete size={20} />
          </Button>
        )}
      </CardContent>
      <Link to={`/post/${comment?.id}`} className='w-full flex flex-col py-1'>
        <CardContent className='flex-1  text-pretty items-start'>
          <div className='overflow-hidden min-h-20 max-w-80 lg:max-w-md flex flex-col justify-between gap-4'>
            <div className='h-fit break-words'>{comment.content}</div>
            <p>{multiFormatDateString(comment?.createdAt?.toString())}</p>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
};
