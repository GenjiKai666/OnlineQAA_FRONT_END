<template>
    <div id="banner">
      <!--动态将图片轮播图的容器高度设置成与图片一致-->
      <el-carousel :height="bannerHeight + 'px'" >
        <!--遍历图片地址,动态生成轮播图-->
        <el-carousel-item v-for="item in img_list" :key="item">
          <img :src="item" alt="">
        </el-carousel-item>
      </el-carousel>
    </div><br/>
    <div id="message">
      <Message />
    </div><br/>
    <div id="source">
      <sourceVue />
    </div><br/>
    <div>


    </div>
    
</template>
 
<script lang="ts">
import Message from './message.vue';
import sourceVue from './source.vue';
import courseVue from './course.vue';

    export default {
    name: "Banner",
    data() {
        return {
            // 图片地址数组
            img_list: [
                "passage/assets/imagebox/1.png",
                "passage/assets/imagebox/2.png",
                "passage/assets/imagebox/3.png",
                "passage/assets/imagebox/4.png",
            ],
            // 图片父容器高度
            bannerHeight: 1000,
            // 浏览器宽度
            screenWidth: 0,
        };
    },
    methods: {
        setSize: function () {
            // 通过浏览器宽度(图片宽度)计算高度
            this.bannerHeight = 600 / 1920 * this.screenWidth;
        },
    },
    mounted() {
        // 首次加载时,需要调用一次
        this.screenWidth = window.innerWidth;
        this.setSize();
        // 窗口大小发生改变时,调用一次
        window.onresize = () => {
            this.screenWidth = window.innerWidth;
            this.setSize();
        };
    },
    components: { Message ,sourceVue,courseVue}
    
}
</script>
 
<style scoped>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }
 
  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }
 
  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }
  img{
    /*设置图片宽度和浏览器宽度一致*/
    width: 100%;
    height: inherit;
  }
  .el-card{
  width: 100%;
  height: inherit;
}

  
</style>