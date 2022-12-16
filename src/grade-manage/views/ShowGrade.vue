<template>
    <div style="height: 30px;"></div>
    <div>
        <el-card class="box-card" style="margin:auto">
            <template #header>
                <div class="card-header">
                    <span>姓名: {{ grade?.name }}</span>
                    <!-- <el-button class="button" text>Operation button</el-button> -->
                </div>
            </template>
            <!-- <div v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</div> -->
            <div class="text item">
                班级：{{ grade?.className }}
            </div>
            <div class="text item">
                平时成绩：{{ grade?.usualGrade }}
            </div>
            <div class="text item">
                期中成绩：{{ grade?.midExamGrade }}
            </div>
            <div class="text item">
                期末成绩：{{ grade?.finalExamGrade }}
            </div>
            <div class="text item">
                实验成绩：{{ grade?.experimentGrade }}
            </div>
            <div class="text item">
                总成绩：{{ grade?.allGrade }}
            </div>
        </el-card>
    </div>
</template>
<script setup lang="ts">
import axios from '@/localAxios';
import { ElCard, ElButton } from 'element-plus';
import { onBeforeMount, ref } from 'vue';
import type { Ref } from 'vue';

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
const grade: Ref<Grade | null> = ref(null);

onBeforeMount(() => {
    axios.get("http://localhost:8080/grade-manage/show-grade")
        .then((res) => {
            console.log(res);
            grade.value = res.data;
        }).catch(err => {
            console.log(err);
            alert("数据获取失败，可能未登陆或者不是学生");
        })
});

</script>

<style scoped>
.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.text {
    font-size: 14px;
}

.item {
    margin-bottom: 18px;
}

.box-card {
    width: 480px;
}
</style>