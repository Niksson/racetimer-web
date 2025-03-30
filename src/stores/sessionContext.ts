import { defineStore } from 'pinia'
import { ref } from 'vue'
import { randomScrambleForEvent } from 'cubing/scramble'
import { createStatsSchema, type StatsSchema } from '../models/StatsSchema'
import { compareSolves, type Solve } from '../models/Solve'
import type { Side } from '../models/Side'

export type RoundContext = {
  id: number
  scramble?: string
}

export type PlayerContext = {
  score: number
  solves: Solve[]
}

const statsSchema: StatsSchema = createStatsSchema({
  averageTrimPercent: 5,
  items: {
    avg5: { type: 'current', metric: 'average', scope: 'number', number: 5 },
    avg12: { type: 'current', metric: 'average', scope: 'number', number: 12 },
    avg25: { type: 'current', metric: 'average', scope: 'number', number: 25 },
    avg50: { type: 'current', metric: 'average', scope: 'number', number: 50 },
    avg100: { type: 'current', metric: 'average', scope: 'number', number: 100 }
  }
})

export const useSessionContext = defineStore('sessionContext', () => {
  // Event ID
  const eventId = ref<string>('333')
  function setEventId(id: string) {
    eventId.value = id
  }

  // Initial round context
  const roundContext = ref<RoundContext>({
    id: 1
  })
  randomScrambleForEvent(eventId.value).then((scramble) => {
    roundContext.value.scramble = scramble.toString()
  })

  // Initial players' contexts
  const playerContexts = ref<Record<Side, PlayerContext>>({
    player1: {
      score: 0,
      solves: []
    },
    player2: {
      score: 0,
      solves: []
    }
  })

  // Recording round results
  function recordSolve(player: Side, elapsedTimeMs: number) {
    const playerContext = playerContexts.value[player]
    const solve = {
      timeMs: elapsedTimeMs,
      penalty: null
    }
    playerContext.solves.push(solve)

    if (playerContexts.value.player1.solves.length === playerContexts.value.player2.solves.length) {
      concludeRound()
      startNewRound()
    }
  }

  function concludeRound() {
    const [player1Solve] = playerContexts.value.player1.solves.slice(-1)
    const [player2Solve] = playerContexts.value.player2.solves.slice(-1)
    const comparison = compareSolves(player1Solve, player2Solve)
    if (comparison < 0) playerContexts.value.player1.score++
    else if (comparison > 0) playerContexts.value.player2.score++
  }

  // New round
  function startNewRound() {
    roundContext.value = {
      id: roundContext.value.id + 1
    }

    randomScrambleForEvent(eventId.value).then((scramble) => {
      roundContext.value.scramble = scramble.toString()
    })
  }

  return { eventId, setEventId, roundContext, playerContexts, recordSolve }
})
