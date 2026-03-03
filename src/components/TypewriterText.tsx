import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TypewriterTextProps {
  text: string;
  className?: string;
  speed?: number;
  delay?: number;
}

const TypewriterText = ({ text, className = "", speed = 50, delay = 800 }: TypewriterTextProps) => {
  const [displayed, setDisplayed] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timeout);
  }, [delay]);

  useEffect(() => {
    if (!started || displayed >= text.length) return;
    const timer = setTimeout(() => setDisplayed((d) => d + 1), speed);
    return () => clearTimeout(timer);
  }, [started, displayed, text, speed]);

  return (
    <span className={className}>
      {text.slice(0, displayed)}
      <AnimatePresence>
        {started && displayed < text.length && (
          <motion.span
            className="inline-block w-[3px] h-[1em] bg-primary ml-0.5 align-text-bottom"
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.6, repeat: Infinity }}
          />
        )}
      </AnimatePresence>
    </span>
  );
};

export default TypewriterText;
