import { useAuthStore } from '@/app/store';
import type { IPostData } from '@/app/type';
import { useCreatePost, useUploadImage } from '@/lib/react-query/queriesAndMutation';
import { CreatePostValidation } from '@/lib/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { RiLoader5Fill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import type { z } from 'zod';
import { Button } from '../ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { useToast } from '../ui/use-toast';
import { MdDeleteOutline } from 'react-icons/md';
import { LuImagePlus } from 'react-icons/lu';

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
  const inputRef = useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof CreatePostValidation>>({
    resolver: zodResolver(CreatePostValidation),
    defaultValues: {
      caption: post ? post.caption : '',
      media: post && post.media !== null ? post.media : undefined
    }
  });

  const { handleSubmit, reset } = form;

  const onSubmit = async (values: z.infer<typeof CreatePostValidation>) => {
    try {
      let mediaFilePath = null;
      if (imagePreview) {
        const uploadedMedia = await uploadImage({ image: imagePreview, folder: 'posts' });
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
      setImagePreview(null);
      if (inputRef.current) {
        inputRef.current.value = '';
      }
      navigate('/');
    } catch (error: any) {
      toast({ title: error || 'Failed to create the post.' });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='w-full h-full flex flex-row gap-2 py-1 items-center justify-between'
      >
        <FormField
          control={form.control}
          name='caption'
          render={({ field }) => (
            <FormItem className='relative w-full'>
              {label && <FormLabel>Caption</FormLabel>}
              <FormControl>
                <Textarea
                  className={`w-full h-28 max-h-28  ${imagePreview ? 'w-5/6' : ''}`}
                  placeholder='Share your discovery!'
                  {...field}
                />
              </FormControl>
              {imagePreview && (
                <div className='absolute -top-2 right-0 max-w-40 w-full h-full group'>
                  <img
                    alt='image-prev'
                    className='h-full w-full rounded-r-md object-cover'
                    src={URL.createObjectURL(imagePreview)}
                  />
                  <Button
                    type='button'
                    onClick={() => setImagePreview(null)}
                    className='absolute top-1 right-1 p-2 aspect-square bg-primary rounded-full text-white opacity-0 group-hover:opacity-100'
                  >
                    <MdDeleteOutline size={20} />
                  </Button>
                </div>
              )}
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='h-full flex flex-col gap-2 items-center justify-between py-1 cursor-pointer'>
          <FormField
            control={form.control}
            name='media'
            render={() => (
              <FormItem className='h-1/2 border border-input rounded-md  cursor-pointer'>
                <FormControl>
                  <div className='flex w-full h-full justify-center items-center relative'>
                    {/* Visible container */}
                    <div className='min-w-40 w-full h-full flex items-center justify-center gap-4'>
                      <LuImagePlus size={25} className='cursor-pointer ' />
                    </div>

                    {/* Hidden input */}
                    <Input
                      ref={inputRef}
                      className='absolute inset-0 opacity-0 w-full h-full cursor-pointer'
                      type='file'
                      accept='images/*'
                      onChange={(event) => {
                        const file = event.target.files?.[0];
                        if (file) {
                          setImagePreview(file);
                        }
                      }}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='w-full h-1/2'>
            <Button
              type='submit'
              variant={'default'}
              className='flex w-full h-full max-h-full justify-center items-center'
              disabled={isLoadingCreate}
            >
              {isLoadingCreate ? <RiLoader5Fill className='animate-spin' /> : 'Send'}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};
