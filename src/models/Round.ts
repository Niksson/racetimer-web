import type { Side } from "./Side";
import type { Solve } from "./Solve";

export type Round = {
  winner: Side | null;
  solves: Record<Side, Solve | undefined>;
  scramble: Record<Side, string | undefined>;
}

export function createRound() : Round {
  return {
    winner: null,
    solves: {
      player1: undefined,
      player2: undefined
    },
    scramble: {
      player1: undefined,
      player2: undefined
    }
  }
}