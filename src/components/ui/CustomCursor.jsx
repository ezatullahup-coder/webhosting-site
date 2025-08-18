import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';

const INTERACTIVE_SELECTOR = 'a, button, [role="button"], input[type="submit"], select, .btn-primary, .btn-secondary, .btn-outline, [data-cursor="interactive"]';

const supportsFinePointer = () => {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false;
  return window.matchMedia('(pointer: fine)').matches;
};

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isInteractive, setIsInteractive] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  // Mouse positions
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Springs for smooth trailing
  const outerX = useSpring(mouseX, { stiffness: 250, damping: 25 });
  const outerY = useSpring(mouseY, { stiffness: 250, damping: 25 });
  const innerX = useSpring(mouseX, { stiffness: 500, damping: 30 });
  const innerY = useSpring(mouseY, { stiffness: 500, damping: 30 });

  useEffect(() => {
    const fine = supportsFinePointer();
    setEnabled(fine);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setVisible(true);
      const target = e.target;
      const interactive = target && (target.closest && target.closest(INTERACTIVE_SELECTOR));
      setIsInteractive(Boolean(interactive));
    };

    const handleMouseEnter = () => setVisible(true);
    const handleMouseLeave = () => setVisible(false);
    const handleDown = () => setIsPressed(true);
    const handleUp = () => setIsPressed(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mousedown', handleDown);
    window.addEventListener('mouseup', handleUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mousedown', handleDown);
      window.removeEventListener('mouseup', handleUp);
    };
  }, [enabled, mouseX, mouseY]);

  // Keep the system cursor visible alongside the custom cursor (no hiding)

  const outerSize = isInteractive ? 36 : 28;
  const innerSize = isInteractive ? 6 : 8;

  const outerXPos = useTransform(outerX, (v) => v - outerSize / 2);
  const outerYPos = useTransform(outerY, (v) => v - outerSize / 2);
  const innerXPos = useTransform(innerX, (v) => v - innerSize / 2);
  const innerYPos = useTransform(innerY, (v) => v - innerSize / 2);

  return (
    <AnimatePresence>
      {enabled && visible && (
        <>
          {/* Outer ring */}
          <motion.div
            key="cursor-outer"
            className="pointer-events-none fixed z-[999] rounded-full border-2 border-primary-500/80 dark:border-primary-400/80"
            style={{ width: outerSize, height: outerSize, x: outerXPos, y: outerYPos }}
            initial={{ opacity: 0 }}
            animate={{ opacity: isPressed ? 0.9 : 1, scale: isPressed ? 0.9 : 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          />
          {/* Inner dot */}
          <motion.div
            key="cursor-inner"
            className="pointer-events-none fixed z-[999] rounded-full bg-primary-500/90 dark:bg-primary-400/90"
            style={{ width: innerSize, height: innerSize, x: innerXPos, y: innerYPos }}
            initial={{ opacity: 0 }}
            animate={{ opacity: isPressed ? 1 : 0.9, scale: isInteractive ? (isPressed ? 0.9 : 1) : (isPressed ? 0.8 : 0.95) }}
            exit={{ opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          />
        </>
      )}
    </AnimatePresence>
  );
}


