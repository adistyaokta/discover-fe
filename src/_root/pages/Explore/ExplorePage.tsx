import type { IPostData } from '@/app/type';
import { SearchComponent } from '@/components/shared';
import { PostMedia } from '@/components/shared/PostMedia';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useGetPostWithMedia } from '@/lib/react-query/queriesAndMutation';

export const ExplorePage = () => {
  const { data: posts } = useGetPostWithMedia();
  return (
    <div className='w-full h-full overflow-hidden relative'>
      <div className='w-full fixed top-0 left-0 z-10 mx-auto lg:hidden'>
        <SearchComponent showTrending={false} modal={true} />
      </div>
      <div className='w-full h-full flex flex-col lg:flex-row'>
        <ScrollArea className='w-full snap-y snap-mandatory scroll-smooth'>
          <div className='w-full flex flex-col lg:flex-row lg:flex-wrap'>
            {posts?.map((post: IPostData) => (
              <div key={post.id} className='w-full flex-shrink-0 h-[calc(100dvh)] lg:h-96 lg:w-1/5 p-2 snap-start'>
                <PostMedia post={post} />
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};
