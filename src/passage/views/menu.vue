<template>
  <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :ellipsis="false"
    @select="handleSelect">
    <i><img src="..\assets\imagebox\logo.png" style="height: 50px;" /></i>
    <div class="flex-grow" />

    <RouterLink to="/">
      <el-menu-item>首页</el-menu-item>
    </RouterLink>

    <RouterLink to="/message2">
      <el-menu-item>通知公告</el-menu-item>
    </RouterLink>

    <RouterLink to="/source2">
      <el-menu-item>资源中心</el-menu-item>
    </RouterLink>

    <RouterLink to="/course2">
      <el-menu-item>课程中心</el-menu-item>
    </RouterLink>

    <RouterLink to="/teacher2">
      <el-menu-item>名师风采</el-menu-item>
    </RouterLink>

    <!--  <a herf="http://localhost:5173/login/" style="width: 50px">-->

    <el-menu-item @click="toJump1">教务系统</el-menu-item>

    <!--  </a>-->



  </el-menu>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import HomeViewVue from './message2.vue';
import axios from "@/localAxios";
const activeIndex = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
function toJump1() {
  axios.get("http://localhost:8080/user/getuserinfo").then((res) => {
    console.log('AAAAAAA')
    console.log(res)
    if (res.data.id == null) {
      window.location.href = "http://localhost:5173/login/"
    } else if (res.data.teacher == 1) {
      window.location.href = "http://localhost:5173/grade-manage/"
    } else if (res.data.teacher == 0) {
      window.location.href = "http://localhost:5173/student-manage/"
    }

  }).catch(err=>{
    alert(err);
  })
}
</script>

<style>
.flex-grow {
  flex-grow: 1;
}
</style>
