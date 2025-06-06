import React, { useState } from 'react';

interface ProfileCardProps {
  name: string;
  title: string;
  skills: string[];
  description?: string;
  onBack: () => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  name,
  title,
  skills,
  description,
  onBack
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      {/* Back Button */}
      <button
        onClick={onBack}
        className="absolute top-4 left-4 px-4 py-2 rounded-full bg-white/20 hover:bg-white/30 text-white/80 hover:text-white transition-colors z-10 backdrop-blur-md border border-white/20"
      >
        Back
      </button>

      {/* Main Card with Enhanced Frosted Glass Effect */}
      <div
        className="bg-white/20 backdrop-blur-xl rounded-2xl p-6 border border-white/30 shadow-2xl transition-all duration-300 w-[350px] flex flex-col items-center cursor-pointer hover:scale-[1.02] relative overflow-hidden"
        onClick={() => setIsModalOpen(true)}
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.15) 100%)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37), 0 1px 0 0 rgba(255,255,255,0.3) inset',
        }}
      >
        {/* Additional frosted overlay for better text contrast */}
        <div 
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
          }}
        />
        
        {/* Content with enhanced contrast */}
        <div className="relative z-10 w-full flex flex-col items-center">
          <img
            src="https://thispersondoesnotexist.com/image"
            alt={name}
            className="w-24 h-24 rounded-full border-2 border-white/40 mb-4 shadow-lg"
          />
          <h2 className="text-2xl font-bold text-white text-center mb-1 drop-shadow-lg">{name}</h2>
          <p className="text-white/90 text-lg text-center mb-2 drop-shadow-md">{title}</p>
          {description && <p className="text-white/80 text-center mb-4 drop-shadow-md">{description}</p>}
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {skills.map((skill, i) => (
              <span
                key={i}
                className="px-4 py-2 rounded-full bg-white/20 border border-white/30 text-white/90 text-sm backdrop-blur-md shadow-lg"
              >
                {skill}
              </span>
            ))}
          </div>
          <button
            className="mt-auto w-full max-w-xs py-2 rounded-xl bg-gradient-to-r from-pink-500 to-red-500 text-white font-semibold shadow-lg hover:from-pink-600 hover:to-red-600 transition-colors backdrop-blur-md"
          >
            View Full Profile
          </button>
        </div>
      </div>

      {/* Modal with Enhanced Frosted Glass */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div 
            className="bg-white/20 backdrop-blur-xl rounded-2xl p-6 border border-white/30 shadow-2xl w-full max-w-4xl h-[90vh] overflow-y-auto relative"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.15) 100%)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37), 0 1px 0 0 rgba(255,255,255,0.3) inset',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {/* Hide scrollbar for WebKit browsers */}
            <style jsx>{`
              div::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            
            {/* Additional frosted overlay for modal */}
            <div 
              className="absolute inset-0 rounded-2xl pointer-events-none"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
              }}
            />
            
            <div className="relative z-10">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white drop-shadow-lg">Full Profile</h2>
                <div className="flex gap-4 items-center">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="text-white/80 hover:text-white text-2xl font-bold"
                  >
                    ×
                  </button>
                  <button
                    onClick={() => console.log('Edit profile clicked')}
                    className="px-4 py-2 rounded-full bg-white/20 hover:bg-white/30 text-white/80 hover:text-white transition-colors backdrop-blur-md border border-white/30"
                  >
                    Edit Profile
                  </button>
                </div>
              </div>

              <div className="space-y-8">
                {/* Personal Info */}
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src="https://thispersondoesnotexist.com/image"
                      alt={name}
                      className="w-32 h-32 rounded-full border-2 border-white/40 shadow-lg"
                    />
                    <div>
                      <h3 className="text-xl font-bold text-white drop-shadow-lg">{name}</h3>
                      <p className="text-white/90 text-lg drop-shadow-md">{title}</p>
                    </div>
                  </div>
                  {description && <p className="text-white/80 mb-4 drop-shadow-md">{description}</p>}
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill, i) => (
                      <span
                        key={i}
                        className="px-4 py-2 rounded-full bg-white/20 border border-white/30 text-white/90 text-sm backdrop-blur-md shadow-lg"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Experience */}
                <div>
                  <h3 className="text-xl font-bold text-white mb-4 drop-shadow-lg">Experience</h3>
                  {sampleResume.experience.map((exp, i) => (
                    <div key={i} className="mb-6 bg-white/10 rounded-xl p-4 backdrop-blur-md border border-white/20">
                      <h4 className="text-lg font-semibold text-white mb-2 drop-shadow-md">{exp.title}</h4>
                      <p className="text-white/80 text-sm mb-1 drop-shadow-sm">{exp.company}</p>
                      <p className="text-white/80 text-sm mb-2 drop-shadow-sm">{exp.duration}</p>
                      <p className="text-white/90 text-sm drop-shadow-sm">{exp.description}</p>
                    </div>
                  ))}
                </div>

                {/* Education */}
                <div>
                  <h3 className="text-xl font-bold text-white mb-4 drop-shadow-lg">Education</h3>
                  <div className="bg-white/10 rounded-xl p-4 backdrop-blur-md border border-white/20">
                    <h4 className="text-lg font-semibold text-white mb-2 drop-shadow-md">{sampleResume.education.degree}</h4>
                    <p className="text-white/80 text-sm mb-1 drop-shadow-sm">{sampleResume.education.school}</p>
                    <p className="text-white/80 text-sm mb-2 drop-shadow-sm">{sampleResume.education.duration}</p>
                    <p className="text-white/90 text-sm drop-shadow-sm">{sampleResume.education.honors}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileCard;