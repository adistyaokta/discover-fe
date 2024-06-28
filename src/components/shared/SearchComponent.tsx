import useDebounce from '@/app/utils/utils';
import { useGetMostLikedPost, useSearchPosts } from '@/lib/react-query/queriesAndMutation';
import { useRef, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { PostCard } from './PostCard';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { ScrollArea } from '../ui/scroll-area';
import { searchPosts } from '@/lib/api';

export const SearchComponent = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const debouncedSearch = useDebounce(searchValue, 1000);
  const { data: searchedPosts } = useSearchPosts(debouncedSearch);
  const { data: mostLikedPosts } = useGetMostLikedPost();
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className='h-full relative'>
      <div className='w-full h-14 px-2'>
        <label htmlFor='search-box' className='flex flex-row h-full w-full'>
          <input
            ref={inputRef}
            type='text'
            onChange={(e) => {
              const { value } = e.target;
              setSearchValue(value);
            }}
            className='w-10/12 rounded-l-md p-2 border border-input border-r-0 bg-background outline-none text-sm text-secondary-foreground'
            id='search-box'
            placeholder='Find a moment...'
          />
          <div className='w-2/12 flex justify-center items-center border border-input border-l-0 rounded-r-md bg-background'>
            {searchValue && searchedPosts?.length ? (
              <IoMdCloseCircleOutline
                size={25}
                onClick={() => {
                  setSearchValue('');
                  if (inputRef.current) {
                    inputRef.current.value = '';
                  }
                }}
                className='cursor-pointer hover:scale-110 transition-all duration-300'
              />
            ) : (
              <FaSearch size={20} className='cursor-pointer hover:scale-110 transition-all duration-300' />
            )}
          </div>
        </label>
      </div>
      <div className={'h-full w-full px-1 py-3 flex flex-col gap-4 rounded-lg absolute z-50 '}>
        {searchedPosts?.length === 0 && <p className='text-muted-foreground italic text-center'>No result found</p>}
        {searchValue && searchedPosts?.map((post) => <PostCard key={post.id} post={post} />)}
        {!searchValue && !searchedPosts && (
          <>
            <p className='w-full font-outfit font-bold text-center'>Trending Moment</p>
            <ScrollArea className='w-full px-1 h-full scroll-smooth'>
              <div className='grid grid-cols-1 gap-2 px-2'>
                {mostLikedPosts?.map((post) => (
                  <PostCard key={post.id} post={post} className='last:mb-20' />
                ))}
              </div>
            </ScrollArea>
          </>
        )}
      </div>
    </div>
  );
};
