<template>
  <div>
    <el-row :gutter="10"  style="margin-bottom: 40px">
      <el-col :span="6" style="padding-right: 10px">
        <el-card style="color: #f1de09">
          <div >班级总人数</div>
          <div style="padding: 10px 0; text-align: center; font-weight: bold">
            {{sum}}
          </div>
        </el-card>
      </el-col>
      <el-col :span="6" style="padding-right: 10px">
        <el-card style="color: #F56C6C">
          <div >不及格人数</div>
          <div style="padding: 10px 0; text-align: center; font-weight: bold">
            {{failnum}}
          </div>
        </el-card>
      </el-col>
      <el-col :span="6" style="padding-right: 10px">
        <el-card style="color: #E6A23C">
          <div >及格人数</div>
          <div style="padding: 10px 0; text-align: center; font-weight: bold">
            {{passnum}}
          </div>
        </el-card>
      </el-col>
      <el-col :span="6" style="padding-right: 10px">
        <el-card style="color: #409EFF">
          <div >90分以上人数</div>
          <div style="padding: 10px 0; text-align: center; font-weight: bold">
            {{best}}
          </div>
        </el-card> </el-col>

    </el-row>
    <!--    每行24分拦，一列占一半-->
    <el-row>
      <el-col :span="12">
        <div id="line" style="width: 500px;height: 400px"></div>
      </el-col>
      <el-col :span="12">
        <div id="pie" style="width: 500px;height: 400px"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import * as echarts from 'echarts';
export default {
  name: "Echarts",
  data (){
    return {
      failnum: 10,
      passnum: 10,
      best: 10,
      sum: 10

    }
  },
  created() {
    this.request.get("/Echarts/score").then(res =>{
      this.sum = res.data[6]
      this.failnum = res.data[0]
      this.passnum = res.data[5]
      this.best = res.data[4]


    })
  },
  //界面渲染之后再触发 也是echarts代码的粘贴之处
  mounted() {
    //折线图
    var chartDom = document.getElementById('line');
    var myChart = echarts.init(chartDom);
    var option;
    option = {
      title: {
        text: '各分数段人数',
        subtext: '趋势图',
        left: 'center'
      },
      xAxis: {
        type: 'category',
        data: ['小于60', '60-70', '70-80', '80-90', '90-100']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [],
          type: 'line'
        },
        {
          data: [],
          type: 'bar'
        }
      ]
    };
    this.request.get("/Echarts/score").then(res =>{
      // option.xAxis.data = res.data.x;
      option.series[0].data = res.data;
      option.series[1].data = res.data;
      myChart.setOption(option)
    })

    //饼图
    var pieoption = {
      title: {
        text: '各分数段比例图',
        subtext: '占比图',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: '50%',
          data: [],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
    var pieDom = document.getElementById('pie');
    var pieChart = echarts.init(pieDom);
    this.request.get("/Echarts/score").then(res =>{
      // option.xAxis.data = res.data.x;
      pieoption.series[0].data= [

        { value: res.data[0], name: '小于60' },
        { value: res.data[1], name:'60-70' },
        { value: res.data[2], name:'70-80' },
        { value: res.data[3], name:'80-90' },
        { value: res.data[4], name:'90-100' }
      ]
      // pieoption.series[1].data = res.data;
      pieChart.setOption(pieoption)
    })

  }
}
</script>

<style scoped>

</style>