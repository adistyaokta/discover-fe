import { useAuthStore } from '@/app/store';
import type { IPostData } from '@/app/type';
import { getInitials } from '@/app/utils/utils';
import { useToast } from '@/components/ui/use-toast';
import { useLikePost, useUnlikePost } from '@/lib/react-query/queriesAndMutation';
import { FaComment, FaHeart, FaRegComment, FaRegHeart } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { Card, CardContent, CardFooter } from '../ui/card';
import { ScrollArea } from '../ui/scroll-area';

type PostCardProps = {
  post: IPostData;
  className?: string;
};

export const PostCard = ({ post, className }: PostCardProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { author } = post;
  const { user } = useAuthStore();
  const { mutateAsync: updateLike } = useLikePost();
  const { mutateAsync: deleteLike } = useUnlikePost();

  const userHasLiked = post.likedBy.some((likedUser: any) => likedUser.id === user?.id);
  const userHasCommented = post.comments.some((comment: any) => comment.author.id === user?.id);

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
    navigate(`/post/${postId}`);
  }

  return (
    <Card className={`w-full overflow-hidden flex flex-col gap-1 h-full ${className}`}>
      <CardContent className='flex w-full min-h-12 items-center truncate py-3 flex-row gap-2 bg-secondary rounded-t-md '>
        <Link to={`/profile/${post.author.id}`} className='w-fit flex items-center gap-2 group'>
          <Avatar>
            <AvatarImage src={author?.avaUrl} />
            <AvatarFallback>{getInitials(author?.name || '')}</AvatarFallback>
          </Avatar>
          <p className='font-bold group-hover:underline'>{author?.name}</p>
          <p className='text-secondary-foreground'>@{author?.username}</p>
        </Link>
        {/* <p>• {multiFormatDateString(post.createdAt.toString())}</p> */}
      </CardContent>

      <Link to={`/post/${post.id}`} className='h-full min-h-24 w-full flex flex-col'>
        <CardContent className='flex-1 w-full h-full text-pretty items-start overflow-hidden'>
          <div className='h-full min-h-20 overflow-hidden'>
            <ScrollArea className='h-full overflow-y-auto'>{post.caption}</ScrollArea>
          </div>
        </CardContent>
        {post.media && (
          <div className='w-1/2 mx-auto h-auto flex justify-center items-center bg-transparent'>
            <img alt='image-prev' className='w-full h-auto rounded-3xl' src={post.media} />
          </div>
        )}
      </Link>
      <CardFooter className='w-full flex flex-row justify-center py-2 items-center'>
        <Button className='px-2 flex gap-2' variant={'ghost'} onClick={() => handleLikePost(post.id)}>
          {post?.likedBy.length && userHasLiked ? <FaHeart size={20} /> : <FaRegHeart size={20} />}
          {post?.likedBy.length}
        </Button>
        {/* <Button className='px-2' variant={'ghost'}>
          <FaRetweet size={23} />
        </Button> */}
        <Button className='px-2 flex gap-2' variant={'ghost'} onClick={() => handleAddComment(post.id)}>
          {post?.comments.length && userHasCommented ? <FaComment size={20} /> : <FaRegComment size={20} />}
          {post?.comments.length}
        </Button>
      </CardFooter>
    </Card>
  );
};
