<script lang="ts">
import { reactive, ref } from 'vue'
import store from '../store'
import { ArrowDown, Fold, Tools, Star, Expand, Reading, Files, Check, Close, Position, Menu as IconMenu, Message, Setting, Loading } from '@element-plus/icons-vue'
import { isObjectLike } from 'lodash';
import type { ElTable } from 'element-plus'
import Aside from '../components/Aside.vue'
import Header from '../components/Header.vue'
import request from "../utils/request";
const multipleTableRef = ref<InstanceType<typeof ElTable>>()

export default {
    data() {
        return {
            //需要传入数据
            studentName: "刘卓卿",
            isCollapse: false,
            sideWidth: 200,
            one: 1,
            isFold: true,
            isSelect: false,
            logoTextShow: true,
            elButtonType: "",

            Position: Position,
            checked: true,
            value: true,
            canSubmit: false,
            isError: false,
            isErrorNum: false,
            isSuccess: false
        };
    },

    created(){
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

        load(){
            request.get("http://localhost:8080/student/loginStudent").then((res) => {
            console.log(res);
            this.studentName = res.username;
        }).catch(err => {
            console.log(err);
            alert("数据获取失败，可能未登录或者不是学生");
        })

        },

        closeError() {
            this.isError = false
        },


        closeSuccess() {
            this.isSuccess = false
        },

        hasSubmit() {
            let data = store.state.selectNum
            console.log(data)
            if (data == 1) {
                this.isSuccess = true
            } else if (data == 0) {
                this.isError = true
            }


        }


    },

    components: {
        Fold,
        ArrowDown,
        Tools,
        Star,
        Expand,
        Reading,
        Files,
        Check,
        Close,
        Position,

        Aside,
        Header,
    },

}



</script>

<template>
    <div v-if="isError" style="height:50px">
        <el-alert title="错误通知" type="error" description="你能选择且只能选择一门课" show-icon @close="closeError" />
    </div>
    <div v-if="isSuccess" style="height:50px">
        <el-alert title="成功通知" type="success" description="提交成功
        " show-icon @close="closeSuccess" />
    </div>

    <el-container class="layout-container-demo" style="height:100vh">

        <el-aside :width="sideWidth + 'px'" style="border-right:1px solid #ccc ">
            <Aside :isCollapse="isCollapse" :logoTextShow="logoTextShow" :canSubmit="canSubmit"
                :hasSubmit="hasSubmit" />
        </el-aside>
        <el-container>
            <el-header style="background-color:white">
                <Header :isFold="isFold" :studentName="studentName" :collapse="collapse" />
            </el-header>

            <el-main>
                <!-- 表示当前页面的子路由会在<router-view/>里面展示 -->
                <router-view />
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


.layout-container-demo .toolbar {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    right: 100%;
}
</style>
