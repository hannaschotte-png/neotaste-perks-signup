import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Check, Building2, Users, Mail, Phone, MessageSquare, Star, Briefcase, QrCode, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import AnimatedSection from "@/components/AnimatedSection";
import TrustSection from "@/components/TrustSection";
import FAQSection from "@/components/FAQSection";
import StickyCTA from "@/components/StickyCTA";
import FloatingParticles from "@/components/FloatingParticles";
import TypewriterText from "@/components/TypewriterText";

type PlanType = "monthly" | "annual";

interface FormData {
  company_name: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  employee_count: string;
  message: string;
}

const Index = () => {
  const [selectedPlan, setSelectedPlan] = useState<PlanType | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    company_name: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    employee_count: "",
    message: "",
  });
  const { toast } = useToast();

  const handlePlanSelect = (plan: PlanType) => {
    setSelectedPlan(plan);
    setDialogOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPlan) return;

    setSubmitting(true);
    try {
      const { error: dbError } = await supabase.from("corporate_leads").insert({
        plan_type: selectedPlan,
        company_name: formData.company_name,
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        phone: formData.phone,
        employee_count: parseInt(formData.employee_count) || 0,
        message: formData.message || null,
      });

      if (dbError) throw dbError;

      await supabase.functions.invoke("send-lead-emails", {
        body: {
          plan_type: selectedPlan,
          company_name: formData.company_name,
          first_name: formData.first_name,
          last_name: formData.last_name,
          email: formData.email,
          phone: formData.phone,
          employee_count: formData.employee_count,
          message: formData.message,
        },
      });

      setDialogOpen(false);
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      toast({
        title: "Fehler",
        description: "Es gab ein Problem beim Senden Ihrer Anfrage. Bitte versuchen Sie es erneut.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-lg w-full text-center space-y-6">
          <div className="mx-auto w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
            <Check className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold">Vielen Dank für Ihre Anfrage!</h1>
          <div className="space-y-3 text-muted-foreground">
            <p>
              Wir haben Ihre Anfrage für das{" "}
              <span className="text-foreground font-semibold">
                {selectedPlan === "monthly" ? "Monatliche Abo" : "Jahres-Abo"}
              </span>{" "}
              erhalten.
            </p>
            <p>
              <span className="text-foreground font-medium">{formData.company_name}</span> –{" "}
              {formData.employee_count} Mitarbeiter
            </p>
            <p>Eine Bestätigung wurde an <span className="text-foreground font-medium">{formData.email}</span> gesendet.</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-6 text-left">
            <p className="text-sm text-muted-foreground">
              Unser Partnerships-Team wird sich innerhalb von 24 Stunden bei Ihnen melden, um die nächsten Schritte zu besprechen.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20 md:pb-0 mesh-gradient">
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
              <TypewriterText text="als Corporate Benefit für Ihr Team" speed={45} delay={600} />
            </p>
          </div>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Bieten Sie Ihren Mitarbeitern exklusive Restaurant-Deals und kulinarische Erlebnisse –
            der moderne Benefit, der wirklich begeistert.
          </p>
        </AnimatedSection>
      </header>

      {/* Pricing Cards */}
      <section className="px-4 pb-24 pricing-glow">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 items-end relative z-10">
          {/* Monthly */}
          <AnimatedSection delay={0.1}>
            <Card className="glass-card relative overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_-10px_rgba(0,0,0,0.5)]">
              <CardHeader className="pb-2 pt-8 px-8">
                <CardTitle className="text-lg font-extrabold text-muted-foreground">Monatliches Abo</CardTitle>
              </CardHeader>
              <CardContent className="px-8 pb-8 space-y-6">
                <div>
                  <span className="text-5xl font-extrabold">4,99€</span>
                  <span className="text-muted-foreground ml-2">/ Mitarbeiter / Monat</span>
                </div>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /> Flexibel, monatlich kündbar</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /> Sofortiger Zugang für alle</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /> Exklusive Restaurant-Deals</li>
                </ul>
                <Button onClick={() => handlePlanSelect("monthly")} variant="outline" className="w-full h-12 text-base font-semibold btn-glow">
                  Jetzt starten
                </Button>
              </CardContent>
            </Card>
          </AnimatedSection>

          {/* Annual – highlighted */}
          <AnimatedSection delay={0.25}>
            <Card className="glass-card-highlight relative overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_50px_-10px_hsl(152,69%,53%,0.35)]">
              <div className="absolute top-0 right-0">
                <Badge className="rounded-none rounded-bl-lg bg-primary text-primary-foreground px-4 py-1.5 text-sm font-semibold flex items-center gap-1">
                  <Star className="w-3.5 h-3.5" /> Empfohlen
                </Badge>
              </div>
              <CardHeader className="pb-2 pt-8 px-8">
                <CardTitle className="text-lg font-extrabold text-muted-foreground">Jahres-Abo</CardTitle>
              </CardHeader>
              <CardContent className="px-8 pb-8 space-y-6">
                <div>
                  <span className="text-5xl font-extrabold">3,99€</span>
                  <span className="text-muted-foreground ml-2">/ Mitarbeiter / Monat</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  47,88€ pro Mitarbeiter/Jahr –{" "}
                  <span className="text-primary font-bold">20% Ersparnis</span>
                </p>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /> Bester Preis garantiert</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /> Sofortiger Zugang für alle</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /> Exklusive Restaurant-Deals</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /> Priorisierter Support</li>
                </ul>
                <Button onClick={() => handlePlanSelect("annual")} className="w-full h-12 text-base font-semibold btn-glow transition-all duration-200 hover:bg-primary-foreground hover:text-primary hover:border hover:border-primary">
                  Jetzt starten
                </Button>
              </CardContent>
            </Card>
          </AnimatedSection>
        </div>
      </section>

      {/* So funktioniert's */}
      <section className="px-4 pb-24">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection>
            <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-14 font-display">So funktioniert's</h2>
          </AnimatedSection>
          <div className="grid md:grid-cols-3 gap-8 items-stretch">
            {[
              {
                step: 1,
                icon: Briefcase,
                title: "Company anmelden",
                description: "Füllen Sie das Formular aus und wir richten alles für Sie ein.",
              },
              {
                step: 2,
                icon: QrCode,
                title: "Codes verteilen",
                description: "Stellen Sie Ihren Mitarbeitern die Zugangscodes zur Verfügung.",
              },
              {
                step: 3,
                icon: Sparkles,
                title: "Genießen & sparen",
                description: "Mitarbeiter sparen bei tollen Restaurants – z.B. beim Lunch in der Mittagspause.",
              },
            ].map(({ step, icon: Icon, title, description }, i) => (
              <AnimatedSection key={step} delay={i * 0.15}>
                <Card className="glass-card rounded-2xl p-8 text-center relative overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_60px_-10px_rgba(0,0,0,0.5)] h-full flex flex-col group">
                  <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary/80 to-primary/30 transition-all duration-300 group-hover:h-2 group-hover:from-primary group-hover:to-primary/50" />
                  <CardContent className="flex flex-col items-center space-y-5 pt-4 px-0 pb-0 flex-1">
                    <div className="w-14 h-14 rounded-xl bg-primary/15 flex items-center justify-center text-primary font-extrabold text-xl font-display">
                      {step}
                    </div>
                    <Icon className="w-8 h-8 text-primary" />
                    <h3 className="text-2xl font-extrabold font-display">{title}</h3>
                    <p className="text-base text-muted-foreground leading-relaxed">{description}</p>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQSection />

      {/* Trust Stats */}
      <TrustSection />

      {/* Dialog Form */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-lg bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-xl">
              Anfrage – {selectedPlan === "monthly" ? "Monatliches Abo (4,99€/Monat)" : "Jahres-Abo (3,99€/Monat)"}
            </DialogTitle>
            <DialogDescription>
              Füllen Sie das Formular aus und unser Team meldet sich innerhalb von 24 Stunden.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 mt-2">
            <div>
              <Label htmlFor="company_name" className="flex items-center gap-2 mb-1.5"><Building2 className="w-4 h-4" /> Firmenname *</Label>
              <Input id="company_name" name="company_name" required value={formData.company_name} onChange={handleInputChange} placeholder="Muster GmbH" className="bg-secondary border-border" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="first_name" className="mb-1.5 block">Vorname *</Label>
                <Input id="first_name" name="first_name" required value={formData.first_name} onChange={handleInputChange} placeholder="Max" className="bg-secondary border-border" />
              </div>
              <div>
                <Label htmlFor="last_name" className="mb-1.5 block">Nachname *</Label>
                <Input id="last_name" name="last_name" required value={formData.last_name} onChange={handleInputChange} placeholder="Mustermann" className="bg-secondary border-border" />
              </div>
            </div>
            <div>
              <Label htmlFor="email" className="flex items-center gap-2 mb-1.5"><Mail className="w-4 h-4" /> E-Mail *</Label>
              <Input id="email" name="email" type="email" required value={formData.email} onChange={handleInputChange} placeholder="max@muster.de" className="bg-secondary border-border" />
            </div>
            <div>
              <Label htmlFor="phone" className="flex items-center gap-2 mb-1.5"><Phone className="w-4 h-4" /> Telefon *</Label>
              <Input id="phone" name="phone" type="tel" required value={formData.phone} onChange={handleInputChange} placeholder="+49 170 1234567" className="bg-secondary border-border" />
            </div>
            <div>
              <Label htmlFor="employee_count" className="flex items-center gap-2 mb-1.5"><Users className="w-4 h-4" /> Anzahl Mitarbeiter *</Label>
              <Input id="employee_count" name="employee_count" type="number" min="1" required value={formData.employee_count} onChange={handleInputChange} placeholder="50" className="bg-secondary border-border" />
            </div>
            <div>
              <Label htmlFor="message" className="flex items-center gap-2 mb-1.5"><MessageSquare className="w-4 h-4" /> Nachricht (optional)</Label>
              <Textarea id="message" name="message" value={formData.message} onChange={handleInputChange} placeholder="Haben Sie spezielle Anforderungen?" className="bg-secondary border-border" />
            </div>
            <Button type="submit" className="w-full h-12 text-base font-semibold" disabled={submitting}>
              {submitting ? "Wird gesendet..." : "Anfrage absenden"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Sticky Mobile CTA */}
      {!dialogOpen && <StickyCTA onClick={() => handlePlanSelect("annual")} />}
    </div>
  );
};

export default Index;
