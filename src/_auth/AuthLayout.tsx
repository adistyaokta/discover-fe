import { Outlet, Navigate } from 'react-router-dom';
import { useAuthStore } from '../app/store';

const AuthLayout = () => {
  const { isAuthenticated } = useAuthStore();
  return (
    <>
      {isAuthenticated ? (
        <Navigate to={'/'} />
      ) : (
        <>
          <section className='flex flex-1 justify-center items-center flex-col py-10'>
            <Outlet />
          </section>
        </>
      )}
    </>
  );
};

export default AuthLayout;
