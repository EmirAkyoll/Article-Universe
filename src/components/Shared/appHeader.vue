<script setup> </script>

<template>
  <header class="mb-6 mt-16">
    <div class="text-center">
      <h1 class="mb-5 z-20 font-Roboto text-[35px] | onTablet:text-[45px] onLaptop:text-[52px] onDesktop:text-[60px] | dark:text-white">{{ $t("article_universe") }}</h1>
      <slot />
    </div>
  </header>
</template>

<style scoped> /* GLOBAL COMPONENTS USED: NONE */ </style>