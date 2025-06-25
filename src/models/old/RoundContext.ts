import type { Side } from "../Side"
import type { Solve } from "../Solve"

export type RoundContextV1 = {
  id: number
  scramble: string
  solves: Record<Side, Solve>
  winner: Side | null
}

export type RoundContextV2 = {
  id: number
  scramble?: string
  solves: Record<Side, Solve | undefined>
  winner: Side | null
  roundStarted: boolean
}

export const createRoundContextV1 = (
  id: number,
  scramlbe: string | undefined = undefined
): RoundContextV2 => ({
  id: id,
  scramble: scramlbe,
  solves: {
    player1: undefined,
    player2: undefined
  },
  winner: null,
  roundStarted: false,
})