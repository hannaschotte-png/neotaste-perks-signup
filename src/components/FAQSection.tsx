import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import AnimatedSection from "./AnimatedSection";

const faqs = [
  {
    q: "Wie funktioniert die Abrechnung?",
    a: "Sie erhalten eine monatliche Rechnung basierend auf der Anzahl Ihrer aktiven Mitarbeiter. Bei der Jahresvariante wird der Gesamtbetrag jährlich im Voraus berechnet.",
  },
  {
    q: "Gibt es eine Mindestlaufzeit?",
    a: "Beim monatlichen Abo gibt es keine Mindestlaufzeit – Sie können jederzeit zum Monatsende kündigen. Das Jahres-Abo hat eine Laufzeit von 12 Monaten.",
  },
  {
    q: "Wie erhalten meine Mitarbeiter Zugang?",
    a: "Nach der Anmeldung erhalten Sie individuelle Zugangscodes, die Ihre Mitarbeiter in der Neotaste-App einlösen können. Der Zugang ist sofort aktiv.",
  },
  {
    q: "Kann ich weitere Mitarbeiter nachträglich hinzufügen?",
    a: "Ja, Sie können jederzeit weitere Mitarbeiter hinzufügen. Die Abrechnung wird automatisch angepasst.",
  },
  {
    q: "In welchen Städten ist Neotaste verfügbar?",
    a: "Neotaste ist in allen großen deutschen Städten verfügbar und expandiert stetig. Kontaktieren Sie uns für Details zu Ihrer Region.",
  },
];

const FAQSection = () => (
  <section className="px-4 pb-24">
    <div className="max-w-3xl mx-auto">
      <AnimatedSection>
        <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-10 font-display">
          Häufige Fragen
        </h2>
      </AnimatedSection>
      <AnimatedSection delay={0.15}>
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map(({ q, a }, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="bg-card border border-border rounded-xl px-6 data-[state=open]:shadow-lg data-[state=open]:shadow-primary/5 transition-shadow"
            >
              <AccordionTrigger className="text-left text-base font-semibold hover:no-underline py-5">
                {q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-5">
                {a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </AnimatedSection>
    </div>
  </section>
);

export default FAQSection;
