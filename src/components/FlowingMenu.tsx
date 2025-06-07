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
  return (
    <div style={{position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden'}}>
      <LampBackground />
      <div className="menu-wrap glass" style={{position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <nav className="menu">
          {items.map((item, idx) => (
            <MenuItem key={idx} {...item} onClick={() => onItemClick?.(item)} />
          ))}
        </nav>
      </div>
    </div>
  );
};

import { User, Briefcase, MessageSquare, Settings, BarChart2, Brain } from 'lucide-react';

const ICON_MAP: Record<string, React.ReactNode> = {
  'Candidates': <Briefcase size={36} />,
  'Jobs': <Briefcase size={36} />,
  'Messages': <MessageSquare size={36} />,
  'Settings': <Settings size={36} />,
  'Dashboard': <BarChart2 size={36} />,
  'Profile': <User size={36} />,
  'AI Interview Coach': <Brain size={36} />,
};

const MenuItem: React.FC<MenuItemProps & { onClick?: () => void }> = ({ link, text, onClick }) => {
  return (
    <div className="menu__item">
      <a
        className="menu__item-link"
        href={link}
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
