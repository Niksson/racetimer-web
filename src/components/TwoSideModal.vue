<script setup lang="ts">

const { backdrop } = defineProps<{
  backdrop?: boolean
}>();

const model = defineModel<boolean>()

</script>

<template>
  <dialog class="modal grid-rows-2" :class="{ 'modal-open': model }">
    <div class="modal-box player2" @click="model = false">
      <slot name="player2"></slot>
    </div>
    <div class="modal-box row-start-2" @click="model = false">
      <slot name="player1"></slot>
    </div>
    <form v-if="backdrop" method="dialog" class="modal-backdrop row-span-2 row-start-1">
      <button @click="model = false">close</button>
    </form>
  </dialog>
</template>