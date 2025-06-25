import type { Event } from '../models/Event';

export const eventsMap: Record<string, Event> = {
  '222': {
    eventId: '222',
    displayName: '2x2x2',
    scrambleClasses: 'text-xl md:text-2xl',
    generateScramble: true
  },
  '333': {
    eventId: '333',
    displayName: '3x3x3',
    scrambleClasses: 'text-xl md:text-2xl',
    generateScramble: true
  },
  '444': {
    eventId: '444',
    displayName: '4x4x4',
    scrambleClasses: 'text-lg md:text-xl',
    generateScramble: true
  },
  '555': {
    eventId: '555',
    displayName: '5x5x5',
    scrambleClasses: 'text-md md:text-lg',
    generateScramble: true
  },
  '666': {
    eventId: '666',
    displayName: '6x6x6',
    scrambleClasses: 'text-xs md:text-md',
    generateScramble: true
  },
  '777': {
    eventId: '777',
    displayName: '7x7x7',
    scrambleClasses: 'text-xs md:text-md',
    generateScramble: true
  },
  pyram: {
    eventId: 'pyram',
    displayName: 'Pyraminx',
    scrambleClasses: 'text-xl md:text-2xl',
    generateScramble: true
  },
  'sq1': {
    eventId: 'sq1',
    displayName: 'Square-1',
    scrambleClasses: 'text-xl md:text-2xl',
    generateScramble: true
  },
  skewb: {
    eventId: 'skewb',
    displayName: 'Skewb',
    scrambleClasses: 'text-xl md:text-2xl',
    generateScramble: true
  },
  clock: {
    eventId: 'clock',
    displayName: 'Clock',
    scrambleClasses: 'text-md md:text-lg',
    generateScramble: true
  },
  minx: {
    eventId: 'minx',
    displayName: 'Megaminx',
    scrambleClasses: 'text-xs md:text-md',
    generateScramble: true
  },
  '666-ns': {
    eventId: '666',
    displayName: '6x6x6 (No scramble)',
    scrambleClasses: 'text-sm md:text-md',
    generateScramble: false
  },
  '777-ns': {
    eventId: '777',
    displayName: '7x7x7 (No scramble)',
    scrambleClasses: 'text-sm md:text-md',
    generateScramble: false
  },
  'minx-ns': {
    eventId: 'minx',
    displayName: 'Megaminx (No scramble)',
    scrambleClasses: 'text-sm md:text-md',
    generateScramble: false
  }
}

