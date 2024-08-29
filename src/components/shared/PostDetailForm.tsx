import { useAuthStore } from '@/app/store';
import type { IPostData } from '@/app/type';
import { formatDateString, getInitials, multiFormatDateString } from '@/app/utils/utils';
import { useAddComment, useDeletePost, useLikePost, useUnlikePost } from '@/lib/react-query/queriesAndMutation';
import { useRef, useState } from 'react';
import { FaComment, FaRegHeart } from 'react-icons/fa';
import { FaArrowLeft, FaHeart, FaRegComment } from 'react-icons/fa6';
import { LuMenuSquare } from 'react-icons/lu';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Textarea } from '../ui/textarea';
import { useToast } from '../ui/use-toast';
import { ScrollArea } from '../ui/scroll-area';

type PostDetailProps = {
  post: IPostData;
};

export const PostDetailForm = ({ post }: PostDetailProps) => {
  const { id } = useParams();
  const { user } = useAuthStore();
  const { mutateAsync: deletePost } = useDeletePost();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user: isUser } = useAuthStore();
  const validUser = isUser?.id === user?.id;
  const { mutateAsync: updateLike } = useLikePost();
  const { mutateAsync: deleteLike } = useUnlikePost();
  const { mutateAsync: addComment } = useAddComment();
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const [comment, setComment] = useState<string>('');

  const userHasLiked = post?.likedBy?.some((likedUser: any) => likedUser.id === user?.id);
  const userHasCommented = post?.comments?.some((comment: any) => comment.author.id === user?.id);

  const handleDeletePost = async (id: string) => {
    try {
      const response = await deletePost(id);

      if (!response) return;

      if (response) {
        navigate(-1 as unknown as string);
        toast({ title: 'Post deleted successfully.' });
      }
    } catch (error: any) {
      toast({ title: error });
    }
  };

  async function handleLikePost(postId: number) {
    try {
      if (userHasLiked) {
        const unlikeResponse = await deleteLike(postId);
        return unlikeResponse;
      }
      const likeResponse = await updateLike(postId);

      return likeResponse;
    } catch (error: any) {
      toast({ title: error });
    }
  }

  async function handleAddComment(postId: number) {
    try {
      if (!comment) return;
      const sendComment = await addComment({ postId, content: comment });
      if (inputRef.current) {
        inputRef.current.value = '';
      }
      return sendComment;
    } catch (error: any) {
      toast({ title: error });
    }
  }

  return (
    <div className='w-full max-h-full overflow-hidden h-full flex flex-col'>
      <div className='w-full min-h-14 flex flex-row gap-2 items-center px-3'>
        <Link to={-1 as unknown as string}>
          <FaArrowLeft
            size={25}
            className='p-1 rounded-full cursor-pointer hover:bg-secondary-foreground hover:text-primary transition-all duration-300'
          />
        </Link>
        <div>Post Detail</div>
      </div>
      <ScrollArea>
        <div className='w-full bg-secondary flex justify-between items-center gap-2'>
          <Link to={`/profile/${post?.author?.id}`} className='w-5/6 py-2 px-1 flex items-center gap-2 group'>
            <Avatar>
              <AvatarImage src={post?.author.avaUrl} />
              <AvatarFallback>{getInitials(post?.author?.name || '')}</AvatarFallback>
            </Avatar>
            <div className='w-fit px-2 flex flex-col justify-center'>
              <p className='font-bold group-hover:underline'>{post?.author?.name}</p>
              <p className='text-secondary-foreground'>@{post?.author?.username}</p>
            </div>
          </Link>

          {validUser && (
            <div className='pr-3'>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <LuMenuSquare size={25} />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => handleDeletePost(id!)} className='cursor-pointer'>
                    Delete Post
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>
        <div className='px-2 py-3 min-h-20 w-full flex flex-col justify-between'>
          <p>{post?.caption}</p>
        </div>
        {post?.media && (
          <div className='w-full h-1/2 flex justify-center p-2'>
            <img alt='image-prev' className='w-full lg:w-1/2 object-cover rounded-md' src={post.media} />
          </div>
        )}
        <div className='px-2 py-1 flex justify-between text-xs lg:text-base'>
          <p className=''>{multiFormatDateString(post?.createdAt.toString() || '')}</p>
        </div>

        <div className='w-full flex flex-row justify-center items-center min-h-16 border border-input px-3 border-x-0'>
          <Button className='px-2 flex gap-2' variant={'ghost'} onClick={() => handleLikePost(post?.id!)}>
            {post?.likedBy.length && userHasLiked ? <FaHeart size={20} /> : <FaRegHeart size={20} />}
            {post?.likedBy.length}
          </Button>
          <Button className='px-2 flex gap-2' variant={'ghost'}>
            {post?.comments.length && userHasCommented ? <FaComment size={20} /> : <FaRegComment size={20} />}
            {post?.comments.length}
          </Button>
        </div>

        <div className='w-full min-h-52 h-32 flex flex-col items-center justify-center px-2 py-1 gap-2'>
          <div className='self-start w-full'>
            <Link to={`/profile/${user?.id}`} className='w-5/6 py-2 px-1  flex items-center gap-2 group'>
              <Avatar>
                <AvatarImage src={user?.avaUrl} />
                <AvatarFallback>{getInitials(user?.name || '')}</AvatarFallback>
              </Avatar>
              <p className='font-bold group-hover:underline'>{user?.name}</p>
              <p className='text-secondary-foreground'>@{user?.username}</p>
            </Link>
          </div>
          <Textarea
            className='h-full'
            onBlur={(e) => {
              const { value } = e.target;
              setComment(value);
            }}
            ref={inputRef}
          />
          <Button className='w-full' onClick={() => handleAddComment(post?.id!)}>
            COMMENT
          </Button>
        </div>
      </ScrollArea>
    </div>
  );
};
