import type { IPostData } from '@/app/type';
import { SearchComponent } from '@/components/shared';
import { PostMedia } from '@/components/shared/PostMedia';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useGetPostWithMedia } from '@/lib/react-query/queriesAndMutation';

export const ExplorePage = () => {
  const { data: posts } = useGetPostWithMedia();

  return (
    <div className='w-full h-full overflow-hidden relative'>
      <div className='w-full absolute top-0 z-10 opacity-25 lg:hidden'>
        <SearchComponent showTrending={false} modal={true} />
      </div>
      <div className='w-full h-full flex flex-col'>
        <ScrollArea className='w-full min-h-full h-[calc(100dvh)] max-h-full  snap-y snap-mandatory scroll-smooth'>
          <div className='w-full flex flex-col'>
            {posts?.map((post: IPostData) => (
              <div key={post.id} className='w-full h-[calc(100dvh)] lg:h-96 p-2 snap-start'>
                <PostMedia post={post} />
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};
