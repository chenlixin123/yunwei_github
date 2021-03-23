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
            v-model="data.carname"
            placeholder="请选择"
            element-id="carname"
            clearable
            filterable
          >
            <Option
              v-for="(item, index) in carnamelist"
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
              v-for="(item, index) in floors"
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
              :disabled="dis"
            >
              <Option
                v-for="(item, index) in areaNames"
                :key="index"
                :value="item.areaName"
                >{{ item.areaName }}</Option
              >
            </Select>
          </FormItem>
        </Col>
        <Col v-bind="grid">
          <FormItem label="车道：" prop="rentStatus" label-for="rentStatus">
            <Select
              v-model="data.laneName"
              placeholder="请选择"
              element-id="rentStatus"
              clearable
              :disabled="dis1"
            >
              <Option
                v-for="(item, index) in laneNames"
                :key="index"
                :value="item.laneId"
                >{{ item.laneName }}</Option
              >
            </Select>
          </FormItem>
        </Col>
        <Col v-bind="grid">
          <FormItem label="车位号：" prop="stallName" label-for="stallName">
            <Select
              v-model="data.stallName"
              placeholder="请选择"
              element-id="stallName"
              clearable
              filterable
              :disabled="dis"
            >
              <Option
                v-for="(item, index) in stallNames"
                :key="index"
                :value="item.stallId"
                >{{ item.stallName }}</Option
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
      id: "",
      dis: true,
      dis1: true,
      floors: "",
      carnamelist: [],
      areaNames: [],
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
    "data.carname"(val, oldval) {
      this.id = val;
      if (val) {
        Administration_om_floor_area_stall_list({ preId: val }).then((res) => {
          this.dis = false;
          this.floors = res;
        });
      } else {
        this.dis = true;
        this.data = {};
      }
    },
    "data.floor"(val, oldVal) {
      //普通的watch监听
      this.floors.map((res) => {
        if (res.id == val) {
          this.areaNames = res.areaSelectList;
        }
      });
      if (!val) {
        this.areaNames = [];
        this.data.areaName = "";
        this.dis1 = true;
        this.data.laneName = "";
      } else {
        Administration_om_select({
          preId: this.data.carname,
          floor: this.data.floor,
        }).then((res) => {
          this.laneNames = res;
          if (res.length != 0) {
            this.dis1 = false;
          } else {
            this.data.laneName = "";
            this.dis1 = false;
          }
        });
      }
    },

    "data.areaName"(val, oldval) {
      this.areaNames.map((res) => {
        if (val == res.areaName) {
          this.stallNames = res.stallSelectList;
        }
      });
      if (!val) {
        this.stallNames = [];
        this.data.stallName = "";
      }
    },
  },
  created() {
    this.carseleclt();
  },
  methods: {
    carseleclt() {
      Administration_selectList().then((res) => {
        this.carnamelist = res;
      });
    },
    //搜索
    handleSubmit() {
      let that = this;
      this.condition.filterJson.filters = [];
      if (this.data.carname) {
        let data = { property: "preId", value: this.data.carname };
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

      if (this.data.laneName) {
        let data = { property: "laneId", value: this.data.laneName };
        this.condition.filterJson.filters.push(data);
      }
      if (this.data.stallName) {
        let data = { property: "stallId", value: this.data.stallName };
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
