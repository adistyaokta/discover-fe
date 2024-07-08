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
    <div className='w-full h-full overflow-hidden'>
      <div className='w-full h-full flex flex-col lg:flex-row'>
        <div className=' w-full lg:w-2/3 lg:flex flex-col'>
          <div className='hidden lg:flex'>
            <PostForm />
          </div>
          <div className='min-h-[90%]'>
            <ScrollArea className='h-full'>
              <div className='grid grid-cols-1 gap-2'>
                {array?.map((post: IPostData, index: number) => (
                  <PostCard key={`${post.id}-${index}`} post={post} />
                ))}
              </div>
              {hasNextPage && <div ref={ref} className='w-full h-10' />}
            </ScrollArea>
          </div>
        </div>
        <div className='hidden w-1/3 lg:flex px-3'>
          <div className='w-full border-secondary border-l-2'>
            <SearchComponent showTrending />
          </div>
        </div>
      </div>
    </div>
  );
};
