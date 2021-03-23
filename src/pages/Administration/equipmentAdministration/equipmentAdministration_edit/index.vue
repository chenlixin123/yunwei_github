<style lang="less" scoped>
.box {
  min-width: 750px;
  height: 85vh;
  box-sizing: border-box;
  margin: 24px;
}
.box1 {
  min-width: 800px;
}
.box2 {
  min-width: 800px;
  text-align: right;
}
.box3 {
  width: 98%;
  display: flex;
  justify-content: flex-end;
}
.user_label {
  display: inline-block;
  min-width: 60px;
  text-align-last: justify;
  margin-top: 5px;
}
.user_label1 {
  display: inline-block;
  min-width: 140px;
  text-align-last: justify;
  margin-top: 5px;
}
.user_label2 {
  display: inline-block;
  min-width: 140px;
  text-align-last: justify;
  // border: 1px solid;
  margin-top: 5px;
}

.module_divs {
  width: 95%;
  margin-top: 10px;
  padding-left: 1%;
}
.module_divs2 {
  width: 95%;
  margin-top: 10px;
  padding-left: 1%;
  display: flex;
  justify-items: center;
}
.module_divs3 {
  width: 95%;
  margin-top: 10px;
  padding-left: 1%;
  display: flex;
  justify-items: center;
}

.span_else {
  margin-left: 15px;
}
.module_divss {
  width: 95%;
  margin-bottom: 10px;
  padding-left: 1%;
}
.btn_bottom {
  width: 98%;
  text-align: right;
  margin-top: 10px;
}
.btn {
  width: 200px;
  height: 40px;
  margin-right: 20px;
}
.agreement {
  position: relative;
}
.test_btn {
  width: 180px;
  height: 40px;
  position: absolute;
  left: 700px;
  bottom: 25px;
}
</style>
<template>
  <div class="box">
    <Card title="编辑反寻系统" :bordered="false" dis-hover class="ivu-mt">
      <div class="box1">
        <!-- 车场名称 -->
        <div style="padding-left: 5px">
          <div class="module_divs">
            <label for style="color: white">*</label>
            <label for class="user_label">车场名称</label>:
            <span class="span_else">{{ edit_data.parkName }}</span>
          </div>
          <!-- 系统品牌 -->
          <div class="module_divs2">
            <div style="width: 800px">
              <label for style="color: red">*</label>
              <label for class="user_label">系统品牌</label>:
              <Select
                v-model="edit_data.factoryId"
                clearable
                style="width: 220px; margin-left: 10px"
              >
                <Option
                  v-for="(item, index) in factoryIdlist"
                  :value="item.id"
                  :key="index"
                  >{{ item.name }}</Option
                >
              </Select>

              <label for style="color: white; margin-left: 15px">*</label>
              <label for class="user_label">系统型号</label>:
              <Input
                v-model="edit_data.systemModel"
                placeholder="请输入系统型号"
                style="width: 220px"
              />
            </div>
          </div>

          <!-- 接入模式 -->
          <div class="module_divs2">
            <div style="width: 800px">
              <label for style="color: red">*</label>
              <label for class="user_label">接入模式</label>:
              <Select
                v-model="edit_data.accessMode"
                clearable
                style="width: 220px; margin-left: 10px"
              >
                <Option
                  v-for="(item, index) in accessModelist"
                  :value="item.id"
                  :key="index"
                  >{{ item.name }}</Option
                >
              </Select>

              <label for style="color: red; margin-left: 15px">*</label>
              <label for class="user_label">协议</label>:
              <Select
                v-model="edit_data.agreement"
                clearable
                style="width: 220px"
              >
                <Option
                  v-for="(item, index) in agreementlist"
                  :value="item.name"
                  :key="index"
                  >{{ item.name }}</Option
                >
              </Select>
            </div>
          </div>
          <div class="agreement">
            <Divider orientation="left">协议参数</Divider>
            <!-- 接口地址 -->
            <div class="module_divs">
              <label for style="color: white">*</label>
              <label for class="user_label">接口地址</label>:
              <Input
                v-model="edit_data.interfaceAddress"
                placeholder="请输入接口地址"
                style="width: 528px; margin-left: 10px"
              />
            </div>
            <!-- user -->
            <div class="module_divs">
              <label for style="color: white">*</label>
              <label for class="user_label">user</label>:
              <Input
                v-model="edit_data.user"
                placeholder="请输入user"
                style="width: 528px; margin-left: 10px"
              />
            </div>
            <!-- sign -->
            <div class="module_divs">
              <label for style="color: white">*</label>
              <label for class="user_label">sign</label>:
              <Input
                v-model="edit_data.sign"
                placeholder="请输入sign"
                style="width: 528px; margin-left: 10px"
              />
            </div>

            <!-- <Button class="test_btn" type="primary">测试</Button> -->
            <Divider />
          </div>
          <!-- 备注 -->
          <div class="module_divs3">
            <label for style="color: white">*</label>
            <label for class="user_label">备注</label>
            <span style="margin-top: 5px">:</span>
            <Input
              v-model="edit_data.remark"
              type="textarea"
              :rows="5"
              placeholder="请输入备注"
              style="width: 528px; margin-left: 14px"
            />
          </div>
        </div>
        <div class="btn_bottom">
          <Button
            type="primary"
            class="btn"
            :loading="loading_btn"
            @click="btn_ok"
            >确定</Button
          >
          <Button type="primary" class="btn" @click="btn_cancle">取消</Button>
        </div>
      </div>
    </Card>
    <Card :bordered="false" dis-hover class="ivu-mt">
      <div class="box2">
        <div class="box3">
          <Upload
            action="/api/admin/biz/reverse/system/batchSave"
            name="file"
            ref="upload"
            :headers="headers"
            :before-upload="beforeUpload"
            :on-success="success"
          >
            <Button icon="ios-cloud-upload-outline" class="btn" type="primary"
              >导入</Button
            >
          </Upload>
          <Button
            class="btn"
            type="primary"
            @click="export1"
            :loading="loading_btn1"
            >导出</Button
          >
          <Button class="btn" type="primary" @click="binding1">绑定车位</Button>
        </div>
        <Table
          ref="table"
          :columns="columns1"
          :data="list1"
          :loading="loading1"
        >
          <template slot-scope="{ row }" slot="reverseStallName">
            <div>{{ row.reverseStallName }}</div>
          </template>
          <template slot-scope="{ row }" slot="stallName">
            <div>{{ row.stallName }}</div>
          </template>
          <template slot-scope="{ row }" slot="rentStatus">
            <Badge v-if="row.rentStatus === 1" status="success" text="已租" />
            <Badge
              v-else-if="row.rentStatus === 2"
              status="default"
              text="未租"
            />
            <Badge
              v-else-if="row.rentStatus === 3"
              status="error"
              text="过期"
            />
            <Badge v-else status="success" text="禁用" />
          </template>
        </Table>
        <div class="ivu-mt ivu-text-center">
          <Page
            :total="totals1"
            show-total
            :current="current1"
            @on-change="jump1"
          />
        </div>
      </div>
    </Card>
    <Modal
      :title="module_title"
      v-model="modal9"
      :mask-closable="false"
      :styles="{ top: '20%' }"
    >
      <div slot="footer">
        <Button @click="module_cancel">取消</Button>
        <Button @click="module_ok" type="primary" :loading="loading_btn_bottom"
          >确定</Button
        >
      </div>
      <div style="paddingleft: 30px">
        <div class="module_divss">
          <label for="" style="color: white">*</label>
          <label for class="user_label1">车场名称</label>:
          <span class="span_else">{{ module_data.parkName }}</span>
        </div>
        <div class="module_divss">
          <label for="" style="color: red">*</label>
          <label for class="user_label1">反寻系统车位号</label>:
          <Input
            v-model="module_data.reverseStallName"
            placeholder="请输入反寻系统车位号"
            style="width: 60%; margin-left: 10px"
          />
          <!-- <span class="span_else">{{ floor }}</span> -->
        </div>
        <div class="module_divss">
          <label for="" style="color: red">*</label>
          <label for class="user_label1">数字停车平台车位号</label>:
          <Select
            v-model="platformStallId"
            clearable
            style="width: 60%; margin-left: 10px"
          >
            <Option
              v-for="(item, index) in platformStallIdlist"
              :value="item.stallId"
              :key="index"
              >{{ item.stallName }}</Option
            >
          </Select>
          <!-- <span class="span_else">{{ laneName }}</span> -->
        </div>
        <!-- 备注 -->
        <div class="module_divs3">
          <label for style="color: white">*</label>
          <label for class="user_label2">备注</label>
          <span style="margin-top: 5px">:</span>
          <Input
            v-model="module_data.remark"
            type="textarea"
            :rows="5"
            placeholder="请输入备注"
            style="width: 60%; margin-left: 14px"
          />
        </div>
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
  //更新反寻系统
  Administration_reverse_update,
  // 反寻车位列表
  Administration_reverse_stall_list,
  //车位下拉框
  Administration_om_floor_area_stall_list,
  //新增反寻车位
  Administration_save_reverse_stall,
  //更新反寻车位
  Administration_update_reverse_stall,
  //删除反寻车位
  Administration_delete_reverse_stall,
  //批量导入
  Administration_reverse_system_batchSave,
} from "@/api/Administration";
import time from "@/api/time";
export default {
  data() {
    return {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      reverseStallName_distinguish: true,
      stallName_distinguish: true,
      table_module_data: [],
      table_loading_btn: false,
      module_title_table: "上传文件",
      modal_table: false,
      loading_btn1: false,
      factoryIdlist: [
        {
          id: "101",
          name: "华夏",
        },
        {
          id: "102",
          name: "臻识",
        },
        {
          id: "103",
          name: "捷顺",
        },
        {
          id: "104",
          name: "海康",
        },
      ],
      accessModelist: [
        {
          id: "0",
          name: "主动",
        },
        {
          id: "1",
          name: "被动",
        },
      ],
      agreementlist: [
        {
          name: "subin",
        },
        {
          name: "huaxia",
        },
        {
          name: "ehome5.0",
        },
      ],
      loading_btn: false,
      loading_btn_bottom: false,
      edit_data: {},

      module_data: {},
      platformStallId: "",
      platformStallIdlist: [],
      module_title: "",
      modal9: false,
      columns1: [
        {
          title: "车场名称",
          key: "parkName",
          minWidth: 180,
          align: "center",
        },
        {
          title: "反寻系统车位号",
          key: "reverseStallName",
          slot: "reverseStallName",
          align: "center",
          minWidth: 180,
        },
        {
          title: "数字停车平台车位号",
          key: "stallName",
          slot: "stallName",
          minWidth: 180,
          align: "center",
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
          minWidth: 180,
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
                    display: "inline-block",
                    cursor: "pointer",
                    marginRight: "5px",
                    border: "1px solid blue",
                    width: "60px",
                    height: "30px",
                    lineHeight: "30px",
                    borderRadius: "5px",
                    color: "blue",
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
                  style: {
                    cursor: "pointer",
                    display: "inline-block",
                    border: "1px solid red",
                    width: "60px",
                    height: "30px",
                    lineHeight: "30px",
                    borderRadius: "5px",
                    color: "red",
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
      table_module_columns: [],
      loading1: false,
      list1: [],
      totals1: 10,
      current1: 1,
      datas: {
        start: 0,
        pageSize: 10,
        filterJson: "",
      },
      floor: "",
      laneName: "",
      areaName: "",
      modal_data1: [],
    };
  },
  created() {
    this.table_data();
    this.list_data();
  },
  methods: {
    // 填充数据
    list_data() {
      console.log(this.$route.query);
      this.edit_data = this.$route.query;
    },
    // table表格数据
    table_data() {
      this.current = 1;
      let data = this.datas;
      let start = data.start;
      let pageSize = data.pageSize;
      let filterJson = data.filterJson;
      this.loading1 = true;
      Administration_reverse_stall_list({
        start,
        pageSize,
        filterJson,
        // laneId: this.$route.query.id,
      }).then((res) => {
        this.list1 = res.list;
        this.totals1 = res.total;
        this.loading1 = false;
      });
    },
    //确定编辑
    btn_ok() {
      if (!this.edit_data.factoryId) {
        this.$Message.error("请选择系统品牌");
        return;
      }
      if (!this.edit_data.accessMode) {
        this.$Message.error("请选择接入模式");
        return;
      }
      if (!this.edit_data.agreement) {
        this.$Message.error("请选择协议");
        return;
      }
      this.loading_btn = true;
      let data = {};
      data.id = this.edit_data.id;
      data.preId = this.edit_data.preId;
      //系统品牌
      data.factoryId = this.edit_data.factoryId;
      //接入模式
      data.accessMode = this.edit_data.accessMode;
      //协议
      data.agreement = this.edit_data.agreement;
      //备注
      data.remark = this.edit_data.remark ? this.edit_data.remark : "";
      //接口地址
      data.interfaceAddress = this.edit_data.interfaceAddress
        ? this.edit_data.interfaceAddress
        : "";
      //user
      data.user = this.edit_data.user ? this.edit_data.user : "";
      //sign
      data.sign = this.edit_data.sign ? this.edit_data.sign : "";
      //系统型号
      data.systemModel = this.edit_data.systemModel
        ? this.edit_data.systemModel
        : "";
      //启用禁用标识
      data.systemFlag = this.edit_data.systemFlag;
      console.log(data);
      Administration_reverse_update(data).then((res) => {
        if (res.success == true) {
          this.$Message.success(res.content);
        } else {
          this.$Message.error(res.content);
          setTimeout(() => {
            this.$router.go(0);
          }, 2000);
        }
        this.loading_btn = false;
      });
    },
    //取消编辑
    btn_cancle() {
      this.$Modal.confirm({
        title: "取消编辑",
        onOk: () => {
          this.$router.go(-1);
        },
        onCancel: () => {
          // this.$Message.info("Clicked cancel");
        },
      });
    },
    module_ok() {
      if (!this.module_data.reverseStallName) {
        this.$Message.error("请填写反寻系统车位号");
        return;
      }
      if (!this.platformStallId) {
        this.$Message.error("请选择数字停车平台车位号");
        return;
      }
      this.loading_btn_bottom = true;
      let data = {};
      data.reverseStallName = this.module_data.reverseStallName;
      data.preId = this.edit_data.preId;
      data.remark = !this.module_data.remark ? "" : this.module_data.remark;
      data.platformStallId = this.platformStallId;
      if (this.module_title == "绑定车位") {
        Administration_save_reverse_stall(data).then((res) => {
          if (res.success == true) {
            this.$Message.success(res.content);
            this.modal9 = false;
            this.table_data();
          } else {
            this.$Message.error(res.content);
          }
          this.loading_btn_bottom = false;
        });
      } else {
        data.id = this.module_data.id;
        console.log(data);
        Administration_update_reverse_stall(data).then((res) => {
          if (res.success == true) {
            this.$Message.success(res.content);
            this.modal9 = false;
            this.table_data();
          } else {
            this.$Message.error(res.content);
          }
          this.loading_btn_bottom = false;
        });
      }
    },
    module_cancel() {
      this.modal9 = false;
      this.loading_btn_bottom = false;
    },
    //绑定车位
    binding1() {
      this.modal9 = true;
      this.module_title = "绑定车位";
      this.module_data = {};
      this.platformStallIdlist = [];
      this.module_data.parkName = this.edit_data.parkName;
      Administration_om_floor_area_stall_list({
        preId: this.edit_data.preId,
      }).then((res) => {
        res.map((res1) => {
          res1.areaSelectList.map((res2) => {
            res2.stallSelectList.map((res3) => {
              this.platformStallIdlist.push(res3);
            });
          });
        });
      });
    },
    //编辑车道车位
    edit(val) {
      this.modal9 = true;
      this.platformStallId = "";
      this.platformStallIdlist = [];
      this.module_title = "编辑车位";
      this.module_data.id = val.id;
      this.module_data.parkName = val.parkName;
      this.module_data.reverseStallName = val.reverseStallName;
      this.module_data.remark = val.remark;
      Administration_om_floor_area_stall_list({
        preId: this.edit_data.preId,
      }).then((res) => {
        res.map((res1) => {
          res1.areaSelectList.map((res2) => {
            res2.stallSelectList.map((res3) => {
              this.platformStallIdlist.push(res3);
            });
          });
        });
        this.platformStallId = val.platformStallId;
      });
    },
    //删除车道车位
    delete(val) {
      console.log(val);
      this.$Modal.confirm({
        title: "解绑",
        onOk: () => {
          Administration_delete_reverse_stall({ id: val.id }).then((res) => {
            if (res.success == true) {
              this.$Message.success(res.content);
              this.table_data();
            } else {
              this.$Message.error(res.content);
            }
          });
        },
        onCancel: () => {},
      });
    },
    //表格翻页
    jump1(value) {
      this.loading1 = true;
      let data = this.datas;
      let start = (value - 1) * data.pageSize;
      let pageSize = data.pageSize;
      let filterJson = data.filterJson;
      Administration_reverse_stall_list({
        start,
        pageSize,
        filterJson,
      }).then((res) => {
        this.totals1 = res.total;
        this.current1 = value;
        this.list1 = res.list;
        this.loading1 = false;
      });
    },
    //导出
    export1() {
      console.log("导出");
      this.loading_btn1 = true;
      let columns1 = [
        {
          title: "车场名称",
          key: "parkName",
          minWidth: 180,
          align: "center",
        },
        {
          title: "反寻系统车位号",
          key: "reverseStallName",
          slot: "reverseStallName",
          align: "center",
          minWidth: 180,
        },
        {
          title: "数字停车平台车位号",
          key: "stallName",
          slot: "stallName",
          minWidth: 180,
          align: "center",
        },
        // {
        //   title: "备注",
        //   key: "remark",
        //   minWidth: 180,
        //   align: "center",
        // },
      ];
      let start = 0;
      let pageSize = 1000;
      let filterJson = "";
      Administration_reverse_stall_list({
        start,
        pageSize,
        filterJson,
      }).then((res) => {
        let list1 = res.list;
        this.$Table.export({
          type: "xlsx",
          fileName: "反寻系统列表",
          columns: columns1,
          data: list1,
        });
        this.loading_btn1 = false;
      });
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
            if (!res["反寻系统车位号"] || res["反寻系统车位号"] == undefined) {
              this.reverseStallName_distinguish = false;
            }
            if (
              !res["数字停车平台车位号"] ||
              !res["数字停车平台车位号"] == undefined
            ) {
              this.stallName_distinguish = false;
            }
          });
          if (this.reverseStallName_distinguish == false) {
            this.$Message.error("反寻系统车位号不能为空");
            this.reverseStallName_distinguish = true;
            this.stallName_distinguish = true;
          } else {
            if (this.stallName_distinguish == false) {
              this.$Message.error("数字停车平台车位号不能为空");
              this.stallName_distinguish = true;
            } else {
              this.modal_table = true;
            }
          }
        },
      });
      return false;
    },
    success(res, file, fileList) {
      console.log(res);
      if (res.success == true) {
        this.$Message.success(res.content);
        this.modal_table = false;
        this.table_data();
      } else {
        this.$Message.error(res.content);
      }
      this.table_loading_btn = true;
    },
    //上传文件确定
    table_ok() {
      console.log("确定");
      let upload_data = [];
      this.table_module_data.map((res) => {
        let data = {
          parkName: res["车场名称"] ? res["车场名称"] : "",
          preId: this.$route.query.preId,
          reverseStallName: res["反寻系统车位号"],
          stallName: res["数字停车平台车位号"],
        };
        upload_data.push(data);
      });
      this.table_loading_btn = true;
      // this.$refs.upload.post(upload_data);
      Administration_reverse_system_batchSave(upload_data).then((res) => {
        console.log(res);
        if (res.success == true) {
          this.$Message.success(res.content);
          this.modal_table = false;
          this.table_data();
        } else {
          this.$Message.error(res.content);
        }
        this.table_loading_btn = false;
      });
    },
    //上传文件取消
    table_cancel() {
      console.log("取消");
      this.modal_table = false;
      this.table_module_columns = [];
      this.table_module_data = [];
    },
  },
};
</script>