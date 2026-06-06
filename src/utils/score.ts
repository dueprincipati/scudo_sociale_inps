export const TIMER_DURATION_SECONDS = 45 * 60; // 45 minuti per le aule scolastiche

export const computeLiveScore = (
  timeRemaining: number, 
  hintsUsed: { [puzzleId: number]: number }, 
  wrongAttempts: { [puzzleId: number]: number }
): number => {
  const BASE_SCORE = 2000;
  
  // Calculate time elapsed
  const secondsElapsed = TIMER_DURATION_SECONDS - timeRemaining;
  const timePenalty = secondsElapsed * 0.3; // 0.3 points per second elapsed
  
  // Calculate hints penalty
  let hintsPenalty = 0;
  Object.values(hintsUsed || {}).forEach((count) => {
    // Note that 'count' from Object.values could be typed as unknown in some context, 
    // so we cast or ensure type safety
    const c = count as number;
    if (c >= 1) hintsPenalty += 50; 
    if (c >= 2) hintsPenalty += 100;
    if (c >= 3) hintsPenalty += 250;
  });
  
  // Wrong attempts penalty
  let wrongAttemptsPenalty = 0;
  Object.values(wrongAttempts || {}).forEach((count) => {
    const c = count as number;
    wrongAttemptsPenalty += c * 40; // 40 points per wrong attempt
  });
  
  const rawScore = BASE_SCORE - timePenalty - hintsPenalty - wrongAttemptsPenalty;
  return Math.max(100, Math.round(rawScore));
};
