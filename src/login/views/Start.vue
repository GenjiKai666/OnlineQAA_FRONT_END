<template>
    <div id="poster">
        <el-form class="login_container" label-position="left" label-width="80px">
            <h3 class="login_titile">
                欢迎
            </h3>
            <el-button @click="toTeacher">教师登陆</el-button>
            <el-button @click="toStudent">学生登陆</el-button>
          <el-button @click="back">返回</el-button>
        </el-form>
    </div>
</template>

<script>

export default {
    name:'Start',
    data() {
      return {
        
      }
    },
    methods: {
      toStudent(){
        this.$router.push({path:'/Student/Login'})
      },
      toTeacher(){
        this.$router.push({path:'/Teacher/Login'})
      },
      back(){
        window.location.href="/"
      }
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