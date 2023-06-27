<template>
  <div>
  </div>
  <div>
    <el-table
      :data="tableData"
      stripe
      :header-cell-class-name="headerBg"
    >
      <el-table-column prop="id" label="ID">
      </el-table-column>
      <el-table-column prop="username" label="用户名">
      </el-table-column>
      <el-table-column prop="status" label="用户状态">
      </el-table-column>
      <el-table-column prop="credit" label="信用分">
      </el-table-column>
      <el-table-column label="封禁">
        <template #default="scope">
          <el-button type="danger" @click="handleBlock(scope.row)"
          >封禁
            <el-icon>
              <el-icon-edit />
            </el-icon
            >
          </el-button>
        </template>
      </el-table-column>
      <el-table-column label="解封">
        <template #default="scope">
          <el-button type="success" @click="handleUnBlock(scope.row)"
          >解封
            <el-icon>
              <el-icon-edit />
            </el-icon
            >
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>


<script>
import axios from "@/localAxios";
import Cookies from "js-cookie";
import { ElMessage } from "element-plus";


export default {
  inject: ["reload"],
  data() {
    return {
      formLabelWidth: "140px",
      tableData: [],
      id: null,
      lcon: "el-icon-s-fold",
      //隐藏显示的逻辑转换
      isCollapse: false,
      logotextshow: true,
      sideWidth: 200,
      //表头样式
      headerBg: "headerBg"
      // ElIconSearch,
      // ElIconInfo,
    };
  },

  created() {
    //加载的时候触发
    this.load();
  },
  methods: {
    load() {
      //请求设施信息
      let username = Cookies.get("username");
      let token = Cookies.get("token");
      axios({
        method: "post",
        url: "http://localhost:8080/auth/users/info",
        params: {
          operator: username,
          token: token,
          type: "admin"
        }
      })
        .then((res) => {
          this.tableData = res.data.data;
        });
    },
    handleBlock(e) {
      if (e.status === "封禁"){
        ElMessage({
          message: '请不要重复拉黑',
          type: 'error',
        })
        return;
      }
      let username = Cookies.get("username");
      let token = Cookies.get("token");
      let id = e.id
      axios({
        method: "post",
        url: "http://localhost:8080/auth/user/block",
        params: {
          operator: username,
          token: token,
          type: "admin",
          id:id
        }
      }).then((res)=>{
        if (res.data.code === 200){
          ElMessage({
            message: '拉黑成功',
            type: 'success',
          })
        }
        else {
          ElMessage({
            message: '拉黑失败',
            type: 'error',
          })
        }
        this.load()
      })
    },
    handleUnBlock(e) {
      if (e.status === "正常"){
        ElMessage({
          message: '用户不需要解封',
          type: 'error',
        })
        return;
      }
      let username = Cookies.get("username");
      let token = Cookies.get("token");
      let id = e.id
      axios({
        method: "post",
        url: "http://localhost:8080/auth/user/unblock",
        params: {
          operator: username,
          token: token,
          type: "admin",
          id:id
        }
      }).then((res)=>{
        if (res.data.code === 200){
          ElMessage({
            message: '解封成功',
            type: 'success',
          })
        }
        else {
          ElMessage({
            message: '解封失败',
            type: 'error',
          })
        }
        this.load()
      })
    },
  }
};
</script>

<style scoped>
<
style scoped >
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
