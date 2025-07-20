import type { Round } from './Round'
import type { Event } from './Event'
import type { SideMap } from './Side'
import type { SessionCreationOptions } from './SessionCreationOptions'
import { createStatsContext as createEmptyStatsContext, type StatsContext } from './StatsContext'
import { statsSchema } from '../lib/appStatsSchema'
import { createStatsSchema } from './StatsSchema'
import { del, get, getMany, keys, set } from 'idb-keyval'
import { eventsMap } from '../lib/eventsMap'

export type SessionMeta = {
  id?: string
  name?: string
  playerNames: SideMap<string | undefined>
  createdDate: Date
  selectedEvents: SideMap<Event>
  generateScrambles: boolean
}

export type SessionNameType = 'player-names' | 'puzzle-names'

export function getSessionMeta(session: Session): SessionMeta {
  return {
    id: session.id,
    name: session.name,
    playerNames: session.playerNames,
    createdDate: session.createdDate,
    selectedEvents: session.selectedEvents,
    generateScrambles: session.generateScrambles
  }
}

export type Session = SessionMeta & {
  completedRounds: Round[]
  stats: SideMap<StatsContext>
}

export const defaultSessionCreationOptions: SessionCreationOptions = {
  name: undefined,
  playerNames: { player1: undefined, player2: undefined },
  selectedEvents: {
    player1: '333',
    player2: '333'
  },
  generateScrambles: true
}

export function createSession(options: SessionCreationOptions | undefined = undefined): Session {
  const createStats = (): StatsContext => {
    return createEmptyStatsContext(createStatsSchema({ averageTrimPercent: 5, items: statsSchema }))
  }

  const {
    playerNames,
    name,
    selectedEvents,
    generateScrambles
  } = {...defaultSessionCreationOptions, ...options}

  return {
    name,
    playerNames,
    createdDate: new Date(),
    selectedEvents: {
      player1: eventsMap[selectedEvents.player1],
      player2: eventsMap[selectedEvents.player2]
    },
    completedRounds: [],
    stats: {
      player1: createStats(),
      player2: createStats()
    },
    generateScrambles
  }
}

export async function getAllSessionMeta(): Promise<SessionMeta[]> {
  const keysList = await keys()
  const sessionMetaKeys = keysList.filter((key) => key.toString().match(/session-meta-.*/))
  const sessionMetas = await getMany<SessionMeta>(sessionMetaKeys)

  return sessionMetas
}

export async function getSession(sessionId: string): Promise<Session> {
  const session = await get<Session>(`session-${sessionId}`)
  if (!session) {
    throw new Error(`Session with ID ${sessionId} not found`)
  }
  return session
}

export async function saveSession(session: Session): Promise<void> {
  console.log('Saving session:', session)
  if (!session.id) {
    const idbKeys = await keys()
    const keyCount = idbKeys.filter((k) => k.toString().match(/session-meta-.*/)).length
    session.id = (keyCount + 1).toString()
  }

  const sessionMeta: SessionMeta = getSessionMeta(session)

  await set(`session-meta-${session.id}`, sessionMeta)
  console.log('Session meta saved:', sessionMeta)
  await set(`session-${session.id}`, session)
  console.log('Session saved:', session)
}

export async function deleteSession(sessionId: string): Promise<void> {
  await del(sessionId)
}

export function getNameType(session: SessionMeta): SessionNameType {
  if (session.playerNames.player1 || session.playerNames.player2)
    return 'player-names' 
  else return 'puzzle-names'
}

export function eventsAreSame(session: SessionMeta): boolean {
  return session.selectedEvents.player1.eventId === session.selectedEvents.player2.eventId
}