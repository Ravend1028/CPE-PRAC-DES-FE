import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import store from './store.js';
import { Provider } from 'react-redux';
import { TourProvider } from '@reactour/tour';
import steps from './steps.js';

createRoot(document.getElementById('root')).render(
  <Provider store={ store }>
    <StrictMode>
      <TourProvider steps={ steps }>
        <App />
      </TourProvider>
    </StrictMode>
  </Provider>
);
