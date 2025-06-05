import React from 'react';
import { motion } from 'framer-motion';
import { DraggableCardBody } from './ui/draggable-card';

interface LandingPageCardProps {
  id: string;
  icon: string;
  title: string;
  text: string;
  onDismiss: (id: string, direction: 'left' | 'right') => void;
  layout: {
    rotate: number;
    x: number;
    y: number;
  };
}

const LandingPageCard: React.FC<LandingPageCardProps> = ({
  id,
  icon,
  title,
  text,
  onDismiss,
  layout,
}) => {
  return (
    <DraggableCardBody
      key={id}
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      onDismiss={(direction) => onDismiss(id, direction)}
    >
      <motion.div
        style={{
          width: 340,
          height: 400,
          transform: `translate(${layout.x}px, ${layout.y}px) rotate(${layout.rotate}deg)`,
        }}
        className="bg-white/95 backdrop-blur-xl border border-white/20 rounded-lg shadow-2xl flex flex-col items-center justify-between overflow-hidden"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ 
          opacity: 0,
          scale: 0.5,
          transition: { duration: 0.3 }
        }}
      >
        <div className="flex flex-col items-center justify-center w-full h-full p-6">
          <span className="text-5xl mb-4 select-none" aria-hidden>{icon}</span>
          <h2 className="text-2xl font-bold text-gray-900 mb-3 text-center">{title}</h2>
          {text && (
            <p className="text-gray-700 text-center whitespace-pre-line text-lg">{text}</p>
          )}
        </div>
      </motion.div>
    </DraggableCardBody>
  );
};

export default LandingPageCard;