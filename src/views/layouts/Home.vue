<script setup>
import { useStore } from "vuex";
import { onMounted, computed } from "vue";

const store = useStore();

const randomNumberBetween1and5ForChooseHomePageTexts = computed(() => {
  return Math.ceil(Math.random()*5);
})

onMounted(() => {
  document.title = "Article Universe - Home";
  store.state.homeSubHeaderTextChange = true;
  store.commit('SET_STATE', { openWarningBox: false })
})
</script>

<template>
  <section class="text-center">
    <AppHeader class="">
      <h4 v-if="store.state.homeSubHeaderTextChange" class="sub-header">{{ $t(`home_sub_header_${randomNumberBetween1and5ForChooseHomePageTexts}`) }}</h4>
      <h4 v-else class="sub-header">{{ $t("welcome_back_X") }} {{ store.state.user?.firstName }}</h4>
    </AppHeader>
    
    <AppNavigation />

    <h3 class="font-Roboto text-lg onTablet:text-2xl | dark:text-white">{{ $t("reading_advice") }}</h3>

    <!-- content texts -->
    <div class="flex flex-col justify-centers items-center mt-10 mx-12 onLaptop:flex-row">

      <div class="mb-10 onLaptop:mr-16 onLaptop:mb-0 onLaptop:w-full">
        <h4 class="text-center font-Roboto text-xl font-bold mb-3 onTablet:text-2xl onLaptop:text-start | dark:text-white">{{ $t(`first_home_content_title_${randomNumberBetween1and5ForChooseHomePageTexts}`) }}</h4>
        <p class="font-Roboto text-base indent-3 text-justify onTablet:text-xl | dark:text-white">{{ $t(`first_home_content_content_${randomNumberBetween1and5ForChooseHomePageTexts}`) }}</p>
      </div>

      <div class="self-start onLaptop:w-full">
        <h4 class="text-center font-Roboto text-xl font-bold mb-3 onTablet:text-2xl onLaptop:text-start | dark:text-white">{{ $t(`second_home_content_title_${randomNumberBetween1and5ForChooseHomePageTexts}`) }}</h4>
        <p class="font-Roboto text-base indent-3 text-justify onTablet:text-xl | dark:text-white">{{ $t(`second_home_content_content_${randomNumberBetween1and5ForChooseHomePageTexts}`) }}</p>
      </div>

    </div>
  </section>
</template>

<style scoped> /* GLOBAL COMPONENTS USED: TEXTBOX |  GO TO -TAILWIND.CSS- FILE FOR STYLES OF COMPONENTS */ </style>