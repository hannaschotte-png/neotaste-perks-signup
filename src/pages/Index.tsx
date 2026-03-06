import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Percent, ArrowRight, Users, CreditCard, Zap, Crown, Check } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import TypewriterText from "@/components/TypewriterText";
import TrustSection from "@/components/TrustSection";
import { useState, useRef } from "react";

const TiltCard = ({ children, className, onClick }: { children: React.ReactNode; className?: string; onClick?: () => void }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    setStyle({ rotateX, rotateY });
  };

  const handleMouseLeave = () => setStyle({ rotateX: 0, rotateY: 0 });

  return (
    <motion.div
      ref={ref}
      className={className}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateX: style.rotateX, rotateY: style.rotateY }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{ perspective: 1000, transformStyle: "preserve-3d" }}
    >
      {children}
    </motion.div>
  );
};

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen mesh-gradient flex flex-col">
      {/* Hero */}
      <header className="pt-10 pb-6 px-4">
        <AnimatedSection className="max-w-3xl mx-auto text-center space-y-5">
          <motion.div 
            className="flex justify-center soft-spotlight"
            whileHover={{ scale: 1.08, rotate: [0, -3, 3, 0] }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <img src="/neotaste-logo.png" alt="Neotaste" className="h-40 w-40 md:h-48 md:w-48 object-contain relative z-10" />
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-none">
            <span className="shimmer-text">Neotaste</span>
          </h1>
          <p className="text-xl md:text-2xl font-bold text-muted-foreground h-[1.5em]">
            <TypewriterText text="für Ihr Unternehmen" speed={45} delay={600} />
          </p>
          <p className="text-base text-muted-foreground max-w-xl mx-auto">
            Wie möchten Sie Neotaste Ihrem Team anbieten?
          </p>
        </AnimatedSection>
      </header>

      {/* Decision Section */}
      <section className="px-4 pb-20 flex-1">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6 md:gap-10 items-stretch">
            
            {/* LEFT: Rabatte */}
            <AnimatedSection delay={0.1}>
              <TiltCard
                onClick={() => navigate("/rabatte")}
                className="group cursor-pointer h-full border border-border/50 rounded-3xl bg-card/40 backdrop-blur-sm hover:bg-card/60 transition-all duration-500 relative overflow-hidden"
              >
                {/* Hover glow overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_50%_50%,hsla(152,69%,53%,0.08),transparent_70%)]" />
                
                <div className="p-8 md:p-10 flex flex-col h-full relative z-10">
                  {/* Label */}
                  <div className="flex items-center gap-2 mb-4">
                    <motion.div 
                      className="w-10 h-10 rounded-full bg-muted flex items-center justify-center"
                      whileHover={{ scale: 1.15, rotate: 15 }}
                    >
                      <Percent className="w-5 h-5 text-muted-foreground" />
                    </motion.div>
                    <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Option A</span>
                  </div>

                  {/* Free badge */}
                  <motion.div 
                    className="inline-flex self-start items-center gap-1.5 bg-primary/15 border border-primary/30 text-primary px-3 py-1 rounded-full text-xs font-bold mb-6"
                    whileHover={{ scale: 1.05 }}
                    animate={{ boxShadow: ["0 0 0px hsla(152,69%,53%,0)", "0 0 12px hsla(152,69%,53%,0.4)", "0 0 0px hsla(152,69%,53%,0)"] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    100% Kostenlos
                  </motion.div>

                  <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
                    Rabatt-Codes
                  </h2>
                  
                  <p className="text-muted-foreground text-[15px] leading-relaxed mb-8">
                    Generieren Sie Rabatt-Codes und teilen Sie diese mit Ihrem Team – per Slack oder intern.
                  </p>

                  <div className="space-y-4 flex-1 mb-8">
                    {[
                      { icon: Zap, title: "Sofort startklar", desc: "Codes in unter 2 Minuten generieren" },
                      { icon: Users, title: "Self-Service", desc: "Mitarbeiter lösen Codes selbst ein" },
                      { icon: CreditCard, title: "Keine Kosten für Sie", desc: "Mitarbeiter zahlen vergünstigt selbst" },
                    ].map((item, i) => (
                      <motion.div 
                        key={i}
                        className="flex items-start gap-3"
                        whileHover={{ x: 6 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <item.icon className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                        <div>
                          <span className="text-sm font-medium text-foreground">{item.title}</span>
                          <p className="text-xs text-muted-foreground">{item.desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mb-6">
                    <span className="text-3xl font-extrabold text-foreground">0 €</span>
                    <span className="text-sm text-muted-foreground ml-1">/ für Sie</span>
                  </div>

                  <Button
                    className="w-full h-12 text-base font-semibold rounded-xl bg-[hsl(152,40%,15%)] text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-[0_0_20px_hsla(152,69%,53%,0.2)] hover:shadow-[0_0_30px_hsla(152,69%,53%,0.4)]"
                  >
                    Codes generieren
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </TiltCard>
            </AnimatedSection>

            {/* RIGHT: Corporate Benefit */}
            <AnimatedSection delay={0.2}>
              <TiltCard
                onClick={() => navigate("/corporate-benefit")}
                className="group cursor-pointer h-full rounded-3xl relative overflow-hidden transition-all duration-500 hover:shadow-[0_0_60px_hsla(152,69%,53%,0.15)]"
              >
                {/* Premium gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/10 to-primary/5" />
                <div className="absolute inset-0 border-2 border-primary/30 rounded-3xl group-hover:border-primary/60 transition-colors duration-500" />
                
                {/* Animated shimmer sweep */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent animate-[shimmer_2s_infinite] -skew-x-12" />
                </div>
                
                <div className="relative p-8 md:p-10 flex flex-col h-full">
                  {/* Label */}
                  <div className="flex items-center gap-2 mb-8">
                    <motion.div 
                      className="w-10 h-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center"
                      whileHover={{ scale: 1.15, rotate: -15 }}
                      animate={{ boxShadow: ["0 0 0px hsla(152,69%,53%,0)", "0 0 20px hsla(152,69%,53%,0.3)", "0 0 0px hsla(152,69%,53%,0)"] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <Crown className="w-5 h-5 text-primary" />
                    </motion.div>
                    <span className="text-xs font-semibold uppercase tracking-widest text-primary">Premium</span>
                  </div>

                  <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
                    Corporate Benefit
                  </h2>
                  
                  <p className="text-muted-foreground text-[15px] leading-relaxed mb-8">
                    Sie übernehmen die Kosten – Ihr Team genießt Neotaste als vollwertigen Benefit.
                  </p>

                  <div className="space-y-4 flex-1 mb-8">
                    {[
                      { title: "Voller Neotaste-Zugang", desc: "Alle Features, keine Einschränkungen" },
                      { title: "Vom Arbeitgeber bezahlt", desc: "Echte Wertschätzung für Ihr Team" },
                      { title: "Priorisierter Support", desc: "Persönlicher Ansprechpartner" },
                    ].map((item, i) => (
                      <motion.div 
                        key={i}
                        className="flex items-start gap-3"
                        whileHover={{ x: 6 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                        <div>
                          <span className="text-sm font-medium text-foreground">{item.title}</span>
                          <p className="text-xs text-muted-foreground">{item.desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mb-6">
                    <span className="text-sm text-muted-foreground">ab</span>
                    <span className="text-3xl font-extrabold text-foreground ml-1">3,99 €</span>
                    <span className="text-sm text-muted-foreground ml-1">/ Mitarbeiter / Monat</span>
                  </div>

                  <Button
                    className="w-full h-12 text-base font-semibold rounded-xl bg-primary text-primary-foreground hover:bg-primary-foreground hover:text-primary transition-all duration-300 shadow-[0_0_20px_hsla(152,69%,53%,0.2)] hover:shadow-[0_0_30px_hsla(152,69%,53%,0.4)]"
                  >
                    Benefit einrichten
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </TiltCard>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <TrustSection />
    </div>
  );
};

export default Index;
