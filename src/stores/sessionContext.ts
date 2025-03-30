import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { randomScrambleForEvent } from 'cubing/scramble'
import { createStatsSchema, type StatsSchema } from '../models/StatsSchema'
import { compareSolves, type Solve } from '../models/Solve'
import type { Side } from '../models/Side'
import { puzzlesMap, type EventContext } from '../lib/puzzlesMap'

export type RoundContext = {
  id: number
  scramble?: string
  solves: Record<Side, Solve | null>
  winner: Side | null
}

const createRoundContext = (
  id: number,
  scramlbe: string | undefined = undefined
): RoundContext => ({
  id: id,
  scramble: scramlbe,
  solves: {
    player1: null,
    player2: null
  },
  winner: null
})

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
  const eventContext = ref<EventContext>(puzzlesMap['333'])

  // Initial round context
  const currentRound = ref<RoundContext>(createRoundContext(1))
  randomScrambleForEvent(eventContext.value.eventId).then((scramble) => {
    currentRound.value.scramble = scramble.toString()
  })

  // All previous rounds
  const rounds = ref<RoundContext[]>([])

  // Score
  const score = computed(() => {
    const player1Score = rounds.value.filter((r) => r.winner === 'player1').length
    const player2Score = rounds.value.filter((r) => r.winner === 'player2').length

    return { player1: player1Score, player2: player2Score }
  })

  // Recording round results
  function recordSolve(player: Side, elapsedTimeMs: number) {
    const solve = {
      timeMs: elapsedTimeMs,
      penalty: null
    }
    currentRound.value.solves[player] = solve
    if (currentRound.value.solves.player1 && currentRound.value.solves.player2) {
      concludeRound()
      startNewRound()
    }
  }

  function concludeRound() {
    // Tally the score
    const comparison = compareSolves(
      currentRound.value.solves.player1!,
      currentRound.value.solves.player2!
    )
    if (comparison < 0) currentRound.value.winner = 'player1'
    else if (comparison > 0) currentRound.value.winner = 'player2'

    rounds.value.push(currentRound.value)
  }

  // New round
  function startNewRound() {
    // Set up new round
    currentRound.value = createRoundContext(currentRound.value.id + 1, currentRound.value.scramble)

    randomScrambleForEvent(eventContext.value.eventId).then((scramble) => {
      currentRound.value.scramble = scramble.toString()
    })
  }

  // Reset race with a new puzzle
  function startNewRace(event: string) {
    eventContext.value = puzzlesMap[event]
    rounds.value = []

    currentRound.value = createRoundContext(1)
    randomScrambleForEvent(eventContext.value.eventId).then((scramble) => {
      currentRound.value.scramble = scramble.toString()
    })
  }

  return {
    eventContext,
    rounds,
    score,
    currentRound,
    recordSolve,
    concludeRound,
    startNewRound,
    startNewRace
  }
})
