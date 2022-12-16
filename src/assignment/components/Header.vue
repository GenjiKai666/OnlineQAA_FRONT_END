<template>
  <div style=" display: flex">
    <div style="flex: 1; font-size: 20px">
      <!-- <span :class="lcon" style="cursor: pointer" @click="collapse"></span> -->
      <!-- TODO 迁移遗留 -->
    </div>
    <el-dropdown style="width: 70px; cursor: pointer; line-height: 60px">
      <span>王小虎</span>
      <el-icon style="margin-left: 5px"><el-icon-arrow-down /></el-icon>
      <template #dropdown>
      <el-dropdown-menu >
        <el-dropdown-item>个人信息</el-dropdown-item>
        <el-dropdown-item>退出</el-dropdown-item>
        <el-dropdown-item>删除</el-dropdown-item>
      </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">

export default {

  name: 'Header',
  props: {
    //props: 有什么变量就要写到这里，并且该变量是什么类型就写什么类型
    lcon: String,
    collapse: Function,
  },
}
</script>

<style scoped></style>
