import { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Mic, Activity, Clock, Radio, Moon } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const ActivityFeed = () => {
  const [activities, setActivities] = useState([]);

  const fetchActivities = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/activities`);
      setActivities(res.data);
    } catch (error) {
      console.error("Error fetching activities:", error);
    }
  };

  useEffect(() => {
    fetchActivities();
    const interval = setInterval(fetchActivities, 5000);
    return () => clearInterval(interval);
  }, []);

  const getIcon = (type) => {
    const iconProps = "w-4 h-4";
    switch (type) {
      case "MESSAGE":
        return <MessageSquare className={`${iconProps} text-blue-500`} />;
      case "VOICE":
        return <Mic className={`${iconProps} text-[#6366F1]`} />;
      case "STATUS":
        return <Activity className={`${iconProps} text-purple-500`} />;
      default:
        return <Clock className={`${iconProps} text-[#94A3B8]`} />;
    }
  };

  const getGlow = (type) => {
    switch (type) {
      case "MESSAGE":
        return "rgba(59, 130, 246, 0.15)";
      case "VOICE":
        return "rgba(99, 102, 241, 0.15)";
      case "STATUS":
        return "rgba(168, 85, 247, 0.15)";
      default:
        return "rgba(148, 163, 184, 0.1)";
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
  };

  // Sleeping Cat SVG Component
  const SleepingCat = () => (
    <motion.div
      className="animate-sleep"
      initial={false}
      animate={{ opacity: 1, scale: 1 }}
    >
      <svg
        viewBox="0 0 100 60"
        className="w-24 h-16 sm:w-32 sm:h-20"
        fill="none"
      >
        {/* Cat Body */}
        <ellipse cx="50" cy="45" rx="30" ry="15" fill="#CBD5E1" />

        {/* Cat Head */}
        <circle cx="25" cy="35" r="18" fill="#94A3B8" />

        {/* Ears */}
        <polygon points="12,22 8,8 22,18" fill="#94A3B8" />
        <polygon points="38,22 42,8 28,18" fill="#94A3B8" />
        <polygon points="14,20 11,10 20,17" fill="#CBD5E1" />
        <polygon points="36,20 39,10 30,17" fill="#CBD5E1" />

        {/* Closed Eyes */}
        <path
          d="M17 35 Q22 32 27 35"
          stroke="#6366F1"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M23 35 Q28 32 33 35"
          stroke="#6366F1"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />

        {/* Nose */}
        <circle cx="25" cy="40" r="2" fill="#6366F1" />

        {/* Tail */}
        <path
          d="M75 45 Q90 30 85 50"
          stroke="#94A3B8"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
        />

        {/* Z's for sleeping */}
        <motion.text
          x="42"
          y="15"
          fill="#6366F1"
          fontSize="8"
          fontWeight="bold"
          animate={{ opacity: [0.3, 1, 0.3], y: [15, 12, 15] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          z
        </motion.text>
        <motion.text
          x="52"
          y="10"
          fill="#6366F1"
          fontSize="10"
          fontWeight="bold"
          animate={{ opacity: [0.3, 1, 0.3], y: [10, 7, 10] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
        >
          Z
        </motion.text>
        <motion.text
          x="64"
          y="5"
          fill="#6366F1"
          fontSize="12"
          fontWeight="bold"
          animate={{ opacity: [0.3, 1, 0.3], y: [5, 2, 5] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
        >
          Z
        </motion.text>
      </svg>
    </motion.div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.9, duration: 0.6 }}
      className="w-full max-w-2xl mx-auto"
    >
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1 }}
        className="flex items-center gap-2 mb-4"
      >
        {activities.length > 0 ? (
          <>
            <Radio className="w-4 h-4 text-[#6366F1]" />
            <h2 className="text-sm font-semibold text-[#94A3B8] uppercase tracking-wider">
              Live Activity
            </h2>
            <span className="relative flex h-2 w-2 ml-1">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#6366F1] opacity-75"></span>
              <span
                className="relative inline-flex rounded-full h-2 w-2 bg-[#6366F1]"
                style={{ boxShadow: "0 0 8px rgba(99, 102, 241, 0.6)" }}
              ></span>
            </span>
          </>
        ) : (
          <>
            <Moon className="w-4 h-4 text-[#94A3B8]" />
            <h2 className="text-sm font-semibold text-[#94A3B8] uppercase tracking-wider">
              Status
            </h2>
          </>
        )}
      </motion.div>

      {/* Activity Card */}
      <div className="glass-card rounded-2xl p-4 sm:p-5 md:p-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-3 max-h-64 overflow-y-auto pr-2"
        >
          <AnimatePresence mode="popLayout">
            {activities.length === 0 ? (
              /* Sleeping Mode */
              <motion.div
                variants={itemVariants}
                className="flex flex-col items-center justify-center py-6 sm:py-8"
              >
                <SleepingCat />

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="mt-4 text-[#0F172A] text-sm sm:text-base font-medium"
                >
                  Dien is currently resting...
                </motion.p>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mt-1 text-[#94A3B8] text-xs"
                >
                  Check back later for updates
                </motion.p>
              </motion.div>
            ) : (
              activities.map((log) => (
                <motion.div
                  key={log.id}
                  variants={itemVariants}
                  layout
                  whileHover={{ scale: 1.02 }}
                  className="relative overflow-hidden flex items-start gap-3 p-3 rounded-xl bg-white/50 border border-[#E2E8F0] hover:border-[#6366F1]/30 transition-all cursor-default group"
                  style={{
                    boxShadow: `0 0 0 rgba(0,0,0,0), inset 0 0 30px ${getGlow(log.type)}`,
                  }}
                >
                  {/* Icon */}
                  <div className="mt-0.5 p-2 rounded-lg bg-[#F1F5F9] group-hover:bg-[#6366F1]/10 transition-colors">
                    {getIcon(log.type)}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-[#0F172A] leading-relaxed">
                      {log.description}
                    </p>
                    <span className="text-xs text-[#94A3B8] mt-1 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date(log.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </motion.div>

        {/* Footer */}
        {activities.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-4 pt-3 border-t border-[#E2E8F0] text-center"
          >
            <p className="text-xs text-[#94A3B8]">
              Showing {activities.length} recent activities • Updates every 5s
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default ActivityFeed;
