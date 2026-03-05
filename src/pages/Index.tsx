import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Percent, Gift, ArrowRight } from "lucide-react";
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
            <Card className="glass-card rounded-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_60px_-10px_rgba(0,0,0,0.5)] h-full flex flex-col overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary/60 to-primary/20 transition-all duration-300 group-hover:h-2 group-hover:from-primary group-hover:to-primary/40" />
              <CardContent className="px-8 py-10 flex flex-col flex-1 space-y-6">
                <div className="w-16 h-16 rounded-2xl bg-primary/15 flex items-center justify-center">
                  <Percent className="w-8 h-8 text-primary" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl md:text-3xl font-extrabold">Mitarbeiter-Rabatte</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Ihre Mitarbeiter erhalten exklusive Rabatt-Codes für Neotaste. Einfach Codes generieren und per Slack oder intern teilen.
                  </p>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground flex-1">
                  <li className="flex items-center gap-2">
                    <ArrowRight className="w-4 h-4 text-primary shrink-0" />
                    Sofort Codes generieren
                  </li>
                  <li className="flex items-center gap-2">
                    <ArrowRight className="w-4 h-4 text-primary shrink-0" />
                    Direkt in Slack teilen
                  </li>
                  <li className="flex items-center gap-2">
                    <ArrowRight className="w-4 h-4 text-primary shrink-0" />
                    Kein Abo notwendig
                  </li>
                </ul>
                <Button
                  onClick={() => navigate("/rabatte")}
                  variant="outline"
                  className="w-full h-12 text-base font-semibold btn-glow"
                >
                  Rabatte aktivieren
                </Button>
              </CardContent>
            </Card>
          </AnimatedSection>

          {/* Corporate Benefit */}
          <AnimatedSection delay={0.25}>
            <Card className="glass-card-highlight rounded-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_50px_-10px_hsl(152,69%,53%,0.35)] h-full flex flex-col overflow-hidden group relative">
              <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-4 py-1.5 text-sm font-semibold rounded-bl-lg z-10">
                Premium
              </div>
              <CardContent className="px-8 py-10 flex flex-col flex-1 space-y-6">
                <div className="w-16 h-16 rounded-2xl bg-primary/15 flex items-center justify-center">
                  <Gift className="w-8 h-8 text-primary" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl md:text-3xl font-extrabold">Corporate Benefit</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Neotaste als vollwertiger Benefit – Sie übernehmen die Kosten, Ihre Mitarbeiter genießen das volle Erlebnis.
                  </p>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground flex-1">
                  <li className="flex items-center gap-2">
                    <ArrowRight className="w-4 h-4 text-primary shrink-0" />
                    Ab 3,99€/Mitarbeiter/Monat
                  </li>
                  <li className="flex items-center gap-2">
                    <ArrowRight className="w-4 h-4 text-primary shrink-0" />
                    Vollständiger Neotaste-Zugang
                  </li>
                  <li className="flex items-center gap-2">
                    <ArrowRight className="w-4 h-4 text-primary shrink-0" />
                    Priorisierter Support
                  </li>
                </ul>
                <Button
                  onClick={() => navigate("/corporate-benefit")}
                  className="w-full h-12 text-base font-semibold btn-glow transition-all duration-200 hover:bg-primary-foreground hover:text-primary hover:border hover:border-primary"
                >
                  Benefit einrichten
                </Button>
              </CardContent>
            </Card>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default Index;
