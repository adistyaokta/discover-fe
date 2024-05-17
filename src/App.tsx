import { Navigate, Route, Routes } from 'react-router-dom';
import AuthLayout from './_auth/AuthLayout';
import { LoginForm, SignupForm } from './_auth/forms';
import RootLayout from './_root/RootLayout';
import { Home } from './_root/pages';

function App() {
  return (
    <main>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path='/sign-in' element={<LoginForm />} />
          <Route path='/sign-up' element={<SignupForm />} />
        </Route>

        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
        </Route>

        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </main>
  );
}

export default App;
