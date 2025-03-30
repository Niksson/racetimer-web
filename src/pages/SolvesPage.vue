<script setup lang="ts">
const range: number[] = [...Array(100).keys()];
</script>

<template>
  <div id="solves-page" class="unselectable grid grid-rows-[1fr_auto_1fr] h-screen w-full">
    <div class="player2 flex flex-col overflow-hidden">
      <div class="p-1 text-center text-lg font-semibold border-b-1 border-neutral-600">SOLVES</div>
      <ol class="grow solves-list list-inside list-decimal overflow-scroll">
        <li v-for="i in range" :key="i" class="border-b-1 p-1 border-neutral-600"><span
            class="mx-1 font-semibold">0.190</span> B' D2 L F2
          B' D' R2 D2
          R2 B2 L' D2 R F2 U2
          R2 D L'</li>
      </ol>
    </div>
    <div class="divider-custom">
      <div class="divider-content absolute w-full -top-5 flex justify-end">
        <RouterLink replace to="/" v-slot="{ navigate }">
          <button @click="navigate" class="mr-3 text-xl h-10 btn btn-outline bg-base-100">TIMER</button>
        </RouterLink>
      </div>
    </div>
    <div class="flex flex-col overflow-hidden">
      <div class="p-1 text-center text-lg font-semibold border-b-1 border-neutral-600">SOLVES</div>
      <ol class="grow solves-list list-inside list-decimal overflow-scroll">
        <li v-for="i in range" :key="i" class="border-b-1 p-1 border-neutral-600"><span
            class="mx-1 font-semibold">0.190</span> B' D2 L F2
          B' D' R2 D2
          R2 B2 L' D2 R F2 U2
          R2 D L'</li>
      </ol>
    </div>
  </div>
</template>