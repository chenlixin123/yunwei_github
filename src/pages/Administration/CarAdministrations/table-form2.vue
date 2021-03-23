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
        <FormItem label="车场名称：" prop="floor2" label-for="floor2">
          <Select
            v-model="data.carname"
            placeholder="请选择"
            element-id="floor2"
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
      this.condition.filterJson.filters = [];
      if (this.data.carname) {
        let data = { property: "id", value: this.data.carname };
        this.condition.filterJson.filters.push(data);
      }
      this.$emit("on-submit2", this.condition);
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
      this.$emit("on-reset2", data);
    },
  },
};
</script>
