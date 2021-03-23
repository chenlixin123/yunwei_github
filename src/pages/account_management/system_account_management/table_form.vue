<template>
  <Form
    ref="form"
    :model="data"
    :rules="rules"
    :label-width="labelWidth"
    :label-position="labelPosition"
  >
    <Row :gutter="24" type="flex" justify="end">
      <!-- <Col v-bind="grid">
        <FormItem label="车场名称：" prop="parkName" label-for="parkName">
          <Select
            v-model="data.parkName"
            placeholder="请选择"
            element-id="parkName"
            clearable
          >
            <Option
              v-for="(item, index) in carnamelist"
              :key="index"
              :value="item.id"
              >{{ item.name }}</Option
            >
          </Select>
        </FormItem>
      </Col> -->
      <Col v-bind="grid">
        <FormItem label="账号：" prop="username" label-for="username">
          <i-input v-model="data.username" placeholder="请输入账号"></i-input>
        </FormItem>
      </Col>
      <Col v-bind="grid">
        <FormItem label="姓名：" prop="realname" label-for="realname">
          <i-input v-model="data.realname" placeholder="请输入姓名"></i-input>
        </FormItem>
      </Col>
      <template v-if="collapse">
        <Col v-bind="grid">
          <FormItem label="账号状态：" prop="status" label-for="status">
            <Select
              v-model="data.status"
              placeholder="请选择"
              element-id="status"
              clearable
            >
              <Option
                v-for="(item, index) in statuslist"
                :key="index"
                :value="item.id"
                >{{ item.name }}</Option
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
</style>
<script>
import { mapState } from "vuex";
import { Administration_selectList } from "@/api/Administration";

export default {
  data() {
    return {
      statuslist: [
        {
          id: "1",
          name: "启用",
        },
        {
          id: "0",
          name: "禁用",
        },
      ],
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
        filterJson: { filters: [] },
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
      if (this.data.username) {
        let data = { property: "username", value: this.data.username };
        this.condition.filterJson.filters.push(data);
      }
      if (this.data.realname) {
        let data = { property: "realname", value: this.data.realname };
        this.condition.filterJson.filters.push(data);
      }

      if (this.data.status) {
        let data = {
          property: "status",
          value: this.data.status,
        };
        this.condition.filterJson.filters.push(data);
      }
      let data = {
        property: "admin",
        value: "1",
      };
      this.condition.filterJson.filters.push(data);
      this.$emit("on-submit", this.condition);
    },
    //重置
    handleReset() {
      this.$refs.form.resetFields();
      this.data = {};
      let data = {
        start: 0,
        pageSize: 10,
        filterJson: { filters: [{ property: "admin", value: "1" }] },
      };
      this.$emit("on-reset", data);
    },
  },
};
</script>
