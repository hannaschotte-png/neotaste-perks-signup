

## Änderungen

### 1. N-Logo größer und zentriert
- Das Logo ist aktuell `h-14 w-14` (56px) — wird auf `h-24 w-24` (96px) vergrößert
- Sicherstellen, dass es korrekt zentriert ist (ist es bereits via `flex justify-center`)

### 2. "So funktioniert's"-Sektion unter den Pricing Cards
Neue Sektion mit 3 Schritten, jeweils mit Icon und kurzem Text:

1. **Company anmelden** — "Füllen Sie das Formular aus und wir richten alles für Sie ein."
2. **Codes verteilen** — "Stellen Sie Ihren Mitarbeitern die Zugangscodes zur Verfügung."
3. **Genießen & sparen** — "Jeder Mitarbeiter hat Neotaste auf der App und spart bei tollen Restaurants – z.B. beim Lunch in der Mittagspause."

Visuell: Nummerierte Kreise (1, 2, 3), horizontales 3-Spalten-Layout auf Desktop, vertikal auf Mobile.

### Technische Details
- Datei: `src/pages/Index.tsx`
  - Logo: Zeile 136, `h-14 w-14` → `h-24 w-24`
  - Neue Sektion nach dem Pricing-Cards `</section>` (nach Zeile 207)
- Icons: `Building2`, `Share2`/`Send`, `Utensils` aus lucide-react
- Keine Backend-Änderungen

