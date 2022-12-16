import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Manage',
    component: () => import('../views/Manage.vue'),
    redirect: '/home', //只要路径是http://localhost:8080/ 就会重定向到home
    children: [
      //Manage里面的子路由 访问的路径是http://localhost:8080/user “/”是父路由,user是子路由
      {
        path: '/score',
        name: 'Score',
        component: () => import('../views/Score.vue'),
      },
      {
        path: 'home',
        name: 'Home',
        component: () => import('../views/Home.vue'),
      },
      {
        path: '/Analyse',
        name: '成绩分析',
        component: () => import('../views/Echarts.vue'),
      },
      {
        path: '/query-grade',
        component: () => import('../views/QueryGrade.vue')
      },
      {
        path: '/teachercheck',
        component: () => import('../views/Teacher.vue')
      },


    ],
  },
  {
    path: "/confirm-select-course",
    component: () => import("@/select-course/views/Teachers.vue")
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
  history: createWebHistory("/grade-manage"),
  routes,
})

export default router
