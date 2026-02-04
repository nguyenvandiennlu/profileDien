import { useEffect, useState } from 'react'
import { Howl } from 'howler';
import { motion } from 'framer-motion';
import CursorEffect from './components/CursorEffect';
import Sidebar from './components/Sidebar';
import ProfileCard from './components/ProfileCard';
import SocialLinks from './components/SocialLinks';
import TechStack from './components/TechStack';
import MusicPlayer from './components/MusicPlayer';
import ActivityFeed from './components/ActivityFeed';
import Projects from './components/Projects';
import WelcomeOverlay from './components/WelcomeOverlay';
import { AnimatePresence } from 'framer-motion';

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [hasEntered, setHasEntered] = useState(false);
  const [volume, setVolume] = useState(0.5);

  useEffect(() => {
    const newSound = new Howl({
      src: ['/music1.wav'],
      html5: true,
      loop: true,
      volume: 0.5,
      onload: function () {
        setDuration(newSound.duration());
        // Autoplay removed - now triggered by WelcomeOverlay
      },
      onplay: function () {
        setDuration(newSound.duration());
      }
    });
    setSound(newSound);

    return () => {
      newSound.unload();
    }
  }, []);

  // Update progress every 100ms when playing
  useEffect(() => {
    let interval;
    if (isPlaying && sound) {
      interval = setInterval(() => {
        setCurrentTime(sound.seek() || 0);
      }, 100);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, sound]);

  const togglePlay = () => {
    if (!sound) return;

    if (isPlaying) {
      sound.pause();
    } else {
      sound.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (time) => {
    if (sound) {
      sound.seek(time);
      setCurrentTime(time);
    }
  };

  const handleEnter = () => {
    setHasEntered(true);
    if (sound) {
      sound.play();
      setIsPlaying(true);
    }
  };

  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume);
    if (sound) {
      sound.volume(newVolume);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] relative overflow-hidden">
      {/* Welcome Overlay */}
      <AnimatePresence>
        {!hasEntered && <WelcomeOverlay onEnter={handleEnter} />}
      </AnimatePresence>

      <CursorEffect />
      <Sidebar />

      {/* Animated Background - CSS only for smooth performance */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Gradient Orbs with CSS animation */}
        <div className="absolute top-[-15%] left-[-10%] w-[600px] h-[600px] bg-gradient-to-r from-[#6366F1]/10 to-[#818CF8]/10 rounded-full blur-[100px] animate-blob" />
        <div className="absolute top-[30%] right-[-10%] w-[500px] h-[500px] bg-gradient-to-r from-[#818CF8]/8 to-[#A5B4FC]/8 rounded-full blur-[80px] animate-blob animation-delay-2000" />
        <div className="absolute bottom-[-10%] left-[15%] w-[550px] h-[550px] bg-gradient-to-r from-[#A5B4FC]/6 to-[#6366F1]/6 rounded-full blur-[90px] animate-blob animation-delay-4000" />
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        .animate-blob {
          animation: blob 20s ease-in-out infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>

      {/* Main Content - With sidebar offset */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 md:ml-[70px] min-h-screen flex flex-col items-center px-3 py-4 sm:px-4 md:px-8 md:py-8 pb-24 md:pb-8"
      >
        <div className="w-full max-w-4xl mx-auto space-y-8 sm:space-y-10 md:space-y-12">
          {/* Profile Section */}
          <section id="home" className="flex flex-col items-center pt-4">
            <ProfileCard />
          </section>

          {/* Social Links */}
          <section>
            <SocialLinks />
          </section>

          {/* Bento Grid for Music & Tech */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 items-stretch">
            <MusicPlayer
              isPlaying={isPlaying}
              onToggle={togglePlay}
              currentTime={currentTime}
              duration={duration}
              onSeek={handleSeek}
              volume={volume}
              onVolumeChange={handleVolumeChange}
            />
            <TechStack />
          </section>

          {/* Projects Showcase */}
          <section>
            <Projects />
          </section>

          {/* Activity Feed */}
          <section>
            <ActivityFeed />
          </section>

          {/* Footer */}
          <motion.footer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="text-center pt-8 pb-4"
          >
            <p className="text-[#94A3B8] text-sm">
              Made with <span className="text-[#6366F1]">♥</span> by Dien
            </p>
            <p className="text-[#94A3B8]/70 text-xs mt-1">
              © 2026 • Built with React & Tailwind CSS
            </p>
          </motion.footer>
        </div>
      </motion.main>
    </div>
  )
}

export default App
