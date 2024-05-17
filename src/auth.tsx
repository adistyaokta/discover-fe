import { useState } from 'react';
import { useAuthStore } from './app/store/authStore';

const AuthPage = () => {
  const { user, isAuthenticated, login, logout } = useAuthStore();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: any) => {
    e.preventDefault();
    await login(username, password);
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div>
      <h1 className='bg-red-900'>Authentication</h1>
      {isAuthenticated ? (
        <div>
          <p>Welcome, {user?.username}</p>
          <button type='button' onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : (
        <form onSubmit={handleLogin}>
          <div>
            <label>username:</label>
            <input type='username' value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div>
            <label>Password:</label>
            <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type='submit'>Login</button>
        </form>
      )}
    </div>
  );
};

export default AuthPage;
