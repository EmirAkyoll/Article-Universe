<script setup>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import { folderDesks } from "../../store/manually";

const store = useStore();

const search = ref('');
const folders = folderDesks;

function scrollToTop(){
  window.scrollTo(0, 0); 
}

const articleFolders = computed(() => {
  return folders.filter(folder => {
    return folder.toLowerCase().includes(search.value) || folder.includes(search.value);
  });
})

onMounted(() => {
  document.title = "Article Universe - Articles";
  store.commit('SET_STATE', { homeSubHeaderTextChange: true });
  store.commit('SET_STATE', { openWarningBox: false })
})
</script>

<template>
  <section class="">
     <!-- articles modal -->
    <AppModal v-show="store.state.whichModal == 'public'" class="mt-16">
      <span class="flex items-center">
        <ion-icon name="folder-open-sharp" class="mr-3 sizeXY-[25px]" />
        <h5 class="font-Roboto text-lg"> <p class="inline font-bold">{{ store.state.whichFolder }}</p> Articles /</h5>
      </span>
    </AppModal>

    <AppHeader>
      <h4 class="sub-header">{{ store.state.user.firstName }}, {{ $t('articles_sub_header') }}</h4>
    </AppHeader>

    <AppNavigation />

    <!-- search box -->
    <search-box class="flex justify-center items-center">
      <ion-icon name="search" class="sizeXY-[25px] border border-r-0 border-slate-600 rounded-tl-lg rounded-bl-lg p-2 mr-0 bg-slate-300" />
      <input v-model="search" :placeholder="$t('search_box_placeholder')" class="textbox border-slate-600 p-[11px] rounded-bl-none rounded-tl-none w-[220px] | placeholder:font-Roboto placeholder:text-slate-500 | onTablet:w-2/5 onLaptop:w-1/4" type="search" />
    </search-box>

    <!-- folders -->
     <TransitionGroup tag="div" name="folders" class="container gap-y-10 my-14 mx-auto outline-none grid grid-cols-1 justify-items-center | onTablet:grid-cols-2 onTablet:gap-4 onTablet:gap-x-0 onLaptop:mx-36s onLaptop:gap-y-12 onLaptop:grid-cols-3 onDesktop:grid-cols-4">
      <button
        v-for="folderName in articleFolders" :key="folderName"
        type="button"
        class="font-Roboto border-[1px] border-slate-400 shadow-lg relative transition-all duration-300 bg-[#EEF283] dark:bg-[#EAE944] dark:border-gray-500 rounded-tl-none rounded-lg mt-[35px] w-[260px] h-[185px] |
         onLaptop:w-[280px] onLaptop:h-[200px] onLaptop:hover:translate-y-3 |
         before:content-[''] before:w-2/4 before:bg-[#EEF283] before:dark:bg-[#EAE944] before:h-[15px] before:rounded-tl-none before:absolute before:-top-4 before:-left-[1px] before:border-[1px] before:border-slate-400 before:rounded-tr-2xl"
        @click="store.commit('SET_STATE', { whichFolder: folderName });
                store.commit('SET_STATE', { whichModal: 'public' });
                store.dispatch('getArticles', folderName)">
        {{ folderName }}
      </button>
     </TransitionGroup>

    <!-- scroll to top button -->
    <button @click="scrollToTop" class="fixed right-4 top-4 opacity-70 bg-white z-10 rounded-full cursor-pointer transition-all duration-300 | onTablet:w-[60px] onTablet:h-[60px] onTablet:right-10 onTablet:top-10 onLaptop:hover:-translate-y-2">
      <ion-icon name="chevron-up-sharp" class="w-[50px] h-[50px]" />
    </button>

  </section>
</template>

<style scoped>
 /* GLOBAL COMPONENTS USED: TEXTBOX, SUB-HEADER | GO TO -TAILWIND.CSS- FILE FOR STYLES OF COMPONENTS */ 
 .folders-enter-from{
  opacity: 0;
 }
 .folders-enter-to{
  opacity: 1;
 }

.folders-enter-active{
  transition: all 0.4s ease;
}

.folders-leave-from{
  opacity: 1;
}
.folders-leave-to{
  opacity: 0;
}
 </style>