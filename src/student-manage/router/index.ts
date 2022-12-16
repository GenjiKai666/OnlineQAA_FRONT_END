import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Manage',
    component: () => import('../views/Manage.vue'),
    //只要路径是http://localhost:8080/ 就会重定向到home
    children: [
      //Manage里面的子路由 访问的路径是http://localhost:8080/user “/”是父路由,user是子路由
      {
        path: '/ShowGrade',
        name: 'Score',
        component: () => import('@/grade-manage/views/ShowGrade.vue'),
      },
      {
        path: '/studentSubmit',
        name: 'studentSubmit',
        component: () => import('../views/Student.vue'),
      },

    ],

  },
  {
    path: '/select-course',
    name: 'select-course',
    component: () => import('../../select-course/views/Manage.vue'),
    children: [
      //Manage里面的子路由 访问的路径是http://localhost:8080/user “/”是父路由,user是子路由


      {
        path: '/studentsone',
        name: 'StudentsOne',
        component: () => import('@/select-course/views/StudentsOne.vue'),
      },

      {
        path: '/studentstwo',
        name: 'StudentsTwo',
        component: () => import('@/select-course/views/StudentsTwo.vue'),
      },
      {
        path: '/studentsthree',
        name: 'StudentsThree',
        component: () => import('@/select-course/views/StudentsThree.vue'),
      },

      {
        path: '/studentsfour',
        name: 'StudentsFour',
        component: () => import('@/select-course/views/StudentsFour.vue'),
      },

      {
        path: '/studentsfive',
        name: 'StudentsFive',
        component: () => import('@/select-course/views/StudentsFive.vue'),
      },
    ]
  },


  // {
  //   path: '/Analyse',
  //   name: '成绩分析',
  //   component: () => import('../views/Echarts.vue'),
  // },
]

const router = createRouter({
  history: createWebHistory("/student-manage"),
  routes,
})

export default router
