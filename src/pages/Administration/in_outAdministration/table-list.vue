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
.user_label {
  display: inline-block;
  width: 70px;
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
.module_switch {
  width: 75%;
  margin: 0 auto;
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
}
.module_divs1 {
  width: 33%;
  display: flex;
  justify-content: space-between;
}
.divs1_label {
  width: 50%;
}
.span_else {
  margin-left: 15px;
}
</style>
<template>
  <div class="i-table-no-border">
    <Button type="primary" @click="module_true">新增出入口</Button>
    <!-- <Button type="info" @click="out" :loading="btn_loading" class="ivu-ml-16">导出</Button> -->
    <Table
      ref="table"
      :columns="columns"
      :data="list"
      :loading="loading"
      class="ivu-mt"
    >
      <template slot-scope="{ row }" slot="gateType">
        <div>
          {{
            row.gateType == 1
              ? "入口"
              : row.gateType == 2
              ? "出口"
              : row.gateType == 3
              ? "场中场"
              : ""
          }}
        </div>
      </template>
      <template slot-scope="{ row }" slot="inoutDeviceCode">
        <p v-for="(item, index) in row.inoutDeviceCode" :key="index">
          {{ item }}
        </p>
      </template>
    </Table>
    <div class="ivu-mt ivu-text-center">
      <Page :total="totals" show-total :current="current" @on-change="jump" />
    </div>

    <Modal
      :title="module_title"
      v-model="modal9"
      :styles="{ top: '20%' }"
      :mask-closable="false"
    >
      <div slot="footer">
        <Button @click="cancle">取消</Button>
        <Button @click="click_module" type="primary" :loading="loading_btn"
          >确定</Button
        >
      </div>
      <!-- 车场名称 -->
      <div style="padding-left: 5px">
        <div class="module_divs">
          <label for style="color: red">*</label>
          <label for class="user_label">车场名称</label>:
          <Select
            v-model="add_data.preId"
            clearable
            filterable
            style="width: 70%; margin-left: 10px"
            v-if="module_title == '新增出入口'"
          >
            <Option
              v-for="(item, index) in preIdlist"
              :value="item.id"
              :key="index"
              >{{ item.name }}</Option
            >
          </Select>
          <span v-else-if="module_title == '编辑出入口'" class="span_else">{{
            parkName
          }}</span>
        </div>
        <!-- 出入口名称 -->
        <div class="module_divs">
          <label for style="color: red">*</label>
          <label for class="user_label">出入口名称</label>:
          <i-input
            v-model="add_data.gateName"
            placeholder="请输入出入口名称"
            style="width: 70%; margin-left: 10px"
          ></i-input>
        </div>
        <!-- 出入口类型 -->
        <div class="module_divs">
          <label for style="color: red">*</label>
          <label for class="user_label">出入口类型</label>:
          <Select
            v-model="add_data.gateType"
            clearable
            @on-select="gateType_change"
            style="width: 70%; margin-left: 10px"
          >
            <Option
              v-for="(item, index) in gateTypelist"
              :value="item.id"
              :key="index"
              >{{ item.name }}</Option
            >
          </Select>
        </div>
        <!-- 场中场联动 -->
        <!-- :disabled="dis" -->
        <!-- 场中场联动禁用属性 dis -->
        <div class="module_divs">
          <label for style="color: white">*</label>
          <label for class="user_label">场中场联动</label>:
          <Select
            v-model="add_data.startFloor"
            clearable
            style="width: 34%; margin-left: 10px"
          >
            <Option
              v-for="(item, index) in Floorlist"
              :value="item.id"
              :key="index"
              >{{ item.floor }}</Option
            >
          </Select>
          <Select
            v-model="add_data.startGateType"
            clearable
            style="width: 34%; margin-left: 10px"
          >
            <Option
              v-for="(item, index) in GateTypelist1"
              :value="item.id"
              :key="index"
              >{{ item.name }}</Option
            >
          </Select>
        </div>
        <div class="module_divs">
          <label for style="color: white">*</label>
          <label for class="user_label"></label>&nbsp;
          <Select
            v-model="add_data.endFloor"
            clearable
            style="width: 34%; margin-left: 10px"
          >
            <Option
              v-for="(item, index) in Floorlist"
              :value="item.id"
              :key="index"
              >{{ item.floor }}</Option
            >
          </Select>
          <Select
            v-model="add_data.endGateType"
            clearable
            style="width: 34%; margin-left: 10px"
          >
            <Option
              v-for="(item, index) in GateTypelist1"
              :value="item.id"
              :key="index"
              >{{ item.name }}</Option
            >
          </Select>
        </div>
        <!-- 闸机 -->
        <div class="module_divs">
          <label for style="color: white">*</label>
          <label for class="user_label">闸机</label>:
          <Select
            v-model="add_data.zhajiDeviceCode"
            clearable
            @on-create="handleCreate1"
            allow-create
            filterable
            style="width: 70%; margin-left: 10px"
          >
            <Option
              v-for="item in zhajiDeviceCodelist"
              :value="item.value"
              :key="item.value"
              >{{ item.label }}</Option
            >
          </Select>
        </div>

        <!-- 出入口相机 -->
        <div class="module_divs">
          <label for style="color: white">*</label>
          <label for class="user_label">出入口相机</label>:
          <Select
            v-model="inoutDeviceCodes"
            clearable
            multiple
            style="width: 70%; margin-left: 10px"
          >
            <Option
              v-for="(item, index) in inoutDeviceCodeslist"
              :value="item.cameraCode"
              :key="index"
              >{{ item.cameraCode }}</Option
            >
          </Select>

          <!-- 备注 -->
          <div class="module_divs3">
            <label for style="color: white">*</label>
            <label for class="user_label">备注</label>:
            <Input
              v-model="add_data.remark"
              type="textarea"
              :rows="4"
              placeholder="请输入备注"
              style="width: 73.5%; margin-left: 15px"
            />
          </div>
        </div>
      </div>
    </Modal>
  </div>
</template>
<script>
import random from "@/libs/random_str";
import {
  //出入口列表
  Administration_gate_info_list,
  //车场下拉框列表
  Administration_selectList,
  //新增出入口
  Administration_gate_save,
  //编辑出入口
  Administration_gate_update,
  //删除出入口
  Administration_gate_delete,
  //出入口相机编码选择框
  Administration_camera_info_select,
  //场中场的列表
  Administration_admin_park_floor_list,
} from "@/api/Administration";
import time from "@/api/time";

export default {
  data() {
    return {
      Floorlist: [],
      loading_btn: false,
      add_data: {},
      preIdlist: [],
      model10: [],
      module_title: "",
      value6: "",
      switch1: false,
      model8: "",
      gateTypelist: [
        {
          id: 1,
          name: "入口",
        },
        {
          id: 2,
          name: "出口",
        },
        {
          id: 3,
          name: "场中场",
        },
      ],
      GateTypelist1: [
        {
          id: 1,
          name: "入口",
        },
        {
          id: 2,
          name: "出口",
        },
      ],
      zhajiDeviceCodelist: [],
      modal9: false,
      btn_loading: false,
      totals: 10,
      data: "",
      module_ellipsis: [],
      modal10: false,
      columns: [
        {
          title: "车场名称",
          key: "parkName",
          minWidth: 180,
          align: "center",
        },
        {
          title: "出入口类型",
          key: "gateType",
          slot: "gateType",
          minWidth: 80,
          align: "center",
        },
        {
          title: "名称",
          key: "gateName",
          minWidth: 150,
          align: "center",
        },
        {
          title: "场中场属性",
          minWidth: 150,
          align: "center",
          render: (h, params) => {
            let parking = params.row;
            let menu = null;
            menu = h("div", [
              h("span", parking.startFloorName),
              h(
                "span",
                parking.startGateType == 1
                  ? "入口"
                  : parking.startGateType == 2
                  ? "出口"
                  : parking.startGateType == 3
                  ? "复合"
                  : ""
              ),
              h(
                "span",
                parking.startFloorName && parking.endFloorName
                  ? "/"
                  : parking.startGateType && parking.endGateType
                  ? "/"
                  : parking.startFloorName
                  ? ""
                  : parking.startGateType
                  ? ""
                  : parking.endFloorName
                  ? ""
                  : parking.endGateType
                  ? ""
                  : "无"
              ),
              h("span", parking.endFloorName),
              h(
                "span",
                parking.endGateType == 1
                  ? "入口"
                  : parking.endGateType == 2
                  ? "出口"
                  : parking.endGateType == 3
                  ? "复合"
                  : ""
              ),
            ]);
            return menu;
          },
        },
        {
          title: "闸机",
          key: "zhajiDeviceCode",
          minWidth: 80,
          align: "center",
        },
        {
          title: "出入口相机",
          key: "inoutDeviceCode",
          slot: "inoutDeviceCode",
          align: "center",
          minWidth: 170,
        },
        {
          title: "备注",
          key: "remark",
          minWidth: 180,
          align: "center",
        },

        {
          title: "操作",
          key: "id",
          minWidth: 100,
          align: "center",
          render: (h, params) => {
            let parking = params.row;
            let menu = null;
            menu = h("div", [
              h(
                "span",
                {
                  style: {
                    size: 26,
                    cursor: "pointer",
                    marginRight: "5px",
                  },
                  on: {
                    click: () => {
                      this.edit(params.row);
                    },
                  },
                },
                "编辑"
              ),
              h(
                "span",
                {
                  props: {
                    size: 26,
                    color: "#19be6b",
                  },
                  style: {
                    cursor: "pointer",
                  },
                  on: {
                    click: () => {
                      this.delete(params.row);
                    },
                  },
                },
                "删除"
              ),
            ]);
            if (params.row.type != 0) {
              return menu;
            }
          },
        },
      ],
      parkName: "",
      single: "",
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
      },
      inoutDeviceCodes: [],
      inoutDeviceCodeslist: [],
      dis: true,
      new_id: "",
    };
  },
  watch: {
    "add_data.preId"(val, oldval) {
      this.new_id = val;
      this.preIdlist.map((res) => {
        if (res.id == val) {
          if (val) {
            Administration_admin_park_floor_list({
              start: 0,
              pageSize: 100,
              filterJson: { filters: [{ property: "preId", value: val }] },
            }).then((res) => {
              this.Floorlist = res.list;
            });
          }
        }
      });
    },
  },
  created() {
    this.list1();
  },

  methods: {
    handleCreate1(val) {
      this.zhajiDeviceCodelist.push({
        value: val,
        label: val,
      });
    },
    module_true() {
      this.modal9 = true;
      this.module_title = "新增出入口";
      this.add_data = {};
      this.inoutDeviceCodes = [];
      Administration_camera_info_select({
        bind: 0,
        gateCode: "",
      }).then((res) => {
        this.inoutDeviceCodeslist = res;
      });
      Administration_admin_park_floor_list({
        start: 0,
        pageSize: 100,
        filterJson: "",
      }).then((res) => {
        console.log("res: ", res);
        this.Floorlist = res.list;
      });
    },
    click_module() {
      if (this.module_title == "新增出入口") {
        this.loading_btn = true;
        let data = "";
        this.inoutDeviceCodes.map((res, index) => {
          data += this.inoutDeviceCodes.length == index + 1 ? res : res + ",";
        });
        this.add_data.inoutDeviceCodes = data;
        if (!this.add_data.preId) {
          this.$Message.error("请选择车场");
          this.loading_btn = false;
        } else if (!this.add_data.gateType) {
          this.$Message.error("请选择出入口类型");
          this.loading_btn = false;
        } else if (!this.add_data.gateName) {
          this.$Message.error("请填写出入口名称");
          this.loading_btn = false;
        } else {
          Administration_gate_save(this.add_data).then((res) => {
            if (res.success == true) {
              this.$Message.success(res.content);
              this.list1();
              this.$emit("Refresh");
              console.log("是这里");
              this.$emit("handleReset");
              this.modal9 = false;
            } else {
              this.$Message.error(res.content);
            }
            this.loading_btn = false;
          });
        }
      } else {
        this.loading_btn = true;
        if (!this.inoutDeviceCodes) {
          this.inoutDeviceCodes = [];
        }
        let data = "";
        this.inoutDeviceCodes.map((res, index) => {
          data += this.inoutDeviceCodes.length == index + 1 ? res : res + ",";
        });
        this.add_data.inoutDeviceCodes = data;
        if (!this.add_data.gateType) {
          this.$Message.error("请选择出入口类型");
          this.loading_btn = false;
        } else if (!this.add_data.gateName) {
          this.$Message.error("请填写出入口名称");
          this.loading_btn = false;
        } else {
          Administration_gate_update(this.add_data).then((res) => {
            if (res.success == true) {
              this.$Message.success(res.content);
              this.delete_getData();
              this.modal9 = false;
            } else {
              this.$Message.error(res.content);
            }
            this.loading_btn = false;
          });
        }
      }
    },
    cancle() {
      this.modal9 = false;
      this.loading_btn = false;
    },
    list1() {
      Administration_selectList().then((res) => {
        this.preIdlist = res;
      });
      this.current = 1;
      let data = this.datas;
      let start = data.start;
      let pageSize = data.pageSize;
      let filterJson = data.filterJson;
      this.loading = true;
      Administration_gate_info_list({
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
      let start = "";
      let pageSize = "";
      let filterJson = "";
      if (value) {
        this.data = value;
        start = value.start;
        pageSize = value.pageSize;
        filterJson = value.filterJson;
      } else {
        start = 0;
        pageSize = 10;
        filterJson = "";
      }
      this.current = 1;
      this.loading = true;
      Administration_gate_info_list({
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
      let start = "";
      let pageSize = "";
      let filterJson = "";
      if (this.data) {
        value = this.data;
        start = value.start;
        pageSize = value.pageSize;
        filterJson = value.filterJson;
      } else {
        start = 0;
        pageSize = 10;
        filterJson = "";
      }
      this.current = 1;
      this.loading = true;
      Administration_gate_info_list({
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
      let start = (value - 1) * data.pageSize;
      let pageSize = data.pageSize;
      let filterJson = data.filterJson;
      Administration_gate_info_list({
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

    //删除
    delete(val) {
      this.$Modal.confirm({
        title: "确定删除",
        onOk: () => {
          Administration_gate_delete({ id: val.id }).then((res) => {
            if (res.success == true) {
              this.$Message.success(res.content);
              this.delete_getData();
            } else {
              this.$Message.error(res.content);
            }
          });
        },
        onCancel: () => {
          // this.$Message.info("Clicked cancel");
        },
      });
    },
    //编辑
    edit(val) {
      this.new_id = val.preId;
      Administration_camera_info_select({
        bind: 0,
        gateCode: val.gateCode,
      }).then((res) => {
        this.inoutDeviceCodeslist = res;
        this.inoutDeviceCodes = val.inoutDeviceCode;
      });
      this.modal9 = true;
      this.module_title = "编辑出入口";
      this.add_data.id = val.id;
      this.add_data.gateCode = val.gateCode;
      this.add_data.parkCode = val.parkCode;
      this.add_data.preId = val.preId;
      this.add_data.gateType = val.gateType;
      this.add_data.gateName = val.gateName;
      this.add_data.zhajiDeviceCode = val.zhajiDeviceCode;
      this.add_data.remark = val.remark;
      this.add_data.startFloor =
        Number(val.startFloor) == 0 ? "" : Number(val.startFloor);
      this.add_data.startGateType = val.startGateType;
      this.add_data.endFloor =
        Number(val.endFloor) == 0 ? "" : Number(val.endFloor);
      this.add_data.endGateType = val.endGateType;
      this.parkName = val.parkName;

      this.preIdlist.map((res) => {
        if (res.id == val.preId) {
          Administration_admin_park_floor_list({
            start: 0,
            pageSize: 100,
            filterJson: { filters: [{ property: "preId", value: val.preId }] },
          }).then((res) => {
            this.Floorlist = res.list;
          });
        }
      });
    },
    gateType_change(e) {
      this.preIdlist.map((res) => {
        if (res.id == this.new_id) {
          if (this.new_id) {
            Administration_admin_park_floor_list({
              start: 0,
              pageSize: 100,
              filterJson: {
                filters: [{ property: "preId", value: this.new_id }],
              },
            }).then((res) => {
              this.Floorlist = res.list;
            });
          }
        }
      });
    },
  },
};
</script>
