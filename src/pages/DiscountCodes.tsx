import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Users, Copy, Check, Send, Sparkles } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

const generatePlaceholderCodes = (count: number): string[] => {
  const codes: string[] = [];
  for (let i = 0; i < count; i++) {
    const code = `NEO-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    codes.push(code);
  }
  return codes;
};

const DiscountCodes = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [employeeCount, setEmployeeCount] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [codes, setCodes] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);
  const [step, setStep] = useState<"input" | "codes">("input");

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    const count = parseInt(employeeCount);
    if (!count || count < 1) return;
    const generated = generatePlaceholderCodes(count);
    setCodes(generated);
    setStep("codes");
  };

  const handleCopyAll = async () => {
    const text = codes.join("\n");
    await navigator.clipboard.writeText(text);
    setCopied(true);
    toast({ title: "Kopiert!", description: `${codes.length} Codes in die Zwischenablage kopiert.` });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareSlack = async () => {
    // Will be wired to Slack connector edge function
    toast({
      title: "Slack-Integration",
      description: "Die Slack-Integration wird eingerichtet. Bitte verbinden Sie zunächst Ihren Slack-Workspace.",
    });
  };

  return (
    <div className="min-h-screen mesh-gradient pb-20">
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

      <section className="px-4">
        <div className="max-w-3xl mx-auto">
          {step === "input" ? (
            <AnimatedSection delay={0.1}>
              <Card className="glass-card rounded-2xl overflow-hidden">
                <CardContent className="p-8 space-y-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-primary" />
                    </div>
                    <h2 className="text-xl font-bold">So funktioniert's</h2>
                  </div>
                  <div className="grid md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                    <div className="flex items-start gap-3 p-4 rounded-xl bg-secondary/50">
                      <span className="w-7 h-7 rounded-lg bg-primary/20 flex items-center justify-center text-primary font-bold text-xs shrink-0">1</span>
                      <span>Geben Sie Ihre Firmendaten und die Mitarbeiteranzahl ein</span>
                    </div>
                    <div className="flex items-start gap-3 p-4 rounded-xl bg-secondary/50">
                      <span className="w-7 h-7 rounded-lg bg-primary/20 flex items-center justify-center text-primary font-bold text-xs shrink-0">2</span>
                      <span>Wir generieren sofort individuelle Rabatt-Codes</span>
                    </div>
                    <div className="flex items-start gap-3 p-4 rounded-xl bg-secondary/50">
                      <span className="w-7 h-7 rounded-lg bg-primary/20 flex items-center justify-center text-primary font-bold text-xs shrink-0">3</span>
                      <span>Teilen Sie die Codes direkt per Slack mit Ihrem Team</span>
                    </div>
                  </div>

                  <form onSubmit={handleGenerate} className="space-y-4 pt-4">
                    <div>
                      <Label htmlFor="company" className="mb-1.5 block">Firmenname *</Label>
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
                        max="1000"
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
          ) : (
            <AnimatedSection delay={0.1}>
              <Card className="glass-card rounded-2xl overflow-hidden">
                <CardContent className="p-8 space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold">{codes.length} Codes generiert</h2>
                      <p className="text-sm text-muted-foreground">für {companyName}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        onClick={handleCopyAll}
                        className="gap-2 btn-glow"
                      >
                        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        {copied ? "Kopiert!" : "Alle kopieren"}
                      </Button>
                      <Button
                        onClick={handleShareSlack}
                        className="gap-2 btn-glow"
                      >
                        <Send className="w-4 h-4" />
                        In Slack teilen
                      </Button>
                    </div>
                  </div>

                  <div className="max-h-80 overflow-y-auto rounded-xl bg-secondary/50 p-4 space-y-1.5">
                    {codes.map((code, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between px-4 py-2.5 rounded-lg bg-background/40 hover:bg-background/60 transition-colors font-mono text-sm"
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
                    onClick={() => { setStep("input"); setCodes([]); }}
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
