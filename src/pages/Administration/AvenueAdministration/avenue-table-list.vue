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
.user_modal {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 1000;
}
.user_content {
  width: 40%;
  min-width: 350px;
  min-height: 100px;
  background: white;
  position: absolute;
  right: 30%;
  top: 20%;
  border-radius: 5px;
  box-sizing: border-box;
  padding: 1vw 2vw;
}
.user_title {
  width: 100%;
  font-size: 1vw;
  /* border: 1px solid red; */
}
.user_text {
  width: 100%;
  height: 90%;
  /* border: 1px solid; */
}
.user_input1 {
  width: 100%;
  height: 20%;
  padding: 0 1vw;
  margin-top: 1vw;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  /* border: 1px solid red; */
}
.user_input2 {
  width: 100%;
  height: 20%;
  padding: 0 1vw;
  margin-top: 1vw;
  display: flex;
  justify-content: flex-start;
  align-items: top;
  /* border: 1px solid red; */
}
.user_btn {
  width: 70%;
  margin: 0 auto;
  margin-top: 1vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.user_btn1,
.user_btn2 {
  width: 40%;
  height: 2.5vw;
  padding: 0.5vw 0;
  border-radius: 5px;
  outline: none;
  border: none;
  color: white;
  font-size: 0.9vw;
}
.user_btn1 {
  background: #f66913;
}
.user_btn1:hover {
  background: #f66913;
  color: white;
}
.user_btn2 {
  background: #545c6a;
}
.user_btn2:hover {
  background: #545c6a;
  color: white;
}
.add {
  padding-left: 10px;
  padding-right: 10px;
  border: 1px dashed #657180;
  color: #657180;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
  box-sizing: border-box;
  font-weight: 200;
  width: 18%;
  min-width: 70px;
  margin-left: 5px;
}
.empower_textrights {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
.contents {
  width: 40%;
  height: 25%;
  background: white;
  position: fixed;
  top: 20%;
  right: 30%;
  border-radius: 5px;
}
.tops {
  width: 80%;
  border: 1px solid #e3e8ee;
  margin: 0 auto;
  height: 60%;
  margin-top: 3%;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.bottoms {
  width: 80%;
  height: 30%;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.save {
  width: 30%;
  height: 2.5vw;
  border: none;
  border-radius: 5px;
  color: white;
  background: #f66913;
  outline: none;
  cursor: pointer;
  font-size: 0.9vw;
}
.cancels {
  width: 30%;
  height: 2.5vw;
  border: none;
  border-radius: 5px;
  color: white;
  background: #545c6a;
  outline: none;
  cursor: pointer;
  font-size: 0.9vw;
}
.user_label {
  display: inline-block;
  width: 60px;
  text-align-last: justify;
  // border: 1px solid;
  margin-top: 5px;
}
.user_labels {
  display: inline-block;
  width: 40px;
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
  // display: flex;
  // justify-items: top;
}
.module_divs2 {
  width: 95%;
  // border: 1px solid red;
  margin-top: 10px;
  padding-left: 8%;
  display: flex;
  justify-items: center;
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
.p {
  margin-bottom: 10px;
}
</style>
<template>
  <div class="i-table-no-border">
    <Button type="primary" @click="add_avenue">增加车道</Button>
    <Table
      ref="table"
      :columns="columns"
      :data="list"
      :loading="loading"
      class="ivu-mt"
    >
      <template slot-scope="{ row }" slot="laneName">
        <div>{{ row.laneName }}</div>
      </template>
    </Table>
    <div class="ivu-mt ivu-text-center">
      <Page :total="totals" show-total :current="current" @on-change="jump" />
    </div>

    <Modal
      :title="module_title"
      v-model="modal9"
      :styles="{ top: '25%' }"
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
            clearable
            filterable
            style="width: 70%; margin-left: 10px"
          >
            <Option
              v-for="(item, index) in preIdlist"
              :value="item.id"
              :key="index"
              >{{ item.name }}</Option
            >
          </Select>
          <!-- <span v-else-if="module_title == '编辑车位'" class="span_else">车场名称</span> -->
        </div>
        <!-- 楼层 -->
        <div class="module_divs">
          <label for style="color: red">*</label>
          <label for class="user_label">楼层</label>:
          <Select
            v-model="add_data.floor"
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
            v-model="add_data.areaName"
            clearable
            :disabled="dis"
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
        <!-- 第一路口 -->
        <div class="module_divs2">
          <Tooltip style="margin-left: -9px; margin-top: 5px" max-width="200">
            <Icon type="ios-help-circle-outline" />
            <div slot="content" style="white-space: normal">
              <p class="p">1.CAD图，上北下南，左西右东摆好位置</p>
              <p class="p">
                2.图中纵向车道以字母表示，从左至右分别为A,B,C...,横向车道以数字表示，从下至上分别为1,2,3,...
              </p>
              <p class="p">
                3.每个路口有交叉点，如A1,B2等，两个交叉点间表示一个车道
              </p>
              <p class="p">
                4.车道名规则：楼层-第一个路口（左边的路口或下边的路口）-第二个路口（右边的路口或下边的路口）
              </p>
            </div>
          </Tooltip>

          <label for class="user_label">第一路口</label>
          <span style="margin-top: 5px">:</span>
          <!-- <Select v-model="model8" clearable style="width:70%;margin-Left:10px;">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>-->
          <div style="width: 74%">
            <label for style="color: red; margin-left: 15px">*</label>
            <label for class="user_labels">横向</label>:
            <Select v-model="one_transverse" clearable style="width: 27%">
              <Option
                v-for="(item, index) in transverselist"
                :value="item.name"
                :key="index"
                >{{ item.name }}</Option
              >
            </Select>

            <label for style="color: red; margin-left: 15px">*</label>
            <label for class="user_labels">纵向</label>:
            <Select v-model="one_portrait" clearable style="width: 27%">
              <Option
                v-for="(item, index) in portraitlist"
                :value="item.name"
                :key="index"
                >{{ item.name }}</Option
              >
            </Select>
          </div>
        </div>

        <!-- 第二路口 -->
        <div class="module_divs2">
          <label for style="color: white">*</label>
          <label for class="user_label">第二路口</label>
          <span style="margin-top: 5px">:</span>
          <div style="width: 74%">
            <label for style="color: red; margin-left: 15px">*</label>
            <label for class="user_labels">横向</label>:
            <Select v-model="two_transverse" clearable style="width: 27%">
              <Option
                v-for="(item, index) in transverselist"
                :value="item.name"
                :key="index"
                >{{ item.name }}</Option
              >
            </Select>

            <label for style="color: red; margin-left: 15px">*</label>
            <label for class="user_labels">纵向</label>:
            <Select v-model="two_portrait" clearable style="width: 27%">
              <Option
                v-for="(item, index) in portraitlist"
                :value="item.name"
                :key="index"
                >{{ item.name }}</Option
              >
            </Select>
          </div>
        </div>
        <!-- 车道名称 -->
        <div class="module_divs">
          <label for style="color: white">*</label>
          <label for class="user_label">车道名称</label>:
          <span style="margin-left: 15px"
            >{{ add_data.floor ? add_data.floor.split("层")[0] : "" }}-{{
              one_transverse ? one_transverse : ""
            }}{{ one_portrait ? one_portrait : "" }}-{{
              two_transverse ? two_transverse : ""
            }}{{ two_portrait ? two_portrait : "" }}</span
          >
        </div>
        <div class="module_switch">
          <div class="module_divs1">
            <label for class="divs1_label">自动降锁</label>
            <Switch
              v-model="add_data.autoDownFlag"
              :true-value="1"
              :false-value="0"
            />
          </div>
          <div class="module_divs1">
            <label for class="divs1_label">自动升锁</label>
            <Switch
              v-model="add_data.autoUpFlag"
              :true-value="1"
              :false-value="0"
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
          <!-- <Select v-model="model8" clearable style="width:70%;margin-Left:10px;">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>-->
        </div>
      </div>
    </Modal>
  </div>
</template>
<script>
import random from "@/libs/random_str";
import {
  //车道列表
  Administration_lane_om_list,
  //车位列表查询选项级联接口
  Administration_om_floor_area_stall_list,
  //车场下拉框列表
  Administration_selectList,
  //新增车道
  Administration_lane_om_save,
  //编辑车道
  Administration_lane_om_update,
  //删除车道
  Administration_lane_om_delete,
  //自动降锁标识
  Administration_lane_om_auto_down_flag,
  //自动升锁标识
  Administration_lane_om_auto_up_flag,
} from "@/api/Administration";
import time from "@/api/time";

export default {
  data() {
    return {
      one_transverse: "",
      transverselist: [
        {
          name: "1",
        },
        {
          name: "2",
        },
        {
          name: "3",
        },
        {
          name: "4",
        },
        {
          name: "5",
        },
        {
          name: "6",
        },
        {
          name: "7",
        },
        {
          name: "8",
        },
        {
          name: "9",
        },
        {
          name: "10",
        },
        {
          name: "11",
        },
        {
          name: "12",
        },
        {
          name: "13",
        },
        {
          name: "14",
        },
        {
          name: "15",
        },
        {
          name: "16",
        },
        {
          name: "17",
        },
        {
          name: "18",
        },
        {
          name: "19",
        },
        {
          name: "20",
        },
        {
          name: "21",
        },
        {
          name: "22",
        },
        {
          name: "23",
        },
        {
          name: "24",
        },
      ],
      two_transverse: "",
      one_portrait: "",
      portraitlist: [
        {
          name: "A",
        },
        {
          name: "B",
        },
        {
          name: "C",
        },
        {
          name: "D",
        },
        {
          name: "E",
        },
        {
          name: "F",
        },
        {
          name: "G",
        },
        {
          name: "H",
        },
        {
          name: "I",
        },
        {
          name: "J",
        },
        {
          name: "K",
        },
        {
          name: "L",
        },
        {
          name: "M",
        },
        {
          name: "N",
        },
        {
          name: "O",
        },
        {
          name: "P",
        },
        {
          name: "Q",
        },
        {
          name: "R",
        },
        {
          name: "S",
        },
        {
          name: "T",
        },
        {
          name: "U",
        },
        {
          name: "V",
        },
        {
          name: "W",
        },
        {
          name: "X",
        },
        {
          name: "Y",
        },
        {
          name: "Z",
        },
      ],
      two_portrait: "",
      loading_btn: false,
      add_data: {},
      preIdlist: [],
      floorList: [],
      areaNameList: [],
      model11: "",
      value6: "",
      module_title: "",
      model8: "",
      modal9: false,
      user_name: "", //添加用户 用户姓名
      user_mobile: "", //添加用户 手机号码
      user_plateNo: "", //添加用户 车牌号码
      model1: "京",
      values: "",
      text: "", //添加用户 备注
      user_loading: false, //按钮loading
      btn_loading: false,
      totals: 10,
      data: "",
      module_ellipsis: [],
      modal10: true,
      columns: [
        {
          title: "车场名称",
          key: "parkName",
          align: "center",
          minWidth: 160,
          // sortable: "custom"
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
          title: "车道名",
          key: "laneName",
          slot: "laneName",
          align: "center",
          minWidth: 100,
          renderHeader: (h, params) => {
            let menu = null;
            menu = h("div", [
              h("span", "车道名"),
              h(
                "Tooltip",
                {
                  props: { placement: "top", transfer: true },
                },
                [
                  "?",
                  h(
                    "p",
                    {
                      slot: "content",
                      style: {
                        whiteSpace: "normal",
                        marginBottom: "10px",
                      },
                    },
                    "1.CAD图，上北下南，左西右东摆好位置"
                  ),
                  h(
                    "p",
                    {
                      slot: "content",
                      style: {
                        whiteSpace: "normal",
                        marginBottom: "10px",
                      },
                    },
                    "2.图中纵向车道以字母表示，从左至右分别为A,B,C...,横向车道以数字表示，从下至上分别为1,2,3,..."
                  ),
                  h(
                    "p",
                    {
                      slot: "content",
                      style: {
                        whiteSpace: "normal",
                        marginBottom: "10px",
                      },
                    },
                    "3.每个路口有交叉点，如A1,B2等，两个交叉点间表示一个车道"
                  ),
                  h(
                    "p",
                    {
                      slot: "content",
                      style: {
                        whiteSpace: "normal",
                      },
                    },
                    "4.车道名规则：楼层-第一个路口(左边的路口或下边的路口)-第二个路口(右边的路口或下边的路口)"
                  ),
                ]
              ),
            ]);
            return menu;
          },
        },
        {
          title: "车位数",
          key: "stallNumber",
          align: "center",
          minWidth: 120,
        },
        {
          title: "车道相机",
          key: "laneCameraNumber",
          align: "center",
          minWidth: 130,
        },
        {
          title: "自动升锁",
          key: "autoUpFlag",
          minWidth: 100,
          align: "center",
          render: (h, params) => {
            let parking = params.row;
            let flag = params.row.autoUpFlag;
            let menu = null;
            menu = h("div", [
              h("i-switch", {
                props: {
                  type: "warning",
                  size: "large",
                  value: flag == 1, // 控制开关的打开或关闭状态，官网文档属性是value
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
                      this.autoUpFlag_open(id);
                    } else {
                      this.autoUpFlag_close(id);
                    }
                  },
                },
              }),
            ]);
            return menu;
          },
        },

        {
          title: "自动降锁",
          key: "autoDownFlag",
          minWidth: 100,
          align: "center",
          render: (h, params) => {
            let parking = params.row;
            let flag = params.row.autoDownFlag;
            let menu = null;
            menu = h("div", [
              h("i-switch", {
                props: {
                  type: "warning",
                  size: "large",
                  value: flag == 1, // 控制开关的打开或关闭状态，官网文档属性是value
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
                      this.autoDownFlag_open(id);
                    } else {
                      this.autoDownFlag_close(id);
                    }
                  },
                },
              }),
            ]);
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
                    marginRight: "5px",
                    cursor: "pointer",
                  },
                  on: {
                    click: () => {
                      this.edit(parking);
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
            return menu;
          },
        },
      ],
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
    };
  },
  created() {
    this.list1();
  },
  watch: {
    "add_data.preId"(val, oldval) {
      if (val) {
        Administration_om_floor_area_stall_list({ preId: val }).then((res) => {
          this.dis = false;
          this.floorList = res;
        });
      } else {
        this.dis = true;
        this.add_data.floor = "";
        this.add_data.areaName = -1;
      }
    },
    "add_data.floor"(val, oldVal) {
      //普通的watch监听
      this.floorList.map((res) => {
        if (res.id == val) {
          this.areaNameList = res.areaSelectList;
        }
      });
      if (!val) {
        this.areaNameList = [];
        this.add_data.areaName = "";
      }
    },
  },
  methods: {
    handleCreate1(val) {
      this.areaNameList.push({
        value: val,
        label: val,
      });
    },
    //增加车道
    add_avenue() {
      this.modal9 = true;
      this.module_title = "新增车道";
      Administration_selectList().then((res) => {
        this.preIdlist = res;
      });
    },
    modalok() {
      this.loading_btn = true;
      if (!this.add_data.preId) {
        this.$Message.error("请选择车场");
        this.loading_btn = false;
      } else if (!this.add_data.floor) {
        this.$Message.error("请选择楼层");
        this.loading_btn = false;
      } else if (!this.one_transverse) {
        this.$Message.error("请选择第一路口-横向");
        this.loading_btn = false;
      } else if (!this.one_portrait) {
        this.$Message.error("请选择第一路口-纵向");
        this.loading_btn = false;
      } else if (!this.two_transverse) {
        this.$Message.error("请选择第二路口-横向");
        this.loading_btn = false;
      } else if (!this.two_portrait) {
        this.$Message.error("请选择第二路口-纵向");
        this.loading_btn = false;
      } else {
        this.add_data.laneName =
          this.add_data.floor.split("层")[0] +
          "-" +
          this.one_transverse +
          this.one_portrait +
          "-" +
          this.two_transverse +
          this.two_portrait;
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
        Administration_lane_om_save(this.add_data).then((res) => {
          if (res.success == true) {
            this.$Message.success(res.content);
            this.modal9 = false;
            this.$emit("Reset");
          } else {
            this.$Message.error(res.content);
          }
          this.loading_btn = false;
        });
      }
    },
    modalcancel() {
      this.modal9 = false;
      this.loading_btn = false;
    },
    delete(e) {
      this.$Modal.confirm({
        title: "确定删除",
        onOk: () => {
          Administration_lane_om_delete({ id: e.id }).then((res) => {
            if (res.success == true) {
              this.$Message.success(res.content);
              this.delete_getData();
            } else {
              this.$Message.error(res.content);
            }
          });
        },
        onCancel: () => {},
      });
    },
    edit(val) {
      this.$router.push({
        path: "/Administration/AvenueAdministration/AvenueAdministration_edit",
        query: val,
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
      Administration_lane_om_list({
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
      Administration_lane_om_list({
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
      Administration_lane_om_list({
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
      Administration_lane_om_list({
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
    //显示省略车牌号
    showEllipsis(plates) {
      this.module_ellipsis = plates.split(",");
      this.modal10 = true;
    },
    del() {
      this.modal10 = false;
    },
    // 自动升锁 启用
    autoUpFlag_open(id) {
      Administration_lane_om_auto_up_flag({
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
    // 自动升锁 禁用
    autoUpFlag_close(id) {
      Administration_lane_om_auto_up_flag({
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
    //自动降锁 开启
    autoDownFlag_open(id) {
      Administration_lane_om_auto_down_flag({
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
    //自动降锁 禁用
    autoDownFlag_close(id) {
      Administration_lane_om_auto_down_flag({
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
  },
};
</script>
