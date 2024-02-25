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
    <section className='topbar'>
      <div className='flex flex-row justify-between py-4 px-5 bg-red-900'>
        <Link to='/' className='py-2'>
          <span className='bg-primary p-2 rounded-lg text-white font-black'>
            DisMoment
          </span>
        </Link>

        <div className='flex gap-4'>
          <Button variant='ghost' className='' onClick={() => signOut()}>
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
