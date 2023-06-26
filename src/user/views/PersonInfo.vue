<template>
  <div class="demo-type">
    <div>
      <el-avatar> {{ username }} </el-avatar>
    </div>
  </div>
  <div>
    <p>用户名:{{ username }}</p>
    <p>信用分:{{ credit }}</p>
    <p>用户状态:{{ status_str }}</p>
  </div>
</template>


<script>
import axios from "@/localAxios";
import Cookies from 'js-cookie';
export default {

  data() {
    return {
      tableData: [],
      id:null,
      username:null,
      credit:null,
      status:null,
      status_str:null,
      form: {},
      //默认对话弹框不要展示
      dialogFormVisible: false,
      //隐藏和显示的图标
      lcon: 'el-icon-s-fold',
      //隐藏显示的逻辑转换
      isCollapse: false,
      logotextshow: true,
      sideWidth: 200,
      //表头样式
      headerBg: 'headerBg',
      // ElIconSearch,
      // ElIconInfo,
    }
  },

  created() {
    //加载的时候触发
    this.loadUser()
  },
  methods: {
    loadUser(){
      this.username = Cookies.get("username");
      this.token = Cookies.get("token");
      axios({
        method: "post",
        url: "http://localhost:8080/auth/user/info",
        params:{
          operator:this.username,
          token:this.token,
          type:"user",
          username:this.username
        }
      }).then((response) => {
            console.log(response.data)
            this.credit = response.data.data.credit;
            if(response.data.data.status == 0){
              this.status_str = "正常";
            }
            else {
              this.status_str = "已被封禁";
            }
          })
    },
  },
}
</script>

<style scoped>
* {
  text-align: center;
}
</style>
