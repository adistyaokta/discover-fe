import { motion } from 'framer-motion';
import { Link, Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore } from '../app/store';

const AuthLayout = () => {
  const { isAuthenticated } = useAuthStore();
  const { pathname } = useLocation();

  return (
    <>
      {isAuthenticated ? (
        <Navigate to={'/'} />
      ) : (
        <>
          <section className='flex h-dvh max-h-dvh w-full flex-1 justify-evenly items-center flex-col py-10'>
            <div className='h-1/4 w-full flex flex-col justify-center items-center'>
              <span className='p-2 font-playwrite font-black text-6xl lg:text-8xl tracking-widest'>discover!</span>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, ease: 'easeOut' }}
                key={pathname}
                className='text-center flex flex-col gap-2'
              >
                <p className='font-bold pt-5 lg:pt-3'>
                  {pathname === '/sign-in' ? 'Welcome back' : 'Ready to discover more?'}
                </p>
                <p className='font-thin'>
                  {pathname === '/sign-in'
                    ? 'Come inside and discover what awaits you.'
                    : 'Join us and start exploring!'}
                </p>
              </motion.div>
            </div>

            <div className='h-1/2 w-full'>
              <Outlet key={pathname} />
            </div>

            <div className='h-1/6 w-full flex flex-col justify-center items-center'>
              <p className='text-sm text-center font-thin '>
                {pathname === '/sign-in'
                  ? "First time? Let's start discovering together!"
                  : 'Already part of the discovery crew?'}
                <Link to={pathname === '/sign-in' ? '/sign-up' : '/sign-in'} className='font-playwrite font-bold'>
                  {pathname === '/sign-in' ? ' Register' : ' Login'}
                </Link>
              </p>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default AuthLayout;
