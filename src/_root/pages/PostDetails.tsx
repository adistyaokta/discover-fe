import { Loader } from '@/components/shared';
import { PostStats } from '@/components/shared/PostStats';
import { Button } from '@/components/ui/button';
import { useUserContext } from '@/context/AuthContext';
import {
  useDeletePost,
  useGetPostById,
} from '@/lib/react-query/queriesAndMutations';
import { multiFormatDateString } from '@/lib/utils';
import { Edit2Icon, Trash } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';

export const PostDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useUserContext();
  const { mutate: deletePost } = useDeletePost();

  const { data: post, isPending } = useGetPostById(id || '');

  const handleDeletePost = () => {
    deletePost({ postId: id, imageId: post?.imageId });
    navigate(-1);
  };

  return (
    <div>
      {isPending ? (
        <Loader />
      ) : (
        <div className='flex items-center px-2 gap-2'>
          <img
            src={post?.creator.imageUrl}
            alt='photo-avatar'
            className='rounded-full w-10 h-10'
          />
          <div>
            <p>{post?.creator.name}</p>
            <p>{multiFormatDateString(post!.$createdAt)}</p>
            <p>-</p>
            <p>{post?.location}</p>
          </div>

          <div>
            <Link
              to={`/update-post?/${post?.$id}`}
              className={`${user.id !== post?.creator.$id && 'hidden'}`}
            >
              <Edit2Icon />
            </Link>
            <Button
              onClick={handleDeletePost}
              variant={'ghost'}
              className={`${user.id !== post?.creator.$id && 'hidden'}`}
            >
              <Trash />
            </Button>
          </div>

          <Link to={`/posts/${post?.$id}`}>
            <div className='flex flex-col justify-center'>
              <img
                src={post?.imageUrl}
                alt=''
                className='rounded-md max-w-60'
              />
              <p>{post?.caption}</p>
              <div className='flex gap-2'>
                {post?.tags.map((tag: string) => (
                  <p key={tag}>#{tag}</p>
                ))}
              </div>
            </div>
          </Link>
          <PostStats post={post!} userId={user.id} />
        </div>
      )}
    </div>
  );
};
