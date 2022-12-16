import { createRouter, createWebHistory, RouterView } from 'vue-router'

import StudentHome from '../views/StudentHome.vue'
import StudentLogin from '../views/StudentLogin.vue'
import StudentRegister from '../views/StudentRegister.vue'
import Team from '../views/Team.vue'
import TeacherLogin from '../views/TeacherLogin.vue'
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
  path: '/Student/Login',
  name: 'StudentLogin',
  component: StudentLogin
},
{
  path: '/Student/Register',
  name: 'StudentRegister',
  component: StudentRegister
},
{
  path: '/Teacher/Login',
  name: 'TeacherLogin',
  component: TeacherLogin
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
  path: '/Student/Team',
  name: 'Team',
  component: Team
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
