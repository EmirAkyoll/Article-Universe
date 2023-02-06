<script setup>
import { computed, inject, onMounted, reactive, ref } from 'vue';
import { useStore } from 'vuex';
import { uniqBy } from "lodash";

const Axios = inject('Axios');
const store = useStore();

let openInfoBox = ref(false);
let infoBoxMessage = ref('');
let articleIndex = ref(null);

const articleData = reactive({
  ID: '',
  FolderName: '',
  Header: '',
  Snippet: '',
  Author: '',
  URL: '',
})

const Articles = computed(() => {
  let _articles = [];
  switch (store.state.whichModal) {
    case 'public': _articles = store.state.articles?.docs;  break;
    case 'read': _articles = store.state.user?.read;  break;
    case 'favorites': _articles = store.state.user?.favorites;  break;
    default: _articles = []; break;
  }
  return _articles;
})

function MarkAsRead(articleId, articleUrl) {
  articleData.ID = articleId;
  articleData.FolderName = '/ ' + store.state.whichFolder;
  articleData.Header = document.getElementById('collapse-header-' + store.state.whichFolder + articleIndex.value).textContent;
  articleData.Snippet = document.getElementById('collapse-snippet-' + store.state.whichFolder + articleIndex.value).textContent;
  articleData.Author = document.getElementById('collapse-author-' + store.state.whichFolder + articleIndex.value).textContent;
  articleData.URL = articleUrl;

  store.state.readArticles.push({ ...articleData });

  Axios.patch(`/users/${store.state.user.id}`, { read: store.state.readArticles })
        .then(sessionStorage.setItem('user', JSON.stringify(store.state.user)))
          .then(openInfoBox.value = true)
           .then(setTimeout(() => {
             openInfoBox.value = false;
           }, 1200))
            .catch(error => console.log(error))
}

function UnmarkAsRead(articleId) {
  store.state.readArticles = store.state.user.read.filter((article) => article.ID != articleId );
  store.state.user.read = store.state.readArticles;

  Axios.patch(`/users/${store.state.user.id}`, { read: store.state.readArticles })
        .then(sessionStorage.setItem('user', JSON.stringify(store.state.user)))
          .then(openInfoBox.value = true)
           .then(setTimeout(() => {
             openInfoBox.value = false;
           }, 1200))
            .catch(error => console.log(error))
}

function AddToFavorites(articleId, articleUrl) {
  articleData.ID = articleId;
  articleData.FolderName = '/ ' + store.state.whichFolder;
  articleData.Header = document.getElementById('collapse-header-' + store.state.whichFolder + articleIndex.value).textContent;
  articleData.Snippet = document.getElementById('collapse-snippet-' + store.state.whichFolder + articleIndex.value).textContent;
  articleData.Author = document.getElementById('collapse-author-' + store.state.whichFolder + articleIndex.value).textContent;
  articleData.URL = articleUrl;

  store.state.favoriteArticles.push({ ...articleData });

  Axios.patch(`/users/${store.state.user.id}`, { favorites: store.state.favoriteArticles })
        .then(sessionStorage.setItem('user', JSON.stringify(store.state.user)))
          .then(openInfoBox.value = true)
           .then(setTimeout(() => {
             openInfoBox.value = false;
           }, 1200))
            .catch(error => console.log(error))
}

function RemoveFromFavorites(articleId){
  store.state.favoriteArticles = store.state.user.favorites.filter((article) => article.ID != articleId );
  store.state.user.favorites = store.state.favoriteArticles;

  Axios.patch(`/users/${store.state.user.id}`, { favorites: store.state.favoriteArticles })
        .then(sessionStorage.setItem('user', JSON.stringify(store.state.user)))
          .then(openInfoBox.value = true)
           .then(setTimeout(() => {
             openInfoBox.value = false;
           }, 1200))
            .catch(error => console.log(error))
}

onMounted(() => {
  store.state.user.read = uniqBy(store.state.user?.read, 'ID');
  store.state.user.favorites = uniqBy(store.state.user?.favorites, 'ID');
  sessionStorage.setItem('user', JSON.stringify(store.state.user))
  const User = JSON.parse(sessionStorage.getItem('user'));
  store.commit('SET_STATE', { user: User });
  store.commit('SET_STATE', { readArticles: User?.read })
  store.commit('SET_STATE', { favoriteArticles: User?.favorites })
  store.commit('SET_STATE', { openWarningBox: false })
})
</script>

<template>
  <article v-if="store.state.isThereAnArticle" class="container-flex flex-column justify-content-center font-Roboto">

    <info-box class="flex justify-center">
      <div v-show="openInfoBox" class="flex justify-center items-center fixed top-20 ring-1 ring-slate-500 z-20 w-1/3 p-4 rounded-md bg-yellow-200 | onLaptop:w-1/3" role="alert">
        <p>{{ infoBoxMessage }}</p>
      </div>
    </info-box>

    <div v-for="(article, index) in Articles" :key="article" class="mx-auto mb-5 w-11/12 drop-shadow">
      <details class="bg-gray-100 duration-100 open:bg-slate-700 open:text-white ring-1 ring-slate-500">
        <!-- collapse header -->
        <summary @click="articleIndex = index" :id="'collapse-header-' + store.state.whichFolder + index" class="text-center bg-inherit px-5 py-3 text-lg cursor-pointer list-none open:text-black">
          <span v-show="store.state.whichModal == 'read' || store.state.whichModal == 'favorites'">{{ article.Header }}<p class="ml-10 inline font-bold">{{ article.FolderName }}</p></span>
          <span v-show="store.state.whichModal == 'public'">{{ article?.headline?.main }}</span>
        </summary>

        <!-- collapse body -->
        <div class=" bg-white px-5 py-3 text-sm font-light ">
          <div class="flex flex-col justify-between items-center mb-5 | onTablet:flex-row"> 
            <button 
                @click="MarkAsRead(article._id, article.web_url);
                        infoBoxMessage = $t('marked_as_read')" 
                v-show="store.state.whichModal == 'public'" 
                class="p-2 my-3 bg-white right-5 w-[200px] text-blue-900 rounded-lg border border-blue-900 hover:bg-blue-900 hover:text-white">
              {{ $t('mark_as_read') }}
            </button>
            <button
                @click="UnmarkAsRead(article.ID);
                        infoBoxMessage = $t('read_mark_removed')" 
                v-show="store.state.whichModal == 'read'" 
                class="bg-white right-5 w-[200px] text-slate-800 p-2 rounded-lg border border-slate-800 hover:bg-slate-800 hover:text-white">
              {{ $t('unmark_as_read') }}
            </button>

            <button 
                @click="AddToFavorites(article._id, article.web_url);
                        infoBoxMessage = $t('added_to_favorites')" 
                v-show="store.state.whichModal == 'public'" 
                class="p-2 my-3 bg-white right-5 w-[200px] text-green-900 rounded-lg border border-green-900 hover:bg-green-900 hover:text-white">
              {{ $t('add_to_favorites') }}
            </button>
            <button
                @click="RemoveFromFavorites(article.ID);
                        infoBoxMessage = $t('removed_from_favorites')" 
                v-show="store.state.whichModal == 'favorites'" 
                class="bg-white right-5 w-[200px] text-red-700 p-2 rounded-lg border border-red-700 hover:bg-red-700 hover:text-white">
              {{ $t('remove_from_favorites') }}
            </button>
          </div>

          <figure>
            <blockquote :id="'collapse-snippet-' + store.state.whichFolder + index"  class="text-xl mt-2">
              <p v-show="store.state.whichModal == 'read' || store.state.whichModal == 'favorites'" class="text-justify">{{ article.Snippet }}</p>
              <p v-show="store.state.whichModal == 'public'" class="text-justify">{{ article?.snippet || 'Summaryless article.' }}</p>
            </blockquote>
            
            <div class="flex flex-col justify-between items-center mt-7 | onTablet:flex-row">
              <figcaption :id="'collapse-author-' + store.state.whichFolder + index" class="text-base mt-2 mb-4">
                <p v-show="store.state.whichModal == 'read' || store.state.whichModal == 'favorites'" >{{ article.Author }}</p>
                <p v-show="store.state.whichModal == 'public'">— {{ article?.byline?.original || "Unknown" }}</p>
              </figcaption>

              <a v-show="store.state.whichModal == 'read' || store.state.whichModal == 'favorites'" :href="article.URL" target="_blank" class="button text-base text-white py-2 px-3 mb-3 rounded-md ring-2 ring-slate-500">{{ $t('link_for_full_article') }}</a>
              <a v-show="store.state.whichModal == 'public'" :href="article.web_url" target="_blank" class="button text-base text-white py-2 px-3 mb-3 rounded-md ring-2 ring-slate-500">{{ $t('link_for_full_article') }}</a>
            </div>
          </figure> 
          
        </div>
      </details>
    </div>
  </article>
  <div v-else class="text-center text-md font-Roboto">There is no articles.</div>
</template>

<style scoped>
 /* GLOBAL COMPONENTS USED: BUTTON | GO TO -TAILWIND.CSS- FILE FOR STYLES OF COMPONENTS */ 
details[open] blockquote,
details[open] figcaption{
 color: black;
}
</style>