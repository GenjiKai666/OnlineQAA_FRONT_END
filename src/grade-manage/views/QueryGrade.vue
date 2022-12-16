<template>
    <div>
        <div>
            <el-row style="padding: 2vh 0 0 0">
                <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
                    <label for="switch">只显示不及格同学 </label>
                    <el-switch v-model="onlyUnqualified" id="switch" />
                </el-col>

            </el-row>

        </div>

        <div style="padding: 10px 0">
            <el-input style="width: 200px" class="ml-5" placeholder="请输入名称" v-model="searchText"></el-input>
            <el-button type="primary" @click="search">搜索</el-button>
            <el-button type="primary" @click="reset">重置</el-button>
            <el-button type="success" @click="loadData">刷新</el-button>
        </div>
        <div>

            <el-table :data="displayGrades" height="60vh" stripe style="width: 100%"
                @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" />
                <el-table-column prop="id" label="学号" width="180" />
                <el-table-column prop="name" label="姓名" width="180" />
                <el-table-column prop="className" label="班级" />
                <el-table-column prop="usualGrade" label="平时成绩" />
                <el-table-column prop="midExamGrade" label="期中成绩" />
                <el-table-column prop="finalExamGrade" label="期末成绩" />
                <el-table-column prop="allGrade" label="总成绩" />
            </el-table>
            <!-- </el-scrollbar> -->
        </div>
        <div style="padding: 3vh 1vw 1vh 1vw ">
            <el-button @click="send" :type="onlyUnqualified ? 'warning' : 'primary'">{{ buttonNameText }}</el-button>
        </div>
    </div>
</template>
<script setup lang="ts">
import { isNull } from 'lodash';
import { computed, ref, onBeforeMount, watch } from 'vue';
import type { Ref } from 'vue';
import axios from '@/localAxios';
import { ElMessage, ElMessageBox } from 'element-plus';

// 类型声明
class Grade {
    id: number;
    name: string;
    className: string;
    usualGrade: number | null;
    midExamGrade: number | null;
    finalExamGrade: number | null;
    experimentGrade: number | null;
    allGrade: number | null;

    constructor(id: number,
        name: string,
        className: string,
        usualGrade: number | null,
        midExamGrade: number | null,
        finalExamGrade: number | null,
        experimentGrade: number | null,
        allGrade: number | null) {
        this.id = id;
        this.name = name;
        this.className = className;
        this.usualGrade = usualGrade;
        this.midExamGrade = midExamGrade;
        this.finalExamGrade = finalExamGrade;
        this.experimentGrade = experimentGrade;
        this.allGrade = allGrade;
    }
}

// 变量声明
let rawGrades: Ref<Grade[] | null> = ref(null);
let grades: Ref<Grade[] | null> = ref(null);

let displayGrades: Ref<Grade[] | null> = ref(null);
const searchText = ref("");

const onlyUnqualified = ref(false)
const buttonNameText = computed(() => {
    return onlyUnqualified.value ? "发送成绩预警邮件" : "发送成绩通知邮件";
})

function refreshPage() {
    console.log('A')
    if (!isNull(grades.value)) {
        displayGrades.value = grades.value;
    }
    else {
        displayGrades.value = null;
    }
}

function loadData() {
    axios.get("http://localhost:8080/grade-manage/grades")
        .then((res) => {
            console.log(res);
            rawGrades.value = res.data;
            grades.value = rawGrades.value;
            refreshPage();
        }).catch(err => {
            console.log(err);
            alert("数据获取失败，可能未登录或者不是老师");
        })
}

watch(onlyUnqualified, (n: any, o: any) => {
    console.log(n);
    if (!isNull(rawGrades.value)) {
        if (n) {
            grades.value = rawGrades.value.filter(grade => {
                return isNull(grade.allGrade) || grade.allGrade < 60;
            })
        }
        else {
            grades.value = rawGrades.value;
        }
    }
    else {
        grades.value = null;
    }
    refreshPage();

})
// 生命周期
onBeforeMount(() => {
    loadData();
})

function search() {
    if (grades.value != null) {
        displayGrades.value = grades.value.filter(grade => {
            return grade.name.indexOf(searchText.value) >= 0
                || grade.id.toString().indexOf(searchText.value) >= 0;
        });
    }
    else {
        alert("数据获取失败,请刷新页面");
    }
}
function reset() {
    searchText.value = "";
    search();
}

function getUrl() {
    if (onlyUnqualified.value) {
        return "http://localhost:8080/grade-manage/send-grade-warning";
    }
    else {
        return "http://localhost:8080/grade-manage/send-grade-info";
    }
}

// 发送成绩信息邮件
let receivers: Ref<Set<number>> = ref(new Set());
function handleSelectionChange(val: Grade[]) {
    let temp: Set<number> = new Set();
    for (const s of val) {
        temp.add(s.id);
    }
    receivers.value = temp;
}

function send() {
    ElMessageBox.confirm(
        '将要给' + receivers.value.size + '同学发送邮件，确定吗？',
        'Warning',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }).then(() => {
            axios.post(getUrl(), [...receivers.value]
            )
                .then(res => {
                    let successCount = res.data;
                    let failCount = receivers.value.size - successCount;
                    ElMessage({
                        type: 'info',
                        message: '成功：' + successCount + '，失败：' + failCount,
                    })
                })
                .catch(err => {
                    console.log(err)
                    ElMessage({
                        type: 'warning',
                        message: '发送失败',
                    })
                })
            ElMessage({
                type: 'info',
                message: '发送中...',
            })
        }).catch(() => {
            ElMessage({
                type: 'info',
                message: '已取消',
            })
        })
}

</script>
<style lang="css">

</style>