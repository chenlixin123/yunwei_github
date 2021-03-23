<style lang="less" scoped>
.box {
  width: 100%;
  min-width: 1000px;
  height: 85vh;
  box-sizing: border-box;
  font-size: 0.9vw;
  margin: 24px;
}
.user_label {
  display: inline-block;
  width: 60px;
  text-align-last: justify;
  margin-top: 5px;
}
.user_labels {
  display: inline-block;
  width: 40px;
  text-align-last: justify;
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
.module_switch {
  width: 600px;
  margin-left: 20px;
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
}
.module_divs1 {
  width: 21%;
  display: flex;
  justify-content: space-between;
}
.divs1_label {
  width: 60px;
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
.p {
  margin-bottom: 10px;
}
</style>
<template>
  <div class="box">
    <Card title="车道信息" :bordered="false" dis-hover class="ivu-mt">
      <div>
        <!-- 车场名称 -->
        <div style="padding-left: 5px">
          <div class="module_divs">
            <label for style="color: red">*</label>
            <label for class="user_label">车场名称</label>:
            <span class="span_else">{{ parkName }}</span>
          </div>
          <!-- 楼层 -->
          <div class="module_divs">
            <label for style="color: red">*</label>
            <label for class="user_label">楼层</label>:
            <!-- <Select v-model="add_data.floor" clearable style="width:522px;margin-Left:10px;">
              <Option
                v-for="(item,index) in floorList"
                :value="item.id"
                :key="index"
              >{{ item.floorName }}</Option>
            </Select>-->
            <span class="span_else">{{ add_data.floor }}</span>
          </div>
          <!-- 分区 -->
          <div class="module_divs">
            <label for style="color: white">*</label>
            <label for class="user_label">分区</label>:
            <Select
              v-model="add_data.areaName"
              clearable
              @on-create="handleCreate1"
              allow-create
              filterable
              type="text"
              style="width: 522px; margin-left: 10px"
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
            <Tooltip max-width="200" style="margin-left: -9px; margin-top: 5px">
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
            <div style="width: 800px">
              <label for style="color: red; margin-left: 15px">*</label>
              <label for class="user_labels">横向</label>:
              <Select v-model="one_transverse" clearable style="width: 200px">
                <Option
                  v-for="(item, index) in transverselist"
                  :value="item.name"
                  :key="index"
                  >{{ item.name }}</Option
                >
              </Select>

              <label for style="color: red; margin-left: 15px">*</label>
              <label for class="user_labels">纵向</label>:
              <Select v-model="one_portrait" clearable style="width: 200px">
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
            <div style="width: 800px">
              <label for style="color: red; margin-left: 15px">*</label>
              <label for class="user_labels">横向</label>:
              <Select v-model="two_transverse" clearable style="width: 200px">
                <Option
                  v-for="(item, index) in transverselist"
                  :value="item.name"
                  :key="index"
                  >{{ item.name }}</Option
                >
              </Select>

              <label for style="color: red; margin-left: 15px">*</label>
              <label for class="user_labels">纵向</label>:
              <Select v-model="two_portrait" clearable style="width: 200px">
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
          <!-- switch开关 -->
          <div class="module_switch">
            <div class="module_divs1">
              <label for class="divs1_label">自动降锁</label>
              <Switch
                v-model="add_data.autoDownFlag"
                true-value="1"
                false-value="0"
              />
            </div>
            <div class="module_divs1">
              <label for class="divs1_label">自动升锁</label>
              <Switch
                v-model="add_data.autoUpFlag"
                true-value="1"
                false-value="0"
              />
            </div>
          </div>
          <!-- 备注 -->
          <div class="module_divs3">
            <label for style="color: white">*</label>
            <label for class="user_label">备注</label>
            <span style="margin-top: 5px">:</span>
            <Input
              v-model="add_data.remark"
              type="textarea"
              :rows="4"
              placeholder="请输入备注"
              style="width: 525px; margin-left: 10px"
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
      <Tabs value="name1" @on-click="tabs">
        <TabPane label="车道车位" name="name1">
          <Button style="width: 99%" @click="binding1">+绑定车位</Button>
          <Table
            ref="table"
            :columns="columns1"
            :data="list1"
            :loading="loading1"
            class="ivu-mt"
          >
            <template slot-scope="{ row }" slot="stallName">
              <div>{{ row.stallName }}</div>
            </template>
            <template slot-scope="{ row }" slot="stallCamera">
              <div>{{ row.stallCamera }}</div>
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
          <!-- <div class="ivu-mt ivu-text-center">
            <Page :total="totals1" show-total :current="current1" @on-change="jump1" />
          </div>-->
        </TabPane>
        <TabPane label="导航信息屏" name="name2">
          <Button style="width: 99%" @click="binding2">+绑定导航信息屏</Button>
          <Table
            ref="table"
            :columns="columns2"
            :data="list2"
            :loading="loading2"
            class="ivu-mt"
          >
            <template slot-scope="{ row }" slot="screenCode">
              <div>{{ row.screenCode }}</div>
            </template>
            <template slot-scope="{ row }" slot="screenFlag">
              <div v-if="row.screenFlag == 0">离线</div>
              <div v-else>在线</div>
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
          <!-- <div class="ivu-mt ivu-text-center">
            <Page :total="totals2" show-total :current="current2" @on-change="jump2" />
          </div>-->
        </TabPane>
        <TabPane label="车道摄像机" name="name3">
          <Button style="width: 99%" @click="binding3">+绑定车道摄像机</Button>
          <Table
            ref="table"
            :columns="columns3"
            :data="list3"
            :loading="loading3"
            class="ivu-mt"
          >
            <template slot-scope="{ row }" slot="cameraCode">
              <div>{{ row.cameraCode }}</div>
            </template>
            <template slot-scope="{ row }" slot="cameraOnlineStatus">
              <div v-if="row.cameraOnlineStatus === 0">离线</div>
              <div v-else>在线</div>
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
          <!-- <div class="ivu-mt ivu-text-center">
            <Page :total="totals3" show-total :current="current3" @on-change="jump3" />
          </div>-->
        </TabPane>
      </Tabs>
    </Card>
    <Modal
      :title="module_title"
      v-model="modal9"
      :mask-closable="false"
      :styles="{ top: '20px' }"
    >
      <div slot="footer">
        <Button @click="module_cancel">取消</Button>
        <Button @click="module_ok" type="primary" :loading="loading_btn_bottom"
          >确定</Button
        >
      </div>
      <div style="paddingleft: 30px">
        <div class="module_divss">
          <label for class="user_label">车场名称</label>:
          <span class="span_else">{{ parkName }}</span>
        </div>
        <div class="module_divss">
          <label for class="user_label">楼层</label>:
          <span class="span_else">{{ floor }}</span>
        </div>
        <div class="module_divss">
          <label for class="user_label">车道名称</label>:
          <span class="span_else">{{ laneName }}</span>
        </div>
        <Transfer
          :data="data1"
          :target-keys="targetKeys1"
          :render-format="val == 1 ? render1 : render3"
          :titles="titles"
          :operations="operations"
          reverse-operation
          @on-change="handleChange1"
        ></Transfer>
      </div>
    </Modal>

    <!-- 编辑导航信息屏 -->
    <Modal
      title="编辑导航信息屏"
      v-model="model2_edit"
      :styles="{ top: '20%' }"
      :mask-closable="false"
    >
      <div slot="footer">
        <Button @click="cancle2">取消</Button>
        <Button @click="module_ok2" type="primary" :loading="loading_btn2"
          >确定</Button
        >
      </div>
      <div style="padding-left: 5px">
        <!-- 联动相机 -->
        <div class="module_divs">
          <label for style="color: white">*</label>
          <label for class="user_label">联动相机</label>:
          <Select
            v-model="cameracode"
            clearable
            multiple
            allow-create
            style="width: 70%; margin-left: 10px"
          >
            <Option
              v-for="(item, index) in cameracodelist"
              :value="item.cameraCode"
              :key="index"
              >{{ item.cameraCode }}</Option
            >
          </Select>
        </div>
        <!-- 备注 -->
        <div class="module_divs3">
          <label for style="color: white">*</label>
          <label for class="user_label">备注</label>
          <span style="margin-top: 5px">:</span>
          <Input
            v-model="screendata.remark"
            type="textarea"
            :rows="4"
            placeholder="请输入备注"
            style="width: 70%; margin-left: 14px"
          />
        </div>
      </div>
    </Modal>

    <!-- 编辑车道摄像机 -->
    <Modal
      title="编辑车道相机"
      v-model="model3_edit"
      :styles="{ top: '20%' }"
      :mask-closable="false"
    >
      <div slot="footer">
        <Button @click="cancle3">取消</Button>
        <Button @click="module_ok3" type="primary" :loading="loading_btn3"
          >确定</Button
        >
      </div>
      <!-- 状态 -->
      <div style="padding-left: 5px">
        <div class="module_divs">
          <label for style="color: white">*</label>
          <label for class="user_label">状态</label>:
          <Select
            v-model="cameradata.cameraOnlineStatus"
            clearable
            style="width: 70%; margin-left: 10px"
          >
            <Option
              v-for="(item, index) in cameraOnlineStatulist"
              :value="item.id"
              :key="index"
              >{{ item.name }}</Option
            >
          </Select>
        </div>
        <!-- 下行方向 -->
        <div class="module_divs">
          <label for style="color: white">*</label>
          <label for class="user_label">下行方向</label>:
          <Select
            v-model="cameradata.laneType"
            clearable
            style="width: 70%; margin-left: 10px"
          >
            <Option
              v-for="(item, index) in laneTypelist"
              :value="item.id"
              :key="index"
              >{{ item.name }}</Option
            >
          </Select>
        </div>
        <!-- 有效车辆 -->
        <div class="module_divs">
          <label for style="color: white">*</label>
          <label for class="user_label">有效车辆</label>:
          <Select
            v-model="cameradata.effectCarType"
            clearable
            style="width: 70%; margin-left: 10px"
          >
            <Option
              v-for="(item, index) in effectCarTypelist"
              :value="item.id"
              :key="index"
              >{{ item.name }}</Option
            >
          </Select>
        </div>

        <!-- 地图标签 -->
        <div class="module_divs">
          <label for style="color: white">*</label>
          <label for class="user_label">地图标签</label>:
          <Input
            v-model="cameradata.mapLabel"
            placeholder="请填写地图标签"
            style="width: 70%; margin-left: 10px"
          ></Input>
        </div>

        <!-- 信息屏 -->
        <div class="module_divs">
          <label for style="color: white">*</label>
          <label for class="user_label">信息屏</label>:
          <Select
            v-model="cameradata.screenCode"
            clearable
            allow-create
            style="width: 70%; margin-left: 10px"
          >
            <Option
              v-for="(item, index) in screenCodelist"
              :value="item.screenCode"
              :key="index"
              >{{ item.screenCode }}</Option
            >
          </Select>
        </div>
      </div>
    </Modal>
  </div>
</template>
<script>
import {
  //1
  Administration_rent_list,
  //车位列表查询选项级联接口
  Administration_om_floor_area_stall_list,
  //更新车道
  Administration_lane_om_update,
  //车道车位列表
  Administration_lane_om_stall_list,
  //查询未绑定车道的车位列表
  Administration_lane_om_stall_not_bind,
  //新增车道车位绑定
  Administration_lane_om_stall_bind,
  //解除车道车位绑定
  Administration_lane_om_stall_unbind,
  //自动降锁
  Administration_om_auto_down_flag,
  //自动升锁
  Administration_om_auto_up_flag,
  //车位相机自动升锁
  Administration_om_camera_up_flag,
  //车位锁感应自动升锁
  Administration_om_induction_up_flag,
  //2
  //车道导航信息屏列表
  Administration_lane_om_screen_lane_list,
  //未绑定车道的相机列表
  Administration_lane_om_screen_not_bind,
  //解除车道导航信息屏的绑定
  Administration_lane_om_screen_unbind,
  //新增车道导航信息屏绑定
  Administration_lane_om_screen_bind,
  //启用、禁用
  Administration_lane_om_screen_update_flag,
  //更新车道导航信息屏
  Administration_lane_om_screen_update,
  //3
  //查询车道相机列表
  Administration_lane_om_camera_lane_list, //无数据
  //查询未绑定车道的相机列表
  Administration_lane_om_camera_not_bind,
  //解除车道相机绑定
  Administration_lane_om_camera_unbind,
  //新增车道相机绑定
  Administration_lane_om_camera_bind,
  //启用、禁用
  Administration_lane_om_camera_update_flag,
  // 编辑车道相机
  Administration_lane_om_camera_update,
  //车道相机列表中编辑获取信息屏下拉列表
  Administration_lane_om_screen_select,
  //更新车道导航信息屏-联动相机下拉列表
  Administration_lane_om_camera_select,
} from "@/api/Administration";
import time from "@/api/time";
export default {
  data() {
    return {
      screendata: {},
      cameracodelist: [],
      cameracode: [],
      effectCarTypelist: [
        {
          id: 0,
          name: "全部",
        },
        {
          id: 1,
          name: "车头",
        },
        {
          id: 2,
          name: "车尾",
        },
      ],
      cameraOnlineStatulist: [
        {
          id: 0,
          name: "离线",
        },
        {
          id: 1,
          name: "在线",
        },
      ],
      laneTypelist: [
        {
          id: 1,
          name: "进入车道",
        },
        {
          id: 2,
          name: "离开车道",
        },
        {
          id: 3,
          name: "进出车道",
        },
        {
          id: 4,
          name: "未知",
        },
      ],
      mapLabellist: [],
      screenCodelist: [],
      loading_btn3: false,
      loading_btn2: false,
      model3_edit: false,
      model2_edit: false,
      cameradata: {},
      loading_btn: false,
      loading_btn_bottom: false,
      add_data: {},
      floorList: [],
      areaNameList: [],
      parkName: "",
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
      operations: ["移除", "增加"],
      titles: ["可选车位", "已选车位"],
      data1: [],
      targetKeys1: [],
      module_title: "",
      modal9: false,
      switch1: true,
      value6: "",
      data: "",
      model8: "",
      val: "1",
      columns1: [
        {
          title: "车道名称",
          key: "laneName",
          minWidth: 180,
          align: "center",
        },
        {
          title: "车位号",
          key: "stallName",
          slot: "stallName",
          align: "center",
          minWidth: 100,
        },
        {
          title: "车位相机",
          key: "stallCamera",
          slot: "stallCamera",
          minWidth: 80,
          align: "center",
        },
        {
          title: "车位锁",
          key: "lockSn",
          minWidth: 90,
          align: "center",
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
                  value: params.row.autoDownFlag == 1, // 控制开关的打开或关闭状态，官网文档属性是value
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
                    let id = parking.id;
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
                  value: params.row.autoUpFlag == 1, // 控制开关的打开或关闭状态，官网文档属性是value
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
                    let id = parking.id;
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
          key: "lotCameraUpFlag",
          minWidth: 80,
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
                  value: params.row.lotCameraUpFlag == 1, // 控制开关的打开或关闭状态，官网文档属性是value
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
                    let id = parking.id;
                    if (state) {
                      this.lotCameraUpFlag_open(id);
                    } else {
                      this.lotCameraUpFlag_close(id);
                    }
                  },
                },
              }),
            ]);
            return menu;
          },
        },
        {
          key: "lockInductionUpFlag",
          minWidth: 80,
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
                  value: params.row.lockInductionUpFlag == 1, // 控制开关的打开或关闭状态，官网文档属性是value
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
                    let id = parking.id;
                    if (state) {
                      this.lockInductionUpFlag_open(id);
                    } else {
                      this.lockInductionUpFlag_close(id);
                    }
                  },
                },
              }),
            ]);
            return menu;
          },
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
            menu = h(
              "div",
              {
                style: {
                  cursor: "pointer",
                  width: "60px",
                  height: "30px",
                  borderRadius: "5px",
                  margin: "0 auto",
                },
              },
              [
                h(
                  "div",
                  {
                    style: {
                      cursor: "pointer",
                      color: "red",
                      border: "1px solid #eee",
                      width: "60px",
                      height: "30px",
                      textAling: "center",
                      lineHeight: "30px",
                      borderRadius: "5px",
                    },
                    on: {
                      click: () => {
                        this.urlencoded(params.row);
                      },
                    },
                  },
                  "解绑"
                ),
              ]
            );
            return menu;
          },
        },
      ],
      columns2: [
        {
          title: "车道名称",
          key: "laneName",
          minWidth: 180,
          align: "center",
        },
        {
          title: "设备ID",
          key: "screenCode",
          slot: "screenCode",
          align: "center",
          minWidth: 100,
          // sortable: "custom"
        },
        {
          title: "状态",
          key: "screenFlag",
          slot: "screenFlag",
          minWidth: 80,
          align: "center",
        },
        {
          title: "分辨率",
          key: "resolutionRatio",
          minWidth: 80,
          align: "center",
        },
        {
          title: "联动相机",
          key: "laneCameraInfoCode",
          minWidth: 80,
          align: "center",
          render: (h, params) => {
            let data = params.row.laneCameraInfoCode;
            let laneCameraInfoCode = "";
            data.map((res, index) => {
              laneCameraInfoCode +=
                data.length == index + 1 ? res : res + " / ";
            });
            return h("div", laneCameraInfoCode);
          },
        },
        {
          title: "开/关",
          key: "id",
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
                  value: params.row.screenFlag == 1, // 控制开关的打开或关闭状态，官网文档属性是value
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
                    if (state) {
                      this.screenFlag_open(parking);
                    } else {
                      this.screenFlag_close(parking);
                    }
                  },
                },
              }),
            ]);
            return menu;
          },
        },
        {
          title: "备注",
          key: "floor",
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
                "div",
                {
                  style: {
                    cursor: "pointer",
                    color: "blue",
                    border: "1px solid #eee",
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
                      this.screen_edit(parking);
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
                    color: "red",
                    border: "1px solid #eee",
                    width: "60px",
                    height: "30px",
                    textAling: "center",
                    lineHeight: "30px",
                    borderRadius: "5px",
                    display: "inline-block",
                  },
                  on: {
                    click: () => {
                      this.screen_unbind(parking);
                    },
                  },
                },
                "解绑"
              ),
            ]);
            // }
            if (params.row.type != 0) {
              return menu;
            }
          },
        },
      ],
      columns3: [
        {
          title: "车道名称",
          key: "laneName",
          minWidth: 180,
          align: "center",
        },
        {
          title: "设备ID",
          key: "cameraCode",
          slot: "cameraCode",
          align: "center",
          minWidth: 100,
          // sortable: "custom"
        },
        {
          title: "状态",
          key: "cameraOnlineStatus",
          slot: "cameraOnlineStatus",
          minWidth: 80,
          align: "center",
        },
        {
          title: "下行方向",
          key: "laneType",
          minWidth: 80,
          align: "center",
          renderHeader: (h, params) => {
            let menu = null;
            menu = h("div", [
              h("span", "下行方向"),
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
                      },
                    },
                    "下行方向是指摄像头拍摄车道时，从视频上看，车辆从上方向下行驶时，车辆相对于车道的状态"
                  ),
                  h(
                    "p",
                    {
                      slot: "content",
                      style: {
                        whiteSpace: "normal",
                      },
                    },
                    "1.进入车道"
                  ),
                  h(
                    "p",
                    {
                      slot: "content",
                      style: {
                        whiteSpace: "normal",
                      },
                    },
                    "2.离开车道"
                  ),
                  h(
                    "p",
                    {
                      slot: "content",
                      style: {
                        whiteSpace: "normal",
                      },
                    },
                    "3.进出车道"
                  ),
                  h(
                    "p",
                    {
                      slot: "content",
                      style: {
                        whiteSpace: "normal",
                      },
                    },
                    "4.未知"
                  ),
                ]
              ),
            ]);
            return menu;
          },
          render: (h, params) => {
            let data = params.row.laneType;
            return h(
              "div",
              data == 1
                ? "进入车道"
                : data == 2
                ? "离开车道"
                : data == 3
                ? "进出车道"
                : data == 4
                ? "未知"
                : ""
            );
          },
        },
        {
          title: "有效车辆",
          ket: "effectCarType",
          minWidth: 80,
          align: "center",
          render: (h, params) => {
            let data = params.row.effectCarType;
            let name = "";
            if (data == 0) {
              name = "全部";
            } else if (data == 1) {
              name = "车头";
            } else if (data == 2) {
              name = "车尾";
            } else {
              name = "";
            }
            return h("span", name);
          },
        },
        {
          title: "地图标签",
          key: "mapLabel",
          minWidth: 80,
          align: "center",
        },
        {
          title: "信息屏",
          key: "screenCode",
          minWidth: 80,
          align: "center",
        },
        {
          title: "开/关",
          key: "id",
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
                  value: params.row.cameraFlag == 1, // 控制开关的打开或关闭状态，官网文档属性是value
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
                    if (state) {
                      this.camera_open(parking);
                    } else {
                      this.camera_close(parking);
                    }
                  },
                },
              }),
            ]);
            return menu;
          },
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
                "div",
                {
                  style: {
                    cursor: "pointer",
                    color: "blue",
                    border: "1px solid #eee",
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
                      this.camera_edit(parking);
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
                    color: "red",
                    border: "1px solid #eee",
                    width: "60px",
                    height: "30px",
                    textAling: "center",
                    lineHeight: "30px",
                    borderRadius: "5px",
                    display: "inline-block",
                  },
                  on: {
                    click: () => {
                      this.camera_unbind(parking);
                    },
                  },
                },
                "解绑"
              ),
            ]);
            return menu;
          },
        },
      ],
      loading1: false,
      loading2: false,
      loading3: false,
      list1: [],
      list2: [],
      list3: [],
      totals1: 10,
      totals2: 10,
      totals3: 10,
      current1: 1,
      current2: 1,
      current3: 1,
      datas: {
        start: 0,
        pageSize: 10,
        filterJson: "",
      },
      floor: "",
      laneName: "",
      areaName: "",
      modal_data1: [],
      modal_data2: [],
      modal_data3: [],
    };
  },
  created() {
    this.lists();
    this.module_data1();
    this.parkName = this.$route.query.parkName;
    this.floor = this.$route.query.floor;
    this.laneName = this.$route.query.laneName;
    this.areaName = this.$route.query.areaName;
  },
  watch: {
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
    tabs(name) {
      if (name == "name1") {
        this.module_data1();
      } else if (name == "name2") {
        this.module_data2();
      } else if (name == "name3") {
        this.module_data3();
      }
    },
    //确定编辑
    btn_ok() {
      if (!this.one_transverse) {
        this.$Message.error("请选择第一路口-横向");
        return;
      }
      if (!this.one_portrait) {
        this.$Message.error("请选择第一路口-纵向");
        return;
      }
      if (!this.two_transverse) {
        this.$Message.error("请选择第二路口-横向");
        return;
      }
      if (!this.two_portrait) {
        this.$Message.error("请选择第二路口-纵向");
        return;
      }
      this.loading_btn = true;
      let data = {};
      this.add_data.laneName =
        this.add_data.floor.split("层")[0] +
        "-" +
        this.one_transverse +
        this.one_portrait +
        "-" +
        this.two_transverse +
        this.two_portrait;
      data.id = this.add_data.id;
      data.preId = this.add_data.preId;
      data.floor = this.add_data.floor;
      data.areaName = this.add_data.areaName ? this.add_data.areaName : "";
      data.remark = this.add_data.remark ? this.add_data.remark : "";
      data.autoDownFlag = this.add_data.autoDownFlag;
      data.autoUpFlag = this.add_data.autoUpFlag;
      data.laneName = this.add_data.laneName;
      Administration_lane_om_update(data).then((res) => {
        if (res.success == true) {
          this.$Message.success(res.content);
          setTimeout(() => {
            this.$router.go(-1);
          }, 1000);
        } else {
          this.$Message.error(res.content);
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
      this.loading_btn_bottom = true;
      if (this.targetKeys1.length == 0) {
        this.$Message.error("绑定数据不能为空");
        this.loading_btn_bottom = false;
        return;
      }
      if (this.val == 1) {
        let stallIds = "";
        if (this.targetKeys1.length != 0) {
          this.targetKeys1.map((res, index) => {
            stallIds += index + 1 == this.targetKeys1.length ? res : res + ",";
          });
        }
        Administration_lane_om_stall_bind({
          laneId: this.$route.query.id,
          stallIds: stallIds,
        }).then((res) => {
          if (res.success == true) {
            this.$Message.success(res.content);
            this.modal9 = false;
            this.module_data1();
          } else {
            this.$Message.error(res.content);
          }
          this.loading_btn_bottom = false;
        });
      } else if (this.val == 2) {
        let screenCodes = "";
        if (this.targetKeys1.length != 0) {
          this.targetKeys1.map((res, index) => {
            screenCodes +=
              index + 1 == this.targetKeys1.length ? res : res + ",";
          });
        }
        this.loading_btn_bottom = false;
        Administration_lane_om_screen_bind({
          laneId: this.$route.query.id,
          screenCodes: screenCodes,
        }).then((res) => {
          if (res.success == true) {
            this.$Message.success(res.content);
            this.modal9 = false;
            this.module_data2();
          } else {
            this.$Message.error(res.content);
          }
          this.loading_btn_bottom = false;
        });
      } else {
        let cameraCodes = "";
        if (this.targetKeys1.length != 0) {
          this.targetKeys1.map((res, index) => {
            cameraCodes +=
              index + 1 == this.targetKeys1.length ? res : res + ",";
          });
        }
        this.loading_btn_bottom = false;
        Administration_lane_om_camera_bind({
          laneId: this.$route.query.id,
          cameraCodes: cameraCodes,
        }).then((res) => {
          if (res.success == true) {
            this.$Message.success(res.content);
            this.modal9 = false;
            this.module_data3();
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
      this.module_title = "绑定车道车位";
      this.titles = ["可选车位", "已选车位"];
      this.val = "1";
      this.getMockData();
    },
    //绑定导航信息屏
    binding2() {
      this.modal9 = true;
      this.module_title = "绑定导航信息屏";
      this.titles = ["可选导航信息屏", "已选导航信息屏"];
      this.val = "2";
      this.getMockData();
    },
    //绑定车道摄像机
    binding3() {
      this.modal9 = true;
      this.module_title = "绑定车道相机";
      this.titles = ["可选车道相机", "已选车道相机"];
      this.val = "3";
      this.getMockData();
    },
    handleCreate1(val) {
      this.areaNameList.push({
        value: val,
        label: val,
      });
    },
    lists() {
      Administration_om_floor_area_stall_list({
        preId: this.$route.query.preId,
      }).then((res) => {
        this.floorList = res;
        this.add_data = this.$route.query;
      });
      this.one_transverse = this.$route.query.laneName
        .split("-")[1]
        .split("")[0];
      this.one_portrait = this.$route.query.laneName.split("-")[1].split("")[1];
      this.two_transverse = this.$route.query.laneName
        .split("-")[2]
        .split("")[0];
      this.two_portrait = this.$route.query.laneName.split("-")[2].split("")[1];
    },
    module_data1() {
      this.current = 1;
      let data = this.datas;
      let start = data.start;
      let pageSize = data.pageSize;
      let filterJson = data.filterJson;
      this.loading1 = true;
      Administration_lane_om_stall_list({
        // start,
        // pageSize,
        // filterJson,
        laneId: this.$route.query.id,
      }).then((res) => {
        this.list1 = res;
        this.totals1 = res.total;
        this.loading1 = false;
      });
    },
    //解绑车道车位
    urlencoded(val) {
      this.$Modal.confirm({
        title: "解绑",
        onOk: () => {
          Administration_lane_om_stall_unbind({ id: val.id }).then((res) => {
            if (res.success == true) {
              this.$Message.success(res.content);
              this.module_data1();
            } else {
              this.$Message.error(res.content);
            }
          });
        },
        onCancel: () => {},
      });
    },
    //解绑车道相机绑定
    camera_unbind(val) {
      console.log(val.cameraFlag);
      if (val.cameraFlag == 1) {
        this.$Modal.info({
          title: "请禁用之后再解绑",
          okText: "确定",
          showcancel: false,
          onOk: () => {},
        });
        return;
      }
      this.$Modal.confirm({
        title: "解绑",
        onOk: () => {
          Administration_lane_om_camera_unbind({
            id: val.id,
          }).then((res) => {
            if (res.success == true) {
              this.$Message.success(res.content);
              this.module_data3();
            } else {
              this.$Message.error(res.content);
            }
          });
        },
        onCancel: () => {},
      });
    },
    //解绑导航信息屏绑定
    screen_unbind(val) {
      this.$Modal.confirm({
        title: "解绑",
        onOk: () => {
          Administration_lane_om_screen_unbind({
            id: val.id,
          }).then((res) => {
            if (res.success == true) {
              this.$Message.success(res.content);
              this.module_data2();
            } else {
              this.$Message.error(res.content);
            }
          });
        },
        onCancel: () => {},
      });
    },
    //车道导航信息屏列表
    module_data2() {
      this.current = 1;
      let data = this.datas;
      let start = data.start;
      let pageSize = data.pageSize;
      let filterJson = data.filterJson;
      this.loading2 = true;
      Administration_lane_om_screen_lane_list({
        // start,
        // pageSize,
        // filterJson,
        laneId: this.$route.query.id,
      }).then((res) => {
        this.list2 = res;
        this.totals2 = res.total;
        this.loading2 = false;
      });
    },
    //车道相机列表
    module_data3() {
      this.current = 1;
      let data = this.datas;
      let start = data.start;
      let pageSize = data.pageSize;
      let filterJson = data.filterJson;
      this.loading3 = true;
      Administration_lane_om_camera_lane_list({
        // start,
        // pageSize,
        // filterJson,
        laneId: this.$route.query.id,
      }).then((res) => {
        this.list3 = res;
        this.totals3 = res.total;
        this.loading3 = false;
      });
    },
    // 车道相机启用
    camera_open(val) {
      Administration_lane_om_camera_update_flag({
        id: val.id,
        type: 1,
      }).then((res) => {
        if (res.success == true) {
          this.$Message.success(res.content);
        } else {
          this.$Message.error(res.content);
          this.module_data3();
        }
      });
    },
    // 车道相机禁用
    camera_close(val) {
      Administration_lane_om_camera_update_flag({
        id: val.id,
        type: 0,
      }).then((res) => {
        if (res.success == true) {
          this.$Message.success(res.content);
        } else {
          this.$Message.error(res.content);
          this.module_data3();
        }
      });
    },
    //车道相机编辑
    camera_edit(val) {
      this.model3_edit = true;
      this.cameradata.id = val.id;
      this.cameradata.source = 1;
      this.cameradata.cameraCode = val.cameraCode;
      this.cameradata.cameraOnlineStatus = val.cameraOnlineStatus;
      this.cameradata.cameraFlag = val.cameraFlag;
      this.cameradata.mapLabel = val.mapLabel;
      this.cameradata.laneType = val.laneType;
      this.cameradata.screenCode = val.screenCode;
      this.cameradata.remark = val.remark;
      this.cameradata.effectCarType = val.effectCarType;
      let screenCode = "";
      if (val.screenCode) {
        screenCode = val.screenCode;
      } else {
        screenCode = "";
      }
      Administration_lane_om_screen_select({
        screenCode: screenCode,
      }).then((res) => {
        this.screenCodelist = res;
      });
    },
    jump1(value) {
      this.loading1 = true;
      let data = this.datas;
      let start = (value - 1) * data.pageSize;
      let pageSize = data.pageSize;
      let filterJson = data.filterJson;
      Administration_lane_om_stall_list({
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
    jump2(value) {
      this.loading2 = true;
      let data = this.datas;
      let start = (value - 1) * data.pageSize;
      let pageSize = data.pageSize;
      let filterJson = data.filterJson;
      Administration_rent_list({
        start,
        pageSize,
        filterJson,
      }).then((res) => {
        this.totals2 = res.total;
        this.current2 = value;
        this.list2 = res.list;
        this.loading2 = false;
      });
    },
    jump3(value) {
      this.loading3 = true;
      let data = this.datas;
      let start = (value - 1) * data.pageSize;
      let pageSize = data.pageSize;
      let filterJson = data.filterJson;
      Administration_rent_list({
        start,
        pageSize,
        filterJson,
      }).then((res) => {
        this.totals3 = res.total;
        this.current3 = value;
        this.list3 = res.list;
        this.loading3 = false;
      });
    },
    getMockData() {
      let mockData = [];
      this.targetKeys1 = [];
      if (this.val == "1") {
        Administration_lane_om_stall_not_bind({
          preId: this.$route.query.preId,
          floor: this.$route.query.floor,
          areaName: this.areaName ? this.areaName : "",
        }).then((res) => {
          this.modal_data1 = res;
          res.map((res) => {
            mockData.push({
              key: res.stallId,
              label: res.stallName,
              disabled: false,
            });
          });
        });
      } else if (this.val == "2") {
        Administration_lane_om_screen_not_bind({
          preId: this.$route.query.preId,
          floor: this.$route.query.floor,
          areaName: this.add_data.areaName ? this.add_data.areaName : "",
        }).then((res) => {
          this.modal_data1 = res;
          res.map((res) => {
            mockData.push({
              key: res,
              label: res,
              disabled: false,
            });
          });
        });
      } else {
        Administration_lane_om_camera_not_bind({
          preId: this.$route.query.preId,
          floor: this.$route.query.floor,
          areaName: this.add_data.areaName ? this.add_data.areaName : "",
        }).then((res) => {
          this.modal_data1 = res;
          res.map((res) => {
            mockData.push({
              key: res,
              label: res,
              disabled: false,
            });
          });
        });
      }
      this.data1 = mockData;
    },
    render1(item) {
      return item.label;
    },
    render3(item) {
      return item.key;
    },
    handleChange1(newTargetKeys, direction, moveKeys) {
      this.targetKeys1 = newTargetKeys;
    },
    //车道相机弹出框取消
    cancle3() {
      this.model3_edit = false;
    },
    //导航信息屏弹出框取消
    cancle2() {
      this.model2_edit = false;
      this.loading_btn2 = false;
    },
    //车道相机弹出框确定
    module_ok3() {
      this.loading_btn3 = true;
      Administration_lane_om_camera_update(this.cameradata).then((res) => {
        if (res.success == true) {
          this.$Message.success(res.content);
          this.model3_edit = false;
          this.module_data3();
        } else {
          this.$Message.error(res.content);
        }
        this.loading_btn3 = false;
      });
    },
    //导航信息屏弹出框确定
    module_ok2() {
      this.loading_btn2 = true;
      let screendata = "";
      if (!this.cameracode) {
        this.cameracode = [];
      }
      this.cameracode.map((res, index) => {
        screendata += this.cameracode.length == index + 1 ? res : res + ",";
      });
      this.screendata.laneCameraCodes = screendata;
      this.screendata.source = 1;
      Administration_lane_om_screen_update(this.screendata).then((res) => {
        if (res.success == true) {
          this.$Message.success(res.content);
          this.model2_edit = false;
          this.module_data2();
        } else {
          this.$Message.error(res.content);
        }
        this.loading_btn2 = false;
      });
    },
    //自动降锁开启
    autoDownFlag_open(id) {
      Administration_om_auto_down_flag({
        id: id,
        type: 1,
      }).then((res) => {
        if (res.success == true) {
          this.$Message.success(res.content);
        } else {
          this.$Message.error(res.content);
          this.module_data1();
        }
      });
    },
    //自动降锁关闭
    autoDownFlag_close(id) {
      Administration_om_auto_down_flag({
        id: id,
        type: 0,
      }).then((res) => {
        if (res.success == true) {
          this.$Message.success(res.content);
        } else {
          this.$Message.error(res.content);
          this.module_data1();
        }
      });
    },
    //自动升锁开启
    autoUpFlag_open(id) {
      Administration_om_auto_up_flag({
        id: id,
        type: 1,
      }).then((res) => {
        if (res.success == true) {
          this.$Message.success(res.content);
        } else {
          this.$Message.error(res.content);
          this.module_data1();
        }
      });
    },
    //自动升锁关闭
    autoUpFlag_close(id) {
      Administration_om_auto_up_flag({
        id: id,
        type: 0,
      }).then((res) => {
        if (res.success == true) {
          this.$Message.success(res.content);
        } else {
          this.$Message.error(res.content);
          this.module_data1();
        }
      });
    },
    //车位相机自动升锁开启
    lotCameraUpFlag_open(id) {
      Administration_om_camera_up_flag({
        id: id,
        type: 1,
      }).then((res) => {
        if (res.success == true) {
          this.$Message.success(res.content);
        } else {
          this.$Message.error(res.content);
          this.module_data1();
        }
      });
    },
    //车位相机自动升锁关闭
    lotCameraUpFlag_close(id) {
      Administration_om_camera_up_flag({
        id: id,
        type: 0,
      }).then((res) => {
        if (res.success == true) {
          this.$Message.success(res.content);
        } else {
          this.$Message.error(res.content);
          this.module_data1();
        }
      });
    },
    //车位锁感应自动升锁开启
    lockInductionUpFlag_open(id) {
      Administration_om_induction_up_flag({
        id: id,
        type: 1,
      }).then((res) => {
        if (res.success == true) {
          this.$Message.success(res.content);
        } else {
          this.$Message.error(res.content);
          this.module_data1();
        }
      });
    },
    //车位锁感应自动升锁关闭
    lockInductionUpFlag_close(id) {
      Administration_om_induction_up_flag({
        id: id,
        type: 0,
      }).then((res) => {
        if (res.success == true) {
          this.$Message.success(res.content);
        } else {
          this.$Message.error(res.content);
          this.module_data1();
        }
      });
    },
    //导航信息屏 启用
    screenFlag_open(val) {
      Administration_lane_om_screen_update_flag({
        id: val.id,
        type: 1,
      }).then((res) => {
        if (res.success == true) {
          this.$Message.success(res.content);
        } else {
          this.$Message.error(res.content);
          this.module_data2();
        }
      });
    },
    //导航信息屏 禁用
    screenFlag_close(val) {
      Administration_lane_om_screen_update_flag({
        id: val.id,
        type: 0,
      }).then((res) => {
        if (res.success == true) {
          this.$Message.success(res.content);
        } else {
          this.$Message.error(res.content);
          this.module_data2();
        }
      });
    },
    //导航信息屏 编辑
    screen_edit(val) {
      this.screendata.id = val.id;
      this.screendata.remark = val.remark;
      this.cameracode = val.laneCameraInfoCode;
      this.model2_edit = true;
      Administration_lane_om_camera_select({
        screenCode: val.screenCode,
      }).then((res) => {
        this.cameracodelist = res;
      });
    },
  },
};
</script>