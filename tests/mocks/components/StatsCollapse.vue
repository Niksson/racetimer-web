<script setup lang="ts">
import { ref } from 'vue'

const isOpen = ref(false)
function close() {
  if (isOpen.value)
    isOpen.value = false
}

defineExpose({
  close, isOpen
})
</script>

<template>
  <div></div>
</template>