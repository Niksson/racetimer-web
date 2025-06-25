<script setup lang="ts">
import { computed, onMounted, useTemplateRef, ref } from 'vue';
import FullScreenModal from './components/FullScreenModal.vue';
import PWABadge from './components/PWABadge.vue'
import { useStorage } from '@vueuse/core';

const noTouchModal = useTemplateRef('noTouchModal')

const isIos = computed(() => {
  return /iPad|iPhone|iPod/.test(navigator.userAgent)
})

const pwaPromptKey = 'doNotShowPwaPromptAgain'
const showPwaPrompt = ref(true)
const doNotShowPwaPromptAgain = useStorage(pwaPromptKey, false, localStorage)
function closePwaPrompt() {
  showPwaPrompt.value = false
}


onMounted(() => {
  if (!('ontouchstart' in window) &&
    !(navigator.maxTouchPoints > 0)) {

    noTouchModal.value?.modal?.showModal()
  }
  if (doNotShowPwaPromptAgain.value) {
    showPwaPrompt.value = false
  }
})

</script>

<template>
  <RouterView v-slot="{ Component, route }">
    <Transition :name="route.meta.transition as string">
      <Component :is="Component" class="unselectable" />
    </Transition>
  </RouterView>
  <FullScreenModal ref='noTouchModal' class="text-center">
    <h2>⚠️ WARNING ⚠️ </h2>
    <h2>NO TOUCH SCREEN DETECTED</h2>
    <p>It seems that you run this page using a device that doesn't have touch support.
    </p>
    <p>This timer cannot be properly used without touch screen support</p>
  </FullScreenModal>
  <div v-if="showPwaPrompt && isIos" class="toast toast-middle toast-center m-0" aria-labelledby="toast-message"
    role="alert">
    <div class="alert alert-info">
      <div>
        <h3 class="font-bold text-lg">Add a shortcut to Home Screen</h3>
        <p>You can add this app to Home Screen! <br /> Here's how to do it on Safari:</p>
        <ul class="list-disc list-inside">
          <li>Touch the "Share" button in the bottom of screen</li>
          <li>Touch "Add to Home Screen" and follow the instructions</li>
        </ul>
        <label class="flex items-center gap-2 mt-2">
          <input type="checkbox" id="show-pwa-prompt" class="checkbox checkbox-neutral"
            v-model="doNotShowPwaPromptAgain" />
          <span>Don't show this again</span>
        </label>
        <button @click="closePwaPrompt" class="mt-3 btn shadow-md">Close</button>
      </div>
    </div>
  </div>
  <PWABadge />
</template>