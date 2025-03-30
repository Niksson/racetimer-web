export const puzzlesMap: Record<string, EventContext> = {
  '222': {
    eventId: '222',
    displayName: '2x2x2',
    scrambleSize: 'text-xl'
  },
  '333': {
    eventId: '333',
    displayName: '3x3x3',
    scrambleSize: 'text-xl'
  },
  '444': {
    eventId: '444',
    displayName: '4x4x4',
    scrambleSize: 'text-lg'
  },
  '555': {
    eventId: '555',
    displayName: '5x5x5',
    scrambleSize: 'text-md'
  },
  '666': {
    eventId: '666',
    displayName: '6x6x6',
    scrambleSize: 'text-sm'
  },
  '777': {
    eventId: '777',
    displayName: '7x7x7',
    scrambleSize: 'text-sm'
  },
  pyram: {
    eventId: 'pyram',
    displayName: 'Pyraminx',
    scrambleSize: 'text-xl'
  },
  sq1: {
    eventId: 'sq1',
    displayName: 'Square-1',
    scrambleSize: 'text-xl'
  },
  skewb: {
    eventId: 'skewb',
    displayName: 'Skewb',
    scrambleSize: 'text-xl'
  },
  clock: {
    eventId: 'clock',
    displayName: 'Clock',
    scrambleSize: 'text-md'
  },
  minx: {
    eventId: 'minx',
    displayName: 'Megaminx',
    scrambleSize: 'text-xs'
  }
}

export type EventContext = {
  eventId: string
  displayName: string
  scrambleSize: string
}
