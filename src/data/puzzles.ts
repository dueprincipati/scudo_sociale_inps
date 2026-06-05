import { Puzzle } from '../types';

export const puzzlesList: Puzzle[] = [
  {
    id: 1,
    title: "Enigma 1: Il Flusso Generazionale",
    description: "La macchina del tempo vi ha catapultati in un'epoca alternativa in cui anziani e lavoratori non si parlano più. Il motore del tempo, per ripartire, ha bisogno di bilanciare la 'Rete del Sostegno'. Per far funzionare il Welfare, devi capire che l'INPS funziona come un'incredibile staffetta di solidarietà!",
    educationalTidbit: "Il 'Patto tra Generazioni' (noto anche come sistema a ripartizione) prevede che i lavoratori di oggi paghino, tramite i propri contributi, le pensioni e l'assistenza di chi oggi è in pensione. Domani, quando voi lavorerete, sarete protetti dai contributi di chi lavorerà dopo di voi. È una catena indistruttibile di solidarietà umana!",
    mechanicType: "balance",
    question: "Segui il flusso: se i LAVORATORI attivi versano ENERGIA nello Scudo e i PENSIONATI la ricevono, quale parola chiave sancisce questo legame indissolubile nel tempo? (Trova la parola nascosta decifrando le lettere collegate al flusso attivo: P - A - T - T - O)",
    correctAnswer: "PATTO",
    hints: [
      { id: 1, text: "Guarda le lettere illuminate lungo la linea di flusso che connette i lavoratori del presente con i cittadini del passato." },
      { id: 2, text: "La parola descrive un accordo d'onore e solidarietà... un '_____ tra Generazioni'." },
      { id: 3, text: "La parola segreta è proprio 'PATTO'! Digitala a lettere maiuscole per sbloccare il primo trasmettitore!" }
    ]
  },
  {
    id: 2,
    title: "Enigma 2: Il Salvadanaio della Sicurezza",
    description: "Il computer di bordo richiede la chiave d'accesso al 'Salvadanaio dei Superpoteri'. Molti credono che i contributi pagati all'INPS siano solo tasse perse nel vuoto, ma in realtà sono PE (Punti Esperienza) che sbloccano dei veri e propri Superpoteri di Protezione per la tua vita!",
    educationalTidbit: "I contributi previdenziali non sono tasse generiche, ma una quota dello stipendio messa da parte per proteggerci. Quando ti ammali (Indennità di Malattia), se hai un infortunio lavorando (Assicurazione), quando diventi mamma o papà (Maternità) o quando sarai anziano (Pensione), l'INPS sblocca il salvadanaio per garantirti stipendio e cure gratuite. Sconto videogame e Netflix gratis, invece, non fanno parte delle tutele sociali!",
    mechanicType: "icons",
    question: "Seleziona ESATTAMENTE e SOLO i 4 veri Superpoteri garantiti dai contributi previdenziali. Somma i codici temporali delle tessere corrette per sbloccare la chiave numerica! (La risposta è un anno storico composto da 4 cifre).",
    correctAnswer: "1898",
    hints: [
      { id: 1, text: "I 4 veri superpoteri sono: Pensione di Vecchiaia, Sostegno in Maternità/Paternità, Indennità di Malattia e Sicurezza Infortuni. Scarta i bonus futili come 'Netflix gratis' o 'Sconto Videogame'!" },
      { id: 2, text: "Somma i numeri associati alle 4 tessere corrette: Pensione (500) + Malattia (400) + Infortuni (300) + Maternità (698). Fai bene i calcoli!" },
      { id: 3, text: "La somma matematica è 1898. Curiosità: il 1898 è proprio l'anno in cui è nata la Previdenza Sociale in Italia!" }
    ]
  },
  {
    id: 3,
    title: "Enigma 3: La Bussola della Costituzione",
    description: "Il computer quantistico della macchina del tempo esige di verificare le radici storiche dello Scudo Sociale. Tutto ha inizio nel 1948 con l'entrata in vigore della legge fondamentale dello Stato italiano! C'è un articolo fondamentale che sancisce una promessa solenne della Repubblica: proteggere ogni cittadino che incontra gravi difficoltà nella vita.",
    educationalTidbit: "L'Articolo 38 della Costituzione Italiana è lo scudo dei più deboli: stabilisce che ogni cittadino inabile al lavoro o privo di mezzi ha diritto al sostegno, e che i lavoratori hanno diritto alla previdenza in caso di infortunio, malattia, invalidità, disoccupazione e vecchiaia. È il fondamento etico del nostro sistema sociale!",
    mechanicType: "constitution",
    question: "Identifica il numero di questo pilastro costituzionale. Qual è l'articolo della Costituzione Italiana che garantisce l'assistenza e la previdenza sociale ai cittadini svantaggiati o inabili? (Digita il numero corrispondente).",
    correctAnswer: "38",
    hints: [
      { id: 1, text: "L'articolo viene citato esplicitamente nella pillola d'Educazione Civica qui sopra!" },
      { id: 2, text: "Si trova tra l'articolo trentasette (diritti delle lavoratrici) e l'articolo trentanove (libertà dell'organizzazione sindacale)." },
      { id: 3, text: "Il numero magico è 38. Digitalo per stabilizzare il portale quantistico!" }
    ]
  },
  {
    id: 4,
    title: "Enigma 4: La Busta Paga e lo Scudo del Lavoro",
    description: "Incontrate un ragazzo che ha appena iniziato a lavorare: 'Il mio stipendio sulla carta (lordo) è di 1500 euro, ma in banca ricevo un bonifico (netto) di 1200 euro! Perché mancano 300 euro, se le tasse servono solo per le strade?'. Aiutatelo a scoprire il misterioso scudo di riserva che sta finanziando ogni mese!",
    educationalTidbit: "La differenza tra cifra lorda e netta in busta paga non è un furto, ma rappresenta in gran parte i contributi previdenziali INPS! Questi soldi formano una polizza collettiva. Uno dei servizi principali finanziati è la protezione mensile contro la disoccupazione involontaria, chiamata NASpI. Chi perde il lavoro non finisce per strada ma viene aiutato dallo Stato!",
    mechanicType: "payslip",
    question: "Inserisci la sigla che definisce l'indennità mensile di disoccupazione che soccorre chi perde involontariamente il lavoro per aiutarlo a trovare un nuovo impiego: N _ _ _ _ I (Scrivi in MAIUSCOLO).",
    correctAnswer: "NASPI",
    hints: [
      { id: 1, text: "La sigla sta per 'Nuova Assicurazione Sociale per l'Impiego'." },
      { id: 2, text: "Comincia con la lettera N e termina con la lettera I. È formata da 5 lettere." },
      { id: 3, text: "La parola chiave da digitare è proprio NASPI!" }
    ]
  },
  {
    id: 5,
    title: "Enigma 5: La Catena del Welfare",
    description: "Una tempesta magnetica scatenata dall'indifferenza rischia di far crollare le difese dei cittadini più deboli. Per ricostruire la 'Catena del Welfare', dobbiamo capire un concetto fondamentale: non siamo isole! Se qualcuno perde il lavoro o si fa male, l'intera comunità interviene per sostenerlo.",
    educationalTidbit: "La previdenza sociale si fonda sulla solidarietà nazionale. Chi ha di più contribuisce di più, e chi si trova in condizioni di grave difficoltà (disoccupazione, invalidità, povertà) riceve speciali aiuti. Questo sistema fa sì che nessuno sia lasciato indietro. Sconfigge la povertà e favorisce l'uguaglianza sociale!",
    mechanicType: "decode",
    question: "Inserisci la parola magica che definisce questo valore. È il contrario di egoismo, unisce le persone in una cordata di mutuo aiuto, e dà il nome alla catena che tiene unito l'intero scudo sociale: S _ _ _ _ _ _ _ _ _ _ _",
    correctAnswer: "SOLIDARIETA",
    hints: [
      { id: 1, text: "La parola inizia con la lettera S e finisce con la A (o À). Ha 11 lettere in totale." },
      { id: 2, text: "È il sentimento di fratellanza e di aiuto reciproco che spinge le persone a sostenersi a vicenda nelle difficoltà. S-O-L-I-D-A-R-I-E-T-A." },
      { id: 3, text: "La parola da digitare (senza accenti, tutta in maiuscolo) è: SOLIDARIETA." }
    ]
  },
  {
    id: 6,
    title: "Enigma 6: Lo Scontro Finale con il Lavoro Nero",
    description: "ATTENZIONE! Il Boss Finale 'Signor Evasore' è penetrato nella sala comandi con il suo virus 'Lavoro Nero'! Ti promette un mucchio di monete subito, ma ssshhh... non ti farà firmare alcun foglio e ti ruberà lo Scudo Sociale del Futuro. Se ti farai male sul lavoro o ti ammerai, verrai gettato via senza un soldo!",
    educationalTidbit: "Il lavoro nero è il nemico numero uno della società e di voi ragazzi. Lavorare in nero sembra conveniente all'inizio (ti danno soldi in contanti e non si pagano tasse immediate), ma in realtà ti toglie ogni protezione: zero contributi pensionistici, zero tutele se ti fai male, zero congedi e zero diritti. È illegale e distrugge il welfare di tutti, perché l'evasore non contribuisce alla scuola, agli ospedali e alle pensioni pubbliche!",
    mechanicType: "boss",
    question: "Per sigillare il portale e cacciare l'Evasore, devi attivare e registrare il documento legale che garantisce diritti, orari equi, paga minima e contributi automatici. Qual è il nome di questo 'Scudo d'Accordo' stipulato tra lavoratore e datore di lavoro? (C _ _ _ _ _ _ _ _)",
    correctAnswer: "CONTRATTO",
    hints: [
      { id: 1, text: "È un pezzo di carta fondamentale. Senza di esso si lavora 'in nero'. Con esso, invece, sei un cittadino protetto a norma di legge." },
      { id: 2, text: "Inizia con 'CON...' e finisce con '...ATTO'. Si firma per stabilire quante ore devi lavorare, quanto sarai pagato e i tuoi contributi INPS." },
      { id: 3, text: "La super-parola per distruggere il Boss è CONTRATTO. Firmando un regolare contratto sblocchi il futuro sicuro!" }
    ]
  }
];
