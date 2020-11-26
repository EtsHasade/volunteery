import Vue from 'vue';
import VueRouter from 'vue-router';
import homePage from '../views/home-page';
import volunteerApp from '../views/volunteer-app';
import volunteerEdit from '../views/volunteer-edit';
import login from '../views/login';

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: homePage
    },
    {
        path: '/volunteer-app',
        name: 'volunteerApp',
        component: volunteerApp
    },
    {
        path: '/volunteer-edit',
        name: 'volunteerEdit',
        component: volunteerEdit
    },
    {
        path: '/login',
        name: 'login',
        component: login
    },


]

const router = new VueRouter({
    routes
})

export default router