import React, { useState, useEffect } from 'react';
import { Puzzle, TeamState } from '../types';
import { playSound } from '../utils/audio';
import { HelpCircle, AlertTriangle, CheckCircle, ShieldAlert, Zap, Calendar, Heart, Award, ArrowRight, ShieldCheck, BookOpenCheck, FileText, BookOpen } from 'lucide-react';
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
  const isSolved = teamState.completedPuzzles.includes(puzzle.id);
  const [userInput, setUserInput] = useState('');
  const [errorFeedback, setErrorFeedback] = useState<string | null>(null);
  const [successAnim, setSuccessAnim] = useState(false);

  // States for puzzle mechanics
  // Puzzle 2: Icons selection
  const [selectedIcons, setSelectedIcons] = useState<number[]>([]);
  const defaultIconTessera = [
    { id: 1, label: "Pensione di Vecchiaia", val: 500, isCorrect: true, power: "Reddito sicuro per i lavoratori anziani" },
    { id: 2, label: "Abbonamento Netflix Gratis", val: 120, isCorrect: false, power: "Solamente intrattenimento privato" },
    { id: 3, label: "Indennità di Malattia", val: 400, isCorrect: true, power: "Pagati anche quando non potete lavorare" },
    { id: 4, label: "Punti Pizza Automatici", val: 99, isCorrect: false, power: "Cibo delizioso ma non coperto dall'INPS" },
    { id: 5, label: "Assicurazione contro Infortuni INAIL-INPS", val: 300, isCorrect: true, power: "Cure e sostegno se ti ferisci lavorando" },
    { id: 6, label: "Sconto per Videogiochi Tripla A", val: 80, isCorrect: false, power: "Divertente ma non è un diritto sociale" },
    { id: 7, label: "Sostegno alla Maternità e Paternità", val: 698, isCorrect: true, power: "Congedo pagato per prendersi cura dei neonati" },
    { id: 8, label: "Bonus Viaggio Interstellare Gratis", val: 999, isCorrect: false, power: "Magari in futuro, ora non coperto!" }
  ];

  // use puzzle-specific tessere if provided
  const iconTessera = (puzzle.mechanicData && puzzle.mechanicData.iconTessera) ? puzzle.mechanicData.iconTessera : defaultIconTessera;

  // Puzzle 3: Constitution article selection
  const [selectedArticle, setSelectedArticle] = useState<number | null>(null);

  // Puzzle 4: Payslip interactive item selection
  const [selectedPayslipKey, setSelectedPayslipKey] = useState<string | null>(null);

  // Puzzle 5: Chain letters selection for Enigma 5
  const [chainLetters, setChainLetters] = useState<{ [key: number]: string }>({});

  // Puzzle 6: Boss Fight contract clauses active
  const [bossClauses, setBossClauses] = useState<string[]>([]);

  // Reset states when puzzle changes
  useEffect(() => {
    setUserInput(isSolved ? puzzle.correctAnswer : '');
    setErrorFeedback(null);
    setSuccessAnim(false);
    setSelectedIcons(isSolved && puzzle.mechanicType === 'icons'
      ? iconTessera.filter(t => t.isCorrect).map(t => t.id)
      : []
    );
    setSelectedArticle(isSolved && puzzle.mechanicType === 'constitution' ? Number(puzzle.correctAnswer) : null);
    setSelectedPayslipKey(isSolved && puzzle.mechanicType === 'payslip' ? 'inps' : null);
    setChainLetters(isSolved && puzzle.id === 5 ? { 4: 'D', 5: 'A', 8: 'E' } : {});
    setBossClauses(isSolved && puzzle.mechanicType === 'boss' ? ['contributi', 'infortuni', 'ferie', 'paga'] : []);
  }, [puzzle, isSolved]);

  const handleIconToggle = (id: number) => {
    if (isSolved) return;
    playSound.playClick();
    let nextIcons: number[];
    if (selectedIcons.includes(id)) {
      nextIcons = selectedIcons.filter(item => item !== id);
    } else {
      nextIcons = [...selectedIcons, id];
    }
    setSelectedIcons(nextIcons);
    
    // Auto-fill sum in userInput
    const nextSum = iconTessera
      .filter(icon => nextIcons.includes(icon.id))
      .reduce((sum, current) => sum + current.val, 0);
    setUserInput(nextSum > 0 ? String(nextSum) : '');
  };

  const handleBossClauseToggle = (clause: string) => {
    if (isSolved) return;
    playSound.playClick();
    if (bossClauses.includes(clause)) {
      setBossClauses(bossClauses.filter(c => c !== clause));
    } else {
      setBossClauses([...bossClauses, clause]);
    }
  };

  // Automated calculator helper for Puzzle 2
  const selectedSum = iconTessera
    .filter(icon => selectedIcons.includes(icon.id))
    .reduce((sum, current) => sum + current.val, 0);

  const iconTargetSum = puzzle.mechanicType === 'icons' ? Number((puzzle.correctAnswer || '').replace(/[^0-9]/g, '')) : null;

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorFeedback(null);

    const cleanStr = (s: string) => s.trim().toUpperCase().replace(/[^A-Z0-9]/g, '');
    const formattedAnswer = cleanStr(userInput);
    const correctFormatted = cleanStr(puzzle.correctAnswer);
    const hasVariantMatch = puzzle.answerVariants && puzzle.answerVariants.some(variant => cleanStr(variant) === formattedAnswer);

    if (puzzle.mechanicType === 'icons' && formattedAnswer !== correctFormatted) {
      setErrorFeedback(`Formula di sblocco digitata: "${userInput}" errata. Controlla la somma dei veri Superpoteri.`);
      playSound.playFailure();
      onWrongAttempt(puzzle.id);
      return;
    }

    if (formattedAnswer === correctFormatted || hasVariantMatch) {
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
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
      {/* Left Column: Narrative Card and Guido Bot Card */}
      <div className="lg:col-span-5 space-y-4">
        {/* Immersive Puzzle Intro Card */}
        <div className="bg-slate-900 text-white rounded-3xl p-5 shadow-2xl relative overflow-hidden border border-slate-700">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -z-10" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl -z-10" />

          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <span className="bg-blue-600/20 text-blue-400 border border-blue-500/30 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                <Zap className="w-3 h-3" /> Missione {puzzle.id} di {puzzlesList.length}
              </span>
              <h2 className="text-lg font-black tracking-tight">{puzzle.title}</h2>
            </div>
            <div className="flex items-center gap-1.5 text-slate-400 bg-slate-950 px-2.5 py-1 rounded-xl border border-slate-800/40 text-[10px]">
              <span>Uso Suggerimenti:</span>
              <span className="font-bold text-amber-400">{currentHintsUsed} / {puzzle.hints.length}</span>
            </div>
          </div>

          {/* Narrative & Description */}
          <div className="space-y-3 text-left">
            <p className="text-slate-200 text-xs md:text-sm leading-relaxed italic">
              "{puzzle.description}"
            </p>

            {/* Educational Pill Box */}
            <div className="bg-blue-950/40 border border-blue-800/50 rounded-xl p-3 flex gap-3 items-start">
              <BookOpenCheck className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <h4 className="text-[10px] font-bold text-blue-300 uppercase tracking-widest">Pillola di Educazione Civica</h4>
                <p className="text-[11px] text-slate-300 leading-normal">
                  {puzzle.educationalTidbit}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Guido: Assistant Bot and Hint System */}
        <div className="bg-slate-50 border-2 border-slate-200 rounded-3xl p-4 flex gap-3.5 items-start shadow-sm leading-relaxed">
          {/* Guido Robot visual representation */}
          <div className="w-12 h-12 bg-blue-100 border border-blue-200 rounded-2xl flex items-center justify-center text-2xl shrink-0 mt-0.5 shadow-sm select-none">
            🤖
          </div>

          <div className="space-y-2 flex-1 w-full text-left">
            <div>
              <span className="font-bold text-slate-805 text-[10px] uppercase tracking-wider bg-slate-200/60 px-2.5 py-0.5 rounded-full inline-block mb-0.5">
                Guido, Assistente INPS
              </span>
              <p className="text-slate-600 text-[11px] leading-normal">
                Ciao ragazzi! Io sono Guido, la vostra guida previdenziale virtuale. Se vi sentite bloccati in un loop temporale o se non capite la formula civica, non esitate a dirmelo! Posso darvi dei suggerimenti preziosi.
              </p>
            </div>

            <div className="flex flex-col gap-2 mt-1.5">
              {/* Display list of hints unlocked so far */}
              {currentHintsUsed > 0 && (
                <div className="space-y-1.5 mt-1 border-t border-slate-200/60 pt-2.5">
                  <span className="text-[9px] font-black text-amber-700 uppercase tracking-widest block">💡 Indizi ed Aiuti Acquisiti:</span>
                  {Array.from({ length: currentHintsUsed }).map((_, i) => (
                    <div key={i} className={`rounded-lg p-2.5 border text-[11px] leading-normal ${
                      i === 2 
                        ? 'bg-rose-50 border-rose-200 text-rose-800' 
                        : 'bg-amber-50 border-amber-200 text-amber-800 font-medium'
                    }`}>
                      <strong className="block text-[9px] uppercase font-bold text-amber-950 mb-0.5">
                        {i === 0 && "1° Indizio Indiretto (Costo: -50 Punti)"}
                        {i === 1 && "2° Indizio Specifico (Costo: -100 Punti)"}
                        {i === 2 && "⚠️ Rivelazione Soluzione Completa (Costo: -250 Punti)"}
                      </strong>
                      {i === 2 ? (
                        <div>
                          <span>Ecco il codice di sblocco da digitare per procedere: </span>
                          <code className="bg-rose-100 px-1.5 py-0.5 rounded font-black font-mono text-[11px] text-red-700 select-all border border-rose-200">{puzzle.correctAnswer}</code>
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
                  className="bg-amber-100 hover:bg-amber-200 disabled:bg-slate-100 disabled:text-slate-400 text-amber-800 font-bold px-3 py-1.5 rounded-xl text-[10px] flex items-center justify-center gap-1 transition-all cursor-pointer self-start border border-amber-200/50"
                >
                  <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
                  {currentHintsUsed === 0 && "Sblocca 1° Indizio (Costo: -50 XP)"}
                  {currentHintsUsed === 1 && "Sblocca 2° Indizio (Costo: -100 XP)"}
                  {currentHintsUsed === 2 && "⚠️ Rivelami la Soluzione (Costo: -250 XP)"}
                </button>
              ) : (
                <p className="text-[10px] text-slate-500 italic">★ Tutti gli aiuti per questa missione sono stati sbloccati!</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Interactive Mechanic Playground */}
      <div className="lg:col-span-7 bg-white border-2 border-slate-200 rounded-3xl p-5 shadow-md">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-3.5 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" /> Area Quiz & Decodifica
        </h3>

        {/* Dynamic Mechanic Render */}
        <div className="mb-6 text-left">
          {puzzle.mechanicType === 'balance' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-600 leading-relaxed">
                La catena ha {puzzle.correctAnswer.length} nodi di energia fluttuanti. Ciascun nodo si attiva e si illumina quando digiti le lettere della chiave di sblocco:
              </p>
              
              {/* Graphic representation of generation flow */}
              <div className="flex flex-col xl:flex-row items-center gap-4 xl:gap-5 justify-center bg-slate-50 p-4 rounded-2xl border border-slate-105 shadow-inner">
                {/* Generation A Card */}
                <div className="flex flex-col items-center p-3 bg-blue-50/80 border border-blue-100 rounded-2xl text-center w-full xl:w-40 shadow-sm shrink-0">
                  <span className="font-extrabold text-[10px] text-blue-800 tracking-wider uppercase">Generazione A</span>
                  <p className="text-[9px] text-slate-500 mt-0.5">I Lavoratori di oggi</p>
                  <span className="text-[10px] font-black text-blue-600 mt-2 bg-white px-2 py-0.5 rounded-lg border border-blue-200/50 shadow-sm">Versano (Contributi)</span>
                </div>
                
                {/* Visual Connector Flow */}
                <div className="flex items-center gap-1 md:gap-1.5 text-slate-300 py-2 flex-wrap justify-center max-w-lg">
                  {puzzle.correctAnswer.split("").map((ch, i) => {
                    const cleanUserInput = userInput.toUpperCase().replace(/[^A-Z0-9]/g, '');
                    const charAtPos = cleanUserInput[i] || '';
                    const hasInput = charAtPos !== '';
                    return (
                      <React.Fragment key={i}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 ${
                          isSolved
                            ? 'bg-emerald-500 text-white shadow-md border border-emerald-400'
                            : hasInput
                              ? 'bg-blue-500 text-white shadow-md border border-blue-400 animate-pulse'
                              : 'bg-white text-slate-400 border border-slate-300 border-dashed hover:border-slate-400'
                        }`}>
                          {isSolved ? ch : (charAtPos || '?')}
                        </div>
                        {i !== puzzle.correctAnswer.length - 1 && (
                          <div className={`h-0.5 w-3 transition-colors duration-300 ${
                            isSolved
                              ? 'bg-emerald-400'
                              : i < cleanUserInput.length
                                ? 'bg-blue-400'
                                : 'bg-slate-200'
                          }`} />
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>

                {/* Generation B Card */}
                <div className="flex flex-col items-center p-3 bg-emerald-50/80 border border-emerald-100 rounded-2xl text-center w-full xl:w-40 shadow-sm shrink-0">
                  <span className="font-extrabold text-[10px] text-emerald-800 tracking-wider uppercase">Generazione B</span>
                  <p className="text-[9px] text-slate-500 mt-0.5">I Pensionati di oggi</p>
                  <span className="text-[10px] font-black text-emerald-600 mt-2 bg-white px-2 py-0.5 rounded-lg border border-emerald-200 shadow-sm">Ricevono lo Scudo</span>
                </div>
              </div>
            </div>
          )}

          {puzzle.mechanicType === 'icons' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-600 leading-relaxed mb-3">
                Fai click su ciascun superpotere per sbloccarlo o toglierlo. Se selezioni correttamente solo i veri campi d'azione assicurati dell'INPS, sommerai i giusti anni e scoprirai l'anno misterioso!
              </p>
              
              <div className="grid grid-cols-2 xl:grid-cols-4 gap-2.5">
                {iconTessera.map((item) => {
                  const isChecked = selectedIcons.includes(item.id);
                  const isCorrect = item.isCorrect;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleIconToggle(item.id)}
                      className={`flex flex-col items-start p-3 rounded-2xl border-2 transition-all cursor-pointer text-left justify-between h-28 ${
                        isChecked
                          ? isCorrect
                            ? 'border-emerald-500 bg-emerald-50/50 shadow-md ring-2 ring-emerald-500/20'
                            : 'border-rose-400 bg-rose-50/50 shadow-md ring-2 ring-rose-400/20'
                          : 'border-slate-100 bg-slate-50/50 hover:bg-slate-50 hover:border-slate-200'
                      }`}
                    >
                      <div className="w-full">
                        <div className="flex items-center justify-between mb-1.5">
                          {item.id === 1 && <Award className={`w-4 h-4 ${isChecked ? 'text-emerald-600' : 'text-amber-500'}`} />}
                          {item.id === 3 && <Heart className={`w-4 h-4 ${isChecked ? 'text-emerald-600' : 'text-red-500'}`} />}
                          {item.id === 5 && <ShieldCheck className={`w-4 h-4 ${isChecked ? 'text-emerald-600' : 'text-emerald-500'}`} />}
                          {item.id === 7 && <Calendar className={`w-4 h-4 ${isChecked ? 'text-emerald-600' : 'text-violet-500'}`} />}
                          {!item.isCorrect && (
                            isChecked 
                              ? <AlertTriangle className="w-4 h-4 text-rose-500 animate-pulse" />
                              : <HelpCircle className="w-4 h-4 text-slate-400" />
                          )}
                          <span className={`text-[9px] font-mono font-bold px-1 py-0.5 rounded ${
                            isChecked
                              ? isCorrect
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-rose-100 text-rose-800'
                              : 'bg-slate-200/60 text-slate-600'
                          }`}>
                            +{item.val}
                          </span>
                        </div>
                        <h4 className="font-bold text-slate-800 text-[11px] mb-0.5 leading-tight">{item.label}</h4>
                      </div>
                      <p className="text-[9px] text-slate-500 font-medium leading-tight">{item.power}</p>
                    </button>
                  );
                })}
              </div>

              {/* Warning Card for Selected Incorrect Tiles */}
              {selectedIcons.some(id => !iconTessera.find(t => t.id === id)?.isCorrect) && (
                <div className="bg-rose-50 border border-rose-200 rounded-xl p-3 space-y-1 text-[11px] text-rose-800 animate-fade-in">
                  <div className="flex items-center gap-1.5 font-bold text-rose-900 border-b border-rose-100 pb-1">
                    <ShieldAlert className="w-3.5 h-3.5 text-rose-600 animate-bounce" />
                    <span>RILIEVO ERRORI: TESSERE NON REGOLAMENTARI</span>
                  </div>
                  <ul className="list-disc pl-3.5 space-y-0.5">
                    {selectedIcons.map(id => {
                      const item = iconTessera.find(t => t.id === id);
                      if (item && !item.isCorrect) {
                        let explanation = "";
                        if (item.id === 2) explanation = "Netflix è intrattenimento commerciale privato, non una forma di previdenza o assistenza sociale pubblica.";
                        if (item.id === 4) explanation = "I punti pizza sono promozioni commerciali dei locali, non coperture dello Stato contro i rischi lavorativi.";
                        if (item.id === 6) explanation = "Gli sconti sui videogiochi sono incentivi commerciali privati, non diritti sociali costituzionali.";
                        if (item.id === 8) explanation = "I viaggi nello spazio sono iniziative commerciali o scientifiche non coperte dal welfare pubblico dell'INPS.";
                        return (
                          <li key={id} className="leading-normal">
                            <strong>{item.label}</strong>: {explanation}
                          </li>
                        );
                      }
                      return null;
                    })}
                  </ul>
                </div>
              )}

              {/* Calculator Panel */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 flex flex-col sm:flex-row gap-2.5 justify-between items-center mt-3 shadow-sm">
                <div>
                  <span className="text-[11px] text-slate-550 font-semibold block sm:inline mr-1.5">Valore totale dei Superpoteri attivati:</span>
                  <div className="text-xl font-black text-slate-800 inline-block align-middle">{selectedSum}</div>
                </div>
                {iconTargetSum !== null && selectedSum === iconTargetSum ? (
                  <div className="flex items-center gap-1.5 text-emerald-700 text-xs font-bold bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-xl">
                    <CheckCircle className="w-3.5 h-3.5 animate-bounce text-emerald-600" />
                    <span>Configurazione Corretta! La chiave {selectedSum} è pronta.</span>
                  </div>
                ) : (
                  <span className="text-[10px] font-semibold px-2.5 py-1 rounded-xl border leading-relaxed text-center sm:text-left">
                    {iconTargetSum !== null && selectedSum > iconTargetSum ? (
                      <span className="text-rose-600 bg-rose-50 border-rose-200 block px-1.5">
                        Somma troppo alta ({selectedSum} &gt; 1898). Hai incluso dei servizi extra!
                      </span>
                    ) : (
                      <span className="text-amber-700 bg-amber-50 border-amber-100 block px-1.5">
                        Somma parziale ({selectedSum} / 1898). Seleziona solo le 4 tessere.
                      </span>
                    )}
                  </span>
                )}
              </div>
            </div>
          )}

          {puzzle.mechanicType === 'constitution' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-650 leading-relaxed mb-3">
                La Costituzione Italiana parla a ciascuno di noi. Clicca sui diversi articoli per leggerli e scoprire quale di questi sancisce lo Scudo Sociale di solidarietà (previdenza e assistenza sociale per tutti i cittadini). Scovato l'articolo giusto, quello diventerà la tua chiave di sblocco!
              </p>
              
              <div className="grid grid-cols-2 xl:grid-cols-3 gap-2.5">
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
                  const isCorrect = art.isTarget;
                  const isDimmed = isSolved && !isCorrect;
                  const isSolvedTarget = isSolved && isCorrect;
                  return (
                    <button
                      key={art.num}
                      type="button"
                      disabled={isSolved}
                      onClick={() => {
                        if (isSolved) return;
                        playSound.playClick();
                        setSelectedArticle(art.num);
                        if (art.isTarget) {
                          setUserInput("38");
                        } else {
                          setUserInput("");
                        }
                      }}
                      className={`flex flex-col items-start p-3 rounded-xl border-2 transition-all text-left h-full ${
                        isSolvedTarget
                          ? 'border-emerald-500 bg-emerald-50 ring-2 ring-emerald-500/25 shadow-md cursor-default'
                          : isDimmed
                            ? 'opacity-40 border-slate-100 bg-slate-50/20 cursor-not-allowed scale-95'
                            : isSelected
                              ? isCorrect
                                ? 'border-emerald-500 bg-emerald-50/60 ring-2 ring-emerald-500/20 shadow-sm cursor-pointer'
                                : 'border-blue-500 bg-blue-50/60 ring-2 ring-blue-500/20 shadow-sm cursor-pointer'
                              : 'border-amber-200/50 bg-amber-50/10 hover:bg-amber-50/30 hover:border-amber-300/60 cursor-pointer'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 mb-1.5 w-full border-b border-slate-100 pb-1">
                        {isSolvedTarget ? (
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
                        ) : (
                          <BookOpen className={`w-3.5 h-3.5 ${isSelected ? 'text-blue-600' : 'text-amber-700/60'}`} />
                        )}
                        <span className="font-bold text-slate-800 text-[11px]">{art.title}</span>
                        {isSolvedTarget && (
                          <span className="text-[8px] bg-emerald-100 text-emerald-800 font-extrabold px-1 rounded-md ml-auto uppercase tracking-wide">
                            Attivo
                          </span>
                        )}
                      </div>
                      <p className="text-[9px] text-slate-655 font-medium leading-tight mb-1.5 italic">
                        "{art.text}"
                      </p>
                      {isSelected && (
                        <div className={`text-[9px] p-1.5 rounded border mt-auto w-full ${
                          art.isTarget 
                            ? 'bg-emerald-100 border-emerald-250 text-emerald-800 font-extrabold shadow-sm'
                            : 'bg-blue-100 border-blue-200 text-blue-800 font-semibold'
                        }`}>
                          {art.desc}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {selectedArticle === 38 && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 flex gap-2.5 text-[11px] text-emerald-800 items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle className="w-4.5 h-4.5 text-emerald-600 animate-bounce" />
                    <span><strong>Scudo Trovato!</strong> L'Articolo 38 è l'asse portante del Welfare. Inserito <strong>38</strong> nella chiave.</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {puzzle.mechanicType === 'payslip' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-650 leading-relaxed mb-3">
                Esplorate la busta paga simulata sottostante. Cliccate sulle diverse voci del cedolino (in particolare sulla trattenuta evidenziata) per scoprire a cosa servono le trattenute e ricavare l'acronimo dello scudo sociale che protegge chi perde il lavoro.
              </p>
              
              <div className="bg-white text-slate-805 rounded-xl border border-slate-200 shadow-md max-w-xl mx-auto overflow-hidden font-sans text-xs">
                {/* Cedolino Header */}
                <div className="bg-slate-50 p-3 border-b border-slate-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-slate-900 text-xs tracking-wide">FUTURO S.R.L.</h4>
                      <p className="text-[9px] text-slate-500">Sede Legale: Via della Previdenza 42, Roma</p>
                    </div>
                    <div className="text-right">
                      <span className="inline-block bg-slate-200 text-slate-800 text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">
                        Cedolino Paga
                      </span>
                      <p className="text-[9px] text-slate-600 font-bold mt-0.5">Periodo: Maggio 2026</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 mt-2 pt-2 border-t border-slate-200 text-[9px]">
                    <div>
                      <span className="text-slate-400 font-medium block uppercase tracking-wider text-[7px]">Dipendente</span>
                      <strong className="text-slate-800 text-[11px]">ROSSI MARIO</strong>
                      <p className="text-slate-500 font-mono text-[9px]">C.F.: RSSMRA09A01H501U</p>
                    </div>
                    <div className="text-right">
                      <span className="text-slate-400 font-medium block uppercase tracking-wider text-[7px]">Inquadramento</span>
                      <strong className="text-slate-800">APPRENDISTA IMPIEGATO</strong>
                    </div>
                  </div>
                </div>

                {/* Cedolino Table */}
                <div className="p-3">
                  <div className="grid grid-cols-12 gap-1 border-b border-slate-300 pb-1.5 text-[9px] text-slate-500 font-bold bg-slate-50 px-2 py-1 rounded-t">
                    <span className="col-span-2">CODICE</span>
                    <span className="col-span-4">DESCRIZIONE</span>
                    <span className="col-span-3 text-right">COMPETENZE</span>
                    <span className="col-span-3 text-right">TRATTENUTE</span>
                  </div>

                  <div className="divide-y divide-slate-100">
                    <button
                      type="button"
                      onClick={() => { playSound.playClick(); setSelectedPayslipKey('lordo'); }}
                      className={`w-full grid grid-cols-12 gap-1 text-left py-2 px-2 transition-all text-[11px] items-center border ${
                        selectedPayslipKey === 'lordo'
                          ? 'bg-blue-50/70 border-blue-200 text-blue-900 font-medium'
                          : 'bg-transparent border-transparent hover:bg-slate-50 text-slate-705'
                      }`}
                    >
                      <span className="col-span-2 font-mono text-slate-400 text-[10px]">1000</span>
                      <span className="col-span-4 font-semibold text-slate-800 text-[10px]">Retribuzione Base (Lordo)</span>
                      <span className="col-span-3 text-right text-emerald-600 font-bold text-[10px]">+ € 1.500,00</span>
                      <span className="col-span-3 text-right text-slate-400 text-[10px]">—</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => { playSound.playClick(); setSelectedPayslipKey('inps'); }}
                      className={`w-full grid grid-cols-12 gap-1 text-left py-2.5 px-2 transition-all text-[11px] items-center border ${
                        selectedPayslipKey === 'inps'
                          ? 'bg-amber-50/90 border-amber-300 text-amber-900 font-medium'
                          : 'bg-amber-50/30 border border-dashed border-amber-400 hover:bg-amber-50/60 text-slate-705 animate-pulse'
                      }`}
                    >
                      <span className="col-span-2 font-mono text-slate-400 text-[10px]">9000</span>
                      <span className="col-span-4 font-bold flex items-center gap-1 text-amber-700 text-[10px]">
                        Contributi Previdenziali INPS *
                      </span>
                      <span className="col-span-3 text-right text-slate-400 text-[10px]">—</span>
                      <span className="col-span-3 text-right text-amber-600 font-bold text-[10px]">- € 137,85</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => { playSound.playClick(); setSelectedPayslipKey('irpef'); }}
                      className={`w-full grid grid-cols-12 gap-1 text-left py-2 px-2 transition-all text-[11px] items-center border ${
                        selectedPayslipKey === 'irpef'
                          ? 'bg-blue-50/70 border-blue-200 text-blue-900 font-medium'
                          : 'bg-transparent border-transparent hover:bg-slate-50 text-slate-750'
                      }`}
                    >
                      <span className="col-span-2 font-mono text-slate-400 text-[10px]">9500</span>
                      <span className="col-span-4 font-semibold text-slate-805 text-[10px]">Imposta IRPEF (Fisco)</span>
                      <span className="col-span-3 text-right text-slate-400 text-[10px]">—</span>
                      <span className="col-span-3 text-right text-red-500 font-bold text-[10px]">- € 162,15</span>
                    </button>
                  </div>

                  {/* Totals & Net Pay */}
                  <div className="border-t border-slate-200 pt-2 mt-2">
                    <div className="grid grid-cols-12 gap-1 px-2 text-[9px] text-slate-500 font-semibold mb-0.5">
                      <span className="col-span-6 text-right">Totale Competenze:</span>
                      <span className="col-span-3 text-right text-slate-700">+ € 1.500,00</span>
                      <span className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-12 gap-1 px-2 text-[9px] text-slate-500 font-semibold mb-2">
                      <span className="col-span-6 text-right">Totale Trattenute:</span>
                      <span className="col-span-3" />
                      <span className="col-span-3 text-right text-slate-700">- € 300,00</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => { playSound.playClick(); setSelectedPayslipKey('netto'); }}
                      className={`w-full grid grid-cols-12 gap-1 text-left py-2 px-2 rounded-lg transition-all border-2 items-center ${
                        selectedPayslipKey === 'netto'
                          ? 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold'
                          : 'bg-emerald-50/30 border-emerald-100 hover:bg-emerald-50/60 text-slate-705'
                      }`}
                    >
                      <span className="col-span-6 font-bold text-slate-800 uppercase tracking-wider text-[10px]">
                        NETTO IN BUSTA
                      </span>
                      <span className="col-span-3 text-right text-emerald-700 text-xs font-black">
                        € 1.200,00
                      </span>
                      <span className="col-span-3 text-right text-[8px] text-slate-450 font-normal italic">
                        (Accredito)
                      </span>
                    </button>
                  </div>
                </div>

                {/* Interactive Explanation Box */}
                <div className="bg-slate-50 p-3 border-t border-slate-200 text-[10px] leading-relaxed min-h-16 flex items-center">
                  {!selectedPayslipKey ? (
                    <p className="text-slate-550 italic">★ Fai clic sulle righe del cedolino paga per esaminare le voci e svelare l'indizio!</p>
                  ) : selectedPayslipKey === 'lordo' ? (
                    <p className="text-slate-700"><strong>Paga Base (Stipendio Lordo):</strong> È la retribuzione totale pattuita nel contratto di lavoro prima delle ritenute fiscali e previdenziali. Rappresenta il valore economico lordo del tuo lavoro.</p>
                  ) : selectedPayslipKey === 'inps' ? (
                    <p className="text-slate-700">
                      <strong>★ Contributi Previdenziali INPS:</strong> Non sono tasse generiche, ma una quota accantonata per la tua sicurezza sociale! Finanziano pensioni, malattia, infortuni e soprattutto la <strong>Nuova Assicurazione Sociale per l'Impiego</strong> (il sussidio di disoccupazione che supporta chi perde involontariamente il lavoro). Qual è la sigla formata dalle sue iniziali?
                    </p>
                  ) : selectedPayslipKey === 'irpef' ? (
                    <p className="text-slate-700"><strong>Imposta IRPEF:</strong> È l'Imposta sul Reddito delle Persone Fisiche trattenuta per conto dello Stato. Queste tasse servono a coprire i costi di servizi pubblici essenziali di cui usufruisci quotidianamente, come la scuola e la sanità.</p>
                  ) : (
                    <p className="text-slate-700"><strong>Netto in Busta:</strong> È la somma liquida effettiva che viene accreditata sul tuo conto corrente bancario (ottenuta sottraendo Contributi INPS ed IRPEF dalla Paga Base Lorda).</p>
                  )}
                </div>
              </div>

              {selectedPayslipKey === 'inps' && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-[11px] text-amber-800 flex items-start gap-2 max-w-xl mx-auto">
                  <CheckCircle className="w-4.5 h-4.5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold mb-0.5">💡 Indizio Sbloccato!</p>
                    <span>Prendi le lettere iniziali: <strong>N</strong>uova <strong>A</strong>ssicurazione <strong>S</strong>ociale <strong>P</strong>er l'<strong>I</strong>mpiego. Inserisci l'acronimo in maiuscolo.</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {puzzle.mechanicType === 'decode' && (
            <div className="space-y-4">
              {puzzle.id === 5 ? (
                /* Enigma 5: La Catena del Welfare - Interactive Chain UI */
                <div className="space-y-4">
                  <p className="text-xs text-slate-600 leading-relaxed text-center max-w-lg mx-auto">
                    La catena del Welfare supporta chi si trova in temporaneo infortunio, chi perde il lavoro (Disoccupazione), e chi soffre di disabilità. Per ricongiungere le maglie, dobbiamo inserire le lettere mancanti:
                  </p>

                  <div className="flex justify-center items-center flex-wrap gap-y-3 py-4 px-3 bg-slate-50 border border-slate-200/60 rounded-2xl max-w-xl mx-auto shadow-inner">
                    {(puzzle.correctAnswer || '').split('').map((char, index) => {
                      const maskPositions: number[] = (puzzle.mechanicData && puzzle.mechanicData.maskPositions) || [];
                      const isMasked = maskPositions.includes(index);
                      const isPlaced = isMasked && chainLetters[index];
                      const displayChar = isSolved ? char : (isMasked ? (chainLetters[index] || '?') : char);
                      
                      return (
                        <div key={index} className="flex items-center">
                          {index > 0 && (
                            <div className={`h-1.5 w-3 -mx-1 z-0 transition-colors duration-300 ${
                              isSolved 
                                ? 'bg-emerald-400 border-y border-emerald-500' 
                                : isPlaced
                                  ? 'bg-blue-400 border-y border-blue-500'
                                  : 'bg-slate-300 border-y border-slate-400'
                            }`} />
                          )}
                          <button
                            type="button"
                            disabled={isSolved || !isMasked}
                            onClick={() => {
                              if (isMasked && !isSolved) {
                                playSound.playClick();
                                const newChain = { ...chainLetters };
                                delete newChain[index];
                                setChainLetters(newChain);
                                // Sync to input
                                const updatedInput = (puzzle.correctAnswer || '').split('').map((c, i) => {
                                  if (maskPositions.includes(i)) {
                                    return i === index ? '' : (chainLetters[i] || '');
                                  }
                                  return c;
                                }).join('');
                                setUserInput(updatedInput);
                              }
                            }}
                            className={`w-8 h-8 rounded-full flex items-center justify-center font-extrabold text-sm border-2 relative z-10 transition-all shadow-sm ${
                              isSolved
                                ? 'border-emerald-500 bg-emerald-50 text-emerald-700 cursor-default'
                                : isMasked
                                  ? isPlaced
                                    ? 'border-blue-500 bg-blue-50 text-blue-700 hover:bg-blue-100/80 hover:scale-105 cursor-pointer animate-none'
                                    : 'border-dashed border-amber-400 bg-amber-50 text-amber-600 animate-pulse hover:bg-amber-100/40 cursor-pointer'
                                  : 'border-slate-300 bg-white text-slate-805 cursor-default'
                            }`}
                          >
                            {displayChar}
                          </button>
                        </div>
                      );
                    })}
                  </div>

                  {!isSolved && (
                    <div className="text-center space-y-2 mt-3">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                        Clicca sui frammenti per completare la catena:
                      </span>
                      <div className="flex justify-center gap-1.5 flex-wrap">
                        {['D', 'A', 'E', 'L', 'O', 'P'].map((letter, idx) => {
                          return (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => {
                                playSound.playClick();
                                const maskPositions = [4, 5, 8];
                                const emptyPos = maskPositions.find(pos => !chainLetters[pos]);
                                if (emptyPos !== undefined) {
                                  const newChain = { ...chainLetters, [emptyPos]: letter };
                                  setChainLetters(newChain);
                                  // Sync to input
                                  const updatedInput = (puzzle.correctAnswer || '').split('').map((c, i) => {
                                    if (maskPositions.includes(i)) {
                                      return newChain[i] || '';
                                    }
                                    return c;
                                  }).join('');
                                  setUserInput(updatedInput);
                                }
                              }}
                              className="w-8 h-8 rounded-xl border border-slate-205 bg-white hover:bg-slate-50 hover:border-slate-300 text-slate-808 font-extrabold text-xs shadow-sm transition-all cursor-pointer flex items-center justify-center active:scale-95"
                            >
                              {letter}
                            </button>
                          );
                        })}
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          playSound.playClick();
                          setChainLetters({});
                          const clearedInput = (puzzle.correctAnswer || '').split('').map((c, i) => [4, 5, 8].includes(i) ? '' : c).join('');
                          setUserInput(clearedInput);
                        }}
                        className="text-[9px] text-slate-400 hover:text-slate-600 underline font-medium cursor-pointer"
                      >
                        Azzera lettere inserite
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                /* Enigma 8, 10, 12: Classic Decoding Puzzle with Input Character Syncing */
                <div className="space-y-3">
                  <p className="text-xs text-slate-600 leading-relaxed text-center max-w-md mx-auto">
                    Risolvi il quesito e inserisci il codice decifrato. Le caselle mostreranno i caratteri man mano che li digiti nel campo di testo sottostante.
                  </p>

                  <div className="flex justify-center flex-wrap gap-1.5 py-3 bg-slate-50 rounded-2xl border border-slate-200 max-w-md mx-auto px-3 shadow-inner">
                    {(puzzle.correctAnswer || '').split('').map((char, index) => {
                      const hasTyped = userInput && userInput[index];
                      const displayChar = isSolved ? char : (hasTyped ? userInput[index].toUpperCase() : '•');
                      
                      return (
                        <div
                          key={index}
                          className={`w-8 h-8 rounded-xl flex items-center justify-center border-2 transition-all font-mono font-bold text-sm ${
                            isSolved
                              ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                              : hasTyped
                                ? 'border-blue-500 bg-blue-50 text-blue-700'
                                : 'border-slate-200 bg-white text-slate-300'
                          }`}
                        >
                          {displayChar}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
              
              <ul className="list-decimal pl-4.5 space-y-0.5 text-[10px] text-slate-500 italic mt-2.5 max-w-md mx-auto">
                <li>Chi lavora ed è forte aiuta anche chi è fragile.</li>
                <li>I contributi previdenziali creano un tesoro a cui attingere in caso di gravi bisogni.</li>
              </ul>
            </div>
          )}

          {puzzle.mechanicType === 'boss' && (
            <div className="space-y-4">
              {/* Split Screen Battle Dashboard */}
              <div className="grid md:grid-cols-2 gap-4 mt-1">
                
                {/* Left Side: IL NEMICO (Signor Evasore) */}
                <div className="bg-red-50 border-2 border-red-200 rounded-3xl p-4 relative overflow-hidden shadow-sm flex flex-col justify-between min-h-[170px]">
                  <div className="absolute top-0 right-0 p-2 opacity-5">
                    <ShieldAlert className="w-20 h-20 text-red-700 animate-spin" style={{ animationDuration: '20s' }} />
                  </div>

                  <div>
                    <div className="flex items-center gap-1.5 mb-2">
                      <AlertTriangle className="w-4.5 h-4.5 text-red-600 animate-pulse" />
                      <h4 className="font-black text-red-800 text-[10px] tracking-wider uppercase">MINACCIA: VIRUS LAVORO NERO</h4>
                    </div>

                    <div className="flex items-center gap-2.5 bg-white/60 rounded-xl p-2.5 border border-red-100 mb-3">
                      <div className="w-7 h-7 rounded-full bg-red-600 text-white flex items-center justify-center font-black text-xs shadow-sm">
                        😈
                      </div>
                      <div className="flex-1">
                        <strong className="text-[10px] text-red-950 font-extrabold">Signor Evasore</strong>
                        <p className="text-[9px] text-red-750 italic leading-tight">"Ti do 50 euro oggi... il contratto non serve!"</p>
                      </div>
                    </div>

                    {/* Boss Health Bar */}
                    <div className="space-y-0.5">
                      <div className="flex justify-between text-[9px] font-bold text-red-900">
                        <span>Punti Vita Virus:</span>
                        <span className="font-mono">{isSolved ? 0 : (100 - bossClauses.length * 20)}% HP</span>
                      </div>
                      <div className="w-full bg-red-200/50 rounded-full h-2.5 border border-red-350 overflow-hidden shadow-inner">
                        <div 
                          className="bg-red-650 h-full transition-all duration-500 ease-out"
                          style={{ width: `${isSolved ? 0 : (100 - bossClauses.length * 20)}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="text-[9px] text-red-800/80 font-medium leading-relaxed border-t border-red-200/60 pt-2 mt-3">
                    ⚠️ <em>Senza un contratto regolare perdi pensione, malattia pagata e sicurezza. Proteggiti!</em>
                  </div>
                </div>

                {/* Right Side: IL SIGILLO (Il Contratto) */}
                <div className="bg-amber-50/20 border-2 border-amber-200 rounded-3xl p-4 shadow-sm font-sans flex flex-col justify-between min-h-[170px]">
                  <div>
                    <div className="flex items-center gap-1.5 mb-2 border-b border-amber-250 pb-1.5">
                      <FileText className="w-3.5 h-3.5 text-amber-600" />
                      <h4 className="font-extrabold text-amber-900 text-[10px] tracking-wider uppercase">BOZZA CONTRATTO REGOLARE</h4>
                    </div>

                    {/* Clipboard template details */}
                    <div className="bg-white/95 rounded-xl p-2.5 border border-amber-200 text-[9px] space-y-0.5 font-mono text-slate-700 shadow-inner">
                      <div><span className="text-slate-400">DIPENDENTE:</span> <strong className="text-slate-805">ROSSI MARIO</strong></div>
                      <div><span className="text-slate-400">INQUADRAMENTO:</span> <strong className="text-slate-805">APPRENDISTA</strong></div>
                      <div>
                        <span className="text-slate-400">ACCORDO:</span>{' '}
                        {isSolved ? (
                          <span className="text-emerald-700 font-black bg-emerald-100 px-1 rounded text-[8px]">CONTRATTO</span>
                        ) : (
                          <span className="text-blue-600 font-bold bg-blue-50 px-1 rounded animate-pulse text-[8px]">[ IN ATTESA ]</span>
                        )}
                      </div>
                      <div className="pt-1.5 border-t border-dashed border-amber-200 space-y-0.5 text-[8px]">
                        <div className="flex justify-between">
                          <span>1. Contributi INPS:</span>
                          <span className={bossClauses.includes('contributi') || isSolved ? 'text-emerald-600 font-bold' : 'text-slate-400'}>
                            {bossClauses.includes('contributi') || isSolved ? '✓ ATTIVO' : '✗ OFF'}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>2. Copertura INAIL:</span>
                          <span className={bossClauses.includes('infortuni') || isSolved ? 'text-emerald-600 font-bold' : 'text-slate-400'}>
                            {bossClauses.includes('infortuni') || isSolved ? '✓ ATTIVO' : '✗ OFF'}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>3. Tutela Malattia:</span>
                          <span className={bossClauses.includes('ferie') || isSolved ? 'text-emerald-600 font-bold' : 'text-slate-400'}>
                            {bossClauses.includes('ferie') || isSolved ? '✓ ATTIVO' : '✗ OFF'}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>4. Paga Minima:</span>
                          <span className={bossClauses.includes('paga') || isSolved ? 'text-emerald-600 font-bold' : 'text-slate-400'}>
                            {bossClauses.includes('paga') || isSolved ? '✓ ATTIVO' : '✗ OFF'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Stamp/Lock Status */}
                  <div className="mt-3 pt-1.5 border-t border-amber-100 flex justify-center">
                    {isSolved ? (
                      <span className="bg-emerald-100 border-2 border-dashed border-emerald-500 text-emerald-700 text-[10px] font-black uppercase px-3 py-1 rounded-xl rotate-[-2deg] shadow-sm tracking-wider animate-bounce">
                        印 FIRMATO & TUTELATO
                      </span>
                    ) : (
                      <span className="text-[9px] text-amber-705 font-semibold italic text-center">
                        {bossClauses.length < 4 
                          ? `Attiva le 4 tessere sotto (${bossClauses.length}/4)` 
                          : "Tutele pronte! Firma digitando la parola chiave sotto."
                        }
                      </span>
                    )}
                  </div>
                </div>

              </div>

              {/* Tessere/Clausole Checkboxes (Clickable buttons) */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-wide">Attiva le Tutele Contrattuali obbligatorie per danneggiare il virus:</span>
                <div className="grid grid-cols-2 xl:grid-cols-4 gap-2">
                  {[
                    { id: 'contributi', label: 'Contributi INPS', desc: 'Garantisce la futura pensione.' },
                    { id: 'infortuni', label: 'Copertura INAIL', desc: 'Ti indennizza se ti fai male.' },
                    { id: 'ferie', label: 'Ferie & Malattia', desc: 'Resti pagato a casa se ti ammali.' },
                    { id: 'paga', label: 'Paga Minima', desc: 'Garantisce lo stipendio equo.' }
                  ].map(clause => {
                    const isActive = bossClauses.includes(clause.id) || isSolved;
                    return (
                      <button
                        key={clause.id}
                        type="button"
                        disabled={isSolved}
                        onClick={() => handleBossClauseToggle(clause.id)}
                        className={`p-2.5 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                          isActive
                            ? 'border-emerald-500 bg-emerald-50/50 shadow-sm'
                            : 'border-slate-205 bg-slate-50/50 hover:bg-slate-50 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center justify-between w-full mb-0.5">
                          <strong className="text-slate-800 text-[10px] font-extrabold leading-tight">{clause.label}</strong>
                          <div className={`w-3.5 h-3.5 rounded-md border flex items-center justify-center shrink-0 ${isActive ? 'bg-emerald-500 border-emerald-600 text-white' : 'border-slate-300 bg-white'}`}>
                            {isActive && <span className="text-[9px] font-bold">✓</span>}
                          </div>
                        </div>
                        <p className="text-[8px] text-slate-500 leading-tight">{clause.desc}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>
          )}
        </div>

        {/* Input Question and Form Area */}
        <div className="border-t border-slate-100 pt-4 space-y-3">
          <p className="text-slate-800 text-xs font-bold flex gap-1.5 items-start">
            <span className="text-blue-600">➜</span> {puzzle.question}
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5">
            <div className="flex-1 relative flex items-center">
              <input
                id={`puzzle-answer-input`}
                type="text"
                placeholder={
                  puzzle.mechanicType === 'icons'
                    ? `Es: ${iconTargetSum ?? '1898'}`
                    : puzzle.mechanicType === 'boss' && bossClauses.length < 4
                      ? "Attiva prima tutte le 4 tessere delle tutele..."
                      : "Rispondi in MAIUSCOLO"
                }
                value={userInput}
                onChange={(e) => {
                  const val = e.target.value;
                  setUserInput(val);
                  if (errorFeedback) setErrorFeedback(null);
                  if (puzzle.id === 5) {
                    const upperVal = val.toUpperCase();
                    const newChain: { [key: number]: string } = {};
                    [4, 5, 8].forEach(pos => {
                      if (upperVal[pos]) {
                        newChain[pos] = upperVal[pos];
                      }
                    });
                    setChainLetters(newChain);
                  }
                }}
                className={`w-full bg-slate-50 border-2 border-slate-200 hover:border-slate-350 focus:border-blue-500 rounded-xl pl-3 pr-16 py-2.5 text-slate-800 font-bold focus:outline-none transition-all placeholder:text-slate-400 placeholder:font-normal uppercase text-xs ${isSolved ? 'border-emerald-300 bg-emerald-50/20' : ''}`}
                disabled={successAnim || isSolved || (puzzle.mechanicType === 'boss' && bossClauses.length < 4)}
                autoComplete="off"
              />
              {userInput && !successAnim && !isSolved && (
                <button
                  type="button"
                  onClick={() => {
                    setUserInput('');
                    playSound.playClick();
                    if (puzzle.id === 5) {
                      setChainLetters({});
                    }
                  }}
                  className="absolute right-2.5 bg-slate-200 hover:bg-slate-300 text-slate-700 font-black px-2 py-0.5 rounded-lg text-[9px] cursor-pointer uppercase transition-colors"
                >
                  Cancella
                </button>
              )}
            </div>
            <button
              id={`submit-puzzle-${puzzle.id}-btn`}
              type="submit"
              className={`font-bold px-5 py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 shrink-0 text-xs ${
                isSolved 
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white cursor-default' 
                  : 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer disabled:opacity-50'
              }`}
              disabled={successAnim || isSolved || (puzzle.mechanicType === 'boss' && bossClauses.length < 4)}
            >
              {isSolved ? (
                <>✓ Risolto</>
              ) : (
                <>Invio Chiave <ArrowRight className="w-3.5 h-3.5" /></>
              )}
            </button>
          </form>

          {/* Feedback Messages */}
          <AnimatePresence mode="wait">
            {errorFeedback && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="bg-red-50 border border-red-200 rounded-xl p-3 flex gap-2.5 text-xs text-red-800 items-start"
              >
                <ShieldAlert className="w-4.5 h-4.5 text-red-650 shrink-0" />
                <p className="font-semibold leading-relaxed">{errorFeedback}</p>
              </motion.div>
            )}

            {successAnim && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-emerald-50 border-2 border-emerald-350 rounded-xl p-4 text-center flex flex-col items-center gap-1.5"
              >
                <div className="w-9 h-9 bg-emerald-500 rounded-full flex items-center justify-center text-white text-base font-bold animate-bounce mb-0.5">
                  ✓
                </div>
                <h4 className="font-extrabold text-emerald-800 text-xs">CODICE ACCETTATO!</h4>
                <p className="text-[10px] text-emerald-705 font-semibold max-w-md">
                  Scudo rigenerato! State sbloccando la barriera del tempo e potenziando il Welfare dei ragazzi.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
