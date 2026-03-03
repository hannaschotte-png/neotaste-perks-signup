import { motion } from "framer-motion";

const particles = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 4 + 2,
  duration: Math.random() * 6 + 6,
  delay: Math.random() * 4,
  opacity: Math.random() * 0.3 + 0.1,
}));

const FloatingParticles = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {particles.map((p) => (
      <motion.div
        key={p.id}
        className="absolute rounded-full bg-primary"
        style={{
          left: `${p.x}%`,
          top: `${p.y}%`,
          width: p.size,
          height: p.size,
          opacity: p.opacity,
        }}
        animate={{
          y: [0, -30, 0],
          x: [0, Math.random() > 0.5 ? 15 : -15, 0],
          opacity: [p.opacity, p.opacity * 1.8, p.opacity],
        }}
        transition={{
          duration: p.duration,
          delay: p.delay,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    ))}
  </div>
);

export default FloatingParticles;
