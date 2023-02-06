<script setup>
import { ref, onMounted, inject } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();
const Axios = inject('Axios');

let darkModeEnabled = ref(true);

function onLogout() {
  store.commit('SET_STATE', { user: null });
  sessionStorage.clear();
  router.push({ name: 'Login' });
}

function deleteUser() {
  Axios.delete(`/users/${store.state.user.id}`)
        .catch(error => console.log(error));
  onLogout();
}

function TurnONTheLight() {
  darkModeEnabled.value = false;
  document.getElementById('htmlTag').classList.remove('dark');
  document.getElementById('htmlTag').classList.add('light');
}

function TurnOFFTheLight() {
  darkModeEnabled.value = true;
  document.getElementById('htmlTag').classList.remove('light');
  document.getElementById('htmlTag').classList.add('dark');
}

function themeColorActivation(params) {
  let _class_name = document.getElementById('htmlTag').className;
  if (_class_name == 'dark hydrated') {
    darkModeEnabled.value = true;
  }
  else if(_class_name == 'hydrated light') {
    darkModeEnabled.value = false;
  }
}

onMounted(() => {
  themeColorActivation();
  document.title = "Article Universe - Account";
  store.commit('SET_STATE', { homeSubHeaderTextChange: true });
  store.commit('SET_STATE', { openWarningBox: false })
})
</script>

<template>
   <section class="relative flex flex-col font-Roboto">
    <div class="flex justify-center">
      <AppWarningBox class="absolute top-10">
        <template v-slot:warning-box-header>
          <p>{{ $t('user_delete_warning_header') }}</p>
        </template>

        <template v-slot:warning-box-body>
          <p class="mb-5 text-justify">{{ $t('user_delete_header_question') }}</p>
          <div class="flex justify-end">
            <button @click="deleteUser" class="bg-red-500 rounded-xl py-3 px-5 text-white ring-1 ring-red-500 mr-3">{{ $t('delete') }}</button>
            <button @click="store.state.openWarningBox = false" class="bg-white rounded-xl py-3 px-5 text-red-500 ring-1 ring-red-500">{{ $t('cancel') }}</button>
          </div>
        </template>
      </AppWarningBox>  
    </div>

    <AppHeader>
      <h4 class="sub-header">{{ $t('account_sub_header') }}</h4>
    </AppHeader>
    <!-- favorite articles modal -->
    <AppModal v-show="store.state.whichModal == 'favorites'" class="-mt-36">
      <span class="flex items-center">
        <ion-icon name="star-sharp" class="mr-3 sizeXY-[25px]" />
        <h5 class="font-Roboto text-lg">{{ $t('favorites_articles') }}</h5>
      </span>
    </AppModal>
    
     <!-- read articles modal -->
    <AppModal v-show="store.state.whichModal == 'read'" class="-mt-36">
      <span class="flex items-center">
        <ion-icon name="checkmark-done-sharp" class="mr-3 sizeXY-[25px]" />
        <h5 class="font-Roboto text-lg">{{ $t('read_articles') }}</h5>
      </span>
    </AppModal>

    <AppNavigation class="mt-10"/>

    <div class="flex justify-center items-centers|">
      <div class="relative flex flex-col items-center p-5 pt-0 w-[600px] h-[320px]">

       <div class="flex justify-center items-centers w-[250px] -mt-10 mb-7">
        <span class="">
          <button v-show="!darkModeEnabled" @click="TurnOFFTheLight()" class="relative bg-slate-800">
          <ion-icon name="moon" class="absolute top-0 right-5 sizeXY-[25px] p-3 bg-slate-8 00 text-white bg-slate-700 rounded-full ring-2 ring-slate-200 | onTablet:right-16"/>
        </button>
        <button v-show="darkModeEnabled" @click="TurnONTheLight()" class="relative">
          <ion-icon name="sunny-sharp" class="absolute top-0 right-5 sizeXY-[25px] p-3 rounded-full ring-1 ring-slate-400 bg-white text-slate-700 | onTablet:right-16" />
        </button>
        </span>

        <button @click="store.commit('SET_STATE', { openWarningBox: true })" class="bg-red-500 rounded-full p-3 mt-3 ml-10 | dark:bg-white">
          <ion-icon name="person-remove-outline" class="sizeXY-[25px] text-white | dark:text-red-600"></ion-icon>
        </button>

        <button @click="onLogout" class="relative left-16 | onTablet:left-28 text-blue-500 mt-2 ">
          <ion-icon name="log-out-outline" class="sizeXY-[30px] bg-red-600 rounded-full p-2 text-white | dark:text-red-700 dark:bg-white" />
        </button>
       </div>

        <p class="text-3xl mb-10 mt-0 | dark:text-white">{{ store.state.user?.firstName }} {{ store.state.user?.lastName }}</p>

        <select v-model="$i18n.locale" class="rounded-lg text-white bg-slate-700 w-1/2 text-center p-4 mb-5 | onTablet:w-1/3 | dark:bg-white dark:text-black">
          <option v-for="locale in $i18n.availableLocales" :key="`locale-${locale}`" :value="locale" class="text-justify bg-slate-700 | dark:bg-white dark:text-black">{{ $t(`language_${locale}`) }} ({{ locale }})</option>
        </select>
       
        <div class="flex flex-col justify-center items-center | onTablet:flex-row">
          <button @click="store.commit('SET_STATE', { whichModal: 'read' })" class="button button-for-account mb-2 w-[150px] | onTablet:mr-5 onTablet:mb-0">
            <span class="flex mr-2">
              {{ store.state.user.read.length }} 
              <p class="ml-2 | dark:text-black">{{ $t('read_articles') }}</p>
            </span> 
            <ion-icon name="checkmark-done-sharp" class="sizeXY-[25px]"/>
          </button>

          <span class="hidden text-2xl | onTablet:block | dark:text-white">/</span> 

          <button @click="store.commit('SET_STATE', { whichModal: 'favorites' })" class="button button-for-account mt-2 w-[150px] | onTablet:ml-5 onTablet:mt-0">
            <span class="flex mr-2">
              {{ store.state.user.favorites.length }}
              <p class="ml-2 | dark:text-black">{{ $t('favorites_articles') }}</p>
            </span> 
            <ion-icon name="star-sharp" class="sizeXY-[25px]"/>
          </button>
        </div>

      </div>
    </div>
  </section>
</template>

<style scoped>
 /* GLOBAL COMPONENTS USED: BUTTON, SUB-HEADER | GO TO -TAILWIND.CSS- FILE FOR STYLES OF COMPONENTS*/ 
.button-for-account{
  @apply flex justify-center items-center py-3 text-white cursor-pointer dark:text-black;
}
</style>