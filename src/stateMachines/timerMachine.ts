import { assign, emit, setup } from 'xstate'
import { TIMER_DELAY_MS, TIMER_TICK_TIME_MS } from '../lib/const'
import dayjs from 'dayjs'

type Events = { type: 'handsDown' } | { type: 'handsUp' } | { type: 'unblock' }
type Context = {
  startDate?: Date
  elapsedTimeMs: number
}
type Emits = { type: 'timer-stopped'; elapsedTimeMs: number } | { type: 'timer-started' }

export const timerMachine = setup({
  types: {
    events: {} as Events,
    context: {} as Context,
    emitted: {} as Emits
  },
  delays: {
    timerDelay: TIMER_DELAY_MS,
    timerTick: TIMER_TICK_TIME_MS
  },
  actions: {
    setStartDate: assign({
      startDate: () => new Date()
    }),
    setElapsedTime: assign(({ context }) => {
      const startDateD = dayjs(context.startDate)
      const now = dayjs()
      const diff = now.diff(startDateD)
      return {
        elapsedTimeMs: diff
      }
    }),
    timerStarted: emit({type: 'timer-started'}),
    timerStopped: emit(({ context }) => {
      return {
        type: 'timer-stopped',
        elapsedTimeMs: context.elapsedTimeMs
      } as Emits
    })
  }
}).createMachine({
  initial: 'ready',
  context: {
    elapsedTimeMs: 0
  },
  states: {
    ready: {
      on: {
        handsDown: 'waiting'
      }
    },
    waiting: {
      on: {
        handsUp: 'ready'
      },
      after: {
        timerDelay: 'standby'
      }
    },
    standby: {
      on: {
        handsUp: {
          target: 'running-tick',
          actions: ['setStartDate', 'timerStarted']
        }
      }
    },
    'running-tick': {
      on: {
        handsDown: {
          target: 'stopped',
          actions: ['setElapsedTime', 'timerStopped']
        }
      },
      after: {
        timerTick: {
          actions: 'setElapsedTime',
          target: 'running-tock'
        }
      }
    },
    'running-tock': {
      on: {
        handsDown: {
          target: 'stopped',
          actions: ['setElapsedTime', 'timerStopped']
        }
      },
      after: {
        timerTick: {
          actions: 'setElapsedTime',
          target: 'running-tick'
        }
      }
    },
    stopped: {
      on: {
        handsDown: 'blocked',
        unblock: 'ready'
      }
    },
    blocked: {
      on: {
        handsUp: 'stopped',
        unblock: 'ready'
      }
    }
  },
  output: ({ context }) => ({
    elapsedTimeMs: context.elapsedTimeMs
  })
})
