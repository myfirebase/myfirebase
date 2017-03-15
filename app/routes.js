const routes = [{
    path: '/',
    component: require('../components/Landing.vue'),
    name: 'DefaultLayout'
}, {
    path: '/login',
    component: require('../components/Login.vue'),
    name: 'login'
}, {
    path: '/app',
    component: require('../components/App.vue'),
    name: 'Main app'
}, {
    path: '/update-profile',
    component: require('../components/UpdateProfile.vue'),
    name: 'Profile Update'
}, {
    path: '*',
    components: require('../components/errors/404.vue')
}]


export default routes;