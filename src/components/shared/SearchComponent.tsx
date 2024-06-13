import useDebounce from '@/app/utils/utils';
import { useSearchPosts } from '@/lib/react-query/queriesAndMutation';
import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { PostCard } from './PostCard';

export const SearchComponent = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const debouncedSearch = useDebounce(searchValue, 1000);
  const { data: searchedPosts } = useSearchPosts(debouncedSearch);

  return (
    <div className='h-full '>
      <div className='w-full h-14 px-2'>
        <label htmlFor='search-box' className='flex flex-row h-full w-full'>
          <input
            type='text'
            onChange={(e) => {
              const { value } = e.target;
              setSearchValue(value);
            }}
            className='w-11/12 rounded-l-md p-2 border border-input border-r-0 bg-background outline-none text-sm text-secondary-foreground'
            id='search-box'
            placeholder='Find a moment...'
          />
          <div className='w-1/12 flex justify-center items-center border border-input border-l-0 rounded-r-md bg-background'>
            <FaSearch />
          </div>
        </label>
      </div>
      <div className='max-h-dvh px-2 py-3 flex flex-col gap-4'>
        {searchedPosts?.length === 0 && <p className='text-muted-foreground italic text-center'>No result found</p>}
        {searchedPosts?.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};
