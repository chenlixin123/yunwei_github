<template>
  <div class="box">
    <div class="title" id="Anchor_props">分割线</div>
    <Divider orientation="left">Left Text</Divider>

    <div class="title">下拉菜单--嵌套再嵌套</div>
    <Dropdown @on-click="ss">
      <a href="javascript:void(0)">
        北京小吃
        <Icon type="ios-arrow-down"></Icon>
      </a>
      <DropdownMenu slot="list">
        <DropdownItem name="1">驴打滚</DropdownItem>
        <DropdownItem name="2">炸酱面</DropdownItem>
        <DropdownItem name="3">豆汁儿</DropdownItem>
        <Dropdown placement="right-start">
          <DropdownItem>
            北京烤鸭
            <Icon type="ios-arrow-forward"></Icon>
          </DropdownItem>
          <DropdownMenu slot="list">
            <Dropdown placement="right-start">
              <DropdownItem>
                北京烤鸭分点
                <Icon type="ios-arrow-forward"></Icon>
              </DropdownItem>
              <DropdownMenu slot="list">
                <DropdownItem name="4">挂炉烤鸭</DropdownItem>
                <DropdownItem name="5">焖炉烤鸭</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </DropdownMenu>
        </Dropdown>
        <DropdownItem name="6">冰糖葫芦</DropdownItem>
      </DropdownMenu>
    </Dropdown>

    <div class="title">下拉框</div>
    <Select style="width:200px" @on-change="dd">
      <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
    </Select>

    <div class="title">page分页</div>
    <Page
      :total="100"
      show-total
      show-elevator
      :page-size="1"
      @on-change="pages"
      :current="number"
    />

    <div class="title">Switch开关</div>
    <Switch v-model="switch1" @on-change="change" size="large">
      <span slot="open">开启</span>
      <span slot="close">关闭</span>
    </Switch>

    <div class="title">AutoComplete 自动完成</div>
    <AutoComplete
      v-model="value2"
      @on-change="handleSearch2"
      placeholder="input here"
      style="width:200px"
    >
      <Option v-for="item in data2" :value="item" :key="item">{{ item }}</Option>
    </AutoComplete>

    <div class="title">Slider 滑块</div>
    <Slider v-model="value8" show-input></Slider>
    <Slider v-model="value6" :step="10" show-stops></Slider>

    <div class="title">DatePicker 日期选择器</div>
    <DatePicker
      type="daterange"
      split-panels
      placeholder="Select date"
      style="width: 200px"
      @on-change="handleChange"
      :options="options3"
    ></DatePicker>

    <div class="title">TimePicker 时间选择器</div>
    <TimePicker
      type="timerange"
      placement="bottom-end"
      placeholder="Select time"
      style="width: 168px"
      @on-change="handleChange"
    ></TimePicker>

    <div class="title">Collapse 折叠面板</div>
    <Collapse v-model="value1">
      <Panel name="1">
        史蒂夫·乔布斯
        <p slot="content">史蒂夫·乔布斯（Steve Jobs），1955年2月24日生于美国加利福尼亚州旧金山，美国发明家、企业家、美国苹果公司联合创办人。</p>
      </Panel>
      <Panel name="2">
        斯蒂夫·盖瑞·沃兹尼亚克
        <p
          slot="content"
        >斯蒂夫·盖瑞·沃兹尼亚克（Stephen Gary Wozniak），美国电脑工程师，曾与史蒂夫·乔布斯合伙创立苹果电脑（今之苹果公司）。斯蒂夫·盖瑞·沃兹尼亚克曾就读于美国科罗拉多大学，后转学入美国著名高等学府加州大学伯克利分校（UC Berkeley）并获得电机工程及计算机（EECS）本科学位（1987年）。</p>
      </Panel>
      <Panel name="3">
        乔纳森·伊夫
        <p
          slot="content"
        >乔纳森·伊夫是一位工业设计师，现任Apple公司设计师兼资深副总裁，英国爵士。他曾参与设计了iPod，iMac，iPhone，iPad等众多苹果产品。除了乔布斯，他是对苹果那些著名的产品最有影响力的人。</p>
      </Panel>
    </Collapse>

    <div class="title">Tabs 标签页</div>
    <Tabs value="1">
      <TabPane label="macOS" icon="logo-apple" name="1">标签一的内容</TabPane>
      <TabPane label="Windows" icon="logo-windows" name="2">标签二的内容</TabPane>
      <TabPane label="Linux" icon="logo-tux" name="3">标签三的内容</TabPane>
    </Tabs>

    <div class="title">Anchor 锚点</div>
    <Anchor show-ink :affix="true">
      <AnchorLink href="#basic_usage" title="Basic Usage" />
      <AnchorLink href="#static_position" title="Static Position" />
      <AnchorLink href="#API" title="API">
        <AnchorLink href="#Anchor_props" title="Anchor props" :scroll-offset="110" />
        <AnchorLink href="#Anchor_events" title="Anchor events" />
        <AnchorLink href="#AnchorLink_props" title="AnchorLink props" />
      </AnchorLink>
    </Anchor>

    <div class="title">Cascader 级联选择</div>
    <Cascader :data="data" trigger="hover" style="width: 300px"></Cascader>

    <div class="title">Steps 步骤条</div>
    <p>当前正在进行第 {{ current + 1 }} 步</p>
    <Steps :current="current">
      <Step title="步骤1"></Step>
      <Step title="步骤2"></Step>
      <Step title="步骤3"></Step>
      <Step title="步骤4"></Step>
    </Steps>
    <Button type="primary" @click="next">Next step</Button>

    <div class="title">LoadingBar 加载进度条</div>
    <Button @click="start">Start</Button>
    <Button @click="finish">Finish</Button>
    <Button @click="error">Error</Button>

    <div class="title">导入导出</div>
    <div>
      <Table border :columns="columns" :data="datas"></Table>
      <Upload
        ref="upload"
        action="/api/admin/biz/fixed/userinfo/batchSave"
        :before-upload="beforeUpload"
      >
        <Button icon="ios-cloud-upload-outline">选择文件</Button>
      </Upload>
      <span>{{file}}</span>
      <Button @click="top">上传</Button>
    </div>

    <div class="title">城市选择器</div>
    <div>
      <i-region v-model="value" placement="bottom-start" clearable />
    </div>
    <div>{{cc}}</div>
    <Button class="ivu-mbs" @click="coco">打印</Button>

    <div class="title">Transfer 穿梭框</div>
    <Transfer
      :data="data1"
      :target-keys="targetKeys1"
      :render-format="render1"
      @on-change="handleChange1"
    ></Transfer>
    <Button @click="positions">定位</Button>
    <label>
      关键词：
      <input v-model="keyword" />
    </label>
    <label>
      地区：
      <input v-model="location" />
    </label>
    <baidu-map :scroll-wheel-zoom="true" :center="{lng: lngs, lat: lats}" :zoom="12">
      <!-- 在右上角添加比例尺控件 -->
      <bm-scale anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-scale>
      <!-- 在右上角添加缩放控件 -->
      <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
      <!-- 在左上角添加地图类型控件 -->
      <bm-map-type
        :map-types="['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP']"
        anchor="BMAP_ANCHOR_TOP_LEFT"
      ></bm-map-type>
      <!-- 在右下角添加略缩图控件 -->
      <bm-overview-map anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :isOpen="true"></bm-overview-map>
      <!-- 在右下角添加定位控件 -->
      <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
      <!-- 左上角添加城市切换组件 -->
      <bm-city-list anchor="BMAP_ANCHOR_TOP_LEFT"></bm-city-list>
      <!-- 全景图组件 -->
      <bm-panorama anchor="BMAP_ANCHOR_BOTTOM_LEFT"></bm-panorama>
      <!-- <bm-marker
        :position="markerPoint"
        :dragging="true"
        animation="BMAP_ANIMATION_BOUNCE"
        :icon="{url: 'http://developer.baidu.com/map/jsdemo/img/fox.gif', size: {width: 300, height: 157}}"
      ></bm-marker>-->
      <!-- 标记点 -->
      <bm-marker
        :position="{lng: lngs, lat: lats}"
        :dragging="true"
        title="当前位置"
        animation="BMAP_ANIMATION_BOUNCE"
        @dragend="mark"
      ></bm-marker>
      <bm-view class="map"></bm-view>
      <bm-local-search
        :keyword="keyword"
        :auto-viewport="true"
        :location="location"
        :scroll-wheel-zoom="true"
      ></bm-local-search>
    </baidu-map>
    <!-- <div class="map" ref="allmap"></div> -->
  </div>
</template>
<script>
import url from "@/api/Administration";
import Axios from "axios";
export default {
  data() {
    return {
      lngs: 116.404,
      lats: 39.915,
      keyword: "百度",
      location: "北京",
      data1: this.getMockData(),
      targetKeys1: this.getTargetKeys(),
      dds: {
        ff: "",
      },
      cc: "",
      value: [],
      file: "",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      columns: [],
      datas: [],
      current: 0,
      data: [
        {
          value: "beijing",
          label: "北京",
          children: [
            {
              value: "gugong",
              label: "故宫",
            },
            {
              value: "tiantan",
              label: "天坛",
            },
            {
              value: "wangfujing",
              label: "王府井",
            },
          ],
        },
        {
          value: "jiangsu",
          label: "江苏",
          children: [
            {
              value: "nanjing",
              label: "南京",
              children: [
                {
                  value: "fuzimiao",
                  label: "夫子庙",
                },
              ],
            },
            {
              value: "suzhou",
              label: "苏州",
              children: [
                {
                  value: "zhuozhengyuan",
                  label: "拙政园",
                },
                {
                  value: "shizilin",
                  label: "狮子林",
                },
              ],
            },
          ],
        },
      ],
      value1: "1",
      options3: {
        disabledDate(date) {
          return date && date.valueOf() < Date.now() - 86400000;
        },
      },
      value6: 30,
      value8: 25,
      value2: "",
      data2: [],
      switch1: false,
      cityList: [
        {
          value: "New York",
          label: "New York",
        },
        {
          value: "London",
          label: "London",
        },
        {
          value: "Sydney",
          label: "Sydney",
        },
        {
          value: "Ottawa",
          label: "Ottawa",
        },
        {
          value: "Paris",
          label: "Paris",
        },
        {
          value: "Canberra",
          label: "Canberra",
        },
      ],
      number: 1,
    };
  },
  watch: {
    "dds.ff"(newname, oldnema) {
      console.log(newname + "11111111111", oldnema + "22222222222222");
      // let data =
      //   this.value[0].name +
      //   "/" +
      //   this.value[1].name +
      //   "/" +
      //   this.value[2].name +
      //   "/" +
      //   this.value[3].name;
      // this.cc = data;
      // console.log(data);
    },
  },
  mounted() {
    // this.map();
  },
  methods: {
    mark(e) {
      console.log(e.point.lat);
      this.lats = e.point.lat;
      this.lngs = e.point.lng;
    },
    positions() {
      this.lngs = 117.504;
      this.lats = 40.915;
    },
    map() {
      let map = new window.BMap.Map(this.$refs.allmap); // 创建Map实例
      map.centerAndZoom(new window.BMap.Point(116.404, 39.915), 11); // 初始化地图,设置中心点坐标和地图级别
      map.addControl(
        new window.BMap.MapTypeControl({
          // 添加地图类型控件
          mapTypes: [window.BMAP_NORMAL_MAP, window.BMAP_HYBRID_MAP],
        })
      );
      map.setCurrentCity("北京"); // 设置地图显示的城市 此项是必须设置的
      map.enableScrollWheelZoom(true); // 开启鼠标滚轮缩放
    },
    getMockData() {
      let mockData = [];
      for (let i = 1; i <= 20; i++) {
        mockData.push({
          key: i.toString(),
          label: "Content " + i,
          description: "The desc of content  " + i,
          // disabled: Math.random() * 3 < 1
        });
      }
      return mockData;
    },
    getTargetKeys() {
      return this.getMockData()
        .filter(() => Math.random() * 2 > 1)
        .map((item) => item.key);
    },
    render1(item) {
      return item.label;
    },
    handleChange1(newTargetKeys, direction, moveKeys) {
      console.log(newTargetKeys);
      console.log(direction);
      console.log(moveKeys);
      this.targetKeys1 = newTargetKeys;
    },
    coco() {
      // console.log(this.value);
      // let data =
      //   this.value[0].name +
      //   "/" +
      //   this.value[1].name +
      //   "/" +
      //   this.value[2].name +
      //   "/" +
      //   this.value[3].name;
      this.dds.ff = "jjjjjjjjjjjjjjjjj";
      // console.log(data);
    },
    ss(e) {
      console.log(e);
    },
    dd(e) {
      console.log(e);
    },
    pages(e) {
      console.log(e);
      this.number = e;
    },
    change(status) {
      this.$Message.info("开关状态：" + status);
    },
    handleSearch2(value) {
      console.log(value);
      this.data2 =
        !value || value.indexOf("@") >= 0
          ? []
          : [value + "@qq.com", value + "@sina.com", value + "@163.com"];
    },
    handleChange(e) {
      console.log(e);
    },
    next() {
      if (this.current == 3) {
        this.current = 0;
      } else {
        this.current += 1;
      }
    },
    start() {
      this.$Loading.start();
    },
    finish() {
      this.$Loading.finish();
    },
    error() {
      this.$Loading.error();
    },
    beforeUpload(file) {
      console.log(file);
      this.file = file.name;
      this.$Table.import({
        type: "xlsx",
        file: file,
        finish: (res) => {
          let columns = [];
          res.columns.map((rese) => {
            if (rese.key == "使用人") {
              rese.key = "stallName";
            } else if (rese.key == "使用人手机号*") {
              rese.key = "mobile";
            } else if (rese.key == "车牌号*") {
              rese.key = "plateNo";
            } else if (rese.key == "备注") {
              rese.key = "remark";
            } else {
              rese.key = "";
            }
            rese.align = "center";
            columns.push({
              ...rese,
            });
          });
          let data = res.data.map((resn) => {
            return {
              company: "",
              stallName: resn["使用人"],
              username: "",
              mobile: resn["使用人手机号"] || resn["使用人手机号*"],
              plateNo: resn["车牌号"] || resn["车牌号*"],
              remark: resn["备注"] == undefined ? "" : resn["备注"],
            };
          });
          res.columns.unshift({
            type: "index",
            width: 60,
            align: "center",
          });
          console.log(columns);
          console.log(data);
          this.columns = columns;
          this.datas = data;
        },
      });
      return false;
    },
    top() {
      Axios.post("/api/admin/biz/fixed/userinfo/batchSave", this.datas).then(
        (res) => {
          console.log(res);
          if (res.data.success == true) {
            this.$Message.success(res.data.content);
          }
        }
      );
    },
  },
};
</script>
<style scoped>
.title {
  text-align: center;
  font-size: 20px;
  color: red;
  margin-top: 50px;
}
.ivu-mbs {
  margin-top: 50px;
  margin-bottom: 100px;
}
.map {
  width: 100%;
  height: 600px;
}
</style>