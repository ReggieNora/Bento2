import React, { useState, useEffect } from 'react';
import { MapPin, Clock, DollarSign, ChevronRight, Users, Globe, Award, Heart } from 'lucide-react';

interface JobCardProps {
  job: {
    company?: string;
    title?: string;
    location?: string;
    type?: string;
    salary?: string;
    posted?: string;
    logo?: string;
    requirements?: string[];
    description?: string;
    benefits?: string[];
    avatarSrc?: string; // for candidate
    name?: string; // for candidate
    skills?: string[];
    experience?: string;
  };
  justCollapsed?: boolean;
  isCandidate?: boolean;
  forceCollapse?: boolean;
  setIsExpandedState?: (expanded: boolean) => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, justCollapsed = false, isCandidate = false, forceCollapse = false, setIsExpandedState }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [cooldown, setCooldown] = useState(false);

  // Notify parent of expanded state changes
  useEffect(() => {
    if (setIsExpandedState) setIsExpandedState(isExpanded);
  }, [isExpanded, setIsExpandedState]);

  // Collapse card if user clicks/taps outside when expanded
  React.useEffect(() => {
    if (!isExpanded) return;
    function handleOutside(e: MouseEvent | TouchEvent) {
      // Only collapse if click is outside this card
      if (!(e.target instanceof Node)) return;
      const card = document.getElementById(`job-card-root-${job.title || job.name}`);
      if (card && !card.contains(e.target)) {
        setIsExpanded(false);
      }
    }
    document.addEventListener('mousedown', handleOutside as EventListener);
    document.addEventListener('touchstart', handleOutside as EventListener);
    return () => {
      document.removeEventListener('mousedown', handleOutside as EventListener);
      document.removeEventListener('touchstart', handleOutside as EventListener);
    };
  }, [isExpanded, job.title, job.name]);

  useEffect(() => {
    if (justCollapsed) {
      setCooldown(true);
      setTimeout(() => setCooldown(false), 300);
    }
  }, [justCollapsed]);

  // Collapse immediately when forceCollapse is true
  useEffect(() => {
    if (forceCollapse) setIsExpanded(false);
  }, [forceCollapse]);

  // Prevent expansion if justCollapsed is true or cooldown is active
  const handleExpand = () => {
    if (justCollapsed || cooldown) return;
    setIsExpanded((prev) => !prev);
  };

  // For candidate rendering, adjust fields
  const displayName = isCandidate ? job.name : job.company;
  const displayTitle = isCandidate ? job.title : job.title;
  const displayAvatar = isCandidate ? job.avatarSrc : job.logo;
  const displayLocation = isCandidate ? job.location : job.location;
  const displayType = isCandidate ? job.experience : job.type;
  const displaySalary = job.salary;
  const displayPosted = job.posted;

  return (
    <div 
      id={`job-card-root-${job.title || job.name}`}
      className={`
        relative w-[350px] rounded-2xl overflow-hidden
        bg-white/10 backdrop-blur-md border border-white/20
        shadow-xl shadow-black/20
        transition-all duration-300 ease-in-out
        ${isExpanded ? 'h-[600px]' : 'h-[480px]'}
      `}
    >
      {/* Company Logo */}
      <div className="absolute top-6 left-6 w-16 h-16 rounded-xl bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center overflow-hidden">
        <img 
          src={displayAvatar} 
          alt={`${displayName} logo`}
          className="w-full h-full object-contain p-2"
        />
      </div>

      {/* Match Indicator */}
      <div className="absolute top-6 right-6 flex flex-col items-end">
        {/* Dummy match value for now: 82% Good Match */}
        {/* In real use, replace matchValue and matchLabel with actual logic */}
        {(() => {
          const matchValue = 82; // Example: 82% match
          let matchColor = 'bg-green-500';
          let matchLabel = 'Good Match';
          if (matchValue < 60) {
            matchColor = 'bg-red-500';
            matchLabel = 'Bad Match';
          } else if (matchValue < 80) {
            matchColor = 'bg-yellow-400';
            matchLabel = 'Okay Match';
          }
          return (
            <div className="flex flex-col items-end">
              <div className={`w-8 h-8 rounded-full ${matchColor} flex items-center justify-center text-white font-bold text-sm mb-1`}>
                {matchValue}%
              </div>
              <span className="text-xs font-semibold text-white/80">{matchLabel}</span>
            </div>
          );
        })()}
      </div>

      {/* Main Content */}
      <div className={`
        absolute top-32 left-0 right-0 p-6
        transition-all duration-300 ease-in-out
        ${isExpanded ? 'opacity-0 translate-y-[-20px]' : 'opacity-100 translate-y-0'}
      `}>
        <h2 className="text-2xl font-bold text-white mb-2">{displayTitle}</h2>
        <h3 className="text-xl text-white/80 mb-4">{displayName}</h3>

        <div className="space-y-3">
          <div className="flex items-center text-white/60">
            <MapPin className="w-4 h-4 mr-2" />
            <span>{displayLocation}</span>
          </div>
          <div className="flex items-center text-white/60">
            <Clock className="w-4 h-4 mr-2" />
            <span>{displayType}</span>
          </div>
          <div className="flex items-center text-white/60">
            <DollarSign className="w-4 h-4 mr-2" />
            <span>{displaySalary}</span>
          </div>
        </div>
      </div>

      {/* Show More Button */}
      <div className="absolute bottom-6 left-0 right-0 px-6 z-10">
        <button 
          onClick={handleExpand}
          className="w-full py-2 px-4 bg-white/10 hover:bg-white/20 
                   text-white/80 hover:text-white rounded-xl
                   transition-all duration-200 flex items-center justify-center"
        >
          {isExpanded ? 'Show Less' : 'Show More'}
          <ChevronRight className={`w-4 h-4 ml-2 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
        </button>
      </div>

      {/* Expanded Content */}
      <div className={`
        absolute top-0 left-0 right-0 p-6
        transition-all duration-300 ease-in-out
        ${isExpanded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[20px] pointer-events-none'}
      `}>
        <div className="mt-32 h-[calc(600px-8rem)] overflow-y-auto scrollbar-hide">
          <h2 className="text-2xl font-bold text-white mb-2">{job.title}</h2>
          <h3 className="text-xl text-white/80 mb-4">{job.company}</h3>

          <div className="space-y-3 mb-6">
            <div className="flex items-center text-white/60">
              <MapPin className="w-4 h-4 mr-2" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center text-white/60">
              <Clock className="w-4 h-4 mr-2" />
              <span>{job.type}</span>
            </div>
            <div className="flex items-center text-white/60">
              <DollarSign className="w-4 h-4 mr-2" />
              <span>{job.salary}</span>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="text-white/80 font-medium mb-2">Requirements</h4>
            <ul className="text-white/60 text-sm space-y-1">
              {(job.requirements || []).map((req, index) => (
                <li key={index}>• {req}</li>
              ))}
            </ul>
          </div>

          <div className="mb-4">
            <h4 className="text-white/80 font-medium mb-2">About the Role</h4>
            <p className="text-white/60 text-sm">
              {job.description}
            </p>
          </div>

          <div className="mb-4">
            <h4 className="text-white/80 font-medium mb-2">Benefits</h4>
            <ul className="text-white/60 text-sm space-y-1">
              {(job.benefits || []).map((benefit, index) => (
                <li key={index}>• {benefit}</li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex items-center text-white/60">
              <Users className="w-4 h-4 mr-2" />
              <span className="text-sm">Team Size: 10-15</span>
            </div>
            <div className="flex items-center text-white/60">
              <Globe className="w-4 h-4 mr-2" />
              <span className="text-sm">Remote Friendly</span>
            </div>
            <div className="flex items-center text-white/60">
              <Award className="w-4 h-4 mr-2" />
              <span className="text-sm">Career Growth</span>
            </div>
            <div className="flex items-center text-white/60">
              <Heart className="w-4 h-4 mr-2" />
              <span className="text-sm">Great Culture</span>
            </div>
          </div>

          <div className="text-white/60 text-sm mb-6">
            <p>• Flexible working hours</p>
            <p>• Regular team events</p>
            <p>• Learning & development budget</p>
            <p>• Health & wellness programs</p>
          </div>

          {/* Extra padding at bottom for better scrolling */}
          <div className="h-24"></div>
        </div>
      </div>
    </div>
  );
};

export default JobCard; 