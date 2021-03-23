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
}
.user_text {
  width: 100%;
  height: 90%;
}
.user_input1 {
  width: 100%;
  height: 20%;
  padding: 0 1vw;
  margin-top: 1vw;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.user_input2 {
  width: 100%;
  height: 20%;
  padding: 0 1vw;
  margin-top: 1vw;
  display: flex;
  justify-content: flex-start;
  align-items: top;
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
  // margin-top: 5px;
}
.user_labels {
  display: inline-block;
  width: 40px;
  text-align-last: justify;
}
.module_divs {
  width: 95%;
  margin-top: 10px;
  padding-left: 8%;
}
.module_divs2 {
  width: 95%;
  margin-top: 10px;
  padding-left: 8%;
  display: flex;
  justify-items: center;
}
.module_divs3 {
  width: 95%;
  margin-top: 10px;
  padding-left: 8%;
  display: flex;
  // align-items: center;
}
.module_switch {
  width: 75%;
  margin: 0 auto;
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  border: 1px solid;
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
    <Button type="primary" @click="add_avenue">新增账号</Button>
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
      :styles="{ top: '20%' }"
      :mask-closable="false"
    >
      <div slot="footer">
        <Button @click="modalcancel">取消</Button>
        <Button @click="modalok" type="primary" :loading="loading_btn"
          >确定</Button
        >
      </div>
      <div style="padding-left: 5px">
        <!-- 账号名 -->
        <div class="module_divs">
          <label for style="color: red">*</label>
          <label for class="user_label">账号名</label>:
          <Input
            v-if="module_title == '新增系统账号'"
            v-model="add_data.username"
            style="width: 70%; margin-left: 10px"
            placeholder="请输入账号名"
          />
          <span v-else style="width: 70%; margin-left: 10px">{{
            add_data.username
          }}</span>
        </div>
        <!-- 密码 -->
        <div class="module_divs">
          <label for style="color: red">*</label>
          <label for class="user_label">密码</label>:
          <Input
            v-if="module_title == '新增系统账号' || input_true == true"
            v-model="add_data.password"
            placeholder="请输入密码"
            style="width: 70%; margin-left: 10px"
          />
          <Button
            v-else
            @click="change_password"
            style="width: 70%; margin-left: 10px"
            >修改密码</Button
          >
        </div>
        <!-- 姓名 -->
        <div class="module_divs">
          <label for style="color: white">*</label>
          <label for class="user_label">姓名</label>:
          <Input
            v-model="add_data.realname"
            placeholder="请输入姓名"
            style="width: 70%; margin-left: 10px"
          />
        </div>
        <!-- 电话号码 -->
        <div class="module_divs">
          <label for style="color: white">*</label>
          <label for class="user_label">电话号码</label>:
          <Input
            v-model="add_data.tellphone"
            placeholder="请输入电话号码"
            style="width: 70%; margin-left: 10px"
          />
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
            style="width: 70%; margin-left: 14px"
          />
        </div>
        <!-- 车场名称 -->
        <div class="module_divs3">
          <label for style="color: white">*</label>
          <label for class="user_label">角色权限</label>:
          <!-- <Select
            v-model="add_data.preId"
            clearable
            style="width: 70%; margin-left: 10px"
          >
            <Option
              v-for="(item, index) in preIdlist"
              :value="item.id"
              :key="index"
              >{{ item.name }}</Option
            >
          </Select> -->
          <CheckboxGroup
            v-model="roleIds"
            style="width: 70%; margin-left: 20px"
          >
            <Checkbox
              v-for="(item, index) in roleIdslist"
              :key="index"
              :label="item.id"
            >
              <span>{{ item.name }}</span>
            </Checkbox>
          </CheckboxGroup>
        </div>
        <!-- 统计分析 -->
        <!-- <div class="module_divs">
          <label for style="color: white">*</label>
          <label for class="user_label">统计分析</label>:
          <Switch
            v-model="add_data.analysisFlag"
            :true-value="1"
            :false-value="0"
            style="margin-left: 14px"
          />
        </div> -->
      </div>
    </Modal>
  </div>
</template>
<script>
import random from "@/libs/random_str";
import {
  //系统账号列表
  admin_security_person_list,
  //新增系统账号
  admin_security_person_save,
  //编辑系统账号
  admin_security_person_update,
  //系统账号删除
  admin_security_person_delete,
  //启用-禁用
  admin_security_person_updata_flag,
  //角色列表
  admin_security_person_role_list,
  //账号拥有的角色列表
  admin_security_person_role_person_list,
} from "@/api/account_management";
import { Administration_selectList } from "@/api/Administration";
import time from "@/api/time";

export default {
  data() {
    return {
      roleIds: [],
      roleIdslist: [],
      input_true: false,
      loading_btn: false,
      add_data: {
        roleIds: "",
        password: "",
      },
      module_title: "",
      modal9: false,
      totals: 10,
      data: "",
      columns: [
        {
          title: "账号",
          key: "username",
          minWidth: 100,
          align: "center",
        },
        {
          title: "姓名",
          key: "realname",
          minWidth: 100,
          align: "center",
        },
        {
          title: "备注",
          key: "remark",
          align: "center",
          minWidth: 160,
        },
        {
          title: "创建时间",
          key: "createTime",
          align: "center",
          minWidth: 170,
          render: (h, params) => {
            return h("div", time.TT(params.row.createTime));
          },
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
            // }
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
        filterJson: { filters: [{ property: "admin", value: "1" }] },
      },
      edit_id: "",
    };
  },
  created() {
    this.list1();
  },
  methods: {
    //新增账号
    add_avenue() {
      this.modal9 = true;
      this.module_title = "新增系统账号";
      this.roleIds = [];
      admin_security_person_role_list().then((res) => {
        this.roleIdslist = res;
      });
      this.add_data = {
        username: "",
        roleIds: "",
        password: "",
        remark: "",
        realname: "",
        tellphone: "",
      };
    },
    modalok() {
      // this.modal9 = false;
      this.loading_btn = true;
      if (!this.add_data.username) {
        this.$Message.error("请填写账号名");
        this.loading_btn = false;
        return;
      }
      if (this.module_title == "新增系统账号") {
        if (!this.add_data.password) {
          this.$Message.error("请填写密码");
          this.loading_btn = false;
          return;
        }
      }
      this.roleIds.map((res, index) => {
        if (this.roleIds.length == index + 1) {
          this.add_data.roleIds += res;
        } else {
          this.add_data.roleIds += res + ",";
        }
      });
      if (this.module_title == "新增系统账号") {
        this.add_data.status = 1;
        admin_security_person_save(this.add_data).then((res) => {
          if (res.success == true) {
            this.$Message.success(res.content);
            this.modal9 = false;
            // this.list1();
            this.$emit("reset");
          } else {
            this.$Message.error(res.content);
          }
          this.loading_btn = false;
        });
      } else {
        let data = {
          username: this.add_data.username,
          password: this.add_data.password,
          remark: this.add_data.remark,
          realname: this.add_data.realname,
          tellphone: this.add_data.tellphone,
          roleIds: this.add_data.roleIds,
          id: this.edit_id,
        };
        admin_security_person_update(data).then((res) => {
          if (res.success == true) {
            this.$Message.success(res.content);
            this.modal9 = false;
            this.delete_getData();
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
    //修改密码
    change_password() {
      this.input_true = true;
    },
    delete(e) {
      this.$Modal.confirm({
        title: "确定删除",
        onOk: () => {
          admin_security_person_delete({ id: e.id }).then((res) => {
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
      admin_security_person_role_list().then((res) => {
        this.roleIdslist = res;
      });
      this.modal9 = true;
      this.module_title = "编辑系统账号";
      this.input_true = false;
      this.roleIds = [];
      this.add_data = {
        username: val.username,
        remark: val.remark,
        realname: val.realname,
        tellphone: val.tellphone,
        roleIds: "",
        password: "",
      };
      this.edit_id = val.id;
      admin_security_person_role_person_list({
        id: val.id,
      }).then((res) => {
        res.map((item, index) => {
          this.roleIds.push(item.roleId);
        });
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
      admin_security_person_list({
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
          filterJson: { filters: [{ property: "admin", value: "1" }] },
        };
      }
      this.list = [];
      this.data = value;
      let start = value.start;
      let pageSize = value.pageSize;
      let filterJson = value.filterJson;
      this.current = 1;
      this.loading = true;
      admin_security_person_list({
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
          filterJson: { filters: [{ property: "admin", value: "1" }] },
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
      admin_security_person_list({
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
      admin_security_person_list({
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

    //启用
    change_status_open(id) {
      admin_security_person_updata_flag({
        id: id,
        type: 1,
      }).then((res) => {
        if (res.success == true) {
          this.$Message.success(res.content);
        } else {
          this.$Message.error(res.content);
          setTimeout(() => {
            // this.$router.go(0);
            this.delete_getData();
          }, 2000);
        }
      });
    },
    //禁用
    change_status_close(id) {
      admin_security_person_updata_flag({
        id: id,
        type: 0,
      }).then((res) => {
        if (res.success == true) {
          this.$Message.success(res.content);
        } else {
          this.$Message.error(res.content);
          setTimeout(() => {
            // this.$router.go(0);
            this.delete_getData();
          }, 2000);
        }
      });
    },
  },
};
</script>
