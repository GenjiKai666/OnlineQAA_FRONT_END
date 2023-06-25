import { createRouter, createWebHistory, RouterView } from 'vue-router'

import StudentHome from '../views/StudentHome.vue'
import UserLogin from '../views/UserLogin.vue'
import UserRegister from '../views/UserRegister.vue'
import AdminLogin from '../views/AdminLogin.vue'
import Start from '../views/Start.vue'
import TeacherHome from '../views/TeacherHome.vue'
import Student_manage from '../../student-manage/views/Manage.vue'

const routes = [

{
  path: '/',
  name: 'Start',
  component: Start
},
{
  path: '/user/login',
  name: 'UserLogin',
  component: UserLogin
},
{
  path: '/user/register',
  name: 'UserRegister',
  component: UserRegister
},
{
  path: '/admin/login',
  name: 'AdminLogin',
  component: AdminLogin
},
{
  path: '/Home/StudentHome',
  name: 'StudentHome',
  component: StudentHome
},
{
  path: '/Home/TeacherHome',
  name: 'TeacherHome',
  component: TeacherHome
},
  {
    path: '/student_manage',
    name: 'sStudent_manage',
    component: Student_manage
  }

]



const router = createRouter({
  history: createWebHistory("/login"),
  routes
 
})

export default router
