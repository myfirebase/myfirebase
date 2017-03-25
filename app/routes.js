const routes = [{
    path: '/',
    component: require('../components/Landing.vue'),
    children: [{
        path: '/',
        component: require('../components/Welcome.vue'),
        name: 'Welcome'
    }, {
        path: '/login',
        component: require('../components/Login.vue'),
        name: 'login'
    }, {
        path: '/update-profile',
        component: require('../components/UpdateProfile.vue'),
        name: 'Profile Update'
    }, {
        path: '/app',
        component: require('../components/App.vue'),
        name: 'Main app'
    }]
}, {
    path: '*',
    components: require('../components/errors/404.vue')
}]


export default routes;