<script setup>
import { inject, onMounted, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const Axios = inject('Axios');
const store = useStore();
const router = useRouter();

const userName = ref('');
const password = ref('');

function logIn() {
  Axios.get(`/users?userName=${userName.value}&password=${password.value}`)
        .then(login_response => {
          if (login_response?.data?.length > 0) {
            store.commit('SET_STATE', { user: login_response?.data[0] });
            sessionStorage.setItem('user', JSON.stringify(store.state.user));
            const User = JSON.parse(sessionStorage.getItem('user'));
            store.commit('SET_STATE', { user: User });
            
            store.commit('SET_STATE', { loading: true });
                      
            setTimeout(() => {
                store.commit('SET_STATE', { loading: false });
                router.push({name: 'Home'})
            }, 250);
          }
          else{ 
            store.state.openWarningBox = true;
          }
       })
       .catch(error => console.log(error))
}

onMounted(() => {
  document.title = "Article Universe - Login";
  store.commit('SET_STATE', { user: null })
  store.commit('SET_STATE', { openWarningBox: false })
})
</script>

<template>
  <section class="relative flex flex-col items-center h-screen justify-center font-Roboto">
    <AppWarningBox class="absolute top-10">
      <template v-slot:warning-box-header>
        <p>{{ $t('incorrect_data_entry') }}</p>
      </template>
      
      <template v-slot:warning-box-body>
        <p class="text-justify">{{ $t('wrong_login_data_warning') }}</p>
      </template>
    </AppWarningBox>

    <AppHeader class="-mt-28">
      <h4 v-if="store.state.isRegistered" class="sub-header">{{ $t('came_back_to_login_page') }}</h4>
      <h4 v-else class="sub-header">{{ $t('welcome') }}</h4>
    </AppHeader>

    <!-- user data -->
    <div class="flex flex-col items-center mt-16 mb-1">
      <!-- textbox for username -->
      <input v-model="userName" type="text" :placeholder="$t('login_user_name')" class="ring-1 ring-slate-600 textbox w-60 my-4 onTablet:w-72 onLaptop:w-96 placeholder:font-Roboto placeholder:text-slate-500" id="floatingInput" />

      <!-- textbox for password -->
      <input v-model="password" type="password" :placeholder="$t('login_password')" class="ring-1 ring-slate-600 textbox w-60 mt-1 mb-4 onTablet:w-72 onLaptop:w-96 placeholder:font-Roboto placeholder:text-slate-500" id="floatingPassword" />
    </div>

    <div class="flex flex-col items-center mt-2 | onLaptop:flex-row onLaptop:items-center onLaptop:justify-evenly onLaptop:w-[610px]">
      <!-- routing to register page -->      
      <p class="font-Roboto text-base mb-8 | onLaptop:mb-0 onLaptop:self-start | dark:text-white">
        {{ $t('new_reader') }} 
       <router-link to="/register" class="text-blue-600 font-extrabold | dark:text-blue-300">{{ $t('create_an_account') }}</router-link>
      </p>
      
      <!-- Login button -->
      <button class="button w-64 | onTablet:w-80 onLaptop:w-40 onLaptop:hover:-translate-y-1" @click="logIn" type="button" id="btn" :class="{ disabled: loading }">
        <span v-show="loading" class=""></span>
        <span class="text-white font-Roboto | dark:text-black">{{ $t('login') }}</span>
      </button>
    </div>
  </section>
</template>

<style scoped> /* GLOBAL COMPONENTS USED: BUTTON, TEXTBOX, SUB-HEADER |  GO TO -TAILWIND.CSS- FILE FOR STYLES OF COMPONENTS */ </style>