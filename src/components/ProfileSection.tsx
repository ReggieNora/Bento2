import React from 'react';
import ProfileCardGlass from './ProfileCardGlass';

// Example candidate data (replace with real data as needed)
const exampleCandidate = {
  name: 'Jane Doe',
  title: 'Senior Frontend Developer',
  skills: ['React', 'TypeScript', 'Tailwind CSS', 'UI/UX'],
  description: 'Passionate frontend developer with a knack for building delightful user interfaces and scalable web apps.',
  resume: {
    experience: [
      {
        title: 'Senior Frontend Developer',
        company: 'Google',
        duration: '2020 - Present',
        description: 'Led development of core UI features, mentored junior devs, and improved app performance by 40%.'
      },
      {
        title: 'Frontend Developer',
        company: 'Facebook',
        duration: '2018 - 2020',
        description: 'Built and maintained React components, implemented new features, and collaborated with design team.'
      }
    ],
    education: {
      degree: 'B.S. Computer Science',
      school: 'Stanford University',
      duration: '2014 - 2018',
      honors: 'Graduated with honors. Focus on Software Engineering and AI.'
    }
  }
};

export default function ProfileSection({ candidate = exampleCandidate, onBack = () => window.history.back() }) {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-purple-900 to-black">
      <ProfileCardGlass candidate={candidate} />
    </div>
  );
}
