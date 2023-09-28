import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { DataProvider } from './context/DataProvider';
import { TechnicianInfoProvider } from './context/TechnicianInfoContext'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <TechnicianInfoProvider >
      <DataProvider>
        <App />
      </DataProvider>
    </TechnicianInfoProvider>
  </React.StrictMode>
);
