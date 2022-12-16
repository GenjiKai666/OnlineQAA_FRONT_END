<script lang="ts">
import { reactive, ref, computed } from 'vue'
import { ArrowDown, Fold, Tools, Star, Expand, Reading, Files, Check, Close, Position, Menu as IconMenu, Message, Setting } from '@element-plus/icons-vue'
import { isObjectLike } from 'lodash';
import { ElTable } from 'element-plus'
import request from "../utils/request";
const multipleTableRef = ref<InstanceType<typeof ElTable>>()

export default {
    data() {
        return {
            tableData: [],
            //需要传入数据
            teacherId: 1,
            teacherName: "李锐",
            courseTime: "周一 (5-7)节3-15周",
            courseLocation: "五教",
            //需要传入数据
            isCollapse: false,
            sideWidth: 175,
            isFold: true,
            isSelect: false,
            logoTextShow: true,
            elButtonType: "",
            Check: Check,
            Close: Close,
            Position: Position,
            checked: true,
            value: true,
            canSubmit: true,
            tableLayout: "fixed",
            notConfirmed: true,
            haveConfirmed: false

        };
    },
    created() {
        this.load()
    },
    methods: {
        //点击收缩按钮触发菜单栏
        collapse() {
            this.isCollapse = !this.isCollapse;
            if (!this.isCollapse) {
                this.sideWidth = 199.333
                this.isFold = true
                this.logoTextShow = true
            } else {
                this.sideWidth = 64
                this.isFold = false
                this.logoTextShow = false
            }
        },

        clickHaveConfirmed() {
            this.haveConfirmed = true
        },

        closeSuccess() {
            this.notConfirmed = true
        },

        closeError() {
            this.haveConfirmed = false
        },

        load() {
            request.get("http://localhost:8080/student/findstudents", {
                params: {
                    teacherId: this.teacherId
                }
            }).then(res => {
                console.log(res)

                this.tableData = res

            })

            request.get("http://localhost:8080/student/loginTeacher").then((res) => {
                console.log(res);
                this.teacherName = res.userName;
                this.teacherId = res.id;
                this.courseLocation = res.courseLocation;
                this.courseTime = res.courseTime;
            }).catch(err => {
                console.log(err);
                alert("数据获取失败，可能未登录或者不是老师");
            })
        },

        isConfirmed() {
            request.post("http://localhost:8080/student_teacher/confirmed?teacherId=" + this.teacherId).then()
            this.notConfirmed = false
            this.canSubmit = false
        }
    },
    components: { Fold, ArrowDown, Tools, Star, Expand, Reading, Files, Check, Close, Position },

}



</script>

<template>
    <div v-if="!notConfirmed" style="height:50px">
        <el-alert title="SUCCESS ALERT" type="success" description="Confirmation succeeded" show-icon
            @close="closeSuccess" />
    </div>
    <div v-if="haveConfirmed" style="height:50px">
        <el-alert title="ALERT ALERT" type="error" description="You have confirmed the information" show-icon
            @close="closeError" />
    </div>
    <el-container class="layout-container-demo" style="height:100vh">

        <el-aside :width="sideWidth + 'px'" style="border-right:1px solid #ccc ">
            <el-scrollbar style="background-color:rgb(48,65,86) " height="625.33px">
                <el-menu :default-openeds="['1', '3']" background-color="rgb(48,65,86)" text-color="#fff"
                    active-text-color="#ffd04b" :collapse-transition="false" :collapse="isCollapse">
                    <div style="height:59.3333px; line-height:59.333px;text-align:center ;margin-top:10px">
                        <el-icon style="width:20px; position:relative; top:5px;margin-right:7px " color="white">
                            <Files />
                        </el-icon>
                        <b style="color:white" v-show="logoTextShow">确定课程信息</b>
                    </div>

                </el-menu>

                <div v-if="!isCollapse">
                    <el-button v-if="canSubmit" type="success" size="large " color="#ffd04b" :icon="Position"
                        text-color="#ffd04b" style="margin-top:475px ; margin-left:40px" round auto-insert-space
                        @click="isConfirmed">提交</el-button>
                    <el-button v-else type="success" size="large " color="#ffd04b" :icon="Position" text-color="#ffd04b"
                        style="margin-top:475px ; margin-left:40px" round auto-insert-space
                        @click="clickHaveConfirmed">提交</el-button>
                </div>



            </el-scrollbar>
        </el-aside>
        <el-container>
            <el-header
                style=" font-size: 12px; border-bottom:1px solid #ccc; display: flex ;background-color: whitesmoke">
                <div style="flex: 1; font-size: 20px">
                    <el-icon v-if="isFold" style="cursor: pointer;width: 1em; height: 1em; margin-top: 20px ;"
                        @click="collapse">
                        <Fold />
                    </el-icon>
                    <el-icon v-else style="cursor: pointer;width: 1em; height: 1em; margin-top: 20px ;"
                        @click="collapse">
                        <Expand />
                    </el-icon>
                </div>
                <div class="toolbar">
                    <el-dropdown>
                        <el-icon style="margin-right: 8px; margin-top: 1px">
                            <ArrowDown />
                        </el-icon>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item>个人中心</el-dropdown-item>
                                <el-dropdown-item>退出</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                    <span>{{ teacherName }}</span>
                </div>
            </el-header>
            <el-descriptions class="margin-top" :column="3" size="large" border>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            <el-icon>
                                <user />
                            </el-icon>
                            教师姓名
                        </div>
                    </template>
                    {{ teacherName }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            <el-icon>
                                <tickets />
                            </el-icon>
                            教学时间
                        </div>
                    </template>
                    {{ courseTime }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            <el-icon>
                                <office-building />
                            </el-icon>
                            教学地点
                        </div>
                    </template>
                    {{ courseLocation }}
                </el-descriptions-item>
            </el-descriptions>

            <el-main>
                <el-scrollbar>
                    <el-table :data="tableData" ref="multipleTableRef" stripe=true :table-layout="tableLayout">
                        <el-table-column prop="id" label="学号" width="200" />
                        <el-table-column prop="username" label="姓名" width="200" />
                        <el-table-column prop="className" label="所在班级" width="200" />
                        <el-table-column prop="phone" label="电话号" width="200" />
                        <el-table-column prop="email" label="邮箱" width="250" />
                    </el-table>

                </el-scrollbar>
            </el-main>
        </el-container>
    </el-container>
</template>



<style scoped>
div {
    font-family: weiruan;
}

.layout-container-demo .el-header {
    position: relative;
    background-color: var(--el-color-primary-light-7);
    color: var(--el-text-color-primary);
}

.layout-container-demo .el-aside {
    color: var(--el-text-color-primary);
    background: var(--el-color-primary-light-8);
}

.layout-container-demo .el-menu {
    border-right: none;
}

.layout-container-demo .el-main {
    padding: 0;
}

.layout-container-demo .toolbar {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    right: 100%;
}
</style>
