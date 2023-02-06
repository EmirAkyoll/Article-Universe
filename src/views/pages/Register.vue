<script setup>
import { onMounted, inject, reactive } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

import useVuelidate from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";

const Axios = inject('Axios')
const store = useStore();
const router = useRouter();

const userData = reactive({
  firstName: '',
  lastName: '',
  userName: '',
  password: '',
  favorites: [],
  read: [],
})

const rules = {
  firstName: { required },
  lastName: { required },
  userName: { required },
  password: { required, minLength: minLength(5) },
}

const $v = useVuelidate(rules, userData);

const onSave = async() => {
  const result = await $v.value.$validate();
  
  if (result) {
    store.commit('SET_STATE', { openWarningBox: false }); 

    Axios.post('/users', { ...userData })
          .then(registered_user_response => { console.log("registered_user_response >>", registered_user_response); })
           .then(store.state.isRegistered = true)
            .catch(error => console.log(error))
             .finally(() => (
               setTimeout(() => {
               router.push({name: 'Login'})
               }, 1500)
             ));
  } else {
    store.commit('SET_STATE', { openWarningBox: true }); 
  }
}

onMounted(() => {
  document.title = "Article Universe - Register";
  store.commit('SET_STATE', { openWarningBox: false })
})
</script>

<template>
  <section class="relative flex flex-col justify-center items-center p-5 h-screen font-Roboto">
    <AppWarningBox class="absolute top-10">
      <template v-slot:warning-box-header>
        <p>{{ $t('incorrect_data_entry') }}</p>
      </template>
      
      <template v-slot:warning-box-body>
        <p class="text-justify">{{ $t('wrong_register_data_warning') }}</p>
      </template>
    </AppWarningBox>

    <AppHeader class="-mt-[60px]">
      <h4 class="sub-header">{{ $t('welcome_are_you_new_here') }}</h4>
    </AppHeader>

    <details class="relative cursor-pointer mt-5 -mb-2">
      <summary class="bg-slate-700 list-none rounded-full text-center ring-1 ring-white animate-bounce">
        <ion-icon name="help" class="w-[25px] h-[20px] text-white p-1 pt-2"/>
      </summary>
      <info class="absolute -left-20 border-2 border-blue-500 rounded-sm w-[200px]">
        <p class="bg-slate-700 text-white text-center p-3 leading-5">{{ $t('password_length_criterion') }}</p>
        <hr>
        <p class="bg-slate-700 text-white text-center p-3 leading-5">{{ $t('uniq_user_and_password_criterion') }}</p>
      </info>
    </details>

   <div class="flex flex-col items-center mt-12 onLaptop:mt-24">
    <form>
      <div class="flex flex-col items-center onLaptop:flex-row">
        <!-- textbox for real first name -->
        <input v-model="userData.firstName" type="text" :placeholder="$t('first_name')" class="ring-1 ring-slate-600 textbox mb-4 onLaptop:mr-8 onLaptop: w-72 placeholder:font-Roboto | dark:placeholder:text-slate-500" id="inputFirstName" name="inputFirstName" />
        <!-- textbox for real last name -->
        <input v-model="userData.lastName" type="text" :placeholder="$t('last_name')" class="ring-1 ring-slate-600 textbox mb-4 onLaptop: w-72 placeholder:font-Roboto | dark:placeholder:text-slate-500" id="inputLastName" name="inputLastName" />
      </div>

      <div class="flex flex-col items-center onLaptop:flex-row">
        <!-- textbox for user name -->
        <input v-model="userData.userName" type="text" :placeholder="$t('user_name')" class="ring-1 ring-slate-600 textbox mb-4 onLaptop:mr-8 onLaptop: w-72 placeholder:font-Roboto | dark:placeholder:text-slate-500" id="inputUserName" name="inputUserName" />
        <!-- textbox for password -->
        <input v-model="userData.password" type="password" :placeholder="$t('password')" class="ring-1 ring-slate-600 textbox onTablet:mb-3 onLaptop: w-72 placeholder:font-Roboto | dark:placeholder:text-slate-500" id="inputPassword" name="inputPassword" />
      </div>
    </form>
    
  <div class="w-[610px] flex flex-col items-center mt-3 mb-4 | onLaptop:flex-row onLaptop:items-center onLaptop:justify-between">
    <!-- routing to login page -->
    <p class="font-Roboto text-base onLaptop:self-start | dark:text-white">
      {{ $t('already_registered') }}
      <router-link :to="{ name: 'Login' }" class="text-blue-600 font-extrabold | dark:text-blue-300">{{ $t('login') }}</router-link>
    </p>
    
    <!-- sign up button -->
    <button 
        @click="onSave" type="button" id="btn" 
        class="button w-72 mt-8 | onLaptop:w-36 onLaptop:mt-0 onLaptop:hover:-translate-y-1" 
        :class="{ disabled: loading }">
      <span v-show="loading" class=""></span>
      <span class="text-white font-Roboto | dark:text-black">{{ $t('sing_up') }}</span>
    </button>
  </div>
 
  <p class="font-Roboto mt-2 | dark:text-white">{{ $t('starred_required_info') }}</p>
   </div>
  </section>
</template>
   
<style scoped> /* GLOBAL COMPONENTS USED: BUTTON, TEXTBOX, SUB-HEADER | GO TO -TAILWIND.CSS- FILE FOR STYLES OF COMPONENTS */ </style>