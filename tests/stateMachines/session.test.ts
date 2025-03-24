import { createActor } from 'xstate'
import { sessionMachine } from '../../src/stateMachines/session'

test('create session machine', () => {
  const expected: any = {
    player1: {
      score: 0,
      stats: {
        results: [],
        computedStats: {}
      }
    },
    player2: {
      score: 0,
      stats: {
        results: [],
        computedStats: {}
      }
    },
    statsSchema: {}
  }

  let result: any = {}
  const machineActor = createActor(sessionMachine)
  machineActor.subscribe((snapshot) => {
    result = snapshot.context
  })
  machineActor.start()

  expect(result).toEqual(expected)
})
