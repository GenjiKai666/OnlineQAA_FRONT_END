import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-plus'
import 'element-plus/dist/index.css'
import './assets/gloable.css'
import request from './utils/request'
// Vue.use(ElementUI, { size: 'mini' })
// Vue.config.productionTip = false
// Vue.prototype.request = request

// new Vue({
//   router,
//   render: (h) => h(App),
// }).$mount('#app')

const app = createApp(App);
app.config.globalProperties.request = request;
app.use(ElementUI, { size: 'mini'});
app.use(router);
app.mount('#app');
