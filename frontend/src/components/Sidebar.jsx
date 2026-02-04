import { motion } from "framer-motion";
import { Home, FolderKanban, BookOpen, Mail, User } from "lucide-react";
import { useState } from "react";

const navItems = [
  { name: "Home", icon: Home, href: "#home" },
  { name: "Projects", icon: FolderKanban, href: "#projects" },
  { name: "Blog", icon: BookOpen, href: "#blog" },
  { name: "Contact", icon: Mail, href: "#contact" },
];

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState("Home");
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.aside
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
        className="hidden md:flex fixed left-0 top-0 h-full z-50 flex-col items-center py-8"
      >
        {/* Sidebar Container */}
        <motion.div
          animate={{ width: isExpanded ? 180 : 70 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="h-full rounded-r-2xl flex flex-col items-center py-6 overflow-hidden"
          style={{
            background: "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(20px)",
            borderLeft: "none",
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
            boxShadow: "4px 0 30px rgba(99, 102, 241, 0.1)",
            border: "1px solid rgba(99, 102, 241, 0.1)",
          }}
        >
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="mb-10 p-3 rounded-xl bg-gradient-to-br from-[#6366F1] to-[#4F46E5] cursor-pointer"
            style={{ boxShadow: "0 0 20px rgba(99, 102, 241, 0.4)" }}
          >
            <User className="w-6 h-6 text-white" />
          </motion.div>

          {/* Navigation Items */}
          <nav className="flex-1 flex flex-col gap-2 w-full px-3">
            {navItems.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                onClick={() => setActiveItem(item.name)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`
                                    relative flex items-center gap-3 px-3 py-3 rounded-xl
                                    transition-all duration-300 cursor-pointer
                                    ${
                                      activeItem === item.name
                                        ? "bg-[#6366F1]/10 text-[#6366F1]"
                                        : "text-[#94A3B8] hover:text-[#6366F1] hover:bg-[#6366F1]/5"
                                    }
                                `}
              >
                {/* Active Indicator */}
                {activeItem === item.name && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute left-0 w-1 h-8 bg-[#6366F1] rounded-r-full"
                    style={{ boxShadow: "0 0 10px rgba(99, 102, 241, 0.6)" }}
                  />
                )}

                <item.icon className="w-5 h-5 flex-shrink-0" />

                <motion.span
                  animate={{ opacity: isExpanded ? 1 : 0 }}
                  className="text-sm font-medium whitespace-nowrap"
                >
                  {item.name}
                </motion.span>
              </motion.a>
            ))}
          </nav>

          {/* Bottom Decoration */}
          <div className="mt-auto pt-6">
            <div
              className="w-2 h-2 rounded-full bg-[#6366F1] animate-pulse"
              style={{ boxShadow: "0 0 10px rgba(99, 102, 241, 0.6)" }}
            />
          </div>
        </motion.div>
      </motion.aside>

      {/* Mobile Bottom Navigation */}
      <motion.nav
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="md:hidden fixed bottom-4 left-4 right-4 z-50"
      >
        <div
          className="flex items-center justify-around py-3 px-4 rounded-2xl"
          style={{
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(99, 102, 241, 0.15)",
            boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
          }}
        >
          {navItems.map((item) => (
            <motion.a
              key={item.name}
              href={item.href}
              onClick={() => setActiveItem(item.name)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`
                                p-2 rounded-xl transition-all
                                ${
                                  activeItem === item.name
                                    ? "text-[#6366F1] bg-[#6366F1]/10"
                                    : "text-[#94A3B8]"
                                }
                            `}
            >
              <item.icon className="w-5 h-5" />
            </motion.a>
          ))}
        </div>
      </motion.nav>
    </>
  );
};

export default Sidebar;
