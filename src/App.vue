<script setup lang="ts">
import PWABadge from './components/PWABadge.vue'
</script>

<template>
  <div id="top-half">
    Hello world
  </div>
  <PWABadge />
</template>

<style>
#top-half {
  transform: rotate(180deg);
}
</style>