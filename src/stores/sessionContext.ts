import { defineStore } from 'pinia'
import { ref } from 'vue'
import { randomScrambleForEvent } from 'cubing/scramble'

export type RoundContext = {
  id: number
  scramble?: string
}

export const useSessionContext = defineStore('sessionContext', () => {
  const eventId = ref<string>('333')
  function setEventId(id: string) {
    eventId.value = id
  }

  const roundCount = ref<number>(0)

  const roundContext = ref<RoundContext>({
    id: 1
  })
  randomScrambleForEvent(eventId.value).then((scramble) => {
    roundContext.value.scramble = scramble.toString()
  })

  async function startNewRound() {
    roundCount.value++
    roundContext.value = {
      id: roundCount.value,
      scramble: 'Generating...'
    }

    const scramble = await randomScrambleForEvent(eventId.value)
    roundContext.value.scramble = scramble.toString()
  }

  return { eventId, setEventId, roundContext, startNewRound }
})
