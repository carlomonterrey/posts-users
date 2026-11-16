import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { httpRepositories } from './infrastructure/repositories/httpRepositories';
import './index.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
}

createRoot(rootElement).render(
  <StrictMode>
    <App
      usersRepository={httpRepositories.users}
      postsRepository={httpRepositories.posts}
    />
  </StrictMode>,
);
