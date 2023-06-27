<template>
  <div>
    <el-table
        :data="tableData"
        stripe
        :header-cell-class-name="headerBg"
    >
      <!--            这是一个表格多选代码-->
      <el-table-column prop="id" label="ID" width="50">
      </el-table-column>
      <el-table-column prop="facilityName" label="设施名">
      </el-table-column>
      <el-table-column prop="time" label="时间" width="500">
      </el-table-column>
      <el-table-column prop="status" label="订单状态">
      </el-table-column>
      <el-table-column label="评价" >
        <template  #default="scope">
          <el-button type="success" @click="handleComment(scope.row)"
          >评价订单<el-icon><el-icon-edit /></el-icon
          ></el-button>
        </template>
      </el-table-column>
      <el-table-column label="取消" >
        <template  #default="scope">
          <el-button type="danger" @click="handleCancel(scope.row)"
          >取消订单<el-icon><el-icon-edit /></el-icon
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="dialogFormVisible_comment" title="发布设施">
      <el-form :model="form_comment">
        <el-form-item label="评分" :label-width="formLabelWidth">
          <el-rate v-model="form_comment.rate" size="large" />
          <br />
        </el-form-item>
        <el-form-item label="评价内容" :label-width="formLabelWidth">
          <el-input
            v-model="form_comment.content"
            :rows="5"
            type="textarea"
            placeholder="Please input"
          />
        </el-form-item>
      </el-form>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible_comment = false">取消</el-button>
        <el-button type="primary" @click="handleCommentSubmit">
          提交
        </el-button>
      </span>
      </template>
    </el-dialog>
  </div>
</template>


<script>
import axios from "@/localAxios";
import Cookies from "js-cookie";
import { ElMessage } from 'element-plus'
export default {

  data() {
    return {
      tableData: [],
      formLabelWidth:'140px',
      id:null,
      courses:[],
      form: {},
      form_comment:{
        reservationId:null,
        facilityName:null,
        rate:null,
        content:null
      },
      //默认对话弹框不要展示
      dialogFormVisible_comment: false,
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
      let username = Cookies.get("username");
      let token = Cookies.get("token");
      axios({
        method:"post",
        url:"http://localhost:8082/reservations/info",
        params:{
          operator:username,
          token:token,
          type:"user",
          username:username
        }
      }).then((res) => {
        this.tableData = res.data.data
      })
    },
    handleComment(e) {
      this.form_comment.reservationId = e.id
      let username = Cookies.get("username");
      let token = Cookies.get("token");
      if(e.status === "已签到"){
        axios({
          method:"post",
          url:"http://localhost:8082/comment/get",
          params:{
            operator:username,
            token:token,
            type:"user",
            facilityName:e.facilityName,
            reservation_id:this.form_comment.reservationId
          }
        }).then((res)=>{
          if(res.data.code == 200){
            this.form_comment.rate = res.data.data.rate
            this.form_comment.content = res.data.data.content
          }
          else {
            this.form_comment.rate = null
            this.form_comment.content = null
          }
        })
        this.form_comment.facilityName =e.facilityName
        this.dialogFormVisible_comment = true
      }
      else {
        ElMessage({
          message: '无法评价',
          type: 'error',
        })
      }
    },
    handleCommentSubmit() {
      let username = Cookies.get("username");
      let token = Cookies.get("token");
      axios({
        method:"post",
        url:"http://localhost:8082/comment/put",
        params:{
          operator:username,
          token:token,
          type:"user",
          facilityName:this.form_comment.facilityName,
          rate:this.form_comment.rate,
          content:this.form_comment.content,
          reservationId:this.form_comment.reservationId
        }
      }).then((res)=>{
        if (res.data.code === 200){
          ElMessage({
            message: '评价成功',
            type: 'success',
          })
        }
        else {
          ElMessage({
            message: '评价失败',
            type: 'error',
          })
        }
        this.dialogFormVisible_comment =false
      })
    },
    handleCancel(e) {
      let username = Cookies.get("username");
      let token = Cookies.get("token");
      if(e.status === "待处理"){
        axios({
          method:"post",
          url:"http://localhost:8082/reservation/cancel",
          params:{
            operator:username,
            token:token,
            type:"user",
            reservationId:e.id
          }
        }).then((res)=>{
          if(res.data.code === 200){
            ElMessage({
              message: '取消成功',
              type: 'success',
            })
          }
          else {
            ElMessage({
              message: '取消失败',
              type: 'error',
            })
          }
          this.load()
        })
      }
      else {
        ElMessage({
          message: '无法取消',
          type: 'error',
        })
      }
    },
  },
}
</script>

<style scoped></style>
