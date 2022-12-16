<template>
  <div>
    </div>
    <div>
      <p>当前选择作业序号:{{ certainAssignmentID }}</p>
      <p>当前用户ID:{{ id }}</p>
      <p>当前是否老师:{{ teacher }}</p>
      <el-button type="primary" @click="load">确定</el-button>
    </div>
    <div style="padding: 10px 0">
      <el-input
          style="width: 500px"
          class="ml-5"
          :suffix-icon="ElIconSearch"
          placeholder="请输入答案"
          v-model="certainAnswer"
      ></el-input>
      <!--            <el-input style="width: 200px" class="ml-5"  suffix-icon="el-icon-message" placeholder="请输入邮箱"></el-input>-->
      <!--            <el-input style="width: 200px" class="ml-5"  suffix-icon="el-icon-map-location" placeholder="请输入地址"></el-input>-->
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
      <el-table-column prop="question" label="题干">
      </el-table-column>
      <el-table-column prop="deadline" label="截止时间">
      </el-table-column>
      <el-table-column prop="deadline_time" label="截止时间">
      </el-table-column>
      <el-table-column prop="score" label="分数" width="100">
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

export default {

  data() {
    return {
      tableData: [],
      id:null,
      teacher:null,
      certainAssignmentID:null,
      currentTime:null,
      certainAnswer:null,
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
    this.loaduser()
  },
  methods: {
    loaduser(){
      this.request
          .get(
              '/assignment/getuserinfo',
          )
          .then((res) => {
            console.log(res)
            this.id = res.id;
            this.teacher = res.teacher;
          })
    },
    load() {
      //请求用户信息
      if(this.teacher == 0){
        this.request
            .get(
                '/assignment/getassignmentbystudentid',
                {
                  params: {
                    studentid:this.id
                  },
                }
            )
            .then((res) => {
              console.log(res)
              this.tableData = res;
            })
      }
      else{
        alert("不是学生或未登陆，请重试")
      }
    },
    handleSelect(e) {
      //打开提示框
      this.currentTime = new Date().getTime();
      if(e.score != null){
        alert('作业已批改,无法选中')
      }
      else if(e.deadline_time < this.currentTime){
        alert('已过截止时间，无法选中')
      }
      else{
        this.certainAssignmentID = e.id
      }
    },
    commit(){
      if(this.certainAssignmentID == null){
        alert('请选中作业')
      }
      else{
        this.request
            .get(
                '/assignment/student_submit',
                {
                  params: {
                    assignmentid:this.certainAssignmentID,
                    studentid:this.id,
                    answer:this.certainAnswer
                  },
                }
            )
            .then((res) => {
              console.log(res)
            })
      }
      this.load()
    },
  },
}
</script>

<style scoped></style>
