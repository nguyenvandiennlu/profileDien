import { motion } from 'framer-motion';
import { ExternalLink, Github, Sparkles } from 'lucide-react';

const projects = [
    {
        title: 'Discord Bot',
        description: 'Multipurpose bot with music, moderation & custom commands',
        tags: ['Discord.js', 'Node.js', 'MongoDB'],
        color: 'from-[#5865F2] to-[#7289DA]',
        link: '#',
        github: '#',
        featured: true,
    },
    {
        title: 'Portfolio Website',
        description: 'This website you are looking at right now!',
        tags: ['React', 'Tailwind', 'Framer Motion'],
        color: 'from-[#6366F1] to-[#818CF8]',
        link: '#',
        github: '#',
        featured: false,
    },
    {
        title: 'Java Desktop App',
        description: 'Desktop application built with JavaFX',
        tags: ['Java', 'JavaFX', 'Maven'],
        color: 'from-[#F89820] to-[#E76F00]',
        link: '#',
        github: '#',
        featured: false,
    },
];

const Projects = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="w-full"
            id="projects"
        >
            {/* Section Header */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
                className="flex items-center justify-between mb-6"
            >
                <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#6366F1]" />
                    <h2 className="text-sm font-semibold text-[#94A3B8] uppercase tracking-wider">
                        Projects
                    </h2>
                </div>
                <motion.a
                    href="#"
                    whileHover={{ x: 3 }}
                    className="text-xs text-[#6366F1] hover:underline font-medium"
                >
                    View all →
                </motion.a>
            </motion.div>

            {/* Projects Grid - Diverse layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Featured Project - Full width on mobile, takes more space */}
                <motion.div
                    whileHover={{ y: -5 }}
                    className="md:col-span-2 group"
                >
                    <div
                        className="relative overflow-hidden rounded-2xl p-6 h-full"
                        style={{
                            background: 'linear-gradient(135deg, rgba(88, 101, 242, 0.1) 0%, rgba(114, 137, 218, 0.05) 100%)',
                            border: '1px solid rgba(88, 101, 242, 0.2)',
                        }}
                    >
                        {/* Featured Badge */}
                        <div className="absolute top-4 right-4 px-2 py-1 rounded-full bg-[#5865F2]/20 border border-[#5865F2]/30">
                            <span className="text-[10px] font-semibold text-[#5865F2] uppercase">Featured</span>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            {/* Icon/Preview */}
                            <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-gradient-to-br ${projects[0].color} flex items-center justify-center flex-shrink-0`}>
                                <span className="text-3xl">🤖</span>
                            </div>

                            <div className="flex-1">
                                <h3 className="text-xl font-bold text-[#0F172A] group-hover:text-[#5865F2] transition-colors">
                                    {projects[0].title}
                                </h3>
                                <p className="mt-1 text-[#64748B] text-sm">
                                    {projects[0].description}
                                </p>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-2 mt-3">
                                    {projects[0].tags.map(tag => (
                                        <span key={tag} className="px-2 py-1 text-[10px] font-medium rounded-full bg-[#F1F5F9] text-[#64748B]">
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* Links */}
                                <div className="flex gap-3 mt-4">
                                    <motion.a
                                        href={projects[0].link}
                                        whileHover={{ scale: 1.05 }}
                                        className="flex items-center gap-1 text-xs font-medium text-[#6366F1]"
                                    >
                                        <ExternalLink className="w-3 h-3" /> Live Demo
                                    </motion.a>
                                    <motion.a
                                        href={projects[0].github}
                                        whileHover={{ scale: 1.05 }}
                                        className="flex items-center gap-1 text-xs font-medium text-[#64748B]"
                                    >
                                        <Github className="w-3 h-3" /> Source
                                    </motion.a>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Other Projects - Smaller cards */}
                {projects.slice(1).map((project, index) => (
                    <motion.div
                        key={project.title}
                        whileHover={{ y: -3 }}
                        className="group"
                    >
                        <div
                            className="glass-card rounded-xl p-5 h-full transition-all duration-300 hover:border-[#6366F1]/30"
                        >
                            <div className="flex items-start gap-3">
                                {/* Icon */}
                                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${project.color} flex items-center justify-center flex-shrink-0`}>
                                    <span className="text-lg">{index === 0 ? '🌐' : '☕'}</span>
                                </div>

                                <div className="flex-1 min-w-0">
                                    <h3 className="font-semibold text-[#0F172A] group-hover:text-[#6366F1] transition-colors truncate">
                                        {project.title}
                                    </h3>
                                    <p className="mt-1 text-[#64748B] text-xs line-clamp-2">
                                        {project.description}
                                    </p>
                                </div>
                            </div>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-1.5 mt-3">
                                {project.tags.slice(0, 2).map(tag => (
                                    <span key={tag} className="px-2 py-0.5 text-[9px] font-medium rounded-full bg-[#F1F5F9] text-[#94A3B8]">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default Projects;
