import type { Side, SideMap } from "../Side"
import type { Solve } from "../Solve"

export type RoundContextV01 = {
  id: number
  scramble: string
  solves: SideMap<Solve>
  winner: Side | null
}

export type RoundContextV02 = {
  id: number
  scramble?: string
  solves: SideMap<Solve | undefined>
  winner: Side | null
  roundStarted: boolean
}

export const createRoundContextV01 = (
  id: number,
  scramlbe: string | undefined = undefined
): RoundContextV02 => ({
  id: id,
  scramble: scramlbe,
  solves: {
    player1: undefined,
    player2: undefined
  },
  winner: null,
  roundStarted: false,
})