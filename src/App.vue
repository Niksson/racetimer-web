<script setup lang="ts">
import { onMounted, useTemplateRef } from 'vue';
import FullScreenModal from './components/FullScreenModal.vue';
import PWABadge from './components/PWABadge.vue'

const noTouchModal = useTemplateRef('noTouchModal')

onMounted(() => {
  if (('ontouchstart' in window) ||
    (navigator.maxTouchPoints > 0))
    return
  noTouchModal.value?.modal?.showModal()
})
</script>

<template>
  <RouterView v-slot="{ Component, route }">
    <Transition :name="route.meta.transition as string">
      <Component :is="Component" class="unselectable grid grid-rows-[1fr_auto_1fr] h-svh w-full" />
    </Transition>
  </RouterView>
  <FullScreenModal ref='noTouchModal' class="text-center">
    <h2>⚠️ WARNING ⚠️ </h2>
    <h2>NO TOUCH SCREEN DETECTED</h2>
    <p>It seems that you run this page using a device that doesn't have touch support.
    </p>
    <p>This timer cannot be properly used without touch screen support</p>
  </FullScreenModal>
  <PWABadge />
</template>