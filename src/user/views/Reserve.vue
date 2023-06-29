<template>
  <div>
    <el-table
        :data="tableData"
        stripe
        :header-cell-class-name="headerBg"
    >
      <!--            这是一个表格多选代码-->
      <el-table-column prop="facilityName" label="设施名">
      </el-table-column>
      <el-table-column prop="location" label="地点">
      </el-table-column>
      <el-table-column prop="capacity" label="使用人数">
      </el-table-column>
      <el-table-column prop="startTime" label="预约时间起">
      </el-table-column>
      <el-table-column prop="endTime" label="预约时间止">
      </el-table-column>
      <el-table-column prop="durationMin" label="最短预约时间/分">
      </el-table-column>
      <el-table-column prop="durationMax" label="最长预约时间/分">
      </el-table-column>
      <el-table-column label="详情" >
        <template  #default="scope">
          <el-button type="success" @click="handleSelect(scope.row)"
          >详情<el-icon><el-icon-edit /></el-icon
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="dialogTableVisible" title="预约信息">
      <el-scrollbar height="400px">
        <p v-for="item in reservations" :key="item" class="scrollbar-demo-item">{{ item }}</p>
      </el-scrollbar>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取消</el-button>
        <el-button type="info" @click="dialogCommentVisible = true">
          查看评价
        </el-button>
        <el-button type="primary" @click="dialogReserveVisible = true">
          预约
        </el-button>
      </span>
      </template>
    </el-dialog>

    <el-dialog v-model="dialogReserveVisible" title="预约">
      <el-form :model="form">
        <el-form-item label="日期" :label-width="formLabelWidth">
        <el-date-picker
          v-model="form.date"
          type="date"
          placeholder="Pick a day"
          :disabled-date="disabledDate"
          :shortcuts="shortcuts"
          :size="size"
        />
        </el-form-item>
        <el-form-item label="预约时间起" :label-width="formLabelWidth">
          <el-time-select
            v-model="this.form.startTime"
            start="00:05"
            step="00:05"
            end="23:55"
            placeholder="Select time"
          />
        </el-form-item>
        <el-form-item label="预约时间止" :label-width="formLabelWidth">
          <el-time-select
            v-model="this.form.endTime"
            start="00:05"
            step="00:05"
            end="23:55"
            placeholder="Select time"
          />
        </el-form-item>
      </el-form>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogReserveVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit">
          提交
        </el-button>
      </span>
      </template>
    </el-dialog>

    <el-dialog v-model="dialogCommentVisible" title="评价信息">
      <el-form-item label="平均评分" :label-width="formLabelWidth">
        <el-rate
          v-model="form_comment.avgRate"
          disabled
          show-score
          text-color="#ff9900"
          score-template="{value}"
        />
      </el-form-item>
      <el-table
        :data="form_comment.comments"
        stripe
        :header-cell-class-name="headerBg"
      >
        <!--            这是一个表格多选代码-->
        <el-table-column prop="rate" label="评分">
        </el-table-column>
        <el-table-column prop="content" label="评价">
        </el-table-column>
      </el-table>
      <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="dialogCommentVisible = false">好的</el-button>
      </span>
      </template>
    </el-dialog>
  </div>
</template>


<script>
import axios from "@/localAxios";
import Cookies from "js-cookie";
import { ElMessage } from "element-plus";
export default {

  data() {
    return {
      facilityId:null,
      formLabelWidth:'140px',
      keyWord:null,
      tableData: [],
      id:null,
      courses:[],
      form: {
        startTime:null,
        endTime:null,
        date:null
      },
      form_comment:{
      },
      reservations:[],
      //默认对话弹框不要展示
      dialogTableVisible: false,
      dialogReserveVisible:false,
      dialogCommentVisible:false,
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
      //请求设施信息
      let username = Cookies.get("username");
      let token = Cookies.get("token");
      axios({
        method:"post",
        url:"http://localhost:8081/facilities-vue",
        params:{
          operator:username,
          token:token,
          type:"user"
        }
      })
        .then((res) => {
          this.tableData = res.data.data;
        })
    },
    handleSelect(e) {
      //请求设施信息
      let username = Cookies.get("username");
      let token = Cookies.get("token");
      axios({
        method:"post",
        url:"http://localhost:8082/info",
        params:{
          operator:username,
          token:token,
          type:"user",
          facility_id:e.id
        }
      })
        .then((res) => {
          this.reservations = res.data.data.reservationInfo;
          this.form_comment.avgRate = res.data.data.avgRate;
          this.form_comment.comments = res.data.data.commentInfo;
          this.dialogTableVisible = true;
          this.facilityId = e.id
        })
    },
    handleSubmit(){
      let username = Cookies.get("username");
      let token = Cookies.get("token");
      axios({
        method:"post",
        url:"http://localhost:8082/reserve-vue",
        data:{
          facilityId:this.facilityId,
          startTime:this.form.startTime,
          endTime:this.form.endTime,
          date:this.form.date
        },
        params:{
          operator:username,
          token:token,
          type:"user"
        }
      })
        .then((res) => {
          if(res.data.code == 200){
            ElMessage({
              message: '预定成功',
              type: 'success',
            })
          }
          else{
            ElMessage({
              message: '预定失败',
              type: 'error',
            })
          }
          this.dialogTableVisible = false;
          this.dialogReserveVisible = false;
          this.handleSelect();
        })
    },
  },
}
</script>

<style scoped></style>
