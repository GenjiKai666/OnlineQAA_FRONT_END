<template>
  <div>
    <el-button type="success" @click="dialogFormVisible_insert = true">
      发布设施
    </el-button>
  </div>
  <div>
    <el-table
        :data="tableData"
        stripe
        :header-cell-class-name="headerBg"
    >
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
      <el-table-column label="编辑" >
        <template  #default="scope">
          <el-button type="success" @click="handleEdit(scope.row)"
          >编辑<el-icon><el-icon-edit /></el-icon
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="dialogFormVisible" title="编辑设施信息">
      <el-form :model="form">
        <el-form-item label="设施名" :label-width="formLabelWidth">
          <el-input v-model="this.form.facilityName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="使用人数" :label-width="formLabelWidth">
          <el-input v-model=this.form.capacity autocomplete="off" />
        </el-form-item>
        <el-form-item label="地点" :label-width="formLabelWidth">
          <el-input v-model="this.form.location" autocomplete="off" />
        </el-form-item>
        <el-form-item label="预约时间起" :label-width="formLabelWidth">
          <el-time-select
            v-model="this.form.startTime"
            start="01:00"
            step="00:30"
            end="23:00"
            placeholder="Select time"
          />
        </el-form-item>
        <el-form-item label="预约时间止" :label-width="formLabelWidth">
          <el-time-select
            v-model="this.form.endTime"
            start="01:00"
            step="00:30"
            end="23:00"
            placeholder="Select time"
          />
        </el-form-item>
        <el-form-item label="最短预约时间" :label-width="formLabelWidth">
          <el-select v-model="this.form.durationMin" placeholder="选择最短预约时间">
            <el-option label="30分钟" value="30" />
            <el-option label="45分钟" value="45" />
            <el-option label="60分钟" value="60" />
          </el-select>
        </el-form-item>
        <el-form-item label="最长预约时间" :label-width="formLabelWidth">
          <el-select v-model="this.form.durationMax" placeholder="选择最短预约时间">
            <el-option label="60分钟" value="60" />
            <el-option label="90分钟" value="90" />
            <el-option label="120分钟" value="120" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="danger" @click="handleDelete">
          删除
        </el-button>
        <el-button type="primary" @click="handleSubmit">
          确认
        </el-button>
      </span>
      </template>
    </el-dialog>

    <el-dialog v-model="dialogFormVisible_insert" title="发布设施">
      <el-form :model="form_insert">
        <el-form-item label="设施名" :label-width="formLabelWidth">
          <el-input v-model="this.form_insert.facilityName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="使用人数" :label-width="formLabelWidth">
          <el-input v-model=this.form_insert.capacity autocomplete="off" />
        </el-form-item>
        <el-form-item label="地点" :label-width="formLabelWidth">
          <el-input v-model="this.form_insert.location" autocomplete="off" />
        </el-form-item>
        <el-form-item label="预约时间起" :label-width="formLabelWidth">
          <el-time-select
            v-model="this.form_insert.startTime"
            start="01:00"
            step="00:30"
            end="23:00"
            placeholder="Select time"
          />
        </el-form-item>
        <el-form-item label="预约时间止" :label-width="formLabelWidth">
          <el-time-select
            v-model="this.form_insert.endTime"
            start="01:00"
            step="00:30"
            end="23:00"
            placeholder="Select time"
          />
        </el-form-item>
        <el-form-item label="最短预约时间" :label-width="formLabelWidth">
          <el-select v-model="this.form_insert.durationMin" placeholder="选择最短预约时间">
            <el-option label="30分钟" value="30" />
            <el-option label="45分钟" value="45" />
            <el-option label="60分钟" value="60" />
          </el-select>
        </el-form-item>
        <el-form-item label="最长预约时间" :label-width="formLabelWidth">
          <el-select v-model="this.form_insert.durationMax" placeholder="选择最短预约时间">
            <el-option label="60分钟" value="60" />
            <el-option label="90分钟" value="90" />
            <el-option label="120分钟" value="120" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible_insert = false">取消</el-button>
        <el-button type="primary" @click="handleInsert">
          确认
        </el-button>
      </span>
      </template>
    </el-dialog>
  </div>
</template>


<script>
import axios from "@/localAxios";
import Cookies from 'js-cookie';
import { ElMessage } from "element-plus";


export default {
  data() {
    return {
      formLabelWidth:'140px',
      tableData: [],
      id:null,
      form: {
        id:null,
        facilityName:'',
        capacity:null,
        location:null,
        startTime:null,
        endTime:null,
        durationMin:null,
        durationMax:null
      },
      form_insert: {
        id:null,
        facilityName:'',
        capacity:null,
        location:null,
        startTime:null,
        endTime:null,
        durationMin:null,
        durationMax:null
      },
      dialogFormVisible : false,
      dialogFormVisible_insert:false,
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
          type:"admin"
        }
      })
          .then((res) => {
            this.tableData = res.data.data;
          })
    },
    handleEdit(e){
      this.dialogFormVisible= true;
      this.form.id = e.id;
      this.form.facilityName = e.facilityName;
      this.form.capacity = e.capacity;
      this.form.location = e.location;
      this.form.startTime = e.startTime;
      this.form.endTime = e.endTime;
      this.form.durationMax = e.durationMax;
      this.form.durationMin = e.durationMin;
    },
    handleDelete() {
      let username = Cookies.get("username");
      let token = Cookies.get("token");
      let facilityid = this.form.id;
      axios({
        method:"post",
        url:"http://localhost:8081/facility/delete",
        params:{
          operator:username,
          token:token,
          type:"admin",
          facility_id:facilityid
        }
      }).then((res) => {
        if (res.data.code === 200){
          ElMessage({
            message: '删除成功',
            type: 'success',
          })
        }
        else {
          ElMessage({
            message: '删除失败',
            type: 'error',
          })
        }
        this.dialogFormVisible = false
        this.load()
      })
    },
    handleSubmit(){
      let username = Cookies.get("username");
      let token = Cookies.get("token");
      axios({
        method:"post",
        url:"http://localhost:8081/manage/facility/update-vue",
        data:this.form,
        params:{
          operator:username,
          token:token,
        },
      }).then((res) => {
        if (res.data.code === 200){
          ElMessage({
            message: '修改成功',
            type: 'success',
          })
        }
        else {
          ElMessage({
            message: '修改失败',
            type: 'error',
          })
        }
        this.dialogFormVisible = false
        this.load()
      })
    },
    handleInsert(){
      let username = Cookies.get("username");
      let token = Cookies.get("token");
      axios({
        method:"post",
        url:"http://localhost:8081/manage/facility/insert-vue",
        data:this.form_insert,
        params:{
          operator:username,
          token:token,
        },
      }).then((res) => {
        if (res.data.code === 200){
          ElMessage({
            message: '新增成功',
            type: 'success',
          })
        }
        else {
          ElMessage({
            message: '新增失败',
            type: 'error',
          })
        }
        this.dialogFormVisible_insert = false;
        this.load()
      })
    }
  },
}
</script>

<style scoped>
<style scoped>
.el-button--text {
  margin-right: 15px;
}
.el-select {
  width: 300px;
}
.el-input {
  width: 300px;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
