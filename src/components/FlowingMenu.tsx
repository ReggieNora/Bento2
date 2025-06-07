import React from "react";

import "./FlowingMenu.css";
import { LampBackground } from "./ui/LampBackground";

import type { FlowingMenuItem } from './FlowingMenuItems';

interface MenuItemProps extends FlowingMenuItem {}

interface FlowingMenuProps {
  items?: FlowingMenuItem[];
  onItemClick?: (item: FlowingMenuItem) => void;
}

const FlowingMenu: React.FC<FlowingMenuProps> = ({ items = [], onItemClick }) => {
  const [selectedIdx, setSelectedIdx] = React.useState(0);
  const [arrowNavActive, setArrowNavActive] = React.useState(false);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!items.length) return;
      if (!arrowNavActive) {
        if (["ArrowDown","ArrowUp","ArrowLeft","ArrowRight"].includes(e.key)) {
          setArrowNavActive(true);
          e.preventDefault();
        }
        return;
      }
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        setSelectedIdx(idx => (idx + 1) % items.length);
        e.preventDefault();
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        setSelectedIdx(idx => (idx - 1 + items.length) % items.length);
        e.preventDefault();
      } else if ((e.key === 'Enter' || e.key === ' ') && items[selectedIdx]) {
        onItemClick?.(items[selectedIdx]);
        e.preventDefault();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [items, selectedIdx, onItemClick, arrowNavActive]);

  return (
    <div style={{position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden'}}>
      <LampBackground />
      {/* Brand background text */}
      <h1
        className="fixed top-1/2 left-1/2 -translate-x-[48%] -translate-y-1/2 text-[8rem] md:text-[12rem] font-bold bg-clip-text text-transparent bg-gradient-to-b from-white via-white/80 to-white/30 opacity-20 pointer-events-none select-none z-10 font-[Clash Display,sans-serif]"
        style={{ fontFamily: 'Clash Display, sans-serif', userSelect: 'none', pointerEvents: 'none' }}
      >
        Hirly
      </h1>
      <div className="menu-wrap glass" style={{position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <nav className="menu">
          {items.map((item, idx) => (
            <MenuItem
              key={idx}
              {...item}
              onClick={() => onItemClick?.(item)}
              selected={idx === selectedIdx}
            />
          ))}
        </nav>
      </div>
      {/* Footer */}
      <footer style={{position: 'fixed', bottom: 0, left: 0, width: '100vw', zIndex: 20}}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem 2.5rem', width: '100%', color: 'rgba(255,255,255,0.72)', fontSize: '1.1rem', fontFamily: 'Clash Display, sans-serif', background: 'rgba(20,16,36,0.12)', backdropFilter: 'blur(6px)'}}>
          <span>Hirly, Inc. 2025</span>
          <a href="mailto:support@hirly.com" style={{display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'inherit', textDecoration: 'none', fontWeight: 500}}>
            <LifeBuoy size={22} style={{marginRight: 4}} />
            Support
          </a>
        </div>
      </footer>
    </div>
  );
};

import { User, Briefcase, MessageSquare, Settings, BarChart2, Brain, LifeBuoy } from 'lucide-react';

const ICON_MAP: Record<string, React.ReactNode> = {
  'Candidates': <Briefcase size={36} />,
  'Jobs': <Briefcase size={36} />,
  'Messages': <MessageSquare size={36} />,
  'Settings': <Settings size={36} />,
  'Dashboard': <BarChart2 size={36} />,
  'Profile': <User size={36} />,
  'Coach': <Brain size={36} />,
};

const MenuItem: React.FC<MenuItemProps & { onClick?: () => void; selected?: boolean }> = ({ link, text, onClick, selected }) => {
  return (
    <div className={"menu__item" + (selected ? " menu__item--selected" : "") }>
      <a
        className={"menu__item-link" + (selected ? " menu__item-link--selected" : "")}
        href={link}
        tabIndex={selected ? 0 : -1}
        aria-selected={selected}
        onClick={e => {
          e.preventDefault();
          onClick?.();
        }}
      >
        <span className="menu__item-icon" style={{marginRight: '1.5vw', display: 'flex', alignItems: 'center'}}>
          {ICON_MAP[text] || <User size={36} />}
        </span>
        <span>{text}</span>
      </a>
    </div>
  );
};

export default FlowingMenu;
