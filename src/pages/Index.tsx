import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Percent, Gift, ArrowRight, Users, CreditCard, Zap, Crown, Check } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import TypewriterText from "@/components/TypewriterText";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen mesh-gradient flex flex-col">
      {/* Hero */}
      <header className="pt-10 pb-6 px-4">
        <AnimatedSection className="max-w-3xl mx-auto text-center space-y-5">
          <div className="flex justify-center soft-spotlight">
            <img src="/neotaste-logo.png" alt="Neotaste" className="h-40 w-40 md:h-48 md:w-48 object-contain relative z-10" />
          </div>
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
          {/* Two distinct paths */}
          <div className="grid md:grid-cols-2 gap-6 md:gap-10 items-stretch">
            
            {/* LEFT: Rabatte - Clean, simple, approachable */}
            <AnimatedSection delay={0.1}>
              <div 
                onClick={() => navigate("/rabatte")}
                className="group cursor-pointer h-full border border-border/50 rounded-3xl bg-card/40 backdrop-blur-sm hover:bg-card/60 transition-all duration-500 relative overflow-hidden"
              >
                <div className="p-8 md:p-10 flex flex-col h-full">
                  {/* Label */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                      <Percent className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Option A</span>
                  </div>

                  {/* Free badge */}
                  <div className="inline-flex self-start items-center gap-1.5 bg-primary/15 border border-primary/30 text-primary px-3 py-1 rounded-full text-xs font-bold mb-6">
                    100% Kostenlos
                  </div>

                  {/* Title */}
                  <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
                    Rabatt-Codes
                  </h2>
                  
                  <p className="text-muted-foreground text-[15px] leading-relaxed mb-8">
                    Generieren Sie Rabatt-Codes und teilen Sie diese mit Ihrem Team – per Slack oder intern.
                  </p>

                  {/* Key facts */}
                  <div className="space-y-4 flex-1 mb-8">
                    <div className="flex items-start gap-3">
                      <Zap className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                      <div>
                        <span className="text-sm font-medium text-foreground">Sofort startklar</span>
                        <p className="text-xs text-muted-foreground">Codes in unter 2 Minuten generieren</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Users className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                      <div>
                        <span className="text-sm font-medium text-foreground">Self-Service</span>
                        <p className="text-xs text-muted-foreground">Mitarbeiter lösen Codes selbst ein</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CreditCard className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                      <div>
                        <span className="text-sm font-medium text-foreground">Keine Kosten für Sie</span>
                        <p className="text-xs text-muted-foreground">Mitarbeiter zahlen vergünstigt selbst</p>
                      </div>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mb-6">
                    <span className="text-3xl font-extrabold text-foreground">0 €</span>
                    <span className="text-sm text-muted-foreground ml-1">/ für Sie</span>
                  </div>

                  {/* CTA */}
                  <Button
                    variant="outline"
                    className="w-full h-12 text-base font-semibold rounded-xl border-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
                  >
                    Codes generieren
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </AnimatedSection>

            {/* RIGHT: Corporate Benefit - Premium, bold, elevated */}
            <AnimatedSection delay={0.2}>
              <div 
                onClick={() => navigate("/corporate-benefit")}
                className="group cursor-pointer h-full rounded-3xl relative overflow-hidden transition-all duration-500 hover:shadow-[0_0_60px_hsla(152,69%,53%,0.15)]"
              >
                {/* Premium gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/10 to-primary/5" />
                <div className="absolute inset-0 border-2 border-primary/30 rounded-3xl group-hover:border-primary/60 transition-colors duration-500" />
                
                <div className="relative p-8 md:p-10 flex flex-col h-full">
                  {/* Label */}
                  <div className="flex items-center gap-2 mb-8">
                    <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
                      <Crown className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-widest text-primary">Premium</span>
                  </div>

                  {/* Title */}
                  <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
                    Corporate Benefit
                  </h2>
                  
                  <p className="text-muted-foreground text-[15px] leading-relaxed mb-8">
                    Sie übernehmen die Kosten – Ihr Team genießt Neotaste als vollwertigen Benefit.
                  </p>

                  {/* Key facts */}
                  <div className="space-y-4 flex-1 mb-8">
                    <div className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      <div>
                        <span className="text-sm font-medium text-foreground">Voller Neotaste-Zugang</span>
                        <p className="text-xs text-muted-foreground">Alle Features, keine Einschränkungen</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      <div>
                        <span className="text-sm font-medium text-foreground">Vom Arbeitgeber bezahlt</span>
                        <p className="text-xs text-muted-foreground">Echte Wertschätzung für Ihr Team</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      <div>
                        <span className="text-sm font-medium text-foreground">Priorisierter Support</span>
                        <p className="text-xs text-muted-foreground">Persönlicher Ansprechpartner</p>
                      </div>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mb-6">
                    <span className="text-sm text-muted-foreground">ab</span>
                    <span className="text-3xl font-extrabold text-foreground ml-1">3,99 €</span>
                    <span className="text-sm text-muted-foreground ml-1">/ Mitarbeiter / Monat</span>
                  </div>

                  {/* CTA */}
                  <Button
                    className="w-full h-12 text-base font-semibold rounded-xl bg-primary text-primary-foreground hover:bg-foreground hover:text-background transition-all duration-300 shadow-[0_0_20px_hsla(152,69%,53%,0.3)] hover:shadow-[0_0_30px_hsla(152,69%,53%,0.5)]"
                  >
                    Benefit einrichten
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
