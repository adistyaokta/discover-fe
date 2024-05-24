import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App.tsx';
import { ThemeProvider } from './components/shared/ThemeProvider.tsx';
import './index.css';
import { QueryProvider } from './components/shared/QueryProvider.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Router>
    <QueryProvider>
      <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
        <App />
      </ThemeProvider>
    </QueryProvider>
  </Router>
);
