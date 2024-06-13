import type { IPostData } from '@/app/type';
import { getInitials } from '@/app/utils/utils';
import { useLikeUnlikePost } from '@/lib/react-query/queriesAndMutation';
import { FaHeart, FaRegComment, FaRegHeart } from 'react-icons/fa';
import { FaRetweet } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { Card, CardContent, CardFooter } from '../ui/card';
import { ScrollArea } from '../ui/scroll-area';
import { toast } from '../ui/use-toast';
import { useToast } from '@/components/ui/use-toast';

type PostCardProps = {
  post: IPostData;
};

export const PostCard = ({ post }: PostCardProps) => {
  const { toast } = useToast();
  const { author } = post;
  const { mutateAsync: updateLike } = useLikeUnlikePost();

  async function handleLikePost(postId: number) {
    try {
      const likeResponse = await updateLike(postId);
      toast({ title: likeResponse.message });
    } catch (error: any) {
      toast({ title: error });
    }
  }

  return (
    <Card className={'w-full overflow-hidden flex flex-col gap-1 h-fit '}>
      <CardContent className='flex w-full min-h-12 items-center truncate py-3 flex-row gap-2 bg-secondary rounded-t-md '>
        <Link to={`/profile/${post.authorId}`} className='w-fit flex items-center gap-2 group'>
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
          <div className='h-full overflow-hidden'>
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
        <Button className='px-2' variant={'ghost'} onClick={() => handleLikePost(post.id)}>
          {post?.likedBy.length ? <FaHeart size={20} /> : <FaRegHeart size={20} />}
        </Button>
        <Button className='px-2' variant={'ghost'}>
          <FaRetweet size={23} />
        </Button>
        <Button className='px-2' variant={'ghost'}>
          <FaRegComment size={20} />
        </Button>
      </CardFooter>
    </Card>
  );
};
