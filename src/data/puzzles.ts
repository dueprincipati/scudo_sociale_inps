import { Puzzle } from '../types';

export const puzzlesList: Puzzle[] = [
  {
    id: 1,
    title: "Enigma 1: Il Flusso Generazionale",
    description: "La macchina del tempo vi ha catapultati in un'epoca alternativa in cui anziani e lavoratori non si parlano più. Il motore del tempo, per ripartire, ha bisogno di bilanciare la 'Rete del Sostegno'. Per far funzionare il Welfare, dovrete capire che l'INPS funziona come un'incredibile staffetta di solidarietà!",
    educationalTidbit: "Il 'Patto tra Generazioni' (noto anche come sistema a ripartizione) prevede che i lavoratori di oggi paghino, tramite i propri contributi, le pensioni e l'assistenza di chi oggi è in pensione. Domani, quando voi lavorerete, sarete protetti dai contributi di chi lavorerà dopo di voi. È una catena indistruttibile di solidarietà umana!",
    mechanicType: "exclusion",
    question: "Leggi i 3 indizi sulla lavagna investigativa ed elimina le parole errate. Qual è la parola corretta?",
    correctAnswer: "PATTO",
    mechanicData: {
      options: ["TASSA", "REGALO", "FONDO", "PATTO"],
      clues: [
        "1. Non è un prelievo forzoso a fondo perduto senza ritorno.",
        "2. Non è un dono gratuito elargito senza regole.",
        "3. Non è un salvadanaio chiuso in cui metti i soldi solo per te stesso."
      ]
    },
    answerVariants: [
      "PATTO TRA GENERAZIONI",
      "PATTO GENERAZIONALE",
      "IL PATTO TRA GENERAZIONI",
      "IL PATTO GENERAZIONALE",
      "PATTO TRA LE GENERAZIONI",
      "IL PATTO TRA LE GENERAZIONI",
      "PATTO INTERGENERAZIONALE",
      "IL PATTO INTERGENERAZIONALE",
      "PATTO TRA GENERAZIONE",
      "IL PATTO TRA GENERAZIONE",
      "PATTO TRA LE GENERAZIONE",
      "IL PATTO TRA LE GENERAZIONE",
      "PATTO DELLE GENERAZIONI",
      "IL PATTO DELLE GENERAZIONI"
    ],
    hints: [
      { id: 1, text: "Guarda le lettere illuminate lungo la linea di flusso che connette i lavoratori del presente con i cittadini del passato." },
      { id: 2, text: "La parola descrive un accordo d'onore e solidarietà... un '_____ tra Generazioni'." },
      { id: 3, text: "La parola segreta è proprio 'PATTO'! Digitatela in MAIUSCOLO per sbloccare il primo trasmettitore!" }
    ]
  },
  {
    id: 2,
    title: "Enigma 2: Il Salvadanaio della Sicurezza",
    description: "Il computer di bordo richiede la chiave d'accesso al 'Salvadanaio dei Superpoteri'. Molti credono che i contributi pagati all'INPS siano solo tasse perse nel vuoto, ma in realtà sono PE (Punti Esperienza) che sbloccano dei veri e propri Superpoteri di Protezione per la vostra vita!",
    educationalTidbit: "I contributi previdenziali non sono tasse generiche, ma una quota dello stipendio messa da parte per proteggerci. La previdenza in Italia nasce ufficialmente nel 1898 con la fondazione della Cassa Nazionale per l'Invalidità e la Vecchiaia degli Operai. Questo fondo collettivo pagava le pensioni e garantiva assistenza in caso di malattia, infortuni, maternità e vecchiaia. Abbonamenti a servizi di streaming o sconti commerciali, invece, non sono diritti sociali!",
    mechanicType: "icons",
    question: "Seleziona ESATTAMENTE e SOLO i 4 veri Superpoteri garantiti dai contributi previdenziali. Somma i codici temporali delle tessere corrette per sbloccare la chiave numerica! (La risposta è un anno storico composto da 4 cifre).",
    correctAnswer: "1898",
    hints: [
      { id: 1, text: "I 4 veri superpoteri sono: Pensione di Vecchiaia, Sostegno in Maternità/Paternità, Indennità di Malattia e Sicurezza Infortuni. Scarta i bonus futili come 'Netflix gratis' o 'Sconto Videogame'!" },
      { id: 2, text: "Somma i numeri associati alle 4 tessere corrette: cerca i valori più alti tra le tessere che rappresentano vere tutele e somma solo quelli." },
      { id: 3, text: "La somma vi porterà a un anno storico importante per la nascita di alcune tutele previdenziali in Italia. Controlla bene i calcoli!" }
    ]
  },
  {
    id: 3,
    title: "Enigma 3: La Bussola della Costituzione",
    description: "Il computer quantistico della macchina del tempo esige di verificare le radici storiche dello Scudo Sociale. Tutto ha inizio nel 1948 con l'entrata in vigore della carta costituzionale dello Stato italiano! C'è una norma fondamentale che sancisce una promessa solenne della Repubblica: proteggere ogni cittadino che incontra gravi difficoltà nella vita.",
    educationalTidbit: "Un Articolo fondamentale della Costituzione Italiana funge da scudo per i più deboli: stabilisce che ogni cittadino inabile al lavoro o privo di mezzi ha diritto al sostegno, e che i lavoratori hanno diritto alla previdenza in caso di infortunio, malattia, invalidità, disoccupazione e vecchiaia. È il fondamento etico del nostro sistema sociale!",
    mechanicType: "constitution",
    question: "Identifica il numero di questo pilastro costituzionale. Qual è l'articolo della Costituzione Italiana che garantisce l'assistenza e la previdenza sociale ai cittadini svantaggiati o inabili? (Digita il numero corrispondente).",
    correctAnswer: "38",
    hints: [
      { id: 1, text: "I principi di questo articolo sono citati esplicitamente nella pillola di Educazione Civica qui sopra. Ora devi trovarne il numero esatto esplorando la Costituzione!" },
      { id: 2, text: "Il suo numero è maggiore dell'articolo che tutela la salute (Art. 32) e minore di quello sul pagamento delle tasse (Art. 53)." },
      { id: 3, text: "La somma delle due cifre che compongono questo articolo fa 11." }
    ]
  },
  {
    id: 4,
    title: "Enigma 4: La Busta Paga e lo Scudo del Lavoro",
    description: "Incontrate un ragazzo che ha appena iniziato a lavorare: 'Il mio stipendio sulla carta (lordo) è di 1500 euro, ma in banca ricevo un bonifico (netto) di 1200 euro! Perché mancano 300 euro, dove vanno a finire questi soldi? Servono forse a finanziare tutele e assicurazioni per il mio futuro lavorativo?'. Aiutatelo a scoprire il misterioso scudo di riserva che sta finanziando ogni mese!",
    educationalTidbit: "La differenza tra cifra lorda e netta in busta paga non è un furto, ma rappresenta in gran parte i contributi previdenziali INPS! Questi soldi formano una polizza collettiva. Uno dei servizi principali finanziati è la protezione mensile contro la disoccupazione involontaria. Per scoprire la parola chiave, trova la sigla formata dalle lettere iniziali della sua denominazione ufficiale: **N**uova **A**ssicurazione **S**ociale **P**er l'**I**mpiego.",
    mechanicType: "payslip",
    question: "Trova le iniziali della denominazione ufficiale del sussidio di disoccupazione per svelare l'acronimo di 5 lettere: N _ _ _ I (Scrivi in MAIUSCOLO).",
    correctAnswer: "NASPI",
    hints: [
      { id: 1, text: "La sigla è l'acronimo di 'Nuova Assicurazione Sociale per l'Impiego'." },
      { id: 2, text: "Prendi la prima letterea di ciascuna parola: Nuova (N), Assicurazione (A), Sociale (S), Per l' (P), Impiego (I)." },
      { id: 3, text: "Unisci le iniziali delle parole: Nuova Assicurazione Sociale Per l'Impiego. Otterrete la sigla di 5 lettere da inserire." }
    ]
  },
  {
    id: 5,
    title: "Enigma 5: La Catena del Welfare",
    description: "Una tempesta magnetica scatenata dall'indifferenza rischia di far crollare le difese dei cittadini più deboli. Per ricostruire la 'Catena del Welfare', dobbiamo capire un concetto fondamentale: non siamo isole! Se qualcuno perde il lavoro o si fa male, l'intera comunità interviene per sostenerlo.",
    educationalTidbit: "La previdenza sociale si fonda sulla solidarietà nazionale. Chi ha di più contribuisce di più, e chi si trova in condizioni di grave difficoltà (disoccupazione, invalidità, povertà) riceve speciali aiuti. Questo sistema fa sì che nessuno sia lasciato indietro. Sconfigge la povertà e favorisce l'uguaglianza sociale!",
    mechanicType: "decode",
    question: "Trova e inserisci i frammenti mancanti per ricomporre la Catena del Welfare e svelare la parola magica: S _ _ _ _ _ _ _ _ _ _ _ (Scrivi in MAIUSCOLO).",
    correctAnswer: "SOLIDARIETA",
    hints: [
      { id: 1, text: "La parola descrive un valore dell'aiuto reciproco e dell'unione nelle difficoltà. Ha 11 lettere e inizia con la lettera S." },
      { id: 2, text: "È il contrario di egoismo o indifferenza. Pensa a come si definisce il patto di mutuo aiuto: S - O - L - I - ? - ? - R - I - ? - T - A." },
      { id: 3, text: "Usa i tasti lettera sotto la catena per inserire D, A ed E nelle maglie vuote. La parola finale descrive il sentimento di fratellanza collettiva." }
    ],
    mechanicData: {
      maskPositions: [4, 5, 8]
    }
  },
  {
    id: 6,
    title: "Enigma 6: La Battaglia contro il Lavoro Nero",
    description: "ATTENZIONE! Il Boss 'Signor Evasore' ha inviato il virus 'Lavoro Nero' per infettare la sala comandi! Vi promette un mucchio di monete subito, ma ssshhh... non vi farà firmare alcun foglio e vi ruberà lo Scudo Sociale del Futuro. Se vi farete male sul lavoro o vi ammalerete, verrete gettati via senza un soldo!",
    educationalTidbit: "Il lavoro nero è il nemico numero uno della società e di voi ragazzi. Lavorare in nero sembra conveniente all'inizio (vi danno soldi in contanti e non si pagano tasse immediate), ma in realtà vi toglie ogni protezione: zero contributi pensionistici, zero tutele se vi fate male, zero congedi e zero diritti. È illegale e distrugge il welfare di tutti, perché l'evasore non contribuisce alla scuola, agli ospedali e alle pensioni pubbliche!",
    mechanicType: "boss",
    question: "Per sigillare il portale e cacciare l'Evasore, dovrete attivare e registrare il documento legale che garantisce diritti, orari equi, paga minima e contributi automatici. Qual è il nome di questo 'Scudo d'Accordo' stipulato tra lavoratore e datore di lavoro? (C _ _ _ _ _ _ _ _)",
    correctAnswer: "CONTRATTO",
    hints: [
      { id: 1, text: "È un pezzo di carta fondamentale. Senza di esso si lavora 'in nero'. Con esso, invece, sarete cittadini protetti a norma di legge." },
      { id: 2, text: "Inizia con 'CON...' e finisce con '...ATTO'. Si firma per stabilire quante ore dovrete lavorare, quanto sarete pagati e i vostri contributi INPS." },
      { id: 3, text: "La super-parola per distruggere il Boss è CONTRATTO. Firmando un regolare contratto sbloccate il futuro sicuro!" }
    ]
  }
  ,
  {
    id: 7,
    title: "Enigma 7: Il Labirinto dei Contributi",
    description: "La macchina del tempo ora vi colloca in un labirinto di conti: per procedere dovrete bilanciare entrate e uscite di più nodi contemporaneamente, trovando la parola che riassume la sostenibilità del sistema.",
    educationalTidbit: "La sostenibilità del sistema pensionistico dipende dal rapporto tra lavoratori attivi e beneficiari. Politiche efficaci e contributi regolari mantengono il sistema in equilibrio e garantiscono pensioni future.",
    mechanicType: "decode",
    question: "Decifra l'anagramma per scoprire il valore-guida del sistema: S I B I L I T A O S S T E N (Rispondi in MAIUSCOLO senza spazi).",
    correctAnswer: "SOSTENIBILITA",
    hints: [
      { id: 1, text: "È una parola molto lunga (13 lettere) che indica la capacità di durare nel tempo." },
      { id: 2, text: "Inizia con 'SOSTENI' e finisce con 'TA'." },
      { id: 3, text: "La parola è SOSTENIBILITA." }
    ]
  },

  {
    id: 8,
    title: "Enigma 8: Il Cifrario della Previdenza",
    description: "Un messaggio cifrato chiede di dimostrare che capite come funziona il sistema: decifrate per scoprire la parola chiave che apre il forziere.",
    educationalTidbit: "I messaggi cifrati ricordano che la comunicazione chiara fra istituzioni e cittadini è fondamentale: i servizi funzionano se le regole sono comprensibili e accessibili.",
    mechanicType: "decode",
    question: "Decifra il testo con uno shift di 6 caratteri (Cifrario di Cesare). Il messaggio originale (ma trasformato) è: 'IUTZXOH'. Trova la parola in MAIUSCOLO.",
    correctAnswer: "CONTRIB",
    hints: [
      { id: 1, text: "Prova a spostare ogni lettera 6 posizioni indietro nell'alfabeto (A<-G, B<-H ...)." },
      { id: 2, text: "La parola decifrata è una radice di una parola più lunga: riguarda ciò che i lavoratori versano ogni mese." },
      { id: 3, text: "La parola da inserire è CONTRIB (parte di CONTRIBUTI)." }
    ]
  },

  {
    id: 9,
    title: "Enigma 9: L'Equazione del Futuro",
    description: "Un vecchio registratore chiede di risolvere un calcolo composto che simula l'accumulo di contributi e interessi: dimostrate che sapete ragionare per passaggi logici.",
    educationalTidbit: "I contributi investiti e l'interesse tecnico determinano la sostenibilità a lungo termine. Capire la matematica dietro ai conti pubblici aiuta a interpretare le scelte politiche.",
    mechanicType: "icons",
    question: "Quali sono le 3 componenti strutturali (non temporanee né emergenziali) che garantiscono la sostenibilità a lungo termine? Seleziona le 3 tessere corrette. La loro somma genererà la chiave numerica di sblocco.",
    correctAnswer: "2650",
    hints: [
      { id: 1, text: "Evita le misure 'temporanee' o i fondi di 'emergenza': la previdenza si basa su fondamenta solide e a lungo termine." },
      { id: 2, text: "Devi selezionare: Fondo Storico, Fondi di Investimento e Accantonamenti Tecnici." },
      { id: 3, text: "Selezionando queste 3 tessere otterrai la somma di 2650. Questo è il codice da inserire!" }
    ]
    ,
    mechanicData: {
      iconTessera: [
        { id: 1, label: "Fondo Previdenziale Storico", val: 1500, isCorrect: true, power: "Base di contribuzione storica" },
        { id: 2, label: "Fondi di Investimento Pubblico", val: 800, isCorrect: true, power: "Rendimento a lungo termine" },
        { id: 3, label: "Accantonamenti Tecnici", val: 350, isCorrect: true, power: "Cuscinetto per le variabilità" },
        { id: 4, label: "Bonus Temporaneo", val: 120, isCorrect: false, power: "Incentivo momentaneo, non contributivo" },
        { id: 5, label: "Riserva Emergenza", val: 200, isCorrect: false, power: "Somma di standby" }
      ]
    }
  },

  {
    id: 10,
    title: "Enigma 10: Lo Specchio delle Politiche",
    description: "Davanti a voi due politiche alternative: una aumenta le tasse per sostenere subito i benefici, l'altra incentiva l'occupazione per aumentare i contributi futuri. Quale parola sintetizza la scelta che preserva diritti e crescita insieme?",
    educationalTidbit: "Bilanciare equità e crescita è la sfida delle politiche pubbliche. Strategie miste possono coniugare protezione sociale e sviluppo economico.",
    mechanicType: "decode",
    question: "Per coniugare diritti e crescita, non basta spendere: bisogna destinare le risorse di oggi per generare valore domani. Trova la parola di 12 lettere (inizia con IN e finisce con TO) che definisce questa fondamentale operazione economica e sociale.",
    correctAnswer: "INVESTIMENTO",
    hints: [
      { id: 1, text: "È l'opposto di 'spesa improduttiva'. In finanza, lo fai per far fruttare il capitale nel tempo." },
      { id: 2, text: "Unendo le parole 'IN', 'VESTI' e 'MENTO' otterrai la soluzione." },
      { id: 3, text: "La parola esatta da digitare è INVESTIMENTO." }
    ]
  },

  {
    id: 11,
    title: "Enigma 11: Il Cuore del Sistema",
    description: "Siete quasi giunti al termine. Il portale temporale vi chiede di identificare il nome completo di questa imponente macchina di solidarietà e protezione pubblica che avete contribuito a riparare.",
    educationalTidbit: "Il 'Welfare State' (o Stato Sociale) è il sistema attraverso cui una nazione si prende cura dei suoi cittadini, garantendo salute, previdenza, assistenza e istruzione pubblica per tutti.",
    mechanicType: "decode",
    question: "Trovate la definizione italiana di 12 lettere (divise in due parole) che traduce il concetto di 'Welfare State'. Inizia con 'STA' e finisce con 'ALE'. (Digitate le due parole separate da uno spazio).",
    correctAnswer: "STATO SOCIALE",
    hints: [
      { id: 1, text: "È composto da due parole. La prima è sinonimo di 'Nazione', la seconda significa 'relativo alla società'." },
      { id: 2, text: "L'anagramma è: A A C E I L O O S S T T." },
      { id: 3, text: "La risposta esatta da digitare è STATO SOCIALE." }
    ]
  },

  {
    id: 12,
    title: "Enigma 12: La Sfida Finale — Prova Combinata",
    description: "Per ultimare la rigenerazione dello Scudo dovrete risolvere un enigma che richiede logica, conoscenza e attenzione ai dettagli: combinazione di singole lettere, somma numerica e scelta istituzionale.",
    educationalTidbit: "Le sfide complesse richiedono pluralità di strumenti: alfabetizzazione civica, competenze numeriche e capacità critica servono insieme per comprendere il sistema di protezione sociale.",
    mechanicType: "decode",
    question: "Combinazione finale: prendete la 1° lettera di 'PENSIONE', sommate le cifre di 2026 e scegliete l'articolo della Costituzione che garantisce l'assistenza (inserite tutto unito, MAIUSCOLO).",
    correctAnswer: "P10ART38",
    hints: [
      { id: 1, text: "1° lettera di 'PENSIONE' = P. Somma cifre 2+0+2+6 = 10. L'articolo chiave è 38." },
      { id: 2, text: "Unisci tutto senza spazi: P + 10 + ART + 38 → P10ART38." },
      { id: 3, text: "La stringa corretta da digitare è P10ART38." }
    ]
  }
];
