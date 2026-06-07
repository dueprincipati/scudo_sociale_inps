import { Puzzle } from '../types';

export const puzzlesList: Puzzle[] = [
  {
    id: 1,
    title: "Enigma 1: Modelli Macroeconomici",
    description: "Per riattivare i database storici dell'INPS, dovete calibrare l'architettura del sistema. Nel 2086 si è persa la memoria di come le vecchie generazioni mantenevano quelle nuove.",
    educationalTidbit: "In Italia vige un sistema 'a ripartizione' (pay-as-you-go): i contributi dei lavoratori attivi finanziano le pensioni correnti, basandosi su un patto intergenerazionale. Si differenzia dal sistema 'a capitalizzazione' dove ognuno accantona per sé in fondi privati.",
    mechanicType: "exclusion",
    question: "Identifica il vero pilastro del sistema pubblico italiano scartando le definizioni errate o incompatibili con l'equilibrio strutturale.",
    correctAnswer: "RIPARTIZIONE",
    hints: [
      { id: 1, text: "Non è un sistema basato su conti individuali azionari (Capitalizzazione)." },
      { id: 2, text: "Non si basa sull'emissione incontrollata di moneta o su deficit cronico." },
      { id: 3, text: "La risposta è il sistema in cui le risorse vengono 'ripartite' tra le generazioni." }
    ],
    mechanicData: {
      clues: [
        "Non è un sistema basato su conti individuali azionari (Capitalizzazione).",
        "Non si basa sull'emissione incontrollata di moneta o su deficit cronico.",
        "Non è un sussidio incondizionato, né si regge sull'indebitamento estero continuo."
      ],
      options: [
        "CAPITALIZZAZIONE",
        "STAMPA MONETARIA",
        "SUSSIDIO UNIVERSALE",
        "DEBITO ESTERO",
        "RIPARTIZIONE"
      ]
    }
  },

  {
    id: 2,
    title: "Enigma 2: Il Bilancio Attuariale",
    description: "Il calcolatore quantistico ha bisogno dei parametri esatti di bilancio. Dovete inserire 4 variabili macroeconomiche per calibrare il gettito.",
    educationalTidbit: "Il bilancio previdenziale tiene conto di entrate (contributi di lavoratori e imprese, trasferimenti statali) e uscite o svalutazioni (inflazione). L'equilibrio richiede calcoli complessi.",
    mechanicType: "icons",
    question: "Seleziona le 4 variabili corrette che, sommate algebricamente, forniscono un surplus attuariale esattamente pari a 1550.",
    correctAnswer: "1550",
    hints: [
      { id: 1, text: "Attenzione ai valori negativi: l'inflazione riduce il valore reale dei fondi." },
      { id: 2, text: "Dovete sommare le tre voci positive e sottrarre quella negativa." },
      { id: 3, text: "La combinazione è: Lavoratori (850) + Imprese (400) + Stato (500) - Inflazione (-200)." }
    ],
    mechanicData: {
      iconTessera: [
        { id: 1, label: "Quota Lavoratori Dipendenti", val: 850, isCorrect: true, power: "Contributi base" },
        { id: 2, label: "Quota Datoriale", val: 400, isCorrect: true, power: "Contributi delle aziende" },
        { id: 3, label: "Trasferimenti Statali", val: 500, isCorrect: true, power: "Intervento fiscalità generale" },
        { id: 4, label: "Inflazione e Svalutazione", val: -200, isCorrect: true, power: "Erosione del capitale" },
        { id: 5, label: "Finanza Derivata Speculativa", val: 300, isCorrect: false, power: "Rischio inaccettabile" },
        { id: 6, label: "Taglio Lineare Servizi", val: -50, isCorrect: false, power: "Austerità eccessiva" }
      ]
    }
  },

  {
    id: 3,
    title: "Enigma 3: Crittografia Costituzionale",
    description: "I diritti inalienabili sono criptati. Per decifrarli, dovrete combinare matematicamente le disposizioni della Costituzione Italiana.",
    educationalTidbit: "La Costituzione è un sistema interconnesso: l'Articolo 1 stabilisce il fondamento sul lavoro, l'Articolo 32 la salute, e l'Articolo 38 chiude il cerchio definendo i diritti previdenziali e assistenziali.",
    mechanicType: "constitution",
    question: "Il numero dell'Articolo che tutela l'assistenza sociale è un'equazione. Somma il numero dell'Articolo che tutela la salute (Art. ??) al numero dell'Articolo che sancisce la Repubblica fondata sul lavoro (Art. ??) e aggiungi 5. Seleziona l'articolo risultante.",
    correctAnswer: "38",
    hints: [
      { id: 1, text: "Trova prima l'Articolo sulla Salute e quello sul Lavoro." },
      { id: 2, text: "Salute = Art. 32. Lavoro = Art. 1." },
      { id: 3, text: "L'equazione è 32 + 1 + 5 = 38. Seleziona l'Articolo 38." }
    ]
  },

  {
    id: 4,
    title: "Enigma 4: L'Analisi Fiscale",
    description: "I terminali di erogazione sono bloccati da un errore di calcolo dell'imponibile. È necessario ricalcolare esattamente l'aliquota di trattenuta ai fini FAP (Fondo Pensioni Lavoratori Dipendenti).",
    educationalTidbit: "L'aliquota contributiva generale a carico del lavoratore dipendente è del 9,19% (mentre il resto, circa il 23,81%, è a carico del datore di lavoro). Saper leggere la busta paga è fondamentale per la cittadinanza economica.",
    mechanicType: "payslip",
    question: "Individuate l'imponibile lordo nel documento. Calcolate l'aliquota contributiva standard a carico del lavoratore (9,19%) e arrotondate l'importo per ottenere la trattenuta INPS esatta (ignorando i decimali finali). Inserite questa cifra come codice di sblocco.",
    correctAnswer: "137",
    hints: [
      { id: 1, text: "L'imponibile lordo mostrato è 1500,00 €. Dovete calcolarne il 9,19%." },
      { id: 2, text: "Moltiplicate 1500 per 0,0919. Otterrete 137,85." },
      { id: 3, text: "Prendete la parte intera: 137. Inserite 137 per sbloccare." }
    ]
  },

  {
    id: 5,
    title: "Enigma 5: Il Principio Inderogabile",
    description: "Manca una direttiva fondamentale nel core del sistema: l'obbligo civile che unisce tutti i cittadini.",
    educationalTidbit: "L'Articolo 2 della Costituzione richiede l'adempimento dei doveri inderogabili di solidarietà politica, economica e sociale. Senza di essa, le fasce più deboli rimarrebbero isolate.",
    mechanicType: "decode",
    question: "Sostantivo femminile (11 lettere). Definisce il vincolo etico e giuridico di reciproco sostegno tra i membri della società, essenziale per la tenuta del welfare. Ripristina le maglie mancanti.",
    correctAnswer: "SOLIDARIETA",
    hints: [
      { id: 1, text: "È un sentimento e un dovere costituzionale. Si contrappone all'individualismo." },
      { id: 2, text: "La parola è composta dalle lettere S-O-L-I-D-A-R-I-E-T-A." },
      { id: 3, text: "Inserite D, A, E nelle posizioni vuote per comporre SOLIDARIETA." }
    ],
    mechanicData: {
      maskPositions: [4, 5, 8]
    }
  },

  {
    id: 6,
    title: "Enigma 6: Evasione e Dumping Sociale",
    description: "ATTENZIONE! Il Boss 'Signor Evasore' tenta di deregolamentare il mercato introducendo il virus del 'Dumping Sociale'. Vi propone accordi in deroga senza tutele, mascherati da falsa flessibilità.",
    educationalTidbit: "Il lavoro sommerso e il dumping sociale minano l'intero impianto macroeconomico: riducono le entrate fiscali, creano concorrenza sleale tra le aziende e lasciano i lavoratori senza coperture previdenziali e sanitarie.",
    mechanicType: "boss",
    question: "Per sconfiggere l'elusione, dovete riattivare lo strumento giuridico sinallagmatico che vincola datore e lavoratore al rispetto della normativa giuslavoristica e dei minimi tabellari. Qual è questo istituto? (9 lettere)",
    correctAnswer: "CONTRATTO",
    hints: [
      { id: 1, text: "È un accordo vincolante tra due o più parti per costituire, regolare o estinguere un rapporto giuridico patrimoniale." },
      { id: 2, text: "Nel mondo del lavoro, ne esiste uno Nazionale Collettivo (CCNL) e uno Individuale." },
      { id: 3, text: "La super-parola per distruggere il Boss è CONTRATTO." }
    ]
  },

  {
    id: 7,
    title: "Enigma 7: Il Teorema dell'Equilibrio",
    description: "Per calibrare i flussi temporali a lungo termine, dovete decifrare il nome dell'indicatore di salute attuariale di un sistema pubblico.",
    educationalTidbit: "La transizione demografica (invecchiamento della popolazione) richiede continue riforme per garantire l'equità intergenerazionale e mantenere il debito pubblico sotto controllo nel lunghissimo periodo.",
    mechanicType: "decode",
    question: "Decifra l'anagramma macroeconomico: S I B I L I T A O S S T E N (13 lettere). Indica la capacità del bilancio di far fronte agli impegni futuri senza collassare.",
    correctAnswer: "SOSTENIBILITA",
    hints: [
      { id: 1, text: "Deriva dal verbo 'sostenere'." },
      { id: 2, text: "Inizia con 'SOSTEN' e finisce con 'ITA'." },
      { id: 3, text: "La risposta esatta è SOSTENIBILITA." }
    ]
  },

  {
    id: 8,
    title: "Enigma 8: Cifrario Shift-12",
    description: "Una trasmissione di emergenza è stata intercettata. È protetta da un cifrario algoritmico basato sull'annualità fiscale.",
    educationalTidbit: "La criptografia protegge i dati sensibili, così come le norme proteggono la privacy fiscale e previdenziale dei cittadini.",
    mechanicType: "decode",
    question: "Decifra il testo 'OAZFDUQ' applicando un Cifrario di Cesare con scorrimento all'indietro pari ai mesi di una normale annualità (12 posizioni).",
    correctAnswer: "CONTRIB",
    hints: [
      { id: 1, text: "Prendi ogni lettera di OAZFDUQ e torna indietro di 12 lettere nell'alfabeto italiano/internazionale." },
      { id: 2, text: "La 'O' meno 12 posizioni diventa 'C'. La 'A' retrocede fino alla 'O'." },
      { id: 3, text: "La decodifica genera la radice della parola: CONTRIB." }
    ]
  },

  {
    id: 9,
    title: "Enigma 9: La Politica Fiscale",
    description: "I terminali vi chiedono di definire le coperture finanziarie strutturali per varare una riforma del Welfare State.",
    educationalTidbit: "Le prestazioni previdenziali e assistenziali sono coperte non solo dai contributi diretti dei lavoratori, ma anche dalla fiscalità generale (IRPEF, IRES, IVA) gestita dal Ministero dell'Economia.",
    mechanicType: "icons",
    question: "Identificate le 3 componenti finanziarie strutturali che finanziano la previdenza ed assistenza pubblica, escludendo condoni o prestiti temporanei. La loro somma darà la chiave (2650).",
    correctAnswer: "2650",
    hints: [
      { id: 1, text: "Dovete escludere il 'Condono Edilizio' e la 'Stampa Moneta'. Queste non sono coperture strutturali." },
      { id: 2, text: "Scegliete Gettito Contributivo, Fiscalità Generale e Rendimenti." },
      { id: 3, text: "Selezionando i tre valori corretti si otterrà 2650." }
    ],
    mechanicData: {
      iconTessera: [
        { id: 1, label: "Gettito Contributivo Diretto", val: 1500, isCorrect: true, power: "Premi base" },
        { id: 2, label: "Rendimenti Finanziari", val: 800, isCorrect: true, power: "Gestione del capitale" },
        { id: 3, label: "Fiscalità Generale", val: 350, isCorrect: true, power: "Tassazione progressiva" },
        { id: 4, label: "Stampa Moneta a Debito", val: 120, isCorrect: false, power: "Copertura fittizia" },
        { id: 5, label: "Condono Edilizio / Fiscale", val: 200, isCorrect: false, power: "Entrata una tantum" }
      ]
    }
  },

  {
    id: 10,
    title: "Enigma 10: Moltiplicatore Sociale",
    description: "Davanti a voi due modelli di spesa pubblica. Uno genera inflazione, l'altro produce capitale umano e crescita di lungo periodo.",
    educationalTidbit: "Le politiche attive per il lavoro, la formazione, e la sanità non sono semplici 'costi' a bilancio, ma generano un moltiplicatore: aumentano la produttività futura del Paese.",
    mechanicType: "decode",
    question: "Quale termine di 12 lettere definisce l'impiego di risorse in beni strumentali o capitale umano per ottenere un maggior prodotto futuro? Unisci i frammenti: INVE + STIM + ENTO.",
    correctAnswer: "INVESTIMENTO",
    hints: [
      { id: 1, text: "In economia aziendale indica l'acquisto di beni durevoli. Nel welfare, indica la formazione dei cittadini." },
      { id: 2, text: "Basta leggere bene i frammenti della domanda." },
      { id: 3, text: "La parola è INVESTIMENTO." }
    ]
  },

  {
    id: 11,
    title: "Enigma 11: Architettura Istituzionale",
    description: "Siete quasi giunti al termine. Il portale temporale vi chiede di identificare la terminologia anglosassone ufficiale di questo modello politico e sociale universale.",
    educationalTidbit: "Nato nell'Europa del dopoguerra (Rapporto Beveridge, 1942), il concetto definisce uno Stato che interviene attivamente per garantire standard minimi di reddito, alimentazione, salute e sicurezza.",
    mechanicType: "decode",
    question: "Traducete in lingua inglese il concetto di 'Stato Sociale'. Sono due parole, per un totale di 12 lettere (escluso lo spazio).",
    correctAnswer: "WELFARE STATE",
    hints: [
      { id: 1, text: "La prima parola significa 'benessere' in inglese." },
      { id: 2, text: "La seconda parola significa 'Stato'." },
      { id: 3, text: "Digita WELFARE STATE (con lo spazio al centro)." }
    ]
  },

  {
    id: 12,
    title: "Enigma 12: Override di Sistema",
    description: "L'ultimo blocco crittografico richiede la padronanza di tutte le variabili: acronimi istituzionali, aritmetica di base e articoli costituzionali.",
    educationalTidbit: "Un cittadino consapevole sa collegare le competenze linguistiche, quelle matematiche e quelle giuridiche. Questa è l'essenza dell'Educazione Civica.",
    mechanicType: "decode",
    question: "Stringa di sblocco: Iniziale della prestazione pensionistica Invalidità/Vecchiaia/Superstiti (I) + il risultato della divisione 5000 / 500 + la sigla dell'istituto (INPS) + l'Articolo Costituzionale sull'assistenza. Formato: I10INPS38",
    correctAnswer: "I10INPS38",
    hints: [
      { id: 1, text: "Analizza passo passo: Iniziale di Invalidità (I). 5000 / 500 = 10." },
      { id: 2, text: "La sigla dell'istituto è INPS. L'Articolo è il 38 (visto nell'Enigma 3)." },
      { id: 3, text: "Unisci tutto senza spazi: I10INPS38." }
    ]
  }
];
