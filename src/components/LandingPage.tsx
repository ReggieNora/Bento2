import React, { useState } from 'react';
import { ArrowRight, UserPlus, LogIn, Twitter, Linkedin, Github } from 'lucide-react';
import { Link } from 'react-router-dom';
import hirlyLogo from '../assets/hirly-logo.png';
import CircularGallery from './CircularGallery';

interface LandingPageProps {
  onAuthSuccess: (userType: 'candidate' | 'employer') => void;
}

const features = [
  {
    image: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg",
    text: "AI-Powered Matching"
  },
  {
    image: "https://images.pexels.com/photos/3182833/pexels-photo-3182833.jpeg",
    text: "Direct Messaging"
  },
  {
    image: "https://images.pexels.com/photos/8353841/pexels-photo-8353841.jpeg",
    text: "AI Interview Coach"
  },
  {
    image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg",
    text: "Personalized Profiles"
  },
  {
    image: "https://images.pexels.com/photos/7681091/pexels-photo-7681091.jpeg",
    text: "Analytics Dashboard"
  },
  {
    image: "https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg",
    text: "Modern Interface"
  }
];

const LandingPage: React.FC<LandingPageProps> = ({ onAuthSuccess }) => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-tl from-purple-700 via-black to-black flex flex-col overflow-hidden">
      {/* Navigation */}
      <nav className="flex justify-between items-center px-12 py-6 text-white/90 text-lg gap-10 relative">
        <Link to="/" className="flex items-center group" style={{ textDecoration: 'none' }}>
          <img src={hirlyLogo} alt="Hirly Logo" className="w-24 h-auto drop-shadow-lg transition-transform group-hover:scale-105" style={{ borderRadius: '8px' }} />
        </Link>
        <div className="flex items-center gap-8">
          <a href="#about" className="hover:text-white transition">About</a>
          <Link to="/pricing" className="hover:text-white transition">Pricing</Link>
          <Link to="/login" className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition flex items-center gap-2">
            <LogIn className="w-5 h-5" /> Login / Sign Up
          </Link>
          <div className="flex gap-4 text-white/70 text-xl ml-4">
            <a href="#" className="hover:text-white transition" aria-label="Twitter"><Twitter /></a>
            <a href="#" className="hover:text-white transition" aria-label="LinkedIn"><Linkedin /></a>
            <a href="#" className="hover:text-white transition" aria-label="GitHub"><Github /></a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-white text-center mb-6 max-w-4xl">
          Find Your Next Opportunity with AI-Powered Matching
        </h1>
        <p className="text-xl text-white/80 text-center mb-12 max-w-2xl">
          Hirly connects talented professionals with their ideal roles using advanced AI matching technology.
          No more endless scrolling – just perfect matches.
        </p>
        <button
          className="px-8 py-4 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold shadow-lg flex items-center gap-2 hover:from-pink-600 hover:to-purple-600 transition-colors mx-auto"
          onClick={() => onAuthSuccess('candidate')}
        >
          <UserPlus className="w-5 h-5" /> Get Started <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      {/* Features Gallery */}
      <div className="h-[600px] w-full relative mb-16">
        <CircularGallery 
          items={features}
          bend={3}
          textColor="#ffffff"
          borderRadius={0.05}
          font="bold 24px DM Sans"
        />
      </div>

      {/* Footer */}
      <footer className="py-8 text-center text-white/60">
        <p>© 2025 Hirly. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;