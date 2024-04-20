import { useUserContext } from '@/context/AuthContext';
import { Models } from 'appwrite';
import { PostStats } from './PostStats';
type GridPostListProps = {
  posts?: Models.Document[];
  showUser?: boolean;
  showStats?: boolean;
};
export const GridPostList = ({
  posts,
  showUser = true,
  showStats = true,
}: GridPostListProps) => {
  const { user } = useUserContext();

  console.log(posts);
  return (
    <ul>
      {posts!.map((post) => (
        <>
          <li key={post.$id}>{post.caption}</li>
          <div>
            {showUser && (
              <div>
                <div>
                  <img
                    src={post.creator.imageUrl}
                    alt=''
                    className='w-8 h-8 rounded-full'
                  />
                  <p>{post.creator.name}</p>
                </div>
                <div>
                  {showStats && (
                    <PostStats key={post?.id} post={post} userId={user.id} />
                  )}
                </div>
              </div>
            )}
          </div>
        </>
      ))}
    </ul>
  );
};
