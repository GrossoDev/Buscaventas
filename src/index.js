import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Navbar from './grosso-bootreact/components/Navbar';
import Footer from './grosso-bootreact/components/Footer';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Navbar themeSelect />
    <App />
    <Footer />
  </React.StrictMode>
);
