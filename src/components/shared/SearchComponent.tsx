import { FaSearch } from 'react-icons/fa';

export const SearchComponent = () => {
  return (
    <div className=' w-full h-14 px-2'>
      <label htmlFor='search-box' className='flex flex-row h-full w-full'>
        <input
          type='text'
          className='w-11/12 rounded-l-md p-2 border border-input border-r-0 bg-background outline-none text-sm text-secondary-foreground'
          id='search-box'
        />
        <div className='w-1/12 flex justify-center items-center border border-input border-l-0 rounded-r-md bg-background'>
          <FaSearch />
        </div>
      </label>
    </div>
  );
};
