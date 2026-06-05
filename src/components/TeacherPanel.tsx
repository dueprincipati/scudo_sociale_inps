import React, { useState } from 'react';
import { BookOpen, Key, Users, Sparkles, Printer, Check, SkipForward, Landmark, HelpCircle, FileText } from 'lucide-react';
import { puzzlesList } from '../data/puzzles';

interface TeacherPanelProps {
  onSkipToPuzzle: (puzzleId: number) => void;
  onResetGame: () => void;
}

export const TeacherPanel: React.FC<TeacherPanelProps> = ({ onSkipToPuzzle, onResetGame }) => {
  const [activeTab, setActiveTab] = useState<'info' | 'solutions' | 'classguide' | 'certificate'>('info');
  const [printTeamName, setPrintTeamName] = useState('');
  const [printSchoolClass, setPrintSchoolClass] = useState('');
  const [certificateSuccess, setCertificateSuccess] = useState(false);

  const handlePrintCertificate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!printTeamName) return;
    setCertificateSuccess(true);
    setTimeout(() => {
      window.print();
      setCertificateSuccess(false);
    }, 500);
  };

  return (
    <div className="bg-white border-2 border-slate-200 rounded-3xl p-6 shadow-xl max-w-4xl mx-auto overflow-hidden">
      <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-6">
        <Landmark className="w-8 h-8 text-blue-600" />
        <div>
          <h2 className="text-xl font-bold text-slate-800">Area Docente / Manuale Pedagogico</h2>
          <p className="text-xs text-slate-500">Risorse didattiche, istruzioni di classe e soluzioni degli Enigmi INPS</p>
        </div>
      </div>

      {/* Tabs Menu */}
      <div className="flex flex-wrap gap-2 mb-6 border-b border-slate-100 pb-2">
        <button
          onClick={() => setActiveTab('info')}
          className={`px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer ${
            activeTab === 'info'
              ? 'bg-blue-50 text-blue-700 border border-blue-200'
              : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          Obiettivi Pedagogici
        </button>
        <button
          onClick={() => setActiveTab('solutions')}
          className={`px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer ${
            activeTab === 'solutions'
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
              : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          <Key className="w-4 h-4" />
          Soluzioni ed Enigmi
        </button>
        <button
          onClick={() => setActiveTab('classguide')}
          className={`px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer ${
            activeTab === 'classguide'
              ? 'bg-amber-50 text-amber-700 border border-amber-200'
              : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          <Users className="w-4 h-4" />
          Guida di Svolgimento
        </button>
        <button
          onClick={() => setActiveTab('certificate')}
          className={`px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer ${
            activeTab === 'certificate'
              ? 'bg-violet-50 text-violet-700 border border-violet-200'
              : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          Attestato di Cittadinanza
        </button>
      </div>

      {/* Tab Content */}
      <div className="min-h-[300px]">
        {activeTab === 'info' && (
          <div className="space-y-4 text-slate-700 text-sm leading-relaxed">
            <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-600" /> Il Valore Sociale della Previdenza spiegato ai Ragazzi
            </h3>
            <p>
              Questa Escape Room digitale è progettata specificamente per i ragazzi delle <strong>Scuole Medie (11-14 anni)</strong>,
              in corrispondenza dei moduli di <strong>Educazione Civica e Cittadinanza Attiva</strong>.
              L'obiettivo è destrutturare l'idea che la previdenza sia un argomento arido o utile solo alla terza età.
            </p>
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 flex flex-col gap-3">
              <h4 className="font-semibold text-slate-800">📍 Traguardi di Apprendimento:</h4>
              <ul className="list-disc pl-5 space-y-2 text-xs">
                <li>
                  <strong className="text-slate-900">Il Principio Costituzionale (Art. 38):</strong> Capire la differenza tra 
                  assistenza e previdenza per i cittadini svantaggiati o inabili al lavoro.
                </li>
                <li>
                  <strong className="text-slate-900">Il Patto tra Generazioni:</strong> Comprendere la struttura del welfare 
                  nazionale basato sul mutuo sostegno tra generazioni (sistema a ripartizione).
                </li>
                <li>
                  <strong className="text-slate-900">Il Lavoro Regolare come Garanzia:</strong> Riconoscere la minaccia del 
                  lavoro nero e dell'evasione previdenziale come cause primarie del danneggiamento dei servizi comuni.
                </li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'solutions' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b pb-3 border-slate-100">
              <h3 className="font-bold text-slate-800 text-base">Tabella delle Soluzioni e Flussi</h3>
              <div className="flex gap-2">
                <button
                  onClick={onResetGame}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold cursor-pointer"
                >
                  Ricomincia Partita
                </button>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {puzzlesList.map((puzzle) => (
                <div key={puzzle.id} className="border border-slate-100 rounded-2xl p-4 bg-slate-50/50">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-blue-600 uppercase bg-blue-50 px-2.5 py-0.5 rounded-full">
                      Puzzle {puzzle.id}
                    </span>
                    <button
                      onClick={() => onSkipToPuzzle(puzzle.id)}
                      className="text-xs text-slate-500 hover:text-blue-600 flex items-center gap-1 cursor-pointer transition-colors"
                      title="Forza il gioco a questo livello"
                    >
                      <SkipForward className="w-3.5 h-3.5" /> Salta qui
                    </button>
                  </div>
                  <h4 className="font-semibold text-slate-800 text-sm mb-2">{puzzle.title}</h4>
                  <div className="text-xs text-slate-600 space-y-1">
                    <p>🔑 <strong className="text-slate-900">Soluzione:</strong> <code className="bg-emerald-50 text-emerald-800 px-1.5 py-0.5 rounded font-bold">{puzzle.correctAnswer}</code></p>
                    <p>💡 <strong className="text-slate-950">Intento didattico:</strong> {puzzle.educationalTidbit.slice(0, 110)}...</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'classguide' && (
          <div className="space-y-4 text-slate-700 text-sm leading-relaxed">
            <h3 className="font-bold text-slate-800 text-base flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-amber-600" /> Come condurre l'attività in aula
            </h3>
            <p>La durata stimata dell'Escape Room è di <strong>45-60 minuti</strong>.</p>
            <div className="grid md:grid-cols-3 gap-4 text-xs mt-2">
              <div className="border border-amber-100 rounded-2xl p-3 bg-amber-50/20">
                <h4 className="font-bold text-amber-800 mb-1">1. Formazione Team</h4>
                <p className="text-slate-600">Dividi la classe in gruppi di 3-5 studenti. Ogni gruppo sceglierà un computer o un tablet e assegnerà un nome originale alla propria squadra.</p>
              </div>
              <div className="border border-amber-100 rounded-2xl p-3 bg-amber-50/20">
                <h4 className="font-bold text-amber-800 mb-1">2. Gestione degli Indizi</h4>
                <p className="text-slate-600">Invita le squadre a ragionare autonomamente prima di sbloccare i suggerimenti dell'assistente virtuale. Usare pochi indizi aumenta il punteggio finale!</p>
              </div>
              <div className="border border-amber-100 rounded-2xl p-3 bg-amber-50/20">
                <h4 className="font-bold text-amber-800 mb-1">3. Debriefing di Classe</h4>
                <p className="text-slate-600">Al termine, riunisci la classe per commentare l'importanza dello scudo previdenziale, il significato dell'evasione e quali diritti spettano ai lavoratori.</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'certificate' && (
          <div className="space-y-4">
            <h3 className="font-bold text-slate-800 text-base">Generatore di Attestato di Merito</h3>
            <p className="text-sm text-slate-600">
              Usa questo modulo per generare un certificato ufficiale di <strong>Cittadino Attivo della Previdenza</strong> da stampare o salvare in PDF alla fine del gioco.
            </p>
            <form onSubmit={handlePrintCertificate} className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex flex-col md:flex-row gap-3 items-end">
              <div className="flex-1 space-y-1">
                <label className="text-xs font-bold text-slate-700 uppercase" htmlFor="team">Nome Squadra Vincitrice</label>
                <input
                  id="print-team"
                  type="text"
                  placeholder="Es: I Custodi del Futuro"
                  value={printTeamName}
                  onChange={(e) => setPrintTeamName(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-blue-500"
                />
              </div>
              <div className="flex-1 space-y-1">
                <label className="text-xs font-bold text-slate-700 uppercase" htmlFor="schoolClass">Classe Scolastica</label>
                <input
                  id="print-class"
                  type="text"
                  placeholder="Es: 2° A - Scuole Medie"
                  value={printSchoolClass}
                  onChange={(e) => setPrintSchoolClass(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-blue-500"
                />
              </div>
              <button
                type="submit"
                className="bg-violet-600 hover:bg-violet-700 text-white font-bold px-4 py-2 rounded-xl text-sm flex items-center gap-2 cursor-pointer transition-colors"
              >
                {certificateSuccess ? <Check className="w-4 h-4" /> : <Printer className="w-4 h-4" />}
                Stampa Certificato
              </button>
            </form>

            {/* Printable Frame (Hidden inside layout but targets printing) */}
            <div className="hidden print:block print:absolute print:inset-0 bg-white p-12 text-center border-8 border-double border-violet-800 rounded-3xl font-serif">
              <div className="my-8 flex justify-center items-center">
                <Landmark className="w-16 h-16 text-violet-800" />
              </div>
              <h1 className="text-4xl font-extrabold text-violet-900 tracking-wide">ATTESTATO DI MERITO</h1>
              <p className="text-lg italic text-slate-650 my-6">Si certifica con onore che la squadra di cittadini attivi</p>
              <h2 className="text-3xl font-black text-slate-900 underline my-4 uppercase">{printTeamName || 'I CAVALIERI DEL WELFARE'}</h2>
              <p className="text-md text-slate-600">della classe scolastica <span className="font-bold">{printSchoolClass || 'Scuola Secondaria di 1° Grado'}</span></p>
              <p className="text-md text-slate-700 max-w-xl mx-auto my-6 leading-relaxed">
                ha brillantemente completato la <strong className="text-violet-805">Missione Previdenza INPS</strong>, 
                risolvendo gli enigmi logici relativi al Patto Generazionale, 
                al valore sociale dei Contributi ed alla sconfitta del Lavoro Nero.
              </p>
              <div className="my-10 flex justify-between px-16">
                <div>
                  <p className="text-xs">Data di Rilascio</p>
                  <p className="font-bold text-sm">{new Date().toLocaleDateString('it-IT')}</p>
                </div>
                <div>
                  <p className="text-xs">Il Docente Coordinatore</p>
                  <p className="font-bold italic text-sm">Firma Digitale Accertata</p>
                </div>
              </div>
              <p className="text-[10px] text-slate-450 uppercase tracking-widest mt-12">Istituti di Previdenza & Scuole d'Italia unite nella solidarietà</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
