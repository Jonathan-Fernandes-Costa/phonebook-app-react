import React from 'react';
import ReactDOM from 'react-dom/client';
import './tailwind.css';
import App from './App';
import { UseChamadaProvider } from './providers/chamada';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UseChamadaProvider>
    <App />

    </UseChamadaProvider>
  </React.StrictMode>
);

