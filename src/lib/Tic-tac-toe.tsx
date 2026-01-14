export type Cell = "X" | "O" | null;
export type Board = Cell[];

const LINES: number[][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

export function getWinner(board: Board): { winner: Exclude<Cell, null> | null; line: number[] | null } {
  for (const [a, b, c] of LINES) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], line: [a, b, c] };
    }
  }
  return { winner: null, line: null };
}

export function isDraw(board: Board): boolean {
  const { winner } = getWinner(board);
  return winner === null && board.every((c) => c !== null);
}

export function getAvailableMoves(board: Board): number[] {
  const moves: number[] = [];
  for (let i = 0; i < board.length; i++) {
    if (board[i] === null) moves.push(i);
  }
  return moves;
}

export function bestMove(
  board: Board,
  ai: Exclude<Cell, null>,
  difficulty: "easy" | "unbeatable"
): number | null {
  const avail = getAvailableMoves(board);
  if (avail.length === 0) return null;

  if (difficulty === "easy") {
    const r = Math.floor(Math.random() * avail.length);
    return avail[r];
  }

  // Unbeatable (minimax with alpha-beta pruning)
  let bestScore = Number.NEGATIVE_INFINITY;
  let move: number | null = null;
  let alpha = Number.NEGATIVE_INFINITY;
  const beta = Number.POSITIVE_INFINITY;
  
  for (const idx of avail) {
    const next = [...board];
    next[idx] = ai;
    const score = minimax(next, toggle(ai), ai, 0, alpha, beta);
    if (score > bestScore) {
      bestScore = score;
      move = idx;
    }
    alpha = Math.max(alpha, score);
  }
  return move;
}

function minimax(
  board: Board,
  player: Exclude<Cell, null>,
  ai: Exclude<Cell, null>,
  depth: number,
  alpha: number,
  beta: number
): number {
  const { winner } = getWinner(board);
  if (winner) {
    // Prefer faster wins and slower losses
    return winner === ai ? 10 - depth : depth - 10;
  }
  if (isDraw(board)) return 0;

  const moves = getAvailableMoves(board);

  if (player === ai) {
    let best = Number.NEGATIVE_INFINITY;
    for (const idx of moves) {
      const next = [...board];
      next[idx] = player;
      const score = minimax(next, toggle(player), ai, depth + 1, alpha, beta);
      best = Math.max(best, score);
      alpha = Math.max(alpha, best);
      if (beta <= alpha) break; // Beta cutoff
    }
    return best;
  } else {
    let best = Number.POSITIVE_INFINITY;
    for (const idx of moves) {
      const next = [...board];
      next[idx] = player;
      const score = minimax(next, toggle(player), ai, depth + 1, alpha, beta);
      best = Math.min(best, score);
      beta = Math.min(beta, best);
      if (beta <= alpha) break; // Alpha cutoff
    }
    return best;
  }
}

function toggle(p: Exclude<Cell, null>): Exclude<Cell, null> {
  return p === "X" ? "O" : "X";
}
