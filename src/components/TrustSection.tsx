import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import { Utensils, Users, Star } from "lucide-react";

const stats = [
  { icon: Utensils, value: 500, suffix: "+", label: "Partnerrestaurants" },
  { icon: Users, value: 2000000, suffix: "+", label: "Zufriedene Nutzer", format: true },
  { icon: Star, value: 4.8, suffix: " ★", label: "App-Bewertung", decimal: true },
];

function CountUp({ target, suffix, format, decimal }: { target: number; suffix: string; format?: boolean; decimal?: boolean }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      setCount(current);
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, target]);

  const display = decimal
    ? count.toFixed(1)
    : format
      ? Math.floor(count).toLocaleString("de-DE")
      : Math.floor(count).toString();

  return (
    <div ref={ref} className="text-3xl md:text-4xl font-extrabold text-primary">
      {display}{suffix}
    </div>
  );
}

const TrustSection = () => (
  <section className="px-4 pb-24">
    <div className="max-w-4xl mx-auto">
      <AnimatedSection>
        <div className="grid grid-cols-3 gap-6">
          {stats.map(({ icon: Icon, value, suffix, label, format, decimal }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="text-center space-y-3"
            >
              <div className="mx-auto w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center transition-transform duration-300 hover:scale-110">
                <Icon className="w-6 h-6 text-primary" />
              </div>
              <CountUp target={value} suffix={suffix} format={format} decimal={decimal} />
              <div className="text-sm text-muted-foreground font-medium">{label}</div>
            </motion.div>
          ))}
        </div>
      </AnimatedSection>
    </div>
  </section>
);

export default TrustSection;
