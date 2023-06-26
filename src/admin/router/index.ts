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
        path: '/facility',
        component: () => import('../views/FacilityManage.vue')
      },
      {
        path: '/user',
        component: () => import('../views/UserManage.vue')
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory("/admin"),
  routes,
})

export default router
