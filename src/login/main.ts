import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'element-plus/dist/index.css'
import ElementPlus from "element-plus";
// Vue.use(ElementUI, { size: 'mini' })
// Vue.config.productionTip = false
// Vue.prototype.request = request

// new Vue({
//   router,
//   render: (h) => h(App),
// }).$mount('#app')

const app = createApp(App);
app.use(router);
app.use(ElementPlus, { size: 'small', zIndex: 3000 })
app.mount('#app');
