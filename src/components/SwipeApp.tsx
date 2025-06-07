import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { DraggableCardContainer, DraggableCardBody } from "./ui/draggable-card";
import { Heart, X, MapPin, Clock, DollarSign, Users, Building2, Star, Pointer, RotateCcw, User, Briefcase } from "lucide-react";

interface SwipeAppProps {
  onCollapse: () => void;
  userType: 'candidate' | 'employer' | null;
  candidateProfiles?: any[];
  jobListings?: any[];
}

const CARD_WIDTH = 340;
const CARD_HEIGHT = 400;

function getMatchColor(score: number) {
  if (score >= 75) return "bg-green-500";
  if (score >= 40) return "bg-yellow-400";
  return "bg-red-500";
}

function getMatchMessage(score: number) {
  if (score >= 75) return { msg: "You're a great match!", icon: <Star className="inline w-5 h-5 text-yellow-400 mb-1" /> };
  if (score >= 40) return { msg: "You're a possible match.", icon: null };
  return { msg: "Skills needed to be compatible", icon: null };
}

const mockMissingSkills = [
  "GraphQL",
  "Advanced System Design",
  "Cloud Infrastructure",
  "Machine Learning Basics"
];

function getRandomLayout(num: number) {
  const baseAngles = [-10, -5, 0, 5, 10, 15, -15];
  const baseXs = [-80, -40, 0, 40, 80, 120, -120];
  const baseYs = [30, 10, 0, 10, 30, 50, 50];
  return Array.from({ length: num }).map((_, i) => ({
    rotate: baseAngles[i % baseAngles.length] + (Math.random() - 0.5) * 8,
    x: baseXs[i % baseXs.length] + (Math.random() - 0.5) * 30,
    y: baseYs[i % baseYs.length] + (Math.random() - 0.5) * 20,
  }));
}

function getMatchShadowColor(score: number) {
  if (score >= 75) return '34,197,94'; // green-500
  if (score >= 40) return '250,204,21'; // yellow-400
  return '239,68,68'; // red-500
}

export default function SwipeApp({ onCollapse, userType, candidateProfiles = [], jobListings = [] }: SwipeAppProps) {
  // Use the appropriate data based on user type
  const data = userType === 'employer' ? candidateProfiles : jobListings;
  
  const [stack, setStack] = useState(data);
  const [cardLayout, setCardLayout] = useState(() => getRandomLayout(data.length));
  const [expanded, setExpanded] = useState(true);
  const [resetKey, setResetKey] = useState(0);
  const [interested, setInterested] = useState<typeof data>([]);
  const [rejected, setRejected] = useState<typeof data>([]);
  const [showTutorial, setShowTutorial] = useState(true);
  const [selectedItem, setSelectedItem] = useState<typeof data[0] | null>(null);
  const [lastDismissed, setLastDismissed] = useState<{ item: typeof data[0], direction: 'left' | 'right' } | null>(null);
  
  // Create motion values for drag position
  const dragX = useMotionValue(0);
  
  // Transform the drag position into icon animations
  const leftIconScale = useTransform(dragX, [-150, 0], [1.5, 1]);
  const rightIconScale = useTransform(dragX, [0, 150], [1, 1.5]);
  const leftIconOpacity = useTransform(dragX, [-150, 0], [1, 0.3]);
  const rightIconOpacity = useTransform(dragX, [0, 150], [0.3, 1]);

  // Update stack when data changes
  useEffect(() => {
    setStack(data);
    setCardLayout(getRandomLayout(data.length));
    setInterested([]);
    setRejected([]);
    setResetKey(k => k + 1);
  }, [data, userType]);

  const handleDismiss = (idx: number, direction: 'left' | 'right') => {
    const item = stack[idx];
    setLastDismissed({ item, direction });
    if (direction === 'right') setInterested((prev) => [...prev, item]);
    if (direction === 'left') setRejected((prev) => [...prev, item]);
    setStack((prev) => prev.filter((_, i) => i !== idx));
    setCardLayout((prev) => prev.filter((_, i) => i !== idx));
    // Reset drag position
    dragX.set(0);
  };

  const handleRewind = () => {
    if (!lastDismissed) return;
    
    // Remove from the appropriate list
    if (lastDismissed.direction === 'right') {
      setInterested(prev => prev.filter(item => item !== lastDismissed.item));
    } else {
      setRejected(prev => prev.filter(item => item !== lastDismissed.item));
    }
    
    // Add back to the stack
    setStack(prev => [lastDismissed.item, ...prev]);
    setCardLayout(prev => [{ rotate: 0, x: 0, y: 0 }, ...prev]);
    setLastDismissed(null);
  };

  // Reset drag position when stack changes
  useEffect(() => {
    dragX.set(0);
  }, [stack]);

  const handleCollapse = () => {
    setExpanded(false);
    setTimeout(onCollapse, 400);
  };

  const handleReset = () => {
    setStack(data);
    setCardLayout(getRandomLayout(data.length));
    setInterested([]);
    setRejected([]);
    setResetKey((k) => k + 1);
  };

  const renderJobCard = (job: any) => (
    <div
      style={{
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
      }}
      className="bg-white/90 border border-gray-200 rounded-lg shadow-2xl flex flex-col items-center justify-between overflow-hidden relative"
    >
      {/* Match Score Indicator */}
      <motion.div
        className={`absolute top-3 right-3 w-9 h-9 flex items-center justify-center rounded-full text-xs font-bold text-white shadow border-2 border-white ${getMatchColor(job.matchScore || 75)}`}
        title={`Match Score: ${job.matchScore || 75}%`}
        initial={{ scale: 0 }}
        animate={{
          scale: [0, 1.2, 1],
          boxShadow: [
            `0 0 0 0 rgba(${getMatchShadowColor(job.matchScore || 75)},0.5)`,
            `0 0 12px 6px rgba(${getMatchShadowColor(job.matchScore || 75)},0.3)`,
            `0 0 0 0 rgba(${getMatchShadowColor(job.matchScore || 75)},0.0)`
          ]
        }}
        transition={{ duration: 0.7, times: [0, 0.5, 1] }}
      >
        {job.matchScore || 75}%
      </motion.div>
      <div className="flex flex-col items-center justify-center w-full h-full p-6">
        <img src={job.logo} alt={job.company} className="h-14 mb-4" />
        <h3 className="text-xl font-bold mb-2 text-gray-900">{job.title}</h3>
        <div className="text-gray-700 font-semibold mb-1">{job.company}</div>
        <div className="text-gray-500 text-sm mb-3">{job.location}</div>
        <p className="text-gray-700 text-center text-sm mb-4">{job.description}</p>
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <DollarSign className="w-4 h-4" />
            <span>{job.salary}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{job.experience || job.type}</span>
          </div>
        </div>
        <div className="mt-4 text-sm text-gray-500">
          Tap for more details
        </div>
      </div>
    </div>
  );

  const renderCandidateCard = (candidate: any) => (
    <div
      style={{
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
      }}
      className="bg-white/90 border border-gray-200 rounded-lg shadow-2xl flex flex-col items-center justify-between overflow-hidden relative"
    >
      {/* Match Score Indicator */}
      <motion.div
        className={`absolute top-3 right-3 w-9 h-9 flex items-center justify-center rounded-full text-xs font-bold text-white shadow border-2 border-white ${getMatchColor(candidate.matchScore || 85)}`}
        title={`Match Score: ${candidate.matchScore || 85}%`}
        initial={{ scale: 0 }}
        animate={{
          scale: [0, 1.2, 1],
          boxShadow: [
            `0 0 0 0 rgba(${getMatchShadowColor(candidate.matchScore || 85)},0.5)`,
            `0 0 12px 6px rgba(${getMatchShadowColor(candidate.matchScore || 85)},0.3)`,
            `0 0 0 0 rgba(${getMatchShadowColor(candidate.matchScore || 85)},0.0)`
          ]
        }}
        transition={{ duration: 0.7, times: [0, 0.5, 1] }}
      >
        {candidate.matchScore || 85}%
      </motion.div>
      <div className="flex flex-col items-center justify-center w-full h-full p-6">
        <img 
          src={candidate.avatarSrc} 
          alt={candidate.name} 
          className="w-20 h-20 rounded-full border-2 border-gray-300 mb-4 object-cover"
        />
        <h3 className="text-xl font-bold mb-2 text-gray-900">{candidate.name}</h3>
        <div className="text-gray-700 font-semibold mb-1">{candidate.title}</div>
        <div className="text-gray-500 text-sm mb-3">{candidate.location}</div>
        <p className="text-gray-700 text-center text-sm mb-4">{candidate.description}</p>
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {candidate.skills.slice(0, 3).map((skill: string, i: number) => (
            <span
              key={i}
              className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700"
            >
              {skill}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <DollarSign className="w-4 h-4" />
            <span>{candidate.salary}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{candidate.experience}</span>
          </div>
        </div>
        <div className="mt-4 text-sm text-gray-500">
          Tap for full resume
        </div>
      </div>
    </div>
  );

  const renderDetailModal = () => {
    if (!selectedItem) return null;

    if (userType === 'employer') {
      // Candidate detail modal
      const candidate = selectedItem;
      return (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedItem(null)}
        >
          <motion.div
            className="bg-white/90 backdrop-blur-lg rounded-2xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto relative"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={e => e.stopPropagation()}
          >
            {/* Match Score */}
            <motion.div
              className={`absolute right-8 top-8 flex items-center gap-2`}
              initial={{ scale: 0 }}
              animate={{
                scale: [0, 1.2, 1],
                boxShadow: [
                  `0 0 0 0 rgba(${getMatchShadowColor(candidate.matchScore || 85)},0.5)`,
                  `0 0 16px 8px rgba(${getMatchShadowColor(candidate.matchScore || 85)},0.3)`,
                  `0 0 0 0 rgba(${getMatchShadowColor(candidate.matchScore || 85)},0.0)`
                ]
              }}
              transition={{ duration: 0.8, times: [0, 0.5, 1] }}
            >
              <motion.div
                className={`w-12 h-12 flex items-center justify-center rounded-full text-white text-lg font-bold shadow-lg border-4 border-white ${getMatchColor(candidate.matchScore || 85)}`}
              >
                {candidate.matchScore || 85}%
              </motion.div>
            </motion.div>

            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <img 
                  src={candidate.avatarSrc} 
                  alt={candidate.name} 
                  className="w-16 h-16 rounded-full border-2 border-gray-300 object-cover"
                />
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{candidate.name}</h2>
                  <p className="text-gray-600">{candidate.title}</p>
                  <p className="text-gray-500 text-sm">{candidate.location}</p>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {candidate.skills.map((skill: string, i: number) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Experience */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Experience</h3>
              {candidate.resume?.experience?.map((exp: any, i: number) => (
                <div key={i} className="mb-4 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold">{exp.title}</h4>
                  <p className="text-gray-600 text-sm">{exp.company} • {exp.duration}</p>
                  <p className="text-gray-700 text-sm mt-2">{exp.description}</p>
                </div>
              ))}
            </div>

            {/* Education */}
            {candidate.resume?.education && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Education</h3>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold">{candidate.resume.education.degree}</h4>
                  <p className="text-gray-600 text-sm">{candidate.resume.education.school} • {candidate.resume.education.duration}</p>
                  <p className="text-gray-700 text-sm mt-2">{candidate.resume.education.honors}</p>
                </div>
              </div>
            )}

            <div className="mt-8 text-center text-sm text-gray-500">
              Tap anywhere outside to close
            </div>
          </motion.div>
        </motion.div>
      );
    } else {
      // Job detail modal (existing code)
      const job = selectedItem;
      return (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedItem(null)}
        >
          <motion.div
            className="bg-white/90 backdrop-blur-lg rounded-2xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto relative"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={e => e.stopPropagation()}
          >
            {/* Match Score Emphasis */}
            <motion.div
              className={`absolute right-8 top-8 flex items-center gap-2`}
              initial={{ scale: 0 }}
              animate={{
                scale: [0, 1.2, 1],
                boxShadow: [
                  `0 0 0 0 rgba(${getMatchShadowColor(job.matchScore || 75)},0.5)`,
                  `0 0 16px 8px rgba(${getMatchShadowColor(job.matchScore || 75)},0.3)`,
                  `0 0 0 0 rgba(${getMatchShadowColor(job.matchScore || 75)},0.0)`
                ]
              }}
              transition={{ duration: 0.8, times: [0, 0.5, 1] }}
            >
              <motion.div
                className={`w-12 h-12 flex items-center justify-center rounded-full text-white text-lg font-bold shadow-lg border-4 border-white ${getMatchColor(job.matchScore || 75)}`}
              >
                {job.matchScore || 75}%
              </motion.div>
            </motion.div>
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <img src={job.logo} alt={job.company} className="h-12" />
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{job.title}</h2>
                  <p className="text-gray-600">{job.company}</p>
                </div>
              </div>
            </div>

            {/* Match Message */}
            <div className="mb-6 text-center">
              <span className="text-lg font-semibold text-gray-800 flex items-center justify-center gap-2">
                {getMatchMessage(job.matchScore || 75).icon}
                {getMatchMessage(job.matchScore || 75).msg}
              </span>
              {(job.matchScore || 75) < 40 && (
                <ul className="mt-2 text-sm text-red-600 list-disc list-inside">
                  {mockMissingSkills.map((skill, i) => (
                    <li key={i}>{skill}</li>
                  ))}
                </ul>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center gap-2 text-gray-700">
                <MapPin className="w-5 h-5" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <DollarSign className="w-5 h-5" />
                <span>{job.salary}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <Clock className="w-5 h-5" />
                <span>{job.experience || job.type}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <Users className="w-5 h-5" />
                <span>{job.teamSize || "Team Size: 10-15"}</span>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Description</h3>
                <p className="text-gray-700">{job.description}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Requirements</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  {job.requirements?.map((req: string, i: number) => (
                    <li key={i}>{req}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {(job.techStack || ["React", "TypeScript", "Node.js"]).map((tech: string, i: number) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Benefits</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  {job.benefits?.map((benefit: string, i: number) => (
                    <li key={i}>{benefit}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 text-center text-sm text-gray-500">
              Tap anywhere outside to close
            </div>
          </motion.div>
        </motion.div>
      );
    }
  };

  return (
    <AnimatePresence>
      {expanded && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-lg"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.4 }}
        >
          {/* Tutorial Overlay */}
          <AnimatePresence>
            {showTutorial && (
              <motion.div
                className="absolute inset-0 z-50 flex items-center justify-center bg-black/80"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  className="text-center text-white p-8 max-w-lg"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <h3 className="text-3xl font-bold mb-6">
                    {userType === 'employer' ? 'How to Review Candidates' : 'How to Use Swipe'}
                  </h3>
                  
                  <div className="space-y-8">
                    {/* Swipe Actions */}
                    <div className="flex justify-center gap-8 mb-6">
                      <motion.div
                        className="flex flex-col items-center"
                        animate={{ x: [-20, 20, -20] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                      >
                        <X className="w-12 h-12 text-red-500 mb-2" />
                        <span>{userType === 'employer' ? 'Pass' : 'Skip'}</span>
                      </motion.div>
                      <motion.div
                        className="flex flex-col items-center"
                        animate={{ x: [20, -20, 20] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                      >
                        <Heart className="w-12 h-12 text-green-500 mb-2" />
                        <span>{userType === 'employer' ? 'Interested' : 'Like'}</span>
                      </motion.div>
                    </div>

                    {/* Match Score */}
                    <div className="flex items-center justify-center gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-12 h-12 rounded-full bg-green-500 mb-2" />
                        <span className="text-sm">Great Match</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-12 h-12 rounded-full bg-yellow-400 mb-2" />
                        <span className="text-sm">Possible Match</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-12 h-12 rounded-full bg-red-500 mb-2" />
                        <span className="text-sm">Skills Needed</span>
                      </div>
                    </div>

                    {/* Tap for Details */}
                    <div className="flex flex-col items-center">
                      <motion.div
                        className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-2"
                        animate={{ 
                          scale: [1, 1.1, 1],
                          rotate: [0, 5, 0, -5, 0]
                        }}
                        transition={{ 
                          repeat: Infinity, 
                          duration: 2,
                          times: [0, 0.2, 0.4, 0.6, 1]
                        }}
                      >
                        <Pointer className="w-8 h-8 text-white" />
                      </motion.div>
                      <span>
                        {userType === 'employer' 
                          ? 'Tap any card to see full resume' 
                          : 'Tap any card to see full details'
                        }
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => setShowTutorial(false)}
                    className="mt-8 px-8 py-3 bg-white/20 rounded-xl hover:bg-white/30 transition text-lg font-semibold"
                  >
                    Got it!
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Detail Modal */}
          <AnimatePresence>
            {renderDetailModal()}
          </AnimatePresence>

          <div className="absolute top-8 right-8 flex gap-2">
            {lastDismissed && (
              <motion.button
                onClick={handleRewind}
                className="px-4 py-2 rounded-xl bg-white/20 text-white font-semibold shadow hover:bg-white/30 transition flex items-center gap-2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <RotateCcw className="w-5 h-5" />
                Rewind
              </motion.button>
            )}
            <button
              onClick={handleReset}
              className="px-4 py-2 rounded-xl bg-white/20 text-white font-semibold shadow hover:bg-white/30 transition"
            >
              Reset
            </button>
            <button
              onClick={handleCollapse}
              className="px-4 py-2 rounded-xl bg-white/20 text-white font-semibold shadow hover:bg-white/30 transition"
            >
              Back to Menu
            </button>
          </div>
          <div className="w-full max-w-md mx-auto flex flex-col items-center justify-center">
            {/* Animated Swipe Direction Indicators */}
            <motion.div
              className="absolute left-0 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <motion.div
                className="text-red-500"
                style={{
                  scale: leftIconScale,
                  opacity: leftIconOpacity,
                }}
              >
                <X className="w-12 h-12" />
              </motion.div>
              <motion.span
                className="text-sm font-medium text-white"
                style={{ opacity: leftIconOpacity }}
              >
                {userType === 'employer' ? 'Pass' : 'Not Interested'}
              </motion.span>
            </motion.div>

            <motion.div
              className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <motion.div
                className="text-green-500"
                style={{
                  scale: rightIconScale,
                  opacity: rightIconOpacity,
                }}
              >
                <Heart className="w-12 h-12" />
              </motion.div>
              <motion.span
                className="text-sm font-medium text-white"
                style={{ opacity: rightIconOpacity }}
              >
                {userType === 'employer' ? 'Interested' : 'Interested'}
              </motion.span>
            </motion.div>

            {stack.length > 0 ? (
              <DraggableCardContainer key={resetKey} className="relative w-[340px] h-[400px]">
                <AnimatePresence>
                  {[...stack].reverse().map((item, index) => {
                    const layout = index === stack.length - 1
                      ? { rotate: 0, x: 0, y: 0 }
                      : cardLayout[index] || { rotate: 0, x: 0, y: 0 };
                    const realIdx = stack.length - 1 - index;
                    return (
                      <DraggableCardBody
                        key={(item.company || item.name) + index}
                        className="absolute left-1/2 top-1/2"
                        onDismiss={(direction) => handleDismiss(realIdx, direction)}
                        onDrag={(x) => dragX.set(x)}
                        onTap={() => setSelectedItem(item)}
                      >
                        <div
                          style={{
                            width: CARD_WIDTH,
                            height: CARD_HEIGHT,
                            transform: `translate(-50%, -50%) translate(${layout.x}px, ${layout.y}px) rotate(${layout.rotate}deg)`
                          }}
                        >
                          {userType === 'employer' ? renderCandidateCard(item) : renderJobCard(item)}
                        </div>
                      </DraggableCardBody>
                    );
                  })}
                </AnimatePresence>
              </DraggableCardContainer>
            ) : (
              <motion.div
                className="bg-white/90 rounded-2xl shadow-xl p-10 flex flex-col items-center"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 40 }}
                transition={{ duration: 0.4 }}
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {userType === 'employer' ? 'No more candidates' : 'No more matches'}
                </h2>
                <p className="text-gray-600">Check back later for new opportunities!</p>
                <button
                  onClick={handleCollapse}
                  className="mt-6 px-6 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold shadow hover:from-pink-600 hover:to-purple-600 transition"
                >
                  Back to Menu
                </button>
                <div className="mt-6 text-center">
                  <div className="text-green-600 font-semibold">Interested: {interested.length}</div>
                  <div className="text-red-600 font-semibold">
                    {userType === 'employer' ? 'Passed: ' : 'Rejected: '}{rejected.length}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}