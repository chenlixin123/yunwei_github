<template>
  <Form
    ref="form"
    :model="data"
    :rules="rules"
    :label-width="labelWidth"
    :label-position="labelPosition"
  >
    <Row :gutter="24" type="flex" justify="space-between">
      <Col v-bind="grid">
        <FormItem label="车场名称：" prop="carname" label-for="carname">
          <Select
            v-model="data.preId"
            placeholder="请选择"
            element-id="carname"
            clearable
            filterable
          >
            <Option
              v-for="(item, index) in prelist"
              :key="index"
              :value="item.id"
              >{{ item.name }}</Option
            >
          </Select>
        </FormItem>
      </Col>
      <Col v-bind="grid">
        <FormItem label="楼层：" prop="floor" label-for="floor">
          <Select
            v-model="data.floor"
            placeholder="请选择"
            element-id="floor"
            clearable
            :disabled="dis"
          >
            <Option
              v-for="(item, index) in floorlist"
              :key="index"
              :value="item.id"
              >{{ item.floorName }}</Option
            >
          </Select>
        </FormItem>
      </Col>

      <template v-if="collapse">
        <Col v-bind="grid">
          <FormItem label="分区：" prop="type" label-for="type">
            <Select
              v-model="data.areaName"
              placeholder="请选择"
              element-id="type"
              clearable
              :disabled="dis1"
            >
              <Option
                v-for="(item, index) in areaNamelist"
                :key="index"
                :value="item.areaName"
                >{{ item.areaName }}</Option
              >
            </Select>
          </FormItem>
        </Col>
        <Col v-bind="grid">
          <FormItem label="状态：" prop="rentStatus" label-for="rentStatus">
            <Select
              v-model="data.onlineStatus"
              placeholder="请选择"
              element-id="rentStatus"
              clearable
            >
              <Option
                v-for="(item, index) in onlineStatulist"
                :key="index"
                :value="item.id"
                >{{ item.name }}</Option
              >
            </Select>
          </FormItem>
        </Col>
        <Col v-bind="grid">
          <FormItem label="设备ID：" prop="stallName" label-for="stallName">
            <i-input
              v-model="data.deviceCode"
              placeholder="请输入设备ID"
            ></i-input>
          </FormItem>
        </Col>
      </template>
      <Col v-bind="grid" class="ivu-text-right">
        <FormItem>
          <Button type="primary" @click="handleSubmit">查询</Button>
          <Button class="ivu-ml-8" @click="handleReset">重置</Button>
          <a v-font="14" class="ivu-ml-8" @click="collapse = !collapse">
            <template v-if="!collapse">
              展开
              <Icon type="ios-arrow-down" />
            </template>
            <template v-else>
              收起
              <Icon type="ios-arrow-up" />
            </template>
          </a>
        </FormItem>
      </Col>
    </Row>
  </Form>
</template>
<style lang="less" scoped>
.box {
  display: flex;
  justify-content: space-between;
  justify-content: space-around;
}
</style>
<script>
import { mapState } from "vuex";
import {
  //车场下拉框列表
  Administration_selectList,
  //车位列表查询选项级联接口
  Administration_om_floor_area_stall_list,
  //车位列表车道选择框
  Administration_om_select,
} from "@/api/Administration";

export default {
  data() {
    return {
      onlineStatulist: [
        {
          id: "0",
          name: "离线",
        },
        {
          id: "1",
          name: "在线",
        },
      ],
      id: "",
      dis1: true,
      dis: true,
      floorlist: "",
      prelist: [],
      areaNamelist: [],
      stallNames: [],
      laneNames: [],
      grid: {
        xl: 8,
        lg: 6,
        md: 12,
        sm: 24,
        xs: 24,
      },
      data: {},
      collapse: false,
      condition: {
        start: 0,
        pageSize: 10,
        filterJson: {
          filters: [],
        },
      },
      rules: {},
    };
  },
  computed: {
    ...mapState("admin/layout", ["isMobile"]),
    ...mapState("admin/user", ["info"]),

    labelWidth() {
      return this.isMobile ? undefined : 100;
    },
    labelPosition() {
      return this.isMobile ? "top" : "right";
    },
  },
  watch: {
    "data.preId"(val, oldval) {
      this.id = val;
      if (val) {
        Administration_om_floor_area_stall_list({ preId: val }).then((res) => {
          this.dis = false;
          this.floorlist = res;
        });
      } else {
        this.dis = true;
        this.data = {};
      }
    },
    "data.floor"(val, oldVal) {
      //普通的watch监听
      this.floorlist.map((res) => {
        if (res.id == val) {
          this.areaNamelist = res.areaSelectList;
        }
      });
      if (!val) {
        this.areaNamelist = [];
        this.data.areaName = " ";
        this.dis1 = true;
      } else {
        this.dis1 = false;
      }
    },
  },
  created() {
    this.carseleclt();
  },
  methods: {
    carseleclt() {
      Administration_selectList().then((res) => {
        this.prelist = res;
      });
    },
    //搜索
    handleSubmit() {
      let that = this;
      this.condition.filterJson.filters = [];
      if (this.data.preId) {
        let data = { property: "preId", value: this.data.preId };
        this.condition.filterJson.filters.push(data);
      }
      if (this.data.floor) {
        let data = { property: "floor", value: this.data.floor };
        this.condition.filterJson.filters.push(data);
      }
      if (this.data.areaName) {
        let data = { property: "areaName", value: this.data.areaName };
        this.condition.filterJson.filters.push(data);
      }
      if (this.data.onlineStatus) {
        let data = { property: "onlineStatus", value: this.data.onlineStatus };
        this.condition.filterJson.filters.push(data);
      }
      if (this.data.deviceCode) {
        let data = { property: "deviceCode", value: this.data.deviceCode };
        this.condition.filterJson.filters.push(data);
      }
      let bind = { property: "bind", value: "1" };
      this.condition.filterJson.filters.push(bind);
      this.$emit("on-submit", this.condition);
    },
    //重置
    handleReset() {
      this.$refs.form.resetFields();
      this.data = {};
      let data = {
        start: 0,
        pageSize: 10,
        filterJson: {
          filters: [
            {
              property: "bind",
              value: "1",
            },
          ],
        },
      };
      this.$emit("on-reset", data);
    },
  },
};
</script>
