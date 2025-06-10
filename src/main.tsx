import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import PricingPage from './components/PricingPage';
import AboutUsPage from './pages/AboutUsPage';
import CardHubExperiment from './components/CardHubExperiment';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/app/cards" element={<CardHubExperiment />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);