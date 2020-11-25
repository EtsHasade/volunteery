import Vue from 'vue';
import VueRouter from 'vue-router';
import homePage from '../views/home-page';
import volunteerApp from '../views/volunteer-app';
import volunteerEdit from '../views/volunteer-edit';
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
        path: '/volunteer-edit',
        name: 'volunteerEdit',
        component: volunteerEdit
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