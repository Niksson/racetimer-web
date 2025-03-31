<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRegisterSW } from 'virtual:pwa-register/vue'

// periodic sync is disabled, change the value to enable it, the period is in milliseconds
// You can remove onRegisteredSW callback and registerPeriodicSync function
const period = 1000 * 60 * 60 * 24

const swActivated = ref(false)

/**
 * This function will register a periodic sync if period is more than 0, you can modify the interval as needed.
 */
function registerPeriodicSync(swUrl: string, r: ServiceWorkerRegistration) {
  if (period <= 0) return

  setInterval(async () => {
    if ('onLine' in navigator && !navigator.onLine)
      return

    const resp = await fetch(swUrl, {
      cache: 'no-store',
      headers: {
        'cache': 'no-store',
        'cache-control': 'no-cache',
      },
    })

    if (resp?.status === 200)
      await r.update()
  }, period)
}

const { needRefresh, updateServiceWorker } = useRegisterSW({
  immediate: true,
  onRegisteredSW(swUrl, r) {
    if (period <= 0) return
    if (r?.active?.state === 'activated') {
      swActivated.value = true
      registerPeriodicSync(swUrl, r)
    }
    else if (r?.installing) {
      r.installing.addEventListener('statechange', (e) => {
        const sw = e.target as ServiceWorker
        swActivated.value = sw.state === 'activated'
        if (swActivated.value)
          registerPeriodicSync(swUrl, r)
      })
    }
  },
})

const title = computed(() => {
  if (needRefresh.value)
    return 'App update is available'
  return ''
})

function close() {
  needRefresh.value = false
}
</script>

<template>
  <Transition name="toast-fade">
    <div v-if="needRefresh" class="toast toast-middle toast-center m-0" aria-labelledby="toast-message" role="alert">
      <div class="alert alert-success">
        <span>{{ title }}</span>
        <button class="btn" @click="updateServiceWorker()">Reload</button>
        <button class="btn" @click="close">Close</button>
      </div>
    </div>
  </Transition>
</template>
