import { Navbar, Sidebar, Footer } from '@/components/shared';
import { Outlet } from 'react-router-dom';

const RootLayout = () => {
  return (
    <div className='w-full flex flex-col sm:flex-row min-h-screen'>
      <Navbar />
      <Sidebar />

      <section className='flex-grow flex flex-wrap'>
        <Outlet />
      </section>

      <Footer />
    </div>
  );
};

export default RootLayout;
