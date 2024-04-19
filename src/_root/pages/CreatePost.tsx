import { PostForm } from '@/components/forms/PostForm';

export const CreatePost = () => {
  return (
    <div className='flex flex-1'>
      <div className='container'>
        <div className='max-w-5xl flex justify-start items-start gap-2'>
          add post
        </div>
        <PostForm action='Create' />
      </div>
    </div>
  );
};
