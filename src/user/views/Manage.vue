<template>
  <div >
    <el-container style="height:100vh">
      <el-aside :width="sideWidth +'px'" style="box-shadow: 2px 0 6px rgb(0,21,41,35%);">
        <!--        要将Aside的变量导入-->
        <Aside :isCollapse="isCollapse" :logotextshow="logotextshow" />
      </el-aside>
      <el-container>
        <el-header style="font-size: 12px;border-bottom: 1px solid #ccc;">
          <!--      将Header引入-->
          <Header :lcon="lcon" :collapse="collapse"/>
        </el-header>

        <el-main>
          <!--           主体内容  表示当前页面的子路由会在router-view展示 相当于index.js里面的childrean-->
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style>
.el-header {
  /*background-color: #B3C0D1;*/
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
.headerBg{
  background:#cccccc!important


}
</style>

<script>
import Aside from "@/user/components/Aside.vue";
import Header from "@/admin/components/Header.vue";
export default {
  components: {
    Aside,
    Header
  },
  data() {
    return {

      lcon: 'el-icon-s-fold',             //隐藏和显示的图标
      isCollapse: false,                  //隐藏显示的逻辑转换
      logotextshow: true,
      sideWidth: 200,

    }
  },
  comments:{                           //comments是object，然后导入Aside
    Aside,
    Header
  },
  methods: {
    collapse: function () {
      this.isCollapse = !this.isCollapse
      this.logotextshow = !this.logotextshow
      if(this.isCollapse) {
        this.sideWidth = 64
        this.lcon = 'el-icon-s-unfold'
      }else{
        this.sideWidth = 200
        this.lcon = 'el-icon-s-fold'
      }
    },

  }

}
</script>
