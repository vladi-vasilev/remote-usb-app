import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { SocketProvider } from './contexts/SocketProvider';
import { DataProvider } from './contexts/DataProvider';

ReactDOM.render(
  <SocketProvider>
    <DataProvider>
      <App />
    </DataProvider>
  </SocketProvider>,
  document.getElementById('root')
);
