import { usePostStore } from '@/app/store';
import { useAuthStore } from '@/app/store/authStore';
import { useEffect } from 'react';

export const HomePage = () => {
  const { user } = useAuthStore();
  const { post, getPostData } = usePostStore();

  useEffect(() => {
    getPostData();
    console.log([post]);
  }, []);

  return (
    <div>
      <h1>Welcome {user?.name}</h1>
    </div>
  );
};
