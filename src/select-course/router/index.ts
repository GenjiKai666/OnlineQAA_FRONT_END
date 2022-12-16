import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Manage',
    component: () => import('../views/Manage.vue'),
    redirect: '/studentsone',
    children: [
      //Manage里面的子路由 访问的路径是http://localhost:8080/user “/”是父路由,user是子路由
      
      
      {
        path: 'studentsone',
        name: 'StudentsOne',
        component: () => import('../views/StudentsOne.vue'),
      },

      {
        path: '/studentstwo',
        name: 'StudentsTwo',
        component: () => import('../views/StudentsTwo.vue'),
      },
      {
        path: '/studentsthree',
        name: 'StudentsThree',
        component: () => import('../views/StudentsThree.vue'),
      },

      {
        path: '/studentsfour',
        name: 'StudentsFour',
        component: () => import('../views/StudentsFour.vue'),
      },

      {
        path: '/studentsfive',
        name: 'StudentsFive',
        component: () => import('../views/StudentsFive.vue'),
      },
    ],
  },

  {
    path: '/teachers',
    name: 'Teachers',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Teachers.vue'),
  },
 
]

const router = createRouter({
    // 因为在没有后端配合的情况下路由模式为history，页面不会重新加载，应该改为hash模式
  history: createWebHashHistory("/select-course"),
  routes,
})

export default router
