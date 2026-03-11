import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Users, Copy, Check, Send, Sparkles, Briefcase, QrCode, UtensilsCrossed } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import { motion } from "framer-motion";

const N8N_WEBHOOK = "https://hannaschotte.app.n8n.cloud/webhook/rabatt-codes";

const steps = [
  {
    icon: Briefcase,
    number: "01",
    title: "Firma anmelden",
    description: "Geben Sie Ihren Firmennamen und die Anzahl Ihrer Mitarbeiter ein – das dauert keine 30 Sekunden.",
  },
  {
    icon: QrCode,
    number: "02",
    title: "Codes verteilen",
    description: "Wir generieren sofort individuelle Rabatt-Codes. Teilen Sie diese per Slack, E-Mail oder intern.",
  },
  {
    icon: UtensilsCrossed,
    number: "03",
    title: "Team genießt",
    description: "Ihre Mitarbeiter lösen die Codes in der Neotaste-App ein und sparen bei jedem Restaurantbesuch.",
  },
];

const DiscountCodes = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [employeeCount, setEmployeeCount] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [codes, setCodes] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);
  const [step, setStep] = useState<"input" | "loading" | "codes">("input");

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    const count = parseInt(employeeCount);
    if (!count || count < 1 || !companyName.trim()) return;

    setStep("loading");
    try {
      const response = await fetch(N8N_WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firmenname: companyName.trim(),
          anzahl_mitarbeiter: count,
        }),
      });

      if (!response.ok) throw new Error(`Fehler: ${response.status}`);

      const data = await response.json();

      if (!data.codes || data.codes.length === 0) {
        throw new Error("Keine Codes verfügbar");
      }

      setCodes(data.codes);
      setStep("codes");
    } catch (err) {
      console.error(err);
      toast({
        title: "Fehler beim Generieren",
        description: "Codes konnten nicht geladen werden. Bitte versuche es erneut.",
        variant: "destructive",
      });
      setStep("input");
    }
  };

  const handleCopyAll = async () => {
    const text = codes.join("\n");
    await navigator.clipboard.writeText(text);
    setCopied(true);
    toast({ title: "Kopiert!", description: `${codes.length} Codes in die Zwischenablage kopiert.` });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareSlack = () => {
    toast({
      title: "Slack",
      description: "Die Codes wurden bereits automatisch in #b2bpartnerships geteilt.",
    });
  };

  return (
    <div className="min-h-screen mesh-gradient pb-20">
      {/* Header */}
      <header className="pt-8 pb-6 px-4">
        <div className="max-w-3xl mx-auto">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Zurück zur Übersicht
          </button>
          <AnimatedSection className="text-center space-y-4">
            <div className="flex justify-center soft-spotlight">
              <img src="/neotaste-logo.png" alt="Neotaste" className="h-24 w-24 object-contain relative z-10" />
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold">
              <span className="shimmer-text">Mitarbeiter-Rabatte</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Generieren Sie Rabatt-Codes für Ihr Team und teilen Sie diese direkt per Slack.
            </p>
          </AnimatedSection>
        </div>
      </header>

      {/* 3-Step Explanation */}
      <section className="px-4 pb-12">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection delay={0.05}>
            <h2 className="text-center text-2xl md:text-3xl font-extrabold mb-8">
              In <span className="text-primary">3 Schritten</span> zum Team-Benefit
            </h2>
          </AnimatedSection>
          <div className="grid md:grid-cols-3 gap-5">
            {steps.map((s, i) => (
              <AnimatedSection key={i} delay={0.1 + i * 0.1}>
                <motion.div
                  className="group relative h-full rounded-2xl border border-border/50 bg-card/40 backdrop-blur-sm p-6 md:p-7 flex flex-col
  items-center text-center transition-all duration-500 hover:bg-card/60 hover:shadow-2xl hover:border-primary/30"
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500
  bg-[radial-gradient(circle_at_50%_50%,hsla(152,69%,53%,0.06),transparent_70%)]"
                  />
                  <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4 relative z-10">
                    {s.number}
                  </span>
                  <motion.div
                    className="w-14 h-14 rounded-2xl bg-primary/15 border border-primary/20 flex items-center justify-center mb-5 relative z-10"
                    whileHover={{ scale: 1.1, rotate: -8 }}
                  >
                    <s.icon className="w-7 h-7 text-primary" />
                  </motion.div>
                  <h3 className="font-display text-lg font-bold text-foreground mb-2 relative z-10">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed relative z-10">{s.description}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Form / Loading / Codes */}
      <section className="px-4">
        <div className="max-w-3xl mx-auto">
          {step === "input" && (
            <AnimatedSection delay={0.4}>
              <Card className="glass-card rounded-2xl overflow-hidden">
                <CardContent className="p-8 space-y-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-primary" />
                    </div>
                    <h2 className="text-xl font-bold">Jetzt Codes generieren</h2>
                  </div>
                  <form onSubmit={handleGenerate} className="space-y-4 pt-2">
                    <div>
                      <Label htmlFor="company" className="mb-1.5 block">
                        Firmenname *
                      </Label>
                      <Input
                        id="company"
                        required
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="Muster GmbH"
                        className="bg-secondary border-border"
                      />
                    </div>
                    <div>
                      <Label htmlFor="count" className="flex items-center gap-2 mb-1.5">
                        <Users className="w-4 h-4" /> Anzahl Mitarbeiter *
                      </Label>
                      <Input
                        id="count"
                        type="number"
                        min="1"
                        max="500"
                        required
                        value={employeeCount}
                        onChange={(e) => setEmployeeCount(e.target.value)}
                        placeholder="50"
                        className="bg-secondary border-border"
                      />
                    </div>
                    <Button type="submit" className="w-full h-12 text-base font-semibold btn-glow">
                      Codes generieren
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </AnimatedSection>
          )}

          {step === "loading" && (
            <AnimatedSection delay={0}>
              <Card className="glass-card rounded-2xl overflow-hidden">
                <CardContent className="p-8 flex flex-col items-center justify-center gap-4 min-h-[200px]">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-10 h-10 rounded-full border-2 border-primary border-t-transparent"
                  />
                  <p className="text-muted-foreground">Codes werden generiert…</p>
                </CardContent>
              </Card>
            </AnimatedSection>
          )}

          {step === "codes" && (
            <AnimatedSection delay={0.1}>
              <Card className="glass-card rounded-2xl overflow-hidden">
                <CardContent className="p-8 space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold">{codes.length} Codes generiert</h2>
                      <p className="text-sm text-muted-foreground">für {companyName}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" onClick={handleCopyAll} className="gap-2 btn-glow">
                        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        {copied ? "Kopiert!" : "Alle kopieren"}
                      </Button>
                      <Button onClick={handleShareSlack} className="gap-2 btn-glow">
                        <Send className="w-4 h-4" />
                        In Slack teilen
                      </Button>
                    </div>
                  </div>

                  <div className="max-h-80 overflow-y-auto rounded-xl bg-secondary/50 p-4 space-y-1.5">
                    {codes.map((code, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between px-4 py-2.5 rounded-lg bg-background/40 hover:bg-background/60 transition-colors
   font-mono text-sm"
                      >
                        <span>{code}</span>
                        <button
                          onClick={async () => {
                            await navigator.clipboard.writeText(code);
                            toast({ title: "Code kopiert!", description: code });
                          }}
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>

                  <Button
                    variant="outline"
                    onClick={() => {
                      setStep("input");
                      setCodes([]);
                    }}
                    className="w-full"
                  >
                    Neue Codes generieren
                  </Button>
                </CardContent>
              </Card>
            </AnimatedSection>
          )}
        </div>
      </section>
    </div>
  );
};

export default DiscountCodes;
