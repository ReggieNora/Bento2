import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LampBackground } from './ui/LampBackground';
import { motion, AnimatePresence } from 'framer-motion';

interface LandingPageProps {
  onAuthSuccess: (userType: 'candidate' | 'employer') => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onAuthSuccess }) => {
  const [showNav, setShowNav] = useState(false);

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <LampBackground />
      
      {/* Hover Area for Navbar */}
      <div 
        className="fixed top-0 left-0 right-0 h-2 z-50"
        onMouseEnter={() => setShowNav(true)}
      />
      
      {/* Animated Navbar */}
      <AnimatePresence>
        {showNav && (
          <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 left-0 right-0 z-40"
            onMouseLeave={() => setShowNav(false)}
          >
            <div className="flex justify-center items-center px-12 py-6">
              <div className="flex items-center gap-8 bg-black/50 backdrop-blur-xl px-8 py-3 rounded-full">
                <Link to="/about" className="text-white/70 hover:text-white transition-colors">About</Link>
                <Link to="/pricing" className="text-white/70 hover:text-white transition-colors">Pricing</Link>
                <Link 
                  to="/login" 
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-white"
                >
                  Sign In
                </Link>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <div className="flex-1 flex flex-col items-center justify-center px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-[8rem] md:text-[12rem] font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-white via-white/80 to-white/30"
          >
            Hirly
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="text-xl text-white/50 text-center mt-8"
          >
            The future of hiring
          </motion.p>
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.5 }}
            onClick={() => onAuthSuccess('candidate')}
            className="mt-12 px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium transition-all hover:scale-105"
          >
            Get Started
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;