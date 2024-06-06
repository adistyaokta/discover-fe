import { useAuthStore } from '@/app/store';
import type { IPostData } from '@/app/type';
import { useCreatePost } from '@/lib/react-query/queriesAndMutation';
import { CreatePostValidation } from '@/lib/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { RiLoader5Fill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
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

  const { reset } = form;

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
        reset();
        navigate('/');
      }
    } catch (error: any) {
      toast({ title: error });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full h-full flex flex-row gap-2 items-center'>
        <FormField
          control={form.control}
          name='caption'
          render={({ field }) => (
            <FormItem className='flex-1'>
              {label && <FormLabel>Caption</FormLabel>}
              <FormControl>
                <Textarea className='w-full max-h-32 h-20' placeholder='Share your moment...' {...field} />
              </FormControl>
              <Button>aaa</Button>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='h-full '>
          <Button
            type='submit'
            variant={'default'}
            className='flex w-20 h-full max-h-full justify-center items-center'
            disabled={isLoadingCreate}
          >
            {isLoadingCreate ? <RiLoader5Fill className='animate-spin' /> : 'Send'}
          </Button>
        </div>
      </form>
    </Form>
  );
};
