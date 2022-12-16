<template>
  <div id="poster">
    <el-form
        :model="registerForm"
        ref="registerForm"
        :rules="rules"
        class="register_container"
        label-position="left"
        label-width="100px" >
      <h3 class="register_titile">
        学生注册
        <el-button @click="toLogin">去登陆界面</el-button>
      </h3>

      <el-form-item label="用户名:"  prop="username">
        <el-input
            type="text"
            v-model="registerForm.username"
            placeholder="请输入注册的用户名"
            prefix-icon="el-icon-user-solid"
        ></el-input>
      </el-form-item>

      <el-form-item label="学号:" prop="student_id">
        <el-input
            type="text"
            v-model="registerForm.student_id"
            autocomplete="off"
            placeholder="请输入学号"
            prefix-icon="el-icon-user-solid"></el-input>
      </el-form-item>

      <el-form-item label="密码:" prop="password">
        <el-input
            type="password"
            v-model="registerForm.password"
            autocomplete="off"
            placeholder="请输入注册密码"
            prefix-icon="el-icon-lock"></el-input>
      </el-form-item>


      <el-form-item>
        <el-button type="primary" style="width:100px;background:#505458;border:none" @click="submitForm" >注册</el-button>
        <el-button style="width:100px;border:none" @click="resetForm('registerForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from "@/localAxios";

export default {
  name: 'StudentRegister',
  data() {

    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      }
    };
    return {
      registerForm: {
        password: '',
        checkPass: '',
        username: '',

      },
      rules: {
        username:[
          {required:true,message:"请输入您的用户名",trigger:'blur'},
          {min:2,max:9,message:"长度2到9个字符",trigger:'blur'}
        ],
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
      }
    };
  },
  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    toLogin(){
      this.$router.push({path:'/Student/Login'})
    },
    submitForm(formName) {
      axios.post('http://localhost:8080/user/studentregister',this.registerForm).then((response)=>{
        console.log(response);
        console.log(response.data);
        let data =response.data;
        if(data === 1){
          this.registerForm = ''
          this.$message({
            message: '成功注册！请返回登陆页面登陆',
            type: 'success'
          });
          this.$router.push({path:'/Student/Login'})
        }
        else{
          this.$message.error('用户已存在！注册失败！');
        }
      })
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
.register_container{
  border-radius: 15px;
  background-clip:padding-box;
  margin: 90px auto;
  width: 350px;
  padding: 35px 35px 35px 15px;
  background: #fff;
  border: 1px #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
.register_titile{
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}
</style>