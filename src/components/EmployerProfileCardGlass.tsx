import React from "react";
import VerifiedBadge from './VerifiedBadge';
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
  const [editMode, setEditMode] = React.useState(false);
  const [editProfile, setEditProfile] = React.useState({ companyName, location, employees, about });
  const [skills, setSkills] = React.useState([
    "React",
    "TypeScript",
    "UI/UX",
    "AI/ML",
    "Product Management",
  ]);
  const [skillInput, setSkillInput] = React.useState("");

  React.useEffect(() => {
    setEditProfile({ companyName, location, employees, about });
    setSkills(["React", "TypeScript", "UI/UX", "AI/ML", "Product Management"]);
  }, [companyName, location, employees, about]);

  const handleProfileChange = (field: keyof typeof editProfile, value: any) => {
    setEditProfile(prev => ({ ...prev, [field]: value }));
  };
  const handleSkillAdd = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills(prev => [...prev, skillInput.trim()]);
      setSkillInput("");
    }
  };
  const handleSkillRemove = (idx: number) => {
    setSkills(prev => prev.filter((_, i) => i !== idx));
  };
  const handleCancel = () => {
    setEditProfile({ companyName, location, employees, about });
    setSkills(["React", "TypeScript", "UI/UX", "AI/ML", "Product Management"]);
    setSkillInput("");
    setEditMode(false);
  };
  const handleSave = () => {
    // TODO: persist changes to backend
    setEditMode(false);
  };

  return (
    <div className="relative w-full max-w-md mx-auto p-6 rounded-2xl border border-white/30 text-white !text-white bg-white/20"
      style={{ minHeight: 420, maxHeight: '90vh', display: 'flex', flexDirection: 'column', boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.18)', color: '#fff', textShadow: '0 0 8px #000, 0 0 2px #fff' }}>
      <div className="absolute inset-0 rounded-2xl pointer-events-none z-0 backdrop-blur-lg" style={{}} />
      <div className="absolute top-4 right-4 flex gap-2 z-10">
        {!editMode && (
          <button
            onClick={() => setEditMode(true)}
            className="p-2 rounded-full text-white bg-green-500/80 hover:bg-green-600/90 border border-white/30 shadow flex items-center justify-center"
            aria-label="Edit Employer Profile"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828A2 2 0 019 17H7v-2a2 2 0 012-2z"/></svg>
          </button>
        )}
      </div>
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
          <img src={logoUrl} alt={`${editProfile.companyName} logo`} className="object-contain w-20 h-20" />
        </div>
        {!editMode ? (
          <>
            <h2 className="text-2xl font-bold text-white mb-2 flex items-center !text-white" style={{ color: '#fff', textShadow: '0 0 8px #000, 0 0 2px #fff' }}>
              <span className="text-white !text-white" style={{ color: '#fff', textShadow: '0 0 8px #000, 0 0 2px #fff' }}>{editProfile.companyName}</span>
              <VerifiedBadge className="w-6 h-6 ml-2" />
            </h2>
            <div className="mb-4 text-white !text-white" style={{ color: '#fff', textShadow: '0 0 8px #000, 0 0 2px #fff' }}>{editProfile.location}</div>
            <div className="flex gap-6 mb-4">
              <div className="flex flex-col items-center">
                <span className="text-lg font-semibold text-white !text-white" style={{ color: '#fff', textShadow: '0 0 8px #000, 0 0 2px #fff' }}>{editProfile.employees}</span>
                <span className="text-xs text-white !text-white" style={{ color: '#fff', textShadow: '0 0 8px #000, 0 0 2px #fff' }}>Employees</span>
              </div>
            </div>
          </>
        ) : (
          <>
            <input
              className="text-3xl font-bold mb-1 drop-shadow-lg bg-transparent border-b border-white/30 w-full text-center focus:outline-none focus:border-green-400"
              value={editProfile.companyName}
              onChange={e => handleProfileChange('companyName', e.target.value)}
              maxLength={40}
            />
            <input
              className="mb-4 !text-white bg-transparent border-b border-white/20 w-full text-center focus:outline-none focus:border-green-400"
              value={editProfile.location}
              onChange={e => handleProfileChange('location', e.target.value)}
              maxLength={40}
            />
            <div className="flex gap-2 mb-4 items-center">
              <span className="text-xs">Employees:</span>
              <input
                className="bg-transparent border-b border-white/20 text-white px-2 w-20 focus:outline-none focus:border-green-400"
                type="number"
                min={1}
                value={editProfile.employees}
                onChange={e => handleProfileChange('employees', Number(e.target.value))}
              />
            </div>
          </>
        )}
      </div>
      <div
        className="flex-1 w-full overflow-y-auto mt-2 pb-2 scrollbar-thin scrollbar-thumb-white/30 scrollbar-track-transparent overscroll-contain"
        style={{ minHeight: 0, scrollBehavior: 'smooth', WebkitOverflowScrolling: 'touch', touchAction: 'pan-y', willChange: 'transform' }}
      >
        {!editMode ? (
          <>
            <div className="w-full bg-white/10 rounded-xl p-4 text-sm text-white/90 mb-2" style={{ minHeight: 80 }}>
              {editProfile.about}
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
                {skills.map((skill, idx) => (
                  <span key={idx} className="bg-purple-500/30 text-purple-100 px-3 py-1 rounded-full text-xs font-medium">{skill}</span>
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            <textarea
              className="w-full bg-white/10 rounded-xl p-4 text-sm text-white/90 mb-2 focus:outline-none focus:border-green-400 border-b border-white/20"
              style={{ minHeight: 80 }}
              value={editProfile.about}
              onChange={e => handleProfileChange('about', e.target.value)}
              rows={3}
              maxLength={400}
            />
            {/* Skills of Interest Edit */}
            <div className="w-full bg-white/10 rounded-xl p-4 text-white/90 mb-2">
              <div className="font-semibold mb-2 text-base">Skills of Interest</div>
              <div className="flex flex-wrap gap-2 mb-2">
                {skills.map((skill, idx) => (
                  <span key={idx} className="bg-purple-500/30 text-purple-100 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                    {skill}
                    <button
                      onClick={() => handleSkillRemove(idx)}
                      className="ml-1 text-purple-200 hover:text-red-400 focus:outline-none"
                      aria-label="Remove skill"
                      type="button"
                    >×</button>
                  </span>
                ))}
                <input
                  className="bg-transparent text-xs text-white/80 px-1 border-b border-white/20 focus:border-green-400 outline-none min-w-[60px]"
                  value={skillInput}
                  onChange={e => setSkillInput(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleSkillAdd(); } }}
                  placeholder="Add skill"
                  maxLength={20}
                />
                <button
                  onClick={handleSkillAdd}
                  className="text-green-400 px-1 text-xs font-bold"
                  type="button"
                  aria-label="Add skill"
                >+
                </button>
              </div>
            </div>
            {/* Save/Cancel Buttons */}
            <div className="flex gap-4 mt-4 w-full">
              <button
                className="flex-1 bg-green-500/80 hover:bg-green-600/90 text-white font-semibold py-2 rounded-xl shadow"
                onClick={handleSave}
              >
                Save
              </button>
              <button
                className="flex-1 bg-white/20 hover:bg-white/30 text-white font-semibold py-2 rounded-xl shadow"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EmployerProfileCardGlass;
