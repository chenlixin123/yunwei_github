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
        <FormItem label="车场名称：" prop="floor" label-for="floor">
          <Select
            v-model="data.carname"
            placeholder="请选择"
            element-id="floor"
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
      <Col span="10">
        <div
          style="
            border: 1px solid #eee;
            padding: 5px;
            border-radius: 5px;
            width: 100%;
          "
        >
          <Divider orientation="left">
            服务功能筛选
            <Tooltip
              max-width="200"
              content="选中表示只显示对应功能开启的车场,否则都显示。"
            >
              <Icon type="ios-help-circle-outline" />
            </Tooltip>
          </Divider>
          <p>
            <CheckboxGroup v-model="fruit">
              <Checkbox label="digitalFlag">
                <span>三维数字重建</span>
              </Checkbox>
              <Checkbox label="indoorNavFlag">
                <span>APP室内导航</span>
              </Checkbox>
              <Checkbox label="intelligentNavFlag">
                <span>现场智能导航</span>
              </Checkbox>
              <Checkbox label="indoorScreenFlag">
                <span>室内诱导屏</span>
              </Checkbox>
              <Checkbox label="appointFlag">
                <span>车位预约</span>
              </Checkbox>
              <Checkbox label="shareMode">
                <span>车位共享</span>
              </Checkbox>
            </CheckboxGroup>
            <label for>场中场计算：</label>
            <Select
              v-model="data.calculateFlag"
              placeholder="请选择"
              clearable
              style="width: 100px"
            >
              <Option
                v-for="(item, index) in calculateFlaglist"
                :key="index"
                :value="item.id"
                >{{ item.name }}</Option
              >
            </Select>
          </p>
        </div>
      </Col>
      <Col v-bind="grids" class="ivu-text-right">
        <FormItem>
          <Button type="primary" @click="handleSubmit">查询</Button>
          <Button class="ivu-ml-8" @click="handleReset">重置</Button>
          <!-- <a v-font="14" class="ivu-ml-8" @click="collapse = !collapse">
            <template v-if="!collapse">
              展开
              <Icon type="ios-arrow-down" />
            </template>
            <template v-else>
              收起
              <Icon type="ios-arrow-up" />
            </template>
          </a>-->
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
      calculateFlaglist: [
        {
          id: 0,
          name: "禁用",
        },
        {
          id: 1,
          name: "车位相机",
        },
        {
          id: 2,
          name: "出入口相机",
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
    this.carnames();
  },
  methods: {
    //车场名称接口
    carnames() {
      Administration_selectList({}).then((res) => {
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
      that.fruit.map((res) => {
        if (res == "digitalFlag") {
          let data = { property: "digitalFlag", value: 1 };
          this.condition.filterJson.filters.push(data);
        } else if (res == "indoorNavFlag") {
          let data = { property: "indoorNavFlag", value: 1 };
          this.condition.filterJson.filters.push(data);
        } else if (res == "intelligentNavFlag") {
          let data = { property: "intelligentNavFlag", value: 1 };
          this.condition.filterJson.filters.push(data);
        } else if (res == "indoorScreenFlag") {
          let data = { property: "indoorScreenFlag", value: 1 };
          this.condition.filterJson.filters.push(data);
        } else if (res == "appointFlag") {
          let data = { property: "appointFlag", value: 1 };
          this.condition.filterJson.filters.push(data);
        } else if (res == "shareMode") {
          let data = { property: "shareMode", value: 1 };
          this.condition.filterJson.filters.push(data);
        }
      });
      console.log(String(this.data.calculateFlag));
      if (
        String(this.data.calculateFlag) != "" &&
        String(this.data.calculateFlag) != "undefined"
      ) {
        let data = {
          property: "calculateFlag",
          value: this.data.calculateFlag,
        };
        this.condition.filterJson.filters.push(data);
      }
      this.$emit("on-submit", this.condition);
    },
    //重置
    handleReset() {
      this.fruit = [];
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
