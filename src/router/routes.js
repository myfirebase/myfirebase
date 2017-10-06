// Routes
import Landing from '@/components/Landing'
import Welcome from '@/components/Welcome'
import Login from '@/components/auth/Login'
import UpdateProfile from '@/components/auth/UpdateProfile'
import App from '@/components/App'
import NotFound from '@/components/errors/404'

import Vue from 'vue'

const routes = [{
        path: '/',
        component: Landing,
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
                name: 'Main app',
                meta: {
                    auth: true
                }
            }
        ]
    },
    {
        path: '*',
        components: NotFound
    }
]


export default routes;