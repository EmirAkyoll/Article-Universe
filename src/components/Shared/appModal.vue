<script setup>
import { useStore } from "vuex";
import ArticleSkeleton from '../../components/Articles/ArticleSkeleton.vue';
import ArticlesCollapses from '../../components/Articles/ArticlesCollapses.vue';

const store = useStore();
</script>

<template>
   <modal class="flex justify-center">
    <div class="fixed h-modals mt-10s z-50">
      <div class="relative w-screen max-w-4xl px-4">
        <div class="fixed inset-0 bg-gray-900 opacity-40"></div>
        <!-- Modal content -->
        <div class="bg-white rounded-lg shadow relative overflow-hidden max-h-full"> 
          <!-- Modal header -->
          <div class="flex items-start justify-between p-5 border-b rounded-t ">
            <slot />
            
            <button @click="store.commit('SET_STATE', { whichModal: 'none' });
                            store.commit('SET_STATE', { articles: [] })
                            ">
              <ion-icon name="close" class="sizeXY-[25px]" />
            </button>
          </div>
          <hr />
          <!-- Modal body -->
          <div class="p-6 space-y-6 overflow-y-scroll max-h-[450px]">
            <ArticlesCollapses v-show="!store.state.isArticlesAreLoaded" />
            <div v-show="store.state.isArticlesAreLoaded && store.state.whichModal == 'public'" class="flex flex-col items-center">
              <ArticleSkeleton />
            </div>
          </div>
          <hr />
          <!-- Modal footer -->
          <div class="p-5"></div>
        </div>
      </div>
    </div>
   </modal>
</template>

<style scoped> /* GLOBAL COMPONENTS USED: NONE */ </style>