import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import AuthForm from './AuthForm';

interface AuthModalProps {
  onAuthSuccess: (userType: 'candidate' | 'employer') => void;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ onAuthSuccess, onClose }) => {
  const [userType, setUserType] = useState<'candidate' | 'employer'>('candidate');
  const [authAction, setAuthAction] = useState<'signin' | 'signup'>('signin');

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="relative w-full max-w-lg mx-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden"
          initial={{ scale: 0.9, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.9, y: 20, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-xl bg-white/10 text-white/80 hover:bg-white/20 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <AuthForm
            onAuthSuccess={onAuthSuccess}
            authAction={authAction}
            userType={userType}
            onUserTypeChange={setUserType}
            onToggleAuthAction={() =>
              setAuthAction((current) => (current === 'signin' ? 'signup' : 'signin'))
            }
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AuthModal;