<template>
  <div>
    <p>当前选中课程:{{ courses }}</p>
    <el-button type="primary" @click="commit">提交</el-button>
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
      <el-table-column prop="teacher" label="任课教师">
      </el-table-column>
      <el-table-column prop="description" label="课程描述">
      </el-table-column>
      <el-table-column prop="rate" label="课程评分">
      </el-table-column>
      <el-table-column label="选择" >
        <template  #default="scope">
          <el-button type="success" @click="handleSelect(scope.row)"
          >选择<el-icon><el-icon-edit /></el-icon
          ></el-button>
        </template>
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
      courses:[],
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
    this.load()
  },
  methods: {
    load() {
      //请求用户信息
      this.request
          .get(
              '/course/getcourses',
          )
          .then((res) => {
            console.log(res)
            this.tableData = res;
          })
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
