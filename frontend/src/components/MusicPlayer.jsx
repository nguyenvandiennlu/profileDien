import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';

const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
};

const MusicPlayer = ({ isPlaying, onToggle, currentTime, duration, onSeek, volume, onVolumeChange }) => {
    // Generate stable bars configuration
    const bars = useMemo(() => {
        return [...Array(16)].map((_, i) => ({
            key: i,
            delay: i * 0.05,
            duration: 0.3 + (i % 4) * 0.1
        }));
    }, []);

    const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

    const handleSeek = (e) => {
        if (!onSeek || !duration) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const percent = x / rect.width;
        onSeek(percent * duration);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="w-full h-full flex flex-col"
        >
            {/* Inline Keyframes */}
            <style>{`
                @keyframes bar-bounce {
                    0%, 100% { height: 6px; }
                    50% { height: 26px; }
                }
                @keyframes vinyl-spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>

            {/* Section Header */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                className="flex items-center gap-2 mb-4"
            >
                <Volume2 className="w-4 h-4 text-[#6366F1]" />
                <h2 className="text-sm font-semibold text-[#94A3B8] uppercase tracking-wider">
                    Now Playing
                </h2>
            </motion.div>

            {/* Player Card */}
            <motion.div
                whileHover={{ scale: 1.01 }}
                className="glass-card glass-card-hover rounded-2xl p-4 sm:p-5 md:p-6 flex-1 flex flex-col"
            >
                <div className="flex items-center gap-4 sm:gap-5">
                    {/* Vinyl Record */}
                    <div className="relative flex-shrink-0">
                        <div
                            className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-[#1e1b4b] via-[#312e81] to-[#1e1b4b]"
                            style={{
                                boxShadow: isPlaying
                                    ? '0 0 40px rgba(99, 102, 241, 0.4), inset 0 0 20px rgba(0,0,0,0.5)'
                                    : 'inset 0 0 20px rgba(0,0,0,0.3)',
                                animation: isPlaying ? 'vinyl-spin 2s linear infinite' : 'none',
                            }}
                        >
                            <div className="absolute inset-2 rounded-full border border-[#4338CA]/30" />
                            <div className="absolute inset-4 rounded-full border border-[#4338CA]/30" />
                            <div className="absolute inset-6 rounded-full border border-[#4338CA]/30" />
                            <div className="absolute inset-0 m-auto w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-[#6366F1] to-[#4F46E5] flex items-center justify-center">
                                <div className="w-2 h-2 rounded-full bg-white" />
                            </div>
                        </div>
                        {isPlaying && (
                            <div className="absolute inset-0 rounded-full bg-[#6366F1]/20 blur-xl animate-pulse" />
                        )}
                    </div>

                    {/* Song Info */}
                    <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-[#0F172A] truncate text-base sm:text-lg">
                            Cloud Walking
                        </h3>
                        <p className="text-sm text-[#94A3B8] truncate">
                            Dien • Chill Mix
                        </p>

                        {/* Progress Bar */}
                        <div className="mt-3 flex items-center gap-2">
                            <span className="text-xs text-[#94A3B8] w-8 text-right">
                                {formatTime(currentTime)}
                            </span>
                            <div
                                className="flex-1 h-1.5 bg-[#E2E8F0] rounded-full overflow-hidden cursor-pointer group"
                                onClick={handleSeek}
                            >
                                <div
                                    className="h-full bg-gradient-to-r from-[#6366F1] to-[#818CF8] rounded-full relative"
                                    style={{
                                        width: `${progress}%`,
                                        boxShadow: '0 0 10px rgba(99, 102, 241, 0.4)'
                                    }}
                                >
                                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                            </div>
                            <span className="text-xs text-[#94A3B8] w-8">
                                {formatTime(duration)}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Controls */}
                <div className="flex flex-col items-center w-full mt-5 gap-4">
                    <div className="flex items-center justify-center gap-6">
                        <motion.button
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 text-[#94A3B8] hover:text-[#6366F1] transition-colors"
                        >
                            <SkipBack className="w-5 h-5" />
                        </motion.button>

                        <motion.button
                            onClick={onToggle}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-4 rounded-full bg-gradient-to-r from-[#6366F1] to-[#4F46E5] text-white transition-all"
                            style={{ boxShadow: '0 0 30px rgba(99, 102, 241, 0.4)' }}
                        >
                            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 text-[#94A3B8] hover:text-[#6366F1] transition-colors"
                        >
                            <SkipForward className="w-5 h-5" />
                        </motion.button>
                    </div>

                    {/* Volume Slider */}
                    <div className="flex items-center gap-3 w-full max-w-[200px] px-2">
                        <Volume2 className="w-3.5 h-3.5 text-[#94A3B8]" />
                        <div
                            className="flex-1 h-1 bg-[#E2E8F0] rounded-full overflow-hidden cursor-pointer group py-1"
                            onClick={(e) => {
                                if (!onVolumeChange) return;
                                const rect = e.currentTarget.getBoundingClientRect();
                                const x = e.clientX - rect.left;
                                const percent = Math.max(0, Math.min(1, x / rect.width));
                                onVolumeChange(percent);
                            }}
                        >
                            {/* Hit area larger than visual line */}
                            <div className="h-1 bg-[#E2E8F0] rounded-full overflow-visible relative">
                                <motion.div
                                    className="h-full bg-[#94A3B8] group-hover:bg-[#6366F1] rounded-full relative"
                                    style={{ width: `${(volume || 0.5) * 100}%` }}
                                >
                                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity" />
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default MusicPlayer;
