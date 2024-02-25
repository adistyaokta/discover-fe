import { Navbar, Sidebar, Footer } from '@/components/shared';
import { Outlet } from 'react-router-dom';

const RootLayout = () => {
  return (
    <div className='w-full'>
      {/* <Navbar /> */}
      <Sidebar />

      <section className='flex h-full'>
        <Outlet />
      </section>

      <Footer />
    </div>
  );
};

export default RootLayout;
