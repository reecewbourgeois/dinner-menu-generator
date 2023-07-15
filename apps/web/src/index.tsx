import React from 'react';
import { App } from './App';
import { createRoot } from 'react-dom/client';
import './index.scss';

const container = document.getElementById('root');

if (container !== null) {
  const root = createRoot(container);
  root.render(<App />);
}
