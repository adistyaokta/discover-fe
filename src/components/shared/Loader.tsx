import Lottie from 'lottie-react';
import animationData from '../../../public/loader.json';

export const Loader = () => {
  return (
    <div className='h-full w-full flex items-center justify-center'>
      <Lottie animationData={animationData} autoplay loop className='w-1/2 h-1/2' />
    </div>
  );
};
