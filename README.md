# Missione Previdenza

**Missione Previdenza** è un'escape room educativa digitale pensata per la **Scuola Secondaria di Primo Grado**. L'obiettivo è aiutare i ragazzi a comprendere in modo coinvolgente il ruolo dell'INPS, i contributi previdenziali e i diritti del lavoro.

L'app trasporta gli studenti in un futuro distopico del **2086**, dove il temibile **"Signor Evasore"** ha cancellato l'INPS e il Welfare è in pericolo. Gli alunni devono risolvere puzzle didattici, restaurare il sistema di protezione sociale e dimostrare che il lavoro regolare e la solidarietà fanno la differenza.

---

## 📚 Contenuti e funzionalità principali

- 12 missioni interattive a tema **Welfare, contribuzioni, sicurezza sociale e legalità del lavoro**
- Interfaccia interattiva di gioco con punteggio in tempo reale
- **Area Docente** per avere soluzioni, gestione rapida dello svolgimento e generazione di attestati
- **Leaderboard locale** salvata in `localStorage`
- Tempo limite di 45 minuti per stimolare lavoro di squadra e coinvolgimento
- Realizzato con **React + Vite + TypeScript + Tailwind CSS**

---

## 🧩 Dettaglio delle challenge

1. **Enigma 1: Il Flusso Generazionale** — esplora il "Patto tra Generazioni" e il funzionamento del sistema a ripartizione dell'INPS.
2. **Enigma 2: Il Salvadanaio della Sicurezza** — scopri come i contributi finanziano malattia, maternità, infortunio e pensione.
3. **Enigma 3: La Bussola della Costituzione** — riconosci il ruolo dell'Articolo 38 nella tutela dei cittadini più fragili.
4. **Enigma 4: La Busta Paga e lo Scudo del Lavoro** — analizza la differenza tra lordo e netto e individua la NASpI come protezione per la disoccupazione.
5. **Enigma 5: La Catena del Welfare** — comprendi il valore della solidarietà sociale nel mantenimento del sistema di protezione.
6. **Enigma 6: Lo Scontro Finale con il Lavoro Nero** — affronta il "Signor Evasore" e impara perché un contratto regolare è il vero scudo dei lavoratori.
7. **Enigma 7: Il Labirinto dei Contributi** — valuta la sostenibilità del sistema previdenziale in base al rapporto tra entrate e uscite.
8. **Enigma 8: Il Cifrario della Previdenza** — decifra un messaggio per ricordare l'importanza della chiarezza nelle regole e nelle tutele.
9. **Enigma 9: L'Equazione del Futuro** — risolvi un calcolo numerico che simula l'accumulo dei contributi nel tempo.
10. **Enigma 10: Lo Specchio delle Politiche** — scegli tra opzioni di politica pubblica e comprendi l'importanza degli investimenti nel welfare.
11. **Enigma 11: L'Assedio del Boss — Versione Avanzata** — scopri il ruolo dei contratti collettivi e della tutela di gruppo contro l'evasione.
12. **Enigma 12: La Sfida Finale — Prova Combinata** — combini conoscenze civiche, competenze numeriche e istituzionali per chiudere la missione.

---

## 🎯 A chi è rivolto

- Insegnanti di **Educazione Civica e Cittadinanza Attiva**
- Ragazzi e le loro famiglie al Family Day INPS 2026.
- Laboratori didattici, aule digitali o attività di team building

---

## 🚀 Come eseguire il progetto

1. Installa le dipendenze:
   ```bash
   npm install
   ```
2. Avvia il server di sviluppo:
   ```bash
   npm run dev
   ```
3. Costruisci la versione di produzione:
   ```bash
   npm run build
   ```
4. Visualizza la build locale con preview:
   ```bash
   npm run preview
   ```

---

## 🧪 Script disponibili

- `npm run dev` — avvia l'app in sviluppo
- `npm run build` — compila l'app per la produzione
- `npm run preview` — esegue un server locale per visualizzare la build
- `npm run clean` — rimuove la cartella `dist` e file generati
- `npm run lint` — esegue TypeScript in modalità controllo senza output

---

## 📁 Struttura principale del repository

- `src/App.tsx` — logica principale del gioco
- `src/components/PuzzleStep.tsx` — singoli puzzle ed enigmi
- `src/components/TeacherPanel.tsx` — pannello docente e attestati
- `src/data/puzzles.ts` — definizione dei contenuti educativi
- `src/utils/audio.ts` — gestione degli effetti sonori

---

## 💡 Note tecniche

- L'app è pensata per funzionare in locale senza backend esterno
- Tutti i progressi e la classifica sono memorizzati nel browser tramite `localStorage`
- Il progetto è basato su React 19 e Vite 6
