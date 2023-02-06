<script setup>
import { useStore } from "vuex";
const store = useStore();
</script>

<template>
  <div v-show="store.state.openWarningBox" class="z-20 w-2/3 | onLaptop:w-1/3" role="alert">
    <div class="flex justify-between items-center bg-red-500 text-white font-bold rounded-t px-6 py-3">
      <slot name="warning-box-header" />
      <button @click="store.commit('SET_STATE', { openWarningBox: false })"> <ion-icon name="close" class="sizeXY-[20px]" /> </button>
    </div>
    <div class="border border-t-0 border-red-400 rounded-b bg-red-100 p-4 text-red-700 text-justify leading-6">
      <slot name="warning-box-body" />
    </div>
  </div>
</template>

<style scoped> /* GLOBAL COMPONENTS USED: NONE */ </style>