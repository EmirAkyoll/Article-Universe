import { createStore } from 'vuex';
import { API_KEY } from '../utilities/apiKey';

const store = createStore({

  state: {
    articles: [],
    readArticles: [],
    favoriteArticles: [],
    user: null,
    tabText: '',
    loading: false,
    whichFolder: 'Flight',
    whichView: 'Home',
    whichModal: 'none',
    openDarkMode: true,
    isRegistered: false,
    openWarningBox: false,
    homeSubHeaderTextChange: false,
    noArticleWarning: '',
    isThereAnArticle: true,
    isArticlesAreLoaded: false,  
  },

  getters: {
    isAuthenticated: state => state.user != null,
  },

  mutations: {
    SET_STATE(state, payload) {             
      for (const [targetValue, newValue] of Object.entries(payload)) {
        state[targetValue] = newValue;
      }
    }
  },

  actions: {
    async getArticles({ commit }, payload) {
      commit('SET_STATE', { isArticlesAreLoaded: true })
      commit('SET_STATE', { isThereAnArticle: true })
      
      const response = await fetch(`https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=news_desk:("${payload}")&api-key=${API_KEY}`)
      const data = await response.json(); 
      console.log(data.response.docs)
      if (data.response.docs[0] != null) {
        commit('SET_STATE', { articles: data.response })
      } else {
        commit('SET_STATE', { isThereAnArticle: false })
      }
      
      commit('SET_STATE', { isArticlesAreLoaded: false })
    },
  }

}); export default store;