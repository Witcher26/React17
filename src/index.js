import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bulma/css/bulma.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './firebase'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
reportWebVitals();
