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
    <div className='w-full h-full px-4 py-2 flex flex-row justify-center gap-1'>
      <div className='w-2/3 h-full flex flex-col gap-5'>
        <div className='h-1/6 pr-5'>
          <PostForm />
        </div>
        <ScrollArea className='w-full h-full pr-5 scroll-smooth'>
          <div className='grid grid-cols-1 gap-2'>
            {array?.map((post: IPostData, index: number) => (
              <PostCard key={`${post.id}-${index}`} post={post} />
            ))}
          </div>
          {hasNextPage && <div ref={ref} className='w-full h-10' />}
        </ScrollArea>
      </div>
      <div className='w-1/3 h-full overflow-hidden border border-input border-y-0 border-r-0 flex flex-col justify-between gap-2'>
        <SearchComponent />
      </div>
    </div>
  );
};
