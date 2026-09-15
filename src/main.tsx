import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import './index.css';
import { Toaster } from 'sonner';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <Provider store={store}>
      <App />
      <Toaster 
        position="top-right"
        richColors
        closeButton
        duration={3000}
        toastOptions={{
          style: {
            fontFamily: "'Plus Jakarta Sans', sans-serif",
          },
        }}
      />
    </Provider>
  </StrictMode>
);
