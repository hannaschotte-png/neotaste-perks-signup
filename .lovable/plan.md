

## Neotaste Corporate Benefits – Landing Page & Sign-up Flow

### Design & Branding
- Dunkles Neotaste-Grün als Hintergrund, weiße Schrift
- Neotaste-Logo oben eingebunden
- Professionelles, modernes Layout im Neotaste-Stil
- Responsive für Desktop & Mobile

### Seitenstruktur

**1. Hero-Bereich**
- Neotaste Logo
- Überschrift: „Neotaste als Corporate Benefit für Ihr Team"
- Kurze Erklärung, was Neotaste ist und warum es der perfekte Corporate Benefit ist

**2. Zwei Pricing-Optionen nebeneinander**
- **Monatliches Abo**: 4,99€ pro Mitarbeiter/Monat – flexible, monatlich kündbar
- **Jahres-Abo** (hervorgehoben mit „Empfohlen"-Badge, visuell größer/auffälliger): 47,88€ pro Mitarbeiter/Jahr (entspricht 3,99€/Monat – 20% Ersparnis)
- Jeweils ein „Jetzt starten"-Button

**3. Sign-up Formular (öffnet sich nach Klick auf eine Option)**
- Gewähltes Modell wird oben angezeigt
- Felder: Firmenname, Ansprechpartner (Vor-/Nachname), E-Mail, Telefon, Anzahl Mitarbeiter, optionale Nachricht
- „Anfrage absenden"-Button

**4. Bestätigungsseite**
- Danke-Nachricht mit Zusammenfassung der Anfrage
- Info, dass sich jemand melden wird

### Backend (Lovable Cloud)
- **Datenbank**: Anfragen werden in einer Supabase-Tabelle gespeichert
- **E-Mail Edge Function**: 
  - Bestätigungs-E-Mail an den Kunden
  - Benachrichtigungs-E-Mail an partnerships@neotaste.app mit allen Formulardaten

