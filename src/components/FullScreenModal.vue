<script setup lang="ts">
import { ref } from 'vue';

const modal = ref<HTMLDialogElement>()

defineExpose({
  modal
})
</script>

<template>
  <dialog id="modal" class="modal" ref="modal">
    <div class="modal-box" @touchend.stop="modal?.close()">
      <slot></slot>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
</template>