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
  onContactClick?: () => void;
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
  onContactClick?: () => void;
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
      onContactClick,
      location,
      about,
      skills,
      resume
    } = props;
    return (
      <div className="flex items-center justify-center min-h-screen bg-black/60">
        <DraggableCardContainer>
          <DraggableCardBody>
            <div className="pc-card-wrapper">
              <section className="pc-card">
                <div className="pc-inside">
                  <div className="pc-shine" />
                  <div className="pc-glare" />
                  {avatarUrl && (
                    <div
                      className="pc-profile-bg"
                      style={{
                        backgroundImage: `url(${avatarUrl})`,
                        position: 'absolute',
                        inset: 0,
                        zIndex: 1,
                        opacity: 0.18,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        filter: 'blur(0.5px) grayscale(10%)',
                        pointerEvents: 'none',
                        borderRadius: 'inherit',
                      }}
                    />
                  )}
                  <div className="pc-content flex flex-col h-full justify-between">
                    <div>
                      <div className="flex flex-col items-center mb-4">
                        <div className="w-24 h-24 rounded-2xl overflow-hidden mb-3 border-2 border-white/20">
                          <img src={avatarUrl} alt={name} className="w-full h-full object-cover" />
                        </div>
                        <h2 className="text-2xl font-bold text-white tracking-wide text-center text-shadow-glow mb-1">{name}</h2>
                        <p className="text-white/70 text-base text-center mb-0">{title}</p>
                        <p className="text-white/50 text-sm text-center mb-2">{handle}</p>
                        {location && <div className="text-white/80 text-xs text-center mb-2">{location}</div>}
                      </div>
                      {about && (
                        <div className="text-white/80 text-center text-base mb-3 px-2">
                          {about}
                        </div>
                      )}
                      {/* Experience */}
                      {resume?.experience && resume.experience.length > 0 && (
                        <div className="mt-2">
                          <h4 className="text-base font-bold mb-1 text-white text-center">Experience</h4>
                          <ul className="mb-2">
                            {resume.experience.map((exp, idx) => (
                              <li key={idx} className="mb-1">
                                <div className="font-semibold text-white text-center">{exp.title} <span className="font-normal text-white/70">@ {exp.company}</span></div>
                                <div className="text-xs text-white/80 text-center">{exp.duration}</div>
                                {exp.description && <div className="text-sm text-white/70 text-center">{exp.description}</div>}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {/* Education */}
                      {resume?.education && resume.education.degree && (
                        <div className="mt-2">
                          <h4 className="text-base font-bold mb-1 text-white text-center">Education</h4>
                          <div className="mb-1 text-center">
                            <div className="font-semibold text-white">{resume.education.degree}</div>
                            <div className="text-xs text-white/80">{resume.education.school} &middot; {resume.education.duration}</div>
                            {resume.education.honors && <div className="text-sm text-white/70">{resume.education.honors}</div>}
                          </div>
                        </div>
                      )}
                      {/* Skills */}
                      {skills && skills.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-4 justify-center">
                          {skills.map((skill, idx) => (
                            <span key={idx} className="bg-white/10 border border-white/20 px-3 py-1 rounded-full text-xs text-white">
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    {/* Contact Button at the bottom */}
                    {onContactClick && (
                      <div className="mt-8 flex justify-center">
                        <button
                          className="pc-back-btn"
                          style={{
                            background: 'rgba(30,32,65,0.32)',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '999px',
                            padding: '0.55em 1.4em',
                            fontWeight: 600,
                            fontSize: '1em',
                            cursor: 'pointer',
                            boxShadow: '0 2px 12px rgba(0,0,0,0.10)',
                            transition: 'background 0.2s',
                            outline: 'none',
                          }}
                          onClick={onContactClick}
                        >
                          Contact
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </section>
            </div>
          </DraggableCardBody>
        </DraggableCardContainer>
      </div>
    );
  } else {
    const {
      name,
      avatarUrl,
      onContactClick,
      location,
      about,
      skills,
      employees,
    } = props;
    return (
      <div className="flex items-center justify-center min-h-screen bg-black/60">
        <DraggableCardContainer>
          <DraggableCardBody>
            <div className="pc-card-wrapper">
              <section className="pc-card">
                <div className="pc-inside">
                  <div className="pc-shine" />
                  <div className="pc-glare" />
                  {avatarUrl && (
                    <div
                      className="pc-profile-bg"
                      style={{
                        backgroundImage: `url(${avatarUrl})`,
                        position: 'absolute',
                        inset: 0,
                        zIndex: 1,
                        opacity: 0.18,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        filter: 'blur(0.5px) grayscale(10%)',
                        pointerEvents: 'none',
                        borderRadius: 'inherit',
                      }}
                    />
                  )}
                  <div className="pc-content flex flex-col h-full justify-between">
                    <div>
                      <div className="flex flex-col items-center mb-4">
                        <div className="w-24 h-24 rounded-2xl overflow-hidden mb-3 border-2 border-white/20">
                          <img src={avatarUrl} alt={name} className="w-full h-full object-cover" />
                        </div>
                        <h2 className="text-2xl font-bold text-white tracking-wide text-center text-shadow-glow mb-1">{name}</h2>
                        {location && <div className="text-white/80 text-xs text-center mb-1">{location}</div>}
                        {typeof employees === 'number' && <div className="text-white/60 text-xs text-center mb-1">{employees} Employees</div>}
                      </div>
                      {about && (
                        <div className="text-white/80 text-center text-base mb-3 px-2">
                          {about}
                        </div>
                      )}
                      {/* Skills */}
                      {skills && skills.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-4 justify-center">
                          {skills.map((skill, idx) => (
                            <span key={idx} className="bg-white/10 border border-white/20 px-3 py-1 rounded-full text-xs text-white">
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    {/* Contact Button at the bottom */}
                    {onContactClick && (
                      <div className="mt-8 flex justify-center">
                        <button
                          className="pc-back-btn"
                          style={{
                            background: 'rgba(30,32,65,0.32)',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '999px',
                            padding: '0.55em 1.4em',
                            fontWeight: 600,
                            fontSize: '1em',
                            cursor: 'pointer',
                            boxShadow: '0 2px 12px rgba(0,0,0,0.10)',
                            transition: 'background 0.2s',
                            outline: 'none',
                          }}
                          onClick={onContactClick}
                        >
                          Contact
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </section>
            </div>
          </DraggableCardBody>
        </DraggableCardContainer>
      </div>
    );
  }
};

export default ProfileCardParent;
