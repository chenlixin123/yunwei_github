<style lang="less" scoped>
.module_divs {
  width: 95%;
  margin-top: 10px;
  padding-left: 2%;
}
.user_label {
  display: inline-block;
  width: 105px;
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
.img_delete {
  margin-left: 5%;
  margin-right: 5%;
  color: red;
  cursor: pointer;
}
.mansion_btn {
  // margin-bottom: 10px;
  margin-left: 14px;
}
.mansion_btn1 {
  width: 25%;
}
.img {
  width: 70%;
  margin-left: 130px;
  margin-top: 10px;
  cursor: pointer;
}
.img_title {
  width: 70%;
  margin-left: 130px;
}
.module_input_lable {
  width: 70%;
  display: flex;
  align-items: center;
  // border: 1px solid;
}
</style>
<template>
  <div>
    <Button style="width: 99%" @click="binding">+新增基础模板</Button>
    <Table
      ref="table"
      :columns="columns"
      :data="list"
      :loading="loading"
      class="ivu-mt"
    ></Table>
    <div class="ivu-mt ivu-text-center">
      <Page :total="totals" show-total :current="current" @on-change="jump" />
    </div>

    <!-- 基础模板弹框 -->
    <Modal
      :title="module_title"
      v-model="module_show_hide"
      :styles="{ top: '5%', minWidth: '550px' }"
      :mask-closable="false"
      width="50%"
    >
      <div slot="footer">
        <Button type="primary" @click="cancle">取消</Button>
        <Button type="primary" :loading="module_btn_loading" @click="module_ok"
          >保存</Button
        >
      </div>
      <div class="module_divs">
        <!-- 模板名称 -->
        <div class="module_input">
          <label for style="color: red">*</label>
          <label for class="user_label">模板名称</label>:
          <i-input
            v-model="module_data.templateName"
            placeholder="模板名称"
            style="width: 70%; margin-left: 10px"
          ></i-input>
        </div>
        <div class="module_input">
          <label for style="color: red">*</label>
          <label for class="user_label">屏幕分辨率</label>:
          <i-input
            v-model="resolutionRatio_x"
            placeholder="屏幕横向分辨率"
            style="width: 32%; margin-left: 10px; margin-right: 2.5%"
          ></i-input>
          <span>X</span>
          <i-input
            v-model="resolutionRatio_y"
            placeholder="屏幕纵向分辨率"
            style="width: 32%; margin-left: 2.5%"
          ></i-input>
        </div>

        <!-- 类型 -->
        <div class="module_input">
          <label for style="color: red">*</label>
          <label for class="user_label">类型</label>:

          <Select
            v-model="module_data.type"
            clearable
            style="width: 70%; margin-left: 10px"
          >
            <Option
              v-for="(item, index) in typelist"
              :value="item.id"
              :key="index"
              >{{ item.name }}</Option
            >
          </Select>
        </div>
        <!-- 触发条件 -->
        <div class="module_input">
          <label for style="color: red">*</label>
          <label for class="user_label">触发条件</label>:

          <Select
            v-model="module_data.triggerType"
            clearable
            style="width: 70%; margin-left: 10px"
          >
            <Option
              v-for="(item, index) in triggerTypelist"
              :value="item.id"
              :key="index"
              >{{ item.name }}</Option
            >
          </Select>
        </div>
        <!-- 保持时间 -->
        <div class="module_input">
          <label for style="color: white">*</label>
          <label for class="user_label">保持时间</label>:
          <i-input
            v-model="module_data.keepTime"
            placeholder="保持时间"
            style="width: 70%; margin-left: 10px"
          ></i-input>
        </div>
        <!-- 显示样式 -->
        <div class="module_input">
          <div class="module_input_lable">
            <label for style="color: white">*</label>
            <label for class="user_label">显示样式</label>:
            <Upload
              class="Upload"
              ref="upload"
              :headers="headers"
              :data="up_data"
              name="file"
              :with-credentials="true"
              :before-upload="handleUpload"
              :show-upload-list="false"
              :on-success="uploadSuccess"
              action="/api/api/common/attach/image_upload"
            >
              <Button class="mansion_btn" icon="ios-cloud-upload-outline"
                >浏览</Button
              >
            </Upload>
          </div>
          <img class="img" @click="img_click" :src="module_data.displayUrl" alt="" />
          <div class="img_title" v-for="(item, index) in file" :key="index">
            <span v-if="image_show == true">文件名称：{{ item.name }}</span>
            <span
              v-if="image_show == true"
              class="img_delete"
              @click="deleteFile"
              >X</span
            >
            <Button
              v-if="image_show == true"
              class="mansion_btn1"
              @click="upload"
              :loading="upload_loading"
              >上传</Button
            >
          </div>
        </div>
          <Modal v-model="modal_img" :title="modal_img_title" width="800">
              <div slot="footer">
                <Button type="warning" @click="modal_img_ok"
                  >确定</Button
                >
              </div>
              <img style="width: 100%" :src="module_data.displayUrl" alt />
            </Modal>
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
        <p class="tab_title">组件显示</p>
        <Table
          ref="table_module"
          :columns="columns_model"
          :data="module_list"
          :loading="loading_module"
          class="ivu-mt"
        ></Table>
        <Button style="width: 100%; margin-top: 10px" @click="add_modal"
          >+添加组件</Button
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
      <div style="padding-left: 5px">
        <!-- 层级 -->
        <div class="module_divs">
          <label for style="color: red">*</label>
          <label for class="user_label">层级</label>:
          <Select
            v-model="edit_data.level"
            clearable
            style="width: 70%; margin-left: 10px"
          >
            <Option
              v-for="(item, index) in levellist"
              :value="item.id"
              :key="index"
              >{{ item.name }}</Option
            >
          </Select>
        </div>
        <!-- 组件类型 -->
        <div class="module_divs">
          <label for style="color: red">*</label>
          <label for class="user_label">组件类型</label>:
          <Select
            v-model="edit_data.type"
            clearable
            style="width: 70%; margin-left: 10px"
          >
            <Option
              v-for="(item, index) in zutypelist"
              :value="item.id"
              :key="index"
              >{{ item.name }}</Option
            >
          </Select>
        </div>
        <!-- 横向位置 -->
        <div class="module_divs">
          <label for style="color: red">*</label>
          <label for class="user_label">横向位置</label>:
          <i-input
            v-model="edit_data.x"
            placeholder="请输入横向位置"
            style="width: 70%; margin-left: 10px"
          ></i-input>
        </div>
        <!-- 纵向位置 -->
        <div class="module_divs">
          <label for style="color: red">*</label>
          <label for class="user_label">纵向位置</label>:
          <i-input
            v-model="edit_data.y"
            placeholder="请输入纵向位置"
            style="width: 70%; margin-left: 10px"
          ></i-input>
        </div>
        <!-- 长度 -->
        <div class="module_divs">
          <label for style="color: red">*</label>
          <label for class="user_label">长度</label>:
          <i-input
            v-model="edit_data.height"
            placeholder="请输入长度"
            style="width: 70%; margin-left: 10px"
          ></i-input>
        </div>
        <!-- 宽度 -->
        <div class="module_divs">
          <label for style="color: red">*</label>
          <label for class="user_label">宽度</label>:
          <i-input
            v-model="edit_data.width"
            placeholder="请输入宽度"
            style="width: 70%; margin-left: 10px"
          ></i-input>
        </div>
        <!-- 字号 -->
        <div class="module_divs">
          <label for style="color: red">*</label>
          <label for class="user_label">字号</label>:
          <i-input
            v-model="edit_data.fontSize"
            placeholder="请输入字号"
            style="width: 70%; margin-left: 10px"
          ></i-input>
        </div>
        <!-- 字体 -->
        <div class="module_divs">
          <label for style="color: red">*</label>
          <label for class="user_label">字体</label>:
          <Select
            v-model="edit_data.fontType"
            clearable
            style="width: 70%; margin-left: 10px"
          >
            <Option
              v-for="(item, index) in fontTypelist"
              :value="item.id"
              :key="index"
              >{{ item.name }}</Option
            >
          </Select>
        </div>
        <!-- 附加参数 -->
        <div class="module_divs">
          <label for style="color: white">*</label>
          <label for class="user_label">附加参数</label>:
          <i-input
            v-model="edit_data.remark"
            placeholder="请输入附加参数"
            style="width: 70%; margin-left: 10px"
          ></i-input>
        </div>
      </div>
    </Modal>
  </div>
</template>
<script>
import random from "@/libs/random_str";
import {
  // 基础模板列表
  Administration_biz_template_info_list,
  // 新增基础模板
  Administration_template_info_save,
  // 更新基础模板
  Administration_template_info_update,
  // 删除基础模板
  Administration_template_info_delete,
  // 新增组件信息
  Administration_template_info_save_component,
  // 更新组件信息
  Administration_template_info_update_component,
  // 删除组件信息
  Administration_template_info_delete_component,
  // 根据模板编码获取组件列表
  Administration_template_info_find_list_by_code,
} from "@/api/Administration";
import time from "@/api/time";

export default {
  data() {
    return {
      modal_img:false,
      modal_img_title:'显示样式',
      edit_id: "",
      templateCode: "",
      id: "",
      index: "",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      up_data: {},
      file: [],
      uploadFile: [],
      upload_loading: false,
      image_show: false,
      levellist: [
        {
          id: "1",
          name: "1",
        },
        {
          id: "2",
          name: "2",
        },
        {
          id: "3",
          name: "3",
        },
        {
          id: "4",
          name: "4",
        },
        {
          id: "5",
          name: "5",
        },
        {
          id: "6",
          name: "6",
        },
        {
          id: "7",
          name: "7",
        },
        {
          id: "8",
          name: "8",
        },
        {
          id: "9",
          name: "9",
        },
        {
          id: "10",
          name: "10",
        },
      ],
      zutypelist: [
        {
          id: "1",
          name: "文本",
        },
        {
          id: "2",
          name: "图片",
        },
        {
          id: "3",
          name: "时间",
        },
      ],
      fontTypelist: [
        {
          id: "0",
          name: "默认",
        },
        {
          id: "1",
          name: "微软雅黑",
        },
        {
          id: "2",
          name: "仿宋",
        },
      ],
      resolutionRatio_x: "",
      resolutionRatio_y: "",
      module_list: [],
      typelist: [
        {
          id: "0",
          name: "本地",
        },
        {
          id: "1",
          name: "接口",
        },
      ],
      triggerTypelist: [
        {
          id: "0",
          name: "默认显示",
        },
        {
          id: "1",
          name: "固定车辆入场",
        },
        {
          id: "2",
          name: "固定车辆离场",
        },
        {
          id: "3",
          name: "临停车辆入场",
        },
        {
          id: "4",
          name: "临停车辆离场",
        },
        {
          id: "5",
          name: "预约车辆入场",
        },
        {
          id: "6",
          name: "预约车辆离场",
        },
        {
          id: "7",
          name: "无牌车车辆",
        },
      ],
      edit_title: "",
      edit_loading: false,
      edit_modal: false,
      edit_data: {
        level: "",
        type: "",
        x: "",
        y: "",
        width: "",
        height: "",
        fontSize: "",
        fontType: "",
        remark: "",
        templateCode: "",
      },
      current_module: 1,
      totals_module: 5,
      loading_module: false,
      module_data: {
        templateName: "",
        resolutionRatio: "",
        type: "",
        triggerType: "",
        keepTime: "",
        remark: "",
        displayUrl: "",
        component: [],
      },
      module_btn_loading: false,
      module_show_hide: false,
      module_title: "添加模板功能组",
      totals: 10,
      columns: [
        {
          title: "基础模板名称",
          align: "center",
          key: "templateName",
          minWidth: 120,
        },
        {
          title: "适用屏幕分辨率",
          align: "center",
          key: "resolutionRatio",
          minWidth: 135,
        },
        {
          title: "类型",
          align: "center",
          key: "type",
          minWidth: 80,
          render: (h, params) => {
            let data = params.row.type;
            let name = data == 0 ? "本地" : data == 1 ? "接口" : "";
            return h("div", name);
          },
        },
        {
          title: "触发条件",
          align: "center",
          key: "triggerType",
          minWidth: 120,
          render: (h, params) => {
            let data = params.row.triggerType;
            let name =
              data == 0
                ? "默认显示"
                : data == 1
                ? "固定车辆入场"
                : data == 2
                ? "固定车辆离场"
                : data == 3
                ? "临停车辆入场"
                : data == 4
                ? "临停车辆离场"
                : data == 5
                ? "预约车辆入场"
                : data == 6
                ? "预约车辆离场"
                : data == 7
                ? "无牌车车辆"
                : "";
            return h("div", name);
          },
        },
        {
          title: "组件数量",
          align: "center",
          key: "componentNum",
          minWidth: 100,
        },
        {
          title: "保持时间",
          align: "center",
          key: "keepTime",
          minWidth: 100,
        },

        {
          title: "备注",
          align: "center",
          key: "remark",
          minWidth: 150,
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
      list_module: [],
      columns_model: [
        {
          title: "层级",
          key: "level",
          minWidth: 80,
          align: "center",
        },
        {
          title: "组件类型",
          key: "type",
          minWidth: 100,
          align: "center",
          render: (h, params) => {
            let data = params.row.type;
            let name =
              data == 1 ? "文本" : data == 2 ? "图片" : data == 3 ? "时间" : "";
            return h("div", name);
          },
        },
        {
          title: "横向位置",
          key: "x",
          minWidth: 100,
          align: "center",
        },
        {
          title: "纵向位置",
          key: "y",
          minWidth: 100,
          align: "center",
        },
        {
          title: "长度",
          key: "height",
          minWidth: 80,
          align: "center",
        },
        {
          title: "宽度",
          key: "width",
          minWidth: 80,
          align: "center",
        },
        {
          title: "字号",
          key: "fontSize",
          minWidth: 80,
          align: "center",
        },
        {
          title: "字体",
          key: "fontType",
          minWidth: 100,
          align: "center",
          render: (h, params) => {
            let data = params.row.fontType;
            let name =
              data == 0
                ? "默认"
                : data == 1
                ? "微软雅黑"
                : data == 2
                ? "仿宋"
                : "";
            return h("div", name);
          },
        },
        {
          title: "附加参数",
          key: "remark",
          minWidth: 150,
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
      loading: false,
      list: [],
      current: 1,
      size: 10,
      datas: {
        start: 0,
        pageSize: 10,
        filterJson: {},
      },
      identification: false,
    };
  },
  created() {
    // this.Refresh();
  },
  methods: {
    Refresh() {
      this.current = 1;
      let data = this.datas;
      let start = data.start;
      let pageSize = data.pageSize;
      let filterJson = data.filterJson;
      this.loading = true;
      Administration_biz_template_info_list({
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
      Administration_biz_template_info_list({
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
    //新增基础模板
    binding() {
      this.module_show_hide = true;
      this.module_title = "新增基础模板";
      this.module_list = [];
      this.module_data = {
        templateName: "",
        resolutionRatio: "",
        type: "",
        triggerType: "",
        keepTime: "",
        remark: "",
        displayUrl: "",
        component: [],
      };
      this.resolutionRatio_x = "";
      this.resolutionRatio_y = "";
      this.deleteFile();
    },
    //编辑
    information_edit(val) {
      this.module_show_hide = true;
      this.id = val.id;
      this.module_title = "编辑基础模板";
      this.image_show = false;
      this.module_data.templateName = val.templateName;
      this.module_data.resolutionRatio = val.resolutionRatio;
      this.module_data.type = String(val.type);
      this.module_data.triggerType = String(val.triggerType);
      this.module_data.keepTime = val.keepTime;
      this.module_data.displayUrl = val.displayUrl;
      this.module_data.remark = val.remark;
      this.resolutionRatio_x = val.resolutionRatio.split("*")[0];
      this.resolutionRatio_y = val.resolutionRatio.split("*")[1];
      this.loading_module = true;
      this.templateCode = val.templateCode;
      Administration_template_info_find_list_by_code({
        templateCode: val.templateCode,
      }).then((res) => {
        this.module_list = res;
        this.loading_module = false;
      });
    },
    //删除
    information_unbind(val) {
      this.$Modal.confirm({
        title: "删除",
        onOk: () => {
          Administration_template_info_delete({
            id: val.id,
          }).then((res) => {
            if (res.success == true) {
              this.Refresh();
              this.$Message.success(res.content);
            } else {
              this.$Message.error(res.content);
            }
          });
        },
        onCancel: () => {},
      });
    },
    //添加组件
    add_modal() {
      this.edit_title = "添加组件";
      this.edit_modal = true;
      this.identification = false;
      this.edit_data = {
        level: "",
        type: "",
        x: "",
        y: "",
        width: "",
        height: "",
        fontSize: "",
        fontType: "",
        remark: "",
        templateCode: "",
      };
    },
    // 弹出框确定
    module_ok() {
      if (!this.module_data.templateName) {
        this.$Message.error("模板名称不能为空");
        return;
      }
      if (!this.resolutionRatio_x) {
        this.$Message.error("屏幕横向分辨率不能为空");
        return;
      }
      if (!this.resolutionRatio_y) {
        this.$Message.error("屏幕纵向分辨率不能为空");
        return;
      }
      if (!this.module_data.type) {
        this.$Message.error("请选择类型");
        return;
      }
      if (!this.module_data.triggerType) {
        this.$Message.error("请选择触发条件");
        return;
      }
      this.module_data.resolutionRatio =
        this.resolutionRatio_x + "*" + this.resolutionRatio_y;
      if (this.module_title == "新增基础模板") {
        this.module_btn_loading = true;
        this.module_data.component = JSON.stringify(this.module_list);
        Administration_template_info_save(this.module_data).then((res) => {
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
        this.module_btn_loading = true;
        let data = {
          templateName: this.module_data.templateName,
          resolutionRatio: this.module_data.resolutionRatio,
          type: this.module_data.type,
          triggerType: this.module_data.triggerType,
          keepTime: this.module_data.keepTime,
          remark: this.module_data.remark,
          displayUrl: this.module_data.displayUrl,
          id: this.id,
        };
        Administration_template_info_update(data).then((res) => {
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
    //弹出框列表跳转页面
    // jump_module() {},
    //组件取消
    edit_cancle() {
      this.edit_modal = false;
      this.edit_loading = false;
      this.identification = false;
    },
    // 组件确定
    edit_ok() {
      if (!this.edit_data.level) {
        this.$Message.error("请选择层级");
        return;
      }
      if (!this.edit_data.type) {
        this.$Message.error("请选择组件类型");
        return;
      }
      if (!this.edit_data.x) {
        this.$Message.error("请填写横向位置");
        return;
      }
      if (!this.edit_data.y) {
        this.$Message.error("请填写纵向位置");
        return;
      }
      if (!this.edit_data.height) {
        this.$Message.error("请填写长度");
        return;
      }
      if (!this.edit_data.width) {
        this.$Message.error("请填写宽度");
        return;
      }
      if (!this.edit_data.fontSize) {
        this.$Message.error("请填写字号");
        return;
      }
      if (!this.edit_data.fontType) {
        this.$Message.error("请选择字体");
        return;
      }
      if (this.module_title == "新增基础模板") {
        if (this.identification == true) {
          //编辑组件
          this.identification = false;
          let data = this.module_list;
          data[this.index] = this.edit_data;
          this.module_list = [];
          data.map((res) => {
            this.module_list.push(res);
          });
          this.edit_modal = false;
        } else {
          //添加组件
          this.module_list.push(this.edit_data);
          this.edit_modal = false;
        }
      } else {
        if (this.identification == true) {
          //编辑组件
          this.identification = false;
          let data = {
            id: this.edit_id,
            level: this.edit_data.level,
            type: this.edit_data.type,
            x: this.edit_data.x,
            y: this.edit_data.y,
            width: this.edit_data.width,
            height: this.edit_data.height,
            fontSize: this.edit_data.fontSize,
            fontType: this.edit_data.fontType,
            remark: this.edit_data.remark,
            templateCode: this.templateCode,
          };
          this.edit_loading = true;
          Administration_template_info_update_component(data).then((res) => {
            if (res.success == true) {
              this.edit_modal = false;
              this.$Message.success(res.content);
              //组件列表
              Administration_template_info_find_list_by_code({
                templateCode: this.templateCode,
              }).then((res) => {
                this.module_list = res;
              });
            } else {
              this.$Message.error(res.content);
            }
            this.edit_loading = false;
          });
        } else {
          //添加组件
          let data = {
            level: this.edit_data.level,
            type: this.edit_data.type,
            x: this.edit_data.x,
            y: this.edit_data.y,
            width: this.edit_data.width,
            height: this.edit_data.height,
            fontSize: this.edit_data.fontSize,
            fontType: this.edit_data.fontType,
            remark: this.edit_data.remark,
            templateCode: this.templateCode,
          };
          this.edit_loading = true;
          Administration_template_info_save_component(data).then((res) => {
            if (res.success == true) {
              this.edit_modal = false;
              this.$Message.success(res.content);
              //组件列表
              Administration_template_info_find_list_by_code({
                templateCode: this.templateCode,
              }).then((res) => {
                this.module_list = res;
              });
            } else {
              this.$Message.error(res.content);
            }
            this.edit_loading = false;
          });
        }
        // this.edit_modal = false
      }
    },
    //组件编辑
    modal_edit(val) {
      this.edit_title = "编辑组件";
      this.edit_modal = true;
      this.identification = true;
      this.index = val._index;
      this.edit_id = val.id;
      this.edit_data = {
        level: "",
        type: "",
        x: "",
        y: "",
        width: "",
        height: "",
        fontSize: "",
        fontType: "",
        remark: "",
        templateCode: "",
      };
      this.edit_data.level = String(val.level);
      this.edit_data.type = String(val.type);
      this.edit_data.x = val.x;
      this.edit_data.y = val.y;
      this.edit_data.height = val.height;
      this.edit_data.width = val.width;
      this.edit_data.fontSize = val.fontSize;
      this.edit_data.fontType = String(val.fontType);
      this.edit_data.remark = val.remark;
    },
    //组件删除
    modal_unbind(val) {
      if (this.module_title == "新增基础模板") {
        this.$Modal.confirm({
          title: "删除",
          onOk: () => {
            this.module_list.splice(val._index, 1);
          },
          onCancel: () => {},
        });
      } else {
        this.$Modal.confirm({
          title: "删除",
          onOk: () => {
            Administration_template_info_delete_component({
              id: val.id,
            }).then((res) => {
              if (res.success == true) {
                this.$Message.success(res.content);
                //组件列表
                Administration_template_info_find_list_by_code({
                  templateCode: this.templateCode,
                }).then((res) => {
                  this.module_list = res;
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
    //上传文件的钩子
    handleUpload(file) {
      this.file = [];
      // 删除需要上传文件数据里的当前文件
      this.uploadFile = [];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const _base64 = reader.result;
        this.module_data.displayUrl = _base64; //将_base64赋值给图片的src，实现图片预览
      };
      // 上传文件前的事件钩子
      // 选择文件后 这里判断文件类型 保存文件 自定义一个keyid 值 方便后面删除操作
      let keyID = Math.random().toString().substr(2);
      file["keyID"] = keyID;
      // 保存文件到总展示文件数据里
      this.file.push(file);
      // 保存文件到需要上传的文件数组里
      this.uploadFile.push(file);
      this.image_show = true;
      // 返回 falsa 停止自动上传 我们需要手动上传
      return false;
    },
    //上传成功的回调
    uploadSuccess(res, file, fileList) {
      // 文件上传回调 上传成功后删除待上传文件
      if (res.success == true) {
        this.module_data.displayUrl =
          "http://oss.linkmoretech.cn/" + res.map.attach.compressUrl;
        this.$Notice.success({
          title: "系统提示",
          desc: res.content,
        });
        this.image_show = false;
      } else {
        this.$Notice.error({
          title: "系统提示",
          desc: res.content,
        });
        this.image_show = true;
      }
      this.upload_loading = false;
    },
    // 上传文件
    upload() {
      this.upload_loading = true;
      this.up_data.id = "";
      for (let i = 0; i < this.uploadFile.length; i++) {
        const item = this.file[i];
        this.$refs.upload.post(item);
      }
    },
    // 删除图片
    deleteFile() {
      this.image_show = false;
      // 删除文件
      // 删除总展示文件里的当前文件
      this.file = [];
      // 删除需要上传文件数据里的当前文件
      this.uploadFile = [];
      this.module_data.displayUrl = "";
    },
    img_click(){
        this.modal_img = true
    },
    modal_img_ok(){
   this.modal_img = false
    }
  },
};
</script>
