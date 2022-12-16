<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import menuVue from './views/menu.vue';
import scrollVue from './views/scroll.vue';
import messageVue from './views/message.vue';
</script>

<template>
  
   
      <el-header>
       
      <menuVue/>
      </el-header>
      <el-main>
        <router-view>
      </router-view>

      

      </el-main>
      <el-footer>
        <i><img src=.\assets\imagebox\footer.png /></i>
      </el-footer>
    
</template>

<style >
body{
  background: rgba(155, 214, 219, 0.014);

}
img{
    /*设置图片宽度和浏览器宽度一致*/
    width: 100%;
    height: inherit;
  }
</style>
