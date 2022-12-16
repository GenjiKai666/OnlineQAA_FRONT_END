import { createApp } from "vue";
import App from "./App.vue";
import ElementPlus from 'element-plus';
import router from './router'
import 'element-plus/theme-chalk/index.css';
import './assets/gloable.css'
import request from "./utils/request";
import axios from "@/localAxios";
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import './font/font.css'
import locale from 'element-plus/lib/locale/lang/zh-cn'

const app=createApp(App);
app.use(scroll).use(ElementPlus, { locale ,size:""})
app.use(router);
app.config.globalProperties.$axios=axios;
app.config.globalProperties.request=request
app.mount("#app");

