<template>
    <div id="poster">
      <el-form 
      :model="TeamForm"
      ref="TeamForm"
      :rules="rules"
      class="team_container"
      label-position="left" 
      label-width="80px" >
        <h3 class="team_titile">
                组队
                <el-button @click="toLogin">返回上一级</el-button>
            </h3>

        <el-form-item label="组名:"  prop="groupName">
        <el-input 
          type="text"
          autocomplete="off"
          v-model="TeamForm.name"
          placeholder="请输入组长的用户名"
          prefix-icon="el-icon-user-solid"
          ></el-input>
        </el-form-item>
        <el-form-item label="组长:"  prop="headman">
        <el-input 
          type="text"
          autocomplete="off"
          v-model="TeamForm.headman"
          placeholder="请输入组长的用户名"
          prefix-icon="el-icon-user-solid"
          ></el-input>
       </el-form-item>    

        <el-form-item label="组员01:" prop="member01">
        <el-input 
        type="text"
        v-model="TeamForm.member01" 
        autocomplete="off"
        placeholder="请输入组员用户名"
        prefix-icon="el-icon-user-solid"></el-input>
      </el-form-item>

      <el-form-item label="组员02:" prop="member02">
        <el-input 
        type="text"
        v-model="TeamForm.member02" 
        autocomplete="off"
        placeholder="请输入组员用户名"
        prefix-icon="el-icon-user-solid"></el-input>
      </el-form-item>

      <el-form-item label="组员03:" prop="member03">
        <el-input 
        type="text"
        v-model="TeamForm.member03" 
        autocomplete="off"
        placeholder="请输入组员用户名"
        prefix-icon="el-icon-user-solid"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm" >组队</el-button>
        <el-button @click="resetForm('TeamForm')">重置</el-button>
      </el-form-item>
    </el-form>
    </div>
  </template>
  
  <script>
  import axios from "@/localAxios";

  export default {
    name: 'Team',
    data() {

      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'));
        } 
      };
    //   var validatePass2 = (rule, value, callback) => {
    //     if (value === '') {
    //       callback(new Error('请再次输入密码'));
    //     } else if (value !== this.registerForm.password) {
    //       callback(new Error('两次输入密码不一致!'));
    //     } else {
    //       callback();
    //     }
    //   };
      return {
        TeamForm: {
          name:'',
          headman:'',
          member01: '',
          member02: '',
          member03: '',
        },
        rules: {
          headman:[
            {required:true,message:"请输入组长的用户名",trigger:'blur'},
            // {min:2,max:9,message:"长度2到9个字符",trigger:'blur'}
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
        axios.post('http://localhost:8080/student/team',this.TeamForm).then((response)=>{
          console.log(response);
          console.log(response.data);
          let data =response.data;
          if(data.success){
            this.registerForm = ''
            this.$message({
              message: '成功组队！请返回登陆页面登陆！',
              type: 'success'
            });
            this.$router.push({path:'/Student/Login'})
          }
          else{
            this.$message.error('组队失败！成员已经注册或成员不存在！');
          }
        }).catch(err=>{
          this.$message.error('组队失败！成员已经注册或成员不存在！');
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
    .team_container{
        border-radius: 15px;
        background-clip:padding-box;
        margin: 90px auto;
        width: 350px;
        padding: 35px 35px 35px 15px;
        background: #fff;
        border: 1px #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
    }
    .team_titile{
        margin: 0px auto 40px auto;
        text-align: center;
        color: #505458;
    }
</style>