import { motion } from "framer-motion";
import { Code2 } from "lucide-react";

const techStack = [
  { name: "React", icon: "⚛️", color: "from-cyan-400 to-blue-500" },
  { name: "Node.js", icon: "🟢", color: "from-green-400 to-emerald-600" },
  { name: "TypeScript", icon: "📘", color: "from-blue-400 to-blue-600" },
  { name: "Python", icon: "🐍", color: "from-yellow-400 to-blue-500" },
  { name: "Tailwind", icon: "🎨", color: "from-teal-400 to-cyan-500" },
  { name: "Git", icon: "📦", color: "from-orange-400 to-red-500" },
  { name: "Docker", icon: "🐳", color: "from-blue-500 to-blue-700" },
  { name: "AWS", icon: "☁️", color: "from-orange-400 to-yellow-500" },
];

const TechItem = ({ tech, index }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: 0.7 + index * 0.05 }}
    className="group cursor-pointer"
  >
    <div
      className={`
                rounded-xl bg-gradient-to-br ${tech.color}
                transition-all duration-300 hover:scale-110 hover:-translate-y-1
                w-14 h-14 sm:w-16 sm:h-16
                flex items-center justify-center
                hover:shadow-lg hover:shadow-indigo-500/20
            `}
    >
      <span className="text-2xl sm:text-3xl">{tech.icon}</span>
    </div>
    <div className="mt-2 text-center text-[10px] sm:text-xs text-[#94A3B8] group-hover:text-[#6366F1] transition-colors font-medium">
      {tech.name}
    </div>
  </motion.div>
);

const TechStack = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.6 }}
      className="w-full h-full flex flex-col"
    >
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6 }}
        className="flex items-center gap-2 mb-4"
      >
        <Code2 className="w-4 h-4 text-[#6366F1]" />
        <h2 className="text-sm font-semibold text-[#94A3B8] uppercase tracking-wider">
          Tech Stack
        </h2>
      </motion.div>

      {/* Tech Grid */}
      <div className="glass-card rounded-2xl p-4 sm:p-6 flex-1">
        <div className="grid grid-cols-4 gap-4 sm:gap-6 justify-items-center">
          {techStack.map((tech, i) => (
            <TechItem key={i} tech={tech} index={i} />
          ))}
        </div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-6 text-center text-xs text-[#94A3B8]"
        >
          Always learning ✨
        </motion.p>
      </div>
    </motion.div>
  );
};

export default TechStack;
