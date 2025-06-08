import React from 'react';
import backArrow from '../assets/back-arrow.svg';
import { MapPin } from 'lucide-react';
import VerifiedBadge from './VerifiedBadge';

interface Experience {
  title: string;
  company: string;
  duration: string;
  description: string;
}
interface Education {
  degree: string;
  school: string;
  duration: string;
  honors?: string;
}
interface Resume {
  experience?: Experience[];
  education?: Education;
}
interface CandidateProps {
  candidate: {
    name: string;
    title: string;
    skills: string[];
    avatarSrc?: string;
    location?: string;
    description?: string;
    resume?: Resume;
  };
  onBack?: () => void;
}

const ProfileCardGlass: React.FC<CandidateProps> = ({ candidate, onBack }) => {
  const [editMode, setEditMode] = React.useState(false);
  const [editCandidate, setEditCandidate] = React.useState(candidate);
  const [skillInput, setSkillInput] = React.useState("");

  React.useEffect(() => {
    setEditCandidate(candidate);
  }, [candidate]);

  const handleChange = (field: keyof typeof editCandidate, value: any) => {
    setEditCandidate(prev => ({ ...prev, [field]: value }));
  };
  const handleSkillAdd = () => {
    if (skillInput.trim() && !editCandidate.skills.includes(skillInput.trim())) {
      setEditCandidate(prev => ({ ...prev, skills: [...prev.skills, skillInput.trim()] }));
      setSkillInput("");
    }
  };
  const handleSkillRemove = (idx: number) => {
    setEditCandidate(prev => ({ ...prev, skills: prev.skills.filter((_, i) => i !== idx) }));
  };
  const handleCancel = () => {
    setEditCandidate(candidate);
    setSkillInput("");
    setEditMode(false);
  };
  const handleSave = () => {
    // TODO: persist changes to backend
    setEditMode(false);
  };

  return (
    <div
      className="relative w-[350px] rounded-2xl overflow-hidden shadow-xl shadow-black/20 transition-all duration-300 h-[600px]"
      style={{
        background: 'rgba(255,255,255,0.15)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(255,255,255,0.2)',
      }}
    >
      {/* Back Button (optional) and Edit Button */}
      <div className="absolute top-4 right-4 flex gap-2 z-10">
        {onBack && (
          <button
            onClick={onBack}
            className="p-2 rounded-full text-white bg-black/30 border border-white/30 shadow flex items-center justify-center"
            aria-label="Back"
          >
            <img src={backArrow} alt="Back" className="w-5 h-5" />
          </button>
        )}
        {!editMode && (
          <button
            onClick={() => setEditMode(true)}
            className="p-2 rounded-full text-white bg-green-500/80 hover:bg-green-600/90 border border-white/30 shadow flex items-center justify-center"
            aria-label="Edit Profile"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828A2 2 0 019 17H7v-2a2 2 0 012-2z"/></svg>
          </button>
        )}
      </div>
      {/* Avatar */}
      {candidate.avatarSrc && (
        <div className="absolute top-6 left-6 w-16 h-16 rounded-xl bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center overflow-hidden">
          <img
            src={candidate.avatarSrc}
            alt={`${candidate.name} avatar`}
            className="w-full h-full object-contain p-2"
          />
        </div>
      )}
      {/* Candidate Info */}
      <div className="pt-28 pb-6 px-6 flex flex-col items-center h-full">
        {!editMode ? (
          <React.Fragment>
            <h2 className="text-2xl font-bold text-white mb-2 flex items-center">
              {candidate.name}
              <VerifiedBadge className="w-6 h-6 ml-2" />
            </h2>
            <h3 className="text-xl text-white/80 mb-4">{candidate.title}</h3>
            {candidate.location && (
              <div className="flex items-center text-white/60 mb-4">
                <MapPin className="w-4 h-4 mr-2" />
                <span>{candidate.location}</span>
              </div>
            )}
            {candidate.description && (
              <p className="text-white/70 text-center mb-4">{candidate.description}</p>
            )}
            {/* Skills */}
            {candidate.skills && candidate.skills.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {candidate.skills.map((skill, idx) => (
                  <span key={idx} className="bg-white/10 px-2 py-1 rounded text-xs text-white/80">{skill}</span>
                ))}
              </div>
            )}
            {/* Scrollable section: Everything below Experience */}
            <div
              className="w-full flex-1 overflow-y-auto mt-2"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                willChange: 'transform',
                overscrollBehavior: 'contain',
                scrollBehavior: 'smooth',
                WebkitOverflowScrolling: 'touch',
              }}
            >
              {/* Experience */}
              {candidate.resume?.experience && candidate.resume.experience.length > 0 && (
                <div className="w-full">
                  <h4 className="text-white/80 font-medium mb-2">Experience</h4>
                  {candidate.resume.experience.map((exp, idx) => (
                    <div key={idx} className="bg-white/5 rounded-lg p-3 mb-2">
                      <div className="font-semibold text-white">{exp.title}</div>
                      <div className="text-xs text-white/60 mb-1">{exp.company}</div>
                      <div className="text-xs text-white/60 mb-1">{exp.duration}</div>
                      <div className="text-xs text-white/80">{exp.description}</div>
                    </div>
                  ))}
                </div>
              )}
              {/* Education */}
              {candidate.resume?.education && (
                <div className="w-full mt-4">
                  <h4 className="text-white/80 font-medium mb-2">Education</h4>
                  <div className="bg-white/5 rounded-lg p-3">
                    <div className="font-semibold text-white">{candidate.resume.education.degree}</div>
                    <div className="text-xs text-white/60 mb-1">{candidate.resume.education.school}</div>
                    <div className="text-xs text-white/60 mb-1">{candidate.resume.education.duration}</div>
                    {candidate.resume.education.honors && (
                      <div className="text-xs text-white/80">{candidate.resume.education.honors}</div>
                    )}
                  </div>
                </div>
              )}
            </div>
            <style>{`.overflow-y-auto::-webkit-scrollbar { display: none; }`}</style>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {/* Editable fields */}
            <input
              className="text-2xl font-bold text-white mb-2 bg-transparent border-b border-white/30 w-full text-center focus:outline-none focus:border-green-400"
              value={editCandidate.name}
              onChange={e => handleChange('name', e.target.value)}
              maxLength={40}
            />
            <input
              className="text-xl text-white/80 mb-4 bg-transparent border-b border-white/20 w-full text-center focus:outline-none focus:border-green-400"
              value={editCandidate.title}
              onChange={e => handleChange('title', e.target.value)}
              maxLength={40}
            />
            <div className="flex items-center text-white/60 mb-4 w-full">
              <MapPin className="w-4 h-4 mr-2" />
              <input
                className="bg-transparent border-b border-white/20 flex-1 text-white focus:outline-none focus:border-green-400"
                value={editCandidate.location || ''}
                onChange={e => handleChange('location', e.target.value)}
                maxLength={40}
              />
            </div>
            <textarea
              className="text-white/70 text-center mb-4 bg-transparent border-b border-white/20 w-full resize-none focus:outline-none focus:border-green-400"
              value={editCandidate.description || ''}
              onChange={e => handleChange('description', e.target.value)}
              rows={2}
              maxLength={200}
            />
            {/* Editable skills */}
            <div className="flex flex-wrap gap-2 mb-3 w-full">
              {editCandidate.skills.map((skill, idx) => (
                <span key={idx} className="bg-white/10 px-2 py-1 rounded text-xs text-white/80 flex items-center gap-1">
                  {skill}
                  <button
                    onClick={() => handleSkillRemove(idx)}
                    className="ml-1 text-white/60 hover:text-red-400 focus:outline-none"
                    aria-label="Remove skill"
                  >
                    ×
                  </button>
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
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default ProfileCardGlass;
