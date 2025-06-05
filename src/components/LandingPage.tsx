import React, { useState } from 'react';
import { ArrowRight, UserPlus, LogIn, RotateCcw, Twitter, Linkedin, Github } from 'lucide-react';
import { DraggableCardContainer } from './ui/draggable-card';
import hirlyLogo from '../assets/hirly-logo.png';
import { Link } from 'react-router-dom';
import LandingPageCard from './LandingPageCard';

interface LandingPageProps {
  onAuthSuccess: (userType: 'candidate' | 'employer') => void;
}

interface CardData {
  id: string;
  icon: string;
  title: string;
  text: string;
}

const INITIAL_CARDS: CardData[] = [
  {
    id: 'card-1',
    icon: '🎯',
    title: 'Hirly',
    text: 'Work that finds you.\n\nSmart matches. Human-first hiring.',
  },
  {
    id: 'card-2',
    icon: '📸',
    title: 'Not a Resume. A Real Story.',
    text: "You're more than a bullet list.\nHirly captures your whole vibe -- not just your job titles.",
  },
  {
    id: 'card-3',
    icon: '🔁',
    title: 'Matching, Not Searching',
    text: 'Stop scrolling. Start matching.\nWe pair you with people and places where you belong.',
  },
  {
    id: 'card-4',
    icon: '📱',
    title: 'Sleek. Simple. Swipe.',
    text: 'Our modern UI makes hiring feel like a convo, not a chore.\nClean cards. Clear paths. No clutter.',
  },
  {
    id: 'card-5',
    icon: '💬',
    title: 'Personality Over Paper',
    text: 'Culture fit > checkbox fit.\nWe focus on chemistry, not just credentials.',
  },
  {
    id: 'card-6',
    icon: '🛠️',
    title: 'Built by Creatives, Not Corporates',
    text: 'Hirly is made by makers --\nFor people who hire with heart, not templates.',
  },
];

function getRandomLayout(num: number) {
  const baseAngles = [-10, -5, 0, 5, 10, 15, -15];
  const baseXs = [-80, -40, 0, 40, 80, 120, -120];
  const baseYs = [30, 10, 0, 10, 30, 50, 50];
  return Array.from({ length: num }).map((_, i) => ({
    rotate: baseAngles[i % baseAngles.length] + (Math.random() - 0.5) * 8,
    x: baseXs[i % baseXs.length] + (Math.random() - 0.5) * 30,
    y: baseYs[i % baseYs.length] + (Math.random() - 0.5) * 20,
  }));
}

const LandingPage: React.FC<LandingPageProps> = ({ onAuthSuccess }) => {
  const [cards, setCards] = useState<CardData[]>(INITIAL_CARDS);
  const [cardLayout, setCardLayout] = useState(() => getRandomLayout(INITIAL_CARDS.length));
  const [resetKey, setResetKey] = useState(0);

  const handleCardDismiss = (id: string, direction: 'left' | 'right') => {
    setCards(prev => prev.filter(card => card.id !== id));
    setCardLayout(prev => prev.slice(1));
  };

  const handleReset = () => {
    setCards(INITIAL_CARDS);
    setCardLayout(getRandomLayout(INITIAL_CARDS.length));
    setResetKey(k => k + 1);
  };

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

      {/* Centered Card Stack */}
      <div className="flex-1 flex flex-col items-center justify-center relative">
        {/* Reset Button */}
        <button
          onClick={handleReset}
          className="absolute top-4 left-4 opacity-30 hover:opacity-80 transition-opacity z-20 p-2 rounded-full bg-neutral-800"
          title="Reset Cards"
          style={{ marginLeft: '72px' }}
        >
          <RotateCcw className="w-5 h-5 text-white" />
        </button>

        <DraggableCardContainer key={resetKey} className="absolute inset-0 z-10 flex items-center justify-center">
          {[...cards].reverse().map((item, index) => {
            const layout = cardLayout[index] || { rotate: 0, x: 0, y: 0 };
            return (
              <LandingPageCard
                key={item.id}
                id={item.id}
                icon={item.icon}
                title={item.title}
                text={item.text}
                layout={layout}
                onDismiss={handleCardDismiss}
              />
            );
          })}
        </DraggableCardContainer>

        {/* Call to Action Section */}
        <div className="mt-12 flex flex-col items-center justify-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Ready to join Hirly?</h2>
          <p className="text-white/80 mb-6 text-center max-w-md">Sign up or log in to start matching with top jobs and talent, powered by AI and a modern experience.</p>
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