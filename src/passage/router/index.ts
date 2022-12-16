import { createRouter, createWebHistory, RouterView } from 'vue-router'
import menuVue from '../views/menu.vue';

import scrollVue from '../views/scroll.vue';
import message2 from '../views/message2.vue';
import source2 from '../views/source2.vue'
import teacher2 from '../views/teacher2.vue';
import course2 from '../views/course2.vue';

// import StudentHome from '../views/Login and Register views/StudentHome.vue'
// import StudentLogin from '../views/Login and Register views/StudentLogin.vue'
// import StudentRegister from '../views/Login and Register views/StudentRegister.vue'
// import Team from '../views/Login and Register views/Team.vue'
// import TeacherRegister from '../views/Login and Register views/TeacherRegister.vue'
// import TeacherLogin from '../views/Login and Register views/TeacherLogin.vue'
// import Start from '../views/Login and Register views/Start.vue'
// import TeacherHome from '../views/Login and Register views/TeacherHome.vue'

const routes = [
  {
  path:"/",
  name:"scroll",
  component:scrollVue,
  
},

// {
//   path: '/Start',
//   name: 'Start',
//   component: Start
// },
// {
//   path: '/Student/Login',
//   name: 'StudentLogin',
//   component: StudentLogin
// },
// {
//   path: '/Student/Register',
//   name: 'StudentRegister',
//   component: StudentRegister
// },
// {
//   path: '/Teacher/Register',
//   name: 'TeacherRegister',
//   component: TeacherRegister
// },
// {
//   path: '/Teacher/Login',
//   name: 'TeacherLogin',
//   component: TeacherLogin
// },
// {
//   path: '/Home/StudentHome',
//   name: 'StudentHome',
//   component: StudentHome
// },
// {
//   path: '/Home/TeacherHome',
//   name: 'TeacherHome',
//   component: TeacherHome
// },
// {
//   path: '/Student/Team',
//   name: 'Team',
//   component: Team
// },

{
  name: 'message2',
  path: '/message2',
  component: message2
},

{
  name: 'source2',
  path: '/source2',
  component: source2
},
{
  name: 'course2',
  path: '/course2',
  component: course2
},

{
  name: 'teacher2',
  path: '/teacher2',
  component: teacher2
},

  
]



const router = createRouter({
  history: createWebHistory(),
  routes
 
})

export default router
