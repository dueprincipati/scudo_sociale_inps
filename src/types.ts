export interface Hint {
  id: number;
  text: string;
}

export interface Puzzle {
  id: number;
  title: string;
  description: string;
  educationalTidbit: string;
  mechanicType: 'balance' | 'icons' | 'decode' | 'boss' | 'payslip' | 'constitution' | 'exclusion';
  question: string;
  correctAnswer: string;
  answerVariants?: string[];
  hints: Hint[];
  mechanicData?: any; // optional extra data per mechanic (e.g. icon tiles, letter masks)
}

export interface LeaderboardEntry {
  teamName: string;
  schoolClass: string;
  score: number;
  timeSpentSeconds: number;
  hintsUsedCount: number;
  wrongAttemptsCount: number;
  completedAt: string;
}

export interface TeamState {
  teamName: string;
  schoolClass: string;
  score: number;
  hintsUsed: { [puzzleId: number]: number }; // total hints count used per puzzle
  wrongAttempts: { [puzzleId: number]: number }; // tracks incorrect submissions
  completedPuzzles: number[];
  startTime: number | null;
  endTime: number | null;
  timeRemaining: number; // in seconds
}

