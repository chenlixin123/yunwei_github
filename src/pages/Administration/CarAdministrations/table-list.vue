<style lang="less" scoped>
.ellipsis {
  width: 100%;
  height: 30px;
  text-align: center;
  line-height: 30px;
  border: 1px solid #dcdee2;
  font-size: 0.9vw;
}
.close {
  width: 80%;
  height: 100%;
  background: #afb7c9;
  border-radius: 5px;
  border: none;
  outline: none;
  color: white;
  font-size: 0.9vw;
}
.close:hover {
  width: 80%;
  background: #afb7c9;
  color: white;
  cursor: pointer;
}
.span_red {
  color: red;
}
.span_green {
  color: #0f0;
}
.user_label {
  display: inline-block;
  width: 100px;
  text-align-last: justify;
}
.module_divs {
  width: 95%;
  margin-top: 10px;
  padding-left: 8%;
}
.module_divs3 {
  width: 95%;
  margin-top: 10px;
  display: flex;
  justify-items: center;
}
.span_else {
  margin-left: 15px;
}
</style>
<template>
  <div class="i-table-no-border">
    <Table
      ref="table"
      :columns="columns"
      :data="list"
      :loading="loading"
      class="ivu-mt"
    >
      <template slot-scope="{ row }" slot="stallName">
        <div>{{ row.stallName }}</div>
      </template>
      <template slot-scope="{ row }" slot="type">
        <div v-if="row.type === 0">时租</div>
        <div v-else>固定</div>
      </template>
      <template slot-scope="{ row }" slot="rentStatus">
        <Badge v-if="row.rentStatus === 1" status="success" text="已租" />
        <Badge v-else-if="row.rentStatus === 2" status="default" text="未租" />
        <Badge v-else-if="row.rentStatus === 3" status="error" text="过期" />
        <Badge v-else status="success" text="禁用" />
      </template>
      <!-- 自动升降锁 -->
      <template slot-scope="{ row }" slot="autoUpdownFlag">
        <!-- <Select v-model="edidtop_down" v-if="editIndex === index" transfer>
          <Option
            v-for="(item, key) in top_downs"
            :key="key"
            :value="item.id"
            >{{ item.value }}</Option
          >
        </Select> -->
        <span :class="row.autoUpdownFlag == 0 ? 'span_red' : 'span_green'">{{
          row.autoUpdownFlag == 1 ? "启用" : "禁用"
        }}</span>
      </template>
      <!-- 平面图 -->
      <template slot-scope="{ row }" slot="plan">
        <!-- <Select v-model="editplan" v-if="editIndex === index" transfer>
          <Option v-for="(item, key) in editplans" :key="key" :value="item.id">{{ item.value }}</Option>
        </Select>-->
        <span :class="row.plan == 0 ? 'span_red' : 'span_green'">{{
          row.plan == 0 ? "无" : "有"
        }}</span>
      </template>
      <!-- 三维数字重建 -->
      <template slot-scope="{ row }" slot="three_dimensional">
        <!-- <Select v-model="three_dimensional" v-if="editIndex === index" transfer>
          <Option
            v-for="(item, key) in three_dimensionals"
            :key="key"
            :value="item.id"
            >{{ item.value }}</Option
          >
        </Select> -->
        <span :class="row.digitalFlag == 0 ? 'span_red' : 'span_green'">{{
          row.digitalFlag == 0 ? "否" : "是"
        }}</span>
      </template>

      <!-- APP室内导航 -->
      <template slot-scope="{ row }" slot="app">
        <!-- <Select v-model="app" v-if="editIndex === index" transfer>
          <Option v-for="(item, key) in apps" :key="key" :value="item.id">{{
            item.value
          }}</Option>
        </Select> -->
        <span :class="row.indoorNavFlag == 0 ? 'span_red' : 'span_green'">{{
          row.indoorNavFlag == 0 ? "禁用" : "启用"
        }}</span>
      </template>

      <!-- 现场智能导航 -->
      <template slot-scope="{ row }" slot="navigation">
        <!-- <Select v-model="navigation" v-if="editIndex === index" transfer>
          <Option
            v-for="(item, key) in navigations"
            :key="key"
            :value="item.id"
            >{{ item.value }}</Option
          >
        </Select> -->
        <span
          :class="row.intelligentNavFlag == 0 ? 'span_red' : 'span_green'"
          >{{ row.intelligentNavFlag == 0 ? "禁用" : "启用" }}</span
        >
      </template>

      <!-- 室内诱导屏 -->
      <template slot-scope="{ row }" slot="induction_screen">
        <!-- <Select v-model="induction_screen" v-if="editIndex === index" transfer>
          <Option
            v-for="(item, key) in induction_screens"
            :key="key"
            :value="item.id"
            >{{ item.value }}</Option
          >
        </Select> -->
        <span :class="row.indoorScreenFlag == 0 ? 'span_red' : 'span_green'">{{
          row.indoorScreenFlag == 0 ? "禁用" : "启用"
        }}</span>
      </template>

      <!-- 车位预约 -->
      <template slot-scope="{ row }" slot="appointment">
        <!-- <Select v-model="appointment" v-if="editIndex === index" transfer>
          <Option
            v-for="(item, key) in appointments"
            :key="key"
            :value="item.id"
            >{{ item.value }}</Option
          >
        </Select> -->
        <span :class="row.appointFlag == 0 ? 'span_red' : 'span_green'">{{
          row.appointFlag == 0 ? "禁用" : "启用"
        }}</span>
      </template>

      <!-- 车位共享 -->
      <template slot-scope="{ row }" slot="share">
        <!-- <Select v-model="share" v-if="editIndex === index" transfer>
          <Option v-for="(item, key) in shares" :key="key" :value="item.id">{{
            item.value
          }}</Option>
        </Select> -->
        <span :class="row.shareMode == 3 ? 'span_red' : 'span_green'">{{
          row.shareMode == 3
            ? "禁用"
            : row.shareMode == 1
            ? "模式一"
            : row.shareMode == 2
            ? "模式二"
            : ""
        }}</span>
      </template>

      <!-- 场中场计算 -->
      <template slot-scope="{ row }" slot="calculateFlag">
        <!-- <Select v-model="calculateFlag" v-if="editIndex === index" transfer>
          <Option
            v-for="(item, key) in calculateFlaglist"
            :key="key"
            :value="item.id"
            >{{ item.name }}</Option
          >
        </Select> -->
        <span class="span_green">{{
          row.calculateFlag == 1
            ? "车位相机"
            : row.calculateFlag == 2
            ? "出入口相机"
            : row.calculateFlag == 0
            ? "禁用"
            : ""
        }}</span>
      </template>

      <!-- 降锁模式 -->
      <template slot-scope="{ row }" slot="lockMode">
        <span :class="row.lockMode == 0 ? 'span_red' : 'span_green'">{{
          row.lockMode == 0
            ? "无"
            : row.lockMode == 1
            ? "出入口相机降锁"
            : row.lockMode == 2
            ? "车道相机降锁"
            : row.lockMode == 3
            ? "混合模式降锁"
            : ""
        }}</span>
      </template>

      <template slot-scope="{ row, index }" slot="action">
        <!-- <div v-if="editIndex === index">
          <Button @click="handleSave(index)" type="success" ghost size="small">
            <template v-if="!addNew">保存</template>
          </Button>
          <Button
            @click="handleCancel"
            v-if="!addNew"
            :disabled="addNew"
            type="primary"
            ghost
            size="small"
            class="ivu-ml"
            >取消</Button
          >
          <Button
            @click="handleDelete(index)"
            v-else
            type="error"
            ghost
            size="small"
            class="ivu-ml"
            >删除</Button
          >
        </div> -->
        <div>
          <Switch
            v-model="row.status"
            @on-change="change(row)"
            :true-value="0"
            :false-value="1"
          />
          <Button
            @click="handleEdit(row, index)"
            :disabled="addNew"
            type="primary"
            ghost
            size="small"
            style="margin-left: 10px"
            >编辑</Button
          >
          <Button
            :loading="synchronization_loading"
            @click="synchronization(row)"
            :disabled="addNew"
            type="primary"
            ghost
            size="small"
            style="margin-left: 10px"
            >同步</Button
          >
          <!-- <Poptip confirm transfer title="是否要删除此行？" @on-ok="handleDelete(index)">
            <Button :disabled="addNew" type="error" ghost size="small" class="ivu-ml">删除</Button>
          </Poptip>-->
        </div>
      </template>
    </Table>
    <div class="ivu-mt ivu-text-center">
      <Page :total="totals" show-total :current="current" @on-change="jump" />
    </div>

    <Modal
      :title="module_title"
      v-model="modal_implicit"
      :styles="{ top: '10%' }"
      :mask-closable="false"
    >
      <div slot="footer">
        <Button @click="cancle">取消</Button>
        <Button @click="click_module" type="primary" :loading="loading_btn"
          >确定</Button
        >
      </div>
      <div style="padding-left: 5px">
        <!-- 自动升降锁 -->
        <div class="module_divs">
          <label for style="color: red">*</label>
          <label for class="user_label">自动升降锁</label>:
          <Select
            v-model="edidtop_down"
            filterable
            transfer
            style="width: 70%; margin-left: 10px"
          >
            <Option
              v-for="(item, key) in top_downs"
              :key="key"
              :value="item.id"
              >{{ item.value }}</Option
            >
          </Select>
        </div>
        <!-- 三维数字重建 -->
        <div class="module_divs">
          <label for style="color: red">*</label>
          <label for class="user_label">三维数字重建</label>:
          <Select
            v-model="three_dimensional"
            style="width: 70%; margin-left: 10px"
            transfer
          >
            <Option
              v-for="(item, key) in three_dimensionals"
              :key="key"
              :value="item.id"
              >{{ item.value }}</Option
            >
          </Select>
        </div>
        <!-- APP室内导航 -->
        <div class="module_divs">
          <label for style="color: red">*</label>
          <label for class="user_label">APP室内导航</label>:
          <Select v-model="app" style="width: 70%; margin-left: 10px" transfer>
            <Option v-for="(item, key) in apps" :key="key" :value="item.id">{{
              item.value
            }}</Option>
          </Select>
        </div>

        <!-- 现场智能导航 -->
        <div class="module_divs">
          <label for style="color: red">*</label>
          <label for class="user_label">现场智能导航</label>:
          <Select
            v-model="navigation"
            style="width: 70%; margin-left: 10px"
            transfer
          >
            <Option
              v-for="(item, key) in navigations"
              :key="key"
              :value="item.id"
              >{{ item.value }}</Option
            >
          </Select>
        </div>

        <!-- 室内诱导屏 -->
        <div class="module_divs">
          <label for style="color: red">*</label>
          <label for class="user_label">室内诱导屏</label>:
          <Select
            v-model="induction_screen"
            style="width: 70%; margin-left: 10px"
            transfer
          >
            <Option
              v-for="(item, key) in induction_screens"
              :key="key"
              :value="item.id"
              >{{ item.value }}</Option
            >
          </Select>
        </div>

        <!-- 车位预约 -->
        <div class="module_divs">
          <label for style="color: red">*</label>
          <label for class="user_label">车位预约</label>:
          <Select
            v-model="appointment"
            style="width: 70%; margin-left: 10px"
            transfer
          >
            <Option
              v-for="(item, key) in appointments"
              :key="key"
              :value="item.id"
              >{{ item.value }}</Option
            >
          </Select>
        </div>

        <!-- 车位共享 -->
        <div class="module_divs">
          <label for style="color: red">*</label>
          <label for class="user_label">车位共享</label>:
          <Select
            v-model="share"
            style="width: 70%; margin-left: 10px"
            transfer
          >
            <Option v-for="(item, key) in shares" :key="key" :value="item.id">{{
              item.value
            }}</Option>
          </Select>
        </div>

        <!-- 场中场计算 -->
        <div class="module_divs">
          <label for style="color: red">*</label>
          <label for class="user_label">场中场计算</label>:
          <Select
            v-model="calculateFlag"
            style="width: 70%; margin-left: 10px"
            transfer
          >
            <Option
              v-for="(item, key) in calculateFlaglist"
              :key="key"
              :value="item.id"
              >{{ item.name }}</Option
            >
          </Select>
        </div>

        <!-- 降锁模式 -->
        <div class="module_divs">
          <label for style="color: red">*</label>
          <label for class="user_label">降锁模式</label>:
          <Select
            v-model="lockMode"
            style="width: 70%; margin-left: 10px"
            transfer
          >
            <Option
              v-for="(item, key) in lockModelist"
              :key="key"
              :value="item.id"
              >{{ item.name }}</Option
            >
          </Select>
        </div>
        <!-- 紧缺数 -->
        <div class="module_divs">
          <label for style="color: red">*</label>
          <label for class="user_label">紧缺数(红)</label>:
          <Input
            v-model="redValue"
            style="width: 70%; margin-left: 10px"
            placeholder="请输入紧缺数"
          />
        </div>
        <!-- 紧张数 -->
        <div class="module_divs">
          <label for style="color: red">*</label>
          <label for class="user_label">紧张数(黄)</label>:
          <Input
            v-model="yellowValue"
            style="width: 70%; margin-left: 10px"
            placeholder="请输入紧张数"
          />
        </div>
        <!-- 降锁延迟时间 -->
        <div class="module_divs" style="position: relative">
          <label for style="color: red">*</label>
          <label for class="user_label">降锁延迟时间</label>:
          <Input
            v-model="delayTime"
            style="width: 70%; margin-left: 10px"
            placeholder="请输入延迟时间"
          />
          <span
            style="position: absolute; right: 3%; top: 7px; font-weight: bold"
            >秒</span
          >
        </div>
      </div>
    </Modal>
  </div>
</template>
<script>
import random from "@/libs/random_str";
// import { Message } from "iview";

// import "iview/dist/styles/iview.css";
import {
  // Administration_rent_list,
  // Administration_open,
  // Administration_close,
  //车场列表
  Administration_om_list,
  //编辑车场
  Administration_prefecture_om_update,
  //启用、禁用
  Administration_om_update_status,
  //同步
  Administration_biz_prefecture_om_sync,
} from "@/api/Administration";
import time from "@/api/time";

export default {
  data() {
    return {
      lockMode: "",
      synchronization_loading: false,
      module_title: "",
      modal_implicit: false,
      loading_btn: false,
      add_data: {
        preId: "",
        floor: "",
        stallSum: "",
        redValue: "",
        yellowValue: "",
        remark: "",
      },
      preIdlist: [],

      calculateFlag: "",
      switch1: true,
      calculateFlaglist: [
        {
          id: "0",
          name: "禁用",
        },
        {
          id: "1",
          name: "车位相机",
        },
        {
          id: "2",
          name: "出入口相机",
        },
      ],
      top_downs: [
        { id: "1", value: "启用" },
        {
          id: "0",
          value: "禁用",
        },
      ],
      edidtop_down: "",
      redValue: "",
      yellowValue: "",
      editplan: "",
      delayTime: "",
      editplans: [
        { id: "1", value: "有" },
        {
          id: "0",
          value: "无",
        },
      ],
      three_dimensional: "",
      three_dimensionals: [
        {
          id: "0",
          value: "否",
        },
        { id: "1", value: "是" },
      ],
      app: "",
      apps: [
        {
          id: "0",
          value: "禁用",
        },
        { id: "1", value: "启用" },
      ],
      navigation: "",
      navigations: [
        {
          id: "0",
          value: "禁用",
        },
        { id: "1", value: "启用" },
      ],
      induction_screen: "",
      induction_screens: [
        {
          id: "0",
          value: "禁用",
        },
        { id: "1", value: "启用" },
      ],
      appointment: "",
      appointments: [
        {
          id: "0",
          value: "禁用",
        },
        { id: "1", value: "启用" },
      ],
      share: "",
      shares: [
        {
          id: "3",
          value: "禁用",
        },
        { id: "1", value: "模式一" },
        { id: "2", value: "模式二" },
      ],
      btn_loading: false,
      totals: 10,
      data: "",
      module_ellipsis: [],
      modal10: false,
      columns: [
        {
          title: "车场名称",
          key: "name",
          minWidth: 200,
          align: "center",
        },
        {
          title: "类型",
          key: "type",
          minWidth: 100,
          align: "center",
          render: (h, params) => {
            let expriseDate = "";
            if (params.row.type == 0) {
              expriseDate = "普通车区";
              return h("span", expriseDate);
            } else if (params.row.type == 2) {
              expriseDate = "定制车区";
              return h("span", expriseDate);
            }
          },
        },
        {
          title: "层数",
          key: "floorNumber",
          minWidth: 70,
          align: "center",
        },
        {
          title: "车道数",
          key: "laneNumber",
          align: "center",
          minWidth: 80,
        },
        {
          title: "车位总数",
          key: "totalStallNum",
          minWidth: 95,
          align: "center",
        },
        {
          title: "管理车位",
          key: "manageStallNum",
          minWidth: 95,
          align: "center",
        },
        {
          title: "平面图",
          key: "plan",
          minWidth: 80,
          slot: "plan",
          align: "center",
        },
        {
          title: "自动升降锁",
          key: "autoUpdownFlag",
          minWidth: 80,
          slot: "autoUpdownFlag",
          align: "center",
          renderHeader: (h, params) => {
            let menu = null;
            menu = h("div", [h("p", "自动"), h("p", "升降锁")]);
            return menu;
          },
        },
        {
          title: "三维数字重建",
          key: "digitalFlag",
          slot: "three_dimensional",
          minWidth: 95,
          align: "center",
          renderHeader: (h, params) => {
            let menu = null;
            menu = h("div", [h("p", "三维"), h("p", "数字重建")]);
            return menu;
          },
        },
        {
          title: "APP室内导航",
          key: "indoorNavFlag",
          minWidth: 95,
          slot: "app",
          align: "center",
          renderHeader: (h, params) => {
            let menu = null;
            menu = h("div", [h("p", "APP"), h("p", "室内导航")]);
            return menu;
          },
        },
        {
          title: "现场智能导航",
          key: "intelligentNavFlag",
          slot: "navigation",
          minWidth: 95,
          align: "center",
          renderHeader: (h, params) => {
            let menu = null;
            menu = h("div", [h("p", "现场"), h("p", "智能导航")]);
            return menu;
          },
        },
        {
          title: "室内诱导屏",
          key: "indoorScreenFlag",
          slot: "induction_screen",
          minWidth: 80,
          align: "center",
          renderHeader: (h, params) => {
            let menu = null;
            menu = h("div", [h("p", "室内"), h("p", "诱导屏")]);
            return menu;
          },
        },
        {
          title: "车位预约",
          key: "appointFlag",
          slot: "appointment",
          minWidth: 100,
          align: "center",
        },
        {
          title: "车位共享",
          key: "shareMode",
          slot: "share",
          minWidth: 120,
          align: "center",
        },
        {
          title: "场中场计算",
          key: "calculateFlag",
          slot: "calculateFlag",
          minWidth: 120,
          align: "center",
        },
        {
          title: "降锁模式",
          key: "lockMode",
          minWidth: 160,
          slot: "lockMode",
          align: "center",
        },
        {
          title: "剩余服务期",
          key: "surplus",
          minWidth: 110,
          align: "center",
          render: (h, params) => {
            let value = params.row.validTime;
            if (value >= 0) {
              return h("span", value + "天");
            } else if (value < 0) {
              return h("span", "过期" + Math.abs(value) + "天");
            }
          },
        },
        {
          title: "操作",
          key: "id",
          slot: "action",
          minWidth: 240,
          align: "center",
        },
      ],
      editIndex: -1,
      editName: "",
      editId: "",
      addNew: false,
      loading: false,
      loading: false,
      list: [],
      selectedData: [],
      current: 1,
      size: 10,
      sortType: "normal", // 当前排序类型，可选值为：normal（默认） || asc（升序）|| desc（降序）,
      sortColumns: "",
      filterType: undefined,
      showCreate: false,
      createData: {
        desc: "",
      },
      createRules: {
        desc: [{ required: true, message: "请输入描述", trigger: "blur" }],
      },
      creating: true,
      updateIndex: -1,
      datas: {
        start: 0,
        pageSize: 10,
        filterJson: "",
        id: "",
      },
      lockModelist: [
        {
          id: "0",
          name: "无",
        },
        {
          id: "1",
          name: "出入口相机降锁",
        },
        {
          id: "2",
          name: "车道相机降锁",
        },
        {
          id: "3",
          name: "混合模式降锁",
        },
      ],
    };
  },
  created() {
    this.list1();
  },
  methods: {
    change(val) {
      Administration_om_update_status({
        id: val.id,
        type: val.status,
      }).then((res) => {
        if (res.success == true) {
          this.$Message.success(res.content);
        } else {
          this.$Message.error(res.content);
          this.delete_getData();
        }
      });
    },
    // handleSave() {
    //   let data = {};
    //   data.autoUpdownFlag = this.edidtop_down;
    //   data.digitalFlag = this.three_dimensional;
    //   data.indoorNavFlag = this.app;
    //   data.intelligentNavFlag = this.navigation;
    //   data.indoorScreenFlag = this.induction_screen;
    //   data.appointFlag = this.appointment;
    //   data.shareMode = this.share;
    //   data.calculateFlag = this.calculateFlag;
    //   data.id = this.id;
    //   Administration_prefecture_om_update(data).then((res) => {
    //     if (res.success == true) {
    //       this.$Message.success(res.content);
    //       this.list1();
    //     } else {
    //       this.$Message.error(res.content);
    //     }
    //   });

    //   this.addNew = false;
    // },
    // handleCancel() {
    //   this.addNew = false;
    // },
    // handleDelete(index) {
    //   this.tableData.splice(index, 1);
    //   this.addNew = false;
    // },
    //编辑
    handleEdit(row, index) {
      console.log(row);
      this.modal_implicit = true;
      this.module_title = "编辑车场功能";
      this.edidtop_down = String(row.autoUpdownFlag);
      this.three_dimensional = String(row.digitalFlag);
      this.app = String(row.indoorNavFlag);
      this.navigation = String(row.intelligentNavFlag);
      this.induction_screen = String(row.indoorScreenFlag);
      this.appointment = String(row.appointFlag);
      this.share = String(row.shareMode);
      this.calculateFlag = String(row.calculateFlag);
      this.redValue = row.redValue;
      this.yellowValue = row.yellowValue;
      this.lockMode = String(row.lockMode);
      this.id = row.id;
      this.delayTime = row.delayTime;
      this.editIndex = index;
    },
    //同步
    synchronization(row) {
      this.synchronization_loading = true;
      Administration_biz_prefecture_om_sync({
        preId: row.id,
      }).then((res) => {
        if (res.success == true) {
          this.$Message.success(res.content);
          this.delete_getData();
        } else {
          this.$Message.error(res.content);
        }
        this.synchronization_loading = false;
      });
    },
    list1() {
      this.list = [];
      this.current = 1;
      let data = this.datas;
      let start = data.start;
      let pageSize = data.pageSize;
      let filterJson = data.filterJson;
      this.loading = true;
      Administration_om_list({
        start,
        pageSize,
        filterJson,
      }).then((res) => {
        this.list = res.list;
        this.totals = res.total;
        this.loading = false;
      });
    },
    getData(value) {
      if (!value) {
        value = {
          start: 0,
          pageSize: 10,
          filterJson: "",
        };
      }
      this.list = [];
      this.data = value;
      let start = value.start;
      let pageSize = value.pageSize;
      let filterJson = value.filterJson;
      this.current = 1;
      this.loading = true;
      Administration_om_list({
        start,
        pageSize,
        filterJson,
      }).then((res) => {
        this.totals = res.total;
        this.list = res.list;
        this.loading = false;
      });
    },
    delete_getData() {
      let value = "";
      if (!this.data) {
        value = {
          start: 0,
          pageSize: 10,
          filterJson: "",
        };
      } else {
        value = this.data;
      }
      this.list = [];
      let start = value.start;
      let pageSize = value.pageSize;
      let filterJson = value.filterJson;
      this.current = 1;
      this.loading = true;
      Administration_om_list({
        start,
        pageSize,
        filterJson,
      }).then((res) => {
        this.totals = res.total;
        this.list = res.list;
        this.loading = false;
      });
    },
    jump(value) {
      this.loading = true;
      let data = "";
      if (this.data) {
        data = this.data;
      } else {
        data = this.datas;
      }
      this.list = [];
      let start = (value - 1) * data.pageSize;
      let pageSize = data.pageSize;
      let filterJson = data.filterJson;
      Administration_om_list({
        start,
        pageSize,
        filterJson,
      }).then((res) => {
        this.totals = res.total;
        this.current = value;
        this.list = res.list;
        this.loading = false;
      });
    },
    //弹框确定
    click_module() {
      if (!this.redValue) {
        this.$Message.error("请填写紧缺数");
        return;
      }
      if (!this.yellowValue) {
        this.$Message.error("请填写紧张数");
        return;
      }
      if (!this.delayTime) {
        this.$Message.error("请填写降锁延迟时间");
        return;
      }
      this.loading_btn = true;
      let data = {};
      data.autoUpdownFlag = this.edidtop_down;
      data.digitalFlag = this.three_dimensional;
      data.indoorNavFlag = this.app;
      data.intelligentNavFlag = this.navigation;
      data.indoorScreenFlag = this.induction_screen;
      data.appointFlag = this.appointment;
      data.shareMode = this.share;
      data.calculateFlag = this.calculateFlag;
      data.redValue = this.redValue;
      data.yellowValue = this.yellowValue;
      data.lockMode = this.lockMode;
      data.delayTime = this.delayTime;
      data.id = this.id;
      Administration_prefecture_om_update(data).then((res) => {
        if (res.success == true) {
          this.$Message.success(res.content);
          this.modal_implicit = false;
          this.delete_getData();
        } else {
          this.$Message.error(res.content);
        }
        this.loading_btn = false;
      });
    },
    //弹框取消
    cancle() {
      this.modal_implicit = false;
      this.loading_btn = false;
    },
  },
};
</script>
