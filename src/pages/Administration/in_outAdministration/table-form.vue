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
              v-for="(item, index) in preIdlist"
              :key="index"
              :value="item.id"
              >{{ item.name }}</Option
            >
          </Select>
        </FormItem>
      </Col>
      <Col v-bind="grid">
        <FormItem label="出入口类别：" prop="floor" label-for="floor">
          <Select
            v-model="data.gateType"
            placeholder="请选择"
            element-id="floor"
            clearable
            :disabled="dis"
          >
            <Option
              v-for="(item, index) in gateTypelist"
              :key="index"
              :value="item.gateType"
              >{{ item.gateName }}</Option
            >
          </Select>
        </FormItem>
      </Col>

      <template v-if="collapse">
        <Col v-bind="grid">
          <FormItem label="闸机：" prop="type" label-for="type">
            <Select
              v-model="data.zhajiDeviceCode"
              placeholder="请选择"
              element-id="type"
              clearable
              :disabled="dis"
            >
              <Option
                v-for="(item, index) in zhajiDeviceCodelist"
                :key="index"
                :value="item.id"
                >{{ item.name }}</Option
              >
            </Select>
          </FormItem>
        </Col>
        <Col v-bind="grid">
          <FormItem
            label="出入口相机："
            prop="rentStatus"
            label-for="rentStatus"
          >
            <Select
              v-model="data.inoutDeviceCode"
              placeholder="请选择"
              element-id="rentStatus"
              clearable
              :disabled="dis"
            >
              <Option
                v-for="(item, index) in inoutDeviceCodelist"
                :key="index"
                :value="item.cameraCode"
                >{{ item.cameraCode }}</Option
              >
            </Select>
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
  Administration_selectList,
  Administration_gate_list,
  //出入口相机编码选择框
  Administration_camera_info_select,
} from "@/api/Administration";

export default {
  data() {
    return {
      preIdlist: [],
      gateTypelist: [
        {
          gateType: 1,
          gateName: "入口",
        },
        {
          gateType: 2,
          gateName: "出口",
        },
        {
          gateType: 3,
          gateName: "场中场",
        },
      ],
      zhajiDeviceCodelist: [],
      inoutDeviceCodelist: [],
      dis: true,
      floors: "",
      carmodules: "",
      carmodules1: "",
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
    "data.preId"(val, oldVal) {
      //普通的watch监听
      if (val) {
        // Administration_gate_list({
        //   preId: val,
        // }).then((res) => {
        //   this.gateTypelist = res;

        // });
        this.dis = false;
      } else {
        this.dis = true;
      }
    },
    "data.carname"(val, oldval) {
      if (!val) {
        this.dis = true;
      } else {
        this.dis = false;
      }
    },
  },
  created() {
    this.floor();
  },
  methods: {
    //楼层车位联动接口
    floor() {
      let preId = this.info.preId;
      Administration_selectList().then((res) => {
        this.preIdlist = res;
      });
      Administration_camera_info_select({
        bind: 1,
        gateCode: "",
      }).then((res) => {
        this.inoutDeviceCodelist = res;
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
      if (this.data.gateType) {
        let data = { property: "gateType", value: this.data.gateType };
        this.condition.filterJson.filters.push(data);
      }
      if (this.data.zhajiDeviceCode) {
        let data = {
          property: "zhajiDeviceCode",
          value: this.data.zhajiDeviceCode,
        };
        this.condition.filterJson.filters.push(data);
      }
      if (this.data.inoutDeviceCode) {
        let data = {
          property: "inoutDeviceCode",
          value: this.data.inoutDeviceCode,
        };
        this.condition.filterJson.filters.push(data);
      }
      this.$emit("on-submit", this.condition);
    },
    //重置
    handleReset() {
      console.log('我也走了')
      this.$refs.form.resetFields();
      this.data = {};
      let data = {
        start: 0,
        pageSize: 10,
        filterJson: "",
      };
      this.$emit("on-reset", data);
    },
    Refreshs() {
      Administration_camera_info_select({
        bind: 1,
        gateCode: "",
      }).then((res) => {
        console.log('走了')
        console.log(res)
        this.inoutDeviceCodelist = res;
      });
    },
  },
};
</script>
