import React from "react";
import { DraggableCardContainer, DraggableCardBody } from "./ui/draggable-card";
import "./ProfileCard.css";

interface CandidateProfileProps {
  type: "candidate";
  name: string;
  title: string;
  handle: string;
  status?: string;
  avatarUrl: string;
  contactText?: string;
  showUserInfo?: boolean;
  enableTilt?: boolean;
  onEditClick?: () => void;
  about?: string;
  location?: string;
  skills?: string[];
  resume: {
    experience: {
      title: string;
      company: string;
      duration: string;
      description: string;
    }[];
    education: {
      degree: string;
      school: string;
      duration: string;
      honors: string;
    };
  };
}

interface EmployerProfileProps {
  type: "employer";
  name: string;
  handle: string;
  avatarUrl: string;
  contactText?: string;
  showUserInfo?: boolean;
  enableTilt?: boolean;
  onEditClick?: () => void;
  location?: string;
  employees?: number;
  about?: string;
  skills?: string[];
}

type ProfileCardParentProps = CandidateProfileProps | EmployerProfileProps;

const ProfileCardParent: React.FC<ProfileCardParentProps> = (props) => {

  // Common fields for both types
  if (props.type === "candidate") {
    const {
      name,
      handle,
      avatarUrl,
      title,
      onEditClick,
      location,
      about,
      skills,
      resume
    } = props;
    return (
      <div className="flex items-center justify-center min-h-screen bg-black/60">
        <div className="w-full max-w-md mx-auto rounded-2xl shadow-xl bg-white/10 backdrop-blur-lg border border-white/20 p-6 flex flex-col gap-5" style={{minWidth: 340}}>
          <div className="flex items-center gap-3">
            {avatarUrl && (
              <img src={avatarUrl} alt={name} className="w-12 h-12 rounded-xl object-cover border border-white/30 bg-white/10" />
            )}
            <div className="flex-1">
              <div className="text-lg font-semibold text-white leading-tight">{name}</div>
              <div className="text-sm text-white/80">{title}</div>
              {props.type === 'candidate' && handle && (
                <div className="text-xs text-white/60">{handle}</div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs text-white/80">
            {location && (
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10c0 7-7.5 11-7.5 11S4.5 17 4.5 10a7.5 7.5 0 1115 0z" /></svg>
                {location}
              </span>
            )}
            {props.type === 'employer' && typeof employees === 'number' && (
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m13 0A4 4 0 0017 4a4 4 0 00-2.67 7.13M7 16a4 4 0 01-8 0m8 0A4 4 0 017 4a4 4 0 012.67 7.13" /></svg>
                {employees} Employees
              </span>
            )}
          </div>
          {about && (
            <div className="text-white/90 text-sm leading-relaxed">
              {about}
            </div>
          )}
          {skills && skills.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, idx) => (
                <span key={idx} className="bg-white/20 text-white text-xs rounded-full px-3 py-1">
                  {skill}
                </span>
              ))}
            </div>
          )}
          {props.type === 'candidate' && resume?.experience && resume.experience.length > 0 && (
            <div>
              <div className="text-white/80 text-xs font-semibold mb-1">Experience</div>
              <ul className="space-y-1">
                {resume.experience.slice(0,2).map((exp, idx) => (
                  <li key={idx} className="text-white/80 text-xs flex flex-col">
                    <span className="font-medium">{exp.title}</span>
                    <span className="text-white/60">{exp.company} &middot; {exp.duration}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {props.type === 'candidate' && resume?.education && resume.education.degree && (
            <div>
              <div className="text-white/80 text-xs font-semibold mb-1">Education</div>
              <div className="text-white/80 text-xs">
                <span className="font-medium">{resume.education.degree}</span> at {resume.education.school} ({resume.education.duration})
              </div>
              {resume.education.honors && <div className="text-white/60 text-xs">{resume.education.honors}</div>}
            </div>
          )}
          {onEditClick && (
            <div className="mt-4 flex justify-center">
              <button
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-white/20 hover:bg-white/30 text-white font-semibold py-2 transition"
                onClick={onEditClick}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487a2.1 2.1 0 1 1 2.97 2.97l-9.6 9.6a4.2 4.2 0 0 1-1.767 1.05l-2.8.8a.7.7 0 0 1-.862-.862l.8-2.8a4.2 4.2 0 0 1 1.05-1.767l9.6-9.6ZM19.5 6.75l-1.5-1.5" />
                </svg>
                Edit
              </button>
            </div>
          )}
        </div>
      </div>
    );
  } else {
    const {
      name,
      avatarUrl,
      onEditClick,
      location,
      about,
      skills,
      employees,
    } = props;
    return (
      <div className="flex items-center justify-center min-h-screen bg-black/60">
        <div className="w-full max-w-md mx-auto rounded-2xl shadow-xl bg-white/10 backdrop-blur-lg border border-white/20 p-6 flex flex-col gap-5" style={{minWidth: 340}}>
          <div className="flex items-center gap-3">
            {avatarUrl && (
              <img src={avatarUrl} alt={name} className="w-12 h-12 rounded-xl object-cover border border-white/30 bg-white/10" />
            )}
            <div className="flex-1">
              <div className="text-lg font-semibold text-white leading-tight">{name}</div>
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs text-white/80">
            {location && (
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10c0 7-7.5 11-7.5 11S4.5 17 4.5 10a7.5 7.5 0 1115 0z" /></svg>
                {location}
              </span>
            )}
            {typeof employees === 'number' && (
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m13 0A4 4 0 0017 4a4 4 0 00-2.67 7.13M7 16a4 4 0 01-8 0m8 0A4 4 0 017 4a4 4 0 012.67 7.13" /></svg>
                {employees} Employees
              </span>
            )}
          </div>
          {about && (
            <div className="text-white/90 text-sm leading-relaxed">
              {about}
            </div>
          )}
          {skills && skills.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, idx) => (
                <span key={idx} className="bg-white/20 text-white text-xs rounded-full px-3 py-1">
                  {skill}
                </span>
              ))}
            </div>
          )}
          {onEditClick && (
            <div className="mt-4 flex justify-center">
              <button
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-white/20 hover:bg-white/30 text-white font-semibold py-2 transition"
                onClick={onEditClick}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487a2.1 2.1 0 1 1 2.97 2.97l-9.6 9.6a4.2 4.2 0 0 1-1.767 1.05l-2.8.8a.7.7 0 0 1-.862-.862l.8-2.8a4.2 4.2 0 0 1 1.05-1.767l9.6-9.6ZM19.5 6.75l-1.5-1.5" />
                </svg>
                Edit
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
};

export default ProfileCardParent;
