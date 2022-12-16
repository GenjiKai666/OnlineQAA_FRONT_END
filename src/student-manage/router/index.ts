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
        path: '/personinfo',
        name: 'Personinfo',
        component: () => import('../views/PersonInfo.vue'),
      },
      {
        path: '/select-course',
        name: 'Select-Course',
        component: () => import('../views/SelectCourse.vue'),
      },
      {
        path: '/show-course-questions',
        name: 'Show-Course-Questions',
        component: () => import('../views/ShowCourseQuestions.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory("/student-manage"),
  routes,
})

export default router
