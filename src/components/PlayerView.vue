<script setup lang="ts">
import 'scramble-display'
import { useTemplateRef } from 'vue';
import StatsCollapse from './StatsCollapse.vue';
const collapse = useTemplateRef('collapse')

import TwoSideModal from './TwoSideModal.vue';

const scrambleModal = useTemplateRef('scramble-modal')

const scramble = "R' U' F U2 B2 D' R2 D R2 B2 U B2 D' B R' U2 F2 R2 B L F2 D2 U' R' U' F"
</script>

<template>
  <div @click="collapse?.close()" class="flex gap-3 flex-col">
    <div class=" score">0 : <span class="text-accent">0</span></div>
    <div class="grow flex flex-col justify-between relative">
      <div class="scramble" @click="scrambleModal?.modal?.showModal()">{{ scramble }}</div>
      <div class="time">0.000</div>
      <StatsCollapse ref="collapse" />
    </div>
    <TwoSideModal ref="scramble-modal">
      <template #player2>
        <div class="flex place-content-center">
          <scramble-display event="333" :scramble="scramble" />
        </div>
      </template>
      <template #player1>
        <div class="flex place-content-center">
          <scramble-display event="333" :scramble="scramble" />
        </div>
      </template>
    </TwoSideModal>
  </div>
</template>