import React from "react";
import { DraggableCardContainer, DraggableCardBody } from "./ui/draggable-card";
import { motion } from "framer-motion";
import logo from "../assets/hirly-logo.png";

const menuItems = [
  { key: "profile", label: "Profile", description: "View or edit your profile", flippable: true },
  { key: "coach", label: "Coach", description: "AI-powered career coach", flippable: false },
  { key: "jobs", label: "Jobs", description: "Browse job listings", flippable: false },
  { key: "settings", label: "Settings", description: "Adjust your preferences", flippable: true },
];

// Fixed x/y positions for the four cards (top-left, top-right, bottom-left, bottom-right)
const fixedPositions = [
  { x: -180, y: -140 }, // Profile (top-left)
  { x: 180, y: -140 },  // Coach (top-right)
  { x: -180, y: 140 },  // Jobs (bottom-left)
  { x: 180, y: 140 },   // Settings (bottom-right)
];

import { useNavigate } from 'react-router-dom';

import CoachOverlay from './CoachOverlay';
import SettingsCard from './SettingsCard';

export default function CardHubExperiment() {
  const navigate = useNavigate();
  const [flipped, setFlipped] = React.useState<Record<string, boolean>>({});
  const [locked, setLocked] = React.useState<string | null>(null);
  const [randomAngles] = React.useState(() =>
    Array.from({ length: menuItems.length }, () => (Math.random() * 20 - 10))
  );
  const [showCoach, setShowCoach] = React.useState(false);

  // Outside click handler for flipping back
  React.useEffect(() => {
    if (!locked) return;
    function handleOutside(e: MouseEvent) {
      const card = document.getElementById(`flippable-card-${locked}`);
      if (card && !card.contains(e.target as Node)) {
        setFlipped({});
        setLocked(null);
      }
    }
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, [locked]);

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#18122B] via-[#251E40] to-[#1A1A2E] overflow-hidden">
      {/* Center logo */}
      <div className="absolute z-10 flex flex-col items-center justify-center left-1/2 top-1/2" style={{ transform: 'translate(-50%, -50%)' }}>
        <img src={logo} alt="Hirly" className="w-32 h-32 mb-2 select-none pointer-events-none" />
        <span className="text-2xl font-extrabold text-white drop-shadow-lg">Hirly</span>
      </div>
      {/* Coach Overlay Modal */}
      {showCoach && (
        <CoachOverlay onCollapse={() => setShowCoach(false)} />
      )}
      {/* Cards arranged around logo */}
      <div className="relative z-20 w-full h-full flex items-center justify-center">
        {menuItems.map((item, i) => {
          const isFlippable = !!item.flippable;
          const isFlipped = flipped[item.key];
          const isLocked = locked === item.key;
          const pos = fixedPositions[i];
          const angle = randomAngles[i];
          return (
            <div
              key={item.key}
              style={{
                position: isLocked ? 'fixed' : 'absolute',
                left: isLocked ? '50%' : `calc(50% + ${pos.x}px)`,
                top: isLocked ? '50%' : `calc(50% + ${pos.y}px)`,
                transform: isLocked ? 'translate(-50%, -50%) scale(1.08)' : `translate(-50%, -50%) rotate(${angle}deg)`,
                zIndex: isLocked ? 50 : undefined,
                boxShadow: isLocked ? '0 0 0 6px #a78bfa80' : undefined,
                transition: isLocked ? 'all 0.5s cubic-bezier(.42,0,.58,1)' : undefined,
              }}
              id={isFlippable ? `flippable-card-${item.key}` : undefined}
            >
              <DraggableCardContainer>
                {isFlippable ? (
                  <motion.div
                    className="w-64 h-40"
                    style={{ perspective: 1000 }}
                    onClick={() => {
                      if (!isFlipped && !locked) {
                        setFlipped({ [item.key]: true });
                        setLocked(item.key);
                      }
                    }}
                  >
                    <motion.div
                      className="w-full h-full"
                      animate={{ rotateY: isFlipped ? 180 : 0 }}
                      transition={{ duration: 0.6 }}
                      style={{ position: 'relative', transformStyle: 'preserve-3d', cursor: locked ? 'default' : 'pointer' }}
                    >
                      {/* Front Side */}
                      <div
                        className="absolute w-full h-full"
                        style={{ backfaceVisibility: 'hidden' }}
                      >
                        <DraggableCardBody className="w-[270px] h-[320px] rounded-2xl bg-white/10 backdrop-blur-xl border border-white/30 shadow-2xl flex flex-col items-center justify-center cursor-pointer hover:scale-105 transition p-6">
                          <span className="text-2xl font-bold text-gray-900 mb-2 drop-shadow-lg">{item.label}</span>
                          <span className="text-gray-700 text-base text-center font-medium drop-shadow">{item.description}</span>
                        </DraggableCardBody>
                      </div>
                      {/* Back Side */}
                      <div
                        className="absolute w-full h-full flex flex-col items-center justify-center w-[270px] h-[320px] rounded-2xl bg-white/10 backdrop-blur-xl border border-white/30 shadow-2xl p-0"
                        style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                      >
                        {item.key === 'settings' ? (
                          <div className="w-full h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
                            <SettingsCard forceExpanded={true} />
                          </div>
                        ) : (
                          <>
                            <span className="text-2xl font-bold text-gray-900 mb-2 drop-shadow-lg">
                              {item.label} (Back)
                            </span>
                            <span className="text-gray-700 text-base text-center font-medium drop-shadow">
                              {item.key === 'profile' ? 'Profile details coming soon!' : 'Settings options coming soon!'}
                            </span>
                          </>
                        )}
                      </div>
                    </motion.div>
                  </motion.div>
                ) : (
                  <DraggableCardBody
                    className={`w-[270px] h-[320px] rounded-2xl bg-white/10 backdrop-blur-xl border border-white/30 shadow-2xl flex flex-col items-center justify-center p-6 transition ${item.key === 'jobs' || item.key === 'coach' ? 'cursor-pointer hover:scale-105' : 'cursor-default'}`}
                    onTap={item.key === 'jobs' ? () => navigate('/app/jobs') : item.key === 'coach' ? () => setShowCoach(true) : undefined}
                  >
                    <span className="text-2xl font-bold text-gray-900 mb-2 drop-shadow-lg">{item.label}</span>
                    <span className="text-gray-700 text-base text-center font-medium drop-shadow">{item.description}</span>
                  </DraggableCardBody>
                )}
              </DraggableCardContainer>
            </div>
          );
        })}
      </div>
      {/* TODO: Add hamburger menu, overlays, etc. */}
    </div>
  );
}
