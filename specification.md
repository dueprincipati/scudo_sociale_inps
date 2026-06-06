# Specifica di Progetto: Missione Previdenza

Benvenuto nella specifica ufficiale di **Missione Previdenza**, l'escape room educativa digitale pensata per la Scuola Secondaria di Primo Grado (scuole medie). Questa specifica funge da "fonte di verità" per sviluppatori e agenti AI che lavorano sul progetto.

---

## 1. Visione e Obiettivi del Progetto

Il portale temporale trasporta gli studenti nel **2086**, in una realtà distopica dove il **"Signor Evasore"** ha infettato i condotti dell'INPS cancellando lo Scudo Sociale del Welfare. Senza tutele previdenziali ed assistenziali, i lavoratori e i cittadini fragili sono esposti alle intemperie della povertà, della malattia non pagata e del lavoro nero.

### Obiettivi Didattici:
- **Patto tra Generazioni**: Comprendere il sistema pensionistico a ripartizione.
- **Salvadanaio dei Contributi**: Imparare come i contributi finanziano malattia, infortuni, maternità e pensione.
- **Dettaglio Costituzionale**: Comprendere il ruolo dell'Articolo 38 della Costituzione Italiana.
- **Diritto del Lavoro**: Riconoscere la differenza tra stipendio lordo e netto, identificare la NASpI e combattere il lavoro nero tramite contratti regolari.

---

## 2. Tech Stack e Versioni Chiave

- **Core Framework**: React 19.0.1
- **Bundler & Dev Server**: Vite 6.2.3
- **Linguaggio**: TypeScript 5.8.2
- **Aesthetics & CSS**: Tailwind CSS v4.1.14 (con plugin `@tailwindcss/vite` e binding nativo per Linux x64)
- **Animazioni**: Motion (framer-motion) 12.23.24
- **Iconografia**: Lucide React 0.546.0
- **Testing**: Vitest (per test unitari ed integrazione veloci)

---

## 3. Comandi del Progetto

Tutti i comandi devono essere eseguiti all'interno della cartella principale:

- **Sviluppo Locale**: `npm run dev` (avvia il server Vite su porta 3000)
- **Esecuzione Test**: `npm run test` o `npx vitest` (avvia la suite di test)
- **Esecuzione Test Singola Run**: `npm run test run` o `npx vitest run` (esegue i test senza watch mode)
- **Compilazione di Produzione**: `npm run build` (compila il codice TypeScript e genera la build in `dist/`)
- **Anteprima della Build**: `npm run preview` (serve localmente la cartella `dist/`)
- **Controllo Sintattico & Tipi (Linter)**: `npm run lint` (esegue `tsc --noEmit`)
- **Pulizia File Temporanei**: `npm run clean` (rimuove la cartella `dist/`)

---

## 4. Struttura del Progetto

Il repository segue la seguente organizzazione:

```
├── assets/                 # Risorse grafiche statiche
├── src/
│   ├── components/
│   │   ├── PuzzleStep.tsx   # Rendering e gestione dei 12 enigmi interattivi
│   │   └── TeacherPanel.tsx # Pannello docente: soluzioni, salti, attestato
│   ├── data/
│   │   ├── puzzles.ts       # Definizione di testi, risposte e aiuti dei 12 puzzle
│   │   └── puzzles.test.ts  # Test automatizzati delle risposte e logiche dei puzzle
│   ├── utils/
│   │   ├── audio.ts         # Utility di riproduzione effetti sonori
│   │   └── score.test.ts    # Test automatizzati per le formule di calcolo XP
│   ├── App.tsx             # Entry-point dell'app, router di stato, gestione timer e XP
│   ├── index.css           # Stili CSS globali e inizializzazione di Tailwind CSS
│   ├── main.tsx            # Inizializzazione React 19 nel DOM
│   ├── types.ts            # Definizioni dei tipi TypeScript (Puzzle, TeamState, ecc.)
├── index.html              # Template HTML principale
├── tsconfig.json           # Configurazione TypeScript
└── vite.config.ts          # Configurazione di Vite 6 (incluso supporto alias "@")
```

---

## 5. Linee Guida di Stile e Convenzioni di Codice

- **Componenti React**: Utilizzare esclusivamente componenti funzionali tipizzati con `React.FC` o definizioni standard. Evitare componenti a classe.
- **Stato**: Utilizzare gli hook di React (`useState`, `useEffect`, `useMemo`) per gestire i cambiamenti. Lo stato complessivo del gioco (`teamState`) risiede in `App.tsx` ed è propagato ai sotto-componenti.
- **Gestione Tipi**: TypeScript deve sempre essere soddisfatto. Evitare l'uso di `any` laddove possibile e ricorrere a type cast espliciti (`as Type`) solo per superare i limiti noti delle firme standard (es. `Object.values` con index signature).
- **Responsive Design**: L'interfaccia deve adattarsi fluidamente a tablet, smartphone e desktop. Utilizzare i modificatori responsive di Tailwind (`sm:`, `md:`, `lg:`).
- **Aesthetics**: Mantenere l'aspetto premium e distopico fantascientifico dell'escape room (sfondo scuro nei pannelli narrativi, contrasti netti con colori curati HSL come slate, blue-600, amber-500 ed emerald-500, ed animazioni animate all'inserimento e al completamento).

---

## 6. Regole di Gestione dello Stato e Punteggio (XP)

All'avvio, la squadra parte con un punteggio di **2000 XP** e ha **45 minuti** (2700 secondi) di tempo limite. Il punteggio varia in tempo reale secondo questa formula:

$$XP = BASE\_SCORE (2000) - Penalità\_Tempo - Penalità\_Indizi - Penalità\_Errori$$

- **Penalità Tempo**: `-0.3 XP` per ogni secondo trascorso.
- **Penalità Indizi** (su base cumulativa per ogni singolo enigma):
  - 1° Indizio: `-50 XP`
  - 2° Indizio: `-100 XP`
  - 3° Indizio (Rivelazione Soluzione): `-250 XP`
- **Penalità Errori**: `-40 XP` per ogni tentativo di risposta errato inviato.
- **Punteggio Minimo**: Il punteggio non può mai scendere sotto **100 XP**.

### Persistenza
Lo stato corrente (`TeamState`) viene salvato continuamente all'interno del browser dell'utente in `localStorage` alla chiave `missione_previdenza_state`. All'avvio dell'applicazione, se presente, lo stato viene ripristinato automaticamente per permettere il riavvio o il ripristino in caso di ricaricamento accidentale.

La classifica storica della scuola è salvata in `localStorage` alla chiave `missione_previdenza_leaderboard`.

---

## 7. Meccaniche dei Puzzle ed Enigmi (Challenge Details)

Il gioco si compone di 12 enigmi ad avanzamento lineare:

1. **Puzzle 1 (balance - PATTO)**:
   - *Meccanica*: Grafica del flusso lavoratore-pensionato.
   - *Risposta attesa*: `PATTO`.

2. **Puzzle 2 (icons - 1898)**:
   - *Meccanica*: Selezione di tessere. Somma numerica target: 1898.
   - *Risposta attesa*: `1898`.

3. **Puzzle 3 (constitution - 38)**:
   - *Meccanica*: Clic sugli articoli costituzionali. L'Art. 38 imposta il valore su 38.
   - *Risposta attesa*: `38`.

4. **Puzzle 4 (payslip - NASPI)**:
   - *Meccanica*: Busta paga interattiva. Facendo clic su "Trattenute INPS" viene rivelata la sigla NASpI.
   - *Risposta attesa*: `NASPI`.

5. **Puzzle 5 (decode - SOLIDARIETA)**:
   - *Meccanica*: Parola mascherata con alcune lettere da riempire per ricostruire la catena.
   - *Risposta attesa*: `SOLIDARIETA`.

6. **Puzzle 6 (boss - CONTRATTO)**:
   - *Meccanica*: Scontro narrativo contro il "Signor Evasore". Richiede la firma dell'accordo legale.
   - *Risposta attesa*: `CONTRATTO`.

7. **Puzzle 7 (balance - SOSTENIBILITA)**:
   - *Meccanica*: Analisi dei nodi e sequenza di lettere del flusso generazionale complesso.
   - *Risposta attesa*: `SOSTENIBILITA`.

8. **Puzzle 8 (decode - CONTRIB)**:
   - *Meccanica*: Decifrazione Cifrario di Cesare con spostamento di 6 caratteri indietro (shift -6) della stringa `IUTZXOH`.
   - *Risposta attesa*: `CONTRIB`.

9. **Puzzle 9 (icons - 2650)**:
   - *Meccanica*: Selezione di 3 tessere specifiche definite in `puzzles.ts` la cui somma è pari a 2650.
   - *Risposta attesa*: `2650`.

10. **Puzzle 10 (decode - INVESTIMENTO)**:
    - *Meccanica*: Inserimento di una parola bilanciata di politica pubblica.
    - *Risposta attesa*: `INVESTIMENTO`.

11. **Puzzle 11 (boss - COLLETTIVO CONTRATTO)**:
    - *Meccanica*: Scontro finale avanzato. Richiede due parole distinte.
    - *Risposta attesa*: `COLLETTIVO CONTRATTO`.

12. **Puzzle 12 (decode - P10ART38)**:
    - *Meccanica*: Sfida riassuntiva combinata che unisce prima lettera di Pensione (P), somma anno 2026 (10) e articolo della Costituzione (ART38).
    - *Risposta attesa*: `P10ART38`.

---

## 8. Confini di Sviluppo (Boundaries)

### ✅ Always Do (Fai sempre senza chiedere):
- Eseguire i test unitari (`npm run test`) prima di effettuare commit.
- Assicurarsi che `npm run lint` non riporti alcun errore di tipo o sintattico.
- Mantenere la logica audio intatta e gli effetti sonori attivi in `src/utils/audio.ts`.
- Preservare i commenti e la documentazione del codice esistente.

### ⚠️ Ask First (Chiedi prima di procedere):
- Installare nuove librerie npm esterne (ad esclusione di Vitest per il setup di test).
- Modificare i dati didattici e storici o le risposte corrette all'interno di `src/data/puzzles.ts`.
- Apportare modifiche strutturali al layout e al design delle pagine.

### 🚫 Never Do (Non fare mai):
- Salvare o inserire credenziali, token, chiavi API o dati sensibili nel codice sorgente o in `localStorage`.
- Modificare i file all'interno della cartella `node_modules/` o le configurazioni globali di build per saltare i controlli lint/typescript.
- Disabilitare i test o ignorare i test falliti.
