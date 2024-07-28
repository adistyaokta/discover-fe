import type { IPostData } from '@/app/type';
import { PostDialog } from '@/components/forms/PostDialog';
import { PostForm } from '@/components/forms/PostForm';
import { PostCard, SearchComponent } from '@/components/shared';
import { Loader } from '@/components/shared/Loader';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useInfinitePosts } from '@/lib/react-query/queriesAndMutation';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

export const HomePage = () => {
  const { data: pages, isPending, fetchNextPage, hasNextPage } = useInfinitePosts();
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  const array = pages?.pages.flatMap((page) => page.data);

  if (isPending) {
    return <Loader />;
  }

  return (
    <div className='w-full h-full overflow-hidden'>
      <div className='w-full h-full flex flex-col lg:flex-row'>
        <div className='max-h-full w-full lg:w-2/3 lg:flex flex-col '>
          <div className='hidden lg:flex'>
            <PostForm />
          </div>
          <div className='flex lg:hidden mb-2 '>
            <PostDialog />
          </div>
          <div className='min-h-[90%]'>
            <ScrollArea className='h-full overflow-hidden'>
              <div className='grid grid-cols-1 gap-2 lg:pb-10'>
                {array?.map((post: IPostData, index: number) => (
                  <PostCard key={`${post.id}-${index}`} post={post} className='last:mb-16 lg:last:mb-0' />
                ))}
              </div>
              {hasNextPage && <div ref={ref} className='w-full h-10' />}
              {!hasNextPage && <div className='w-full h-48 flex justify-center items-start pt-10'>No more posts</div>}
            </ScrollArea>
          </div>
        </div>
        <div className='hidden w-1/3 lg:flex px-3'>
          <div className='w-full h-full'>
            <SearchComponent showTrending />
          </div>
        </div>
      </div>
    </div>
  );
};
