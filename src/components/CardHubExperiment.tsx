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

// Fixed layout for the four cards (top-left, top-right, bottom-left, bottom-right)
const fixedLayout = [
  // Coach (top-left)
  { x: -220, y: -120, rotate: -6 },
  // Settings (top-right)
  { x: 220, y: -120, rotate: 6 },
  // Jobs (bottom-left)
  { x: -220, y: 120, rotate: -4 },
  // Profile (bottom-right)
  { x: 220, y: 120, rotate: 8 },
];

// Flip state for flippable cards
function useFlipStates(keys: string[]) {
  const [flipped, setFlipped] = React.useState<Record<string, boolean>>({});
  const flip = (key: string) => setFlipped(f => ({ ...f, [key]: !f[key] }));
  return [flipped, flip] as const;
}

export default function CardHubExperiment() {
  const [flipped, flip] = useFlipStates(menuItems.filter(m => m.flippable).map(m => m.key));

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#18122B] via-[#251E40] to-[#1A1A2E] overflow-hidden">
      {/* Center logo */}
      <div className="absolute z-10 flex flex-col items-center justify-center left-1/2 top-1/2" style={{ transform: 'translate(-50%, -50%)' }}>
        <img src={logo} alt="Hirly" className="w-32 h-32 mb-2 select-none pointer-events-none" />
        <span className="text-2xl font-extrabold text-white drop-shadow-lg">Hirly</span>
      </div>
      {/* Cards arranged around logo */}
      <div className="relative z-20 w-full h-full flex items-center justify-center">
        {menuItems.map((item, i) => {
          const isFlippable = !!item.flippable;
          const isFlipped = flipped[item.key];
          const layout = fixedLayout[i];
          return (
            <div
              key={item.key}
              style={{
                position: 'absolute',
                left: `calc(50% + ${layout.x}px)` ,
                top: `calc(50% + ${layout.y}px)` ,
                transform: `translate(-50%, -50%) rotate(${layout.rotate}deg)`
              }}
            >
              <DraggableCardContainer>
                {isFlippable ? (
                  <motion.div
                    className="w-64 h-40"
                    style={{ perspective: 1000 }}
                    onClick={() => flip(item.key)}
                  >
                    <motion.div
                      className="w-full h-full"
                      animate={{ rotateY: isFlipped ? 180 : 0 }}
                      transition={{ duration: 0.6 }}
                      style={{ position: 'relative', transformStyle: 'preserve-3d', cursor: 'pointer' }}
                    >
                      {/* Front Side */}
                      <div
                        className="absolute w-full h-full"
                        style={{ backfaceVisibility: 'hidden' }}
                      >
                        <DraggableCardBody className="w-64 h-40 bg-white/80 rounded-2xl shadow-2xl flex flex-col items-center justify-center cursor-pointer hover:scale-105 transition">
                          <span className="text-xl font-bold text-gray-800 mb-1">{item.label}</span>
                          <span className="text-gray-500 text-sm text-center">{item.description}</span>
                        </DraggableCardBody>
                      </div>
                      {/* Back Side */}
                      <div
                        className="absolute w-full h-full flex flex-col items-center justify-center bg-white/90 rounded-2xl shadow-2xl"
                        style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                      >
                        <span className="text-lg font-semibold text-gray-800 mb-2">
                          {item.label} (Back)
                        </span>
                        <span className="text-gray-600 text-sm text-center">
                          {item.key === 'profile' ? 'Profile details coming soon!' : 'Settings options coming soon!'}
                        </span>
                      </div>
                    </motion.div>
                  </motion.div>
                ) : (
                  <DraggableCardBody className="w-64 h-40 bg-white/80 rounded-2xl shadow-2xl flex flex-col items-center justify-center cursor-default">
                    <span className="text-xl font-bold text-gray-800 mb-1">{item.label}</span>
                    <span className="text-gray-500 text-sm text-center">{item.description}</span>
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
