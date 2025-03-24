import { setup } from 'xstate'

export type Events = { type: 'handsDown' }

export const timerMachine = setup({
  types: {
    events: {} as Events
  }
}).createMachine({
  initial: 'ready',
  states: {
    ready: {
      on: {
        handsDown: 'waiting'
      }
    },
    waiting: {}
  }
})
