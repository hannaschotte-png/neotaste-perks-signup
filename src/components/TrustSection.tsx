import AnimatedSection from "./AnimatedSection";
import { Utensils, Users, Star } from "lucide-react";

const stats = [
  { icon: Utensils, value: "500+", label: "Partnerrestaurants" },
  { icon: Users, value: "50.000+", label: "Zufriedene Nutzer" },
  { icon: Star, value: "4.8 ★", label: "App-Bewertung" },
];

const TrustSection = () => (
  <section className="px-4 pb-24">
    <div className="max-w-4xl mx-auto">
      <AnimatedSection>
        <div className="grid grid-cols-3 gap-6">
          {stats.map(({ icon: Icon, value, label }, i) => (
            <AnimatedSection key={label} delay={i * 0.15} className="text-center space-y-3">
              <div className="mx-auto w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center">
                <Icon className="w-6 h-6 text-primary" />
              </div>
              <div className="text-3xl md:text-4xl font-extrabold text-primary">{value}</div>
              <div className="text-sm text-muted-foreground font-medium">{label}</div>
            </AnimatedSection>
          ))}
        </div>
      </AnimatedSection>
    </div>
  </section>
);

export default TrustSection;
