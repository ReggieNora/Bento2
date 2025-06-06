import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CoachCard from './CoachCard';
import { ArrowLeft, X } from 'lucide-react';
import Orb from './Orb';

interface CoachOverlayProps {
  onCollapse: () => void;
}

export default function CoachOverlay({ onCollapse }: CoachOverlayProps) {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-lg"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.4 }}
      >
        {/* Orb Background - Full Screen */}
        <div className="absolute inset-0 z-0">
          <Orb
            hoverIntensity={0.5}
            rotateOnHover={true}
            hue={0}
            forceHoverState={false}
          />
        </div>

        {/* Close Button */}
        <div className="absolute top-8 right-8 z-20">
          <button
            onClick={onCollapse}
            className="px-4 py-2 rounded-xl bg-white/20 text-white font-semibold shadow hover:bg-white/30 transition flex items-center gap-2 backdrop-blur-md border border-white/20"
          >
            <X className="w-5 h-5" />
            Close
          </button>
        </div>
        
        {/* Coach Card Content */}
        <div className="w-full max-w-4xl mx-auto flex items-center justify-center relative z-10">
          <CoachCard forceExpanded={true} onStartSession={() => console.log('Begin AI Interview Session')} />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}