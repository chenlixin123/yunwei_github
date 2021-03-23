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
        <FormItem label="车场名称：" prop="floor3" label-for="floor3">
          <Select
            v-model="data.carname"
            placeholder="请选择"
            element-id="floor3"
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
        <FormItem label="状态：" prop="status" label-for="status">
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

      <Col v-bind="grids" class="ivu-text-right">
        <FormItem>
          <Button type="primary" @click="handleSubmit">查询</Button>
          <Button class="ivu-ml-8" @click="handleReset">重置</Button>
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
      statuslist: [
        {
          id: 1,
          name: "启用",
        },
        {
          id: 0,
          name: "禁用",
        },
      ],
      fruit: [],
      carname: "",
      carnamelist: [],
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
      grids: {
        xl: 6,
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
    // this.floor();
  },
  methods: {
    //楼层车位联动接口
    floor() {
      let preId = this.info.preId;
      Administration_selectList({
        preId,
      }).then((res) => {
        this.carnamelist = res;
      });
    },
    //搜索
    handleSubmit() {
      let that = this;
      // this.data = "";
      this.condition.filterJson.filters = [];
      if (this.data.carname) {
        let data = { property: "preId", value: this.data.carname };
        this.condition.filterJson.filters.push(data);
      }
      if (this.data.status == 0 || this.data.status == 1) {
        let data = { property: "status", value: this.data.status };
        this.condition.filterJson.filters.push(data);
      }
      console.log(this.condition);
      this.$emit("on-submit3", this.condition);
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
      this.$emit("on-reset3", data);
    },
  },
};
</script>
