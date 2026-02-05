import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const ProfileCard = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [avatarError, setAvatarError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/user-info`);
        setUserInfo(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch Discord user info:", error);
        setIsLoading(false);
      }
    };

    // Fetch immediately on mount
    fetchUserInfo();

    // Refresh every 5 seconds for real-time updates
    const interval = setInterval(fetchUserInfo, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleAvatarError = () => {
    console.log("Avatar failed to load, using fallback");
    setAvatarError(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "online":
        return "#22C55E";
      case "idle":
        return "#F59E0B";
      case "dnd":
        return "#EF4444";
      case "offline":
        return "#94A3B8";
      default:
        return "#94A3B8";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "online":
        return "Trực tuyến";
      case "idle":
        return "Vắng mặt";
      case "dnd":
        return "Đừng làm phiền";
      case "offline":
        return "Ngoại tuyến";
      default:
        return "Không rõ";
    }
  };

  // Get app activity (VS Code, Games) instead of Custom Status
  const activity =
    userInfo?.activities?.find((a) => a.type === 0) ||
    userInfo?.activities?.[0] ||
    null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative"
    >
      {/* Avatar Container - Ready for real image */}
      <div className="relative w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 mx-auto">
        {/* Glow Ring */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#6366F1] via-[#818CF8] to-[#A5B4FC] blur-xl opacity-30 animate-pulse-glow scale-110" />

        {/* Avatar Border */}
        <div className="absolute inset-0 rounded-full p-[3px] bg-gradient-to-br from-[#6366F1] to-[#818CF8]">
          <div className="w-full h-full rounded-full bg-white overflow-hidden">
            {/* Discord Avatar with smart fallback */}
            {userInfo?.avatar && !avatarError ? (
              <img
                src={userInfo.avatar}
                alt={userInfo?.displayName || "Dien"}
                className="w-full h-full object-cover"
                onError={handleAvatarError}
              />
            ) : (
              /* Beautiful gradient placeholder */
              <div className="w-full h-full bg-gradient-to-br from-[#6366F1] to-[#818CF8] flex items-center justify-center">
                <div className="text-4xl sm:text-5xl md:text-6xl font-black text-white">
                  {(userInfo?.displayName || "D").charAt(0).toUpperCase()}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Name & Bio */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mt-8 text-center"
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black gradient-text tracking-tight">
          {userInfo?.displayName || "Dien"}
        </h1>

        {/* Role with typing effect feel */}
        <p className="mt-2 text-[#94A3B8] text-lg font-medium">
          Full-stack Developer
        </p>

        {/* Discord Status Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-full bg-white/50 border border-[#E2E8F0] backdrop-blur-sm"
        >
          <span className="relative flex h-2 w-2">
            <span
              className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
              style={{ backgroundColor: getStatusColor(userInfo?.status) }}
            ></span>
            <span
              className="relative inline-flex rounded-full h-2 w-2"
              style={{ backgroundColor: getStatusColor(userInfo?.status) }}
            ></span>
          </span>
          <span className="text-sm font-medium text-[#0F172A]">
            {getStatusText(userInfo?.status)}
          </span>
        </motion.div>

        {/* Current Activity - Force display for debug */}
        {(activity || userInfo?.activities?.length > 0) && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-3 px-4 py-3 rounded-xl bg-[#6366F1]/10 border border-[#6366F1]/20 max-w-sm mx-auto"
          >
            <div className="flex items-center gap-3">
              {activity?.assets?.largeImage ? (
                <img
                  src={activity.assets.largeImage}
                  alt={activity.name}
                  className="w-10 h-10 rounded-md"
                />
              ) : (
                <div className="w-10 h-10 rounded-md bg-[#6366F1]/20 flex items-center justify-center">
                  <span className="text-[#6366F1] text-sm">
                    {activity?.name === "Visual Studio Code" ? "💻" : "🎮"}
                  </span>
                </div>
              )}
              <div className="flex-1 min-w-0 text-left">
                <p className="text-sm font-semibold text-[#0F172A] truncate">
                  {activity?.name || "Activity"}
                </p>
                {activity?.details && (
                  <p className="text-xs text-[#64748B] truncate">
                    {activity.details}
                  </p>
                )}
                {activity?.state && (
                  <p className="text-xs text-[#94A3B8] truncate">
                    {activity.state}
                  </p>
                )}
                {/* Add timestamp for VS Code */}
                {activity?.timestamps?.start && (
                  <p className="text-xs text-[#94A3B8] mt-1">
                    {(() => {
                      const start = new Date(activity.timestamps.start);
                      const now = new Date();
                      const diffSeconds = Math.floor((now - start) / 1000);
                      const hours = Math.floor(diffSeconds / 3600);
                      const mins = Math.floor((diffSeconds % 3600) / 60);
                      const secs = diffSeconds % 60;
                      return `${hours.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
                    })()}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* Bio with personality */}
        <p className="mt-5 text-[#64748B] text-sm sm:text-base max-w-md mx-auto leading-relaxed">
          Crafting Discord bots by day ☕, exploring game dev by night 🎮. When
          not coding, probably listening to lo-fi or breaking something in
          production.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default ProfileCard;
