<template>
  <el-menu :default-openeds="['1', '3']" style="min-height: 100%" background-color="rgb(48,65,86)" text-color="#fff"
    active-text-color="#ffd04b" :collapse="isCollapse" :collapse-transition="false" router>
    <div style="height: 50px; line-height: 60px; text-align: center">
      <img src="../assets/logo.png" alt="" style="width: 20px; position: relative; top: 5px; margin-right: 5px" />
      <b style="color: wheat" v-show="logotextshow">成绩管理系统</b>
    </div>
    <!--      跳转到主页 index是跳转到路由配置好的地址-->

    <el-menu-item-group>
      <el-menu-item index="confirm-select-course">
        <el-icon><el-icon-menu /></el-icon>
        <span slot="title">确认选课</span>
      </el-menu-item>
    </el-menu-item-group>

    <!-- TODO 迁移遗留问题 -->
    <el-menu-item-group>
      <el-menu-item index="teachercheck">
        <el-icon><el-icon-menu /></el-icon>
        <span slot="title">作业打分</span>
      </el-menu-item>
    </el-menu-item-group>

    <!--    跳转到成绩管理-->
    <el-menu-item-group>
      <el-menu-item index="./score">
        <el-icon><el-icon-menu /></el-icon>
        <span slot="title">成绩管理</span>
      </el-menu-item>
    </el-menu-item-group>


    <el-menu-item-group>
      <el-menu-item index="./Analyse">
        <el-icon><el-icon-menu /></el-icon>
        <span slot="title">成绩分析</span>
      </el-menu-item>
    </el-menu-item-group>
    
    <!-- 成绩预警和成绩通知嵌合在成绩查询中 -->
    <el-menu-item-group>
      <el-menu-item index="./query-grade">
        <el-icon><el-icon-warning /></el-icon>
        <span slot="title">成绩预警</span>
      </el-menu-item>
    </el-menu-item-group>
  </el-menu>
</template>

<script lang="ts">

export default {

  name: 'Aside',
  props: {
    isCollapse: Boolean,
    logotextshow: Boolean, //控制文字是否显示
  },
}
</script>
