<template>
  <div>
  </div>
  <div>
    <p>当前选择序号:{{ questionId }}</p>
    <p>当前用户ID:{{ id }}</p>
  </div>
  <div style="padding: 10px 0">
    <el-input
        style="width: 500px"
        class="ml-5"
        :suffix-icon="ElIconSearch"
        placeholder="请输入课程ID"
        v-model="courseId"
    ></el-input>
    <!--            <el-input style="width: 200px" class="ml-5"  suffix-icon="el-icon-message" placeholder="请输入邮箱"></el-input>-->
    <!--            <el-input style="width: 200px" class="ml-5"  suffix-icon="el-icon-map-location" placeholder="请输入地址"></el-input>-->
    <el-button type="primary" @click="load">确定</el-button>
  </div>
  <div style="padding: 10px 0">
    <el-input
        style="width: 500px"
        class="ml-5"
        :suffix-icon="ElIconSearch"
        placeholder="请输入回答"
        v-model="answer"
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
      <el-table-column prop="createTime" label="创建时间">
      </el-table-column>
      <el-table-column prop="answerTime" label="回答时间">
      </el-table-column>
      <el-table-column prop="info" label="问题详情">
      </el-table-column>
      <el-table-column prop="answer" label="回答">
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
      questionId:null,
      courseId:null,
      answer:null,
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
              '/user/getuserinfo',
          )
          .then((res) => {
            console.log(res)
            this.id = res.id;
          })
    },
    load() {
      //请求用户信息
      this.request
          .get(
              '/question/getquestionsbycourseid',
              {
                params: {
                  courseId:this.courseId
                },
              }
          )
          .then((res) => {
            console.log(res)
            this.tableData = res;
          })
    },
    handleSelect(e) {
      //打开提示框
      if(e.answer != null){
        alert('已回答,无法选中')
      }
      else{
        this.questionId = e.id
      }
    },
    commit(){
      if(this.questionId == null){
        alert('请选中问题')
      }
      else{
        this.request
            .get(
                '/question/answer',
                {
                  params: {
                    courseId:this.courseId,
                    questionId:this.questionId,
                    answer:this.answer
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
