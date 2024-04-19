import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { FileUploader } from '../shared/FileUploader';
import { PostValidation } from '@/lib/validation';
import { Models } from 'appwrite';
import { useUserContext } from '@/context/AuthContext';
import { useToast } from '../ui/use-toast';
import { useNavigate } from 'react-router-dom';
import {
  useCreatePost,
  useUpdatePost,
} from '@/lib/react-query/queriesAndMutations';
import { updatePost } from '@/lib/appwrite/api';
import { Loader } from '../shared';

type PostFormProps = {
  post?: Models.Document;
  action: 'Create' | 'Update';
};

export const PostForm = ({ post, action }: PostFormProps) => {
  const { mutateAsync: createPost, isPending: isLoadingCreate } =
    useCreatePost();
  const { mutateAsync: updatePost, isPending: isLoadingUpdate } =
    useUpdatePost();

  const { user } = useUserContext();
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof PostValidation>>({
    resolver: zodResolver(PostValidation),
    defaultValues: {
      caption: post ? post?.caption : '',
      file: [],
      location: post ? post?.location : '',
      tags: post ? post?.tags.join(',') : '',
    },
  });

  const onSubmit = async (values: z.infer<typeof PostValidation>) => {
    if (post && action === 'Update') {
      const updatedPost = await updatePost({
        ...values,
        postId: post?.$id,
        imageId: post?.imageId,
        imageUrl: post?.imageUrl,
      });

      if (!updatePost) {
        toast({ title: 'Please try again.' });
      }

      return navigate(`/posts/${post.$id}`);
    }
    const newPost = await createPost({
      ...values,
      userId: user.id,
    });

    if (!newPost) {
      toast({
        title: 'Unable to create post, please try again.',
      });
    }

    navigate('/');
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col gap-9 w-full max-w-5xl'
      >
        <FormField
          control={form.control}
          name='caption'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Caption</FormLabel>
              <FormControl>
                <Textarea placeholder='Add caption' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='file'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Add Photos</FormLabel>
              <FormControl>
                <FileUploader
                  fieldChange={field.onChange}
                  mediaUrl={post?.imageUrl}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='location'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Add Location</FormLabel>
              <FormControl>
                <Input type='text' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='tags'
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Add Tags{' '}
                <span className='font-thin'>(*Use comma to separate)</span>
              </FormLabel>
              <FormControl>
                <Input type='text' placeholder='Music, Art, Games' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex flex-row gap-2 items-center justify-end'>
          <Button
            type='submit'
            variant='secondary'
            className='hover:bg-primary hover:text-secondary transition-all ease-in delay-75'
          >
            Cancel
          </Button>
          <Button type='submit' disabled={isLoadingCreate || isLoadingUpdate}>
            {isLoadingCreate || (isLoadingUpdate && <Loader />)}
            {action} Post
          </Button>
        </div>
      </form>
    </Form>
  );
};
