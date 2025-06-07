import React from 'react';
import { MapPin } from 'lucide-react';

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
  return (
    <div
      className="relative w-[350px] rounded-2xl overflow-hidden shadow-xl shadow-black/20 transition-all duration-300 h-[600px]"
      style={{
        background: 'rgba(255,255,255,0.15)', // glassy clear/white
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(255,255,255,0.2)',
      }}
    >
      {/* Back Button (optional) */}
      {onBack && (
        <button
          onClick={onBack}
          className="absolute top-4 left-4 px-4 py-2 rounded-full text-white bg-black/30 border border-white/30 shadow"
        >
          Back
        </button>
      )}
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
      <div className="pt-28 pb-6 px-6 flex flex-col items-center">
        <h2 className="text-2xl font-bold text-white mb-2">{candidate.name}</h2>
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
        {/* Experience */}
        {candidate.resume?.experience && candidate.resume.experience.length > 0 && (
          <div className="w-full">
            <h4 className="text-white/80 font-medium mb-2">Experience</h4>
            <div
              className="rounded-lg overflow-y-auto pr-1"
              style={{
                maxHeight: '140px',
                scrollbarWidth: 'none', // Firefox
                msOverflowStyle: 'none', // IE/Edge
              }}
            >
              {candidate.resume.experience.map((exp, idx) => (
                <div key={idx} className="bg-white/5 rounded-lg p-3 mb-2">
                  <div className="font-semibold text-white">{exp.title}</div>
                  <div className="text-xs text-white/60 mb-1">{exp.company}</div>
                  <div className="text-xs text-white/60 mb-1">{exp.duration}</div>
                  <div className="text-xs text-white/80">{exp.description}</div>
                </div>
              ))}
            </div>
            <style>{`
              .overflow-y-auto::-webkit-scrollbar { display: none; }
            `}</style>
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
    </div>
  );
};

export default ProfileCardGlass;
