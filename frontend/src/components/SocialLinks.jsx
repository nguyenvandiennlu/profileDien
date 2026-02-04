import { motion } from "framer-motion";
import { FaDiscord, FaGithub, FaSpotify, FaSteam } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";

const socialLinks = [
  {
    name: "Discord",
    icon: FaDiscord,
    href: "https://discord.com/users/528706453427716096",
    color: "from-[#5865F2] to-[#7289DA]",
    glowColor: "rgba(88, 101, 242, 0.5)",
  },
  {
    name: "GitHub",
    icon: FaGithub,
    href: "https://github.com/nguyenvandiennlu",
    color: "from-[#333333] to-[#24292e]",
    glowColor: "rgba(36, 41, 46, 0.5)",
  },
  {
    name: "Spotify",
    icon: FaSpotify,
    href: "https://open.spotify.com/user/31ufv7hzmiyi4qlyf5okdwkjdhfm?si=be7b7c74805442c9",
    color: "from-[#1DB954] to-[#1ed760]",
    glowColor: "rgba(29, 185, 84, 0.5)",
  },
  {
    name: "Steam",
    icon: FaSteam,
    href: "https://steamcommunity.com/profiles/76561199523481034/",
    color: "from-[#1b2838] to-[#2a475e]",
    glowColor: "rgba(102, 192, 244, 0.5)",
  },
];

const SocialLinks = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.6 }}
      className="w-full flex justify-center"
    >
      {/* Compact Social Bar Card */}
      <div className="glass-card rounded-2xl p-4 sm:p-5 inline-flex mx-auto">
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
          {/* Icons Row */}
          <div className="flex items-center gap-3 sm:gap-4">
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: 0.5 + index * 0.1,
                  type: "spring",
                  stiffness: 400,
                  damping: 20,
                }}
                whileHover={{
                  scale: 1.2,
                  y: -5,
                }}
                whileTap={{ scale: 0.9 }}
                className="group relative"
              >
                {/* Icon Button */}
                <div
                  className={`
                                        relative p-3 sm:p-3.5 rounded-xl 
                                        bg-gradient-to-br ${link.color}
                                        cursor-pointer transition-all duration-300
                                        group-hover:shadow-lg
                                    `}
                  style={{ boxShadow: "none" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = `0 0 25px ${link.glowColor}`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <link.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>

                {/* Tooltip */}
                <div
                  className="
                                    absolute -bottom-8 left-1/2 -translate-x-1/2
                                    px-2 py-1 rounded-md bg-[#0F172A] text-[10px] text-white
                                    opacity-0 group-hover:opacity-100
                                    transition-opacity whitespace-nowrap z-10
                                    pointer-events-none
                                "
                >
                  {link.name}
                </div>
              </motion.a>
            ))}
          </div>

          {/* Divider */}
          <div className="hidden sm:block w-px h-10 bg-[#E2E8F0]" />
          <div className="sm:hidden w-full h-px bg-[#E2E8F0]" />

          {/* CTA Button */}
          <motion.a
            href="mailto:contact@dien.dev"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-gradient flex items-center gap-2 text-sm whitespace-nowrap"
          >
            <HiOutlineMail className="w-4 h-4" />
            <span>Get In Touch</span>
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
};

export default SocialLinks;
