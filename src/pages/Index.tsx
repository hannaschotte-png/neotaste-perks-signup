import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Percent, Gift, ArrowRight, Sparkles } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import TypewriterText from "@/components/TypewriterText";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen mesh-gradient flex flex-col">
      {/* Hero */}
      <header className="pt-8 pb-10 px-4 relative overflow-hidden">
        <AnimatedSection className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
          <div className="flex justify-center soft-spotlight">
            <img src="/neotaste-logo.png" alt="Neotaste" className="h-40 w-40 object-contain relative z-10" />
          </div>
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-none">
              <span className="shimmer-text">Neotaste</span>
            </h1>
            <p className="text-2xl md:text-3xl font-bold text-muted-foreground h-[1.5em]">
              <TypewriterText text="für Ihr Unternehmen" speed={45} delay={600} />
            </p>
          </div>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Wählen Sie das passende Modell für Ihr Team – exklusive Restaurant-Deals als Mitarbeiter-Rabatte oder als vollwertiger Corporate Benefit.
          </p>
        </AnimatedSection>
      </header>

      {/* Decision Cards */}
      <section className="px-4 pb-24 flex-1">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 items-stretch pricing-glow relative z-10">
          {/* Rabatte */}
          <AnimatedSection delay={0.1}>
            <div className="decision-card group h-full flex flex-col rounded-2xl p-[1px] transition-all duration-500 hover:-translate-y-2">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative bg-card/80 backdrop-blur-xl rounded-2xl h-full flex flex-col overflow-hidden border border-border/50 group-hover:border-primary/30 transition-colors duration-500">
                {/* Top accent line */}
                <div className="h-1 bg-gradient-to-r from-primary/40 via-primary/60 to-primary/40 group-hover:from-primary/60 group-hover:via-primary group-hover:to-primary/60 transition-all duration-500" />
                
                <div className="px-8 py-10 flex flex-col flex-1 space-y-8">
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/15 group-hover:scale-110 transition-all duration-300">
                    <Percent className="w-7 h-7 text-primary" />
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-3">
                    <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                      Mitarbeiter-Rabatte
                    </h2>
                    <p className="text-muted-foreground leading-relaxed text-[15px]">
                      Ihre Mitarbeiter erhalten exklusive Rabatt-Codes für Neotaste. Einfach Codes generieren und per Slack oder intern teilen.
                    </p>
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 flex-1">
                    {[
                      "Sofort Codes generieren",
                      "Direkt in Slack teilen",
                      "Kein Abo notwendig",
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-3 text-sm text-muted-foreground">
                        <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <ArrowRight className="w-3 h-3 text-primary" />
                        </div>
                        {item}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Button
                    onClick={() => navigate("/rabatte")}
                    variant="outline"
                    className="w-full h-12 text-base font-semibold rounded-xl border-primary/30 hover:bg-primary/10 hover:border-primary/50 transition-all duration-300"
                  >
                    Rabatte aktivieren
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Corporate Benefit */}
          <AnimatedSection delay={0.25}>
            <div className="decision-card-premium group h-full flex flex-col rounded-2xl relative transition-all duration-500 hover:-translate-y-2">
              {/* Glow effect */}
              <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-b from-primary via-primary/50 to-primary/20 opacity-70 group-hover:opacity-100 transition-opacity duration-500 blur-[0.5px]" />
              
              <div className="relative bg-card/90 backdrop-blur-xl rounded-2xl h-full flex flex-col overflow-hidden">
                {/* Premium badge */}
                <div className="absolute top-4 right-4 z-10">
                  <div className="flex items-center gap-1.5 bg-primary/20 border border-primary/30 backdrop-blur-sm text-primary px-3 py-1 rounded-full text-xs font-semibold">
                    <Sparkles className="w-3 h-3" />
                    Premium
                  </div>
                </div>

                <div className="px-8 py-10 flex flex-col flex-1 space-y-8">
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                    <Gift className="w-7 h-7 text-primary" />
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-3">
                    <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                      Corporate Benefit
                    </h2>
                    <p className="text-muted-foreground leading-relaxed text-[15px]">
                      Neotaste als vollwertiger Benefit – Sie übernehmen die Kosten, Ihre Mitarbeiter genießen das volle Erlebnis.
                    </p>
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 flex-1">
                    {[
                      "Ab 3,99€/Mitarbeiter/Monat",
                      "Vollständiger Neotaste-Zugang",
                      "Priorisierter Support",
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-3 text-sm text-muted-foreground">
                        <div className="w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
                          <ArrowRight className="w-3 h-3 text-primary" />
                        </div>
                        {item}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Button
                    onClick={() => navigate("/corporate-benefit")}
                    className="w-full h-12 text-base font-semibold rounded-xl bg-primary text-primary-foreground hover:brightness-110 transition-all duration-300 shadow-[0_0_20px_hsla(152,69%,53%,0.25)] hover:shadow-[0_0_30px_hsla(152,69%,53%,0.4)]"
                  >
                    Benefit einrichten
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default Index;
