import { useAuthStore } from '@/app/store';
import { formatDateString, getInitials, multiFormatDateString } from '@/app/utils/utils';
import {
  useAddComment,
  useDeletePost,
  useGetPostDetail,
  useLikePost,
  useUnlikePost
} from '@/lib/react-query/queriesAndMutation';
import { FaArrowLeft, FaHeart, FaRegComment, FaRetweet } from 'react-icons/fa6';
import { LuMenuSquare } from 'react-icons/lu';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { useToast } from '../ui/use-toast';
import { Button } from '../ui/button';
import { FaComment, FaRegHeart } from 'react-icons/fa';
import { Textarea } from '../ui/textarea';
import { useState } from 'react';

export const PostDetail = () => {
  const { id } = useParams();
  const { data: post } = useGetPostDetail(parseInt(id!));
  const { user } = useAuthStore();
  const { mutateAsync: deletePost } = useDeletePost();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user: isUser } = useAuthStore();
  const validUser = isUser?.id === user?.id;
  const { mutateAsync: updateLike } = useLikePost();
  const { mutateAsync: deleteLike } = useUnlikePost();
  const { mutateAsync: addComment } = useAddComment();

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
      console.log(sendComment);
      return sendComment;
    } catch (error: any) {
      console.log(error);
      toast({ title: error });
    }
  }

  return (
    <div className='w-full h-full overflow-hidden flex flex-col'>
      <div className='w-full min-h-14 flex flex-row gap-2 items-center px-3'>
        <Link to={-1 as unknown as string}>
          <FaArrowLeft
            size={25}
            className='p-1 rounded-full cursor-pointer hover:bg-secondary-foreground hover:text-primary transition-all duration-300'
          />
        </Link>
        <div>Post Detail</div>
      </div>
      <div className='w-full bg-secondary flex justify-between items-center gap-2'>
        <Link to={`/profile/${post?.author?.id}`} className='w-5/6 py-2 px-1  flex items-center gap-2 group'>
          <Avatar>
            <AvatarImage src={post?.author.avaUrl} />
            <AvatarFallback>{getInitials(post?.author?.name || '')}</AvatarFallback>
          </Avatar>
          <p className='font-bold group-hover:underline'>{post?.author?.name}</p>
          <p className='text-secondary-foreground'>@{post?.author?.username}</p>
          <p>• {multiFormatDateString(post?.createdAt.toString() || '')}</p>
        </Link>

        {validUser && (
          <div className='pr-3'>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <LuMenuSquare size={25} />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => handleDeletePost(id!)}>Delete Post</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
      <div className='px-2 py-3 w-full flex flex-col justify-between'>
        <p>{post?.caption}</p>
      </div>
      {post?.media && (
        <div className='w-full h-1/2 flex justify-center py-2'>
          <img alt='image-prev' className='w-1/2 object-cover rounded-3xl' src={post.media} />
        </div>
      )}
      <p className='self-end px-2'>{formatDateString(post?.createdAt.toString()!)}</p>

      <div className='w-full flex flex-row justify-center items-center min-h-16 border border-input px-3 border-x-0'>
        <Button className='px-2 flex gap-2' variant={'ghost'} onClick={() => handleLikePost(post?.id!)}>
          {post?.likedBy.length && userHasLiked ? <FaHeart size={20} /> : <FaRegHeart size={20} />}
          {post?.likedBy.length}
        </Button>
        <Button className='px-2' variant={'ghost'}>
          <FaRetweet size={23} />
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
        />
        <Button className='w-full' onClick={() => handleAddComment(post?.id!)}>
          COMMENT
        </Button>
      </div>
    </div>
  );
};
