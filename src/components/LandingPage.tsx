import React from 'react';
import { ArrowRight, UserPlus, LogIn, Twitter, Linkedin, Github } from 'lucide-react';
import hirlyLogo from '../assets/hirly-logo.png';
import { Link } from 'react-router-dom';

interface LandingPageProps {
  onAuthSuccess: (userType: 'candidate' | 'employer') => void;
}

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

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Work that finds you
          </h1>
          <p className="text-xl md:text-2xl text-white/80 mb-8 leading-relaxed">
            Smart matches. Human-first hiring.<br />
            Stop scrolling, start matching with opportunities that matter.
          </p>
          <button
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold shadow-lg flex items-center gap-2 hover:from-pink-600 hover:to-purple-600 transition-colors mx-auto"
            onClick={() => onAuthSuccess('candidate')}
          >
            <UserPlus className="w-5 h-5" /> Sign Up or Log In <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;