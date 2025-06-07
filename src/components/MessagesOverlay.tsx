import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MessagesCard from './MessagesCard';
import { ArrowLeft } from 'lucide-react';

interface MessagesOverlayProps {
  onCollapse: () => void;
}

export default function MessagesOverlay({ onCollapse }: MessagesOverlayProps) {
  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Back Button always on top */}
        <div className="absolute top-8 right-8 z-60" style={{ zIndex: 60 }}>
          <button
            onClick={onCollapse}
            className="px-4 py-2 rounded-xl bg-white/20 text-white font-semibold shadow-lg hover:bg-white/30 transition flex items-center gap-2 border border-white/30 backdrop-blur-md"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Menu
          </button>
        </div>
        {/* Glass/modal content */}
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-lg z-50"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.4 }}
        >
          <div className="w-full max-w-4xl mx-auto">
            <MessagesCard onViewProfile={() => console.log('View profile clicked')} />
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}