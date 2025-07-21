<script setup lang="ts">

const { backdrop } = defineProps<{
  backdrop?: boolean
}>();

const model = defineModel<boolean>()

</script>

<template>
  <dialog class="modal" :class="{ 'modal-open': model }">
    <div class="modal-box">
      <slot></slot>
    </div>
    <form v-if="backdrop" method="dialog" class="modal-backdrop">
      <button @click="model = false">close</button>
    </form>
  </dialog>
</template>