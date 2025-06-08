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
    <div className="relative w-full max-w-md mx-auto p-6 rounded-2xl shadow-2xl bg-white/20 backdrop-blur-lg border border-white/30 text-white" style={{ minHeight: 420 }}>
      <button
        aria-label="Back"
        className="absolute top-4 left-4 text-white/70 hover:text-white"
        onClick={onBack}
        style={{ fontSize: 24 }}
      >
        ←
      </button>
      <div className="flex flex-col items-center mt-6">
        <div className="w-24 h-24 rounded-full overflow-hidden bg-white/40 flex items-center justify-center mb-4 border border-white/30">
          <img src={logoUrl} alt={`${companyName} logo`} className="object-contain w-20 h-20" />
        </div>
        <h2 className="text-3xl font-bold mb-1 drop-shadow-lg">{companyName}</h2>
        <div className="text-white/80 mb-4">{location}</div>
        <div className="flex gap-6 mb-4">
          <div className="flex flex-col items-center">
            <span className="text-lg font-semibold">{employees}</span>
            <span className="text-xs text-white/60">Employees</span>
          </div>
        </div>
        <div className="w-full bg-white/10 rounded-xl p-4 text-sm text-white/90 mb-2" style={{ minHeight: 80 }}>
          {about}
        </div>
      </div>
    </div>
  );
};

export default EmployerProfileCardGlass;
