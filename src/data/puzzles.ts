import { Puzzle } from '../types';

export const puzzlesList: Puzzle[] = [
  {
    id: 1,
    title: "Enigma 1: Le Minacce Strutturali",
    description: "Per riattivare i database dell'INPS, dovete calibrare l'architettura del sistema individuando la principale minaccia alla sostenibilità del patto intergenerazionale.",
    educationalTidbit: "Nel sistema a ripartizione, chi lavora oggi paga la pensione di chi è in ritiro. Se ci sono troppi pensionati e pochi lavoratori, il sistema va in crisi.",
    mechanicType: "exclusion",
    question: "Identifica la vera criticità macro-sociologica che affligge le democrazie occidentali, scartando i falsi problemi.",
    correctAnswer: "INVERNO DEMOGRAFICO",
    hints: [
      { id: 1, text: "Non è un fenomeno legato al bilancio commerciale o ai mercati." },
      { id: 2, text: "Ha a che fare con la denatalità e l'invecchiamento della popolazione." },
      { id: 3, text: "È composto da due parole: INVERNO DEMOGRAFICO." }
    ],
    mechanicData: {
      clues: [
        "Non è l'aumento della produttività (che invece è positivo).",
        "Non è il surplus commerciale delle esportazioni.",
        "Non è l'adeguamento dei prezzi (Rivalutazione ISTAT)."
      ],
      options: [
        "INVERNO DEMOGRAFICO",
        "SURPLUS COMMERCIALE",
        "RIVALUTAZIONE ISTAT",
        "EQUILIBRIO MERCATI",
        "AUMENTO PRODUTTIVITA"
      ]
    }
  },

  {
    id: 2,
    title: "Enigma 2: Il Bilancio Avanzato",
    description: "Il calcolatore quantistico ha bisogno dei parametri esatti di bilancio attuariale. Dovete inserire 3 variabili per calibrare il gettito.",
    educationalTidbit: "I sistemi pensionistici contemporanei (modello contributivo pro-rata) bilanciano i versamenti passati con le prospettive di vita e il calo demografico.",
    mechanicType: "icons",
    question: "Seleziona le 3 componenti corrette che, sommate algebricamente, forniscono un indice di sostenibilità esattamente pari a 1000.",
    correctAnswer: "1000",
    hints: [
      { id: 1, text: "Devi sommare le due quote retributive/contributive e sottrarre il decadimento." },
      { id: 2, text: "La combinazione include un valore negativo da -300." },
      { id: 3, text: "Le tessere corrette sono: Quota A (800), Quota B (500) e Decadimento Demografico (-300)." }
    ],
    mechanicData: {
      iconTessera: [
        { id: 1, label: "Quota A (Retributivo)", val: 800, isCorrect: true, power: "Contributi antecedenti al 1995" },
        { id: 2, label: "Quota B (Contributivo)", val: 500, isCorrect: true, power: "Montante accumulato post riforme" },
        { id: 3, label: "Decadimento Demografico", val: -300, isCorrect: true, power: "Impatto della riduzione forza lavoro" },
        { id: 4, label: "Coefficiente di Trasformazione", val: 400, isCorrect: false, power: "Non fa parte della somma lineare" },
        { id: 5, label: "Tasso di Sostituzione", val: -100, isCorrect: false, power: "Parametro errato" },
        { id: 6, label: "Adeguamento ISTAT", val: 200, isCorrect: false, power: "Variabile non necessaria" }
      ]
    }
  },

  {
    id: 3,
    title: "Enigma 3: La Matematica Costituzionale",
    description: "I diritti inalienabili sono criptati. Per decifrarli, dovrete combinare matematicamente le regole della Repubblica.",
    educationalTidbit: "La Costituzione Italiana stabilisce le regole per eleggere il Parlamento (es. Art. 56 e 58) e i princìpi fondamentali per il welfare.",
    mechanicType: "constitution",
    question: "L'articolo che cerchi è pari alla differenza tra i giorni in un anno non bisestile (365) diviso 5, meno l'età minima per essere eletti alla Camera dei Deputati, meno 10.",
    correctAnswer: "38",
    hints: [
      { id: 1, text: "Calcola prima 365 / 5." },
      { id: 2, text: "L'età minima per essere eletti alla Camera dei Deputati in Italia è 25 anni." },
      { id: 3, text: "L'equazione è 73 - 25 - 10 = 38. Seleziona l'Articolo 38." }
    ]
  },

  {
    id: 4,
    title: "Enigma 4: Il Cuneo Fiscale",
    description: "I terminali vi mostrano un documento contabile lordo. È necessario trovare l'importo effettivamente in tasca al cittadino (Netto) dopo l'incidenza del cuneo fiscale e contributivo.",
    educationalTidbit: "Il netto in busta paga si ottiene sottraendo dalla Retribuzione Lorda sia la quota dei contributi previdenziali (INPS) sia le imposte sul reddito delle persone fisiche (IRPEF).",
    mechanicType: "payslip",
    question: "Osservate la busta paga simulata. Individuate la Retribuzione Base (Lordo) e sottraete TUTTE le trattenute (sia previdenziali che fiscali). Arrotondate il risultato all'intero più vicino. Questo è il Reddito Netto che funge da chiave di sblocco.",
    correctAnswer: "1200",
    hints: [
      { id: 1, text: "Guarda il totale delle Competenze (Lordo) e sottrai i valori nella colonna delle Trattenute." },
      { id: 2, text: "Lordo = 1500,00 €. Trattenute INPS = 137,85 €. IRPEF = 162,15 €." },
      { id: 3, text: "Calcolo: 1500 - 137,85 - 162,15 = 1200. Inserisci 1200." }
    ]
  },

  {
    id: 5,
    title: "Enigma 5: La Radice del Patto Sociale",
    description: "Manca una direttiva fondamentale nel core del sistema: l'obbligo civile che unisce tutti i cittadini.",
    educationalTidbit: "L'Articolo 2 della Costituzione richiede l'adempimento dei doveri inderogabili di carattere politico, economico e sociale. Senza di essa, il patto intergenerazionale crollerebbe.",
    mechanicType: "decode",
    question: "Sostantivo femminile (11 lettere). Definisce il vincolo etico e giuridico di reciproco sostegno tra i membri della società, essenziale per la tenuta del welfare. Ripristina le maglie mancanti.",
    correctAnswer: "SOLIDARIETA",
    hints: [
      { id: 1, text: "È un sentimento e un dovere costituzionale. Si contrappone all'individualismo estremo." },
      { id: 2, text: "La parola è composta dalle lettere S-O-L-I-D-A-R-I-E-T-A." },
      { id: 3, text: "Inserite D, A, E nelle posizioni vuote per comporre SOLIDARIETA." }
    ],
    mechanicData: {
      maskPositions: [4, 5, 8]
    }
  },

  {
    id: 6,
    title: "Enigma 6: Il Baluardo del Lavoratore",
    description: "ATTENZIONE! Il Boss 'Signor Evasore' tenta di deregolamentare il mercato imponendo clausole vessatorie ai lavoratori non tutelati.",
    educationalTidbit: "I Contratti Collettivi Nazionali di Lavoro (CCNL) stabiliscono i minimi salariali, le ferie e le tutele previdenziali inoppugnabili per interi settori produttivi.",
    mechanicType: "boss",
    question: "Quale istituto giuridico di natura sinallagmatica fissa i minimi tabellari inderogabili e obbliga il datore al versamento previdenziale INPS? (9 lettere)",
    correctAnswer: "CONTRATTO",
    hints: [
      { id: 1, text: "È un accordo vincolante tra le parti (sindacati e datori di lavoro)." },
      { id: 2, text: "Nel mondo del lavoro, ne esiste uno Collettivo e uno Individuale." },
      { id: 3, text: "La parola per distruggere il Boss è CONTRATTO." }
    ]
  },

  {
    id: 7,
    title: "Enigma 7: Il Teorema delle Competenze",
    description: "Per decifrare i flussi amministrativi statali, bisogna capire le competenze dei vari enti territoriali (Comuni, Regioni, Stato Centrale).",
    educationalTidbit: "Sancito dall'Art. 118 della Costituzione e tipico del diritto dell'Unione Europea, impone che le funzioni pubbliche vengano svolte dal livello di governo più vicino ai cittadini, delegando verso l'alto solo se necessario.",
    mechanicType: "decode",
    question: "Decifra l'anagramma del fondamentale principio per cui l'ente superiore interviene solo se quello inferiore non può farcela da solo: A D E I I I R S S S T U U",
    correctAnswer: "SUSSIDIARIETA",
    hints: [
      { id: 1, text: "È una parola molto lunga (13 lettere) che deriva da un aiuto che anticamente la legione romana forniva (i 'subsidiarii')." },
      { id: 2, text: "Inizia con 'SUSSIDIA' e finisce con 'RIETA'." },
      { id: 3, text: "La risposta esatta è SUSSIDIARIETA." }
    ]
  },

  {
    id: 8,
    title: "Enigma 8: Il Cifrario Istituzionale",
    description: "Una trasmissione del ministero della Giustizia contiene la password previdenziale cifrata.",
    educationalTidbit: "Nel diritto penale e civile italiano, le sentenze non sono definitive finché non si esauriscono i gradi di giudizio previsti dalla Costituzione: Primo Grado, Appello, e Cassazione.",
    mechanicType: "decode",
    question: "Decifra il testo 'JHWWLWR' applicando un Cifrario di Cesare con scorrimento all'indietro pari al numero totale dei gradi di giudizio presenti nel sistema legale italiano.",
    correctAnswer: "GETTITO",
    hints: [
      { id: 1, text: "In Italia i gradi di giudizio ordinari sono 3 (Tribunale, Appello, Cassazione). Sposta ogni lettera di JHWWLWR indietro di 3 posizioni nell'alfabeto." },
      { id: 2, text: "La 'J' torna indietro di 3 lettere e diventa 'G'." },
      { id: 3, text: "La decodifica svela il volume complessivo delle entrate fiscali: GETTITO." }
    ]
  },

  {
    id: 9,
    title: "Enigma 9: L'Aritmetica del Welfare",
    description: "I terminali di erogazione sono bloccati. Una stringa alfanumerica attende un valore trascendentale per definire le coperture finanziarie strutturali.",
    educationalTidbit: "Le coperture di un sistema devono essere precise al millesimo, come le costanti matematiche. Non esistono 'pasti gratis' in economia.",
    mechanicType: "icons",
    question: "Selezionate le tre componenti che, sommate, danno esattamente le prime tre cifre del Pi Greco (senza la virgola).",
    correctAnswer: "314",
    hints: [
      { id: 1, text: "Le prime tre cifre del Pi Greco (3,14) senza virgola formano il numero 314." },
      { id: 2, text: "Scegli tre tessere la cui somma fa esattamente 314." },
      { id: 3, text: "Seleziona Contributi Fissi (100) + Quota Variabile (200) + Rendimenti (14)." }
    ],
    mechanicData: {
      iconTessera: [
        { id: 1, label: "Contributi Fissi Obbligatori", val: 100, isCorrect: true, power: "Gestione di Base" },
        { id: 2, label: "Quota Flessibile Integrativa", val: 200, isCorrect: true, power: "Pensione Integrativa" },
        { id: 3, label: "Rendimenti Attuariali", val: 14, isCorrect: true, power: "Interessi maturati" },
        { id: 4, label: "Debito Pubblico Emesso", val: 50, isCorrect: false, power: "Fondi in prestito" },
        { id: 5, label: "Donazioni Filantropiche", val: 10, isCorrect: false, power: "Non strutturali" }
      ]
    }
  },

  {
    id: 10,
    title: "Enigma 10: Trasformazione Finanziaria",
    description: "L'accumulo dei versamenti nel sistema contributivo non basta. Per calcolare l'erogazione mensile, serve una formula di trasformazione rigorosa.",
    educationalTidbit: "Nel sistema previdenziale contributivo introdotto con la riforma Dini, la pensione annua è pari al montante contributivo totale moltiplicato per un determinato indicatore, che varia in base all'età del pensionamento.",
    mechanicType: "decode",
    question: "Qual è il nome di questo 'moltiplicatore' demografico ed economico che trasforma il montante accumulato nella rendita pensionistica? (12 lettere)",
    correctAnswer: "COEFFICIENTE",
    hints: [
      { id: 1, text: "In matematica è il fattore numerico che moltiplica un'incognita. Invia con 'COEFFI...'." },
      { id: 2, text: "La parola completa è COEFFICIENTE." },
      { id: 3, text: "Inserite COEFFICIENTE nella console di decodifica." }
    ]
  },

  {
    id: 11,
    title: "Enigma 11: La Difesa dall'Inflazione",
    description: "Siete al cuore della macchina finanziaria. Una minaccia fantasma chiamata 'inflazione' sta erodendo il potere d'acquisto dei pensionati del 2086.",
    educationalTidbit: "Per evitare che le pensioni perdano valore nel tempo a causa dell'aumento dei prezzi, la legge prevede un meccanismo tecnico-finanziario che adegua annualmente gli assegni sulla base degli indici ISTAT.",
    mechanicType: "decode",
    question: "Trovate il termine tecnico (12 lettere) che indica questo adeguamento all'inflazione per difendere il valore reale delle prestazioni sociali.",
    correctAnswer: "PEREQUAZIONE",
    hints: [
      { id: 1, text: "Significa 'rendere equo, uguagliare'. Inizia con PEREQ..." },
      { id: 2, text: "L'anagramma è E E E I O U A Z P Q R N." },
      { id: 3, text: "La risposta tecnica esatta è PEREQUAZIONE." }
    ]
  },

  {
    id: 12,
    title: "Enigma 12: Override di Sicurezza",
    description: "L'ultimo blocco crittografico richiede di inserire i parametri temporali e macroeconomici esatti del vostro viaggio.",
    educationalTidbit: "Un sistema informativo moderno (Welfare 4.0) elabora migliaia di indicatori: un cittadino consapevole conosce le sigle e i meccanismi che compongono l'economia nazionale.",
    mechanicType: "decode",
    question: "Stringa di sicurezza finale: Inserite l'acronimo della ricchezza prodotta da una nazione in un anno (P.I.L.), seguito dall'anno di svolgimento di questa missione temporale (2026) e infine la sigla dell'Istituto Nazionale per eccellenza (INPS).",
    correctAnswer: "PIL2026INPS",
    hints: [
      { id: 1, text: "Il Prodotto Interno Lordo si abbrevia con PIL." },
      { id: 2, text: "L'anno è il 2026 e l'ente è l'INPS." },
      { id: 3, text: "Unisci tutto senza spazi: PIL2026INPS." }
    ]
  }
];
