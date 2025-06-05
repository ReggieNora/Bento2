import React from "react";
import { BentoGrid, BentoGridItem } from "./ui/BentoGrid";
import {
  IconUser,
  IconBriefcase,
  IconMessage,
  IconSettings,
  IconRobotFace,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import SwipeApp from "./SwipeApp";
import MessagesOverlay from "./MessagesOverlay";
import ProfileCard from "./ProfileCard";

const SkeletonSwipe = () => (
  <motion.div className="relative flex flex-1 w-full h-full min-h-[6rem] bg-dot-black/[0.2] dark:bg-dot-white/[0.2] flex-col space-y-2 justify-center items-center">
    <div className="relative flex-1 flex items-center justify-center">
      <img 
        src="/src/assets/Screenshot_2025-06-06_011848-removebg-preview (1).png" 
        alt="Swipe Cards" 
        className="w-32 h-32 opacity-80"
      />
    </div>
    <motion.div className="w-2/3 h-4 rounded-full bg-gray-100 dark:bg-neutral-900" />
  </motion.div>
);

const SkeletonMessages = () => (
  <motion.div className="relative flex flex-1 w-full h-full min-h-[6rem] bg-dot-black/[0.2] dark:bg-dot-white/[0.2] flex-col space-y-2 justify-center items-center">
    <div className="relative flex-1 flex items-center justify-center">
      <img 
        src="/src/assets/Screenshot_2025-06-06_011836-removebg-preview (2).png" 
        alt="Messages" 
        className="w-32 h-32 opacity-80"
      />
      <span className="absolute top-0 right-0 w-6 h-6 bg-red-500 rounded-full text-white text-sm flex items-center justify-center font-bold animate-pulse shadow-lg border border-white/20">
        1
      </span>
    </div>
    <motion.div className="w-1/2 h-4 rounded-full bg-gray-100 dark:bg-neutral-900" />
  </motion.div>
);

const SkeletonProfile = () => (
  <motion.div className="relative flex flex-1 w-full h-full min-h-[6rem] bg-dot-black/[0.2] dark:bg-dot-white/[0.2] flex-col space-y-2 justify-center items-center">
    <div className="relative flex-1 flex items-center justify-center">
      <img 
        src="/src/assets/Screenshot 2025-06-06 011801.png" 
        alt="Profile" 
        className="w-32 h-32 opacity-80"
      />
    </div>
    <motion.div className="w-1/2 h-4 rounded-full bg-gray-100 dark:bg-neutral-900" />
  </motion.div>
);

const SkeletonSettings = () => (
  <motion.div className="flex flex-1 w-full h-full min-h-[6rem] bg-dot-black/[0.2] dark:bg-dot-white/[0.2] flex-col space-y-2 justify-center items-center">
    <motion.div className="h-8 w-8 rounded-full bg-gradient-to-r from-gray-400 to-zinc-500 mb-2" />
    <motion.div className="w-1/3 h-4 rounded-full bg-gray-100 dark:bg-neutral-900" />
  </motion.div>
);

const SkeletonCoach = () => (
  <motion.div className="flex flex-1 w-full h-full min-h-[6rem] bg-dot-black/[0.2] dark:bg-dot-white/[0.2] flex-col space-y-2 justify-center items-center">
    <motion.div className="h-10 w-10 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 mb-2" />
    <motion.div className="w-2/3 h-4 rounded-full bg-gray-100 dark:bg-neutral-900" />
  </motion.div>
);

const items = [
  {
    title: "Swipe",
    description: <span className="text-sm">Find matches. Candidates see jobs, Employers see candidates.</span>,
    header: <SkeletonSwipe />,
    className: "md:col-span-1",
    icon: <IconBriefcase className="h-5 w-5 text-neutral-500" />,
  },
  {
    title: "Messages",
    description: <span className="text-sm">Chat with matches and connections.</span>,
    header: <SkeletonMessages />,
    className: "md:col-span-1",
    icon: <IconMessage className="h-5 w-5 text-neutral-500" />,
  },
  {
    title: "Profile",
    description: <span className="text-sm">View and edit your profile information.</span>,
    header: <SkeletonProfile />,
    className: "md:col-span-1",
    icon: <IconUser className="h-5 w-5 text-neutral-500" />,
  },
  {
    title: "Settings",
    description: <span className="text-sm">Customize your app experience.</span>,
    header: <SkeletonSettings />,
    className: "md:col-span-1",
    icon: <IconSettings className="h-5 w-5 text-neutral-500" />,
  },
  {
    title: "AI Interview Coach",
    description: <span className="text-sm">Practice interviews with AI-powered feedback.</span>,
    header: <SkeletonCoach />,
    className: "md:col-span-2",
    icon: <IconRobotFace className="h-5 w-5 text-neutral-500" />,
  },
];

export default function BentoMainMenu() {
  const [swipeOpen, setSwipeOpen] = React.useState(false);
  const [messagesOpen, setMessagesOpen] = React.useState(false);
  const [profileOpen, setProfileOpen] = React.useState(false);

  if (swipeOpen) {
    return <SwipeApp onCollapse={() => setSwipeOpen(false)} />;
  }

  if (messagesOpen) {
    return <MessagesOverlay onCollapse={() => setMessagesOpen(false)} />;
  }

  if (profileOpen) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <ProfileCard
          name="Alex Johnson"
          title="Senior Frontend Developer"
          skills={["React", "TypeScript", "Node.js", "AWS"]}
          description="Passionate software engineer with 8+ years of experience building scalable web applications. Expert in React ecosystem and modern JavaScript development."
          onBack={() => setProfileOpen(false)}
        />
      </div>
    );
  }

  return (
    <BentoGrid className="max-w-4xl mx-auto md:auto-rows-[20rem]">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          className={item.className}
          icon={item.icon}
          onClick={() => {
            if (item.title === "Swipe") setSwipeOpen(true);
            if (item.title === "Messages") setMessagesOpen(true);
            if (item.title === "Profile") setProfileOpen(true);
          }}
          style={{ cursor: item.title === "Swipe" || item.title === "Messages" || item.title === "Profile" ? "pointer" : "default" }}
        />
      ))}
    </BentoGrid>
  );
}