/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, FormEvent } from 'react';
import { puzzlesList } from './data/puzzles';
import { playSound } from './utils/audio';
import { PuzzleStep } from './components/PuzzleStep';
import { TeacherPanel } from './components/TeacherPanel';
import { TeamState, LeaderboardEntry } from './types';
import { 
  ShieldAlert, ShieldCheck, Timer as TimerIcon, Trophy, Flame, UserCheck, 
  Settings, Volume2, VolumeX, RefreshCw, Zap, Landmark, Play, Sparkles, BookOpen
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TIMER_DURATION_SECONDS, computeLiveScore } from './utils/score';

export default function App() {
  const [activeStep, setActiveStep] = useState<'welcome' | 'playing' | 'victory' | 'gameover'>('welcome');
  const [currentGameIndex, setCurrentGameIndex] = useState(0);
  const [soundOn, setSoundOn] = useState(true);
  const [showTeacherPanel, setShowTeacherPanel] = useState(false);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  
  // Game team state
  const [teamState, setTeamState] = useState<TeamState>({
    teamName: '',
    schoolClass: '',
    score: 2000,
    hintsUsed: {},
    wrongAttempts: {},
    completedPuzzles: [],
    startTime: null,
    endTime: null,
    timeRemaining: TIMER_DURATION_SECONDS
  });

  // Sound toggle synchronization
  const handleToggleSound = () => {
    const newState = !soundOn;
    setSoundOn(newState);
    playSound.toggleSound(newState);
    playSound.playClick();
  };

  // Live Score Calculator is imported from ./utils/score

  // Seeding and restoring Leaderboard
  useEffect(() => {
    const existing = localStorage.getItem('missione_previdenza_leaderboard');
    if (existing) {
      try {
        setLeaderboard(JSON.parse(existing));
      } catch (e) {
        console.warn("Could not read leaderboard:", e);
      }
    } else {
      const initialMockLeaderboard: LeaderboardEntry[] = [
        {
          teamName: "Super-Welfare",
          schoolClass: "2° C - Medie",
          score: 1680,
          timeSpentSeconds: 980,
          hintsUsedCount: 1,
          wrongAttemptsCount: 1,
          completedAt: new Date(Date.now() - 4 * 3600 * 1000).toISOString()
        },
        {
          teamName: "I Costituzionalisti",
          schoolClass: "3° A - Medie",
          score: 1420,
          timeSpentSeconds: 1250,
          hintsUsedCount: 2,
          wrongAttemptsCount: 2,
          completedAt: new Date(Date.now() - 2 * 3600 * 1000).toISOString()
        },
        {
          teamName: "Cavalieri dell'INPS",
          schoolClass: "3° B - Medie",
          score: 1350,
          timeSpentSeconds: 1420,
          hintsUsedCount: 3,
          wrongAttemptsCount: 1,
          completedAt: new Date(Date.now() - 1 * 3600 * 1000).toISOString()
        },
        {
          teamName: "Welfare Warriors",
          schoolClass: "2° B - Medie",
          score: 1100,
          timeSpentSeconds: 1850,
          hintsUsedCount: 5,
          wrongAttemptsCount: 4,
          completedAt: new Date(Date.now() - 5 * 3600 * 1000).toISOString()
        }
      ];
      localStorage.setItem('missione_previdenza_leaderboard', JSON.stringify(initialMockLeaderboard));
      setLeaderboard(initialMockLeaderboard);
    }
  }, []);

  // Safe localStorage Restoration
  useEffect(() => {
    const cached = localStorage.getItem('missione_previdenza_state');
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        // Ensure standard fields
        if (parsed.teamName) {
          if (!parsed.wrongAttempts) parsed.wrongAttempts = {};
          setTeamState(parsed);
          if (parsed.completedPuzzles.length === puzzlesList.length) {
            setActiveStep('victory');
          } else if (parsed.timeRemaining <= 0) {
            setActiveStep('gameover');
          } else {
            setActiveStep('playing');
            setCurrentGameIndex(parsed.completedPuzzles.length);
          }
        }
      } catch (e) {
        console.warn("Could not parse cached team state:", e);
      }
    }
  }, []);

  // Save State Helper
  const persistState = (state: TeamState) => {
    localStorage.setItem('missione_previdenza_state', JSON.stringify(state));
  };

  // Timer Effect
  useEffect(() => {
    let intervalId: any = null;
    if (activeStep === 'playing') {
      intervalId = setInterval(() => {
        setTeamState((prev) => {
          if (prev.timeRemaining <= 1) {
            clearInterval(intervalId);
            playSound.playFailure();
            setActiveStep('gameover');
            const updated = { ...prev, timeRemaining: 0, score: 100 };
            persistState(updated);
            return updated;
          }
          const nextTime = prev.timeRemaining - 1;
          const nextScore = computeLiveScore(nextTime, prev.hintsUsed, prev.wrongAttempts);
          const updated = { ...prev, timeRemaining: nextTime, score: nextScore };
          persistState(updated);
          return updated;
        });
      }, 1000);
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [activeStep]);

  // Formatter for visible clock
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remSecs = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remSecs.toString().padStart(2, '0')}`;
  };

  const handleStartGame = (e: FormEvent) => {
    e.preventDefault();
    if (!teamState.teamName || !teamState.schoolClass) return;

    playSound.playClick();
    playSound.playSuccess();

    const startedState: TeamState = {
      teamName: teamState.teamName,
      schoolClass: teamState.schoolClass,
      score: 2000,
      hintsUsed: {},
      wrongAttempts: {},
      completedPuzzles: [],
      startTime: Date.now(),
      endTime: null,
      timeRemaining: TIMER_DURATION_SECONDS
    };

    setTeamState(startedState);
    persistState(startedState);
    setCurrentGameIndex(0);
    setActiveStep('playing');
  };

  const handleSolvePuzzle = (puzzleId: number) => {
    setTeamState((prev) => {
      const isAlreadyCompleted = prev.completedPuzzles.includes(puzzleId);
      const isLastPuzzle = currentGameIndex === puzzlesList.length - 1;

      let completedLst = prev.completedPuzzles;
      if (!isAlreadyCompleted) {
        completedLst = [...prev.completedPuzzles, puzzleId];
      }

      const calculatedScore = computeLiveScore(prev.timeRemaining, prev.hintsUsed, prev.wrongAttempts);

      const updated: TeamState = {
        ...prev,
        completedPuzzles: completedLst,
        score: calculatedScore,
        endTime: isLastPuzzle ? Date.now() : null
      };

      persistState(updated);

      if (isLastPuzzle) {
        playSound.playGameWin();
        
        // Add to leaderboard!
        const newEntry: LeaderboardEntry = {
          teamName: prev.teamName,
          schoolClass: prev.schoolClass,
          score: calculatedScore,
          timeSpentSeconds: TIMER_DURATION_SECONDS - prev.timeRemaining,
          hintsUsedCount: (Object.values(prev.hintsUsed) as number[]).reduce((a, b) => a + b, 0),
          wrongAttemptsCount: (Object.values(prev.wrongAttempts || {}) as number[]).reduce((a, b) => a + b, 0),
          completedAt: new Date().toISOString()
        };

        const existingLeaderboard = localStorage.getItem('missione_previdenza_leaderboard');
        let leaderboardList: LeaderboardEntry[] = [];
        if (existingLeaderboard) {
          try {
            leaderboardList = JSON.parse(existingLeaderboard);
          } catch(e) {
            leaderboardList = [];
          }
        }
        
        // Push the new completion record
        leaderboardList.push(newEntry);
        // Sort by score descending, then by timeSpentSeconds ascending
        leaderboardList.sort((a,b) => b.score - a.score || a.timeSpentSeconds - b.timeSpentSeconds);
        // Save back
        localStorage.setItem('missione_previdenza_leaderboard', JSON.stringify(leaderboardList));
        setLeaderboard(leaderboardList);

        setActiveStep('victory');
      } else {
        setCurrentGameIndex(currentGameIndex + 1);
      }
      return updated;
    });
  };

  const handleUseHint = (puzzleId: number) => {
    setTeamState((prev) => {
      const current = prev.hintsUsed[puzzleId] || 0;
      const nextHintsUsed = {
        ...prev.hintsUsed,
        [puzzleId]: current + 1
      };
      const nextScore = computeLiveScore(prev.timeRemaining, nextHintsUsed, prev.wrongAttempts);
      const updated: TeamState = {
        ...prev,
        hintsUsed: nextHintsUsed,
        score: nextScore
      };
      persistState(updated);
      return updated;
    });
  };

  const handleWrongAttempt = (puzzleId: number) => {
    setTeamState((prev) => {
      const current = (prev.wrongAttempts && prev.wrongAttempts[puzzleId]) || 0;
      const nextWrongAttempts = {
        ...(prev.wrongAttempts || {}),
        [puzzleId]: current + 1
      };
      const nextScore = computeLiveScore(prev.timeRemaining, prev.hintsUsed, nextWrongAttempts);
      const updated: TeamState = {
        ...prev,
        wrongAttempts: nextWrongAttempts,
        score: nextScore
      };
      persistState(updated);
      return updated;
    });
  };

  const handleResetGame = () => {
    playSound.playClick();
    localStorage.removeItem('missione_previdenza_state');
    setTeamState({
      teamName: '',
      schoolClass: '',
      score: 2000,
      hintsUsed: {},
      wrongAttempts: {},
      completedPuzzles: [],
      startTime: null,
      endTime: null,
      timeRemaining: TIMER_DURATION_SECONDS
    });
    setCurrentGameIndex(0);
    setActiveStep('welcome');
    setShowTeacherPanel(false);
  };

  const forceSkipToPuzzle = (puzzleId: number) => {
    playSound.playClick();
    const index = puzzlesList.findIndex(p => p.id === puzzleId);
    if (index !== -1) {
      setCurrentGameIndex(index);
      setTeamState(prev => {
        const updated = {
          ...prev,
          completedPuzzles: puzzlesList.slice(0, index).map(p => p.id)
        };
        persistState(updated);
        return updated;
      });
      setActiveStep('playing');
    }
  };

  // Percentage calculation for progress bar
  const percentComplete = Math.floor((teamState.completedPuzzles.length / puzzlesList.length) * 107) / 1.07; // limit floating

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans select-none antialiased">
      
      {/* Upper Navigation Rail */}
      <header className="bg-white border-b border-slate-200 py-2.5 px-6 md:px-8 flex justify-between items-center sticky top-0 z-50 shadow-sm print:hidden">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-blue-650 hover:scale-105 rounded-xl flex items-center justify-center text-white font-extrabold shadow-md transition-all">
            <span className="text-xl">🛡️</span>
          </div>
          <div>
            <h1 className="text-xs font-black text-slate-900 leading-tight uppercase tracking-wider">Missione Previdenza</h1>
            <p className="text-[9px] text-slate-500 font-bold">Welfare Escape Room • INPS per le Scuole</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Sounds Toggle */}
          <button
            id={`toggle-sounds-btn`}
            onClick={handleToggleSound}
            className="p-2 rounded-xl text-slate-500 hover:text-blue-600 hover:bg-slate-50 cursor-pointer transition-colors"
            title={soundOn ? "Mutolo" : "Attiva Suoni"}
          >
            {soundOn ? <Volume2 className="w-4.5 h-4.5" /> : <VolumeX className="w-4.5 h-4.5" />}
          </button>

          {/* Teacher Guide Mode Button */}
          <button
            id={`toggle-teacher-panel-btn`}
            onClick={() => {
              playSound.playClick();
              setShowTeacherPanel(!showTeacherPanel);
            }}
            className={`px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all flex items-center gap-1 cursor-pointer ${
              showTeacherPanel 
                ? 'bg-amber-100 text-amber-800' 
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            <BookOpen className="w-3 h-3" />
            {showTeacherPanel ? "Nascondi Area Docente" : "Area Docente"}
          </button>

          {activeStep !== 'welcome' && (
            <button
              id={`reset-escape-btn`}
              onClick={handleResetGame}
              className="p-2 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 cursor-pointer transition-colors"
              title="Reset Partita"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </header>

      {/* Main Body Grid */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-8 py-3 flex flex-col justify-center h-full">

        <AnimatePresence mode="wait">
          {/* Global Teachers Module Modal/Overlay */}
          {showTeacherPanel && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-8"
              id="teacher-panel-overlay"
            >
              <TeacherPanel 
                onSkipToPuzzle={forceSkipToPuzzle} 
                onResetGame={handleResetGame} 
              />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          
          {/* 1. Welcome Screen */}
          {activeStep === 'welcome' && (
            <motion.div
              key="welcome-screen"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="max-w-3xl mx-auto w-full"
            >
              <div className="bg-white border-2 border-slate-200 rounded-3xl p-6 md:p-10 shadow-2xl space-y-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 bg-blue-100/40 rounded-full blur-3xl -z-10" />

                <div className="text-center space-y-3">
                  <div className="flex justify-center mb-2">
                    <span className="text-6xl animate-bounce">🛡️</span>
                  </div>
                  <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-none">
                    MISSIONE PREVIDENZA
                  </h1>
                  <p className="text-sm md:text-base font-bold text-blue-600 uppercase tracking-widest">
                    Viaggio nel 2086: Salva lo Scudo Sociale
                  </p>
                  <p className="text-xs text-slate-500 max-w-xl mx-auto leading-relaxed">
                    Un'escape room digitale interattiva progettata per le scuole medie d'Italia. 
                    Impara a cooperare col tuo gruppo, sconfiggi l'evasione e scopri le regole fondamentali del vivere comune.
                  </p>
                </div>

                <div className="bg-slate-50 border border-slate-150 rounded-2xl p-5 md:p-6 space-y-3 leading-relaxed">
                  <h3 className="text-sm font-black text-slate-800 flex items-center gap-1.5 uppercase">
                    📚 La Storia di Sfondo:
                  </h3>
                  <p className="text-xs md:text-sm text-slate-600">
                    Siamo nell'anno 2086. Il temibile <strong className="text-red-600">"Signor Evasore"</strong> ha lanciato un virus quantistico che ha azzerato l'Istituto Nazionale di Previdenza Sociale (INPS). Nel futuro, se un lavoratore si ammala, viene licenziato senza stipendio; non esistono pensioni e la tutela scolastica o genitoriale è completamente svanita. La protezione e la solidarietà sono andate perdute!
                  </p>
                  <p className="text-xs md:text-sm text-slate-650">
                    Sarete voi, la squadra di <strong>Cittadini Attivi</strong>, ad utilizzare la macchina del tempo dell'aula per rintracciare i {puzzlesList.length} frammenti dello Scudo Generazionale. Avete solo <strong>45 minuti</strong> prima che il portale temporale si chiuda per sempre!
                  </p>
                </div>

                {/* Team Register Form */}
                <form onSubmit={handleStartGame} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-black text-slate-650 uppercase" htmlFor="team-name-input">Nome del Team dei Lavoratori</label>
                      <input
                        id="team-name-input"
                        type="text"
                        required
                        placeholder="Es: I Cavalieri del Welfare"
                        value={teamState.teamName}
                        onChange={(e) => setTeamState({ ...teamState, teamName: e.target.value })}
                        className="w-full bg-slate-50 border-2 border-slate-200 rounded-2xl px-4 py-3 text-sm font-semibold focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-black text-slate-650 uppercase" htmlFor="school-class-input">Classe Scolastica (es: 2° A)</label>
                      <input
                        id="school-class-input"
                        type="text"
                        required
                        placeholder="Es: 2° A - Scuole Medie"
                        value={teamState.schoolClass}
                        onChange={(e) => setTeamState({ ...teamState, schoolClass: e.target.value })}
                        className="w-full bg-slate-50 border-2 border-slate-200 rounded-2xl px-4 py-3 text-sm font-semibold focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>
                  </div>

                  <button
                    id="start-game-btn"
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-2xl cursor-pointer shadow-lg hover:shadow-blue-200 flex items-center justify-center gap-2 transition-all transition-transform active:scale-95"
                  >
                    <Play className="w-5 h-5 fill-current" /> Entra nel Portale Temporale
                  </button>
                </form>

                <div className="flex justify-center gap-6 text-slate-400 text-xs border-t border-slate-100 pt-6">
                  <div className="flex items-center gap-1.5">
                    <TimerIcon className="w-3.5 h-3.5 text-blue-500" />
                    <span>Tempo: 45 Minuti</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-blue-500" />
                    <span>{puzzlesList.length} Sfide Previdenziali</span>
                  </div>
                </div>
              </div>

              {/* Competitiveness Rules & Scores scoreboard alongside real-time leaderboard */}
              <div className="grid md:grid-cols-2 gap-6 mt-8">
                {/* Rules & Score Engine Breakdown */}
                <div className="bg-white border-2 border-slate-200 rounded-3xl p-6 shadow-xl space-y-4 text-left">
                  <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                    <Zap className="w-5 h-5 text-blue-600" />
                    <h3 className="text-xs font-black text-slate-800 uppercase tracking-tight">Motore di Competizione: XP Gara</h3>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Per scontrarsi con altre classi, dovrete bilanciare velocità d'esecuzione ed attenzione. Ogni errore di digitazione o suggerimento sbloccato impatta il punteggio finale!
                  </p>
                  <div className="space-y-3 text-xs">
                    <div className="flex items-start gap-2.5">
                      <span className="font-bold text-amber-500 shrink-0">📈</span>
                      <div>
                        <strong className="text-slate-800">Punti di Partenza:</strong>
                        <p className="text-slate-500 text-[11px]">Ciascun gruppo viene accreditato di <strong className="text-slate-800">2000 punti XP</strong> all'ingresso.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <span className="font-bold text-red-500 shrink-0">⏳</span>
                      <div>
                        <strong className="text-slate-800">Deterioramento Temporale:</strong>
                        <p className="text-slate-500 text-[11px]">Ogni secondo trascorso riduce lo scudo di <strong className="text-slate-800">-0.3 punti XP</strong>.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <span className="font-bold text-rose-500 shrink-0">❌</span>
                      <div>
                        <strong className="text-slate-800">Penalizzazioni per Codici Errati:</strong>
                        <p className="text-slate-500 text-[11px]">Digitare o proporre una chiave errata toglie ben <strong className="text-slate-805">-40 punti XP</strong>!</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <span className="font-bold text-amber-600 shrink-0">💡</span>
                      <div>
                        <strong className="text-slate-800">Suggerimenti dell'Assistente Guido (Graduali):</strong>
                        <p className="text-slate-500 text-[11px]">1° Suggerimento: <span className="font-bold">-50 XP</span> | 2°: <span className="font-bold">-100 XP</span> | Soluzione Finale: <span className="font-bold">-250 XP</span>.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Local Leaderboard summary */}
                <div className="bg-white border-2 border-slate-200 rounded-3xl p-6 shadow-xl space-y-4 text-left">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2">
                      <Trophy className="w-5 h-5 text-amber-500 animate-bounce" />
                      <h3 className="text-xs font-black text-slate-800 uppercase tracking-tight">Classifica dei Record della Scuola</h3>
                    </div>
                    <span className="bg-slate-100 px-2 py-0.5 rounded text-[10px] font-bold text-slate-500">Top 5</span>
                  </div>

                  <div className="overflow-hidden rounded-2xl border border-slate-100">
                    <table className="w-full text-left text-xs bg-slate-55/20">
                      <thead>
                        <tr className="bg-slate-50 font-bold text-slate-500 text-[10px] border-b border-slate-100 uppercase">
                          <th className="py-2.5 px-3">POS</th>
                          <th className="py-2.5 px-2">SQUADRA (CLASSE)</th>
                          <th className="py-2.5 px-2 text-center">XP</th>
                          <th className="py-2.5 px-3 text-right">TEMPO</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 bg-white">
                        {leaderboard.slice(0, 5).map((entry, idx) => (
                          <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                            <td className="py-3 px-3 font-mono font-bold text-slate-600">
                              {idx === 0 ? "🥇" : idx === 1 ? "🥈" : idx === 2 ? "🥉" : `${idx + 1}°`}
                            </td>
                            <td className="py-3 px-2">
                              <span className="font-extrabold text-slate-850 block">{entry.teamName}</span>
                              <span className="text-[10px] text-slate-400 block font-normal">{entry.schoolClass}</span>
                            </td>
                            <td className="py-3 px-2 text-center font-mono font-black text-blue-600">
                              {entry.score}
                            </td>
                            <td className="py-3 px-3 text-right font-mono text-[11px] text-slate-500">
                              {Math.floor(entry.timeSpentSeconds / 60)}m {entry.timeSpentSeconds % 60}s
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {leaderboard.length > 5 && (
                    <p className="text-[10px] text-slate-400 font-bold text-center italic mt-2">
                      + altri {leaderboard.length - 5} gruppi caricati in archivio
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* 2. Active Play Screen */}
          {activeStep === 'playing' && (
            <motion.div
              key="playing-screen"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-3.5"
            >
              {/* Dynamic Status Bar */}
              <div className="bg-white border-2 border-slate-200 rounded-3xl py-2.5 px-4 shadow-sm flex flex-col md:flex-row items-center justify-between gap-3 text-left">
                
                {/* Team indicators */}
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-50 rounded-xl flex items-center justify-center text-lg">
                    👥
                  </div>
                  <div>
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block leading-none">Squadra Attiva</span>
                    <h3 className="font-extrabold text-slate-800 text-xs md:text-sm leading-tight">
                      {teamState.teamName} <span className="font-normal text-[11px] text-slate-500">({teamState.schoolClass})</span>
                    </h3>
                  </div>
                </div>

                {/* Progress Visualiser */}
                <div className="flex-1 max-w-md w-full px-2">
                  <div className="flex justify-between items-center text-[10px] mb-0.5">
                    <span className="font-bold text-slate-605">Scudo Sociale Rigenerato:</span>
                    <span className="font-black text-blue-655">{Math.round(percentComplete)}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-blue-600 h-full rounded-full transition-all duration-550"
                      style={{ width: `${percentComplete}%` }}
                    />
                  </div>
                </div>

                {/* Dynamic XP Score Scoreboard */}
                <div className="flex items-center gap-2.5 bg-blue-50 text-blue-900 px-3 py-1.5 rounded-xl border border-blue-100 shrink-0">
                  <Flame className="w-4 h-4 text-amber-500 fill-current animate-pulse" />
                  <div>
                    <span className="text-[8px] font-bold text-blue-500 block uppercase tracking-widest leading-none">XP Gara</span>
                    <span className="font-mono text-sm font-black tracking-wider leading-none">
                      {teamState.score} XP
                    </span>
                  </div>
                </div>

                {/* Timer Clock */}
                <div className="flex items-center gap-2.5 bg-slate-900 text-white px-4 py-1.5 rounded-xl shadow-inner shrink-0 border border-slate-800">
                  <TimerIcon className={`w-4 h-4 text-amber-400 ${teamState.timeRemaining < 180 ? 'animate-pulse text-red-500' : ''}`} />
                  <div>
                    <span className="text-[8px] font-bold text-slate-400 block uppercase tracking-widest leading-none">Tempo Rimasto</span>
                    <span className={`font-mono text-sm font-black tracking-wider leading-none ${teamState.timeRemaining < 180 ? 'text-red-500' : ''}`}>
                      {formatTime(teamState.timeRemaining)}
                    </span>
                  </div>
                </div>

              </div>

              {/* Timeline Navigation Bar */}
              <div className="bg-white border-2 border-slate-200 rounded-3xl py-2 px-4 shadow-sm flex flex-col items-center justify-center gap-1.5">
                <span className="text-[9px] font-black text-slate-450 uppercase tracking-widest leading-none">Mappa del Portale Temporale (Seleziona per Navigare)</span>
                <div className="flex items-center justify-center gap-1 flex-wrap w-full">
                  {puzzlesList.map((p, idx) => {
                    const isCompleted = teamState.completedPuzzles.includes(p.id);
                    const isCurrent = idx === currentGameIndex;
                    const maxUnlockedIdx = teamState.completedPuzzles.length;
                    const isUnlocked = idx <= maxUnlockedIdx;
                    
                    return (
                      <button
                        key={p.id}
                        onClick={() => {
                          if (isUnlocked) {
                            playSound.playClick();
                            setCurrentGameIndex(idx);
                          }
                        }}
                        disabled={!isUnlocked}
                        className={`w-6 h-6 md:w-7 md:h-7 rounded-full flex items-center justify-center text-[10px] font-black transition-all ${
                          isCurrent
                            ? 'bg-blue-600 text-white ring-2 ring-blue-500/20 scale-105 shadow-md cursor-pointer'
                            : isCompleted
                              ? 'bg-emerald-100 text-emerald-800 border-2 border-emerald-350 hover:bg-emerald-200 cursor-pointer'
                              : isUnlocked
                                ? 'bg-blue-50 text-blue-800 border-2 border-blue-200 hover:bg-blue-100 cursor-pointer'
                                : 'bg-slate-105 text-slate-400 border border-slate-200 cursor-not-allowed opacity-50'
                        }`}
                        title={`Enigma ${p.id}: ${p.title}`}
                      >
                        {p.id}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Central Puzzle Render */}
              <PuzzleStep
                puzzle={puzzlesList[currentGameIndex]}
                teamState={teamState}
                onSolve={handleSolvePuzzle}
                onUseHint={handleUseHint}
                onWrongAttempt={handleWrongAttempt}
              />
            </motion.div>
          )}

          {/* 3. Victory Screen */}
          {activeStep === 'victory' && (
            <motion.div
              key="victory-screen"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-4xl mx-auto w-full text-center space-y-8"
            >
              <div className="bg-white border-2 border-slate-200 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-100/50 rounded-full blur-3xl -z-10" />

                <div className="flex justify-center mb-4">
                  <div className="w-20 h-20 bg-emerald-500 text-white rounded-full flex items-center justify-center text-4xl shadow-xl animate-bounce">
                    🏆
                  </div>
                </div>

                <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">SCUDO SOCIALE RIPRISTINATO!</h1>
                <p className="text-sm font-bold text-emerald-600 uppercase tracking-widest mb-6">
                  Il Futuro del 2086 è salvo grazie a voi!
                </p>

                {/* Double column scoreboard and rank feedback */}
                <div className="grid md:grid-cols-2 gap-6 items-start max-w-4xl mx-auto mt-6">
                  
                  {/* Left Column: Summary and penalties details */}
                  <div className="bg-slate-50 border border-slate-150 rounded-3xl p-6 space-y-4 text-left leading-relaxed shadow-sm">
                    <h3 className="text-xs font-black text-slate-700 uppercase tracking-wider text-center border-b pb-2 mb-2 border-slate-200 flex items-center justify-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-blue-600" /> Riepilogo delle Vostre Imprese:
                    </h3>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500 font-semibold">Squadra dei Lavoratori:</span>
                      <span className="font-extrabold text-slate-800">{teamState.teamName}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500 font-semibold">Classe Scolastica:</span>
                      <span className="font-extrabold text-slate-800">{teamState.schoolClass}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500 font-semibold">Punteggio ottenuto (Score):</span>
                      <span className="font-extrabold text-blue-600 flex items-center gap-1 font-mono text-base">
                        <Flame className="w-4 h-4 text-amber-500 fill-current animate-pulse animate-pulse" /> {teamState.score} XP
                      </span>
                    </div>
                    <div className="flex justify-between text-sm border-t border-dashed border-slate-200 pt-3">
                      <span className="text-slate-500 font-semibold">Posizionamento in Gara:</span>
                      <span className="font-mono text-xs font-black bg-blue-50 text-blue-700 px-3 py-1 rounded-full uppercase">
                        {(() => {
                          const idx = leaderboard.findIndex(entry => entry.teamName === teamState.teamName && entry.schoolClass === teamState.schoolClass);
                          return idx !== -1 ? `${idx + 1}° Posto` : 'Registrato!';
                        })()}
                      </span>
                    </div>
                    
                    {/* Performance breakdown to show where penalties came from */}
                    <div className="border-t border-slate-200/60 pt-3 text-[11px] text-slate-500 space-y-1">
                      <span className="font-bold text-slate-600 text-[10px] uppercase tracking-wider block mb-1">Dettaglio Penalità:</span>
                      <div className="flex justify-between">
                        <span>Tempo di Risoluzione:</span>
                        <span className="font-mono font-semibold">
                          {Math.floor((TIMER_DURATION_SECONDS - teamState.timeRemaining) / 60)}m {(TIMER_DURATION_SECONDS - teamState.timeRemaining) % 60}s
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Codici Errati Inseriti:</span>
                        <span className="font-mono font-semibold text-rose-700">
                          {(Object.values(teamState.wrongAttempts || {}) as number[]).reduce((sum, val) => sum + val, 0)} sottomissioni
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Suggerimenti Guido sbloccati:</span>
                        <span className="font-mono font-semibold text-amber-700">
                          {(Object.values(teamState.hintsUsed || {}) as number[]).reduce((sum, val) => sum + val, 0)} indizi
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Leaderboard standoff */}
                  <div className="bg-white border border-slate-150 rounded-3xl p-6 shadow-sm text-left">
                    <h3 className="text-xs font-black text-slate-700 uppercase tracking-wider border-b pb-2 mb-3 border-slate-200 flex items-center gap-1.5">
                      <Trophy className="w-3.5 h-3.5 text-amber-500" /> Classifica della Competizione:
                    </h3>
                    
                    <div className="overflow-hidden rounded-2xl border border-slate-100">
                      <table className="w-full text-left text-xs bg-slate-50/20">
                        <thead>
                          <tr className="bg-slate-50 font-bold text-slate-500 text-[10px] border-b border-slate-100 uppercase">
                            <th className="py-2.5 px-3">POS</th>
                            <th className="py-2.5 px-2">SQUADRA (CLASSE)</th>
                            <th className="py-2.5 px-2 text-center">XP</th>
                            <th className="py-2.5 px-3 text-right">TEMPO</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 bg-white">
                          {leaderboard.slice(0, 5).map((entry, idx) => {
                            const isMe = entry.teamName === teamState.teamName && entry.schoolClass === teamState.schoolClass;
                            return (
                              <tr key={idx} className={`hover:bg-slate-50 ${isMe ? 'bg-blue-50 font-extrabold text-blue-900 border-l-4 border-blue-500' : ''}`}>
                                <td className="py-3 px-3 font-mono">
                                  {idx === 0 ? "🥇" : idx === 1 ? "🥈" : idx === 2 ? "🥉" : `${idx + 1}°`}
                                </td>
                                <td className="py-3 px-2">
                                  <span className="block">{entry.teamName}</span>
                                  <span className="text-[10px] text-slate-450 block font-normal">{entry.schoolClass}</span>
                                </td>
                                <td className="py-3 px-2 text-center font-mono font-black text-blue-600">
                                  {entry.score}
                                </td>
                                <td className="py-3 px-3 text-right font-mono text-[11px] text-slate-550">
                                  {Math.floor(entry.timeSpentSeconds / 60)}m {entry.timeSpentSeconds % 60}s
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>

                </div>

                <div className="mt-8 space-y-4">
                  <p className="text-xs text-slate-500 leading-relaxed max-w-md mx-auto">
                    Ragazzi, avete compiuto un'impresa gloriosa. Ricordate sempre: ciò che avete salvato oggi non è un arido ufficio burocratico, ma la solidarietà dei lavoratori d'Italia. Lavorando regolarmente e tutelando i vostri diritti, manterrete in vita questo scudo prezioso anche nella realtà quotidiana!
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                      id="view-certificate-btn"
                      onClick={() => {
                        playSound.playClick();
                        setShowTeacherPanel(true);
                        // Force teacher panel show to trigger the certificate tab
                        // We target the layout scrolling to that section seamlessly
                        const el = document.getElementById('teacher-panel-overlay');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="bg-violet-600 hover:bg-violet-700 text-white font-black px-6 py-3.5 rounded-2xl cursor-pointer flex items-center justify-center gap-2 transition-all transition-transform active:scale-95 text-sm"
                    >
                      <Sparkles className="w-4 h-4" /> Genera Certificato di Gioco
                    </button>

                    <button
                      id="restart-adventure-btn"
                      onClick={handleResetGame}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-black px-5 py-3.5 rounded-2xl cursor-pointer transition-colors text-sm"
                    >
                      Ricomincia Sfida
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* 4. Game Over Screen */}
          {activeStep === 'gameover' && (
            <motion.div
              key="gameover-screen"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-md mx-auto w-full text-center space-y-6"
            >
              <div className="bg-white border-2 border-red-200 rounded-3xl p-6 md:p-8 shadow-2xl">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center text-3xl animate-pulse">
                    ⚠️
                  </div>
                </div>

                <h1 className="text-2xl font-black text-rose-800 tracking-tight mb-2">PORTALE TEMPORALE CHIUSO</h1>
                <p className="text-xs text-rose-600 font-bold uppercase tracking-wider mb-4">
                  Il Futuro è rimasto senza Scudo Sociale
                </p>

                <p className="text-xs text-slate-600 leading-relaxed mb-6">
                  Il Boss "Signor Evasore" e le minacce del "Lavoro Nero" hanno congelato i condotti previdenziali. Senza l'INPS ricostituito, gli anziani e i lavoratori fragili non avranno più cure nel futuro del 2086. Ma non arrendetevi! I Lavoratori del Futuro sanno sempre rialzarsi dalle difficoltà.
                </p>

                <button
                  id="retry-game-btn"
                  onClick={handleResetGame}
                  className="w-full bg-rose-600 hover:bg-rose-700 text-white font-black py-4 rounded-2xl cursor-pointer shadow-lg hover:shadow-rose-100 transition-all flex items-center justify-center gap-2 transition-transform active:scale-95"
                >
                  <RefreshCw className="w-4 h-4" /> Riavvia Macchina del Tempo
                </button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>

      </main>

      {/* Humble Footer in line with non-hype rules */}
      <footer className="py-6 text-center text-[10px] text-slate-400 border-t border-slate-150 mt-12 bg-white print:hidden">
        <p>Progetto Educativo di Educazione Civica sulle funzioni previdenziali ed INPS.</p>
        <p className="mt-1 font-mono">Unione Nazionale Sviluppo Cittadinanza Attiva • Licenza Apache-2.0</p>
      </footer>

    </div>
  );
}
