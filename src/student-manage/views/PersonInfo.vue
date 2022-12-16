<template>
  <div>
  </div>
  <div>
    <p>当前用户ID:{{ username }}</p>
    <p>当前用户学号:{{ studentId }}</p>
    <p>当前用户选课状态:{{ courseStatus }}</p>
    <el-button type="primary" @click="load">显示已选课程</el-button>
  </div>
  <div>
    <el-table
        :data="tableData"
        stripe
        :header-cell-class-name="headerBg"
    >
      <!--            这是一个表格多选代码-->
      <el-table-column prop="id" label="ID" width="50">
      </el-table-column>
      <el-table-column prop="name" label="课程名称">
      </el-table-column>
      <el-table-column prop="time" label="时间">
      </el-table-column>
      <el-table-column prop="teacherName" label="任课教师">
      </el-table-column>
      <el-table-column prop="description" label="课程描述">
      </el-table-column>
      <el-table-column prop="rate" label="课程评分">
      </el-table-column>
    </el-table>
  </div>
</template>


<script>
import axios from "@/localAxios";
export default {

  data() {
    return {
      tableData: [],
      id:null,
      username:null,
      studentId:null,
      courseStatus:null,
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
      this.request
          .get(
              '/user/getuserinfo',
          )
          .then((res) => {
            this.id = res.id;
            this.username = res.username;
            this.studentId = res.studentId;
            this.courseStatus = res.courseSelected;
          })
    },
    load() {
      //请求用户信息
      if(this.courseStatus === 1){
        this.request
            .get(
                '/course/getselectedcourses',
            )
            .then((res) => {
              console.log(res)
              this.tableData = res;
            })
      }
      else{
        alert("请选课后查询")
      }
    },
    handleSelect(e) {
      if(this.courses.includes(e.id) === false){
        this.courses.push(e.id)
      }
    },
    commit(){
      axios.post('http://localhost:8080/course/select',this.courses).then((response)=>{
        let data =response.data;
        alert(data)
      })
    },
  },
}
</script>

<style scoped></style>
