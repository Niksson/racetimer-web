<script setup lang="ts">
import { type Side } from '../models/Side'
defineProps<{
  side: Side
}>()
</script>

<template>
  <div class="flex gap-3 flex-col mb-2" :class="[side]">
    <div class="score text-center">0 : 0</div>
    <div class="grow flex flex-col justify-between">
      <div class="scramble">R' U' F U2 B2 D' R2 D R2 B2 U B2 D' B R' U2 F2 R2 B L F2 D2 U' R' U' F</div>
      <div class="time">0.000</div>
      <div class="stats">STATS</div>
    </div>
  </div>
</template>