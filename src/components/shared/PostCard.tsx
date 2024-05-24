import type { IPostData } from '@/app/type';
import { Card, CardContent, CardFooter } from '../ui/card';
import { ScrollArea } from '../ui/scroll-area';
import { useAuthStore } from '@/app/store/authStore';
import { getInitials } from '@/app/utils/utils';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';

type PostCardProps = {
  post: IPostData;
};

export const PostCard = ({ post }: PostCardProps) => {
  const { author } = post;
  const { user } = useAuthStore();

  return (
    <Card className='w-full h-40 flex flex-col gap-1'>
      <CardContent className='flex w-full items-center truncate py-3 flex-row gap-2 bg-secondary rounded-t-md'>
        <Avatar>
          <AvatarImage />
          <AvatarFallback>{getInitials(author.name || user?.name || '')}</AvatarFallback>
        </Avatar>
        <p className='font-bold'>{author ? author.name : user?.name}</p>
        <p className='text-secondary-foreground'>@{author ? author.username : user?.username}</p>
      </CardContent>
      <CardFooter className='flex-1 py-2 h-full text-pretty items-start overflow-hidden'>
        <div className='h-full overflow-hidden'>
          <ScrollArea className='h-full overflow-y-auto'>{post.caption}</ScrollArea>
        </div>
      </CardFooter>
    </Card>
  );
};
