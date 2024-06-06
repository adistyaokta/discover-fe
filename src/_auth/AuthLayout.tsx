import { Outlet, Navigate, useLocation, Link } from 'react-router-dom';
import { useAuthStore } from '../app/store';
import { AnimatePresence, motion } from 'framer-motion';
import { LoginForm, SignupForm } from './forms';

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
              <span className='p-2 font-bigshoulder font-black text-8xl tracking-widest border-y-2 border-secondary-foreground'>
                disMoment
              </span>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, ease: 'easeOut' }}
                key={pathname}
                className='text-center'
              >
                <p className='font-bold pt-3'>
                  {pathname === '/sign-in' ? 'Log in to your account' : 'Create a new account'}
                </p>
                <p className='font-thin'>
                  {pathname === '/sign-in'
                    ? 'Hey welcome back! Please enter your details to continue.'
                    : 'Enter your details and start capturing this moment.'}
                </p>
              </motion.div>
            </div>

            <div className='h-1/2 w-full'>
              <Outlet key={pathname} />
            </div>

            <div className='h-1/6 w-full flex flex-col justify-center items-center'>
              <p className='text-sm text-center font-thin '>
                {pathname === '/sign-in' ? "Don't have an account?" : 'Already registered?'}
                <Link to={pathname === '/sign-in' ? '/sign-up' : '/sign-in'} className='font-bold'>
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
