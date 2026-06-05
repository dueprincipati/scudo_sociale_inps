import React, { useState, useEffect } from 'react';
import { Puzzle, TeamState } from '../types';
import { playSound } from '../utils/audio';
import { HelpCircle, AlertTriangle, CheckCircle, ShieldAlert, Zap, Calendar, Heart, Award, ArrowRight, ShieldCheck, HeartCrack, BookOpenCheck, FileText, Wallet, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { puzzlesList } from '../data/puzzles';

interface PuzzleStepProps {
  puzzle: Puzzle;
  teamState: TeamState;
  onSolve: (puzzleId: number) => void;
  onUseHint: (puzzleId: number) => void;
  onWrongAttempt: (puzzleId: number) => void;
}

export const PuzzleStep: React.FC<PuzzleStepProps> = ({ puzzle, teamState, onSolve, onUseHint, onWrongAttempt }) => {
  const [userInput, setUserInput] = useState('');
  const [errorFeedback, setErrorFeedback] = useState<string | null>(null);
  const [successAnim, setSuccessAnim] = useState(false);

  // States for puzzle mechanics
  // Puzzle 2: Icons selection
  const [selectedIcons, setSelectedIcons] = useState<number[]>([]);
  const iconTessera = [
    { id: 1, label: "Pensione di Vecchiaia", val: 500, isCorrect: true, power: "Reddito sicuro per i lavoratori anziani" },
    { id: 2, label: "Abbonamento Netflix Gratis", val: 120, isCorrect: false, power: "Solamente intrattenimento privato" },
    { id: 3, label: "Indennità di Malattia", val: 400, isCorrect: true, power: "Pagati anche quando non potete lavorare" },
    { id: 4, label: "Punti Pizza Automatici", val: 99, isCorrect: false, power: "Cibo delizioso ma non coperto dall'INPS" },
    { id: 5, label: "Assicurazione contro Infortuni INAIL-INPS", val: 300, isCorrect: true, power: "Cure e sostegno se ti ferisci lavorando" },
    { id: 6, label: "Sconto per Videogiochi Tripla A", val: 80, isCorrect: false, power: "Divertente ma non è un diritto sociale" },
    { id: 7, label: "Sostegno alla Maternità e Paternità", val: 698, isCorrect: true, power: "Congedo pagato per prendersi cura dei neonati" },
    { id: 8, label: "Bonus Viaggio Interstellare Gratis", val: 999, isCorrect: false, power: "Magari in futuro, ora non coperto!" }
  ];

  // Puzzle 3: Constitution article selection
  const [selectedArticle, setSelectedArticle] = useState<number | null>(null);

  // Puzzle 4: Payslip interactive item selection
  const [selectedPayslipKey, setSelectedPayslipKey] = useState<string | null>(null);

  // Reset states when puzzle changes
  useEffect(() => {
    setUserInput('');
    setErrorFeedback(null);
    setSuccessAnim(false);
    setSelectedIcons([]);
    setSelectedArticle(null);
    setSelectedPayslipKey(null);
  }, [puzzle]);

  const handleIconToggle = (id: number) => {
    playSound.playClick();
    if (selectedIcons.includes(id)) {
      setSelectedIcons(selectedIcons.filter(item => item !== id));
    } else {
      setSelectedIcons([...selectedIcons, id]);
    }
  };

  // Automated calculator helper for Puzzle 2
  const selectedSum = iconTessera
    .filter(icon => selectedIcons.includes(icon.id))
    .reduce((sum, current) => sum + current.val, 0);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorFeedback(null);

    const formattedAnswer = userInput.trim().toUpperCase().replace(/[^A-Z0-9]/g, '');
    const correctFormatted = puzzle.correctAnswer.trim().toUpperCase();

    if (puzzle.mechanicType === 'icons' && formattedAnswer !== correctFormatted) {
      setErrorFeedback(`Formula di sblocco digitata: "${userInput}" errata. Controlla la somma dei veri Superpoteri.`);
      playSound.playFailure();
      onWrongAttempt(puzzle.id);
      return;
    }

    if (formattedAnswer === correctFormatted) {
      playSound.playSuccess();
      setSuccessAnim(true);
      setTimeout(() => {
        onSolve(puzzle.id);
      }, 2000);
    } else {
      playSound.playFailure();
      onWrongAttempt(puzzle.id);
      // Funny messages anti black work or customized error
      if (puzzle.mechanicType === 'boss') {
        setErrorFeedback("Il virus del Lavoro Nero ha parato il colpo! Senza un regolare accordo firmato, i tuoi diritti valgono zero (-40 XP).");
      } else {
        setErrorFeedback("Ah! Tentativo respinto dal sistema di controllo INPS. Controlla gli indizi e riprova! (-40 XP)");
      }
    }
  };

  const handleRequestHint = () => {
    const currentHintsUsed = teamState.hintsUsed[puzzle.id] || 0;
    if (currentHintsUsed < puzzle.hints.length) {
      onUseHint(puzzle.id);
      playSound.playHint();
    }
  };

  const currentHintsUsed = teamState.hintsUsed[puzzle.id] || 0;

  return (
    <div className="space-y-6">
      {/* Immersive Puzzle Intro Card */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden border border-slate-700">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl -z-10" />

        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <span className="bg-blue-600/20 text-blue-400 border border-blue-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5" /> Missione {puzzle.id} di {puzzlesList.length}
            </span>
            <h2 className="text-xl md:text-2xl font-black tracking-tight">{puzzle.title}</h2>
          </div>
          <div className="flex items-center gap-2 text-slate-400 bg-slate-950 px-3.5 py-1.5 rounded-2xl border border-slate-800/40 text-xs">
            <span>Uso Suggerimenti:</span>
            <span className="font-bold text-amber-400">{currentHintsUsed} / {puzzle.hints.length}</span>
          </div>
        </div>

        {/* Narrative & Description */}
        <div className="space-y-4">
          <p className="text-slate-200 text-sm md:text-base leading-relaxed italic text-slate-300">
            "{puzzle.description}"
          </p>

          {/* Educational Pill Box */}
          <div className="bg-blue-950/40 border border-blue-800/50 rounded-2xl p-4 md:p-5 flex gap-4 items-start">
            <BookOpenCheck className="w-6 h-6 text-blue-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-blue-300 uppercase tracking-widest">Pillola di Educazione Civica</h4>
              <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                {puzzle.educationalTidbit}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Mechanic Playground */}
      <div className="bg-white border-2 border-slate-200 rounded-3xl p-6 md:p-8 shadow-md">
        <h3 className="text-sm font-black text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" /> Area Quiz & Decodifica
        </h3>

        {/* Dynamic Mechanic Render */}
        <div className="mb-8">
          {puzzle.mechanicType === 'balance' && (
            <div className="space-y-6">
              <p className="text-sm text-slate-650 leading-relaxed">
                La catena ha 5 nodi di energia fluttuanti. Ciascun nodo illumina una lettera quando il flusso è corretto:
              </p>
              
              {/* Graphic representation of generation flow */}
              <div className="flex flex-col md:flex-row items-center gap-4 justify-center bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <div className="flex flex-col items-center p-3 bg-blue-50 border border-blue-105 rounded-xl text-center w-40">
                  <span className="font-bold text-xs text-blue-800">Generazione A</span>
                  <p className="text-[10px] text-slate-500">I Lavoratori di oggi</p>
                  <span className="text-xl font-extrabold text-blue-600 mt-1 mt-2">Versano (XP)</span>
                </div>
                
                {/* Visual Connector Flow */}
                <div className="flex items-center gap-1 md:gap-2 text-slate-300 py-3">
                  <div className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center text-white text-[9px] font-bold">P</div>
                  <div className="h-0.5 w-6 bg-slate-300" />
                  <div className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center text-white text-[9px] font-bold">A</div>
                  <div className="h-0.5 w-6 bg-slate-300" />
                  <div className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center text-white text-[9px] font-bold">T</div>
                  <div className="h-0.5 w-6 bg-slate-300" />
                  <div className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center text-white text-[9px] font-bold">T</div>
                  <div className="h-0.5 w-6 bg-slate-300" />
                  <div className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center text-white text-[9px] font-bold">O</div>
                </div>

                <div className="flex flex-col items-center p-3 bg-emerald-50 border border-emerald-105 rounded-xl text-center w-40">
                  <span className="font-bold text-xs text-emerald-800">Generazione B</span>
                  <p className="text-[10px] text-slate-500">I Pensionati di oggi</p>
                  <span className="text-xl font-extrabold text-emerald-600 mt-2">Ricevono lo Scudo</span>
                </div>
              </div>
            </div>
          )}

          {puzzle.mechanicType === 'icons' && (
            <div className="space-y-6">
              <p className="text-xs md:text-sm text-slate-600 leading-relaxed mb-4">
                Fai click su ciascun superpotere per sbloccarlo o toglierlo. Se selezioni correttamente solo i veri campi d'azione assicurati dell'INPS, sommerai i giusti anni e scoprirai l'anno misterioso!
              </p>
              
              <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3">
                {iconTessera.map((item) => {
                  const isChecked = selectedIcons.includes(item.id);
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleIconToggle(item.id)}
                      className={`flex flex-col items-start p-4 rounded-2xl border-2 transition-all cursor-pointer text-left h-full justify-between h-36 ${
                        isChecked
                          ? 'border-blue-500 bg-blue-50/60 shadow-md ring-2 ring-blue-500/20'
                          : 'border-slate-100 bg-slate-50/50 hover:bg-slate-50'
                      }`}
                    >
                      <div className="w-full">
                        <div className="flex items-center justify-between mb-2">
                          {item.id === 1 && <Award className="w-5 h-5 text-amber-500" />}
                          {item.id === 3 && <Heart className="w-5 h-5 text-red-500" />}
                          {item.id === 5 && <ShieldCheck className="w-5 h-5 text-emerald-500" />}
                          {item.id === 7 && <Calendar className="w-5 h-5 text-violet-500" />}
                          {!item.isCorrect && <HelpCircle className="w-5 h-5 text-slate-400" />}
                          <span className="text-xs font-mono font-bold bg-slate-200/60 text-slate-600 px-1.5 py-0.5 rounded">
                            +{item.val}
                          </span>
                        </div>
                        <h4 className="font-bold text-slate-800 text-xs mb-1">{item.label}</h4>
                      </div>
                      <p className="text-[10px] text-slate-500 font-medium leading-tight">{item.power}</p>
                    </button>
                  );
                })}
              </div>

              <div className="bg-slate-50/80 border border-slate-200 rounded-2xl p-4 flex justify-between items-center mt-4">
                <div>
                  <span className="text-xs text-slate-500 font-semibold p-1">Somma attuale dei Superpoteri attivati:</span>
                  <div className="text-2xl font-black text-slate-800">{selectedSum}</div>
                </div>
                {selectedSum === 1898 ? (
                  <div className="flex items-center gap-2 text-emerald-600 text-sm font-bold bg-emerald-50 border border-emerald-110 px-3.5 py-1.5 rounded-xl">
                    <CheckCircle className="w-4 h-4 animate-bounce" /> Somma Corretta rilevata! Copia il numero sotto.
                  </div>
                ) : (
                  <span className="text-xs text-amber-600 bg-amber-50 border border-amber-100 px-3 py-1.5 rounded-xl font-medium">
                    {selectedSum > 1898 ? "Somma troppo alta. Hai incluso dei bonus non del Welfare!" : "Somma parziale... seleziona altre tessere corrette!"}
                  </span>
                )}
              </div>
            </div>
          )}

          {puzzle.mechanicType === 'constitution' && (
            <div className="space-y-6">
              <p className="text-xs md:text-sm text-slate-650 leading-relaxed mb-4">
                La Costituzione Italiana parla a ciascuno di noi. Clicca sui diversi articoli per leggerli e scoprire quale di questi sancisce lo Scudo Sociale di solidarietà (previdenza e assistenza sociale per tutti i cittadini). Scovato l'articolo giusto, quello diventerà la tua chiave di sblocco!
              </p>
              
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  {
                    num: 1,
                    title: "Articolo 1",
                    text: "L'Italia è una Repubblica democratica, fondata sul lavoro. La sovranità appartiene al popolo...",
                    desc: "Sancisce l'importanza del lavoro, ma non parla delle tutele per malattia, infortuni o pensione."
                  },
                  {
                    num: 3,
                    title: "Articolo 3",
                    text: "Tutti i cittadini hanno pari dignità sociale e sono eguali davanti alla legge, senza distinzione di sesso...",
                    desc: "Principio fondamentale di eguaglianza formale ed eguale dignità sociale."
                  },
                  {
                    num: 4,
                    title: "Articolo 4",
                    text: "La Repubblica riconosce a tutti i cittadini il diritto al lavoro e promuove le condizioni che rendano effettivo questo diritto...",
                    desc: "Diritto al lavoro, ma non definisce lo scudo previdenziale per infortuni o vecchiaia."
                  },
                  {
                    num: 32,
                    title: "Articolo 32",
                    text: "La Repubblica tutela la salute come fondamentale diritto dell'individuo e interesse della collettività, e garantisce cure gratuite agli indigenti...",
                    desc: "La tutela della salute e la nascita del Servizio Sanitario Nazionale."
                  },
                  {
                    num: 38,
                    title: "Articolo 38",
                    text: "Ogni cittadino inabile al lavoro e sprovvisto dei mezzi necessari per vivere ha diritto al mantenimento e all'assistenza sociale. I lavoratori hanno diritto che siano preveduti ed assicurati mezzi adeguati alle loro esigenze di vita in caso di infortunio, malattia, invalidità e vecchiaia, disoccupazione involontaria...",
                    desc: "Il cuore del Welfare italiano! Sancisce l'obbligo di istituire scudi sociali per tutti. È la risposta!",
                    isTarget: true
                  },
                  {
                    num: 53,
                    title: "Articolo 53",
                    text: "Tutti sono tenuti a concorrere alle spese pubbliche in ragione della loro capacità contributiva. Il sistema tributario è informato a criteri di progressività.",
                    desc: "Il dovere di pagare le tasse per sostenere tutti i servizi pubblici condivisi."
                  }
                ].map((art) => {
                  const isSelected = selectedArticle === art.num;
                  return (
                    <button
                      key={art.num}
                      type="button"
                      onClick={() => {
                        playSound.playClick();
                        setSelectedArticle(art.num);
                        if (art.isTarget) {
                          setUserInput("38");
                        }
                      }}
                      className={`flex flex-col items-start p-4 rounded-xl border-2 transition-all cursor-pointer text-left h-full ${
                        isSelected
                          ? art.isTarget 
                            ? 'border-emerald-500 bg-emerald-50/60 ring-2 ring-emerald-500/20 shadow-sm'
                            : 'border-blue-500 bg-blue-50/60 ring-2 ring-blue-500/20'
                          : 'border-slate-100 bg-slate-50/50 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2 w-full border-b border-slate-100 pb-1.5">
                        <BookOpen className={`w-4 h-4 ${isSelected ? 'text-blue-600' : 'text-slate-400'}`} />
                        <span className="font-bold text-slate-800 text-xs">{art.title}</span>
                      </div>
                      <p className="text-[10px] text-slate-600 font-medium leading-tight mb-2 italic">
                        "{art.text}"
                      </p>
                      {isSelected && (
                        <div className={`text-[10px] p-2 rounded border mt-auto w-full ${
                          art.isTarget 
                            ? 'bg-emerald-105 border-emerald-200 text-emerald-800 font-extrabold'
                            : 'bg-blue-105 border-blue-200 text-blue-800 font-semibold'
                        }`}>
                          {art.desc}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {selectedArticle === 38 && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex gap-3 text-xs text-emerald-800 items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-emerald-600 animate-bounce" />
                    <span><strong>Scudo Trovato!</strong> L'Articolo 38 è l'asse portante del Welfare. Abbiamo sintonizzato la tastiera sul numero <strong>38</strong>. Clicca su "Invio Chiave"!</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {puzzle.mechanicType === 'payslip' && (
            <div className="space-y-6">
              <p className="text-xs md:text-sm text-slate-650 leading-relaxed mb-4">
                Esplorate la busta paga simulata sottostante. Cliccate sulle diverse voci contrassegnate per scoprire dove finisce lo stipendio e qual è il nome dello speciale scudo che protegge i lavoratori disoccupati!
              </p>
              
              <div className="bg-slate-900 text-slate-100 rounded-2xl border border-slate-800 overflow-hidden font-mono text-xs shadow-lg max-w-xl mx-auto">
                <div className="bg-slate-950 p-4 border-b border-slate-800 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-amber-500" />
                    <span className="font-bold text-[10px] uppercase tracking-wider text-slate-300">Cedolino di Prova / Studente-Lavoratore</span>
                  </div>
                  <span className="text-[9px] text-slate-500">Mese Civico 2026</span>
                </div>

                <div className="p-4 space-y-2">
                  <div className="grid grid-cols-3 border-b border-slate-800 pb-2 text-[10px] text-slate-400 font-bold">
                    <span>DESCRIZIONE</span>
                    <span className="text-right">VALORI</span>
                    <span className="text-right">CHI LI GESTISCE</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => { playSound.playClick(); setSelectedPayslipKey('lordo'); }}
                    className={`w-full grid grid-cols-3 text-left py-2 px-2.5 rounded-lg transition-all border ${
                      selectedPayslipKey === 'lordo'
                        ? 'bg-blue-950/65 border-blue-800 text-blue-300'
                        : 'bg-transparent border-transparent hover:bg-slate-800/40 text-slate-200'
                    }`}
                  >
                    <span className="font-bold text-slate-200">1. Stipendio Lordo</span>
                    <span className="text-right text-emerald-400 font-bold">+ €1.500,00</span>
                    <span className="text-right text-slate-400 text-[10px]">Azienda</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => { playSound.playClick(); setSelectedPayslipKey('inps'); }}
                    className={`w-full grid grid-cols-3 text-left py-2.5 px-2.5 rounded-lg transition-all border ${
                      selectedPayslipKey === 'inps'
                        ? 'bg-amber-950/80 border-amber-500 text-amber-200'
                        : 'bg-amber-950/15 border border-dashed border-amber-600/35 hover:bg-amber-950/30 text-amber-300 animate-pulse'
                    }`}
                  >
                    <span className="font-bold flex items-center gap-1 text-amber-400">2. Trattenute INPS *</span>
                    <span className="text-right text-red-400 font-bold">- €140,00</span>
                    <span className="text-right text-amber-400 font-black">INPS (Welfare)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => { playSound.playClick(); setSelectedPayslipKey('irpef'); }}
                    className={`w-full grid grid-cols-3 text-left py-2 px-2.5 rounded-lg transition-all border ${
                      selectedPayslipKey === 'irpef'
                        ? 'bg-blue-950/65 border-blue-800 text-blue-300'
                        : 'bg-transparent border-transparent hover:bg-slate-800/40 text-slate-200'
                    }`}
                  >
                    <span className="font-bold text-slate-200">3. Tasse IRPEF</span>
                    <span className="text-right text-red-400 font-bold">- €160,00</span>
                    <span className="text-right text-slate-400 text-[10px]">Stato (Fisco)</span>
                  </button>

                  <div className="h-[1px] bg-slate-800 my-2" />

                  <button
                    type="button"
                    onClick={() => { playSound.playClick(); setSelectedPayslipKey('netto'); }}
                    className={`w-full grid grid-cols-3 text-left py-2 px-2.5 rounded-lg transition-all border ${
                      selectedPayslipKey === 'netto'
                        ? 'bg-blue-950/65 border-blue-800 text-blue-300'
                        : 'bg-transparent border-transparent hover:bg-slate-800/40 text-slate-200'
                    }`}
                  >
                    <span className="font-bold text-emerald-400">STIPENDIO NETTO</span>
                    <span className="text-right text-emerald-300 font-black">€1.200,00</span>
                    <span className="text-right text-slate-400 text-[10px]">Tuo Conto</span>
                  </button>
                </div>

                <div className="bg-slate-950 p-4 border-t border-slate-850 text-[11px] leading-relaxed min-h-24 flex items-center">
                  {!selectedPayslipKey ? (
                    <p className="text-slate-400 italic">★ Fai clic sulle voci della busta paga sopra per svelare l'enigma della trattenuta INPS!</p>
                  ) : selectedPayslipKey === 'lordo' ? (
                    <p className="text-slate-300"><strong>Stipendio Lordo:</strong> È la paga concordata totale prima di qualsiasi dazio. Indica il costo teorico di produzione, ma non è quello che porti a casa.</p>
                  ) : selectedPayslipKey === 'inps' ? (
                    <p className="text-amber-200"><strong>★ Trattenute INPS (Contributi):</strong> Non sono tasse perse! Servono a pagare la tua pensione futura, la malattia, l'infortunio e financo la <strong className="text-emerald-400 underline uppercase">NASPI</strong> (Nuova Assicurazione Sociale per l'Impiego), ovvero il mensile di disoccupazione che ti spetta se perdi involontariamente il lavoro!</p>
                  ) : selectedPayslipKey === 'irpef' ? (
                    <p className="text-slate-300"><strong>Tasse IRPEF:</strong> Rappresenta l'imposta fiscale sulle persone fisiche. Serve allo Stato per erogare strade pubbliche, polizia, carabinieri ed ospedali e la tua stessa scuola!</p>
                  ) : (
                    <p className="text-slate-300"><strong>Stipendio Netto:</strong> È il denaro effettivo e pulito pagato sul tuo conto corrente bancario, libero da imposte e gravato di tutte le tutele previste.</p>
                  )}
                </div>
              </div>

              {selectedPayslipKey === 'inps' && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-amber-800">
                  <p className="font-bold mb-1">💡 Indizio Sbloccato!</p>
                  <span>Hai trovato lo scudo di disoccupazione nella spiegazione delle trattenute INPS. La parola segreta è <strong>NASPI</strong>. Digita la sigla sotto in maiuscolo e premi invio!</span>
                </div>
              )}
            </div>
          )}

          {puzzle.mechanicType === 'decode' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-650 leading-relaxed mb-1">
                La catena del Welfare supporta chi si trova in temporaneo infortunio, chi perde il lavoro (Disoccupazione NASpI), e chi soffre di disabilità. Per ricongiungere le maglie, dobbiamo completare l'iscrizione sul ponte:
              </p>
              
              <div className="flex justify-center flex-wrap gap-2 py-4 bg-slate-50 rounded-2xl border border-slate-100 font-bold text-lg">
                {"SOLIDARIETA".split('').map((char, index) => {
                  const isMissing = [4, 5, 8].includes(index);
                  return (
                    <div
                      key={index}
                      className={`w-10 h-10 rounded-xl flex items-center justify-center border-2 transition-all ${
                        isMissing
                          ? 'border-dashed border-amber-400 bg-amber-50 text-amber-700 animate-pulse'
                          : 'border-slate-200 bg-white text-slate-800 shadow-sm'
                      }`}
                    >
                      {char}
                    </div>
                  );
                })}
              </div>
              <ul className="list-decimal pl-5 space-y-1 text-xs text-slate-500 italic mt-3">
                <li>Chi lavora ed è forte aiuta anche chi è fragile.</li>
                <li>I contributi non servono solo a se stessi, ma creano un tesoro a cui attingere in caso di gravi bisogni.</li>
              </ul>
            </div>
          )}

          {puzzle.mechanicType === 'boss' && (
            <div className="space-y-4 relative overflow-hidden bg-red-50 border-2 border-red-200 rounded-2xl p-5 mt-2">
              <div className="absolute top-0 right-0 p-4 shrink-0">
                <ShieldAlert className="w-16 h-16 text-red-500/20 animate-spin" />
              </div>
              <div className="flex items-center gap-3 mb-2">
                <AlertTriangle className="w-6 h-6 text-red-600" />
                <h4 className="font-extrabold text-red-800 text-sm">MINACCIA IN CORSO: INFEZIONE DA LAVORO NERO</h4>
              </div>
              <p className="text-xs md:text-sm text-red-700 leading-relaxed font-semibold">
                Il virus "Lavoro Nero" cancella le regole e i diritti! Ti sussurra all'orecchio: <span className="underline italic">"Prendi 50 euro oggi e non chiedere certificati, a che ti serve firmare?"</span>. Ma non cadere nella trappola! Senza diritti sei nudo dinanzi alle disgrazie.
              </p>
              
              <div className="grid gap-2 text-xs font-mono text-red-900 border-t border-red-200 pt-3">
                <div className="flex items-center gap-1.5"><HeartCrack className="w-3.5 h-3.5 text-red-600" /> Malattia non pagata: se hai la febbre, perdi lo stipendio.</div>
                <div className="flex items-center gap-1.5"><HeartCrack className="w-3.5 h-3.5 text-red-600" /> Nessun contributo: a 65 anni non avrai alcuna pensione per riposare.</div>
                <div className="flex items-center gap-1.5"><HeartCrack className="w-3.5 h-3.5 text-red-600" /> Sicurezza zero: se ti fai male lavorando, sarai abbandonato.</div>
              </div>
            </div>
          )}
        </div>

        {/* Input Question and Form Area */}
        <div className="border-t border-slate-100 pt-6 space-y-4">
          <p className="text-slate-800 text-sm font-bold flex gap-1.5 items-start">
            <span className="text-blue-600">➜</span> {puzzle.question}
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
              id={`puzzle-answer-input`}
              type="text"
              placeholder={puzzle.mechanicType === 'icons' ? "Es: 1898" : "Rispondi in MAIUSCOLO"}
              value={userInput}
              onChange={(e) => {
                setUserInput(e.target.value);
                if (errorFeedback) setErrorFeedback(null);
              }}
              className="flex-1 bg-slate-50 border-2 border-slate-200 hover:border-slate-300 focus:border-blue-500 rounded-2xl px-4 py-3 text-slate-800 font-bold focus:outline-none transition-all placeholder:text-slate-400 placeholder:font-normal uppercase"
              disabled={successAnim}
              autoComplete="off"
            />
            <button
              id={`submit-puzzle-${puzzle.id}-btn`}
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-2xl transition-all cursor-pointer flex items-center justify-center gap-2 shrink-0 disabled:opacity-50"
              disabled={successAnim}
            >
              Invio Chiave <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Feedback Messages */}
          <AnimatePresence mode="wait">
            {errorFeedback && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="bg-red-50 border border-red-200 rounded-2xl p-4 flex gap-3 text-xs md:text-sm text-red-800 items-start"
              >
                <ShieldAlert className="w-5 h-5 text-red-600 shrink-0" />
                <p className="font-semibold leading-relaxed">{errorFeedback}</p>
              </motion.div>
            )}

            {successAnim && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-emerald-50 border-2 border-emerald-350 rounded-2xl p-5 text-center flex flex-col items-center gap-2"
              >
                <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-white text-xl font-bold animate-bounce mb-1">
                  ✓
                </div>
                <h4 className="font-extrabold text-emerald-800 text-base">CODICE ACCETTATO!</h4>
                <p className="text-xs text-emerald-700 font-semibold max-w-md">
                  Scudo rigenerato! State sbloccando la barriera del tempo e potenziando il Welfare dei ragazzi. Riscaldamento dei condotti a buon fine...
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Guido: Assistant Bot and Hint System */}
      <div className="bg-slate-50 border-2 border-slate-200 rounded-3xl p-5 md:p-6 flex flex-col sm:flex-row gap-4 items-start shadow-sm leading-relaxed">
        {/* Guido Robot visual representation using custom stylized SVG inside React */}
        <div className="w-16 h-16 bg-blue-100 border border-blue-200 rounded-2xl flex items-center justify-center text-3xl shrink-0 mt-1 shadow-sm select-none">
          🤖
        </div>

        <div className="space-y-3 flex-1 w-full">
          <div>
            <span className="font-bold text-slate-800 text-xs uppercase tracking-wider bg-slate-200/60 px-2.5 py-0.5 rounded-full inline-block mb-1">
              Guido, Assistente INPS
            </span>
            <p className="text-slate-650 text-xs md:text-sm">
              Ciao ragazzi! Io sono Guido, la vostra guida previdenziale virtuale. Se vi sentite bloccati in un loop temporale o se non capite la formula civica, non esitate a dirmelo! Posso darvi dei suggerimenti preziosi.
            </p>
          </div>

          <div className="flex flex-col gap-2.5 mt-2">
            {/* Display list of hints unlocked so far */}
            {currentHintsUsed > 0 && (
              <div className="space-y-2 mt-2 border-t border-slate-200/60 pt-3">
                <span className="text-[10px] font-black text-amber-700 uppercase tracking-widest block">💡 Indizi ed Aiuti Acquisiti:</span>
                {Array.from({ length: currentHintsUsed }).map((_, i) => (
                  <div key={i} className={`rounded-xl p-3 border text-xs leading-relaxed ${
                    i === 2 
                      ? 'bg-rose-50 border-rose-200 text-rose-800' 
                      : 'bg-amber-50 border-amber-200 text-amber-800 font-medium'
                  }`}>
                    <strong className="block text-[10px] uppercase font-bold text-amber-950 mb-0.5">
                      {i === 0 && "1° Indizio Indiretto (Costo: -50 Punti)"}
                      {i === 1 && "2° Indizio Specifico (Costo: -100 Punti)"}
                      {i === 2 && "⚠️ Rivelazione Soluzione Completa (Costo: -250 Punti)"}
                    </strong>
                    {i === 2 ? (
                      <div>
                        <span>Ecco il codice di sblocco da digitare per procedere: </span>
                        <code className="bg-rose-100 px-1.5 py-0.5 rounded font-black font-mono text-xs text-red-700 select-all border border-rose-200">{puzzle.correctAnswer}</code>
                      </div>
                    ) : puzzle.hints[i]?.text}
                  </div>
                ))}
              </div>
            )}

            {currentHintsUsed < puzzle.hints.length ? (
              <button
                id={`request-hint-${puzzle.id}-btn`}
                type="button"
                onClick={handleRequestHint}
                disabled={successAnim}
                className="bg-amber-100 hover:bg-amber-200 disabled:bg-slate-100 disabled:text-slate-400 text-amber-800 font-bold px-4 py-2.5 rounded-2xl text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer self-start border border-amber-200/50"
              >
                <HelpCircle className="w-4 h-4 text-amber-600" />
                {currentHintsUsed === 0 && "Sblocca 1° Indizio (Costo: -50 XP)"}
                {currentHintsUsed === 1 && "Sblocca 2° Indizio (Costo: -100 XP)"}
                {currentHintsUsed === 2 && "⚠️ Rivelami la Soluzione (Costo: -250 XP)"}
              </button>
            ) : (
              <p className="text-[11px] text-slate-500 italic">★ Tutti gli aiuti per questa missione sono stati sbloccati!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
