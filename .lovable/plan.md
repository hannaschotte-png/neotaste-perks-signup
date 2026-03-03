

## Plan: Design-Überarbeitung der "So funktioniert's"-Section und Typografie

### Änderungen in `src/pages/Index.tsx`:

1. **Hero-Beschreibungstext auf Poppins umstellen** – `font-display` Klasse vom Beschreibungstext entfernen, sodass alles im Hero-Bereich (Neotaste, Subtitle, Beschreibung) in Poppins ist.

2. **"So funktioniert's" Überschrift** – `font-display` entfernen, stattdessen `font-extrabold` in Poppins belassen. Größer machen.

3. **Step-Cards aufwändiger gestalten:**
   - Größere Cards mit mehr Padding (`p-8`)
   - Stärkere Schatten: `shadow-lg shadow-black/20` + hover-Effekt
   - Größere Icons (`w-8 h-8`) und Step-Nummern (`w-14 h-14`)
   - Titel in `font-extrabold text-xl` 
   - Breiterer Top-Gradient-Balken (`h-1.5`)
   - Dezenter Border-Glow ähnlich der Jahres-Abo-Card
   - Mehr Abstand zwischen Cards (`gap-8`)

4. **Pricing-Card-Titel** – `font-semibold` → `font-extrabold` für "Monatliches Abo" und "Jahres-Abo"

