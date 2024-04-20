import useDebounce from '@/hooks/useDebounce';
import {
  useGetPosts,
  useSearchPosts,
} from '@/lib/react-query/queriesAndMutations';
import { Filter, SearchIcon } from 'lucide-react';
import { useState } from 'react';
import { SearchResults } from '@/components/shared/SearchResult';
import { GridPostList } from '@/components/shared/GridPostList';
import { Loader } from '@/components/shared';

export const Explore = () => {
  const { data: posts, fetchNextPage, hasNextPage } = useGetPosts();

  const [searchValue, setsearchValue] = useState<string>('');

  const debounceValue = useDebounce(searchValue, 500);
  const { data: searchedPosts, isFetching: isSearchFetching } =
    useSearchPosts(debounceValue);

  if (!posts) {
    return (
      <div className='flex w-full h-full'>
        <Loader />
      </div>
    );
  }
  const hasSearchResult = searchValue !== '';
  const isShowResults =
    !hasSearchResult &&
    posts.pages.every((item) => item?.documents.length === 0);

  console.log(posts);
  return (
    <div>
      <div>
        <div>
          <h3>Search Post</h3>
          <div className='w-full flex flex-row gap-2 bg-red-900'>
            <SearchIcon />
            <input
              type='text'
              className='bg-red-500'
              value={searchValue}
              onChange={(e) => setsearchValue(e.target.value)}
            />
          </div>
        </div>

        <div>
          <h3>Today's Popular</h3>
          <div>
            <p>All</p>
            <Filter />
          </div>
        </div>

        <div>
          {hasSearchResult ? (
            <SearchResults
              isSearchFetching={isSearchFetching}
              searchedPosts={searchedPosts}
            />
          ) : isShowResults ? (
            <p>end of post</p>
          ) : (
            posts.pages.map((item, index) => (
              <GridPostList key={`page-${index}`} posts={item?.documents} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};
