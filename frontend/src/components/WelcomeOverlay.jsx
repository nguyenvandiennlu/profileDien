import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const WelcomeOverlay = ({ onEnter }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [avatarError, setAvatarError] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/user-info`);
        setUserInfo(response.data);
      } catch (error) {
        console.error("Failed to fetch Discord user info for overlay:", error);
      }
    };

    fetchUserInfo();
  }, []);

  const handleAvatarError = () => {
    setAvatarError(true);
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 0.9,
        filter: "blur(10px)",
      }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="fixed inset-0 z-[200] flex items-center justify-center cursor-pointer"
      onClick={onEnter}
      style={{
        background: "rgba(248, 250, 252, 0.85)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
      }}
    >
      {/* Subtle Gradient Overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, rgba(99, 102, 241, 0.1) 0%, transparent 70%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        {/* Discord Avatar */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", duration: 0.8, delay: 0.2 }}
          className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-6 rounded-full p-1 bg-gradient-to-br from-[#6366F1] to-[#4F46E5] shadow-lg"
          style={{ boxShadow: "0 0 60px rgba(99, 102, 241, 0.4)" }}
        >
          <div className="w-full h-full rounded-full bg-white overflow-hidden">
            {userInfo?.avatar && !avatarError ? (
              <img
                src={userInfo.avatar}
                alt={userInfo?.displayName || "Dien"}
                className="w-full h-full object-cover"
                onError={handleAvatarError}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-[#6366F1] to-[#4F46E5] flex items-center justify-center">
                <span className="text-3xl sm:text-4xl font-black text-white">
                  {(userInfo?.displayName || "D").charAt(0).toUpperCase()}
                </span>
              </div>
            )}
          </div>
        </motion.div>

        {/* Welcome Text */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0F172A] mb-3"
        >
          Welcome
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-[#64748B] text-lg mb-8"
        >
          {userInfo?.displayName || "Dien"}'s Portfolio
        </motion.p>

        {/* Click to Enter Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#6366F1] to-[#4F46E5] text-white font-semibold shadow-lg"
          style={{ boxShadow: "0 0 40px rgba(99, 102, 241, 0.4)" }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span>Click to Enter</span>
          <motion.span
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            →
          </motion.span>
        </motion.div>

        {/* Hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-6 text-sm text-[#94A3B8]"
        >
          🎵 Music will start playing
        </motion.p>
      </div>
    </motion.div>
  );
};

export default WelcomeOverlay;
