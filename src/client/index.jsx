import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import App from './components/App';

const data = window.__DATA__;
hydrateRoot(document.getElementById('root'), <App data={data} />);
