import type { IPostData } from '@/app/type';
import { PostForm } from '@/components/forms/PostForm';
import { PostCard, SearchComponent } from '@/components/shared';
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
    return <p>Loading...</p>;
  }

  return (
    <div className='w-full h-full lg:px-4 p-1 lg:py-2 flex flex-col overflow-hidden lg:flex-row justify-center gap-1'>
      <div className='w-full lg:w-2/3 h-full flex flex-col gap-5'>
        <div className='h-1/6 pr-5 hidden lg:flex'>
          <PostForm />
        </div>
        <div className='h-full max-h-full lg:py-0'>
          <ScrollArea className='w-full min-h-[90%] h-screen lg:h-full lg:pr-5 overflow-y-auto'>
            <div className='grid grid-cols-1 gap-2'>
              {array?.map((post: IPostData, index: number) => (
                <div key={`${post.id}-${index}`} className='first:mt-20 lg:first:mt-0 lg:last:mb-24'>
                  <PostCard post={post} />
                </div>
              ))}
            </div>
            {hasNextPage && <div ref={ref} className='w-full h-10' />}
          </ScrollArea>
        </div>
      </div>
      <div className='w-1/3 h-full overflow-hidden border border-input border-y-0 border-r-0 hidden lg:flex flex-col justify-between gap-2'>
        <SearchComponent showTrending />
      </div>
    </div>
  );
};
