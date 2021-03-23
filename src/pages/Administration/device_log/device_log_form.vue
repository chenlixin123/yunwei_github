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
        <FormItem label="设备类型：" prop="deviceType " label-for="deviceType ">
          <Select
            v-model="data.deviceType"
            placeholder="请选择"
            element-id="deviceType "
            clearable
            filterable
          >
            <Option
              v-for="(item, index) in deviceTypelist"
              :key="index"
              :value="item.id"
              >{{ item.name }}</Option
            >
          </Select>
        </FormItem>
      </Col>
      <Col v-bind="grid">
        <FormItem
          label="设备状态："
          prop="onlineStatus"
          label-for="onlineStatus"
        >
          <Select
            v-model="data.onlineStatus"
            placeholder="请选择"
            element-id="onlineStatus"
            clearable
          >
            <Option
              v-for="(item, index) in onlineStatuslist"
              :key="index"
              :value="item.id"
              >{{ item.name }}</Option
            >
          </Select>
        </FormItem>
      </Col>

      <template v-if="collapse">
        <Col v-bind="grid">
          <FormItem
            label="设备编号："
            prop="deviceCode "
            label-for="deviceCode "
          >
            <Input
              type="text"
              v-model="data.deviceCode"
              placeholder="请填写设备编号"
              element-id="deviceCode "
            />
          </FormItem>
        </Col>
        <Col v-bind="grid">
          <FormItem label="查询时间：" prop="rentStatus" label-for="rentStatus">
            <DatePicker
              style="width: 100%"
              type="daterange"
              split-panels
              element-id="rentStatus"
              :options="options"
              placeholder="请选择"
              v-model="data.time"
            ></DatePicker>
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
import time from "@/api/time";
export default {
  data() {
    return {
      options: {
        disabledDate(date) {
          return date && date.valueOf() > Date.now();
        },
      },
      condition: {
        filterJson: {
          filters: [],
        },
      },
      data: {},
      deviceCodelist: [],
      onlineStatuslist: [
        {
          id: "0",
          name: "离线",
        },
        {
          id: "1",
          name: "在线",
        },
      ],
      deviceTypelist: [
        {
          id: "1",
          name: "出入口一体机",
        },
        {
          id: "2",
          name: "诱导屏",
        },
        {
          id: "3",
          name: "车道相机",
        },
      ],
      grid: {
        xl: 8,
        lg: 6,
        md: 12,
        sm: 24,
        xs: 24,
      },
      rules: {},
      collapse: false,
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
  created() {},
  mounted() {},
  methods: {
    //搜索
    handleSubmit() {
      let that = this;
      this.condition.filterJson.filters = [];
      if (this.data.deviceType) {
        let data = { property: "deviceType", value: this.data.deviceType };
        this.condition.filterJson.filters.push(data);
      }
      if (this.data.onlineStatus) {
        let data = { property: "onlineStatus", value: this.data.onlineStatus };
        this.condition.filterJson.filters.push(data);
      }
      if (this.data.deviceCode) {
        let data = {
          property: "deviceCode",
          value: this.data.deviceCode,
        };
        this.condition.filterJson.filters.push(data);
      }
      if (this.data.time && this.data.time[0]) {
        let data = {
          property: "startTime",
          value: time.time(this.data.time[0]),
        };
        this.condition.filterJson.filters.push(data);
      }
      if (this.data.time && this.data.time[1]) {
        let data = {
          property: "endTime",
          value: time.time(this.data.time[1]),
        };
        this.condition.filterJson.filters.push(data);
      }
      this.$emit("on-submit", this.condition);
    },
    //重置
    handleReset() {
      this.$refs.form.resetFields();
      this.data = {};
      let data = {
        start: 0,
        pageSize: 10,
        filterJson: "",
      };
      this.$emit("on-reset", data);
    },
  },
};
</script>
