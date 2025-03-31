<script setup lang="ts">
import { ref } from 'vue';

const modal = ref<HTMLDialogElement>()

defineExpose({
  modal
})
</script>

<template>
  <dialog id="modal" class="modal grid-rows-2" ref="modal">
    <div class="modal-box player2" @touchend.stop="modal?.close()">
      <slot name="modal-content"></slot>
      <slot name="player2"></slot>
    </div>
    <div class="modal-box row-start-2" @touchend.stop="modal?.close()">
      <slot name="modal-content"></slot>
      <slot name="player1"></slot>
    </div>
    <form method="dialog" class="modal-backdrop row-span-2 row-start-1">
      <button>close</button>
    </form>
  </dialog>
</template>