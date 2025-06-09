import React from "react";
import SimpleProfileCard from "./SimpleProfileCard";
import SimpleCompanyProfileCard from "./SimpleCompanyProfileCard";

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
        <div className="max-w-lg w-full">
          <SimpleProfileCard
            name={name}
            title={title}
            imageUrl={avatarUrl}
            description={about}
            meta1={typeof location === 'string' ? location : undefined}
            meta2={skills && skills.length > 0 ? skills[0] : undefined}
            meta3={handle}
            onViewProfile={onContactClick}
          />
          <div className="mt-6 text-center text-white/90">
            {typeof location === 'string' && <div className="mb-2 font-semibold">{location}</div>}
            {about && <div className="mb-2 text-sm opacity-80">{about}</div>}
          </div>
        </div>
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
      employees
    } = props;
    return (
      <div className="flex items-center justify-center min-h-screen bg-black/60">
        <div className="max-w-lg w-full">
          <SimpleCompanyProfileCard
            companyName={name}
            industry={skills && skills.length > 0 ? skills[0] : undefined}
            logoUrl={avatarUrl}
            description={about}
            specialties={skills || []}
            onViewProfile={onContactClick}
          />
          <div className="mt-6 text-center text-white/90">
            {typeof location === 'string' && <div className="mb-2 font-semibold">{location}</div>}
            {about && <div className="mb-2 text-sm opacity-80">{about}</div>}
            {typeof employees === "number" && (
              <div className="mb-2 text-xs">{employees} Employees</div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Additional fields
  const isCandidate = props.type === "candidate";
  const title = isCandidate ? (props as CandidateProfileProps).title : undefined;
  const employees = !isCandidate ? (props as EmployerProfileProps).employees : undefined;

  return (
    <div className="flex items-center justify-center min-h-screen bg-black/60">
      <div className="max-w-lg w-full">
        {isCandidate ? (
          <SimpleProfileCard
            name={name}
            title={title}
            imageUrl={avatarUrl}
            description={about}
            meta1={location}
            meta2={skills && skills.length > 0 ? skills[0] : undefined}
            meta3={handle}
            onViewProfile={onContactClick}
          />
        ) : (
          <SimpleCompanyProfileCard
            companyName={name}
            industry={skills && skills.length > 0 ? skills[0] : undefined}
            logoUrl={avatarUrl}
            description={about}
            specialties={skills || []}
            onViewProfile={onContactClick}
          />
        )}
        <div className="mt-6 text-center text-white/90">
          {location && <div className="mb-2 font-semibold">{location}</div>}
          {about && <div className="mb-2 text-sm opacity-80">{about}</div>}
          {typeof employees === "number" && (
            <div className="mb-2 text-xs">{employees} Employees</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileCardParent;
