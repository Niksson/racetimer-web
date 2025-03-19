<template>
  <button @click="modal?.showModal()">Open dialog</button>
  <dialog id="penalty-modal" class="modal grid-rows-2" ref="modal">
    <div class="modal-box top-half">Modal box 1</div>
    <div class="modal-box row-start-2">Modal box 2</div>
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
</template>