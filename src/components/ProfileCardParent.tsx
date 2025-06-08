import React from "react";
import ProfileCard from "./ProfileCard";

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
  const {
    name,
    handle,
    avatarUrl,
    contactText = "Contact",
    showUserInfo = true,
    enableTilt = true,
    onContactClick,
    location,
    about,
    skills,
  } = props;

  // Additional fields
  const isCandidate = props.type === "candidate";
  const title = isCandidate ? (props as CandidateProfileProps).title : undefined;
  const employees = !isCandidate ? (props as EmployerProfileProps).employees : undefined;

  return (
    <div className="flex items-center justify-center min-h-screen bg-black/60">
      <div className="max-w-lg w-full">
        <ProfileCard
          name={name}
          title={title}
          handle={handle}
          status={isCandidate ? props.status : undefined}
          avatarUrl={avatarUrl}
          contactText={contactText}
          showUserInfo={showUserInfo}
          enableTilt={enableTilt}
          onContactClick={onContactClick}
        />
        {/* Additional info below card */}
        <div className="mt-6 text-center text-white/90">
          {location && <div className="mb-2 font-semibold">{location}</div>}
          {about && <div className="mb-2 text-sm opacity-80">{about}</div>}
          {typeof employees === "number" && (
            <div className="mb-2 text-xs">{employees} Employees</div>
          )}
          {skills && skills.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 mt-2">
              {skills.map((skill, idx) => (
                <span key={idx} className="bg-white/10 border border-white/20 px-2 py-1 rounded text-xs">
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileCardParent;
