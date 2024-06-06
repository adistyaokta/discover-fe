import { useAuthStore } from '@/app/store/authStore';
import type { IPostData } from '@/app/type';
import { getInitials, multiFormatDateString } from '@/app/utils/utils';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Card, CardContent, CardFooter } from '../ui/card';
import { ScrollArea } from '../ui/scroll-area';
import { Link } from 'react-router-dom';

type PostCardProps = {
  post: IPostData;
};

export const PostCard = ({ post }: PostCardProps) => {
  const { author } = post;

  return (
    <Card className='w-full h-40 overflow-hidden flex flex-col gap-1'>
      <CardContent className='flex w-full min-h-12 items-center truncate py-3 flex-row gap-2 bg-secondary rounded-t-md '>
        <Link to={`/profile/${post.authorId}`} className='w-fit flex items-center gap-2 group'>
          <Avatar>
            <AvatarImage />
            <AvatarFallback>{getInitials(author?.name || '')}</AvatarFallback>
          </Avatar>
          <p className='font-bold group-hover:underline'>{author?.name}</p>
          <p className='text-secondary-foreground'>@{author?.username}</p>
        </Link>
        <p>• {multiFormatDateString(post.createdAt.toString())}</p>
      </CardContent>
      <Link to={`/post/${post.id}`} className='h-full'>
        <CardFooter className='flex-1 py-2 h-full text-pretty items-start overflow-hidden'>
          <div className='h-full overflow-hidden'>
            <ScrollArea className='h-full overflow-y-auto'>{post.caption}</ScrollArea>
          </div>
        </CardFooter>
      </Link>
    </Card>
  );
};
