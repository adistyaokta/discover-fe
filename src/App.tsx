import { Navigate, Route, Routes } from 'react-router-dom';
import AuthLayout from './_auth/AuthLayout';
import { LoginForm, SignupForm } from './_auth/forms';
import RootLayout from './_root/RootLayout';
import { HomePage } from './_root/pages';
import { ExplorePage } from './_root/pages/Explore';
import { CreatePostPage } from './_root/pages/CreatePostPage';
import { ProfilePage } from './_root/pages/Profile';
import { Toaster } from './components/ui/toaster';
import { useAuthStore } from './app/store';

function App() {
  const { user } = useAuthStore();
  return (
    <main>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path='/sign-in' element={<LoginForm />} />
          <Route path='/sign-up' element={<SignupForm />} />
        </Route>

        <Route element={<RootLayout />}>
          <Route index element={<HomePage />} />
          <Route path='/explore' element={<ExplorePage />} />
          <Route path='/create-post' element={<CreatePostPage />} />
          <Route path='/profile' element={<ProfilePage id={user?.id!} />} />
        </Route>

        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
      <Toaster />
    </main>
  );
}

export default App;
