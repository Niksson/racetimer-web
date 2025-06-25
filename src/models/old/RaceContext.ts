import type { Event } from '../Event'
import type { Round } from '../Round'
import type { Session } from '../Session'
import type { Side } from '../Side'
import type { StatsContext } from '../StatsContext'
import type { RoundContextV1, RoundContextV2 } from './RoundContext'


export type RaceContextV1 = {
  eventContext: Event
  rounds: RoundContextV1[]
  stats: Record<Side, StatsContext>
}

export function convertSeparateToSession(event: Event, rounds: RoundContextV2[], stats: Record<Side, StatsContext>): Session {
  const session = convertToSession({
    eventContext: event,
    rounds: rounds,
    stats: stats
  } as RaceContextV1)
  session.id = 'v1-separated'
  return session
}

export function convertToSession(v1Context: RaceContextV1): Session {
  return {
    id: 'v1',
    playerNames: {
      player1: undefined,
      player2: undefined
    },
    createdDate: new Date(),
    selectedEvents: {
      player1: v1Context.eventContext,
      player2: v1Context.eventContext
    },
    stats: v1Context.stats,
    completedRounds: v1Context.rounds.map((r) => {
      return {
        solves: r.solves,
        scramble: {
          player1: r.scramble,
          player2: r.scramble
        },
        winner: r.winner
      } as Round
    })
  } as Session
}
