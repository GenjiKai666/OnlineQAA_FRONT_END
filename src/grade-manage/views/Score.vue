<template>
  <div>
    <div style="padding: 10px 0">
      <el-input
        style="width: 200px"
        class="ml-5"
        placeholder="请输入名称"
        v-model="name"
      ></el-input>
      <el-button type="primary" @click="load">搜索</el-button>
      <el-button type="warning" @click="reset">重置</el-button>
    </div>

    <div style="padding: 10px 0">

      <el-button type="primary" @click="handelAdd">新增</el-button>
      <el-popconfirm
        style="padding: 5px"
        confirm-button-text="好的"
        cancel-button-text="我再想想"

        title="你敢删除吗？"
        @confirm="delBatch"
      >
        <template #reference>
        <el-button type="danger">批量删除</el-button>
        </template>
      </el-popconfirm>
<!--      <el-button type="primary">导入</el-button>-->
<!--      <el-button type="primary">导出</el-button>-->
    </div>

    <el-table
      :data="tableData"
      stripe
      :header-cell-class-name="headerBg"
      @selection-change="handleSelectChange"
    >
      <!--            这是一个表格多选代码-->
      <el-table-column type="selection" width="55"> </el-table-column>

      <el-table-column prop="id" label="ID" width="140">
      </el-table-column>
      <el-table-column prop="student" label="用户名" width="120">
      </el-table-column>
      <el-table-column prop="midExamGrade" label="期中成绩">
      </el-table-column>
      <el-table-column prop="usualGrade" label="平时成绩">
      </el-table-column>
      <el-table-column prop="finalExamGrade" label="期末成绩">
      </el-table-column>
      <el-table-column prop="finalscore" label="总评成绩">
      </el-table-column>
      <el-table-column label="操作" >
        <template  #default="scope">
          <el-button type="success" @click="handelEdit(scope.row)">编辑</el-button>
          <!--                确认框，监听要在框内监听而不是按钮上-->
          <el-popconfirm
            class="ml-5"
            confirm-button-text="好的"
            cancel-button-text="我再想想"
            title="你敢删除吗？"
            @confirm="handeldel(scope.row.id)"
          >
            <template #reference>
              <el-button type="danger">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <div style="padding: 10px 0">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNume"
        :page-sizes="[2, 5, 10, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
<!--              新增的会话界面-->
    <el-dialog title="成绩信息" v-model="dialogFormVisible" width="30%">
      <el-form label-width="80px" size="small">
        <el-form-item label="用户名">
          <el-input v-model="form.student" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="期中成绩">
          <el-input v-model="form.midExamGrade" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="平时成绩">
          <el-input v-model="form.usualGrade" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="期末成绩">
          <el-input v-model="form.finalExamGrade" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="总评成绩">
          <el-input v-model="form.finalscore" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div  class="dialog-footer">
        <el-button @click="load">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>


<script>

export default {

  data() {
    return {
      tableData: [],
      total: 0,
      pageSize: 2,
      pageNume: 1,
      name: '',
      //批量删除传进来的数组
      multipleSelection: [],
      //form是提示框的一个对象，不需要具体定义里面的内容
      form: {},
      //默认对话弹框不要展示
      dialogFormVisible: true,
      //隐藏和显示的图标
      // lcon: 'el-icon-s-fold',
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
      //请求分页查询数据
      this.request
        .get(
          '/score/page',
          {
          params: {
            pageNum: this.pageNume,
            pageSize: this.pageSize,
              name: this.name,
            },
          }

        )
        .then((res) => {
          console.log(res)
          this.tableData = res.records
          this.total = res.total
        })
      // fetch("http://localhost:8001/score/page" +
      //     "?pageNum="+this.pageNume+
      //     "&pageSize="+this.pageSize+
      //     "&username="+this.username
      // ).then(res => res.json()).then(res =>{
      //   console.log(res)
      //   this.tableData = res.records
      //   this.total = res.total
      // })
      this.dialogFormVisible = false
    },
    save() {
      //进行新增操作，与编辑公用一个接口
      this.request.post('/score', this.form).then((res) => {
        if (res) {
          this.$message.success('添加成功！')
          this.dialogFormVisible = false
          this.load()
        } else {
          this.$message.error('添加失败')
        }
      })
    },
    handelEdit(row) {
      //进行编辑操作，与新增公用一个接口,row是将表格的那一行的数据直接获取
      this.form = row
      this.dialogFormVisible = true
    },
    handelAdd() {
      //打开提示框
      this.dialogFormVisible = true
      this.form = {}
    },
    handeldel(id) {
      //删除
      this.request.delete('/score/' + id).then((res) => {
        if (res) {
          this.$message.success('删除成功！')
          this.load()
        } else {
          this.$message.error('删除失败')
        }
      })
    },
    reset() {
      //重置
      this.name = ''
      this.load()
    },
    handleSizeChange: function (pageSize) {
      console.log(pageSize)
      this.pageSize = pageSize
      this.load()
    },
    handleCurrentChange: function (pageNum) {
      console.log(pageNum)
      this.pageNume = pageNum
      this.load()
    },
    handleSelectChange(val) {
      //为批量删除选中号码
      console.log(val)
      this.multipleSelection = val
    },
    delBatch() {
      //批量删除
      let ids = this.multipleSelection.map((v) => v.id)
      this.request.post("/score/del/batch", ids).then((res) => {
        if (res) {
          this.$message.success("批量删除成功！");
          this.load()
        } else {
          this.$message.error("批量删除失败");
        }
      })
    },
  },
}
</script>

<style scoped></style>
