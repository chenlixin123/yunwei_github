<template>
  <div ref="ech" class="box">
    <!-- <Button type="success" @click="click">隐藏/显示</Button> -->
    <!-- <echarts :chartdata="chartdata" />
    <echarts :chartdata="chartdata"></echarts>-->
    <Select
      v-model="model1"
      style="
        width: 200px;
        margin-left: 30%;
        margintop: 50px;
        marginbottom: 50px;
      "
    >
      <Option v-for="item in cityList" :value="item.value" :key="item.value">{{
        item.label
      }}</Option>
    </Select>
    <Select v-model="model2" style="width: 200px" @on-change="optionclick1">
      <Option v-for="item in cityList1" :value="item.value" :key="item.value">{{
        item.label
      }}</Option>
    </Select>
    <Select v-model="model3" style="width: 200px" @on-change="optionclick2">
      <Option v-for="item in citylist2" :value="item.value" :key="item.value">{{
        item.label
      }}</Option>
    </Select>

    <div
      class="transition-box"
      ref="echarts"
      v-width="1600"
      v-height="600"
      v-show="show[0]"
    ></div>
    <div ref="echarts1" v-height="600" v-width="1600" v-show="show[1]"></div>
    <div ref="echarts2" v-height="600" v-width="1600" v-show="show[2]"></div>
    <div ref="echarts3" v-height="600" v-width="1600" v-show="show[3]"></div>
    <div ref="echarts4" v-height="600" v-width="1600" v-show="show[4]"></div>
    <div ref="visitChart" v-height="600" v-width="1600" v-show="show[5]"></div>
    <div ref="visitChart1" v-height="600" v-width="1600" v-show="show[6]"></div>
    <div ref="visitChart2" v-height="600" v-width="1600" v-show="show[7]"></div>
    <!-- <div class="echarts" ref="echarts2" v-height="600" v-width="1000"></div>
    <div class="echarts" ref="echarts3" v-height="600" v-width="1000"></div>
    <div class="echarts" ref="echarts4" v-height="600" v-width="1000"></div>-->
    <Button @click="handlePrint" type="success">打印</Button>
  </div>
</template>
<script>
import echarts from "echarts";
import $ from "jquery";
import mock from "./mock";
import { search, echartspie, echarts1 } from "@/api/mock";
import mybus from "@/components/mybus/mybus.js";
function getDate(d) {
  const date = new Date(d);
  const hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
  const mins =
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  return `${hour}:${mins}`;
}
export default {
  data() {
    return {
      option: {},
      number: 0,
      xData: [],
      y1Data: [],
      y2Data: [],
      citylist2: [],
      cityList: [
        {
          value: "0",
          label: "折线柱状图",
        },
        {
          value: "1",
          label: "折线图",
        },
        {
          value: "2",
          label: "曲线图",
        },
        {
          value: "3",
          label: "堆叠折线柱状图",
        },
        {
          value: "4",
          label: "多饼图",
        },
        {
          value: "5",
          label: "渐变色柱状图",
        },
        {
          value: "6",
          label: "背景折线图",
        },
        {
          value: "7",
          label: "早晚高峰折线图",
        },
      ],
      cityList1: [
        {
          value: "0",
          label: "地下停车场",
          data: [
            {
              value: "0",
              label: "固定数",
            },
            {
              value: "1",
              label: "临停数",
            },
          ],
        },
        {
          value: "1",
          label: "露天停车场",
          data: [
            {
              value: "2",
              label: "固定率",
            },
            {
              value: "3",
              label: "临停率",
            },
          ],
        },
      ],

      model1: "",
      model2: "",
      model3: "",
      show: [false, false, false, false, false, false, false, false],
      chartdata: [],
    };
  },
  created() {},
  props: {
    ind: {},
  },
  watch: {
    chartdata() {
      this.handleGetData1();
      this.handEcharts();
      this.handEcharts1();
      this.handEcharts2();
      this.handEcharts3();
      this.handEcharts4();
      this.handleSetVisitChart1();
      this.handleSetVisitChart2();
      this.handleSetVisitChart();
    },
    model1() {
      for (let i = 0; i < 9; i++) {
        if (this.model1 == i) {
          this.show[i] = true;
        } else {
          this.show[i] = false;
        }
      }
    },
    model2() {
      this.cityList1.map((res) => {
        if (res.value == this.model2) {
          this.citylist2 = res.data;
        }
      });
    },
    model3() {
      if (this.model3) {
        echarts1(this.model3).then((res) => {
          this.chartdata = res;
        });
      }
    },
  },
  mounted() {
    this.model1 = String(this.ind);
    this.model2 = "0";
    this.model3 = "0";
    this.handleGetData1();
    this.handEcharts();
    this.handEcharts1();
    this.handEcharts2();
    this.handEcharts3();
    this.handEcharts4();
    this.handleSetVisitChart1();
    this.handleSetVisitChart2();
    this.handleSetVisitChart();
  },
  methods: {
    optionclick1() {},
    optionclick2() {
      // console.log(this.model3);
      // this.$emit("child-event2", this.model3);
      // this.$emit("child-index", "下标");
    },
    click() {
      mybus.$emit("msg", "传的值收到了");
    },
    handEcharts() {
      this.Myecharts = echarts.init(this.$refs.echarts);
      var colors = ["#5793f3", "#d14a61", "#675bba"];
      var option = {
        background: "black",
        color: colors,
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
          },
        },
        grid: {
          right: "20%",
        },
        toolbox: {
          feature: {
            dataView: { show: true, readOnly: false },
            // restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        legend: {
          data: ["蒸发量", "降水量", "平均温度"],
        },
        xAxis: [
          {
            type: "category",
            axisTick: {
              alignWithLabel: true,
            },
            data: this.chartdata[0].name,
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "蒸发量",
            min: 0,
            // max: 250,
            position: "right",
            axisLine: {
              lineStyle: {
                color: colors[0],
              },
            },
            axisLabel: {
              formatter: "{value} ml",
            },
          },
          {
            type: "value",
            name: "降水量",
            min: 0,
            // max: 250,
            position: "right",
            offset: 80,
            axisLine: {
              lineStyle: {
                color: colors[1],
              },
            },
            axisLabel: {
              formatter: "{value} ml",
            },
          },
          {
            type: "value",
            name: "温度",
            min: 0,
            // max: 25,
            position: "left",
            axisLine: {
              lineStyle: {
                color: colors[2],
              },
            },
            axisLabel: {
              formatter: "{value} °C",
            },
          },
        ],
        series: [
          {
            name: "蒸发量",
            type: "bar",
            data: this.chartdata[0].data1,
          },
          {
            name: "降水量",
            type: "bar",
            yAxisIndex: 1,
            data: this.chartdata[0].data2,
          },
          {
            name: "平均温度",
            type: "line",
            yAxisIndex: 2,
            data: this.chartdata[0].data3,
          },
        ],
      };
      this.Myecharts.setOption(option);
    },
    handEcharts4() {
      echartspie().then((res) => {
        // console.log(res[0].name);
        let myChart = echarts.init(this.$refs.echarts4);
        myChart.setOption({
          backgroundColor: "#f7f7f7", //背景颜色
          tooltip: {
            show: true,
            formatter: "{a} <br/>{b} : {c} ",
          },
          color: ["#339CD1", "#FE8463", "#9BCA63", "#FAD860"],
          legend: {
            x: "center",
            data: [res[0].name, res[1].name, res[2].name],
          },
          toolbox: {
            show: false,
            feature: {
              mark: { show: true },
              dataView: { show: true, readOnly: false },
              restore: { show: true },
              saveAsImage: { show: true },
            },
          },
          calculable: false,
          series: [
            {
              name: "1",
              type: "pie",
              center: res[0].position,
              radius: res[0].size,
              data: [res[0]],
              itemStyle: {
                //系列级个性化
                normal: {
                  // color: function(params) {
                  //   var colorList = ["#9BCA63", "#FAD860"];
                  //   return colorList[params.dataIndex];
                  // },
                  labelLine: {
                    //饼图不显示线条
                    length: 2,
                    show: false,
                  },
                  label: {
                    //饼图不显示文字
                    show: true,
                    color: "white",
                    position: "center", //饼图图上显示百分比
                    formatter: function (params) {
                      return params.value + "个";
                    },
                    textStyle: {
                      fontSize: 14,
                    },
                  },
                },
              },
            },
            {
              name: "2",
              type: "pie",
              center: res[1].position,
              radius: res[1].size,
              data: [res[1]],
              itemStyle: {
                //系列级个性化
                normal: {
                  // color: function(params) {
                  //   var colorList = [
                  //     "#339CD1",
                  //     "#FE8463",
                  //     "#9BCA63",
                  //     "#FAD860"
                  //   ];
                  //   return colorList[params.dataIndex];
                  // },
                  labelLine: {
                    //饼图不显示线条
                    length: 2,
                    show: false,
                  },
                  label: {
                    //饼图不显示文字
                    show: true,
                    color: "white",
                    position: "center", //饼图图上显示百分比
                    formatter: function (params) {
                      return params.value;
                    },
                    textStyle: {
                      fontSize: 14,
                    },
                  },
                },
              },
            },
            {
              name: "3",
              type: "pie",
              center: res[2].position,
              radius: res[2].size,
              data: [res[2]],
              itemStyle: {
                //系列级个性化
                normal: {
                  // color: function(params) {
                  //   var colorList = ["#FE8463", "#9BCA63", "#FAD860"];
                  //   return colorList[params.dataIndex];
                  // },
                  labelLine: {
                    //饼图不显示线条
                    length: 2,
                    show: false,
                  },
                  label: {
                    //饼图不显示文字
                    show: true,
                    color: "white",
                    position: "center", //饼图图上显示百分比
                    formatter: function (params) {
                      return params.value;
                    },
                    textStyle: {
                      fontSize: 14,
                    },
                  },
                },
              },
            },
          ],
        });
      });
    },
    handEcharts1() {
      var colors = ["#5793f3", "#d14a61", "#675bba"];
      var myecharts1 = echarts.init(this.$refs.echarts1);
      var option = {
        color: colors,

        tooltip: {
          trigger: "none",
          axisPointer: {
            type: "cross",
          },
        },
        legend: {
          data: ["2015 降水量", "2016 降水量"],
        },
        grid: {
          top: 70,
          bottom: 50,
        },
        xAxis: [
          {
            type: "category",
            axisTick: {
              alignWithLabel: true,
            },
            axisLine: {
              onZero: false,
              lineStyle: {
                color: colors[1],
              },
            },
            axisPointer: {
              label: {
                formatter: function (params) {
                  return (
                    "降水量  " +
                    params.value +
                    (params.seriesData.length
                      ? "：" + params.seriesData[0].data
                      : "")
                  );
                },
              },
            },
            data: this.chartdata[0].name,
          },
          {
            type: "category",
            axisTick: {
              alignWithLabel: true,
            },
            axisLine: {
              onZero: false,
              lineStyle: {
                color: colors[0],
              },
            },
            axisPointer: {
              label: {
                formatter: function (params) {
                  return (
                    "降水量  " +
                    params.value +
                    (params.seriesData.length
                      ? "：" + params.seriesData[0].data
                      : "")
                  );
                },
              },
            },
            data: this.chartdata[0].name,
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "2015 降水量",
            type: "line",
            xAxisIndex: 1,
            smooth: true,
            data: this.chartdata[0].data1,
          },
          {
            name: "2016 降水量",
            type: "line",
            smooth: true,
            data: this.chartdata[0].data2,
          },
        ],
      };
      myecharts1.setOption(option);
    },
    handEcharts2() {
      var myChart = echarts.init(this.$refs.echarts2);
      let data = mock.data;
      myChart.setOption({
        title: {
          text: "Beijing AQI",
        },
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          data: data.map(function (item) {
            return item[0];
          }),
        },
        yAxis: {
          splitLine: {
            show: false,
          },
        },
        toolbox: {
          left: "center",
          feature: {
            dataZoom: {
              yAxisIndex: "none",
            },
            restore: {},
            saveAsImage: {},
          },
        },
        dataZoom: [
          {
            startValue: "2014-06-01",
          },
          {
            type: "inside",
          },
        ],
        visualMap: {
          top: 10,
          right: 10,
          pieces: [
            {
              gt: 0,
              lte: 50,
              color: "#096",
            },
            {
              gt: 50,
              lte: 100,
              color: "#ffde33",
            },
            {
              gt: 100,
              lte: 150,
              color: "#ff9933",
            },
            {
              gt: 150,
              lte: 200,
              color: "#cc0033",
            },
            {
              gt: 200,
              lte: 300,
              color: "#660099",
            },
            {
              gt: 300,
              color: "#7e0023",
            },
          ],
          outOfRange: {
            color: "#999",
          },
        },
        series: {
          name: "Beijing AQI",
          type: "line",
          data: data.map(function (item) {
            return item[1];
          }),
          markLine: {
            silent: true,
            data: [
              {
                yAxis: 50,
              },
              {
                yAxis: 100,
              },
              {
                yAxis: 150,
              },
              {
                yAxis: 200,
              },
              {
                yAxis: 300,
              },
            ],
          },
        },
      });
    },
    handEcharts3() {
      var Mychart = echarts.init(this.$refs.echarts3);
      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        legend: {
          data: [
            "直接访问",
            "邮件营销",
            "联盟广告",
            "视频广告",
            "搜索引擎",
            "百度",
            "谷歌",
            "必应",
            "其他",
            "平均温度",
          ],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "直接访问",
            type: "bar",
            data: [320, 332, 301, 334, 390, 330, 320],
          },
          {
            name: "邮件营销",
            type: "bar",
            stack: "广告",
            data: [120, 132, 101, 134, 90, 230, 210],
          },
          {
            name: "联盟广告",
            type: "bar",
            stack: "广告",
            data: [220, 182, 191, 234, 290, 330, 310],
          },
          {
            name: "视频广告",
            type: "bar",
            stack: "广告",
            data: [150, 232, 201, 154, 190, 330, 410],
          },
          {
            name: "搜索引擎",
            type: "bar",
            data: [862, 1018, 964, 1026, 1679, 1600, 1570],
            markLine: {
              lineStyle: {
                type: "dashed",
              },
              data: [[{ type: "min" }, { type: "max" }]],
            },
          },
          {
            name: "百度",
            type: "bar",
            barWidth: 5,
            stack: "搜索引擎",
            data: [620, 732, 701, 734, 1090, 1130, 1120],
          },
          {
            name: "谷歌",
            type: "bar",
            stack: "搜索引擎",
            data: [120, 132, 101, 134, 290, 230, 220],
          },
          {
            name: "必应",
            type: "bar",
            stack: "搜索引擎",
            data: [60, 72, 71, 74, 190, 130, 110],
          },
          {
            name: "其他",
            type: "bar",
            stack: "搜索引擎",
            data: [62, 82, 91, 84, 109, 110, 120],
          },
          {
            name: "平均温度",
            type: "line",
            data: [300, 600, 900, 1500, 1800, 1000, 1700],
          },
        ],
      };
      Mychart.setOption(option);
    },
    handleSetVisitChart() {
      this.visitChart = echarts.init(this.$refs.visitChart);
      this.visitChart.setOption({
        xAxis: {
          type: "category",
          axisLine: {
            lineStyle: {
              color: "#D7DDE4",
            },
          },
          axisTick: {
            alignWithLabel: true,
            lineStyle: {
              color: "#D7DDE4",
            },
          },
          axisLabel: {
            textStyle: {
              color: "#7F8B9C",
            },
          },
          splitLine: {
            show: false,
            lineStyle: {
              color: "#F5F7F9",
            },
          },
          data: this.chartdata[0].name,
        },
        yAxis: {
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            textStyle: {
              color: "#7F8B9C",
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "#F5F7F9",
            },
          },
          type: "value",
        },
        legend: {
          data: ["测试", "测试2", "测试3", "Wetland"],
          x: "center",
        },
        series: [
          {
            data: this.chartdata[0].data1,
            type: "bar",
            name: "测试",
            tooltip: true,
            smooth: true,
            symbol: "none",
            itemStyle: {
              normal: {
                barBorderRadius: [3, 3, 0, 0],
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "red",
                  },
                  {
                    offset: 0.5,
                    color: "orange",
                  },
                  {
                    offset: 1,
                    color: "yellow",
                  },
                ]),
              },
            },
          },
          {
            data: this.chartdata[0].data2,
            name: "测试2",
            type: "bar",
          },
          {
            data: this.chartdata[0].data3,
            name: "测试3",
            type: "bar",
          },
        ],
        color: ["#1495EB", "#00CC66", "#F9D249", "#ff9900", "#9860DF"],
        grid: {
          left: 16,
          right: 25,
          bottom: 5,
          top: 20,
          containLabel: true,
        },
        tooltip: {
          trigger: "axis",
        },
      });
    },
    handleGetData1() {
      const date = new Date().getTime();
      this.xData = this.chartdata[0].name;
      this.y1Data = this.chartdata[0].data1;
      this.y2Data = this.chartdata[0].data2;
    },
    handleSetVisitChart1() {
      this.visitChart1 = echarts.init(this.$refs.visitChart1);
      this.visitChart1.setOption({
        xAxis: {
          type: "category",
          axisLine: {
            lineStyle: {
              color: "#D7DDE4",
            },
          },
          axisTick: {
            alignWithLabel: true,
            lineStyle: {
              color: "#D7DDE4",
            },
          },
          axisLabel: {
            textStyle: {
              color: "#7F8B9C",
            },
          },
          splitLine: {
            show: false,
            lineStyle: {
              color: "#F5F7F9",
            },
          },
          data: this.xData,
          boundaryGap: false,
        },
        yAxis: {
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            textStyle: {
              color: "#7F8B9C",
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "#F5F7F9",
            },
          },
          type: "value",
        },
        legend: {
          data: ["浏览量（PV）", "访客数（UV）"],
          x: "right",
        },
        series: [
          {
            data: this.y1Data,
            name: "浏览量（PV）",
            type: "line",
            tooltip: true,
            smooth: true,
            symbol: "none",
            areaStyle: {
              normal: {
                opacity: 0.2,
              },
            },
          },
          {
            data: this.y2Data,
            name: "访客数（UV）",
            type: "line",
            tooltip: true,
            smooth: true,
            symbol: "none",
            areaStyle: {
              normal: {
                opacity: 0.2,
              },
            },
          },
        ],
        color: ["#1495EB", "#00CC66", "#F9D249", "#ff9900", "#9860DF"],
        grid: {
          left: 20,
          right: 20,
          bottom: 20,
          top: 40,
          containLabel: true,
        },
        tooltip: {
          trigger: "axis",
        },
      });
    },
    handleSetVisitChart2() {
      this.visitChart2 = echarts.init(this.$refs.visitChart2);
      this.visitChart2.setOption({
        title: {
          text: "一天用电量分布",
          subtext: "纯属虚构",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
          },
        },
        toolbox: {
          show: true,
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: [
            "00:00",
            "01:15",
            "02:30",
            "03:45",
            "05:00",
            "06:15",
            "07:30",
            "08:45",
            "10:00",
            "11:15",
            "12:30",
            "13:45",
            "15:00",
            "16:15",
            "17:30",
            "18:45",
            "20:00",
            "21:15",
            "22:30",
            "23:45",
          ],
        },
        yAxis: {
          type: "value",
          axisLabel: {
            formatter: "{value} W",
          },
          axisPointer: {
            snap: true,
          },
        },
        visualMap: {
          show: false,
          dimension: 0,
          pieces: [
            {
              lte: 6,
              color: "green",
            },
            {
              gt: 6,
              lte: 8,
              color: "red",
            },
            {
              gt: 8,
              lte: 14,
              color: "green",
            },
            {
              gt: 14,
              lte: 17,
              color: "red",
            },
            {
              gt: 17,
              color: "green",
            },
          ],
        },
        series: [
          {
            name: "用电量",
            type: "line",
            smooth: true,
            data: [
              300,
              280,
              250,
              260,
              270,
              300,
              550,
              500,
              400,
              390,
              380,
              390,
              400,
              500,
              600,
              750,
              800,
              700,
              600,
              400,
            ],
            markArea: {
              data: [
                [
                  {
                    name: "早高峰",
                    xAxis: "07:30",
                  },
                  {
                    xAxis: "10:00",
                  },
                ],
                [
                  {
                    name: "晚高峰",
                    xAxis: "17:30",
                  },
                  {
                    xAxis: "21:15",
                  },
                ],
              ],
            },
          },
        ],
      });
    },
    handlePrint() {
      window.scrollTo(0, 0);
      this.$Print(this.$refs.ech, {
        beforeStart: function () {
          // console.log("打印前的输出");
          // alert("打印前的输出");
        },
        finish: function () {
          // console.log("打印后的输出");
          // alert("打印后的输出");
        },
        backgroundColor: "white",
      });
    },
  },
};
</script>
<style scoped>
.box {
  width: 100%;
  /* height: 700px; */
  border: 1px solid red;
}
</style>