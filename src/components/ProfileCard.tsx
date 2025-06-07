import React from 'react';

interface Resume {
  experience: Array<{
    title: string;
    company: string;
    duration: string;
    description: string;
  }>;
  education: {
    degree: string;
    school: string;
    duration: string;
    honors?: string;
  };
}

interface ProfileCardProps {
  name: string;
  title: string;
  skills: string[];
  description?: string;
  onBack: () => void;
  resume?: Resume;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  name,
  title,
  skills,
  description,
  onBack,
  resume
}) => {
  const sampleResume = {
    experience: [
      {
        title: "Senior Frontend Developer",
        company: "Google",
        duration: "2020 - Present",
        description: "Led development of core UI features, mentored junior devs, and improved app performance by 40%."
      },
      {
        title: "Frontend Developer",
        company: "Facebook",
        duration: "2018 - 2020",
        description: "Built and maintained React components, implemented new features, and collaborated with design team."
      }
    ],
    education: {
      degree: "B.S. Computer Science",
      school: "Stanford University",
      duration: "2014 - 2018",
      honors: "Graduated with honors. Focus on Software Engineering and AI."
    }
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Back Button - Completely Opaque */}
      <button
        onClick={onBack}
        className="absolute top-4 left-4 px-4 py-2 rounded-full text-white transition-colors z-10 shadow-xl"
        style={{
          backgroundColor: '#1f2937', // Solid dark background
          border: '1px solid #374151', // Solid border
          backdropFilter: 'none',
          backgroundImage: 'none'
        }}
      >
        Back
      </button>

      {/* Main Card - Completely Solid Background */}
      <div
        className="rounded-2xl p-6 shadow-2xl transition-all duration-300 w-[350px] flex flex-col items-center relative"
        style={{
          backgroundColor: '#111827', // Solid dark background - no transparency
          border: '1px solid #374151', // Solid border
          backgroundImage: 'none', // No background image
          backdropFilter: 'none', // No backdrop filter
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8)', // Strong shadow
        }}
      >
        {/* Content with high contrast */}
        <div className="relative z-10 w-full flex flex-col items-center">
          <img
            src="https://thispersondoesnotexist.com/image"
            alt={name}
            className="w-24 h-24 rounded-full border-2 border-gray-600 mb-4 shadow-lg"
          />
          <h2 className="text-2xl font-bold text-white text-center mb-1">{name}</h2>
          <p className="text-gray-200 text-lg text-center mb-2">{title}</p>
          {description && <p className="text-gray-300 text-center mb-4">{description}</p>}
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {skills.map((skill, i) => (
              <span
                key={i}
                className="px-4 py-2 rounded-full text-gray-200 text-sm shadow-lg"
                style={{
                  backgroundColor: '#1f2937', // Solid background
                  border: '1px solid #4b5563', // Solid border
                  backgroundImage: 'none',
                  backdropFilter: 'none'
                }}
              >
                {skill}
              </span>
            ))}
          </div>

          {/* Show More Section - Resume/Experience */}
          <div className="w-full mt-4">
            <h3 className="text-xl font-bold text-white mb-2">Experience</h3>
            {(resume || sampleResume).experience.map((exp, i) => (
              <div 
                key={i} 
                className="mb-4 rounded-xl p-4"
                style={{
                  backgroundColor: '#1f2937', // Solid background
                  border: '1px solid #374151',
                  backgroundImage: 'none',
                  backdropFilter: 'none',
                }}
              >
                <h4 className="text-lg font-semibold text-white mb-1">{exp.title}</h4>
                <p className="text-gray-200 text-sm mb-1">{exp.company}</p>
                <p className="text-gray-200 text-sm mb-1">{exp.duration}</p>
                <p className="text-gray-300 text-sm">{exp.description}</p>
              </div>
            ))}
            <h3 className="text-xl font-bold text-white mb-2 mt-6">Education</h3>
            <div 
              className="rounded-xl p-4"
              style={{
                backgroundColor: '#1f2937', // Solid background
                border: '1px solid #374151',
                backgroundImage: 'none',
                backdropFilter: 'none',
              }}
            >
              <h4 className="text-lg font-semibold text-white mb-1">{(resume || sampleResume).education.degree}</h4>
              <p className="text-gray-200 text-sm mb-1">{(resume || sampleResume).education.school}</p>
              <p className="text-gray-200 text-sm mb-1">{(resume || sampleResume).education.duration}</p>
              <p className="text-gray-300 text-sm">{(resume || sampleResume).education.honors}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;