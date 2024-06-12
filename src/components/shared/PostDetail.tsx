import { formatDateString, getInitials, multiFormatDateString } from '@/app/utils/utils';
import { useDeletePost, useGetPostDetail } from '@/lib/react-query/queriesAndMutation';
import { FaArrowLeft } from 'react-icons/fa6';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '../ui/dropdown-menu';
import { LuMenuSquare } from 'react-icons/lu';
import { useToast } from '../ui/use-toast';
import { useAuthStore } from '@/app/store';

export const PostDetail = () => {
  const { id } = useParams();
  const { data: post } = useGetPostDetail(parseInt(id!));
  const { mutateAsync: deletePost } = useDeletePost();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user: isUser } = useAuthStore();
  const validUser = isUser?.id === post?.author.id;

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
      {post?.media && (
        <div className='w-full h-full flex justify-center py-2'>
          <img alt='image-prev' className='w-1/2 object-cover' src={post.media} />
        </div>
      )}
      <div className='px-2 py-3 w-full min-h-44 flex flex-col justify-between'>
        <p>{post?.caption}</p>
        <p className='self-end'>{formatDateString(post?.createdAt.toString()!)}</p>
      </div>
      <div className='w-full min-h-20 border border-input px-3 border-x-0' />
    </div>
  );
};
