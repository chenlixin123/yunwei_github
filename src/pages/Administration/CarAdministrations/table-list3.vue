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
.span_else {
  margin-left: 15px;
}
</style>
<template>
  <div class="i-table-no-border">
    <Button type="primary" @click="add">增加场中场</Button>
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
    </Table>
    <div class="ivu-mt ivu-text-center">
      <Page :total="totals" show-total :current="current" @on-change="jump" />
    </div>
    <Modal
      :title="module_title"
      v-model="modal9"
      :styles="{ top: '10%', width: '40%' }"
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
            v-if="module_title == '添加场中场'"
          >
            <Option
              v-for="(item, index) in preIdlist"
              :value="item.id"
              :key="index"
              >{{ item.name }}</Option
            >
          </Select>
          <span v-else-if="module_title == '编辑场中场'" class="span_else">{{
            parkName
          }}</span>
        </div>
        <!-- 场中场名称 -->
        <div class="module_divs">
          <label for style="color: red">*</label>
          <label for class="user_label">场中场名称</label>:
          <i-input
            v-model="add_data.floor"
            placeholder="请输入场中场名称"
            style="width: 70%; margin-left: 10px"
          ></i-input>
        </div>
        <!-- 场中车位数 -->
        <div class="module_divs">
          <label for style="color: red">*</label>
          <label for class="user_label">场中车位数</label>:
          <i-input
            v-model="add_data.stallSum"
            placeholder="请输入场中车位数"
            style="width: 70%; margin-left: 10px"
          ></i-input>
        </div>

        <!-- 紧张数 -->
        <div class="module_divs">
          <label for style="color: red">*</label>
          <label for class="user_label">紧缺数(红)</label>:
          <i-input
            v-model="add_data.redValue"
            placeholder="请输入紧缺数"
            style="width: 70%; margin-left: 10px"
          ></i-input>
        </div>

        <!-- 紧缺数 -->
        <div class="module_divs">
          <label for style="color: red">*</label>
          <label for class="user_label">紧张数(黄)</label>:
          <i-input
            v-model="add_data.yellowValue"
            placeholder="请输入紧张数"
            style="width: 70%; margin-left: 10px"
          ></i-input>
        </div>

        <div class="module_divs">
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
      <Divider v-if="module_title == '编辑场中场'" />
      <Upload
        action="/"
        name="file"
        ref="upload"
        :headers="headers"
        :before-upload="beforeUpload"
        v-if="module_title == '编辑场中场'"
      >
        <Button icon="ios-cloud-upload-outline" class="btn" type="primary"
          >导入车位</Button
        >
      </Upload>
      <Table
        ref="table"
        :columns="columns1"
        :data="list1s"
        :loading="loading1"
        class="ivu-mt"
        v-if="module_title == '编辑场中场'"
      >
      </Table>
      <div class="ivu-mt ivu-text-center" v-if="module_title == '编辑场中场'">
        <Page
          :total="totals1"
          show-total
          :current="current1"
          :page-size="5"
          @on-change="jump1"
        />
      </div>
    </Modal>

    <Modal
      :title="module_title_table"
      v-model="modal_table"
      :mask-closable="false"
      :styles="{ top: '20%', width: '50%' }"
    >
      <div slot="footer">
        <Button @click="table_cancel">取消</Button>
        <Button @click="table_ok" type="primary" :loading="table_loading_btn"
          >确定</Button
        >
      </div>
      <div style="paddingleft: 30px">
        <Table
          border
          :columns="table_module_columns"
          :data="table_module_data"
        ></Table>
      </div>
    </Modal>
  </div>
</template>
<script>
import {
  //车场列表
  Administration_selectList,
  //场中场列表
  Administration_admin_park_floor_list,
  //场中场新增
  Administration_admin_park_floor_save,
  //场中场编辑
  Administration_admin_park_floor_update,
  //场中场删除
  Administration_admin_park_floor_delete,
  //批量导入
  Administration_admin_park_floor_batchSave,
  //场中场车位列表
  Administration_admin_park_floor_stall_list,
  //启用-禁用
  Administration_admin_park_floor_update_flag,
  //场中场车位删除
  Administration_admin_park_floor_delete_stall,
} from "@/api/Administration";
import mybus from "@/libs/mybus.js";

export default {
  data() {
    return {
      id: "",
      preId: "",
      reverseStallName_distinguish: true,
      table_module_data: [],
      table_module_columns: [],
      table_loading_btn: false,
      modal_table: false,
      module_title_table: "上传文件",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      parkName: "",
      preIdlist: [],
      module_title: "",
      modal9: false,
      loading_btn: false,
      add_data: {
        remark: "",
      },
      totals: 10,
      totals1: 5,
      data: "",
      module_ellipsis: [],
      modal10: false,
      columns: [
        {
          title: "车场名称",
          key: "parkName",
          minWidth: 200,
          align: "center",
        },
        {
          title: "场中场名称",
          key: "floor",
          minWidth: 120,
          align: "center",
        },
        {
          title: "场中场车总位数",
          key: "stallSum",
          align: "center",
          minWidth: 140,
        },
        {
          title: "场中场临停车位数",
          key: "tempStallSum",
          minWidth: 150,
          align: "center",
        },
        {
          title: "场中场固定车位数",
          key: "fixStallSum",
          minWidth: 150,
          align: "center",
        },
        {
          title: "备注",
          key: "remark",
          align: "center",
          minWidth: 200,
        },
        {
          title: "状态",
          key: "status",
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
                  value: params.row.status == 1, // 控制开关的打开或关闭状态，官网文档属性是value
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
                      this.change_status_open(id);
                    } else {
                      this.change_status_close(id);
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
          minWidth: 200,
          align: "center",
          render: (h, params) => {
            let parking = params.row;
            let menu = null;
            menu = h("div", [
              h(
                "div",
                {
                  style: {
                    cursor: "pointer",
                    color: "#f66913",
                    border: "1px solid #f66913",
                    width: "60px",
                    height: "30px",
                    textAling: "center",
                    lineHeight: "30px",
                    borderRadius: "5px",
                    display: "inline-block",
                    marginRight: "5px",
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
                "div",
                {
                  style: {
                    cursor: "pointer",
                    color: "#f66913",
                    border: "1px solid #f66913",
                    width: "60px",
                    height: "30px",
                    textAling: "center",
                    lineHeight: "30px",
                    borderRadius: "5px",
                    display: "inline-block",
                    marginRight: "5px",
                  },
                  on: {
                    click: () => {
                      this.delete(parking);
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
      columns1: [
        {
          title: "车位号",
          key: "stallCode",
          minWidth: 200,
          align: "center",
        },
        {
          title: "车位属性",
          key: "type",
          minWidth: 120,
          align: "center",
          render: (h, params) => {
            let data = params.row.type;
            let name = data == 0 ? "临停" : data == 1 ? "固定" : "";
            return h("div", name);
          },
        },

        {
          title: "操作",
          key: "id",
          minWidth: 200,
          align: "center",
          render: (h, params) => {
            let parking = params.row;
            let menu = null;
            menu = h("div", [
              h(
                "div",
                {
                  style: {
                    cursor: "pointer",
                    color: "#f66913",
                    border: "1px solid #f66913",
                    width: "60px",
                    height: "30px",
                    textAling: "center",
                    lineHeight: "30px",
                    borderRadius: "5px",
                    display: "inline-block",
                    marginRight: "5px",
                  },
                  on: {
                    click: () => {
                      this.delete_module(parking);
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
      loading1: false,
      list1s: [],
      selectedData: [],
      current: 1,
      current1: 1,
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
    };
  },
  created() {
    // this.list1();
  },
  methods: {
    list1() {
      this.list = [];
      this.current = 1;
      let data = this.datas;
      let start = data.start;
      let pageSize = data.pageSize;
      let filterJson = data.filterJson;
      this.loading = true;
      Administration_admin_park_floor_list({
        start,
        pageSize,
        filterJson,
      }).then((res) => {
        this.list = res.list;
        this.totals = res.total;
        this.loading = false;
      });
    },
    getData3(value) {
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
      Administration_admin_park_floor_list({
        start,
        pageSize,
        filterJson,
      }).then((res) => {
        this.totals = res.total;
        this.list = res.list;
        this.loading = false;
      });
    },
    delete_getData3() {
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
      Administration_admin_park_floor_list({
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
      Administration_admin_park_floor_list({
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
    jump1(value) {
      this.loading1 = true;
      let data = {
        start: 0,
        pageSize: 5,
        filterJson: { filters: [{ property: "parkFloorId", value: this.id }] },
      };

      let start = (value - 1) * data.pageSize;
      let pageSize = data.pageSize;
      let filterJson = data.filterJson;
      Administration_admin_park_floor_stall_list({
        start,
        pageSize,
        filterJson,
      }).then((res) => {
        this.totals1 = res.total;
        this.current1 = value;
        this.list1s = res.list;
        this.loading1 = false;
      });
    },
    //删除
    delete(val) {
      this.$Modal.confirm({
        title: "确定删除",
        onOk: () => {
          Administration_admin_park_floor_delete({ id: val.id }).then((res) => {
            if (res.success == true) {
              this.$Message.success(res.content);
              this.delete_getData3();
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
    //增加场中场
    add() {
      this.modal9 = true;
      this.module_title = "添加场中场";
      this.add_data = {
        remark: "",
      };
      Administration_selectList().then((res) => {
        this.preIdlist = res;
      });
    },
    //列表编辑
    edit(val) {
      this.modal9 = true;
      this.module_title = "编辑场中场";
      this.list1s = [];
      this.totals1 = 0;
      this.add_data = {};
      this.id = val.id;
      this.preId = val.preId;
      Administration_selectList().then((res) => {
        this.preIdlist = res;
        res.map((resen) => {
          if (resen.id == val.preId) {
            this.parkName = resen.name;
          }
        });
      });
      this.add_data.preId = val.preId;
      this.add_data.floor = val.floor;
      this.add_data.stallSum = val.stallSum;
      this.add_data.redValue = val.redValue;
      this.add_data.yellowValue = val.yellowValue;
      this.add_data.remark = val.remark ? val.remark : "";
      this.add_data.id = val.id;
      this.loading1 = true;
      Administration_admin_park_floor_stall_list({
        Start: 0,
        pageSize: 5,
        filterJson: { filters: [{ property: "parkFloorId", value: val.id }] },
      }).then((res) => {
        this.list1s = res.list;
        this.totals1 = res.total;
        this.loading1 = false;
      });
    },
    //启用
    change_status_open(id) {
      Administration_admin_park_floor_update_flag({
        id: id,
        type: 1,
      }).then((res) => {
        if (res.success == true) {
          this.$Message.success(res.content);
        } else {
          this.$Message.error(res.content);
          this.delete_getData3();
        }
      });
    },
    //禁用
    change_status_close(id) {
      Administration_admin_park_floor_update_flag({
        id: id,
        type: 0,
      }).then((res) => {
        if (res.success == true) {
          this.$Message.success(res.content);
        } else {
          this.$Message.error(res.content);
          this.delete_getData3();
        }
      });
    },
    //弹框取消
    cancle() {
      this.modal9 = false;
      this.loading_btn = false;
    },
    //弹框确定
    click_module() {
      if (this.module_title == "添加场中场") {
        this.loading_btn = true;
        if (!this.add_data.preId) {
          this.$Message.error("请选择车场");
          this.loading_btn = false;
        } else if (!this.add_data.floor) {
          this.$Message.error("请填写场中场名称");
          this.loading_btn = false;
        } else if (!this.add_data.stallSum) {
          this.$Message.error("请填写场中车位数");
          this.loading_btn = false;
        } else if (!this.add_data.redValue) {
          this.$Message.error("请填写紧缺数");
          this.loading_btn = false;
        } else if (!this.add_data.yellowValue) {
          this.$Message.error("请填写紧张数");
          this.loading_btn = false;
        } else {
          Administration_admin_park_floor_save(this.add_data).then((res) => {
            if (res.success == true) {
              this.$Message.success(res.content);
              // this.list1();
              this.$emit("reset3");
              this.modal9 = false;
            } else {
              this.$Message.error(res.content);
            }
            this.loading_btn = false;
          });
        }
      } else {
        this.loading_btn = true;
        if (!this.add_data.floor) {
          this.$Message.error("请填写场中场名称");
          this.loading_btn = false;
        } else if (!this.add_data.stallSum) {
          this.$Message.error("请填写场中车位数");
          this.loading_btn = false;
        } else if (!this.add_data.redValue) {
          this.$Message.error("请填写紧缺数");
          this.loading_btn = false;
        } else if (!this.add_data.yellowValue) {
          this.$Message.error("请填写紧张数");
          this.loading_btn = false;
        } else {
          Administration_admin_park_floor_update(this.add_data).then((res) => {
            if (res.success == true) {
              this.$Message.success(res.content);
              this.delete_getData3();
              this.modal9 = false;
            } else {
              this.$Message.error(res.content);
            }
            this.loading_btn = false;
          });
        }
      }
    },
    //上传文件钩子
    beforeUpload(file) {
      this.$Table.import({
        type: "xlsx",
        file: file,
        finish: (res) => {
          this.table_module_columns = res.columns;
          this.table_module_data = res.data;
          this.table_module_columns.map((res) => {
            res.align = "center";
          });
          this.table_module_data.map((res) => {
            if (!res["车位号"] || res["车位号"] == undefined) {
              this.reverseStallName_distinguish = false;
            }
          });
          if (this.reverseStallName_distinguish == false) {
            this.$Message.error("车位号不能为空");
            this.reverseStallName_distinguish = true;
          } else {
            this.modal_table = true;
          }
        },
      });
      return false;
    },
    //上传文件确定
    table_ok() {
      let that = this;
      let upload_data = [];
      this.table_module_data.map((res) => {
        let data = {
          stallCode: res["车位号"] ? res["车位号"] : "",
          preId: this.preId,
          parkFloorId: this.id,
          parkName: this.parkName,
        };
        upload_data.push(data);
      });
      this.table_loading_btn = true;
      let sure = true;
      let name = "";
      Administration_admin_park_floor_stall_list({
        Start: 0,
        pageSize: 10000,
        filterJson: { filters: [{ property: "parkFloorId", value: this.id }] },
      }).then((res) => {
        res.list.map((reson) => {
          upload_data.map((reson1) => {
            if (reson.stallCode == reson1.stallCode) {
              sure = false;
              name = reson.stallCode;
            }
          });
        });
        if (sure == false) {
          this.$Message.error(name + "车位号重复");
          this.table_loading_btn = false;
          return;
        }
        Administration_admin_park_floor_batchSave(upload_data).then((res) => {
          if (res.success == true) {
            this.$Message.success(res.content);
            this.modal_table = false;
            this.loading1 = true;
            Administration_admin_park_floor_stall_list({
              Start: 0,
              pageSize: 5,
              filterJson: {
                filters: [{ property: "parkFloorId", value: this.id }],
              },
            }).then((res) => {
              this.list1s = res.list;
              this.totals1 = res.total;
              this.loading1 = false;
            });
          } else {
            this.$Message.error(res.content);
          }
          this.table_loading_btn = false;
        });
      });
    },
    //上传文件取消
    table_cancel() {
      this.modal_table = false;
      this.table_module_columns = [];
      this.table_module_data = [];
    },
    delete_module(val) {
      this.$Modal.confirm({
        title: "确定删除",
        onOk: () => {
          Administration_admin_park_floor_delete_stall({ id: val.id }).then(
            (res) => {
              if (res.success == true) {
                this.$Message.success(res.content);
                this.loading1 = true;
                Administration_admin_park_floor_stall_list({
                  Start: 0,
                  pageSize: 5,
                  filterJson: {
                    filters: [{ property: "parkFloorId", value: this.id }],
                  },
                }).then((res) => {
                  this.list1s = res.list;
                  this.totals1 = res.total;
                  this.loading1 = false;
                });
              } else {
                this.$Message.error(res.content);
              }
            }
          );
        },
        onCancel: () => {
          // this.$Message.info("Clicked cancel");
        },
      });
    },
  },
};
</script>
