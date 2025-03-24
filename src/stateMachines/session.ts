import { setup } from 'xstate'
import type { StatsContext } from '../models/StatsContext'

type PlayerContext = {
  score: number
  stats: StatsContext
}

type RoundContext = {
  scramble: string
}

export const sessionMachine = setup({}).createMachine({
  states: {}
})
