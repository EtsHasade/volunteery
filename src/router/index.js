import Vue from 'vue';
import VueRouter from 'vue-router';
import homePage from '../views/home-page';
import volunteerApp from '../views/volunteer-app';
import orgApp from '../views/org-app';
import orgCreate from '../views/org-create';
import volunteerEdit from '../views/volunteer-edit';
import login from '../views/login';
import volunteerDetails from '../views/volunteer-details'

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
        path: '/org-app',
        name: 'orgApp',
        component: orgApp
    },
    {
        path: '/org-create',
        name: 'orgCreate',
        component: orgCreate
    },
    {
        path: '/volunteer-edit/:_id?',
        name: 'volunteerEdit',
        component: volunteerEdit
    },
    {
        path: '/login',
        name: 'login',
        component: login
    },
    {
        path: '/volunteer-details/:volunteerId',
        name: 'volunteerDetails',
        component: volunteerDetails
    },

]

const router = new VueRouter({
    routes
})

export default router