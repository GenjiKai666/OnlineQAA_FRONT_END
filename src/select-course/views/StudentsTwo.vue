<script lang="ts">
import { reactive, ref ,inject} from 'vue'
import { ElTable } from 'element-plus'
import request from "../utils/request";
import store from '../store'
const selectNum:any = inject('selectNum')
import { ArrowDown, Fold, Tools, Star, Expand, Reading, Files, Check, Close, Position, Menu as IconMenu, Message, Setting, Loading } from '@element-plus/icons-vue'
const multipleTableRef = ref<InstanceType<typeof ElTable>>()

export default {
    name: 'StudentsTwo',

    data() {
        return {
            tableData: [],
            studentId: 2035060220,
            weeknum: 1,
            Check: Check,
            Close: Close,
            hasSelect:false,
        };
    },

    created() {
        this.load()
    },
    methods: {
        load() {
            request.get("http://localhost:8080/teacher/findweek", {
                params: {
                    weeknum: 2
                }
            }).then(res => {
                console.log(res)
                this.tableData = res

            })

            request.get("http://localhost:8080/student/loginStudent").then((res) => {
            console.log(res);
            this.studentId = res.id;
        }).catch(err => {
            console.log(err);
            alert("数据获取失败，可能未登录或者不是学生");
        })
        },

        selectChange(id) {

            request.post("http://localhost:8080/teacher/connect?studentId=" + this.studentId + "&teacherId=" + id).then(res => {
                console.log(res)
            }).catch(err => {
                console.log(err);
                alert("你已经进行了选课，请退出本界面！");
        })
            let data=store.state.selectNum
            if(data==1)
            {
                store.commit("deleteSelectNum")
            }else{
                store.commit("changeSelectNum")
            }
            

        }
    },

    computed: {

    },

    watch: {

    },

    components: {
        Check,
        Close
    }
};
</script>

<template>
    <div>
        <el-scrollbar>
            <el-table :data="tableData" ref="multipleTableRef" stripe=true>
                <el-table-column prop="id" label="教师ID" width="150" />
                <el-table-column prop="userName" label="教师姓名" width="150" />
                <el-table-column prop="courseLocation" label="教学地点" width="200" />
                <el-table-column prop="courseTime" label="教学时间" width="250" />
                <el-table-column label="是否选中" fixed="right">
                    <template #default="scope">
                        <el-switch  v-model="scope.row.changer" class="mt-2" style="margin-left: 24px"
                            inline-prompt :active-icon="Check" :inactive-icon="Close"
                            @change="selectChange(scope.row.id)" />
                    </template>

                </el-table-column>

            </el-table>
        </el-scrollbar>
    </div>
</template>

<style>
.layout-container-demo .el-main {
    padding: 0;
}
</style>