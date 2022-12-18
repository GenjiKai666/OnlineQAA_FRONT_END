<template>
    <div id="poster">
        <el-form class="login_container" label-position="left" label-width="80px">
            <h3 class="login_titile">
                老师登陆
            </h3>
            <el-form-item label="用户名"  >
                <el-input type="text" v-model="loginForm.username" placeholder="用户名"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input type="password" v-model="loginForm.password" placeholder="密码"></el-input>
            </el-form-item>
            <el-button type="primary" style="width:100%;background:#505458;border:none" @click="Login">登陆</el-button>
        </el-form>
    </div>
</template>
<script>

import axios from "@/localAxios";

export default {
    name:'TeacherLogin',
    data() {
      return {
        loginForm: {
          username: '',
          password:''
        }
      }
    },
    methods: {
      Login() {
        // console.log('submit!',this.loginForm);
        axios.post('http://localhost:8080/user/teacherlogin',this.loginForm).then((response)=>{
          console.log(response)
          let data =response.data;
          if(data === 1){
            this.loginForm = ''
            this.$message({
              message: '成功登陆！',
              type: 'success'
            });
            window.location.href="/teacher/"
          }else{
            this.$message.error('用户名或密码错误！登录失败！');
          }
        }).catch(err=>{
          console.log('AAA')
          console.log(err)
        })
      },
      toRegister(){
        this.$router.push({path:'/Teacher/Register'})
      },
    }
}
</script>

<style >
    #poster{
        background-position: center;
        height: 100%;
        width: 100%;
        background-size: cover;
        position: fixed;
    }
    .login_container{
        border-radius: 15px;
        background-clip:padding-box;
        margin: 90px auto;
        width: 350px;
        padding: 35px 35px 35px 15px;
        background: #fff;
        border: 1px #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
    }
    .login_titile{
        margin: 0px auto 40px auto;
        text-align: center;
        color: #505458;
    }
</style>
