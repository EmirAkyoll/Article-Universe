export const routes = [
    
    {
        name: "Login",
        path: "/login",
        component: () => import("../views/pages/Login.vue")
    },
    {
        name: "Register",
        path: "/register",
        component: () => import("../views/pages/Register.vue")
    },
    {
        name: "Home",
        path: "/",
        component: () => import("../views/layouts/Home.vue")
    },
    {
        name: "Articles",
        path: "/articles",
        component: () => import("../views/layouts/Articles.vue")
    },
    {
        name: "Account",
        path: "/account",
        component: () => import("../views/layouts/Account.vue"),
    },
    {
        path: "/:wrongPath(.*)*",
        component: () => import("../views/pages/Error404.vue"),
    }

];