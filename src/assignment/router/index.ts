import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Manage',
        component: () => import('../views/Manage.vue'),
        // redirect: '/home', //只要路径是http://localhost:8080/ 就会重定向到home
        children: [
            //Manage里面的子路由 访问的路径是http://localhost:8080/user “/”是父路由,user是子路由
            {
                path: '/teacher',
                name: 'Teacher',
                component: () => import('../views/Teacher.vue'),
            },
            {
                path: '/student',
                name: 'Student',
                component: () => import('../views/Student.vue'),
            },
        ],
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "about" */ '../views/About.vue'),
    },
    // {
    //   path: '/Analyse',
    //   name: '成绩分析',
    //   component: () => import('../views/Echarts.vue'),
    // },
]

const router = createRouter({
    history: createWebHistory("/assignment"),
    routes,
})

export default router
