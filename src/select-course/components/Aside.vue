<script>
import { ArrowDown, Fold, Tools, Star, Expand, Reading, Files, Check, Close, Position, Menu as IconMenu, Message, Setting, Loading } from '@element-plus/icons-vue'
import store from '../store'
let data=store.state.selectNum
export default{
    name:"Aside",
    props:{
        isCollapse:Boolean,
        logoTextShow:Boolean,
        clickErrorSubmit:Function,
        canSubmit:Boolean,
        hasSubmit:Function
    },

    data(){
        return{
            Position: Position,
            num: store.state.selectNum
        };
    },

    methods:{
        
    },

    computed: {
        
    },
    
    watch:{

    },
    
    components: {
        Files,
        Star,
        Position
    }
};
</script>

<template>
    <!-- <el-scrollbar style="background-color:rgb(48,65,86) " height="625.33px"> -->
        <el-menu :default-openeds="['1', '3']" style="min-height: 100%" background-color="rgb(48,65,86)" text-color="#fff"
    active-text-color="#ffd04b" :collapse="isCollapse" :collapse-transition="false" router>
            <div style="height:59.3333px; line-height:59.333px;text-align:center">
                <el-icon style="width:20px; position:relative; top:5px;margin-right:7px " color="white">
                    <Files />
                </el-icon>
                <b style="color:white" v-show="logoTextShow">学生选课界面</b>
            </div>
            <el-menu-item index="./studentsone">
                <el-icon>
                    <Star />
                </el-icon>
                <template #title>

                    <span slot="title">周一</span>
                </template>
            </el-menu-item>
            <el-menu-item index="./studentstwo">
                <el-icon>
                    <Star />
                </el-icon>
                <template #title>

                    <span slot="title">周二</span>
                </template>
            </el-menu-item>
            <el-menu-item index="./studentsthree">
                <el-icon>
                    <Star />
                </el-icon>
                <template #title>

                    <span slot="title">周三</span>
                </template>
            </el-menu-item>
            <el-menu-item index="./studentsfour">
                <el-icon>
                    <Star />
                </el-icon>
                <template #title>

                    <span slot="title">周四</span>
                </template>
            </el-menu-item>
            <el-menu-item index="./studentsfive">
                <el-icon>
                    <Star />
                </el-icon>
                <template #title>
                    <span slot="title">周五</span>
                </template>
            </el-menu-item>

            <div v-if="!isCollapse">
            <el-button type="success" size="large " color="#ffd04b" :icon="Position"
                text-color="#ffd04b" style="margin-top:200px ; margin-left:40px" round auto-insert-space
                @click="hasSubmit">提交</el-button>
        </div>
        </el-menu>

        



    <!-- </el-scrollbar> -->
</template>

<style>

</style>