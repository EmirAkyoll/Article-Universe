<script setup>
import { onMounted } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

onMounted(() => {
  const User = JSON.parse(sessionStorage.getItem('user'));
  store.state.user = User;
  store.state.readArticles = User?.read;
  store.state.favoriteArticles = User?.favorites;
})
</script>

<template>
  <main>
    <router-view />
  </main>
</template>

<style scoped> </style>
