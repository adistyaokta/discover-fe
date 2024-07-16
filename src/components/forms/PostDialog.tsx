import { useAuthStore } from '@/app/store';
import type { IPostData } from '@/app/type';
import { useCreatePost, useUploadImage } from '@/lib/react-query/queriesAndMutation';
import { CreatePostValidation } from '@/lib/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { MdDeleteOutline } from 'react-icons/md';
import { RiLoader5Fill } from 'react-icons/ri';
import type { z } from 'zod';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { useToast } from '../ui/use-toast';

type PostFormProps = {
  post?: IPostData;
  label?: string;
};

export const PostDialog = ({ post, label }: PostFormProps) => {
  const { mutateAsync: createPost, isPending: isLoadingCreate } = useCreatePost();
  const { user } = useAuthStore();
  const { toast } = useToast();
  const { mutateAsync: uploadImage } = useUploadImage();
  const [imagePreview, setImagePreview] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [dialogOpen, setDialogOpen] = useState<boolean>(true);

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
      setDialogOpen(false);
    } catch (error: any) {
      setDialogOpen(false);
      toast({ title: error || 'Failed to create the post.' });
    }
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger className='w-full h-10 font-outfit bg-accent'>What Are You Discovering Today?</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share your discovery!</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2 justify-center p-1'>
            <FormField
              control={form.control}
              name='caption'
              render={({ field }) => (
                <FormItem className=''>
                  {label && <FormLabel>Caption</FormLabel>}
                  <FormControl>
                    <Textarea {...field} className='max-h-32 min-h-20' />
                  </FormControl>
                  {imagePreview && (
                    <div className=''>
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

            <div className='flex flex-col gap-2'>
              <FormField
                control={form.control}
                name='media'
                render={() => (
                  <FormItem className=''>
                    <FormControl>
                      <Input
                        ref={inputRef}
                        className=''
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
              <div className=''>
                <Button type='submit' variant={'default'} className=' w-full' disabled={isLoadingCreate}>
                  {isLoadingCreate ? <RiLoader5Fill className='animate-spin' /> : 'Send'}
                </Button>
              </div>
            </div>
          </form>
        </Form>
        <DialogDescription />
      </DialogContent>
    </Dialog>
  );
};
