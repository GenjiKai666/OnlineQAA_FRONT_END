<script lang="ts">
import { reactive, ref } from 'vue'
import { ArrowDown, Fold, Tools, Star, Expand, Reading, Files, Check, Close, Position, Menu as IconMenu, Message, Setting, Loading } from '@element-plus/icons-vue'
import { isObjectLike } from 'lodash';
import { ElTable } from 'element-plus'
import axios from "@/localAxios";
import { getCurrentInstance, inject, onMounted } from "@vue/runtime-core";
import request from "@/select-course/utils/request";
const multipleTableRef = ref<InstanceType<typeof ElTable>>()
export default {
    data() {
        return {
            tableData: [],
            isCollapse: false,
            studentName: "刘卓卿",
            studentId: 2035060220,
            sideWidth: 200,
            isFold: true,
            isSelect: false,
            logoTextShow: true,
            elButtonType: "",
            Check: Check,
            Close: Close,
            Position: Position,
            checked: true,
            value: true,
            canSubmit: false,
            isError: false,
            weeknum: 1,
        };
    },

    created() {
        //请求查询数据
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

        clickErrorSubmit() {
            this.isError = true
        },

        closeError() {
            this.isError = false
        },

        load() {
            request.get("http://localhost:8080/teacher/findweek", {
                params: {
                    weeknum: 1
                }
            }).then(res => {
                console.log(res)

                this.tableData = res

            })
        },

        selectChange(id) {
            request.post("http://localhost:8080/teacher/connect?studentId="+this.studentId+"&teacherId="+id).then(res => {
                console.log(res)
            })
        }
    },






    components: { Fold, ArrowDown, Tools, Star, Expand, Reading, Files, Check, Close, Position },

}



</script>

<template>
    <div v-if="isError" style="height:50px">
        <el-alert title="ERROR ALERT" type="error" description="You need to select a course to submit" show-icon
            @close="closeError" />
    </div>

    <el-container class="layout-container-demo" style="height: 100%">

        <el-aside :width="sideWidth + 'px'" style="border-right:1px solid #ccc ">
            <el-scrollbar style="background-color:rgb(48,65,86) " height="625.33px">
                <el-menu :default-openeds="['1', '3']" background-color="rgb(48,65,86)" text-color="#fff"
                    active-text-color="#ffd04b" :collapse-transition="false" :collapse="isCollapse">
                    <div style="height:59.3333px; line-height:59.333px;text-align:center">
                        <el-icon style="width:20px; position:relative; top:5px;margin-right:7px " color="white">
                            <Files />
                        </el-icon>
                        <b style="color:white" v-show="logoTextShow">学生选课界面</b>
                    </div>
                    <el-menu-item index="1">
                        <el-icon>
                            <Star />
                        </el-icon>
                        <template #title>

                            <span slot="title">周一</span>
                        </template>
                    </el-menu-item>
                    <el-menu-item index="2">
                        <el-icon>
                            <Star />
                        </el-icon>
                        <template #title>

                            <span slot="title">周二</span>
                        </template>
                    </el-menu-item>
                    <el-menu-item index="3">
                        <el-icon>
                            <Star />
                        </el-icon>
                        <template #title>

                            <span slot="title">周三</span>
                        </template>
                    </el-menu-item>
                    <el-menu-item index="4">
                        <el-icon>
                            <Star />
                        </el-icon>
                        <template #title>

                            <span slot="title">周四</span>
                        </template>
                    </el-menu-item>
                    <el-menu-item index="5">
                        <el-icon>
                            <Star />
                        </el-icon>
                        <template #title>
                            <span slot="title">周五</span>
                        </template>
                    </el-menu-item>
                </el-menu>

                <div v-if="!isCollapse">
                    <el-button v-if="canSubmit" type="success" size="large " color="#ffd04b" :icon="Position"
                        text-color="#ffd04b" style="margin-top:200px ; margin-left:40px" round auto-insert-space
                        @click="">提交</el-button>
                    <el-button v-else type="success" size="large " color="#ffd04b" :icon="Position" text-color="#ffd04b"
                        style="margin-top:200px ; margin-left:40px" round auto-insert-space
                        @click="clickErrorSubmit">提交</el-button>
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
                    <span>{{ studentName }}</span>
                </div>
            </el-header>

            <el-main>
                <el-scrollbar>
                    <el-table :data="tableData" ref="multipleTableRef" stripe=true>
                        <el-table-column prop="id" label="教师ID" width="150" />
                        <el-table-column prop="userName" label="教师姓名" width="150" />
                        <el-table-column prop="courseLocation" label="教学地点" width="200" />
                        <el-table-column prop="courseTime" label="教学时间" width="250" />
                        <el-table-column label="是否选中" fixed="right">
                            <template #default="scope">
                                <el-switch v-model="scope.row.changer" class="mt-2" style="margin-left: 24px"
                                    inline-prompt :active-icon="Check" :inactive-icon="Close"
                                    @change="selectChange(scope.row.id)" />
                            </template>
                        </el-table-column>

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
