import { useEffect, useState, useCallback } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CursorEffect = () => {
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    // Use motion values for smooth 60fps animation
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    // Spring config for outer ring (delayed, smooth follow)
    const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
    const ringX = useSpring(cursorX, springConfig);
    const ringY = useSpring(cursorY, springConfig);

    const moveCursor = useCallback((e) => {
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);
    }, [cursorX, cursorY]);

    useEffect(() => {
        // Check if touch device - hide cursor on mobile/tablet
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        if (isTouchDevice) {
            setIsVisible(false);
            return;
        }

        setIsVisible(true);

        const handleMouseOver = (e) => {
            const target = e.target;
            if (target.closest('a, button, [role="button"], input, textarea, [data-cursor="pointer"]')) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        const handleMouseEnter = () => setIsVisible(true);
        const handleMouseLeave = () => setIsVisible(false);

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mouseover', handleMouseOver);
        document.addEventListener('mouseenter', handleMouseEnter);
        document.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mouseover', handleMouseOver);
            document.removeEventListener('mouseenter', handleMouseEnter);
            document.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [moveCursor]);

    // Don't render on touch devices
    if (!isVisible) return null;

    return (
        <>
            {/* Hide default cursor */}
            <style>{`
                * {
                    cursor: none !important;
                }
                @media (pointer: coarse) {
                    * {
                        cursor: auto !important;
                    }
                }
            `}</style>

            {/* Outer Ring - Classic Duo with mix-blend-mode */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block"
                style={{
                    x: ringX,
                    y: ringY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
            >
                <motion.div
                    animate={{
                        width: isHovering ? 50 : 32,
                        height: isHovering ? 50 : 32,
                        borderWidth: isHovering ? 2 : 1.5,
                        opacity: isHovering ? 0.8 : 0.6,
                    }}
                    transition={{ duration: 0.15, ease: 'easeOut' }}
                    className="rounded-full border-[#6366F1] mix-blend-difference"
                    style={{
                        borderStyle: 'solid',
                        backgroundColor: isHovering ? 'rgba(99, 102, 241, 0.05)' : 'transparent',
                    }}
                />
            </motion.div>

            {/* Inner Dot - Snappy, follows cursor exactly */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block"
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
            >
                <motion.div
                    animate={{
                        width: isHovering ? 6 : 5,
                        height: isHovering ? 6 : 5,
                        opacity: isHovering ? 1 : 0.9,
                    }}
                    transition={{ duration: 0.1 }}
                    className="rounded-full bg-[#6366F1] mix-blend-difference"
                />
            </motion.div>
        </>
    );
};

export default CursorEffect;
