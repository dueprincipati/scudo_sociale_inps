import { describe, test, expect } from 'vitest';
import { computeLiveScore, TIMER_DURATION_SECONDS } from './score';

describe('Missione Previdenza - Punteggio (XP) Calculation', () => {
  test('base score with maximum time remaining and no penalties should be 2000', () => {
    const score = computeLiveScore(TIMER_DURATION_SECONDS, {}, {});
    expect(score).toBe(2000);
  });

  test('score should decay over time (-0.3 points per second elapsed)', () => {
    // 100 seconds elapsed -> timeRemaining = TIMER_DURATION_SECONDS - 100
    const timeRemaining = TIMER_DURATION_SECONDS - 100;
    const score = computeLiveScore(timeRemaining, {}, {});
    // time penalty = 100 * 0.3 = 30 points
    // 2000 - 30 = 1970
    expect(score).toBe(1970);
  });

  test('hints usage should apply cumulative penalties correctly per puzzle', () => {
    // 1 hint on puzzle 1: penalty = 50
    let hintsUsed: { [key: number]: number } = { 1: 1 };
    let score = computeLiveScore(TIMER_DURATION_SECONDS, hintsUsed, {});
    expect(score).toBe(2000 - 50);

    // 2 hints on puzzle 1: penalty = 50 + 100 = 150
    hintsUsed = { 1: 2 };
    score = computeLiveScore(TIMER_DURATION_SECONDS, hintsUsed, {});
    expect(score).toBe(2000 - 150);

    // 3 hints (full solution) on puzzle 1: penalty = 50 + 100 + 250 = 400
    hintsUsed = { 1: 3 };
    score = computeLiveScore(TIMER_DURATION_SECONDS, hintsUsed, {});
    expect(score).toBe(2000 - 400);

    // Hints across multiple puzzles:
    // Puzzle 1: 1 hint (50)
    // Puzzle 2: 2 hints (150)
    // Total hints penalty = 200
    hintsUsed = { 1: 1, 2: 2 };
    score = computeLiveScore(TIMER_DURATION_SECONDS, hintsUsed, {});
    expect(score).toBe(2000 - 200);
  });

  test('wrong attempts should penalize -40 XP per attempt', () => {
    // 1 wrong attempt: penalty = 40
    let wrongAttempts: { [key: number]: number } = { 1: 1 };
    let score = computeLiveScore(TIMER_DURATION_SECONDS, {}, wrongAttempts);
    expect(score).toBe(2000 - 40);

    // 3 wrong attempts on same puzzle: penalty = 120
    wrongAttempts = { 1: 3 };
    score = computeLiveScore(TIMER_DURATION_SECONDS, {}, wrongAttempts);
    expect(score).toBe(2000 - 120);

    // Wrong attempts across different puzzles:
    // Puzzle 1: 2 wrong (80)
    // Puzzle 3: 1 wrong (40)
    // Total penalty = 120
    wrongAttempts = { 1: 2, 3: 1 };
    score = computeLiveScore(TIMER_DURATION_SECONDS, {}, wrongAttempts);
    expect(score).toBe(2000 - 120);
  });

  test('score should never drop below the floor of 100 XP', () => {
    // Massive penalties (e.g. 50 wrong attempts -> 2000 penalty)
    const wrongAttempts = { 1: 50 };
    const score = computeLiveScore(TIMER_DURATION_SECONDS, {}, wrongAttempts);
    expect(score).toBe(100);
  });

  test('score should handle combined time decay and penalties correctly', () => {
    // 200 seconds elapsed (200 * 0.3 = 60 penalty)
    // Puzzle 1: 2 hints (150 penalty)
    // Puzzle 2: 1 wrong attempt (40 penalty)
    // Total penalty = 60 + 150 + 40 = 250
    // Expected score = 2000 - 250 = 1750
    const timeRemaining = TIMER_DURATION_SECONDS - 200;
    const hintsUsed = { 1: 2 };
    const wrongAttempts = { 2: 1 };
    const score = computeLiveScore(timeRemaining, hintsUsed, wrongAttempts);
    expect(score).toBe(1750);
  });
});
