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
        className="absolute top-4 left-4 px-4 py-2 rounded-full bg-gray-800/90 hover:bg-gray-700/90 text-white transition-colors z-10 backdrop-blur-md border border-gray-600"
      >
        Back
      </button>

      {/* Main Card - Completely Opaque */}
      <div
        className="bg-gray-800 rounded-2xl p-6 border border-gray-600 shadow-2xl transition-all duration-300 w-[350px] flex flex-col items-center cursor-pointer hover:scale-[1.02] relative overflow-hidden"
        onClick={() => setIsModalOpen(true)}
      >
        {/* Content with high contrast */}
        <div className="relative z-10 w-full flex flex-col items-center">
          <img
            src="https://thispersondoesnotexist.com/image"
            alt={name}
            className="w-24 h-24 rounded-full border-2 border-gray-500 mb-4 shadow-lg"
          />
          <h2 className="text-2xl font-bold text-white text-center mb-1">{name}</h2>
          <p className="text-gray-200 text-lg text-center mb-2">{title}</p>
          {description && <p className="text-gray-300 text-center mb-4">{description}</p>}
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {skills.map((skill, i) => (
              <span
                key={i}
                className="px-4 py-2 rounded-full bg-gray-700 border border-gray-500 text-gray-200 text-sm shadow-lg"
              >
                {skill}
              </span>
            ))}
          </div>
          <button
            className="mt-auto w-full max-w-xs py-2 rounded-xl bg-gradient-to-r from-pink-500 to-red-500 text-white font-semibold shadow-lg hover:from-pink-600 hover:to-red-600 transition-colors"
          >
            View Full Profile
          </button>
        </div>
      </div>

      {/* Modal - Also Opaque */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div 
            className="bg-gray-800 rounded-2xl p-6 border border-gray-600 shadow-2xl w-full max-w-4xl h-[90vh] overflow-y-auto relative"
            style={{
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
            
            <div className="relative z-10">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Full Profile</h2>
                <div className="flex gap-4 items-center">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="text-gray-300 hover:text-white text-2xl font-bold"
                  >
                    ×
                  </button>
                  <button
                    onClick={() => console.log('Edit profile clicked')}
                    className="px-4 py-2 rounded-full bg-gray-700 hover:bg-gray-600 text-gray-200 hover:text-white transition-colors border border-gray-500"
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
                      className="w-32 h-32 rounded-full border-2 border-gray-500 shadow-lg"
                    />
                    <div>
                      <h3 className="text-xl font-bold text-white">{name}</h3>
                      <p className="text-gray-200 text-lg">{title}</p>
                    </div>
                  </div>
                  {description && <p className="text-gray-300 mb-4">{description}</p>}
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill, i) => (
                      <span
                        key={i}
                        className="px-4 py-2 rounded-full bg-gray-700 border border-gray-500 text-gray-200 text-sm shadow-lg"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Experience */}
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">Experience</h3>
                  {sampleResume.experience.map((exp, i) => (
                    <div key={i} className="mb-6 bg-gray-700 rounded-xl p-4 border border-gray-600">
                      <h4 className="text-lg font-semibold text-white mb-2">{exp.title}</h4>
                      <p className="text-gray-200 text-sm mb-1">{exp.company}</p>
                      <p className="text-gray-200 text-sm mb-2">{exp.duration}</p>
                      <p className="text-gray-300 text-sm">{exp.description}</p>
                    </div>
                  ))}
                </div>

                {/* Education */}
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">Education</h3>
                  <div className="bg-gray-700 rounded-xl p-4 border border-gray-600">
                    <h4 className="text-lg font-semibold text-white mb-2">{sampleResume.education.degree}</h4>
                    <p className="text-gray-200 text-sm mb-1">{sampleResume.education.school}</p>
                    <p className="text-gray-200 text-sm mb-2">{sampleResume.education.duration}</p>
                    <p className="text-gray-300 text-sm">{sampleResume.education.honors}</p>
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