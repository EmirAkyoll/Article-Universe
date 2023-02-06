import { createRouter, createWebHashHistory } from "vue-router";
import { routes } from "./routes";
import store from "../store/index";

const router = createRouter({
  routes,
  history: createWebHashHistory(),
}); 

router.beforeEach((to, from, next) => {
    const authRequiredRoutes = ['Home', 'Articles', 'Account'];
    const authNotRequiredRoutes = ['Login', 'Register'];
    const isAuthenticated = store.getters.isAuthenticated;
  
    if (authNotRequiredRoutes.indexOf(to.name) > -1 && isAuthenticated) next({name: "Login"});
  
    if (authRequiredRoutes.indexOf(to.name) > -1) {
      if (isAuthenticated) next();
      else next({ name: "Login" });
    } 
    else {
      next();
    }
})

export default router;