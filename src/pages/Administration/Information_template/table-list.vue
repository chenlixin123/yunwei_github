<style lang="less" scoped>
.module_divs {
  width: 95%;
  margin-top: 10px;
  padding-left: 2%;
}
.user_label {
  display: inline-block;
  min-width: 105px;
  text-align-last: justify;
}
.module_input {
  margin-bottom: 10px;
}
.module_divs3 {
  width: 100%;
  margin-top: 10px;
  display: flex;
  justify-items: center;
}
.tab_title {
  font-size: 16px;
  margin-top: 15px;
  // font-weight: bold;
}
</style>
<template>
  <div>
    <Button style="width: 99%" @click="binding">+新增模板功能组</Button>
    <Table
      ref="table"
      :columns="columns"
      :data="list"
      :loading="loading"
      class="ivu-mt"
    ></Table>
    <div class="ivu-mt ivu-text-center">
      <Page
        :total="totals"
        show-total
        :current="current"
        :page-size="10"
        @on-change="jump"
      />
    </div>
    <!-- 模板功能组弹框 -->
    <Modal
      :title="module_title"
      v-model="module_show_hide"
      :styles="{ top: '10%', minWidth: '550px' }"
      :mask-closable="false"
      width="50%"
    >
      <div slot="footer">
        <Button type="primary" @click="cancle">取消</Button>
        <Button type="primary" :loading="module_btn_loading" @click="module_ok"
          >保存</Button
        >
      </div>
      <!-- 模板功能组名称 -->
      <div class="module_divs">
        <div class="module_input">
          <label for style="color: red">*</label>
          <label for class="user_label">模板功能组名称</label>:
          <i-input
            v-model="module_data.groupName"
            placeholder="模板功能组名称"
            style="width: 70%; margin-left: 10px"
          ></i-input>
        </div>
        <div class="module_input">
          <label for style="color: red">*</label>
          <label for class="user_label">屏幕分辨率</label>:
          <i-input
            v-model="module_data.resolutionRatio_x"
            placeholder="屏幕横向分辨率"
            style="width: 32%; margin-left: 10px; margin-right: 2.5%"
          ></i-input>
          <span>X</span>
          <i-input
            v-model="module_data.resolutionRatio_y"
            placeholder="屏幕纵向分辨率吧"
            style="width: 32%; margin-left: 2.5%"
          ></i-input>
        </div>
        <!-- 备注 -->
        <div class="module_divs3">
          <label for style="color: white">*</label>
          <label for class="user_label">备注</label>:
          <Input
            v-model="module_data.remark"
            type="textarea"
            :rows="4"
            placeholder="请输入备注信息"
            style="width: 70%; margin-left: 15px"
          />
        </div>
        <hr
          style="
            width: 100%;
            height: 8px;
            background: #e5e4e4;
            border: none;
            margin-top: 20px;
          "
        />
        <p class="tab_title">基础模板</p>
        <Table
          ref="table_module"
          :columns="columns_model"
          :data="list_module"
          :loading="loading_module"
          class="ivu-mt"
        ></Table>
        <Button style="width: 100%; margin-top: 10px" @click="add_modal"
          >+添加基础模板</Button
        >
        <!-- <div class="ivu-mt ivu-text-center">
          <Page
            :total="totals_module"
            show-total
            :current="current_module"
            :page-size="5"
            @on-change="jump_module"
          />
        </div> -->
      </div>
    </Modal>
    <Modal
      :title="edit_title"
      v-model="edit_modal"
      :styles="{ top: '20%' }"
      :mask-closable="false"
    >
      <div slot="footer">
        <Button @click="edit_cancle">取消</Button>
        <Button @click="edit_ok" type="primary" :loading="edit_loading"
          >确定</Button
        >
      </div>
      <!-- 基础模板 -->
      <div style="padding-left: 5px">
        <div class="module_divs">
          <label for style="color: white">*</label>
          <label for class="user_label">基础模板</label>:
          <Select
            @on-select="change_templateName"
            @on-clear="clear_templateName"
            v-model="templateName"
            clearable
            style="width: 70%; margin-left: 10px"
          >
            <Option
              v-for="(item, index) in templatelist"
              :value="item.templateCode"
              :key="index"
              >{{ item.templateName }}</Option
            >
          </Select>
        </div>
        <!-- 模板分辨率 -->
        <div class="module_divs">
          <label for style="color: white">*</label>
          <label for class="user_label">模板分辨率</label>:
          <span style="width: 70%; margin-left: 15px">{{
            edit_data.resolutionRatio
          }}</span>
        </div>
        <!-- 触发条件 -->
        <div class="module_divs">
          <label for style="color: white">*</label>
          <label for class="user_label">触发条件</label>:
          <span style="width: 70%; margin-left: 15px">{{
            edit_data.triggerType == 0
              ? "默认显示"
              : edit_data.triggerType == 1
              ? "固定车辆入场"
              : edit_data.triggerType == 2
              ? "固定车辆离场"
              : edit_data.triggerType == 3
              ? "临停车辆入场"
              : edit_data.triggerType == 4
              ? "临停车辆离场"
              : edit_data.triggerType == 5
              ? "预约车辆入场"
              : edit_data.triggerType == 6
              ? "预约车辆离场"
              : edit_data.triggerType == 7
              ? "无牌车车辆"
              : ""
          }}</span>
        </div>
        <!-- 组件数量 -->
        <div class="module_divs">
          <label for style="color: white">*</label>
          <label for class="user_label">组件数量</label>:
          <span style="width: 70%; margin-left: 15px">{{
            edit_data.componentNum
          }}</span>
        </div>

        <!-- 保持时间 -->
        <div class="module_divs">
          <label for style="color: white">*</label>
          <label for class="user_label">保持时间</label>:
          <span style="width: 70%; margin-left: 15px">{{
            edit_data.keepTime
          }}</span>
        </div>
      </div>
    </Modal>
  </div>
</template>
<script>
import random from "@/libs/random_str";
import {
  // 模板功能组列表
  Administration_group_info_list,
  // 获取基础模板下拉列表
  Administration_template_info_select_list,
  // 新增模板功能组
  Administration_group_info_save,
  // 更新模板功能组
  Administration_group_info_update,
  // 删除模板功能组
  Administration_group_info_delete,
  // 新增基础模板编码
  Administration_group_info_save_template_group,
  // 更新基础模板编码
  Administration_group_info_update_template_group,
  // 删除基础模板编码
  Administration_group_info_delete_template_group,
  // 通过模板功能组code值获取基础模板列表
  Administration_group_info_find_list_code,
} from "@/api/Administration";
import time from "@/api/time";

export default {
  data() {
    return {
      identification: false,
      index: "",
      templatelist: [],
      gateTypelist: [
        {
          id: 0,
          name: "默认显示",
        },
        {
          id: 1,
          name: "固定车辆入场",
        },
        {
          id: 2,
          name: "固定车辆离场",
        },
        {
          id: 3,
          name: "临停车辆入场",
        },
        {
          id: 4,
          name: "临停车辆离场",
        },
        {
          id: 5,
          name: "预约车辆入场",
        },
        {
          id: 6,
          name: "预约车辆离场",
        },
        {
          id: 7,
          name: "无牌车车辆",
        },
      ],
      edit_title: "",
      edit_loading: false,
      edit_modal: false,
      edit_data: {},
      templateName: "",
      module_btn_loading: false,
      current_module: 1,
      totals_module: 5,
      loading_module: false,
      list_module: [],
      columns_model: [
        {
          title: "基础模板",
          key: "templateName",
          minWidth: 150,
          align: "center",
        },
        {
          title: "模板分辨率",
          key: "resolutionRatio",
          minWidth: 150,
          align: "center",
        },
        {
          title: "触发条件",
          key: "triggerType",
          minWidth: 150,
          align: "center",
          render: (h, params) => {
            let parking = params.row;
            let name =
              parking.triggerType == 0
                ? "默认显示"
                : parking.triggerType == 1
                ? "固定车辆入场"
                : parking.triggerType == 2
                ? "固定车辆离场"
                : parking.triggerType == 3
                ? "临停车辆入场"
                : parking.triggerType == 4
                ? "固定车辆离场"
                : parking.triggerType == 5
                ? "预约车辆入场"
                : parking.triggerType == 6
                ? "预约车辆离场"
                : parking.triggerType == 7
                ? "无牌车车辆"
                : "";
            return h("div", name);
          },
        },
        {
          title: "组件数量",
          key: "componentNum",
          minWidth: 100,
          align: "center",
        },
        {
          title: "保持时间",
          key: "keepTime",
          minWidth: 100,
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
                "div",
                {
                  style: {
                    cursor: "pointer",
                    color: "blue",
                    border: "1px solid blue",
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
                      this.modal_edit(parking);
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
                  },
                  on: {
                    click: () => {
                      this.modal_unbind(parking);
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
      module_data: {},
      module_show_hide: false,
      module_title: "新增模板功能组",
      totals: 10,
      columns: [
        {
          title: "模板功能组名称",
          align: "center",
          key: "groupName",
          minWidth: 135,
        },
        {
          title: "适用屏幕分辨率",
          align: "center",
          key: "resolutionRatio",
          minWidth: 135,
        },
        {
          title: "基础模板数",
          align: "center",
          key: "templateNum",
          minWidth: 110,
        },
        {
          title: "基础模板名",
          align: "center",
          key: "templateName",
          minWidth: 110,
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
                    color: "blue",
                    border: "1px solid blue",
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
                      this.information_edit(parking);
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
                  },
                  on: {
                    click: () => {
                      this.information_unbind(parking);
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
      current: 1,
      size: 10,
      datas: {
        start: 0,
        pageSize: 10,
        filterJson: {},
      },
      template_data: {},
      id: "",
      module_groupCode: "",
      module_id: "",
    };
  },
  created() {
    this.Refresh();
  },
  methods: {
    Refresh() {
      this.current = 1;
      let data = this.datas;
      let start = data.start;
      let pageSize = data.pageSize;
      let filterJson = data.filterJson;
      this.loading = true;
      Administration_group_info_list({
        start,
        pageSize,
        filterJson,
      }).then((res) => {
        this.list = res.list;
        this.totals = res.total;
        this.loading = false;
      });
    },
    jump(value) {
      this.loading = true;
      let data = this.datas;
      let start = (value - 1) * data.pageSize;
      let pageSize = data.pageSize;
      let filterJson = data.filterJson;
      Administration_group_info_list({
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
    //新增模板功能组
    binding() {
      this.module_show_hide = true;
      this.module_title = "新增模板功能组";
      this.module_data = {};
      this.list_module = [];
    },
    //编辑
    information_edit(val) {
      console.log(val);
      this.id = val.id;
      this.module_groupCode = val.groupCode;
      this.module_show_hide = true;
      this.module_title = "编辑模板功能组";
      this.list_module = val.list ? val.list : [];
      this.module_data.groupName = val.groupName;
      this.module_data.resolutionRatio_x = val.resolutionRatio.split("*")[0];
      this.module_data.resolutionRatio_y = val.resolutionRatio.split("*")[1];
      this.module_data.remark = val.remark;
    },
    //删除
    information_unbind(val) {
      this.$Modal.confirm({
        title: "删除",
        onOk: () => {
          Administration_group_info_delete({
            id: val.id,
          }).then((res) => {
            if (res.success == true) {
              this.$Message.success(res.content);
              this.Refresh();
            } else {
              this.$Message.error(res.content);
            }
          });
        },
        onCancel: () => {},
      });
    },
    //弹出框列表跳转页面
    // jump_module() {},
    // 弹出框确定
    module_ok() {
      if (!this.module_data.groupName) {
        this.$Message.error("模板功能组名称不能为空");
        return;
      }
      if (!this.module_data.resolutionRatio_x) {
        this.$Message.error("屏幕横向分辨率不能为空");
        return;
      }
      if (!this.module_data.resolutionRatio_y) {
        this.$Message.error("屏幕纵向分辨率不能为空");
        return;
      }
      this.module_btn_loading = true;
      if (this.module_title == "新增模板功能组") {
        console.log("走新增");
        let data = {
          groupName: "",
          resolutionRatio: "",
          templateCodeList: "",
          remark: "",
        };
        data.groupName = this.module_data.groupName;
        data.resolutionRatio =
          this.module_data.resolutionRatio_x +
          "*" +
          this.module_data.resolutionRatio_y;
        data.remark = !this.module_data.remark ? "" : this.module_data.remark;
        this.list_module.map((res, index) => {
          //(index + 1);
          //(this.list_module.length);
          if (this.list_module.length == index + 1) {
            data.templateCodeList += res.templateCode;
          } else {
            data.templateCodeList += res.templateCode + ",";
          }
        });
        Administration_group_info_save(data).then((res) => {
          //(res);
          if (res.success == true) {
            this.$Message.success(res.content);
            this.Refresh();
            this.module_show_hide = false;
          } else {
            this.$Message.error(res.content);
          }
          this.module_btn_loading = false;
        });
      } else {
        console.log("走编辑");
        let datas = {
          id: "",
          groupName: "",
          resolutionRatio: "",
          remark: "",
        };
        datas.id = this.id;
        datas.groupName = this.module_data.groupName;
        datas.resolutionRatio =
          this.module_data.resolutionRatio_x +
          "*" +
          this.module_data.resolutionRatio_y;
        datas.remark = !this.module_data.remark ? "" : this.module_data.remark;
        Administration_group_info_update(datas).then((res) => {
          //(res);
          if (res.success == true) {
            this.$Message.success(res.content);
            this.Refresh();
            this.module_show_hide = false;
          } else {
            this.$Message.error(res.content);
          }
          this.module_btn_loading = false;
        });
      }
    },
    // 弹出框取消
    cancle() {
      this.module_btn_loading = false;
      this.module_show_hide = false;
    },
    //添加基础模板
    add_modal() {
      this.edit_title = "添加基础模板";
      this.edit_modal = true;
      this.edit_data = {};
      this.templateName = " ";
      this.template_data = {};
      Administration_template_info_select_list({}).then((res) => {
        this.templatelist = res;
      });
    },
    //编辑基础模板
    modal_edit(val) {
      // console.log(val);
      this.edit_title = "编辑基础模板";
      this.edit_modal = true;
      this.identification = true;
      this.index = val._index;
      this.module_id = val.id;
      this.edit_data = {};
      this.templateName = val.templateCode;
      this.edit_data.resolutionRatio = val.resolutionRatio;
      this.edit_data.triggerType = val.triggerType;
      this.edit_data.componentNum = val.componentNum;
      this.edit_data.keepTime = val.keepTime;
      this.template_data = val;
      Administration_template_info_select_list({}).then((res) => {
        this.templatelist = res;
      });
    },
    //基础模板删除
    modal_unbind(val) {
      if (this.module_title == "新增模板功能组") {
        this.$Modal.confirm({
          title: "删除",
          onOk: () => {
            this.list_module.map((res, index) => {
              if (res.templateCode == val.templateCode) {
                this.list_module.splice(index, 1);
              }
            });
          },
          onCancel: () => {},
        });
      } else {
        this.$Modal.confirm({
          title: "删除",
          onOk: () => {
            Administration_group_info_delete_template_group({
              id: val.id,
            }).then((res) => {
              if (res.success == true) {
                this.Refresh();
                this.$Message.success(res.content);
                //弹框基础模板列表
                Administration_group_info_find_list_code({
                  groupCode: this.module_groupCode,
                }).then((res) => {
                  this.list_module = res;
                });
              } else {
                this.$Message.error(res.content);
              }
            });
          },
          onCancel: () => {},
        });
      }
    },
    //基础模板弹框取消
    edit_cancle() {
      this.edit_modal = false;
      this.edit_loading = false;
      this.identification = false;
    },
    // 基础模板弹框确定
    edit_ok() {
      if (this.module_title == "新增模板功能组") {
        let push = true;
        if (this.template_data.templateCode) {
          console.log(this.template_data.templateCode);
          console.log(this.list_module);
          if (this.list_module.length != 0) {
            this.list_module.map((res) => {
              if (res.templateCode == this.template_data.templateCode) {
                push = false;
              }
            });
            if (push) {
              if (this.identification) {
                this.identification = false;
                let data = this.list_module;
                data[this.index] = this.template_data;
                this.list_module = [];
                data.map((res) => {
                  this.list_module.push(res);
                });
                this.edit_modal = false;
              } else {
                this.list_module.push(this.template_data);
                this.edit_modal = false;
              }
            } else {
              this.$Message.error("该基础模板已存在");
            }
          } else {
            this.list_module.push(this.template_data);
            this.edit_modal = false;
          }
        } else {
          this.$Message.error("基础模板不能为空");
        }
      } else {
        if (!this.template_data.templateCode) {
          this.$Message.error("请选择基础模板");
          return;
        }

        let push = true;
        if (this.list_module.length != 0) {
          this.list_module.map((res) => {
            if (res.templateCode == this.template_data.templateCode) {
              push = false;
            }
          });
          if (push) {
            this.edit_loading = true;
            if (this.identification) {
              this.identification = false;
              let datas = {
                id: "",
                templateCode: "",
              };
              datas.id = this.module_id;
              datas.templateCode = this.template_data.templateCode;
              Administration_group_info_update_template_group(datas).then(
                (res) => {
                  if (res.success == true) {
                    this.Refresh();
                    this.$Message.success(res.content);
                    //弹框基础模板列表
                    Administration_group_info_find_list_code({
                      groupCode: this.module_groupCode,
                    }).then((res) => {
                      this.list_module = res;
                    });
                    this.edit_modal = false;
                  } else {
                    this.$Message.error(res.content);
                  }
                  this.edit_loading = false;
                }
              );
            } else {
              let data = {
                templateCode: "",
                groupCode: "",
              };
              data.groupCode = this.module_groupCode;
              data.templateCode = this.template_data.templateCode;
              Administration_group_info_save_template_group(data).then(
                (res) => {
                  if (res.success == true) {
                    this.Refresh();
                    this.$Message.success(res.content);
                    //弹框基础模板列表
                    Administration_group_info_find_list_code({
                      groupCode: this.module_groupCode,
                    }).then((res) => {
                      this.list_module = res;
                    });
                    this.edit_modal = false;
                  } else {
                    this.$Message.error(res.content);
                  }
                  this.edit_loading = false;
                }
              );
            }
          } else {
            this.$Message.error("该基础模板已存在");
          }
        } else {
          console.log(this.template_data);
          let datas = {
            groupCode: "",
            templateCode: "",
          };
          datas.groupCode = this.module_groupCode;
          datas.templateCode = this.template_data.templateCode;
          Administration_group_info_save_template_group(datas).then((res) => {
            if (res.success == true) {
              this.Refresh();
              this.$Message.success(res.content);
              //弹框基础模板列表
              Administration_group_info_find_list_code({
                groupCode: this.module_groupCode,
              }).then((res) => {
                this.list_module = res;
              });
              this.edit_modal = false;
            } else {
              this.$Message.error(res.content);
            }
            this.edit_loading = false;
          });
        }
      }
    },
    //基础模板下拉触发事件
    change_templateName(e) {
      this.templatelist.map((res) => {
        if (res.templateCode == e.value) {
          this.template_data = res;
          this.edit_data.resolutionRatio = res.resolutionRatio;
          this.edit_data.triggerType = res.triggerType;
          this.edit_data.componentNum = res.componentNum;
          this.edit_data.keepTime = res.keepTime;
        }
      });
    },
    clear_templateName() {
      this.templateName = " ";
      this.edit_data = {};
      this.template_data = {};
    },
  },
};
</script>
