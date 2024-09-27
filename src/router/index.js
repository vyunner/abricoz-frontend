import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView,
        children: [
            {
                path: 'user/get-users-with-roles',
                name: 'user/get-users-with-roles',
                component: () => import('@/views/User/UserGetUsersWithRolesView.vue'),
            },
            {
                path: 'user/set-roles',
                name: 'user/set-roles',
                component: () => import('@/views/User/UserSetRolesView.vue'),
            },
        ]
    },
    {
        path: '/auth',
        name: 'auth',
        component: () => import('@/views/AuthView.vue'),
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router