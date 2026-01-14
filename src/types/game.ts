import { type Cell } from '../lib/Tic-tac-toe';

export type Difficulty = 'easy' | 'unbeatable';

export type PlayerSymbol = Exclude<Cell, null>;

export interface GameStats {
  X: number;
  O: number;
  draws: number;
}

export interface ThemeColors {
  gradient: string[];
  cardBg: string;
  cardBorder: string;
  text: string;
  textSecondary: string;
  textMuted: string;
  modalBg: string;
}

export interface GameState {
  xCount: number;
  oCount: number;
  xIsNext: boolean;
  currentPlayer: PlayerSymbol;
  result: { winner: Cell; line: number[] | null };
  isDraw: boolean;
  finished: boolean;
  winningLine: number[];
}
