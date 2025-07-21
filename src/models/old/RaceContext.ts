import { eventsMap } from '../../lib/eventsMap'
import type { Event } from '../Event'
import type { Round } from '../Round'
import type { Session } from '../Session'
import type { SideMap } from '../Side'
import type { StatsContext } from '../StatsContext'
import type { RoundContextV01, RoundContextV02 } from './RoundContext'


export type RaceContextV01 = {
  eventContext: EventV01
  rounds: RoundContextV01[]
  stats: SideMap<StatsContext>
}

export type EventV01 = {
  eventId: string
  displayName: string
  scrambleClasses: string
  generateScramble: boolean
}

export function convertV02ToV03(event: Event, rounds: RoundContextV02[], stats: SideMap<StatsContext>): Session {
  const session = convertV01ToV03({
    eventContext: event,
    rounds: rounds,
    stats: stats
  } as RaceContextV01)
  session.id = 'v0.2'
  return session
}

export function convertV01ToV03(v1Context: RaceContextV01): Session {
  return {
    id: 'v0.1',
    playerNames: {
      player1: undefined,
      player2: undefined
    },
    createdDate: new Date(),
    selectedEvents: {
      player1: eventsMap[v1Context.eventContext.eventId],
      player2: eventsMap[v1Context.eventContext.eventId]
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
    }),
    generateScrambles: v1Context.eventContext.generateScramble
  } as Session
}
