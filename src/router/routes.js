// Routes
import Layout from '@/components/Layout'
import Welcome from '@/components/Welcome'
import Login from '@/components/auth/Login'
import UpdateProfile from '@/components/auth/UpdateProfile'
import App from '@/components/App'
import NotFound from '@/components/errors/404'
import Firestore from '@/components/Firestore'

import Vue from 'vue'

const routes = [{
    path: '/',
    component: Layout,
    children: [{
            path: '/',
            component: Welcome,
            name: 'Welcome'
        },
        {
            path: '/login',
            component: Login,
            name: 'login'
        },
        {
            path: '/update-profile',
            component: UpdateProfile,
            name: 'Profile Update',
            meta: {
                auth: true
            }
        },
        {
            path: '/app',
            component: App,
            name: 'Realtime Database',
            meta: {
                auth: true
            }
        },
        {
            path: '/firestore',
            component: Firestore,
            name: 'Cloud Firestore',
            meta: {
                auth: true
            }
        },
        {
            path: '*',
            component: NotFound
        }
    ]
}]


export default routes;
