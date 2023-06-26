<template>
  <div style=" display: flex">
    <div style="flex: 1; font-size: 20px">
      <!-- <span :class="lcon" style="cursor: pointer" @click="collapse"></span> -->
      <!-- TODO 迁移遗留 -->
    </div>
    <div @click="logout">
      退出
    </div>
  </div>
</template>

<script lang="ts">
import axios from '@/localAxios';


export default {

  name: 'Header',
  props: {
    //props: 有什么变量就要写到这里，并且该变量是什么类型就写什么类型
    lcon: String,
    collapse: Function,
  },
  methods:{
    logout(){
      axios.get("http://localhost:8080/logout");
      window.location.href="/";
    }
  }
}
</script>

<style scoped></style>
