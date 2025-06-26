import type { Side, SideMap } from "./Side";
import { compareSolves, type Solve } from "./Solve";

export type Round = {
  winner: Side | null;
  solves: SideMap<Solve | undefined>;
  scramble: SideMap<string | undefined>;
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

export const determineWinner = (round: Round): Side | null => {
  if(!round.solves.player1 || !round.solves.player2)
    throw new Error('Both players must have solves to determine a winner')

  const p1Solve = round.solves.player1
  const p2Solve = round.solves.player2
  const comparison = compareSolves(p1Solve, p2Solve)
  if (comparison < 0) return 'player1'
  else if (comparison > 0) return 'player2'
  return null
}