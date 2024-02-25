import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { useSignOutAccount } from '@/lib/react-query/queriesAndMutations';
import { useEffect } from 'react';
import { useUserContext } from '@/context/AuthContext';

export const Navbar = () => {
  const { mutate: signOut, isSuccess } = useSignOutAccount();
  const navigate = useNavigate();
  const { user } = useUserContext();

  useEffect(() => {
    if (isSuccess) navigate(0);
  }, [isSuccess]);

  return (
    <section className='topbar flex sm:hidden'>
      <div className='flex flex-row w-full justify-between py-2 px-3 bg-primary'>
        <Link to='/' className='py-2'>
          <span className='bg-card p-2 rounded-sm text-card-foreground font-black hover:bg-card-foreground hover:text-card'>
            DisMoment
          </span>
        </Link>

        <div className='flex gap-4'>
          <Button
            variant='ghost'
            className='text-secondary'
            onClick={() => signOut()}
          >
            Logout
          </Button>

          <Link
            to={`/profile/${user.id}`}
            className='flex justify-center items-center'
          >
            <div
              className={`bg-[url(${user.imageUrl})] w-10 h-10 bg-teal-200 rounded-full`}
            />
          </Link>
        </div>
      </div>
    </section>
  );
};
