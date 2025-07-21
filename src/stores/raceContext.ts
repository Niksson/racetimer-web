import { defineStore } from 'pinia'
import { computed, ref, toRaw, unref, watch } from 'vue'
import { randomScrambleForEvent } from 'cubing/scramble'
import { type Solve } from '../models/Solve'
import type { Side, SideMap } from '../models/Side'
import type { Penalty } from '../models/Penalty'
import {
  addSolveAndCompute,
  replaceLastSolveAndCompute,
  type StatsContext
} from '../models/StatsContext'
import { useStorage } from '@vueuse/core'
import { createSession, deleteSession, getAllSessionMeta, getSession, saveSession, type Session, type SessionMeta } from '../models/Session'
import {
  convertSeparateToSession,
  convertToSession,
  type RaceContextV1
} from '../models/old/RaceContext'
import { get } from 'idb-keyval'
import type { Event } from '../models/Event'
import { type RoundContextV2 } from '../models/old/RoundContext'
import { createRound, determineWinner, type Round } from '../models/Round'
import type { SessionCreationOptions } from '../models/SessionCreationOptions'
import { getFromLocalStorage } from '../lib/helpers'

export const useRaceContext = defineStore('raceContext', () => {
  const session = ref<Session>()
  const currentSessionId = useStorage<string | undefined>('currentSessionId', undefined)
  const storeLoading = ref(true)

  async function migrateSessions() {
    // Migrate from v1
    const isV1SessionSaved = await get('session-v1')
    if (!isV1SessionSaved) {
      const v1Context = getFromLocalStorage<RaceContextV1>('raceContext.v1')
      if (v1Context) {
        const convertedSession = convertToSession(v1Context)
        await saveSession(convertedSession)
      }
    }
    // Migrate from separated v1
    const isV1SeparatedSessionSaved = await get('session-v1-separated')
    if (!isV1SeparatedSessionSaved) {
      const v1EventContext = getFromLocalStorage<Event>('raceContext.eventContext')
      const v1Rounds = getFromLocalStorage<RoundContextV2[]>('raceContext.rounds')
      const v1Stats = getFromLocalStorage<SideMap<StatsContext>>('raceContext.stats')
      if (v1EventContext && v1Rounds && v1Stats) {
        {
          const convertedSession = convertSeparateToSession(v1EventContext, v1Rounds, v1Stats)
          await saveSession(convertedSession)
        }
      }
    }
  }

  async function ensureSession() {
    await migrateSessions()
    if (!currentSessionId.value) {
      session.value = createSession()
      await saveSession(toRaw(session.value))
      currentSessionId.value = session.value.id!.toString()
    } else {
      const storedSession = await getSession(currentSessionId.value)
      session.value = storedSession
    }
    watch(
      () => session.value!.completedRounds,
      async () => {
        console.log('Session updated, saving...')
        saveSession(toRaw(session.value!))
      },
      { deep: true }
    )
  }

  const previousRound = ref<Round>()
  const currentRound = ref<Round>(createRound())
  const scramblesGenerating = ref(false)

  async function generateScrambleFor(player: Side) {
    const event = session.value!.selectedEvents[player]
    const scramble = await randomScrambleForEvent(event.eventId)
    currentRound.value.scramble[player] = scramble.toString()
  }

  async function generateScrambleForBoth() {
    const event = session.value!.selectedEvents.player1
    const scramble = await randomScrambleForEvent(event.eventId)
    const scrambleString = scramble.toString()
    currentRound.value.scramble.player1 = scrambleString
    currentRound.value.scramble.player2 = scrambleString
  }

  async function generateScrambles() {
    scramblesGenerating.value = true
    if (!session.value) throw new Error('Session is not initialized')
    const { selectedEvents } = session.value

    if (!session.value.generateScrambles) {
      return
    } else if (selectedEvents.player1.eventId === selectedEvents.player2.eventId) {
      await generateScrambleForBoth()
    } else {
      await generateScrambleFor('player1')
      await generateScrambleFor('player2')
    }
    scramblesGenerating.value = false
  }

  function recordSolve(player: Side, timeElapsedMs: number) {
    if (!session.value) throw new Error('Session is not initialized')

    const solve: Solve = {
      timeMs: timeElapsedMs,
      penalty: null
    }
    const round = currentRound.value
    round.solves[player] = solve
    addSolveAndCompute(session.value.stats[player], solve)
    if (round.solves.player1 && round.solves.player2) {
      concludeRound()
      startNewRound()
    }
  }

  function concludeRound() {
    if (!session.value) throw new Error('Session is not initialized')

    // Tally the score
    currentRound.value.winner = determineWinner(currentRound.value)
    previousRound.value = unref(currentRound)

    session.value.completedRounds.push(currentRound.value)
  }

  // Score
  const score = computed(() => {
    if (!session.value) throw new Error('Session is not initialized')
    const player1Score = session.value.completedRounds.filter((r) => r.winner === 'player1').length
    const player2Score = session.value.completedRounds.filter((r) => r.winner === 'player2').length

    return { player1: player1Score, player2: player2Score }
  })

  // New round
  function startNewRound() {
    currentRound.value = createRound()
    roundStarted.value = false
    generateScrambles()
  }

  // Edit penalty of previous round
  function setPenalty(player: Side, penalty: Penalty | null) {
    if (!session.value) throw new Error('Session is not initialized')

    if (!previousRound.value) return

    previousRound.value.solves[player]!.penalty = penalty
    determineWinner(previousRound.value)
    replaceLastSolveAndCompute(session.value.stats[player], previousRound.value.solves[player]!)
  }

  async function selectSession(id: string) {
    storeLoading.value = true
    const storedSession = await getSession(id)
    session.value = storedSession
    storeLoading.value = false

    if (storedSession.completedRounds.length == 0) {
      previousRound.value = undefined
    } else {
      previousRound.value = storedSession.completedRounds.slice(-1)[0]
    }
    currentRound.value = createRound()
    generateScrambles()
  }

  async function startNewSession(options: SessionCreationOptions) {
    storeLoading.value = true
    const newSession = createSession(toRaw(options))
    await saveSession(newSession)
    await loadSessionMeta()
    session.value = newSession
    storeLoading.value = false

    previousRound.value = undefined
    currentRound.value = createRound()
    generateScrambles()
  }

  async function removeSession(sessionId: string) {
    if (!sessionId) return
    storeLoading.value = true
    await deleteSession(sessionId)
    await loadSessionMeta()
    if(session.value?.id === sessionId)
      selectSession(sessionMetaList.value[0].id!)
    storeLoading.value = false
  }

  const sessionMetaList = ref<SessionMeta[]>([])

  async function loadSessionMeta() {
    const sessions = await getAllSessionMeta()
    sessionMetaList.value = sessions
  }

  const roundStarted = ref(false)

  async function init() {
    storeLoading.value = true
    await ensureSession()
    await loadSessionMeta()
    storeLoading.value = false
    generateScrambles()
  } 

  init()

  return {
    session,
    storeLoading,
    sessionMetaList,
    scramblesGenerating,
    score,
    previousRound,
    currentRound,
    recordSolve,
    concludeRound,
    startNewRound,
    setPenalty,
    selectSession,
    removeSession,
    startNewSession,
    roundStarted
  }
})
