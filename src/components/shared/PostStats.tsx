import {
  useDeleteSavedPost,
  useGetCurrentUser,
  useLikePost,
  useSavePost,
} from '@/lib/react-query/queriesAndMutations';
import { checkIsLiked } from '@/lib/utils';
import type { Models } from 'appwrite';
import { Bookmark, Heart } from 'lucide-react';
import type React from 'react';
import { useEffect, useState } from 'react';
import { Loader } from './Loader';

type PostStatsProps = {
  post: Models.Document;
  userId: string;
};

export const PostStats = ({ post, userId }: PostStatsProps) => {
  const likesList = post?.likes.map((user: Models.Document) => user.$id);

  const [likes, setLikes] = useState(likesList);
  const [isSaved, setIsSaved] = useState(false);

  const { mutate: likePost } = useLikePost();
  const { mutate: savePost, isPending: isSavingPost } = useSavePost();
  const { mutate: deleteSavedPost, isPending: isDeletingSaved } =
    useDeleteSavedPost();

  const { data: currentUser } = useGetCurrentUser();

  const savedPostRecord = currentUser?.save.find(
    (record: Models.Document) => record.post?.$id === post?.$id
  );

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    setIsSaved(!!savedPostRecord);
  }, [currentUser]);

  const handleLikePost = (e: React.MouseEvent) => {
    e.stopPropagation();

    let newLikes = [...likes];

    const hasLiked = newLikes.includes(userId);

    if (hasLiked) {
      newLikes = newLikes.filter((id) => id !== userId);
    } else {
      newLikes.push(userId);
    }

    setLikes(newLikes);
    likePost({ postId: post?.$id || '', likesArray: newLikes });
  };

  const handleSavePost = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (savedPostRecord) {
      setIsSaved(false);
      deleteSavedPost(savedPostRecord.$id);
    } else {
      savePost({ postId: post?.$id || '', userId });
      setIsSaved(true);
    }
  };
  return (
    <div>
      <div>
        <div>
          {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
          <div className=' w-fit cursor-pointer' onClick={handleLikePost}>
            {checkIsLiked(likes, userId) ? (
              <Heart color='red' fill='red' />
            ) : (
              <Heart />
            )}
          </div>
          <p>{likes.length}</p>
        </div>

        {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
        <div className='w-fit cursor-pointer' onClick={handleSavePost}>
          {isSavingPost || isDeletingSaved ? (
            <Loader />
          ) : (
            <div>
              {isSaved ? <Bookmark color='blue' fill=' blue' /> : <Bookmark />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
