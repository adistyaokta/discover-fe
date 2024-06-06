import { formatDateString, getInitials, multiFormatDateString } from '@/app/utils/utils';
import { useGetPostDetail } from '@/lib/react-query/queriesAndMutation';
import { FaArrowLeft } from 'react-icons/fa6';
import { Link, useParams } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

export const PostDetail = () => {
  const { id } = useParams();
  const { data: post } = useGetPostDetail(parseInt(id!));

  return (
    <div className='w-full h-full flex flex-col'>
      <div className='w-full min-h-14 flex flex-row gap-2 items-center px-3'>
        <Link to={-1 as unknown as string}>
          <FaArrowLeft
            size={25}
            className='p-1 rounded-full cursor-pointer hover:bg-secondary-foreground hover:text-primary transition-all duration-300'
          />
        </Link>
        <div>Post Detail</div>
      </div>
      <Link to={`/profile/${post?.author?.id}`} className='w-full py-2 px-1 bg-secondary flex items-center gap-2 group'>
        <Avatar>
          <AvatarImage />
          <AvatarFallback>{getInitials(post?.author?.name || '')}</AvatarFallback>
        </Avatar>
        <p className='font-bold group-hover:underline'>{post?.author?.name}</p>
        <p className='text-secondary-foreground'>@{post?.author?.username}</p>
        <p>• {multiFormatDateString(post?.createdAt.toString() || '')}</p>
      </Link>
      {post?.media && (
        <div className='py-4  flex items-center justify-center'>
          <img src='https://placehold.co/500x500' alt='placeholder-image' className='rounded-sm' />
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
