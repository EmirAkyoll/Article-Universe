<template>
  <div class="flex flex-col justify-center items-center h-96 mb-12 mt-16 mx-10 | dark:text-white">
    <ion-icon name="globe-outline" class="w-[55px] h-[55px] | onTablet:w-[75px] onTablet:h-[75px] onLaptop:w-[90px] onLaptop:h-[90px] onDesktop:w-[100px] onDesktop:h-[100px] mb-12"></ion-icon>
    <h2 class="text-2xl | onTablet:text-3xl onLaptop:text-4xl onDesktop:text-5xl mb-16">{{ $t('not_found_header') }}</h2>
    <p class="text-xl | onTablet:text-2xl onLaptop:text-3xl onDesktop:text-3xl">{{ $t('not_found_text') }}</p>
  </div>
</template>

<script setup> </script>

<style scoped> </style>