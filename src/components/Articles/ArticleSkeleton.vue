<script setup> </script>

<template>
  <div v-for="skeleton in 4" :key="skeleton" class="animate-pulse flex flex-col justify-center items-center mb-10 p-4 -mt-6 w-11/12 bg-slate-100">
    <div class="bg-gray-300 w-11/12 h-[14px] rounded-lg mb-2">&nbsp;</div>
    <div class="bg-gray-300 w-1/3 h-[14px] rounded-lg">&nbsp;</div>
  </div>
</template>

<style scoped> /* GLOBAL COMPONENTS USED: NONE */ </style>