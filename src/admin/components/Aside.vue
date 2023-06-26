<template>
  <el-menu :default-openeds="['1', '3']" style="min-height: 100%" background-color="rgb(48,65,86)" text-color="#fff"
    active-text-color="#ffd04b" :collapse="isCollapse" :collapse-transition="false" router>
    <div style="height: 50px; line-height: 60px; text-align: center">
      <img src="../assets/logo.png" alt="" style="width: 20px; position: relative; top: 5px; margin-right: 5px" />
      <b style="color: wheat" v-show="logotextshow">管理员页面</b>
    </div>
    <!--      跳转到主页 index是跳转到路由配置好的地址-->

    <el-menu-item-group>
      <el-menu-item index="/facility">
        <el-icon><el-icon-menu /></el-icon>
        <span slot="title">设施管理</span>
      </el-menu-item>
      <el-menu-item index="/user">
        <el-icon><el-icon-menu /></el-icon>
        <span slot="title">用户管理</span>
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
