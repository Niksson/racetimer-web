import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { randomScrambleForEvent } from 'cubing/scramble'
import { compareSolves, type Solve } from '../models/Solve'
import type { Side } from '../models/Side'
import { puzzlesMap, type EventContext } from '../lib/puzzlesMap'
import type { Penalty } from '../models/Penalty'
import {
  addSolve,
  computeStats,
  createStatsContext,
  type StatsContext
} from '../models/StatsContext'
import { useStorage } from '@vueuse/core'
import { statsSchema } from '../lib/appStatsSchema'

export type RoundContext = {
  id: number
  scramble?: string
  solves: Record<Side, Solve | undefined>
  winner: Side | null
  roundStarted: boolean
}

const createRoundContext = (
  id: number,
  scramlbe: string | undefined = undefined
): RoundContext => ({
  id: id,
  scramble: scramlbe,
  solves: {
    player1: undefined,
    player2: undefined
  },
  winner: null,
  roundStarted: false,
})

const determineWinner = (p1Solve: Solve, p2Solve: Solve): Side | null => {
  const comparison = compareSolves(p1Solve, p2Solve)
  if (comparison < 0) return 'player1'
  else if (comparison > 0) return 'player2'
  return null
}



export const useRaceContext = defineStore('raceContext', () => {
  const storageRef = useStorage('raceContext', {
    eventContext: puzzlesMap['3x3x3'] as EventContext,
    rounds: [] as RoundContext[],
    stats: {
      player1: createStatsContext(statsSchema),
      player2: createStatsContext(statsSchema)
    } as Record<Side, StatsContext>
  })
  // Event ID
  const eventContext = ref(storageRef.value.eventContext)

  // All previous rounds
  const rounds = ref(storageRef.value.rounds)

  // Stats
  const stats = ref(storageRef.value.stats)

  // Initial round context
  const currentRound = ref<RoundContext>(createRoundContext(1))
  randomScrambleForEvent(eventContext.value.eventId).then((scramble) => {
    currentRound.value.scramble = scramble.toString()
  })

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
    currentRound.value.winner = determineWinner(
      currentRound.value.solves.player1!,
      currentRound.value.solves.player2!
    )

    rounds.value.push(currentRound.value)

    // Update stats
    stats.value.player1 = computeStats(
      addSolve(stats.value.player1, currentRound.value.solves.player1!)
    )
    stats.value.player2 = computeStats(
      addSolve(stats.value.player2, currentRound.value.solves.player2!)
    )
  }

  // New round
  function startNewRound() {
    // Set up new round
    currentRound.value = createRoundContext(currentRound.value.id + 1, currentRound.value.scramble)

    if (eventContext.value.generateScramble)
      randomScrambleForEvent(eventContext.value.eventId).then((scramble) => {
        currentRound.value.scramble = scramble.toString()
      })
  }

  // Edit penalty of previous round
  function setPenalty(player: Side, penalty: Penalty | null) {
    if (rounds.value.length === 0) return
    const [round] = rounds.value.slice(-1)
    round.solves[player]!.penalty = penalty
    round.winner = determineWinner(round.solves.player1!, round.solves.player2!)
  }

  // Reset race with a new puzzle
  function startNewRace(event: string) {
    eventContext.value = puzzlesMap[event]
    rounds.value = []

    currentRound.value = createRoundContext(1)
    if (eventContext.value.generateScramble)
      randomScrambleForEvent(eventContext.value.eventId).then((scramble) => {
        currentRound.value.scramble = scramble.toString()
      })
  }

  return {
    eventContext,
    rounds,
    stats,
    score,
    currentRound,
    recordSolve,
    concludeRound,
    startNewRound,
    setPenalty,
    startNewRace
  }
})
