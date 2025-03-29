import { assign, setup } from 'xstate'
import { TIMER_DELAY_MS, TIMER_TICK_TIME_MS } from '../lib/const'
import dayjs from 'dayjs'

type Events = { type: 'handsDown' } | { type: 'handsUp' }
type Context = {
  startDate?: Date
  elapsedTimeMs: number
}
type Output = {
  elapsedTimeMs: number
}

export const timerMachine = setup({
  types: {
    events: {} as Events,
    context: {} as Context,
    output: {} as Output
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
          actions: 'setStartDate'
        }
      }
    },
    'running-tick': {
      on: {
        handsDown: {
          target: 'stopped',
          actions: 'setElapsedTime'
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
          actions: 'setElapsedTime'
        }
      },
      after: {
        timerTick: {
          actions: 'setElapsedTime',
          target: 'running-tick'
        }
      }
    },
    stopped: {}
  },
  output: ({ context }) => ({
    elapsedTimeMs: context.elapsedTimeMs
  })
})
