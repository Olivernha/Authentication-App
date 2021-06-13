import {createRouter, createWebHistory} from 'vue-router'
import Home from '../views/Home.vue'
import 'nprogress/nprogress.css';
import NProgress from 'nprogress/nprogress';
import store from '../store'
// import auth from "../store/auth";
import EditProfile from "../views/EditProfile";

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
        meta: {
            requiresAuth: true
        },
        beforeEnter() {
            NProgress.start();
        },
    },
    {
        path: '/edit-profile/',
        name: 'editProfile',
        component: EditProfile,
        meta: {
            requiresAuth: true
        },
        beforeEnter() {
            NProgress.start();
        },
    },
    {
        path: '/register',
        name: 'register',
        meta: {
            guest: true
        },
        beforeEnter() {
            NProgress.start();
        },
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/Auth/Register.vue')
    },
    {
        path: '/login',
        name: 'login',

        meta: {
            guest: true
        },
        beforeEnter() {
            NProgress.start();
        },
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/Auth/Login.vue')
    },
    {
        path: '/forgot-password',
        name: 'forgot-password',
        meta: {
            guest: true
        },
        beforeEnter() {
            NProgress.start();
        },
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/Auth/Login.vue'),
    },
    {
        path: '/authorize/github/callback',
        name: 'loginGithub',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "loginGithub" */ '../components/LoginWithGithub.vue'),
     
    },

]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {
    // if (to.matched.some(record => record.meta.requiresAuth)) {
    //
    //     if (store.getters['auth/isAuthenticated']) {
    //         next();
    //
    //     }else{
    //         next({
    //             path: '/login',
    //         })
    //     }
    // }
    // else if(to.matched.some(record => record.meta.guest)) {
    //     if(!store.getters['auth/isAuthenticated']){
    //         next()
    //     }
    //     else{
    //         next({ name: 'home'})
    //     }
    // }else {
    //     next()
    // }

    if (to.meta.requiresAuth && !store.getters['auth/isAuthenticated']){
        return next('/login');
    }else if(to.meta.guest && store.getters['auth/isAuthenticated'] ){
       return next('/');
    }
    else{
        next();
    }

});

router.afterEach(() => {
    NProgress.done()
})
export default router;