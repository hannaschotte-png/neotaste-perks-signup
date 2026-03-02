

## Änderungen am Hero-Bereich & Button-Hover

### 1. Neotaste "N"-Logo statt Text-Logo
- Das hochgeladene N-Logo (`user-uploads://image.png`) wird nach `public/neotaste-logo.png` kopiert
- Der bisherige Text "neotaste" im Header wird durch ein `<img>` mit dem N-Logo ersetzt (ca. 56px Größe, zentriert)

### 2. Mehr Spacing & besseres Layout im Hero
- Header-Padding erhöhen: `pt-16 pb-24` statt `pt-12 pb-20`
- Mehr `space-y-10` statt `space-y-8` zwischen Logo, Headline und Subtext
- Gap zwischen Pricing-Cards und Hero vergrößern (`gap-8`)

### 3. Headline UX-Verbesserung
- "Neotaste" visuell hervorheben (in Primary-Grün, eigene Zeile oder mit Gradient)
- Subtitle "als Corporate Benefit für Ihr Team" als separater, etwas kleinerer Text darunter
- Insgesamt eine schönere typografische Hierarchie

### 4. "Jetzt starten"-Button Hover beim Jahres-Abo
- Der Primary-Button beim Jahres-Abo bekommt einen Custom-Hover-Effekt: beim Hover wird der Hintergrund dunkel (z.B. `hover:bg-primary-foreground hover:text-primary`), sodass die Farben invertieren – ein "Dark Mode Switch"-Effekt

### Technische Details
- Datei: `src/pages/Index.tsx` – Hero-Bereich (Zeilen 130-148) und Annual-Button (Zeile 199)
- Neues Asset: `public/neotaste-logo.png` (kopiert aus Upload)
- Keine Backend-Änderungen nötig

