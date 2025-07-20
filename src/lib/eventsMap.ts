import type { Event } from '../models/Event';

export const eventsMap: Record<string, Event> = {
  '222': {
    eventId: '222',
    displayName: '2x2x2',
    scrambleClasses: 'text-xl md:text-2xl',
    eventIcon: 'event-222',
    generateScramble: true
  },
  '333': {
    eventId: '333',
    displayName: '3x3x3',
    scrambleClasses: 'text-xl md:text-2xl',
    eventIcon: 'event-333',
    generateScramble: true
  },
  '444': {
    eventId: '444',
    displayName: '4x4x4',
    scrambleClasses: 'text-lg md:text-xl',
    eventIcon: 'event-444',
    generateScramble: true
  },
  '555': {
    eventId: '555',
    displayName: '5x5x5',
    scrambleClasses: 'text-md md:text-lg',
    eventIcon: 'event-555',
    generateScramble: true
  },
  '666': {
    eventId: '666',
    displayName: '6x6x6',
    scrambleClasses: 'text-xs md:text-md',
    eventIcon: 'event-666',
    generateScramble: true
  },
  '777': {
    eventId: '777',
    displayName: '7x7x7',
    scrambleClasses: 'text-xs md:text-md',
    eventIcon: 'event-777',
    generateScramble: true
  },
  pyram: {
    eventId: 'pyram',
    displayName: 'Pyraminx',
    scrambleClasses: 'text-xl md:text-2xl',
    eventIcon: 'event-pyram',
    generateScramble: true
  },
  'sq1': {
    eventId: 'sq1',
    displayName: 'Square-1',
    scrambleClasses: 'text-xl md:text-2xl',
    eventIcon: 'event-sq1',
    generateScramble: true
  },
  skewb: {
    eventId: 'skewb',
    displayName: 'Skewb',
    scrambleClasses: 'text-xl md:text-2xl',
    eventIcon: 'event-skewb',
    generateScramble: true
  },
  clock: {
    eventId: 'clock',
    displayName: 'Clock',
    scrambleClasses: 'text-md md:text-lg',
    eventIcon: 'event-clock',
    generateScramble: true
  },
  minx: {
    eventId: 'minx',
    displayName: 'Megaminx',
    scrambleClasses: 'text-xs md:text-md',
    eventIcon: 'event-minx',
    generateScramble: true
  },
  '666-ns': {
    eventId: '666',
    displayName: '6x6x6 (No scramble)',
    scrambleClasses: 'text-sm md:text-md',
    eventIcon: 'event-666',
    generateScramble: false
  },
  '777-ns': {
    eventId: '777',
    displayName: '7x7x7 (No scramble)',
    scrambleClasses: 'text-sm md:text-md',
    eventIcon: 'event-777',
    generateScramble: false
  },
  'minx-ns': {
    eventId: 'minx',
    displayName: 'Megaminx (No scramble)',
    scrambleClasses: 'text-sm md:text-md',
    eventIcon: 'event-minx',
    generateScramble: false
  }
}

