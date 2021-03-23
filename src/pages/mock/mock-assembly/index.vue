<template>
  <div class="box">
    <div class="title">{{data}}</div>
    <div ref="visitChart" v-height="240"></div>
    <div ref="visitChart1" v-height="400"></div>
    <div ref="visitChart2" v-height="1200"></div>
    <div ref="visitChart3" v-height="400"></div>
    <div ref="echarts4" v-height="600"></div>
    <!-- <Button @click="handleResize" type="success">刷新</Button> -->
  </div>
</template>
<script>
import echarts from "echarts";
import echartsLiquidfill from "echarts-liquidfill";
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
      data: "组件模拟数据",
      xData: [],
      y1Data: [],
      y2Data: [],
      option: {},
      number: 0,
    };
  },
  beforeDestroy() {
    if (this.visitChart) {
      this.visitChart.dispose();
      this.visitChart = null;
    }
  },
  created() {},
  mounted() {
    this.handleGetData1();
    this.handleSetVisitChart1();
    this.handleSetVisitChart();
    this.handleSetVisitChart2();
    this.handleSetVisitChart3();
    this.handleResize();
    this.echarts4();
  },
  methods: {
    echarts4() {
      let myChart = echarts.init(this.$refs.echarts4);
      let option = {
        legend: {},
        tooltip: {
          trigger: "axis",
          showContent: true,
        },
        dataset: {
          source: [
            ["product", "2012", "2013", "2014", "2015", "2016", "2019"],
            ["卡车", 41.1, 30.4, 65.1, 53.3, 83.8, 98.7],
            ["轿车", 86.5, 92.1, 85.7, 83.1, 73.4, 55.1],
            ["货车", 24.1, 67.2, 79.5, 86.4, 65.2, 82.5],
            ["电车", 55.2, 67.1, 69.2, 72.4, 53.9, 39.1],
            ["卡车", 41.1, 30.4, 65.1, 53.3, 83.8, 98.7],
            ["轿车", 86.5, 92.1, 85.7, 83.1, 73.4, 55.1],
            ["货车", 24.1, 67.2, 79.5, 86.4, 65.2, 82.5],
            ["电车", 55.2, 67.1, 69.2, 72.4, 53.9, 39.1],
          ],
        },
        xAxis: { type: "category" },
        yAxis: {},
        grid: { top: "55%" },
        series: [
          { type: "line", smooth: true, seriesLayoutBy: "row" },
          { type: "line", smooth: true, seriesLayoutBy: "row" },
          { type: "line", smooth: true, seriesLayoutBy: "row" },
          { type: "line", smooth: true, seriesLayoutBy: "row" },
          {
            type: "bar",
            smooth: true,
            seriesLayoutBy: "row",
          },
          {
            type: "bar",
            smooth: true,
            seriesLayoutBy: "row",
          },
          {
            type: "bar",
            smooth: true,
            seriesLayoutBy: "row",
          },
          {
            type: "bar",
            smooth: true,
            seriesLayoutBy: "row",
          },
          {
            type: "pie",
            id: "pie",
            radius: "30%",
            center: ["70%", "25%"],
            label: {
              formatter: "{b}: {@2012} ({d}%)",
            },
            encode: {
              itemName: "product",
              value: "2012",
              tooltip: "2012",
            },
          },
          {
            type: "pie",
            id: "pies",
            radius: "30%",
            center: ["30%", "25%"],
            label: {
              formatter: "{b}: {@2012} ({d}%)",
            },
            encode: {
              itemName: "product",
              value: "2012",
              tooltip: "2012",
            },
          },
        ],
      };

      myChart.on("updateAxisPointer", function (event) {
        // console.log(event);
        var xAxisInfo = event.axesInfo[0];
        if (xAxisInfo) {
          var dimension = xAxisInfo.value + 1;
          myChart.setOption({
            // tooltip: {
            //   trigger: "axis",
            //   showContent: true,
            //   formatter: "{b}: {@[" + dimension + "]} ({d}%)",
            // },
            series: {
              id: "pie",
              label: {
                formatter: "{b}: {@[" + dimension + "]} ({d}%)",
              },
              // tooltip: {
              //   formatter: "{b}: {@[" + dimension + "]} ({d}%)",
              // },
              encode: {
                value: dimension,
                tooltip: dimension,
              },
            },
          });

          myChart.setOption({
            // tooltip: {
            //   trigger: "axis",
            //   showContent: true,
            //   formatter: "{b}: {@[" + dimension + "]} ({d}%)",
            // },
            series: {
              id: "pies",
              label: {
                formatter: "{b}: {@[" + dimension + "]} ({d}%)",
              },
              // tooltip: {
              //   formatter: "{b}: {@[" + dimension + "]} ({d}%)",
              // },
              encode: {
                value: dimension,
                tooltip: dimension,
              },
            },
          });
        }
      });
      myChart.setOption(option);
    },
    handleSetVisitChart3() {
      let that = this;
      this.visitChart3 = echarts.init(this.$refs.visitChart3);
      var option = {
        backgroundColor: "black",
        title: {
          //标题
          text: "水球图",
          textStyle: {
            //标题的样式
            color: "#03dbdb", //字体颜色
            // fontFamily: "Microsoft YaHei", //字体
            align: "center", //文字的水平方式
            verticalAlign: "middle", //文字的垂直方式
            position: "inside",
            baseline: "middle",
            fontSize: "30",
          },
          left: "center", //定位
          // top: "30%"
          // backgroundColor: "#03dbdb" //文字区域的背景颜色
        },
        series: [
          {
            type: "liquidFill", //类型
            data: [0.6], //数据是个数组 数组的每一项的值是0-1
            label: {
              normal: {
                formatter: "60%" + "\n" + "全球水量占比",
                textStyle: {
                  color: "white",
                  fontSize: "40",
                },
              },
            },
            outline: {
              //show: true , //是否显示轮廓 布尔值
              borderDistance: 0, //外部轮廓与图表的距离 数字
              itemStyle: {
                //borderColor:'rgba(255,0,0,0.09)', //边框的颜色
                borderWidth: 0, //边框的宽度
                //shadowBlur: 5 , //外部轮廓的阴影范围 一旦设置了内外都有阴影
                //shadowColor: '#000' //外部轮廓的阴影颜色
              },
            },

            backgroundStyle: {
              color: "aqua", //图表的背景颜色
              //borderWidth: '10',//图表的边框宽度
              //borderColor: '#000',//图表的边框颜色
              // itemStyle: {
              //   shadowBlur: 100, //设置无用
              //   shadowColor: "#f60", //设置无用
              //   opacity: 1 //设置无用
              // }
            },

            itemStyle: {
              opacity: 1, //波浪的透明度
              shadowBlur: 0, //波浪的阴影范围
              // shadowColor: "#f60" //阴影颜色
            },

            emphasis: {
              itemStyle: {
                opacity: 1, //鼠标经过波浪颜色的透明度
              },
            },

            color: ["#1495Ea", "rgba(255,0,0,0.3)", "rgba(255,0,0,1)"], //水波的颜色 对应的是data里面值
            shape: "circle", //水填充图的形状 circle默认圆形  rect圆角矩形  triangle三角形  diamond菱形  pin水滴状 arrow箭头状  还可以是svg的path
            center: ["50%", "50%"], //图表相对于盒子的位置 第一个是水平的位置 第二个是垂直的值 默认是[50%,50%]是在水平和垂直方向居中 可以设置百分比 也可以设置具体值
            radius: "80%", //图表的大小 值是圆的直径 可以是百分比 也可以是具体值 100%则占满整个盒子 默认是40%; 百分比下是根据宽高最小的一个为参照依据
            amplitude: 20, //振幅 是波浪的震荡幅度 可以取具体的值 也可以是百分比 百分比下是按图标的直径来算
            waveLength: "80%", //波的长度 可以是百分比也可以是具体的像素值  百分比下是相对于直径的 取得越大波浪的起伏越小
            phase: 0, //波的相位弧度 默认情况下是自动
            // period: (value, index) => {
            //   //控制波的移动速度 可以是函数 也可以是数字 两个参数  value 是data数据里面的值 index 是data值的索引

            //   return index * 300;
            // }
            direction: "right", //波移动的速度 两个参数  left 从右往左 right 从左往右
            waveAnimation: true, //控制波动画的开关  值是布尔值 false 是关闭动画 true 是开启动画 也是默认值
            animationEasing: "linear", //初始动画
            animationEasingUpdate: "quarticInOut", //数据更新的动画效果
            animationDuration: 3000, //初始动画的时长，支持回调函数，可以通过每个数据返回不同的 delay 时间实现更绚丽的初始动画效果
            animationDurationUpdate: 300, //数据更新动画的时长
          },
        ],
        // backgroundColor: "rgba(255,0,0,0.1)" //容器背景颜色
      };
      that.visitChart3.setOption(option);
    },
    handleSetVisitChart2() {
      this.option = {
        backgroundColor: "#1b1b1b",
        tooltip: {
          formatter: "{a} <br/>{c} {b}",
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        animation: true,
        animationDurationUpdate: 100,
        series: [
          {
            name: "速度",
            type: "gauge",
            min: 0,
            max: 220,
            splitNumber: 11,
            radius: "50%",
            axisLine: {
              // 坐标轴线
              lineStyle: {
                // 属性lineStyle控制线条样式
                color: [
                  [0.09, "lime"],
                  [0.82, "#1e90ff"],
                  [1, "#ff4500"],
                ],
                width: 3,
                shadowColor: "#fff", //默认透明
                shadowBlur: 10,
              },
            },
            axisLabel: {
              // 坐标轴小标记
              fontWeight: "bolder",
              color: "#fff",
              shadowColor: "#fff", //默认透明
              shadowBlur: 10,
            },
            axisTick: {
              // 坐标轴小标记
              length: 15, // 属性length控制线长
              lineStyle: {
                // 属性lineStyle控制线条样式
                color: "auto",
                shadowColor: "#fff", //默认透明
                shadowBlur: 10,
              },
            },
            splitLine: {
              // 分隔线
              length: 25, // 属性length控制线长
              lineStyle: {
                // 属性lineStyle（详见lineStyle）控制线条样式
                width: 3,
                color: "#fff",
                shadowColor: "#fff", //默认透明
                shadowBlur: 10,
              },
            },
            pointer: {
              // 分隔线
              shadowColor: "#fff", //默认透明
              shadowBlur: 5,
            },
            title: {
              textStyle: {
                // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                fontWeight: "bolder",
                fontSize: 20,
                fontStyle: "italic",
                color: "#fff",
                shadowColor: "#fff", //默认透明
                shadowBlur: 10,
              },
            },
            detail: {
              backgroundColor: "rgba(30,144,255,0.8)",
              borderWidth: 1,
              borderColor: "#fff",
              shadowColor: "#fff", //默认透明
              shadowBlur: 5,
              offsetCenter: [0, "50%"], // x, y，单位px
              textStyle: {
                // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                fontWeight: "bolder",
                color: "#fff",
              },
            },
            data: [{ value: 40, name: "km/h" }],
          },
          {
            name: "转速",
            type: "gauge",
            center: ["25%", "55%"], // 默认全局居中
            radius: "30%",
            min: 0,
            max: 7,
            endAngle: 45,
            splitNumber: 7,
            axisLine: {
              // 坐标轴线
              lineStyle: {
                // 属性lineStyle控制线条样式
                color: [
                  [0.29, "lime"],
                  [0.86, "#1e90ff"],
                  [1, "#ff4500"],
                ],
                width: 2,
                shadowColor: "#fff", //默认透明
                shadowBlur: 10,
              },
            },
            axisLabel: {
              // 坐标轴小标记
              fontWeight: "bolder",
              color: "#fff",
              shadowColor: "#fff", //默认透明
              shadowBlur: 10,
            },
            axisTick: {
              // 坐标轴小标记
              length: 12, // 属性length控制线长
              lineStyle: {
                // 属性lineStyle控制线条样式
                color: "auto",
                shadowColor: "#fff", //默认透明
                shadowBlur: 10,
              },
            },
            splitLine: {
              // 分隔线
              length: 20, // 属性length控制线长
              lineStyle: {
                // 属性lineStyle（详见lineStyle）控制线条样式
                width: 3,
                color: "#fff",
                shadowColor: "#fff", //默认透明
                shadowBlur: 10,
              },
            },
            pointer: {
              width: 5,
              shadowColor: "#fff", //默认透明
              shadowBlur: 5,
            },
            title: {
              offsetCenter: [0, "-30%"], // x, y，单位px
              textStyle: {
                // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                fontWeight: "bolder",
                fontStyle: "italic",
                color: "#fff",
                shadowColor: "#fff", //默认透明
                shadowBlur: 10,
              },
            },
            detail: {
              //backgroundColor: 'rgba(30,144,255,0.8)',
              // borderWidth: 1,
              borderColor: "#fff",
              shadowColor: "#fff", //默认透明
              shadowBlur: 5,
              width: 80,
              height: 30,
              offsetCenter: [25, "20%"], // x, y，单位px
              textStyle: {
                // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                fontWeight: "bolder",
                color: "#fff",
              },
            },
            data: [{ value: 1.5, name: "x1000 r/min" }],
          },
          {
            name: "油表",
            type: "gauge",
            center: ["75%", "50%"], // 默认全局居中
            radius: "30%",
            min: 0,
            max: 2,
            startAngle: 135,
            endAngle: 45,
            splitNumber: 2,
            axisLine: {
              // 坐标轴线
              lineStyle: {
                // 属性lineStyle控制线条样式
                color: [
                  [0.2, "lime"],
                  [0.8, "#1e90ff"],
                  [1, "#ff4500"],
                ],
                width: 2,
                shadowColor: "#fff", //默认透明
                shadowBlur: 10,
              },
            },
            axisTick: {
              // 坐标轴小标记
              length: 12, // 属性length控制线长
              lineStyle: {
                // 属性lineStyle控制线条样式
                color: "auto",
                shadowColor: "#fff", //默认透明
                shadowBlur: 10,
              },
            },
            axisLabel: {
              fontWeight: "bolder",
              color: "#fff",
              shadowColor: "#fff", //默认透明
              shadowBlur: 10,
              formatter: function (v) {
                switch (v + "") {
                  case "0":
                    return "E";
                  case "1":
                    return "Gas";
                  case "2":
                    return "F";
                }
              },
            },
            splitLine: {
              // 分隔线
              length: 15, // 属性length控制线长
              lineStyle: {
                // 属性lineStyle（详见lineStyle）控制线条样式
                width: 3,
                color: "#fff",
                shadowColor: "#fff", //默认透明
                shadowBlur: 10,
              },
            },
            pointer: {
              width: 2,
              shadowColor: "#fff", //默认透明
              shadowBlur: 5,
            },
            title: {
              show: false,
            },
            detail: {
              show: false,
            },
            data: [{ value: 0.5, name: "gas" }],
          },
          {
            name: "水表",
            type: "gauge",
            center: ["75%", "50%"], // 默认全局居中
            radius: "30%",
            min: 0,
            max: 2,
            startAngle: 315,
            endAngle: 225,
            splitNumber: 2,
            axisLine: {
              // 坐标轴线
              lineStyle: {
                // 属性lineStyle控制线条样式
                color: [
                  [0.2, "lime"],
                  [0.8, "#1e90ff"],
                  [1, "#ff4500"],
                ],
                width: 2,
                shadowColor: "#fff", //默认透明
                shadowBlur: 10,
              },
            },
            axisTick: {
              // 坐标轴小标记
              show: false,
            },
            axisLabel: {
              fontWeight: "bolder",
              color: "#fff",
              shadowColor: "#fff", //默认透明
              shadowBlur: 10,
              formatter: function (v) {
                switch (v + "") {
                  case "0":
                    return "H";
                  case "1":
                    return "Water";
                  case "2":
                    return "C";
                }
              },
            },
            splitLine: {
              // 分隔线
              length: 15, // 属性length控制线长
              lineStyle: {
                // 属性lineStyle（详见lineStyle）控制线条样式
                width: 3,
                color: "#fff",
                shadowColor: "#fff", //默认透明
                shadowBlur: 10,
              },
            },
            pointer: {
              width: 2,
              shadowColor: "#fff", //默认透明
              shadowBlur: 5,
            },
            title: {
              show: false,
            },
            detail: {
              show: false,
            },
            data: [{ value: 0.5, name: "gas" }],
          },
        ],
      };
      this.visitChart2 = echarts.init(this.$refs.visitChart2);
      let that = this;
      that.visitChart2.setOption(that.option);
      //   setInterval(function() {
      //     // console.log(that.option);
      //     that.option.series[0].data[0].value =
      //       (Math.random() * 100).toFixed(2) - 0;
      //     that.option.series[1].data[0].value =
      //       (Math.random() * 7).toFixed(2) - 0;
      //     that.option.series[2].data[0].value =
      //       (Math.random() * 2).toFixed(2) - 0;
      //     that.option.series[3].data[0].value =
      //       (Math.random() * 2).toFixed(2) - 0;
      //     that.visitChart2.setOption(that.option);
      //   }, 3000);
      function test() {
        var test2 = setInterval(() => {
          that.option.series[0].data[0].value += 1;
          that.option.series[1].data[0].value = (
            (that.option.series[0].data[0].value += 1) / 30
          ).toFixed(1);
          that.option.series[2].data[0].value =
            (Math.random() * 2).toFixed(2) - 0;
          that.option.series[3].data[0].value =
            (Math.random() * 2).toFixed(2) - 0;
          if (that.option.series[1].data[0].value >= 7) {
            that.option.series[1].data[0].value = 7.0;
          }
          if (that.option.series[0].data[0].value >= 220) {
            that.option.animationDurationUpdate = 4000;
            that.option.series[0].data[0].value = 0;
            that.option.series[1].data[0].value = 0;
            // console.log("清除定时器");
            clearInterval(test2);
            tests();
          }
          that.visitChart2.setOption(that.option);
        }, 100);
      }
      function tests() {
        setTimeout(() => {
          //   console.log("启用定时器");
          that.option.animationDurationUpdate = 0;
          test();
        }, 4000);
      }
      test();
    },
    handleGetData1() {
      const date = new Date().getTime();
      this.xData = [
        getDate(date),
        getDate(date - 60000 * 5),
        getDate(date - 60000 * 10),
        getDate(date - 60000 * 15),
        getDate(date - 60000 * 20),
        getDate(date - 60000 * 25),
        getDate(date - 60000 * 30),
        getDate(date - 60000 * 35),
        getDate(date - 60000 * 40),
        getDate(date - 60000 * 45),
        getDate(date - 60000 * 50),
      ].reverse();
      this.y1Data = [45, 169, 400, 285, 316, 148, 150, 234, 158, 100, 266];
      this.y2Data = [15, 39, 152, 94, 102, 86, 39, 38, 95, 30, 86];
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
    handleResize() {
      this.visitChart.resize();
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
          data: [
            "1月",
            "2月",
            "3月",
            "4月",
            "5月",
            "6月",
            "7月",
            "8月",
            "9月",
            "10月",
            "11月",
            "12月",
          ],
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
            data: [
              9728,
              4578,
              12768,
              4982,
              9665,
              5489,
              3288,
              13422,
              6753,
              7463,
              8162,
              6545,
            ],
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
            data: [
              9728,
              4578,
              12768,
              4982,
              9665,
              5489,
              3288,
              13422,
              6753,
              7463,
              8162,
              6545,
            ],
            name: "测试2",
            type: "bar",
          },
          {
            data: [
              9728,
              4578,
              12768,
              4982,
              9665,
              5489,
              3288,
              13422,
              6753,
              7463,
              8162,
              6545,
            ],
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
  },
};
</script>
<style scoped>
.box {
  width: 100%;
  height: 93.2vh;
  /* background: aquamarine; */
}
.title {
  color: aquamarine;
  font-size: 50px;
  text-align: center;
  /* 为文本元素提供渐变背景 */
  background-image: -webkit-linear-gradient(bottom, red, #fd8403, yellow);
  /* 使用透明颜色填充文本 */
  -webkit-background-clip: text;
  /* 用文本剪辑背景，用渐变背景作为颜色填充文本 */
  -webkit-text-fill-color: transparent;
}
</style>
