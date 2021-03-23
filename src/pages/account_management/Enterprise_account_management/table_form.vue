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
        <FormItem label="车场名称：" prop="parkName" label-for="parkName">
          <Select
            v-model="data.parkName"
            placeholder="请选择"
            element-id="parkName"
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
        <FormItem label="账号：" prop="account" label-for="account">
          <i-input v-model="data.account" placeholder="请输入账号"></i-input>
        </FormItem>
      </Col>

      <template v-if="collapse">
        <Col v-bind="grid">
          <FormItem label="姓名：" prop="name" label-for="name">
            <i-input v-model="data.name" placeholder="请输入姓名"></i-input>
          </FormItem>
        </Col>
        <Col v-bind="grid">
          <FormItem
            label="账号状态："
            prop="enterpriseFlag"
            label-for="enterpriseFlag"
          >
            <Select
              v-model="data.enterpriseFlag"
              placeholder="请选择"
              element-id="enterpriseFlag"
              clearable
            >
              <Option
                v-for="(item, index) in enterpriseFlaglist"
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
.box {
  display: flex;
  justify-content: space-between;
  justify-content: space-around;
}
</style>
<script>
import { mapState } from "vuex";
import { Administration_selectList } from "@/api/Administration";

export default {
  data() {
    return {
      enterpriseFlaglist: [
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
  created() {
    this.carseleclt();
  },
  methods: {
    carseleclt() {
      Administration_selectList().then((res) => {
        // //(res);
        this.carnamelist = res;
      });
    },
    //搜索
    handleSubmit() {
      let that = this;
      this.condition.filterJson.filters = [];
      if (this.data.parkName) {
        let data = { property: "preId", value: this.data.parkName };
        this.condition.filterJson.filters.push(data);
      }
      if (this.data.account) {
        let data = { property: "account", value: this.data.account };
        this.condition.filterJson.filters.push(data);
      }
      if (this.data.name) {
        let data = { property: "name", value: this.data.name };
        this.condition.filterJson.filters.push(data);
      }

      if (this.data.enterpriseFlag) {
        let data = {
          property: "enterpriseFlag",
          value: this.data.enterpriseFlag,
        };
        this.condition.filterJson.filters.push(data);
      }

      // //(this.condition);
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
