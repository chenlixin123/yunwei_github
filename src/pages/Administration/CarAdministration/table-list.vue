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
  width: 60px;
  text-align-last: justify;
  // border: 1px solid;
  // margin-right: 10px;
}
.module_divs {
  width: 95%;
  // border: 1px solid red;
  margin-top: 10px;
  // display: flex;
  padding-left: 8%;
}
.module_divs3 {
  width: 95%;
  // border: 1px solid red;
  margin-top: 10px;
  // display: flex;
  padding-left: 8%;
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
    <Button type="primary" @click="module_true">增加车位</Button>
    <!-- <Button type="info" @click="out" :loading="btn_loading" class="ivu-ml-16">导出</Button> -->
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
        <div v-if="row.type === 0">临停车位</div>
        <div v-else>固定车位</div>
      </template>
      <template slot-scope="{ row }" slot="chargeSpecialFlag">
        <div v-if="row.chargeSpecialFlag === 0">否</div>
        <div v-else-if="row.chargeSpecialFlag === 1">是</div>
      </template>
      <template slot-scope="{ row }" slot="stallCamera">
        <div v-if="row.stallCamera === 0">无</div>
        <div v-else-if="row.stallCamera === 1">有</div>
      </template>
      <template slot-scope="{ row }" slot="rentStatus">
        <Badge v-if="row.rentStatus === 1" status="success" text="已租" />
        <Badge v-else-if="row.rentStatus === 2" status="default" text="未租" />
        <Badge v-else-if="row.rentStatus === 3" status="error" text="过期" />
        <Badge v-else status="success" text="禁用" />
      </template>
    </Table>
    <div class="ivu-mt ivu-text-center">
      <Page :total="totals" show-total :current="current" @on-change="jump" />
    </div>

    <Modal
      :title="module_title"
      v-model="modal9"
      :styles="{ top: '20%', width: '30%' }"
      :mask-closable="false"
    >
      <div slot="footer">
        <Button @click="modalcancel">取消</Button>
        <Button @click="modalok" type="primary" :loading="loading_btn"
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
            @on-select="add_data_preId"
            @on-clear="add_data_preId_clear"
            clearable
            filterable
            style="width: 70%; margin-left: 10px"
            v-if="module_title == '增加车位'"
          >
            <Option
              v-for="(item, index) in preIdlist"
              :value="item.id"
              :key="index"
              >{{ item.name }}</Option
            >
          </Select>
          <span v-else-if="module_title == '编辑车位'" class="span_else">{{
            add_data.parkName
          }}</span>
        </div>
        <!-- 楼层 -->
        <div class="module_divs">
          <label for style="color: red">*</label>
          <label for class="user_label">楼层</label>:
          <Select
            v-model="add_data.floor"
            @on-select="add_data_floor"
            @on-clear="add_data_floor_clear"
            clearable
            :disabled="dis"
            style="width: 70%; margin-left: 10px"
          >
            <Option
              v-for="(item, index) in floorList"
              :value="item.id"
              :key="index"
              >{{ item.floorName }}</Option
            >
          </Select>
        </div>
        <!-- 分区 -->
        <div class="module_divs">
          <label for style="color: white">*</label>
          <label for class="user_label">分区</label>:
          <Select
            :disabled="dis"
            v-model="add_data.areaName"
            clearable
            @on-create="handleCreate1"
            allow-create
            filterable
            style="width: 70%; margin-left: 10px"
          >
            <Option
              v-for="(item, index) in areaNameList"
              :value="item.areaName"
              :key="index"
              >{{ item.areaName }}</Option
            >
          </Select>
        </div>
        <!-- 车位号 -->
        <div class="module_divs">
          <label for style="color: red">*</label>
          <label for class="user_label">车位号</label>:
          <!-- <Select v-model="model8" clearable style="width:70%;margin-left:10px;">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>-->
          <i-input
            v-model="add_data.stallName"
            placeholder="请输入车位号"
            style="width: 70%; margin-left: 10px"
            v-if="module_title == '增加车位'"
          ></i-input>
          <span class="span_else" v-else-if="module_title == '编辑车位'">{{
            add_data.stallName
          }}</span>
        </div>
        <!-- 车位类型 -->
        <div class="module_divs">
          <label for style="color: white">*</label>
          <label for class="user_label">车位类型</label>:
          <Select
            v-model="add_data.electricFlag"
            clearable
            style="width: 70%; margin-left: 10px"
          >
            <Option
              v-for="item in electricFlagList"
              :value="item.id"
              :key="item.value"
              >{{ item.name }}</Option
            >
          </Select>
        </div>
        <!-- 车位属性 -->
        <div class="module_divs">
          <label for style="color: white">*</label>
          <label for class="user_label">车位属性</label>:
          <Select
            v-model="add_data.type"
            clearable
            @on-select="type_change"
            @on-clear="type_clear"
            style="width: 45%; margin-left: 10px"
          >
            <Option
              v-for="(item, index) in typeList"
              :value="item.id"
              :key="index"
              >{{ item.name }}</Option
            >
          </Select>
          <Checkbox
            v-model="add_data.chargeSpecialFlag"
            :true-value="1"
            :false-value="0"
            :disabled="type_disable"
            style="margin-left: 6%"
            >充电专用</Checkbox
          >
        </div>
        <!-- 车位锁 -->
        <div class="module_divs">
          <label for style="color: white">*</label>
          <label for class="user_label">车位锁</label>:
          <Select
            v-model="add_data.lockId"
            clearable
            style="width: 70%; margin-left: 10px"
          >
            <Option
              v-for="(item, index) in lockList"
              :value="item.id"
              :key="index"
              >{{ item.sn }}</Option
            >
          </Select>
        </div>
        <!-- switch开关1 -->
        <div class="module_switch">
          <div class="module_divs1">
            <label for class="divs1_label">自动降锁</label>
            <Switch
              v-model="add_data.autoDownFlag"
              @on-change="autoDownFlag_change"
              :true-value="1"
              :false-value="0"
            />
          </div>
          <div class="module_divs1">
            <label for class="divs1_label">自动升锁</label>
            <Switch
              v-model="add_data.autoUpFlag"
              @on-change="autoUpFlag_change"
              :true-value="1"
              :false-value="0"
            />
          </div>
        </div>
        <!-- switch开关2 -->
        <div class="module_switch">
          <div class="module_divs1 module_divs2">
            <label for class="divs1_label">车位相机升锁</label>
            <Switch
              v-model="add_data.lotCameraUpFlag"
              @on-change="lotCameraUpFlag_change"
              :true-value="1"
              :false-value="0"
              style="margintop: 10px"
            />
          </div>
          <div class="module_divs1">
            <label for class="divs1_label">车位锁感应升锁</label>
            <Switch
              v-model="add_data.lockInductionUpFlag"
              @on-change="lockInductionUpFlag_change"
              :true-value="1"
              :false-value="0"
              style="margintop: 10px"
            />
          </div>
        </div>

        <!-- 备注 -->
        <div class="module_divs3">
          <label for style="color: white">*</label>
          <label for class="user_label">备注</label>:
          <Input
            v-model="add_data.remark"
            type="textarea"
            :rows="4"
            placeholder="请输入备注"
            style="width: 70%; margin-left: 10px"
          />
        </div>
      </div>
    </Modal>
  </div>
</template>
<script>
import random from "@/libs/random_str";
import {
  // 车位管理列表（分页）
  Administration_rent_list,
  //新增车位
  Administration_om_save,
  //车场下拉框列表
  Administration_selectList,
  //未绑定车位锁
  Administration_stall_sn,
  //车位列表查询选项级联接口
  Administration_om_floor_area_stall_list,
  //编辑车位
  Administration_om_update,
  //删除车位
  Administration_om_delete,
  //自动降锁
  Administration_om_auto_down_flag,
  //自动升锁
  Administration_om_auto_up_flag,
  //车位相机自动升锁
  Administration_om_camera_up_flag,
  //车位锁感应自动升锁
  Administration_om_induction_up_flag,
} from "@/api/Administration";
import time from "@/api/time";

export default {
  data() {
    return {
      loading_btn: false,
      type_disable: true,
      add_data: {},
      preIdlist: [],
      floorList: [],
      areaNameList: [],
      lockList: [],
      electricFlagList: [
        {
          id: 0,
          name: "普通车位",
        },
        {
          id: 1,
          name: "电动车位",
        },
      ],
      typeList: [
        {
          id: 0,
          name: "临停",
        },
        {
          id: 2,
          name: "固定",
        },
      ],
      module_title: "",
      value6: "",
      autoDownFlag: 0,
      autoUpFlag: 0,
      lotCameraUpFlag: 0,
      lockInductionUpFlag: 0,
      model8: "",
      cityList: [],
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
          title: "楼层",
          key: "floor",
          minWidth: 80,
          align: "center",
        },
        {
          title: "分区",
          key: "areaName",
          minWidth: 80,
          align: "center",
        },
        {
          title: "车道",
          key: "laneName",
          minWidth: 100,
          align: "center",
        },
        {
          title: "车位号",
          key: "stallName",
          slot: "stallName",
          align: "center",
          minWidth: 100,
          // sortable: "custom"
        },
        {
          title: "车位属性",
          key: "type",
          slot: "type",
          align: "center",
          minWidth: 100,
          // sortable: "custom"
        },
        {
          title: "充电专用",
          key: "chargeSpecialFlag",
          slot: "chargeSpecialFlag",
          align: "center",
          minWidth: 100,
          // sortable: "custom"
        },
        {
          title: "车位相机",
          key: "stallCamera",
          slot: "stallCamera",
          minWidth: 100,
          align: "center",
        },
        {
          title: "车位锁",
          key: "lockSn",
          minWidth: 80,
          align: "center",
          render: (h, params) => {
            let parking = params.row.lockId;
            let value = "";
            if (parking) {
              value = "有";
            } else {
              value = "无";
            }
            return h("div", value);
            // }
          },
        },
        {
          title: "自动降锁",
          key: "autoDownFlag",
          minWidth: 100,
          align: "center",
          render: (h, params) => {
            let parking = params.row;
            let menu = null;
            menu = h("div", [
              h("i-switch", {
                props: {
                  type: "warning",
                  size: "large",
                  value: params.row.autoDownFlag === 1, // 控制开关的打开或关闭状态，官网文档属性是value
                },
                style: {
                  // background:'#f66913',
                  // border:'1px solid #f66913'
                  marginRight: "10px",
                },
                scopedSlots: {
                  open: () => h("span", "正常"),
                  close: () => h("span", "禁用"),
                },
                on: {
                  "on-change": (state) => {
                    let id = params.row.id;
                    if (state) {
                      this.change_autoDownFlag_open(id);
                    } else {
                      this.change_autoDownFlag_close(id);
                    }
                  },
                },
              }),
            ]);
            // }
            return menu;
          },
        },
        {
          title: "自动升锁",
          key: "autoUpFlag",
          minWidth: 100,
          align: "center",
          render: (h, params) => {
            let parking = params.row;
            let menu = null;
            menu = h("div", [
              h("i-switch", {
                props: {
                  type: "warning",
                  size: "large",
                  value: params.row.autoUpFlag === 1, // 控制开关的打开或关闭状态，官网文档属性是value
                },
                style: {
                  marginRight: "10px",
                },
                scopedSlots: {
                  open: () => h("span", "正常"),
                  close: () => h("span", "禁用"),
                },
                on: {
                  "on-change": (state) => {
                    let id = params.row.id;
                    if (state) {
                      this.change_autoUpFlag_open(id);
                    } else {
                      this.change_autoUpFlag_close(id);
                    }
                  },
                },
              }),
            ]);
            // }
            return menu;
          },
        },
        {
          key: "lotCameraUpFlag",
          minWidth: 100,
          align: "center",
          renderHeader: (h, params) => {
            let menu = null;
            menu = h("div", [h("p", "车位相机"), h("p", "升锁")]);
            return menu;
          },
          render: (h, params) => {
            let parking = params.row;
            let menu = null;
            menu = h("div", [
              h("i-switch", {
                props: {
                  type: "warning",
                  size: "large",
                  value: params.row.lotCameraUpFlag === 1, // 控制开关的打开或关闭状态，官网文档属性是value
                },
                style: {
                  marginRight: "10px",
                },
                scopedSlots: {
                  open: () => h("span", "正常"),
                  close: () => h("span", "禁用"),
                },
                on: {
                  "on-change": (state) => {
                    let id = params.row.id;
                    if (state) {
                      this.change_lotCameraUpFlag_open(id);
                    } else {
                      this.change_lotCameraUpFlag_close(id);
                    }
                  },
                },
              }),
            ]);
            // }

            return menu;
          },
        },
        {
          key: "lockInductionUpFlag",
          minWidth: 100,
          align: "center",
          renderHeader: (h, params) => {
            let menu = null;
            menu = h("div", [h("p", "车位锁感"), h("p", "应升锁")]);
            return menu;
          },
          render: (h, params) => {
            let parking = params.row;
            let menu = null;
            menu = h("div", [
              h("i-switch", {
                props: {
                  type: "warning",
                  size: "large",
                  value: params.row.lockInductionUpFlag === 1, // 控制开关的打开或关闭状态，官网文档属性是value
                },
                style: {
                  marginRight: "10px",
                },
                scopedSlots: {
                  open: () => h("span", "正常"),
                  close: () => h("span", "禁用"),
                },
                on: {
                  "on-change": (state) => {
                    let id = params.row.id;
                    if (state) {
                      this.change_lockInductionUpFlag_open(id);
                    } else {
                      this.change_lockInductionUpFlag_close(id);
                    }
                  },
                },
              }),
            ]);
            // }

            return menu;
          },
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
            // }

            return menu;
          },
        },
      ],
      chargeSpecialFlag: "",
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
      dis: true,
      id: "",
    };
  },
  created() {
    this.list1();
  },

  methods: {
    handleCreate1(val) {
      this.areaNameList.push({
        value: val,
        label: val,
      });
    },
    module_true() {
      this.modal9 = true;
      this.module_title = "增加车位";
      Administration_selectList().then((res) => {
        this.preIdlist = res;
      });
      Administration_stall_sn({ lockId: -1 }).then((res) => {
        this.lockList = res;
      });
      this.add_data.chargeSpecialFlag = 0;
      this.add_data.autoDownFlag = 0;
      this.add_data.autoUpFlag = 0;
      this.add_data.lotCameraUpFlag = 0;
      this.add_data.lockInductionUpFlag = 0;
      this.add_data = {};
    },
    modalcancel() {
      this.modal9 = false;
      this.loading_btn = false;
    },

    modalok() {
      this.loading_btn = true;
      if (this.add_data.chargeSpecialFlag == 1) {
        this.add_data.chargeSpecialFlag = 1;
      } else {
        this.add_data.chargeSpecialFlag = 0;
      }
      if (this.add_data.autoDownFlag == 1) {
        this.add_data.autoDownFlag = 1;
      } else {
        this.add_data.autoDownFlag = 0;
      }

      if (this.add_data.autoUpFlag == 1) {
        this.add_data.autoUpFlag = 1;
      } else {
        this.add_data.autoUpFlag = 0;
      }

      if (this.add_data.lotCameraUpFlag == 1) {
        this.add_data.lotCameraUpFlag = 1;
      } else {
        this.add_data.lotCameraUpFlag = 0;
      }

      if (this.add_data.lockInductionUpFlag == 1) {
        this.add_data.lockInductionUpFlag = 1;
      } else {
        this.add_data.lockInductionUpFlag = 0;
      }
      if (!this.add_data.areaName) {
        this.add_data.areaName = "";
      }
      if (this.module_title == "增加车位") {
        if (!this.add_data.preId) {
          this.$Message.error("请选择车场");
          this.loading_btn = false;
        } else if (!this.add_data.floor) {
          this.$Message.error("请选择楼层");
          this.loading_btn = false;
        } else if (!this.add_data.stallName) {
          this.$Message.error("请填写车位号");
          this.loading_btn = false;
        } else {
          Administration_om_save(this.add_data).then((res) => {
            if (res.success == true) {
              this.modal9 = false;
              // this.list1();
              this.$emit("reset");
              this.$Message.success(res.content);
            } else {
              this.$Message.error(res.content);
            }
            this.loading_btn = false;
          });
        }
      } else {
        if (!this.add_data.preId) {
          this.$Message.error("请选择车场");
          this.loading_btn = false;
        } else if (!this.add_data.floor) {
          this.$Message.error("请选择楼层");
          this.loading_btn = false;
        } else if (!this.add_data.stallName) {
          this.$Message.error("请填写车位号");
          this.loading_btn = false;
        } else {
          this.add_data.id = this.id;
          if (!this.add_data.lockId) {
            this.add_data.lockId = "";
          }
          Administration_om_update(this.add_data).then((res) => {
            if (res.success == true) {
              this.modal9 = false;
              this.delete_getData();
              this.$Message.success(res.content);
            } else {
              this.$Message.error(res.content);
            }
            this.loading_btn = false;
          });
        }
      }
    },
    cancle() {},
    //自动降锁开启
    change_autoDownFlag_open(id) {
      Administration_om_auto_down_flag({
        id: id,
        type: 1,
      }).then((res) => {
        if (res.success == true) {
          this.$Message.success(res.content);
        } else {
          this.$Message.error(res.content);
          this.delete_getData();
        }
      });
    },
    //自动降锁禁用
    change_autoDownFlag_close(id) {
      Administration_om_auto_down_flag({
        id: id,
        type: 0,
      }).then((res) => {
        if (res.success == true) {
          this.$Message.success(res.content);
        } else {
          this.$Message.error(res.content);
          this.delete_getData();
        }
      });
    },
    //自动升锁开启
    change_autoUpFlag_open(id) {
      Administration_om_auto_up_flag({
        id: id,
        type: 1,
      }).then((res) => {
        if (res.success == true) {
          this.$Message.success(res.content);
        } else {
          this.$Message.error(res.content);
          this.delete_getData();
        }
      });
    },
    //自动升锁关闭
    change_autoUpFlag_close(id) {
      Administration_om_auto_up_flag({
        id: id,
        type: 0,
      }).then((res) => {
        if (res.success == true) {
          this.$Message.success(res.content);
        } else {
          this.$Message.error(res.content);
          this.delete_getData();
        }
      });
    },
    //车位相机升锁开启
    change_lotCameraUpFlag_open(id) {
      Administration_om_camera_up_flag({
        id: id,
        type: 1,
      }).then((res) => {
        if (res.success == true) {
          this.$Message.success(res.content);
        } else {
          this.$Message.error(res.content);
          this.delete_getData();
        }
      });
    },
    //车位相机升锁关闭
    change_lotCameraUpFlag_close(id) {
      Administration_om_camera_up_flag({
        id: id,
        type: 0,
      }).then((res) => {
        if (res.success == true) {
          this.$Message.success(res.content);
        } else {
          this.$Message.error(res.content);
          this.delete_getData();
        }
      });
    },
    //车位锁感应升锁开启
    change_lockInductionUpFlag_open(id) {
      Administration_om_induction_up_flag({
        id: id,
        type: 1,
      }).then((res) => {
        if (res.success == true) {
          this.$Message.success(res.content);
        } else {
          this.$Message.error(res.content);
          this.delete_getData();
        }
      });
    },
    //车位锁感应升锁关闭
    change_lockInductionUpFlag_close(id) {
      Administration_om_induction_up_flag({
        id: id,
        type: 0,
      }).then((res) => {
        if (res.success == true) {
          this.$Message.success(res.content);
        } else {
          this.$Message.error(res.content);
          this.delete_getData();
        }
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
      Administration_rent_list({
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
      Administration_rent_list({
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
      Administration_rent_list({
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
      Administration_rent_list({
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
    delete(e) {
      this.$Modal.confirm({
        title: "确定删除",
        onOk: () => {
          Administration_om_delete({ id: e.id }).then((res) => {
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
      Administration_om_floor_area_stall_list({ preId: val.preId }).then(
        (res) => {
          this.dis = false;
          this.floorList = res;
          this.floorList.map((res) => {
            if (res.floorName == val.floor) {
              this.areaNameList = res.areaSelectList;
            }
          });
        }
      );
      this.add_data = {};
      Administration_stall_sn({ lockId: val.lockId ? val.lockId : "-1" }).then(
        (res) => {
          this.lockList = res;
          this.add_data.preId = val.preId;
          this.id = val.id;
          this.add_data.floor = val.floor;
          this.add_data.areaName = val.areaName;
          this.add_data.stallName = val.stallName;

          this.add_data.type = val.type;

          this.add_data.lockId = val.lockId;

          this.add_data.remark = val.remark;
          this.add_data.parkName = val.parkName;
          if (val.chargeSpecialFlag == 1) {
            this.type_disable = false;
            this.add_data.chargeSpecialFlag = 1;
          } else {
            this.add_data.chargeSpecialFlag = 0;
            this.type_disable = true;
          }
          if (val.autoDownFlag == 1) {
            this.add_data.autoDownFlag = 1;
          } else {
            this.add_data.autoDownFlag = 0;
          }

          if (val.autoUpFlag == 1) {
            this.add_data.autoUpFlag = 1;
          } else {
            this.add_data.autoUpFlag = 0;
          }

          if (val.lotCameraUpFlag == 1) {
            this.add_data.lotCameraUpFlag = 1;
          } else {
            this.add_data.lotCameraUpFlag = 0;
          }

          if (val.lockInductionUpFlag == 1) {
            this.add_data.lockInductionUpFlag = 1;
          } else {
            this.add_data.lockInductionUpFlag = 0;
          }
          this.add_data.electricFlag = val.electricFlag;
        }
      );
      this.modal9 = true;
      this.module_title = "编辑车位";
    },
    type_change(e) {
      if (e.value == 0) {
        this.type_disable = false;
      } else {
        this.add_data.chargeSpecialFlag = 0;
        this.type_disable = true;
      }
    },
    type_clear() {
      this.add_data.chargeSpecialFlag = 0;
      this.type_disable = true;
    },
    //自动降锁
    autoDownFlag_change(e) {
      this.add_data.autoDownFlag = e;
    },
    //自动升锁
    autoUpFlag_change(e) {
      this.add_data.autoUpFlag = e;
    },
    //车位相机升锁
    lotCameraUpFlag_change(e) {
      this.add_data.lotCameraUpFlag = e;
    },
    //车位锁感应升锁
    lockInductionUpFlag_change(e) {
      this.add_data.lockInductionUpFlag = e;
    },
    add_data_preId(e) {
      Administration_om_floor_area_stall_list({ preId: e.value }).then(
        (res) => {
          this.dis = false;
          this.floorList = res;
        }
      );
    },
    add_data_preId_clear() {
      this.dis = true;
      this.add_data.floor = -1;
      this.add_data.areaName = -1;
    },
    add_data_floor(e) {
      this.areaNameList = [];
      this.add_data.areaName = -1;
      this.floorList.map((res) => {
        if (res.id == e.label) {
          this.areaNameList = res.areaSelectList;
        }
      });
    },
    add_data_floor_clear() {
      this.areaNameList = [];
      this.add_data.areaName = -1;
    },
  },
};
</script>
