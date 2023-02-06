<script setup>
import { useStore } from "vuex";
const store = useStore();
</script>

<template>
  <nav class="flex justify-center my-16"> 
    <div class="flex justify-evenly w-1/2">
      <!-- 'Home' navigation item as text or icon -->
      <router-link
        to="/"
        class="button text-white p-5 mr-1 hidden | onLaptop:block">
          {{ $t("home_page") }}  
      </router-link>
        <router-link
          to="/"
          class="text-center button text-white px-5 mr-1 w-[70px] h-[60px] | onLaptop:hidden">
            <ion-icon name="home-outline" class="sizeXY-[27px]"></ion-icon>
        </router-link>

      <!-- 'Article' navigation item as text or icon -->
      <router-link
        to="/articles"
        class="button text-white px-5 py-5 mr-1 hidden | onLaptop:block"
        aria-current="page">
        {{ $t("articles_page") }} 
      </router-link>
        <router-link
          to="/articles"
          class="text-center button text-white px-5 mr-1 w-[70px] h-[60px] | onLaptop:hidden"
          aria-current="page">
            <ion-icon name="document-text-outline" class="sizeXY-[27px]"></ion-icon>
        </router-link>

      <!-- 'Account' navigation item as text or icon -->
      <router-link
        to="/account"
        class="button text-white px-5 py-5 hidden | onLaptop:block">
        {{ $t("account_page") }} 
      </router-link>
        <router-link
          to="/account"
          class="text-center button text-white px-5 w-[70px] h-[60px] | onLaptop:hidden">
          <ion-icon name="person-outline" class="sizeXY-[27px] "></ion-icon>
        </router-link>
    </div>
  </nav>
</template>

<style scoped> /* GLOBAL COMPONENTS USED: BUTTON | GO TO -TAILWIND.CSS- FILE FOR STYLES OF COMPONENTS */ </style>