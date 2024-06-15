import useDebounce from '@/app/utils/utils';
import { useSearchPosts } from '@/lib/react-query/queriesAndMutation';
import { useRef, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { PostCard } from './PostCard';
import { IoMdCloseCircleOutline } from 'react-icons/io';

export const SearchComponent = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const debouncedSearch = useDebounce(searchValue, 1000);
  const { data: searchedPosts } = useSearchPosts(debouncedSearch);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className='h-fit relative'>
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
      <div className='max-h-dvh px-2 py-3 flex flex-col gap-4 absolute z-50'>
        {searchedPosts?.length === 0 && <p className='text-muted-foreground italic text-center'>No result found</p>}
        {searchValue && searchedPosts?.map((post) => <PostCard key={post.id} post={post} />)}
      </div>
    </div>
  );
};
