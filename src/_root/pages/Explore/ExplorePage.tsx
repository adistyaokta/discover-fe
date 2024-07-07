import { SearchComponent } from '@/components/shared';
import { PostMedia } from '@/components/shared/PostMedia';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useGetPostWithMedia } from '@/lib/react-query/queriesAndMutation';

export const ExplorePage = () => {
  const { data: posts } = useGetPostWithMedia();

  return (
    <div className='w-full min-w-full max-w-screen-2xl h-full lg:px-4 p-1 lg:py-2 flex flex-col overflow-hidden lg:flex-row justify-center gap-1 bg-yellow-700'>
      <div className='w-full lg:w-1/3 h-full overflow-hidden border border-input border-y-0 border-r-0 flex lg:hidden flex-col justify-between gap-2 bg-red-800'>
        <SearchComponent showTrending={false} />
      </div>
      <div className='w-full h-full flex flex-col bg-slate-600'>
        <ScrollArea className='w-full min-h-full h-[calc(100dvh)] max-h-full overflow-hidden absolute inset-0'>
          {posts?.map((post) => (
            <div key={post.id} className='h-[calc(100dvh)] flex-grow'>
              <PostMedia key={post.id} post={post} />
            </div>
          ))}
        </ScrollArea>
      </div>
    </div>
  );
};
