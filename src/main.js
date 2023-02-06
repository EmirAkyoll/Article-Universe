import { createApp } from 'vue';
import App from './App.vue';
import './tailwind.css';
import store from './store/index.js';
import router from './router/index.js';
import i18n from "./translate/translate.js";
import Axios from './utilities/axios';
import appHeader from "./components/Shared/appHeader.vue";
import { defineAsyncComponent } from 'vue';

const app = createApp(App);
app.use(store);
app.use(router);
app.use(i18n);
app.component("AppHeader", appHeader); // No need to asynchronization for 'AppHeader' because it using everywhere.
app.component("AppNavigation", defineAsyncComponent(() => import('./components/Shared/appNavigation.vue')));
app.component("AppWarningBox", defineAsyncComponent(() => import('./components/Shared/AppWarningBox.vue')));
app.component("AppModal", defineAsyncComponent(() => import('./components/Shared/appModal.vue')));
app.provide('Axios', Axios);
app.mount('#app');