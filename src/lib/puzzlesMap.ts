export const puzzlesMap: Record<string, EventContext> = {
  '2x2x2': {
    eventId: '222',
    displayName: '2x2x2',
    scrambleSize: 'text-xl md:text-2xl',
    generateScramble: true
  },
  '3x3x3': {
    eventId: '333',
    displayName: '3x3x3',
    scrambleSize: 'text-xl md:text-2xl',
    generateScramble: true
  },
  '4x4x4': {
    eventId: '444',
    displayName: '4x4x4',
    scrambleSize: 'text-lg md:text-xl',
    generateScramble: true
  },
  '5x5x5': {
    eventId: '555',
    displayName: '5x5x5',
    scrambleSize: 'text-md md:text-lg',
    generateScramble: true
  },
  '6x6x6': {
    eventId: '666',
    displayName: '6x6x6',
    scrambleSize: 'text-sm md:text-md',
    generateScramble: true
  },
  '7x7x7': {
    eventId: '777',
    displayName: '7x7x7',
    scrambleSize: 'text-sm md:text-md',
    generateScramble: true
  },
  Pyraminx: {
    eventId: 'pyram',
    displayName: 'Pyraminx',
    scrambleSize: 'text-xl md:text-2xl',
    generateScramble: true
  },
  'Square-1': {
    eventId: 'sq1',
    displayName: 'Square-1',
    scrambleSize: 'text-xl md:text-2xl',
    generateScramble: true
  },
  Skewb: {
    eventId: 'skewb',
    displayName: 'Skewb',
    scrambleSize: 'text-xl md:text-2xl',
    generateScramble: true
  },
  Clock: {
    eventId: 'clock',
    displayName: 'Clock',
    scrambleSize: 'text-md md:text-lg',
    generateScramble: true
  },
  Megaminx: {
    eventId: 'minx',
    displayName: 'Megaminx',
    scrambleSize: 'text-xs md:text-md',
    generateScramble: true
  },
  '6x6x6 (No scramble)': {
    eventId: '666',
    displayName: '6x6x6 (No scramble)',
    scrambleSize: 'text-sm md:text-md',
    generateScramble: false
  },
  '7x7x7 (No scramble)': {
    eventId: '777',
    displayName: '7x7x7 (No scramble)',
    scrambleSize: 'text-sm md:text-md',
    generateScramble: false
  },
  'Megaminx (No scramble)': {
    eventId: 'minx',
    displayName: 'Megaminx (No scramble)',
    scrambleSize: 'text-sm md:text-md',
    generateScramble: false
  }
}

export type EventContext = {
  eventId: string
  displayName: string
  scrambleSize: string
  generateScramble: boolean
}
