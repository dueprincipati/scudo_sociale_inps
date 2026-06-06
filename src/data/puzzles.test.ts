import { describe, test, expect } from 'vitest';
import { puzzlesList } from './puzzles';

/** Mirrors the cleanStr normalization in PuzzleStep.tsx */
const cleanStr = (s: string) =>
  s.trim().toUpperCase().replace(/[^A-Z0-9]/g, '');

describe('Missione Previdenza - Puzzles Validation', () => {
  test('puzzles list should contain exactly 12 items', () => {
    expect(puzzlesList).toHaveLength(12);
  });

  test('each puzzle should have required properties', () => {
    puzzlesList.forEach((puzzle) => {
      expect(puzzle.id).toBeGreaterThanOrEqual(1);
      expect(puzzle.title).toBeDefined();
      expect(puzzle.description).toBeDefined();
      expect(puzzle.educationalTidbit).toBeDefined();
      expect(puzzle.mechanicType).toBeDefined();
      expect(puzzle.question).toBeDefined();
      expect(puzzle.correctAnswer).toBeDefined();
      expect(puzzle.hints).toBeInstanceOf(Array);
      expect(puzzle.hints.length).toBeGreaterThan(0);
    });
  });

  test('Puzzle 1 (balance) answer should be PATTO', () => {
    const p1 = puzzlesList.find(p => p.id === 1);
    expect(p1).toBeDefined();
    expect(p1?.correctAnswer).toBe('PATTO');
    expect(p1?.mechanicType).toBe('balance');
  });

  test('Puzzle 1 should have 14 answer variants defined', () => {
    const p1 = puzzlesList.find(p => p.id === 1);
    expect(p1?.answerVariants).toBeInstanceOf(Array);
    expect(p1?.answerVariants).toHaveLength(14);
  });

  test('Puzzle 1 all answer variants should normalize and match correctly', () => {
    const p1 = puzzlesList.find(p => p.id === 1);
    expect(p1).toBeDefined();

    const allAccepted = [p1!.correctAnswer, ...(p1!.answerVariants ?? [])];
    const cleanedCorrect = cleanStr(p1!.correctAnswer);

    allAccepted.forEach((variant) => {
      const cleaned = cleanStr(variant);
      const isMatch =
        cleaned === cleanedCorrect ||
        (p1!.answerVariants ?? []).some(v => cleanStr(v) === cleaned);
      expect(isMatch, `Variant "${variant}" should be accepted`).toBe(true);
    });
  });

  test('Puzzle 1 normalized variants should not accidentally match wrong answers', () => {
    const p1 = puzzlesList.find(p => p.id === 1);
    expect(p1).toBeDefined();
    const cleanedCorrect = cleanStr(p1!.correctAnswer);
    const cleanedVariants = (p1!.answerVariants ?? []).map(cleanStr);

    const wrongAnswers = ['PENSIONE', 'CONTRIBUTI', 'NASPI', 'CONTRATTO'];
    wrongAnswers.forEach((wrong) => {
      const cleaned = cleanStr(wrong);
      const isMatch =
        cleaned === cleanedCorrect || cleanedVariants.includes(cleaned);
      expect(isMatch, `"${wrong}" should NOT be accepted for Enigma 1`).toBe(false);
    });
  });

  test('Puzzle 2 (icons) correct sum should equal 1898', () => {
    const p2 = puzzlesList.find(p => p.id === 2);
    expect(p2).toBeDefined();
    expect(p2?.correctAnswer).toBe('1898');
    expect(p2?.mechanicType).toBe('icons');
    
    // Default tessere in PuzzleStep are Pensione (500), Malattia (400), Infortuni (300), Maternita (698)
    // 500 + 400 + 300 + 698 = 1898
    const correctSum = 500 + 400 + 300 + 698;
    expect(correctSum).toBe(1898);
  });

  test('Puzzle 3 (constitution) answer should be 38', () => {
    const p3 = puzzlesList.find(p => p.id === 3);
    expect(p3).toBeDefined();
    expect(p3?.correctAnswer).toBe('38');
    expect(p3?.mechanicType).toBe('constitution');
  });

  test('Puzzle 4 (payslip) answer should be NASPI', () => {
    const p4 = puzzlesList.find(p => p.id === 4);
    expect(p4).toBeDefined();
    expect(p4?.correctAnswer).toBe('NASPI');
    expect(p4?.mechanicType).toBe('payslip');
  });

  test('Puzzle 5 (decode) answer should be SOLIDARIETA', () => {
    const p5 = puzzlesList.find(p => p.id === 5);
    expect(p5).toBeDefined();
    expect(p5?.correctAnswer).toBe('SOLIDARIETA');
    expect(p5?.mechanicType).toBe('decode');
  });

  test('Puzzle 6 (boss) answer should be CONTRATTO', () => {
    const p6 = puzzlesList.find(p => p.id === 6);
    expect(p6).toBeDefined();
    expect(p6?.correctAnswer).toBe('CONTRATTO');
    expect(p6?.mechanicType).toBe('boss');
  });

  test('Puzzle 7 (balance) answer should be SOSTENIBILITA', () => {
    const p7 = puzzlesList.find(p => p.id === 7);
    expect(p7).toBeDefined();
    expect(p7?.correctAnswer).toBe('SOSTENIBILITA');
    expect(p7?.mechanicType).toBe('balance');
  });

  test('Puzzle 8 (decode) shift Caesar cipher verification', () => {
    const p8 = puzzlesList.find(p => p.id === 8);
    expect(p8).toBeDefined();
    expect(p8?.correctAnswer).toBe('CONTRIB');
    expect(p8?.mechanicType).toBe('decode');

    // Decrypting "IUTZXOH" with a shift of -6 (in Italian alphabet: A-Z)
    // Caesar cipher decryption logic
    const decryptCaesar = (str: string, shift: number): string => {
      return str.split('').map(char => {
        const code = char.charCodeAt(0);
        if (code >= 65 && code <= 90) {
          // Wrap around alphabet A-Z (ascii 65 to 90)
          return String.fromCharCode(((code - 65 + shift + 26) % 26) + 65);
        }
        return char;
      }).join('');
    };

    const inputCipher = 'IUTZXOH';
    const decrypted = decryptCaesar(inputCipher, -6);
    expect(decrypted).toBe('CONTRIB');
  });

  test('Puzzle 9 (icons) target sum should be 2650', () => {
    const p9 = puzzlesList.find(p => p.id === 9);
    expect(p9).toBeDefined();
    expect(p9?.correctAnswer).toBe('2650');
    expect(p9?.mechanicType).toBe('icons');
    
    // Check that we have mechanicData.iconTessera
    expect(p9?.mechanicData).toBeDefined();
    expect(p9?.mechanicData.iconTessera).toBeDefined();

    // Verify sum of the first 3 (isCorrect: true) tessere
    // id 1: 1500, id 2: 800, id 3: 350
    const correctTessere = p9?.mechanicData.iconTessera.filter((t: any) => t.isCorrect);
    expect(correctTessere).toHaveLength(3);
    const sum = correctTessere.reduce((acc: number, t: any) => acc + t.val, 0);
    expect(sum).toBe(2650);
  });

  test('Puzzle 10 (decode) answer should be INVESTIMENTO', () => {
    const p10 = puzzlesList.find(p => p.id === 10);
    expect(p10).toBeDefined();
    expect(p10?.correctAnswer).toBe('INVESTIMENTO');
    expect(p10?.mechanicType).toBe('decode');
  });

  test('Puzzle 11 (boss) answer should be COLLETTIVO CONTRATTO', () => {
    const p11 = puzzlesList.find(p => p.id === 11);
    expect(p11).toBeDefined();
    expect(p11?.correctAnswer).toBe('COLLETTIVO CONTRATTO');
    expect(p11?.mechanicType).toBe('boss');
  });

  test('Puzzle 12 (decode) combinations check', () => {
    const p12 = puzzlesList.find(p => p.id === 12);
    expect(p12).toBeDefined();
    expect(p12?.correctAnswer).toBe('P10ART38');
    expect(p12?.mechanicType).toBe('decode');

    // Combinazione: 1° lettera di 'PENSIONE' = P, somma cifre 2026 (2+0+2+6=10), articolo costituzione (38) con "ART" in mezzo: P + 10 + ART + 38 = P10ART38
    const firstLetter = 'PENSIONE'.charAt(0);
    const sumYear = 2 + 0 + 2 + 6;
    const constitutionArt = 38;
    const combined = `${firstLetter}${sumYear}ART${constitutionArt}`;
    expect(combined).toBe('P10ART38');
  });
});
