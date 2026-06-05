Playtest Manuale — Missione Previdenza

Obiettivo
- Verificare il flusso di gioco, la coerenza degli enigmi (1–12), il comportamento delle meccaniche e la persistenza di stato.

Prerequisiti
- Eseguire dall'ambiente di sviluppo:

```bash
npm install
npm run dev
```

- Aprire nel browser: http://localhost:3000

Istruzioni generali
1. Avvia l'app e verifica la schermata di benvenuto.
2. Compila `Nome Squadra` e `Classe` e clicca Avvia.
3. Segui le missioni dall'1 al 12 senza saltare, verificando in ogni passo i comportamenti descritti sotto.
4. Controlla la console del browser (F12 → Console) per eventuali errori runtime.
5. Dopo aver completato alcuni step, ricarica la pagina per verificare la persistenza (localStorage) e che lo stato ripristini correttamente.
6. Apri l'`Area Docente` e prova a usare "Salta qui" per forzare un puzzle e verifica che lo stato venga aggiornato.

Test per puzzle (passo per passo)

Puzzle 1 — `balance` (PATTO)
- Azione: osserva la linea di flusso; devono apparire le lettere corrispondenti a `puzzle.correctAnswer` (PATTO).
- Input atteso: PATTO (MAIUSCOLO).
- Verifica: dopo invio appare animazione di successo e si passa al puzzle successivo.

Puzzle 2 — `icons` (Il Salvadanaio)
- Azione: seleziona le tessere che rappresentano le vere tutele.
- Valori di default: usa le tessere mostrate; la somma attuale deve aggiornarsi dinamicamente.
- Input atteso: inserire l'anno mostrato (placeholder dinamico). Per il puzzle originale è `1898`.
- Verifica: se la somma uguaglia il target (visualizzato come `Es: XXXX`) compare messaggio "Somma Corretta rilevata".

Puzzle 3 — `constitution` (Art. 38)
- Azione: cliccare sugli articoli e verificare che selezionando l'articolo 38 il campo di risposta venga impostato su `38`.
- Input atteso: 38.

Puzzle 4 — `payslip` (NASPI)
- Azione: aprire la busta paga e cliccare sulle voci; selezionare/visualizzare il blocco INPS.
- Input atteso: NASPI (MAIUSCOLO).

Puzzle 5 — `decode` (SOLIDARIETA)
- Azione: leggere gli slot delle lettere e verificare che la parola visualizzata corrisponda a `SOLIDARIETA`.
- Input atteso: SOLIDARIETA.

Puzzle 6 — `boss` (CONTRATTO)
- Azione: leggere messaggi di minaccia, digitare la parola di sconfitta.
- Input atteso: CONTRATTO.

Puzzle 7 — `balance` (SOSTENIBILITA)
- Azione: assicurarsi che il rendering della sequenza di lettere sia dinamico (non più limitato a PATTO).
- Input atteso: SOSTENIBILITA.

Puzzle 8 — `decode` (Cifrario)
- Azione: usare il Cifrario di Cesare shift -6 per decifrare la stringa mostrata.
- Input atteso: CONTRIB (MAIUSCOLO).
- Verifica: se la stringa cifrata non corrisponde, controllare `src/data/puzzles.ts` per il campo `question` e correggere.

Puzzle 9 — `icons` (Equazione 2650)
- Azione: selezionare ESATTAMENTE 3 tessere; verificare che il set di tessere mostrato sia quello definito in `puzzle.mechanicData.iconTessera` (se presente).
- Input atteso: 2650.
- Verifica: placeholder dinamico e messaggio di somma corretta.

Puzzle 10 — `decode` (INVESTIMENTO)
- Azione: digitare INVESTIMENTO.
- Verifica: avanzamento al puzzle successivo.

Puzzle 11 — `boss` avanzato (COLLETTIVO CONTRATTO)
- Azione: inserire due parole separate da spazio.
- Input atteso: COLLETTIVO CONTRATTO (esatto, MAIUSCOLO).

Puzzle 12 — combinazione finale (P10ART38)
- Azione: comporre la stringa unita come indicato.
- Input atteso: P10ART38.

Controlli di sistema e regression
- Salvataggio stato: dopo aver completato 1–3 puzzle, ricaricare la pagina e verificare che `teamState` sia ripristinato (completedPuzzles, hintsUsed, timeRemaining).
- Timeout: lasciare la partita in esecuzione fino a scadere il timer (o impostare manualmente `timeRemaining` in DevTools -> localStorage) per verificare `gameover`.
- Leaderboard: completare tutta la run per verificare che il nuovo record venga inserito in `missione_previdenza_leaderboard` su localStorage e appaia nella UI `Area Docente`.
- Teacher Panel: apri `Area Docente` → `Soluzioni ed Enigmi` → usa "Salta qui" su puzzle diversi e verifica che il gioco salti correttamente.

Raccolta log
- Se trovi errori JS/React: copia la Console (F12) e incollala qui.
- Controlla anche la rete (Network) per risposte 404/500 su risorse mancanti.

Suggerimenti rapidi per bug comuni
- Lettere non allineate in `balance`: assicurati che `puzzle.correctAnswer` sia valorizzato e contenga solo caratteri alfabetici.
- Somma `icons` errata: verifica `puzzle.mechanicData.iconTessera` o il `defaultIconTessera` in `src/components/PuzzleStep.tsx`.
- Stato non salvato: verifica che `localStorage` non sia bloccato dal browser o dalle impostazioni di privacy.

Report e prossimi passi
- Quando completi il playtest, incolla qui gli errori o gli screenshot e io interverrò sulle specifiche anomalie.
- Posso anche creare test automatici base (unit/integrazione) se vuoi investire in copertura testing.

Fine checklist
