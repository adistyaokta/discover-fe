import { useAuthStore } from '@/app/store';
import type { IPostData } from '@/app/type';
import { useCreatePost } from '@/lib/react-query/queriesAndMutation';
import { CreatePostValidation } from '@/lib/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { BsSend } from 'react-icons/bs';
import type { z } from 'zod';
import { Button } from '../ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Textarea } from '../ui/textarea';
import { useToast } from '../ui/use-toast';

type PostFormProps = {
  post?: IPostData;
  label?: string;
};
export const PostForm = ({ post, label }: PostFormProps) => {
  const { mutateAsync: createPost, isPending: isLoadingCreate } = useCreatePost();
  const { user } = useAuthStore();
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof CreatePostValidation>>({
    resolver: zodResolver(CreatePostValidation),
    defaultValues: {
      caption: post ? post?.caption : ''
    }
  });

  const onSubmit = async (values: z.infer<typeof CreatePostValidation>) => {
    try {
      const newPost = await createPost({
        caption: values.caption,
        authorId: user?.id
      });

      if (!newPost) {
        toast({
          title: 'Unable to create post, please try again.'
        });
      } else {
        navigate('/');
      }
    } catch (error: any) {
      toast({ title: error });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full flex flex-row gap-2 items-center justify-between'>
        <FormField
          control={form.control}
          name='caption'
          render={({ field }) => (
            <FormItem className='w-11/12'>
              {label && <FormLabel>Caption</FormLabel>}
              <FormControl>
                <Textarea placeholder='Add post' className='bg-primary max-h-40' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' className='w-14 h-full' variant={'circle'}>
          <BsSend size={20} />
        </Button>
      </form>
    </Form>
  );
};
