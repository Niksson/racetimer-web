<script setup lang="ts">
import PWABadge from './components/PWABadge.vue'

</script>

<template>
  <RouterView v-slot="{ Component, route }">
    <Transition :name="route.meta.transition as string">
      <Component :is="Component" />
    </Transition>
  </RouterView>
  <PWABadge />
</template>