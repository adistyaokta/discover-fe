import { useAuthStore } from '@/app/store/authStore';
import { Button } from '@/components/ui/button';

export const Home = () => {
  const { logout, user } = useAuthStore();

  async function handleLogout() {
    await logout();
  }

  return (
    <div>
      <h1>Welcome {user?.name}</h1>
      <Button type='button' onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
};
