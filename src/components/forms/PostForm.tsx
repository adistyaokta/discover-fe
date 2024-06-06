import { useAuthStore } from '@/app/store';
import type { IPostData } from '@/app/type';
import { useCreatePost, useUploadImage } from '@/lib/react-query/queriesAndMutation';
import { CreatePostValidation } from '@/lib/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { RiLoader5Fill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import type { z } from 'zod';
import { Button } from '../ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
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
  const { mutateAsync: uploadImage } = useUploadImage();
  const [imagePreview, setImagePreview] = useState<File | null>(null);

  const form = useForm<z.infer<typeof CreatePostValidation>>({
    resolver: zodResolver(CreatePostValidation),
    defaultValues: {
      caption: post ? post.caption : '',
      media: post && post.media !== null ? post.media : undefined
    }
  });

  const { handleSubmit, reset } = form;

  const onSubmit = async (values: z.infer<typeof CreatePostValidation>) => {
    console.log(imagePreview);
    try {
      let mediaFilePath = null;
      if (imagePreview) {
        const uploadedMedia = await uploadImage(imagePreview);
        mediaFilePath = uploadedMedia.filePath;
      }

      const newPost = await createPost({
        caption: values.caption,
        authorId: user?.id,
        media: mediaFilePath
      });

      if (!newPost) {
        throw new Error('Unable to create post, please try again.');
      }

      reset();
      navigate('/');
    } catch (error: any) {
      toast({ title: error.message || 'An error occurred while creating the post.' });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='w-full h-full flex flex-row gap-2 px-3 py-1 items-center justify-between bg-red-800'
      >
        {imagePreview ? (
          <div
            className='w-1/4 h-full flex items-center justify-center group rounded-md'
            style={{
              backgroundImage: `url(${URL.createObjectURL(imagePreview)})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <Button type='button' onClick={() => setImagePreview(null)} className='opacity-0 group-hover:opacity-30'>
              hapus
            </Button>
          </div>
        ) : (
          <FormField
            control={form.control}
            name='media'
            render={() => (
              <FormItem className='w-1/5'>
                <FormControl>
                  <Input
                    type='file'
                    accept='images/*'
                    onChange={(event) => {
                      const file = event.target.files?.[0];
                      if (file) {
                        setImagePreview(file);
                      }
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name='caption'
          render={({ field }) => (
            <FormItem className='h-full w-full flex flex-col items-center justify-center'>
              {label && <FormLabel>Caption</FormLabel>}
              <FormControl>
                <Textarea className='w-full h-full max-h-28' placeholder='Share your moment...' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='h-full w-1/6 flex items-center justify-end'>
          <Button
            type='submit'
            variant={'default'}
            className='flex w-full h-full max-h-full justify-center items-center'
            disabled={isLoadingCreate}
          >
            {isLoadingCreate ? <RiLoader5Fill className='animate-spin' /> : 'Send'}
          </Button>
        </div>
      </form>
    </Form>
  );
};
