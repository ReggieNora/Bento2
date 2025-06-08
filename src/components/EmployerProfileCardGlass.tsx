import React from "react";

// Demo logo import (replace with actual static import or prop if needed)
import hirlyLogo from "../assets/hirly-logo.png";

interface EmployerProfileProps {
  companyName?: string;
  logoUrl?: string;
  location?: string;
  employees?: number;
  about?: string;
  onBack?: () => void;
}

const EmployerProfileCardGlass: React.FC<EmployerProfileProps> = ({
  companyName = "Hirly",
  logoUrl = hirlyLogo,
  location = "Columbus, OH, United States",
  employees = 42,
  about = "Hirly is a next-generation hiring platform connecting top talent with innovative companies. We believe in making hiring simple, transparent, and human.",
  onBack,
}) => {
  return (
    <div className="relative w-full max-w-md mx-auto p-6 rounded-2xl border border-white/30 text-white bg-white/20"
      style={{ minHeight: 420, maxHeight: '90vh', display: 'flex', flexDirection: 'column', boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.18)' }}>
      <div className="absolute inset-0 rounded-2xl pointer-events-none z-0 backdrop-blur-lg" style={{}} />
      <button
        aria-label="Back"
        className="absolute top-4 left-4 text-white/70 hover:text-white"
        onClick={onBack}
        style={{ fontSize: 24 }}
      >
        ←
      </button>
      <div className="flex flex-col items-center mt-6 flex-shrink-0">
        <div className="w-24 h-24 rounded-full overflow-hidden bg-white/40 flex items-center justify-center mb-4 border border-white/30">
          <img src={logoUrl} alt={`${companyName} logo`} className="object-contain w-20 h-20" />
        </div>
        <h2 className="text-3xl font-bold mb-1 drop-shadow-lg">{companyName}</h2>
        <div className="mb-4 !text-white text-white" style={{ color: '#fff' }}>{location}</div>
        <div className="flex gap-6 mb-4">
          <div className="flex flex-col items-center">
            <span className="text-lg font-semibold !text-white text-white" style={{ color: '#fff' }}>{employees}</span>
            <span className="text-xs !text-white text-white" style={{ color: '#fff' }}>Employees</span>
          </div>
        </div>
      </div>
      <div
        className="flex-1 w-full overflow-y-auto mt-2 pb-2 scrollbar-thin scrollbar-thumb-white/30 scrollbar-track-transparent overscroll-contain"
        style={{ minHeight: 0, scrollBehavior: 'smooth', WebkitOverflowScrolling: 'touch', touchAction: 'pan-y', willChange: 'transform' }}
      >
        <div className="w-full bg-white/10 rounded-xl p-4 text-sm text-white/90 mb-2" style={{ minHeight: 80 }}>
          {about}
        </div>
        {/* Company Valuation */}
        <div className="w-full bg-white/10 rounded-xl p-4 text-sm text-white/90 mb-2 flex items-center gap-4">
          <span className="font-semibold text-lg">Est. Valuation:</span>
          <span className="text-emerald-300 font-bold text-lg">$18M</span>
        </div>
        {/* Recently Posted Jobs */}
        <div className="w-full bg-white/10 rounded-xl p-4 text-white/90 mb-2">
          <div className="font-semibold mb-2 text-base">Recently Posted Jobs</div>
          <ul className="space-y-1 text-sm">
            <li><span className="font-medium">Senior Frontend Engineer</span> — Remote, $140k–$170k</li>
            <li><span className="font-medium">Product Designer</span> — Hybrid, $110k–$135k</li>
            <li><span className="font-medium">AI Solutions Architect</span> — Onsite, $180k–$210k</li>
          </ul>
        </div>
        {/* Skills of Interest */}
        <div className="w-full bg-white/10 rounded-xl p-4 text-white/90 mb-2">
          <div className="font-semibold mb-2 text-base">Skills of Interest</div>
          <div className="flex flex-wrap gap-2">
            <span className="bg-purple-500/30 text-purple-100 px-3 py-1 rounded-full text-xs font-medium">React</span>
            <span className="bg-blue-500/30 text-blue-100 px-3 py-1 rounded-full text-xs font-medium">TypeScript</span>
            <span className="bg-pink-500/30 text-pink-100 px-3 py-1 rounded-full text-xs font-medium">UI/UX</span>
            <span className="bg-green-500/30 text-green-100 px-3 py-1 rounded-full text-xs font-medium">AI/ML</span>
            <span className="bg-yellow-500/30 text-yellow-100 px-3 py-1 rounded-full text-xs font-medium">Product Management</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerProfileCardGlass;
