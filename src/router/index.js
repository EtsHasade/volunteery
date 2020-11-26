import Vue from 'vue';
import VueRouter from 'vue-router';
import homePage from '../views/home-page';
import volunteerApp from '../views/volunteer-app';
import volunteerEdit from '../views/volunteer-edit';
<<<<<<< HEAD
import login from '../views/login';
=======
import volunteerDetails from '../views/volunteer-details'
>>>>>>> 1b98f063b206279de50028fdce0022eee6a2734c

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
<<<<<<< HEAD
        path: '/login',
        name: 'login',
        component: login
    },

=======
        path: '/volunteer-details/:volunteerId',
        name: 'volunteerDetails',
        component: volunteerDetails
    },
>>>>>>> 1b98f063b206279de50028fdce0022eee6a2734c

]

const router = new VueRouter({
    routes
})

export default router