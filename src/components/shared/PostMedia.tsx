import type { IPostData } from '@/app/type';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { getInitials } from '@/app/utils/utils';
import { Button } from '../ui/button';
import { useAuthStore } from '@/app/store/authStore';
import { useLikePost, useUnlikePost } from '@/lib/react-query/queriesAndMutation';
import { FaHeart, FaRegHeart, FaComment, FaRegComment } from 'react-icons/fa';
import { useToast } from '../ui/use-toast';

type PostMediaProps = {
  post: IPostData;
};

export const PostMedia = ({ post }: PostMediaProps) => {
  if (!post) return null;

  const { user } = useAuthStore();
  const { toast } = useToast();
  const navigate = useNavigate();
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
    <div
      className='w-full h-full bg-red-900 rounded-lg border border-input bg-cover bg-center flex flex-col flex-grow justify-end cursor-pointer relative group/card overflow-hidden'
      style={{ backgroundImage: `url(${post.media})` }}
      onClick={(e) => {
        const target = e.target as HTMLElement;
        if (!target.closest('.group')) {
          handleAddComment(post.id);
        }
      }}
    >
      <div className='w-full h-1/6 p-1 bg-black rounded-2xl rounded-b-none bg-opacity-10 flex flex-col group-hover/card:bg-opacity-50 group-hover/card:h-1 lg:group-hover/card:h-1/4 transition-all duration-300 backdrop-blur-md'>
        <Link to={`/profile/${post.author.id}`} className='w-full flex items-center gap-2 group py-1'>
          <Avatar>
            <AvatarImage src={post.author?.avaUrl} />
            <AvatarFallback>{getInitials(post.author?.name || '')}</AvatarFallback>
          </Avatar>
          <div className='flex flex-col'>
            <p className='font-bold text-sm group-hover:underline'>{post.author?.name}</p>
            <p className='text-secondary-foreground text-xs'>@{post.author?.username}</p>
          </div>
        </Link>
        <p className='opacity-100 lg:opacity-0 lg:group-hover/card:opacity-100 group-hover/card:opacity-0 h-full transition-all duration-75 '>
          {post.caption}
        </p>
      </div>
      <div className='absolute top-1/2 transform -translate-y-1/2 right-0 flex flex-col items-center justify-center h-full w-12'>
        <Button
          className='px-2 flex items-center justify-center gap-2'
          variant={'plain'}
          onClick={(e) => {
            e.stopPropagation();
            handleLikePost(post.id);
          }}
        >
          {post?.likedBy.length && userHasLiked ? <FaHeart size={20} /> : <FaRegHeart size={20} />}
          {post?.likedBy.length}
        </Button>
        <Button
          className='px-2 flex items-center justify-center gap-2'
          variant={'plain'}
          onClick={() => handleAddComment(post.id)}
        >
          {post?.comments.length && userHasCommented ? <FaComment size={20} /> : <FaRegComment size={20} />}
          {post?.comments.length}
        </Button>
      </div>
    </div>
  );
};
