<style lang="less" scoped>
.dashboard-console-grid {
  text-align: center;
  .ivu-card-body {
    padding: 0;
  }
  i {
    font-size: 32px;
  }
  a {
    display: block;
    color: inherit;
    padding: 16px;
  }
  p {
    margin-top: 8px;
  }
}
.Navigation {
  color: #f66913;
  font-weight: bold;
}
.user_label {
  display: inline-block;
  width: 90px;
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
  padding-left: 2%;
}
.module_divs3 {
  width: 95%;
  margin-top: 10px;
  display: flex;
  justify-items: center;
  padding-left: 8%;
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
.btn_search {
  margin-left: 3%;
}
.ivu-mb {
  min-width: 160px;
}
.border {
  border: 1px solid #dad4d4ec;
  padding-bottom: 10px;
  margin-top: 5px;
  margin-bottom: 5px;
  width: 100%;
  min-height: 190px;
}
</style>
<template>
  <div class="i-table-no-border">
    <!-- <Button type="info" @click="out" :loading="btn_loading">导出</Button>
    <Button type="success" @click="success">设置全部徽标</Button>
    <Button type="error" @click="error">新增或修改某个菜单的徽标</Button>
    <Button type="warning" @click="warning">删除某个菜单的徽标</Button>-->
    <Row :gutter="24" class="dashboard-console-grid">
      <!-- <Col v-bind="grid" class="ivu-mb">
        <Card :bordered="true">
          <a @click="total">
            <Icon type="md-albums" color="#69c0ff" />
            <p :class="navigation == 0 ? 'Navigation' : ''">全部</p>
          </a>
        </Card>
      </Col> -->
      <Col v-bind="grid" class="ivu-mb">
        <Card :bordered="true">
          <a @click="option1">
            <Icon type="logo-steam" color="#95de64" />
            <p :class="navigation == 1 ? 'Navigation' : ''">闸机</p>
          </a>
        </Card>
      </Col>
      <Col v-bind="grid" class="ivu-mb">
        <Card :bordered="true">
          <a @click="option2">
            <Icon type="md-videocam" color="#ff9c6e" />
            <p :class="navigation == 2 ? 'Navigation' : ''">出入口相机</p>
          </a>
        </Card>
      </Col>
      <Col v-bind="grid" class="ivu-mb">
        <Card :bordered="true">
          <a @click="option3">
            <Icon type="ios-medal" color="#b37feb" />
            <p :class="navigation == 3 ? 'Navigation' : ''">车道相机</p>
          </a>
        </Card>
      </Col>
      <Col v-bind="grid" class="ivu-mb">
        <Card :bordered="true">
          <a @click="option4">
            <Icon type="logo-python" color="#ffd666" />
            <p :class="navigation == 4 ? 'Navigation' : ''">反寻系统</p>
          </a>
        </Card>
      </Col>
      <Col v-bind="grid" class="ivu-mb">
        <Card :bordered="true">
          <a @click="option5">
            <Icon type="ios-easel" color="#5cdbd3" />
            <p :class="navigation == 5 ? 'Navigation' : ''">导航信息屏</p>
          </a>
        </Card>
      </Col>
      <Col v-bind="grid" class="ivu-mb">
        <Card :bordered="true">
          <a @click="option6">
            <Icon type="ios-barcode" color="#ff85c0" />
            <p :class="navigation == 6 ? 'Navigation' : ''">车场诱导屏</p>
          </a>
        </Card>
      </Col>
      <Col v-bind="grid" class="ivu-mb">
        <Card :bordered="true">
          <a @click="option7">
            <Icon type="logo-playstation" color="#ffc069" />
            <!-- <Icon type="md-man" color="#ffc069" /> -->
            <p :class="navigation == 7 ? 'Navigation' : ''">车位锁</p>
          </a>
        </Card>
      </Col>
    </Row>
    <div>
      <Button v-if="button_true" style="width: 99%" @click="add_equipment"
        >+添加设备</Button
      >
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
    </div>
    <!-- 出入口相机弹框 -->
    <Modal
      :title="module_titles"
      v-model="model2"
      :styles="{ top: '20%', width: '45%' }"
      :mask-closable="false"
    >
      <div slot="footer"></div>
      <!-- 相机ID -->
      <div class="module_divs2">
        <label for style="color: red">*</label>
        <label for class="user_label">设备ID</label>:
        <i-input
          v-model="module2_serch_val"
          placeholder="请输入出入口相机ID"
          style="width: 30%; margin-left: 10px"
        ></i-input>
        <Button class="btn_search" type="primary" @click="add_equipment"
          >查询</Button
        >
        <Button class="btn_search" type="primary" @click="module2_add"
          >新增</Button
        >
        <Button class="btn_search" type="primary" @click="back2">返回</Button>
        <Table
          ref="table2"
          :columns="columns2"
          :data="list_module2"
          :loading="loading_module2"
          class="ivu-mt"
        ></Table>
        <div class="ivu-mt ivu-text-center">
          <Page
            :total="totals2"
            show-total
            :current="current2"
            :page-size="5"
            @on-change="jump2"
          />
        </div>
      </div>
    </Modal>

    <!-- 出入口相机新增弹框 -->
    <Modal
      :title="module_title"
      v-model="model2_add"
      :styles="{ top: '20%' }"
      :mask-closable="false"
    >
      <div slot="footer">
        <Button @click="cancle2">取消</Button>
        <Button @click="module_ok2" type="primary" :loading="loading_btn2"
          >确定</Button
        >
      </div>
      <!-- 相机品牌 -->
      <div style="padding-left: 5px">
        <div class="module_divs">
          <label for style="color: red">*</label>
          <label for class="user_label">相机品牌</label>:
          <Select
            v-model="module2_data.factoryId"
            clearable
            style="width: 70%; margin-left: 10px"
          >
            <Option
              v-for="(item, index) in factorylist"
              :value="item.id"
              :key="index"
              >{{ item.name }}</Option
            >
          </Select>
        </div>
        <!-- 相机型号 -->
        <div class="module_divs">
          <label for style="color: white">*</label>
          <label for class="user_label">相机型号</label>:
          <Select
            v-model="module2_data.deviceModel"
            clearable
            style="width: 70%; margin-left: 10px"
          >
            <Option
              v-for="(item, index) in deviceModellist"
              :value="item.id"
              :key="index"
              >{{ item.name }}</Option
            >
          </Select>
        </div>
        <!-- 相机ID -->
        <div class="module_divs">
          <label for style="color: red">*</label>
          <label for class="user_label">相机ID</label>:
          <i-input
            v-if="module_title == '新增出入口相机'"
            v-model="module2_data.cameraCode"
            placeholder="请输入相机ID"
            style="width: 70%; margin-left: 10px"
          ></i-input>
          <span
            style="width: 70%; margin-left: 10px"
            v-else-if="module_title == '编辑出入口相机'"
            >{{ module2_data.cameraCode }}</span
          >
        </div>
        <!-- 运营商 -->
        <div class="module_divs">
          <label for style="color: white">*</label>
          <label for class="user_label">运营商</label>:
          <Select
            v-model="module2_data.operators"
            clearable
            style="width: 70%; margin-left: 10px"
          >
            <Option
              v-for="(item, index) in operatorslist"
              :value="item.name"
              :key="index"
              >{{ item.name }}</Option
            >
          </Select>
        </div>
        <!-- sim卡号 -->
        <div class="module_divs">
          <label for style="color: white">*</label>
          <label for class="user_label">SIM卡号</label>:
          <i-input
            v-model="module2_data.cameraSim"
            placeholder="请输入SIM卡号"
            style="width: 70%; margin-left: 10px"
          ></i-input>
        </div>
        <!-- 车场名称 -->
        <div class="module_divs">
          <label for style="color: white">*</label>
          <label for class="user_label">车场名称</label>:
          <Select
            v-model="module2_data.preId"
            @on-select="module2_data_preId"
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
        </div>

        <!-- 出入口名称 -->
        <div class="module_divs">
          <label for style="color: white">*</label>
          <label for class="user_label">出入口名称</label>:
          <Select
            v-model="module2_data.gateCode"
            clearable
            allow-create
            style="width: 70%; margin-left: 10px"
            :disabled="module2_dis"
          >
            <Option
              v-for="(item, index) in gateCodelist"
              :value="item.gateCode"
              :key="index"
              >{{ item.gateName }}</Option
            >
          </Select>
        </div>

        <!-- 备注 -->
        <div class="module_divs3">
          <label for style="color: white">*</label>
          <label for class="user_label">备注</label>:
          <Input
            v-model="module2_data.remark"
            type="textarea"
            :rows="4"
            placeholder="请输入备注"
            style="width: 70%; margin-left: 15px"
          />
        </div>
      </div>
    </Modal>

    <!-- 车道相机弹框 -->
    <Modal
      :title="module_titles"
      v-model="model3"
      :styles="{ top: '20%', width: '45%' }"
      :mask-closable="false"
    >
      <div slot="footer"></div>
      <!-- 车位锁ID -->
      <div class="module_divs2">
        <label for style="color: red">*</label>
        <label for class="user_label">设备ID</label>:
        <i-input
          v-model="module3_serch_val"
          placeholder="请输入车道相机ID"
          style="width: 30%; margin-left: 10px"
        ></i-input>
        <Button class="btn_search" type="primary" @click="add_equipment"
          >查询</Button
        >
        <Button class="btn_search" type="primary" @click="module3_add"
          >新增</Button
        >
        <Button class="btn_search" type="primary" @click="back3">返回</Button>
        <Table
          ref="table1"
          :columns="columns3"
          :data="list_module3"
          :loading="loading_module3"
          class="ivu-mt"
        ></Table>
        <div class="ivu-mt ivu-text-center">
          <Page
            :total="totals3"
            show-total
            :current="current3"
            :page-size="5"
            @on-change="jump3"
          />
        </div>
      </div>
    </Modal>

    <!-- 车道相机新增弹框 -->
    <Modal
      :title="module_title"
      v-model="model3_add"
      :styles="{ top: '20%' }"
      :mask-closable="false"
    >
      <div slot="footer">
        <Button @click="cancle3">取消</Button>
        <Button @click="module_ok3" type="primary" :loading="loading_btn3"
          >确定</Button
        >
      </div>
      <!-- 相机品牌 -->
      <div style="padding-left: 5px">
        <div class="module_divs">
          <label for style="color: red">*</label>
          <label for class="user_label">相机品牌</label>:
          <Select
            v-model="module3_data.factoryId"
            clearable
            style="width: 70%; margin-left: 10px"
          >
            <Option
              v-for="(item, index) in factorylist"
              :value="item.id"
              :key="index"
              >{{ item.name }}</Option
            >
          </Select>
        </div>
        <!-- 相机型号 -->
        <div class="module_divs">
          <label for style="color: white">*</label>
          <label for class="user_label">相机型号</label>:
          <Select
            v-model="module3_data.deviceModel"
            clearable
            style="width: 70%; margin-left: 10px"
          >
            <Option
              v-for="(item, index) in deviceModellist"
              :value="item.id"
              :key="index"
              >{{ item.name }}</Option
            >
          </Select>
        </div>
        <!-- 相机ID -->
        <div class="module_divs">
          <label for style="color: red">*</label>
          <label for class="user_label">相机ID</label>:
          <i-input
            v-if="module_title == '新增车道相机'"
            v-model="module3_data.cameraCode"
            placeholder="请输入相机ID"
            style="width: 70%; margin-left: 10px"
          ></i-input>
          <span
            style="width: 70%; margin-left: 10px"
            v-else-if="module_title == '编辑车道相机'"
            >{{ module3_data.cameraCode }}</span
          >
        </div>
        <!-- 固件版本 -->
        <div class="module_divs" v-if="module_title == '编辑车道相机'">
          <label for style="color: white">*</label>
          <label for class="user_label">固件版本</label>:
          <span style="width: 70%; margin-left: 10px">{{
            module3_data.firmwareVersion
          }}</span>
        </div>
        <!-- 车场名称 -->
        <div class="module_divs">
          <label for style="color: white">*</label>
          <label for class="user_label">车场名称</label>:
          <Select
            v-if="module_title == '新增车道相机' || edit_true == 3"
            v-model="module3_data.preId"
            @on-select="car3_change"
            @on-clear="car3_clear"
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
          <span
            style="width: 70%; margin-left: 10px"
            v-else-if="module_title == '编辑车道相机' && edit_true != 3"
            >{{ module3_data.parkName }}</span
          >
        </div>

        <!-- 车道编号 -->
        <div class="module_divs">
          <label for style="color: white">*</label>
          <label for class="user_label">车道编号</label>:
          <Select
            v-model="module3_data.laneId"
            clearable
            allow-create
            :disabled="module3_dis"
            style="width: 70%; margin-left: 10px"
          >
            <Option
              v-for="(item, index) in lanelist"
              :value="item.laneId"
              :key="index"
              >{{ item.laneName }}</Option
            >
          </Select>
        </div>

        <!-- 备注 -->
        <div class="module_divs3">
          <label for style="color: white">*</label>
          <label for class="user_label">备注</label>:
          <Input
            v-model="module3_data.remark"
            type="textarea"
            :rows="4"
            placeholder="请输入备注"
            style="width: 70%; margin-left: 15px"
          />
        </div>
      </div>
    </Modal>

    <!--反寻系统弹框 -->
    <Modal
      :title="module_titles"
      v-model="model4"
      :styles="{ top: '20%' }"
      :mask-closable="false"
    >
      <div slot="footer">
        <Button @click="cancle4">取消</Button>
        <Button @click="module_ok4" type="primary" :loading="loading_btn4"
          >确定</Button
        >
      </div>
      <div style="padding-left: 5px">
        <!-- 系统品牌 -->
        <div class="module_divs">
          <label for style="color: red">*</label>
          <label for class="user_label">系统品牌</label>:
          <Select
            v-model="module4_data.factoryId"
            clearable
            style="width: 70%; margin-left: 10px"
          >
            <Option
              v-for="item in factoryIdList"
              :value="item.id"
              :key="item.name"
              >{{ item.name }}</Option
            >
          </Select>
        </div>
        <!-- 系统型号 -->
        <div class="module_divs">
          <label for style="color: white">*</label>
          <label for class="user_label">系统型号</label>:
          <i-input
            v-model="module4_data.systemModel"
            placeholder="请输入系统型号"
            style="width: 70%; margin-left: 10px"
          ></i-input>
        </div>
        <!-- 接入模式 -->
        <div class="module_divs">
          <label for style="color: red">*</label>
          <label for class="user_label">接入模式</label>:
          <Select
            v-model="module4_data.accessMode"
            clearable
            style="width: 70%; margin-left: 10px"
          >
            <Option
              v-for="item in accessModeList"
              :value="item.id"
              :key="item.id"
              >{{ item.name }}</Option
            >
          </Select>
        </div>
        <!-- 协议 -->
        <div class="border">
          <!-- 协议 -->
          <div class="module_divs">
            <label for style="color: red">*</label>
            <label for class="user_label">协议</label>:
            <Select
              v-model="module4_data.agreement"
              clearable
              allow-create
              style="width: 70%; margin-left: 10px"
            >
              <Option
                v-for="(item, index) in agreementList"
                :value="item.id"
                :key="index"
                >{{ item.name }}</Option
              >
            </Select>
          </div>
          <!-- 接口地址 -->
          <div class="module_divs">
            <label for style="color: white">*</label>
            <label for class="user_label">接口地址</label>:
            <i-input
              v-model="module4_data.interfaceAddress"
              placeholder="请输入接口地址"
              style="width: 70%; margin-left: 10px"
            ></i-input>
          </div>

          <!-- user -->
          <div class="module_divs">
            <label for style="color: white">*</label>
            <label for class="user_label">user</label>:
            <i-input
              v-model="module4_data.user"
              placeholder="请输入user"
              style="width: 70%; margin-left: 10px"
            ></i-input>
          </div>

          <!-- sign -->
          <div class="module_divs">
            <label for style="color: white">*</label>
            <label for class="user_label">sign</label>:
            <i-input
              v-model="module4_data.sign"
              placeholder="请输入sign"
              style="width: 70%; margin-left: 10px"
            ></i-input>
          </div>
        </div>

        <!-- 车场名称 -->
        <div class="module_divs">
          <label for style="color: red">*</label>
          <label for class="user_label">车场名称</label>:
          <Select
            v-model="module4_data.preId"
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
        </div>

        <!-- 备注 -->
        <div class="module_divs3">
          <label for style="color: white">*</label>
          <label for class="user_label">备注</label>:
          <Input
            v-model="module4_data.remark"
            type="textarea"
            :rows="4"
            placeholder="请输入备注"
            style="width: 70%; margin-left: 15px"
          />
        </div>
      </div>
    </Modal>

    <!-- 导航信息屏弹框 -->
    <Modal
      :title="module_titles"
      v-model="model5"
      :styles="{ top: '20%', width: '45%' }"
      :mask-closable="false"
    >
      <div slot="footer"></div>
      <!-- 车位锁ID -->
      <div class="module_divs2">
        <label for style="color: red">*</label>
        <label for class="user_label">设备ID</label>:
        <i-input
          v-model="module5_serch_val"
          placeholder="导航信息屏ID"
          style="width: 30%; margin-left: 10px"
        ></i-input>
        <Button class="btn_search" type="primary" @click="add_equipment"
          >查询</Button
        >
        <Button class="btn_search" type="primary" @click="module5_add"
          >新增</Button
        >
        <Button class="btn_search" type="primary" @click="back5">返回</Button>
        <Table
          ref="table1"
          :columns="columns5"
          :data="list_module5"
          :loading="loading_module5"
          class="ivu-mt"
        ></Table>
        <div class="ivu-mt ivu-text-center">
          <Page
            :total="totals5"
            show-total
            :current="current5"
            :page-size="5"
            @on-change="jump5"
          />
        </div>
      </div>
    </Modal>
    <!-- 导航信息屏新增弹框 -->
    <Modal
      :title="module_title"
      v-model="model5_add"
      :styles="{ top: '20%' }"
      :mask-closable="false"
    >
      <div slot="footer">
        <Button @click="cancle5">取消</Button>
        <Button @click="module_ok5" type="primary" :loading="loading_btn5"
          >确定</Button
        >
      </div>
      <div style="padding-left: 5px">
        <!-- 信息屏品牌 -->
        <div class="module_divs">
          <label for style="color: red">*</label>
          <label for class="user_label">信息屏品牌</label>:
          <Select
            v-model="module5_data.factoryId"
            clearable
            style="width: 70%; margin-left: 10px"
          >
            <Option
              v-for="(item, index) in scssfactorylist"
              :value="item.id"
              :key="index"
              >{{ item.name }}</Option
            >
          </Select>
        </div>
        <!-- 设备ID -->
        <div class="module_divs">
          <label for style="color: red">*</label>
          <label for class="user_label">设备ID</label>:
          <i-input
            v-if="module_title == '新增导航信息屏'"
            v-model="module5_data.screenCode"
            placeholder="请输入相机ID"
            style="width: 70%; margin-left: 10px"
          ></i-input>
          <span
            style="width: 70%; margin-left: 10px"
            v-else-if="module_title == '编辑导航信息屏'"
            >{{ module5_data.screenCode }}</span
          >
        </div>

        <!-- 显示尺寸 -->
        <div class="module_divs">
          <label for style="color: white">*</label>
          <label for class="user_label">显示尺寸</label>:
          <i-input
            v-model="module5_data.displaySize"
            placeholder="请输入显示尺寸"
            style="width: 70%; margin-left: 10px"
          ></i-input>
        </div>
        <!-- 分辨率 -->
        <div class="module_divs">
          <label for style="color: white">*</label>
          <label for class="user_label">分辨率</label>:
          <i-input
            v-model="module5_data.resolutionRatio"
            placeholder="请输入分辨率"
            style="width: 70%; margin-left: 10px"
          ></i-input>
        </div>

        <!-- 固件版本 -->
        <div class="module_divs" v-if="module_title == '编辑导航信息屏'">
          <label for style="color: white">*</label>
          <label for class="user_label">固件版本</label>:
          <span style="width: 70%; margin-left: 10px">{{
            module5_data.firmwareVersion
          }}</span>
        </div>
        <Divider />
        <!-- 车场名称 -->
        <div class="module_divs">
          <label for style="color: white">*</label>
          <label for class="user_label">车场名称</label>:
          <Select
            v-model="module5_data.preId"
            clearable
            filterable
            @on-select="car5_change"
            @on-clear="car5_clear"
            style="width: 70%; margin-left: 10px"
          >
            <Option
              v-for="(item, index) in preIdlist"
              :value="item.id"
              :key="index"
              >{{ item.name }}</Option
            >
          </Select>
          <!-- <span
            style="width: 70%; margin-left: 10px"
            v-else-if="module_title == '编辑导航信息屏'"
            >{{ parkName }}</span
          > -->
        </div>

        <!-- 车道编号 -->
        <div class="module_divs">
          <label for style="color: white">*</label>
          <label for class="user_label">车道编号</label>:
          <Select
            v-model="module5_data.laneId"
            clearable
            :disabled="module5_dis"
            style="width: 70%; margin-left: 10px"
          >
            <Option
              v-for="(item, index) in lanelist"
              :value="item.laneId"
              :key="index"
              >{{ item.laneName }}</Option
            >
          </Select>
        </div>

        <!-- 位置 -->
        <div class="module_divs">
          <label for style="color: white">*</label>
          <label for class="user_label">位置</label>:
          <Select
            v-model="module5_data.location"
            clearable
            style="width: 70%; margin-left: 10px"
          >
            <Option
              v-for="(item, index) in locationlist"
              :value="item.id"
              :key="index"
              >{{ item.name }}</Option
            >
          </Select>
        </div>

        <!-- 模板功能组 -->
        <div class="module_divs">
          <label for style="color: white">*</label>
          <label for class="user_label">模板功能组</label>:
          <Select
            v-model="module5_data.groupCode"
            clearable
            style="width: 70%; margin-left: 10px"
          >
            <Option
              v-for="(item, index) in scssModellist"
              :value="item.groupCode"
              :key="index"
              >{{ item.groupName }}</Option
            >
          </Select>
        </div>

        <!-- 备注 -->
        <div class="module_divs3">
          <label for style="color: white">*</label>
          <label for class="user_label">备注</label>:
          <Input
            v-model="module5_data.remark"
            type="textarea"
            :rows="4"
            placeholder="请输入备注"
            style="width: 70%; margin-left: 15px"
          />
        </div>
      </div>
    </Modal>

    <!-- 车场诱导屏弹框 -->
    <Modal
      :title="module_titles"
      v-model="model6"
      :styles="{ top: '20%', width: '45%' }"
      :mask-closable="false"
    >
      <div slot="footer"></div>
      <!-- 车位锁ID -->
      <div class="module_divs2">
        <label for style="color: red">*</label>
        <label for class="user_label">设备ID</label>:
        <i-input
          v-model="module6_serch_val"
          placeholder="车场诱导屏ID"
          style="width: 30%; margin-left: 10px"
        ></i-input>
        <Button class="btn_search" type="primary" @click="add_equipment"
          >查询</Button
        >
        <Button class="btn_search" type="primary" @click="module6_add"
          >新增</Button
        >
        <Button class="btn_search" type="primary" @click="back6">返回</Button>
        <Table
          ref="table1"
          :columns="columns6"
          :data="list_module6"
          :loading="loading_module6"
          class="ivu-mt"
        ></Table>
        <div class="ivu-mt ivu-text-center">
          <Page
            :total="totals6"
            show-total
            :current="current6"
            :page-size="5"
            @on-change="jump6"
          />
        </div>
      </div>
    </Modal>
    <!--新增车场诱导屏弹框 -->
    <Modal
      :title="module_titles"
      v-model="model6_add"
      :styles="{ top: '20%' }"
      :mask-closable="false"
    >
      <div slot="footer">
        <Button @click="cancle6">取消</Button>
        <Button @click="module_ok6" type="primary" :loading="loading_btn6"
          >确定</Button
        >
      </div>
      <div style="padding-left: 5px">
        <!-- 品牌 -->
        <div class="module_divs">
          <label for style="color: red">*</label>
          <label for class="user_label">品牌</label>:
          <Select
            v-model="module6_data.factoryId"
            clearable
            style="width: 70%; margin-left: 10px"
          >
            <Option
              v-for="item in factoryIdList"
              :value="item.id"
              :key="item.name"
              >{{ item.name }}</Option
            >
          </Select>
        </div>
        <!-- 设备ID -->
        <div class="module_divs">
          <label for style="color: red">*</label>
          <label for class="user_label">设备ID</label>:
          <span
            v-if="module_titles == '编辑车场诱导屏'"
            style="margin-left: 10px"
            >{{ module6_data.screenCode }}</span
          >
          <i-input
            v-else-if="module_titles == '新增车场诱导屏'"
            v-model="module6_data.screenCode"
            placeholder="请输入设备ID"
            style="width: 70%; margin-left: 10px"
          ></i-input>
        </div>
        <!-- 运营商 -->
        <div class="module_divs">
          <label for style="color: white">*</label>
          <label for class="user_label">运营商</label>:
          <Select
            v-model="module6_data.operators"
            clearable
            style="width: 70%; margin-left: 10px"
          >
            <Option
              v-for="(item, index) in operators_data"
              :value="item.name"
              :key="index"
              >{{ item.name }}</Option
            >
          </Select>
        </div>
        <!-- SIM卡号 -->
        <div class="module_divs">
          <label for style="color: white">*</label>
          <label for class="user_label">SIM卡号</label>:
          <i-input
            v-model="module6_data.screenSim"
            placeholder="请输入SIM卡号"
            style="width: 70%; margin-left: 10px"
          ></i-input>
        </div>
        <!-- 车场名称 -->
        <div class="module_divs">
          <label for style="color: red">*</label>
          <label for class="user_label">车场名称</label>:
          <Select
            v-model="module6_data.preId"
            clearable
            filterable
            @on-select="car6_change"
            @on-clear="car6_clear"
            style="width: 70%; margin-left: 10px"
          >
            <Option
              v-for="(item, index) in preIdlist"
              :value="item.id"
              :key="index"
              >{{ item.name }}</Option
            >
          </Select>
        </div>
        <!-- 显示内容 -->
        <div class="module_divs">
          <label for style="color: red">*</label>
          <label for class="user_label">显示内容</label>:
          <Select
            v-model="module6_data.parkFloorIdList"
            :disabled="module6_dis"
            clearable
            multiple
            style="width: 70%; margin-left: 10px"
          >
            <Option
              v-for="item in contentList"
              :value="item.id"
              :key="item.id"
              >{{ item.floor }}</Option
            >
          </Select>
        </div>
        <!-- 诱导屏分辨率 -->
        <div class="module_divs">
          <label for style="color: red">*</label>
          <label for class="user_label">诱导屏分辨率</label>:
          <Select
            v-model="module6_data.screenPixel"
            clearable
            style="width: 70%; margin-left: 10px"
          >
            <Option
              v-for="item in screenPixellist"
              :value="item.name"
              :key="item.id"
              >{{ item.name }}</Option
            >
          </Select>
        </div>

        <!-- 备注 -->
        <div class="module_divs3">
          <label for style="color: white">*</label>
          <label for class="user_label">备注</label>:
          <Input
            v-model="module6_data.remark"
            type="textarea"
            :rows="4"
            placeholder="请输入备注"
            style="width: 70%; margin-left: 15px"
          />
        </div>
      </div>
    </Modal>

    <!-- 车位锁弹框 -->
    <Modal
      :title="module_titles"
      v-model="model7"
      :styles="{ top: '20%' }"
      :mask-closable="false"
      @on-ok="click_module"
      @on-cancel="cancle"
      loading
    >
      <!-- 车位锁ID -->
      <div class="module_divs">
        <label for style="color: red">*</label>
        <label for class="user_label">车位锁ID</label>:
        <i-input
          v-model="model8"
          placeholder="请输入车位锁ID"
          style="width: 70%; margin-left: 10px"
        ></i-input>
      </div>
      <!-- 车场名称 -->
      <div class="module_divs">
        <label for style="color: white">*</label>
        <label for class="user_label">车场名称</label>:
        <Select
          v-model="model8"
          clearable
          filterable
          style="width: 70%; margin-left: 10px"
        >
          <Option
            v-for="item in cityList"
            :value="item.value"
            :key="item.value"
            >{{ item.label }}</Option
          >
        </Select>
      </div>
      <!-- 车位号 -->
      <div class="module_divs">
        <label for style="color: white">*</label>
        <label for class="user_label">车位号</label>:
        <Select
          v-model="model9"
          clearable
          multiple
          style="width: 70%; margin-left: 10px"
        >
          <Option
            v-for="item in cityList"
            :value="item.value"
            :key="item.value"
            >{{ item.label }}</Option
          >
        </Select>
      </div>

      <!-- 备注 -->
      <div class="module_divs3">
        <label for style="color: white">*</label>
        <label for class="user_label">备注</label>:
        <Input
          v-model="value6"
          type="textarea"
          :rows="4"
          placeholder="请输入备注"
          style="width: 70%; margin-left: 15px"
        />
      </div>
    </Modal>
  </div>
</template>
<script>
import random from "@/libs/random_str";
import {
  //车场下拉框列表
  Administration_selectList,
  //出入口选择框
  Administration_gate_list,
  //出入口相机列表
  Administration_camera_list,
  //出入口相机-启用禁用标识
  Administration_camera_update_flag,
  //出入口相机-新增
  Administration_camera_save,
  //出入口相机-编辑
  Administration_camera_info_update,
  //出入口相机-未绑定列表中删除
  Administration_camera_info_unbind_delete,
  //出入口相机-已绑定列表中删除
  Administration_camera_info_bind_delete,

  //车道相机-列表
  Administration_camera_info_list,
  //解除车道相机绑定
  Administration_lane_om_camera_unbind,
  //车道相机启用、禁用
  Administration_lane_om_camera_update_flag,
  // 未绑定车道相机列表中删除
  Administration_camera_info_delete,
  //车道相机新增
  Administration_camera_info_save,
  //车道相机编辑
  Administration_lane_om_camera_update,
  //车道选择框
  Administration_om_select,

  //车道导航信息屏-列表
  Administration_screen_info_list,
  //车道导航信息屏-新增
  Administration_screen_info_save,
  //车道导航信息屏-未绑定删除
  Administration_screen_info_delete,
  //更新车道导航信息屏
  Administration_lane_om_screen_update,
  //解除车道导航信息屏的绑定
  Administration_lane_om_screen_unbind,
  //车道导航信息屏-启用、禁用
  Administration_lane_om_screen_update_flag,
  //反寻系统列表
  Administration_reverse_list,
  //新增反寻系统
  Administration_reverse_save,
  // 删除反寻系统
  Administration_reverse_delete,
  //反寻系统开启-关闭
  Administration_reverse_system_update_flagt,
  //信息屏模板-模板功能组下拉列表
  Administration_group_info_select_list,

  //车场诱导屏列表
  Administration_admin_biz_screen_info_om_list,
  //车场诱导屏新增
  Administration_admin_biz_screen_info_om_save,
  //车场诱导屏编辑
  Administration_admin_biz_screen_info_om_update,
  //车场诱导屏删除（已绑定）
  Administration_admin_biz_screen_info_om_clear_screen_info,
  //车场诱导屏删除（未绑定）
  Administration_admin_biz_screen_info_om_delete_screen_info,
  //车场诱导屏关闭-开启
  Administration_admin_biz_screen_info_om_update_flag,
  //楼层下拉列表
  Administration_admin_biz_park_floor_om_list,
  //设备管理-车场诱导屏分辨率下拉框
  Administration_admin_base_dict_group_list,
} from "@/api/Administration";
import time from "@/api/time";

export default {
  data() {
    return {
      contentList: [],
      screenPixellist: [],
      operators_data: [
        {
          name: "联通",
        },
        {
          name: "移动",
        },
        {
          name: "电信",
        },
      ],
      module2_disselect: false,
      edit_true: 1,
      parkName: "",
      lanelist: "",
      module2_serch_val: "",
      module3_serch_val: "",
      module5_serch_val: "",
      module6_serch_val: "",
      module2_dis: true,
      module3_dis: true,
      module5_dis: true,
      module6_dis: true,
      module2_data: {},
      module3_data: {},
      module4_data: {},
      module5_data: {},
      module6_data: {},
      agreementList: [
        {
          id: "subin",
          name: "subin",
        },
        {
          id: "huaxia",
          name: "huaxia",
        },
        {
          id: "ehome5.0",
          name: "ehome5.0",
        },
      ],
      accessModeList: [
        {
          id: "0",
          name: "主动",
        },
        {
          id: "1",
          name: "被动",
        },
      ],
      factoryIdList: [
        {
          id: 101,
          name: "华夏",
        },
        {
          id: 102,
          name: "臻识",
        },
        {
          id: 103,
          name: "捷顺",
        },
        {
          id: 104,
          name: "海康",
        },
      ],
      factorylist: [
        {
          id: 101,
          name: "华夏",
        },
        {
          id: 102,
          name: "臻识",
        },
        {
          id: 103,
          name: "捷顺",
        },
        {
          id: 104,
          name: "海康",
        },
      ],
      deviceModellist: [
        {
          id: "7147",
          name: "7147",
        },
        {
          id: "7148",
          name: "7148",
        },
      ],
      scssModellist: [],
      locationlist: [
        {
          id: "上方",
          name: "上方",
        },
        {
          id: "下方",
          name: "下方",
        },
        {
          id: "中间",
          name: "中间",
        },
        {
          id: "左侧",
          name: "左侧",
        },
        {
          id: "右侧",
          name: "右侧",
        },
      ],
      scssfactorylist: [
        {
          id: 101,
          name: "优色",
        },
        {
          id: 102,
          name: "海康",
        },
      ],
      operatorslist: [
        {
          name: "移动",
        },
        {
          name: "联通",
        },
        {
          name: "电信",
        },
      ],
      preIdlist: [],
      gateCodelist: [],
      loading_btn2: false,
      value6: "",
      module_title: "",
      module_titles: "",
      model1: false,
      model2: false,
      model2_add: false,
      model3_add: false,
      model5_add: false,
      model6_add: false,
      model3: false,
      model4: false,
      model5: false,
      model6: false,
      model7: false,
      loading_btn3: false,
      loading_btn4: false,
      loading_btn5: false,
      loading_btn6: false,
      model8: "",
      model9: [],
      navigation: "1",
      cityList: [
        {
          value: "New York",
          label: "New York",
        },
        {
          value: "London",
          label: "London",
        },
        {
          value: "Sydney",
          label: "Sydney",
        },
        {
          value: "Ottawa",
          label: "Ottawa",
        },
        {
          value: "Paris",
          label: "Paris",
        },
        {
          value: "Canberra",
          label: "Canberra",
        },
      ],
      grid: {
        xl: 3,
        lg: 3,
        md: 3,
        sm: 3,
        xs: 3,
      },
      btn_loading: false,
      totals: 10,
      totals2: 5,
      totals3: 5,
      totals5: 5,
      totals6: 5,
      data: "",
      module_ellipsis: [],
      columns: [],
      columns2: [
        {
          title: "设备ID",
          align: "center",
          key: "cameraCode",
          minWidth: 140,
        },

        {
          title: "状态",
          key: "cameraFlag",
          align: "center",
          minWidth: 80,
          render: (h, params) => {
            let parkingState = params.row.cameraOnlineStatus;
            return h(
              "span",
              parkingState == 0 ? "离线" : parkingState == 1 ? "在线" : ""
            );
          },
        },
        {
          title: "运营商",
          align: "center",
          key: "operators",
          minWidth: 90,
        },
        {
          title: "厂商",
          align: "center",
          key: "factoryId",
          ellipsis: "true",
          minWidth: 80,
          render: (h, params) => {
            let parkingState = params.row.factoryId;
            return h(
              "span",
              parkingState == 101
                ? "华夏"
                : parkingState == 102
                ? "臻识"
                : parkingState == 103
                ? "捷顺"
                : parkingState == 104
                ? "海康"
                : ""
            );
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
                      this.option2_flag_open(parking);
                    } else {
                      this.option2_flag_close(parking);
                    }
                  },
                },
              }),
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
                      this.module2_edit(parking);
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
                      this.module2_unbind_delete(parking);
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
      columns3: [
        {
          title: "设备ID",
          align: "center",
          //   sortable: 'custom',
          key: "cameraCode",
          minWidth: 100,
        },
        {
          title: "状态",
          key: "cameraFlag",
          align: "center",
          minWidth: 120,
          render: (h, params) => {
            let parkingState = params.row.cameraOnlineStatus;
            return h(
              "span",
              parkingState == 0 ? "离线" : parkingState == 1 ? "在线" : ""
            );
          },
        },
        {
          title: "厂商",
          align: "center",
          key: "factoryId",
          ellipsis: "true",
          minWidth: 150,
          render: (h, params) => {
            let parkingState = params.row.factoryId;
            return h(
              "span",
              parkingState == 101
                ? "华夏"
                : parkingState == 102
                ? "臻识"
                : parkingState == 103
                ? "捷顺"
                : parkingState == 104
                ? "海康"
                : ""
            );
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
                    let params = {
                      fixedId: parking.fixedId,
                      stallId: parking.stallId,
                    };
                    if (state) {
                      this.option3_flag_open(parking);
                    } else {
                      this.option3_flag_close(parking);
                    }
                  },
                },
              }),
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
                      this.module3_edit(parking);
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
                      this.module3_unbind_delete(parking);
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
      columns5: [
        {
          title: "设备ID",
          align: "center",
          key: "screenCode",
          minWidth: 140,
        },

        {
          title: "状态",
          key: "cameraFlag",
          align: "center",
          minWidth: 80,
          render: (h, params) => {
            let parkingState = params.row.cameraFlag;
            return h(
              "span",
              parkingState == 0 ? "离线" : parkingState == 1 ? "在线" : ""
            );
          },
        },
        {
          title: "设备厂家",
          align: "center",
          key: "factoryId",
          ellipsis: "true",
          minWidth: 100,
          render: (h, params) => {
            let parkingState = params.row.factoryId;
            return h(
              "span",
              parkingState == 101
                ? "优色"
                : parkingState == 102
                ? "海康"
                : parkingState == 103
                ? "捷顺"
                : parkingState == 104
                ? "海康"
                : ""
            );
          },
        },
        {
          title: "分辨率",
          align: "center",
          key: "resolutionRatio",
          minWidth: 140,
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
                "span",
                {
                  style: {
                    size: 26,
                    cursor: "pointer",
                    marginRight: "5px",
                  },
                  on: {
                    click: () => {
                      this.module5_edit(parking);
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
                      this.module5_unbind_delete(parking);
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
      columns6: [
        {
          title: "设备ID",
          align: "center",
          key: "screenCode",
          minWidth: 140,
        },

        {
          title: "状态",
          key: "screenOnlineStatus",
          align: "center",
          minWidth: 80,
          render: (h, params) => {
            let parkingState = params.row.screenOnlineStatus;
            return h(
              "span",
              parkingState == 0 ? "离线" : parkingState == 1 ? "在线" : ""
            );
          },
        },
        {
          title: "设备厂家",
          align: "center",
          key: "factoryId",
          ellipsis: "true",
          minWidth: 100,
          render: (h, params) => {
            let parkingState = params.row.factoryId;
            return h(
              "span",
              parkingState == 101
                ? "华夏"
                : parkingState == 102
                ? "臻识"
                : parkingState == 103
                ? "捷顺"
                : parkingState == 104
                ? "海康"
                : ""
            );
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
                "span",
                {
                  style: {
                    size: 26,
                    cursor: "pointer",
                    marginRight: "5px",
                  },
                  on: {
                    click: () => {
                      this.module6_edit(parking);
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
                      this.module6_unbind_delete(parking);
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
      loading_module2: false,
      loading_module3: false,
      loading_module5: false,
      loading_module6: false,
      list: [],
      list_module2: [],
      list_module3: [],
      list_module5: [],
      list_module6: [],
      current: 1,
      current2: 1,
      current3: 1,
      current5: 1,
      current6: 1,
      size: 10,
      datas: {
        start: 0,
        pageSize: 10,
        filterJson: {
          filters: [
            {
              property: "bind",
              value: 1,
            },
          ],
        },
      },
      datas1: {
        start: 0,
        pageSize: 5,
        filterJson: {
          filters: [
            {
              property: "bind",
              value: 0,
            },
          ],
        },
      },
      button_true: false,
    };
  },
  created() {
    // this.lists_module();
    this.option1();
  },
  watch: {
    "module2_data.preId"(val, oldval) {
      if (val) {
        Administration_gate_list({
          preId: val,
        }).then((res) => {
          this.gateCodelist = res;
          this.module2_dis = false;
        });
      } else {
        this.module2_dis = true;
        this.module2_data.gateCode = "";
      }
      // if (this.module2_disselect == true) {
      //     Administration_gate_list({
      //     preId: val,
      //   }).then((res) => {
      //     this.gateCodelist = res;
      //     this.module2_dis = false;
      //   });
      // } else {
      //   this.module2_dis = true;
      //   this.module2_data.gateCode = "";
      // }
    },
    "module3_data.preId"(val, oldval) {
      if (val) {
        Administration_om_select({
          preId: val,
          floor: "",
        }).then((res) => {
          this.lanelist = res;
          this.module3_dis = false;
        });
      } else {
        this.module3_dis = true;
        this.module3_data.laneId = "";
      }
    },
    "module5_data.preId"(val, oldval) {
      if (val) {
        Administration_om_select({
          preId: val,
          floor: "",
        }).then((res) => {
          this.lanelist = res;
          this.module5_dis = false;
        });
      } else {
        this.module5_dis = true;
        this.module5_data.laneId = "";
      }
    },
  },
  methods: {
    car3_change(e) {
      Administration_om_select({
        preId: e.value,
        floor: "",
      }).then((res) => {
        this.lanelist = res;
        this.module3_dis = false;
      });
    },
    car3_clear() {
      this.lanelist = [];
      this.module3_data.laneId = "";
      this.module3_dis = true;
    },
    car5_change(e) {
      Administration_om_select({
        preId: e.value,
        floor: "",
      }).then((res) => {
        this.lanelist = res;
        this.module5_dis = false;
      });
    },
    car5_clear() {
      this.lanelist = [];
      this.module5_data.laneId = " ";
      this.module5_dis = true;
    },
    car6_change(e) {
      Administration_admin_biz_park_floor_om_list({
        preId: e.value,
      }).then((res) => {
        this.contentList = res;
        this.module6_dis = false;
      });
    },
    car6_clear() {
      this.module6_data.content = "";
      this.module6_dis = true;
    },
    // total() {
    //   this.button_true = false;
    //   this.navigation = 0;
    //   this.columns = [
    //     {
    //       title: "车场名称",
    //       align: "center",
    //       key: "stallName",
    //       minWidth: 110,
    //     },
    //     {
    //       title: "楼层",
    //       align: "center",
    //       key: "floor",
    //       minWidth: 100,
    //     },
    //     {
    //       title: "分区",
    //       align: "center",
    //       key: "areaName",
    //       minWidth: 100,
    //     },

    //     {
    //       title: "设备类别",
    //       align: "center",
    //       key: "type",
    //       minWidth: 80,
    //       render: (h, params) => {
    //         let type = params.row.type;
    //         return h("div", type == 2 ? "固定" : type == 0 ? "时租" : "");
    //       },
    //     },

    //     {
    //       title: "设备厂家",
    //       align: "center",
    //       key: "company",
    //       ellipsis: "true",
    //       minWidth: 150,
    //     },

    //     {
    //       title: "设备ID",
    //       align: "center",
    //       key: "plateNumber",
    //       minWidth: 130,
    //     },
    //     {
    //       title: "设备状态",
    //       key: "parkingState",
    //       align: "center",
    //       minWidth: 120,
    //       render: (h, params) => {
    //         let parkingState = params.row.parkingState;
    //         return h(
    //           "span",
    //           parkingState == 0 ? "无车" : parkingState == 1 ? "有车" : ""
    //         );
    //       },
    //     },
    //     {
    //       title: "备注",
    //       align: "center",
    //       key: "account",
    //       minWidth: 115,
    //     },
    //   ];
    // },
    option1() {
      this.navigation = 1;
      this.button_true = true;
      this.list = [];
      this.totals = 0;
      this.columns = [
        {
          title: "分区",
          align: "center",
          //   sortable: 'custom',
          key: "areaName",
          minWidth: 100,
        },

        {
          title: "设备类别",
          align: "center",
          //   sortable: 'custom',
          key: "type",
          minWidth: 80,
          render: (h, params) => {
            let type = params.row.type;
            return h("div", type == 2 ? "固定" : type == 0 ? "时租" : "");
          },
        },

        {
          title: "设备厂家",
          align: "center",
          //   sortable: 'custom',
          key: "company",
          ellipsis: "true",
          minWidth: 150,
        },

        {
          title: "设备ID",
          align: "center",
          //   sortable: 'custom',
          key: "plateNumber",
          minWidth: 130,
        },
        {
          title: "设备状态",
          //   sortable: 'custom',
          key: "parkingState",
          align: "center",
          minWidth: 120,
          render: (h, params) => {
            let parkingState = params.row.parkingState;
            return h(
              "span",
              parkingState == 0 ? "无车" : parkingState == 1 ? "有车" : ""
            );
          },
        },
        {
          title: "备注",
          align: "center",
          //   sortable: 'custom',
          key: "account",
          minWidth: 115,
        },
      ];
    },
    option2() {
      this.button_true = true;
      this.navigation = 2;
      this.list = [];
      this.totals = 0;
      this.columns = [
        {
          title: "车场名称",
          align: "center",
          key: "parkName",
          minWidth: 110,
        },
        {
          title: "类型",
          align: "center",
          key: "cameraType",
          minWidth: 100,
          render: (h, params) => {
            let parkingState = params.row.cameraType;
            return h(
              "span",
              parkingState == 1
                ? "入口"
                : parkingState == 2
                ? "出口"
                : parkingState == 3
                ? "复合"
                : ""
            );
          },
        },
        {
          title: "出入口名称",
          align: "center",
          key: "gateName",
          minWidth: 110,
        },

        {
          title: "序号",
          align: "center",
          key: "type",
          minWidth: 80,
          render: (h, params) => {
            let type = params.row.sortNumber;
            return h("div", type);
          },
        },

        {
          title: "设备厂家",
          align: "center",
          key: "factoryId",
          ellipsis: "true",
          minWidth: 150,
          render: (h, params) => {
            let parkingState = params.row.factoryId;
            return h(
              "span",
              parkingState == 101
                ? "华夏"
                : parkingState == 102
                ? "臻识"
                : parkingState == 103
                ? "捷顺"
                : parkingState == 104
                ? "海康"
                : ""
            );
          },
        },

        {
          title: "设备ID",
          align: "center",
          key: "cameraCode",
          minWidth: 130,
        },
        {
          title: "设备状态",
          key: "cameraFlag",
          align: "center",
          minWidth: 120,
          render: (h, params) => {
            let parkingState = params.row.cameraOnlineStatus;
            return h(
              "span",
              parkingState == 0 ? "离线" : parkingState == 1 ? "在线" : ""
            );
          },
        },
        {
          title: "备注",
          align: "center",
          key: "remark",
          minWidth: 115,
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
                      this.option2_flag_open(parking);
                    } else {
                      this.option2_flag_close(parking);
                    }
                  },
                },
              }),
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
                      this.module2_edit(parking);
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
                      this.module2_bind_delete(parking);
                    },
                  },
                },
                "删除"
              ),
            ]);
            return menu;
          },
        },
      ];
      let data = this.datas;
      let start = data.start;
      let pageSize = data.pageSize;
      let filterJson = {
        filters: [{ property: "bind", value: "1" }],
      };
      this.current = 1;
      this.loading = true;
      Administration_camera_list({
        start,
        pageSize,
        filterJson,
      }).then((res) => {
        this.totals = res.total;
        this.list = res.list;
        this.loading = false;
      });
    },
    option3() {
      this.list = [];
      this.totals = 0;
      this.button_true = true;
      this.navigation = 3;
      this.columns = [
        {
          title: "车场名称",
          align: "center",
          key: "parkName",
          minWidth: 180,
        },
        {
          title: "楼层",
          align: "center",
          key: "floor",
          minWidth: 100,
        },
        {
          title: "分区",
          align: "center",
          key: "areaName",
          minWidth: 110,
        },

        {
          title: "车道",
          align: "center",
          key: "type",
          minWidth: 100,
          render: (h, params) => {
            let type = params.row.laneName;
            return h("div", type);
          },
        },
        {
          title: "下行方向",
          align: "center",
          key: "laneType",
          minWidth: 100,
          render: (h, params) => {
            let type = params.row.laneType;
            return h(
              "div",
              type == 1
                ? "进入车道"
                : type == 2
                ? "离开车道"
                : type == 3
                ? "进出车道"
                : type == 4
                ? "未知"
                : ""
            );
          },
        },

        {
          title: "设备厂家",
          align: "center",
          key: "factoryId",
          ellipsis: "true",
          minWidth: 150,
          render: (h, params) => {
            let type = params.row.factoryId;
            return h(
              "div",
              type == 101
                ? "华夏"
                : type == 102
                ? "臻识"
                : type == 103
                ? "捷顺"
                : type == 104
                ? "海康"
                : ""
            );
          },
        },

        {
          title: "设备ID",
          align: "center",
          key: "cameraCode",
          minWidth: 130,
        },
        {
          title: "状态",
          key: "cameraOnlineStatus",
          align: "center",
          minWidth: 120,
          render: (h, params) => {
            let cameraOnlineStatus = params.row.cameraOnlineStatus;
            return h(
              "span",
              cameraOnlineStatus == 0
                ? "离线"
                : cameraOnlineStatus == 1
                ? "在线"
                : ""
            );
          },
        },
        {
          title: "模式",
          key: "cameraFlag",
          align: "center",
          minWidth: 120,
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
                      this.option3_flag_open(parking);
                    } else {
                      this.option3_flag_close(parking);
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
          align: "center",
          //   sortable: 'custom',
          key: "remark",
          minWidth: 115,
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
                "span",
                {
                  style: {
                    size: 26,
                    cursor: "pointer",
                    marginRight: "5px",
                  },
                  on: {
                    click: () => {
                      this.module3_edit(parking);
                    },
                  },
                },
                "编辑"
              ),
              h(
                "span",
                {
                  props: {
                    // type: 'md-eye',
                    size: 26,
                    color: "#19be6b",
                  },
                  style: {
                    cursor: "pointer",
                  },
                  on: {
                    click: () => {
                      this.module3_bind_delete(params.row);
                    },
                  },
                },
                "删除"
              ),
            ]);

            return menu;
          },
        },
      ];
      let data = this.datas;
      let start = data.start;
      let pageSize = data.pageSize;
      let filterJson = {
        filters: [{ property: "bind", value: "1" }],
      };
      this.current = 1;
      this.loading = true;
      Administration_camera_info_list({
        start,
        pageSize,
        filterJson,
      }).then((res) => {
        this.totals = res.total;
        this.list = res.list;
        this.loading = false;
      });
    },
    option4() {
      this.button_true = true;
      this.navigation = 4;
      this.list = [];
      this.totals = 0;
      this.columns = [
        {
          title: "车场名称",
          align: "center",
          key: "parkName",
          minWidth: 170,
        },
        {
          title: "系统品牌",
          align: "center",
          key: "factoryId",
          minWidth: 100,
          render: (h, params) => {
            let factoryId = params.row.factoryId;
            let name =
              factoryId == 101
                ? "华夏"
                : factoryId == 102
                ? "臻识"
                : factoryId == 103
                ? "捷顺"
                : factoryId == 104
                ? "海康"
                : "";
            return h("div", name);
          },
        },
        {
          title: "系统型号",
          align: "center",
          key: "systemModel",
          minWidth: 110,
        },

        {
          title: "接入模式",
          align: "center",
          key: "accessMode",
          ellipsis: "true",
          minWidth: 150,
          render: (h, params) => {
            let accessMode = params.row.accessMode;
            return h(
              "span",
              accessMode == "0" ? "主动" : accessMode == "1" ? "被动" : ""
            );
          },
        },

        {
          title: "协议",
          align: "center",
          key: "agreement",
          minWidth: 130,
        },
        {
          title: "管理车位数",
          align: "center",
          key: "plateNumber",
          minWidth: 130,
        },
        {
          title: "系统状态",
          key: "onlineStatus",
          align: "center",
          minWidth: 120,
          render: (h, params) => {
            let onlineStatus = params.row.onlineStatus;
            // return h(
            //   "span",
            //   onlineStatus == 1 ? "在线" : onlineStatus == 0 ? "离线" : ""
            // );
            return h("span", "在线");
          },
        },
        {
          title: "备注",
          align: "center",
          key: "remark",
          minWidth: 200,
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
              h("i-switch", {
                props: {
                  type: "warning",
                  size: "large",
                  value: params.row.systemFlag == 1, // 控制开关的打开或关闭状态，官网文档属性是value
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
                      this.system_open(parking);
                    } else {
                      this.system_close(parking);
                    }
                  },
                },
              }),
              h(
                "span",
                {
                  style: {
                    // type: 'md-trash',
                    size: 26,
                    // color: '#ed4014',
                    cursor: "pointer",
                    marginRight: "5px",
                  },
                  on: {
                    click: () => {
                      this.module4_edit(parking);
                    },
                  },
                },
                "编辑"
              ),
              h(
                "span",
                {
                  props: {
                    // type: 'md-eye',
                    size: 26,
                    color: "#19be6b",
                  },
                  style: {
                    cursor: "pointer",
                  },
                  on: {
                    click: () => {
                      this.module4_bind_delete(parking);
                    },
                  },
                },
                "删除"
              ),
            ]);
            return menu;
          },
        },
      ];

      let data = this.datas;
      let start = data.start;
      let pageSize = data.pageSize;
      let filterJson = "";
      this.current = 1;
      this.loading = true;
      Administration_reverse_list({
        start,
        pageSize,
        filterJson,
      }).then((res) => {
        this.totals = res.total;
        this.list = res.list;
        this.loading = false;
      });
    },
    option5() {
      this.button_true = true;
      this.navigation = 5;
      this.list = [];
      this.totals = 0;
      this.columns = [
        {
          title: "车场名称",
          align: "center",
          key: "parkName",
          minWidth: 170,
        },
        {
          title: "楼层",
          align: "center",
          key: "floor",
          minWidth: 100,
        },
        {
          title: "分区",
          align: "center",
          key: "areaName",
          minWidth: 110,
        },
        {
          title: "车道",
          align: "center",
          key: "laneName",
          minWidth: 110,
        },
        {
          title: "位置",
          align: "center",
          key: "location",
          minWidth: 110,
        },

        {
          title: "设备厂家",
          align: "center",
          key: "factoryId",
          ellipsis: "true",
          minWidth: 150,
          render: (h, params) => {
            let parkingState = params.row.factoryId;
            return h(
              "span",
              parkingState == 101
                ? "优色"
                : parkingState == 102
                ? "海康"
                : parkingState == 103
                ? "捷顺"
                : parkingState == 104
                ? "海康"
                : ""
            );
          },
        },

        {
          title: "设备ID",
          align: "center",
          key: "screenCode",
          minWidth: 130,
        },
        {
          title: "显示尺寸",
          align: "center",
          key: "displaySize",
          ellipsis: "true",
          minWidth: 150,
        },
        {
          title: "分辨率",
          align: "center",
          key: "resolutionRatio",
          ellipsis: "true",
          minWidth: 150,
        },
        {
          title: "设备状态",
          key: "parkingState",
          align: "center",
          minWidth: 120,
          render: (h, params) => {
            let parkingState = params.row.parkingState;
            return h("span", "离线");
          },
        },
        {
          title: "模板功能组",
          align: "center",
          key: "groupName",
          ellipsis: "true",
          minWidth: 150,
        },
        {
          title: "备注",
          align: "center",
          key: "remark",
          minWidth: 115,
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
                      this.module5_edit(parking);
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
                      this.module5_bind_delete(params.row);
                    },
                  },
                },
                "删除"
              ),
            ]);
            return menu;
          },
        },
      ];
      let data = this.datas;
      let start = data.start;
      let pageSize = data.pageSize;
      let filterJson = {
        filters: [{ property: "bind", value: "1" }],
      };
      this.current = 1;
      this.loading = true;
      Administration_screen_info_list({
        start,
        pageSize,
        filterJson,
      }).then((res) => {
        this.totals = res.total;
        this.list = res.list;
        this.loading = false;
      });
    },
    option6() {
      this.button_true = true;
      this.navigation = 6;
      this.list = [];
      this.totals = 0;
      this.columns = [
        {
          title: "车场名称",
          align: "center",
          key: "parkName",
          minWidth: 170,
        },
        {
          title: "设备ID",
          align: "center",
          //   sortable: 'custom',
          key: "screenCode",
          minWidth: 140,
        },
        {
          title: "设备厂家",
          align: "center",
          //   sortable: 'custom',
          key: "factoryId",
          minWidth: 110,
          render: (h, params) => {
            let type = params.row.factoryId;
            return h(
              "div",
              type == 101
                ? "华夏"
                : type == 102
                ? "臻识"
                : type == 103
                ? "捷顺"
                : type == 104
                ? "海康"
                : ""
            );
          },
        },

        {
          title: "设备状态",
          align: "center",
          //   sortable: 'custom',
          key: "screenOnlineStatus",
          minWidth: 100,
          render: (h, params) => {
            let type = params.row.screenOnlineStatus;
            return h("div", type == 0 ? "离线" : type == 1 ? "在线" : "");
          },
        },
        {
          title: "类型",
          align: "center",
          //   sortable: 'custom',
          key: "screenType",
          minWidth: 80,
          render: (h, params) => {
            let type = params.row.screenType;
            return h("div", type == 0 ? "室内" : type == 1 ? "出入口" : "");
          },
        },

        {
          title: "窗口数",
          align: "center",
          //   sortable: 'custom',
          key: "screenSum",
          ellipsis: "true",
          minWidth: 100,
        },

        {
          title: "显示内容",
          align: "center",
          //   sortable: 'custom',
          key: "parkFloorNameList",
          minWidth: 110,
          render: (h, params) => {
            let data = "";
            params.row.parkFloorNameList.map((res, index) => {
              if (res) {
                if (index == 0) {
                  data += res;
                } else {
                  if (data) {
                    data += "/" + res;
                  } else {
                    data += res;
                  }
                }
              }
            });
            return h("div", data);
          },
        },
        {
          title: "分辨率",
          align: "center",
          //   sortable: 'custom',
          key: "screenPixel",
          minWidth: 100,
        },
        {
          title: "备注",
          align: "center",
          //   sortable: 'custom',
          key: "remark",
          minWidth: 130,
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
              h("i-switch", {
                props: {
                  type: "warning",
                  size: "large",
                  value: params.row.screenFlag === 1, // 控制开关的打开或关闭状态，官网文档属性是value
                },
                style: {
                  marginRight: "10px",
                },
                scopedSlots: {
                  open: () => h("span", "启用"),
                  close: () => h("span", "禁用"),
                },
                on: {
                  "on-change": (state) => {
                    if (state) {
                      this.enableParking6(parking);
                    } else {
                      this.disabledParking6(parking);
                    }
                  },
                },
              }),
              h(
                "span",
                {
                  style: {
                    // type: 'md-trash',
                    size: 26,
                    // color: '#ed4014',
                    cursor: "pointer",
                    marginRight: "5px",
                  },
                  on: {
                    click: () => {
                      this.module6_edit(parking);
                    },
                  },
                },
                "编辑"
              ),
              h(
                "span",
                {
                  props: {
                    // type: 'md-eye',
                    size: 26,
                    color: "#19be6b",
                  },
                  style: {
                    cursor: "pointer",
                  },
                  on: {
                    click: () => {
                      this.module6_bind_delete(parking);
                    },
                  },
                },
                "删除"
              ),
            ]);
            return menu;
          },
        },
      ];
      let data = this.datas;
      let start = data.start;
      let pageSize = data.pageSize;
      let filterJson = {
        filters: [{ property: "bind", value: "1" }],
      };
      this.current = 1;
      this.loading = true;
      Administration_admin_biz_screen_info_om_list({
        start,
        pageSize,
        filterJson,
      }).then((res) => {
        this.totals = res.total;
        this.list = res.list;
        this.loading = false;
      });
    },
    option7() {
      this.button_true = true;
      this.navigation = 7;
      this.list = [];
      this.totals = 0;
      this.columns = [
        {
          title: "车场名称",
          align: "center",
          //   sortable: 'custom',
          key: "stallName",
          minWidth: 110,
        },
        {
          title: "楼层",
          align: "center",
          //   sortable: 'custom',
          key: "floor",
          minWidth: 100,
        },
        {
          title: "分区",
          align: "center",
          //   sortable: 'custom',
          key: "areaName",
          minWidth: 110,
        },

        {
          title: "车位",
          align: "center",
          //   sortable: 'custom',
          key: "type",
          minWidth: 80,
          render: (h, params) => {
            let type = params.row.type;
            return h("div", type == 2 ? "固定" : type == 0 ? "时租" : "");
          },
        },

        {
          title: "设备ID",
          align: "center",
          //   sortable: 'custom',
          key: "plateNumber",
          minWidth: 130,
        },
        {
          align: "center",
          //   sortable: 'custom',
          key: "plateNumber",
          minWidth: 130,
          renderHeader: (h, params) => {
            let menu = null;
            menu = h("div", [h("p", "绑定"), h("p", "网关数")]);
            return menu;
          },
        },
        {
          title: "设备状态",
          //   sortable: 'custom',
          key: "parkingState",
          align: "center",
          minWidth: 120,
          render: (h, params) => {
            let parkingState = params.row.parkingState;
            return h(
              "span",
              parkingState == 0 ? "无车" : parkingState == 1 ? "有车" : ""
            );
          },
        },
        {
          title: "备注",
          align: "center",
          //   sortable: 'custom',
          key: "account",
          minWidth: 115,
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
                "span",
                {
                  style: {
                    size: 26,
                    cursor: "pointer",
                    marginRight: "5px",
                  },
                  on: {
                    click: () => {
                      this.edit(params.row.fixedId, params.row.stallId);
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
                      this.toViewRental(params.row);
                    },
                  },
                },
                "删除"
              ),
            ]);
            return menu;
          },
        },
      ];
    },

    //添加设备
    add_equipment() {
      if (this.navigation == 1) {
      } else if (this.navigation == 2) {
        this.list_module2 = [];
        this.totals2 = 0;
        this.model2 = true;
        this.module_titles = "添加出入口相机";
        this.current2 = 1;
        let data = this.datas1;
        let start = data.start;
        let pageSize = data.pageSize;
        let filterJson = {
          filters: [{ property: "bind", value: "0" }],
        };
        let value = {};
        if (this.module2_serch_val) {
          value = {
            property: "deviceCode",
            value: this.module2_serch_val,
          };
          filterJson.filters.push(value);
        }
        this.loading_module2 = true;
        Administration_camera_list({
          start,
          pageSize,
          filterJson,
        }).then((res) => {
          this.list_module2 = res.list;
          this.totals2 = res.total;
          this.loading_module2 = false;
        });
      } else if (this.navigation == 3) {
        this.list_module3 = [];
        this.totals3 = 0;
        this.model3 = true;
        this.module_titles = "添加车道相机";
        this.current3 = 1;
        let data = this.datas1;
        let start = data.start;
        let pageSize = data.pageSize;
        let filterJson = {
          filters: [{ property: "bind", value: "0" }],
        };
        let value = {};
        if (this.module3_serch_val) {
          value = {
            property: "deviceCode",
            value: this.module3_serch_val,
          };
          filterJson.filters.push(value);
        }
        this.loading_module3 = true;
        Administration_camera_info_list({
          start,
          pageSize,
          filterJson,
        }).then((res) => {
          this.list_module3 = res.list;
          this.totals3 = res.total;
          this.loading_module3 = false;
        });
      } else if (this.navigation == 4) {
        this.model4 = true;
        this.module_titles = "新增反寻系统";
        Administration_selectList().then((res) => {
          this.preIdlist = res;
        });
      } else if (this.navigation == 5) {
        this.model5 = true;
        this.module_titles = "新增诱导信息屏";
        this.current5 = 1;
        let data = this.datas1;
        let start = data.start;
        let pageSize = data.pageSize;
        let filterJson = {
          filters: [{ property: "bind", value: "0" }],
        };
        let value = {};
        if (this.module5_serch_val) {
          value = {
            property: "deviceCode",
            value: this.module5_serch_val,
          };
          filterJson.filters.push(value);
        }
        this.loading_module5 = true;
        Administration_screen_info_list({
          start,
          pageSize,
          filterJson,
        }).then((res) => {
          this.list_module5 = res.list;
          this.totals5 = res.total;
          this.loading_module5 = false;
        });
      } else if (this.navigation == 6) {
        this.model6 = true;
        this.module_titles = "新增车场诱导屏";
        this.current6 = 1;
        let data = this.datas1;
        let start = data.start;
        let pageSize = data.pageSize;
        let filterJson = {
          filters: [{ property: "bind", value: "0" }],
        };
        let value = {};
        if (this.module6_serch_val) {
          value = {
            property: "deviceCode",
            value: this.module6_serch_val,
          };
          filterJson.filters.push(value);
        }
        this.loading_module6 = true;
        Administration_admin_biz_screen_info_om_list({
          start,
          pageSize,
          filterJson,
        }).then((res) => {
          this.list_module6 = res.list;
          this.totals6 = res.total;
          this.loading_module6 = false;
        });
      } else if (this.navigation == 7) {
        this.model7 = true;
        this.module_titles = "增加车位锁";
      }
    },
    back2() {
      this.model2 = false;
      this.module2_serch_val = "";
    },
    back3() {
      this.model3 = false;
      this.module3_serch_val = "";
    },
    back5() {
      this.model5 = false;
      this.module5_serch_val = "";
    },
    back6() {
      this.model6 = false;
      this.module6_serch_val = "";
    },
    click_module() {
      this.model3 = false;
      this.model4 = false;
      this.model7 = false;
    },
    cancle() {},
    // success() {
    //
    //   let data = [
    //     {
    //       path: "/Administration/CarAdministration",
    //       count: 1,
    //     },
    //     {
    //       path: "/Administration",
    //       text: "New",
    //       type: "warning",
    //     },
    //     {
    //       path: "/Administration/UserAdministration",
    //       color: "red",
    //     },
    //   ];
    //   this.$store.commit("admin/menu/setAllMenuBadge", data);
    // },
    // error() {
    //
    //   this.$store.commit("admin/menu/setMenuBadge", {
    //     path: "/Administration/CarAdministration",
    //     badge: {
    //       path: "/Administration/CarAdministration",
    //       count: 2,
    //     },
    //   });
    // },
    // warning() {
    //
    //   this.$store.commit(
    //     "admin/menu/removeMenuBadge",
    //     "/Administration/CarAdministration"
    //   );
    //   this.$store.commit("admin/menu/removeMenuBadge", "/Administration");
    //   this.$store.commit(
    //     "admin/menu/removeMenuBadge",
    //     "/Administration/UserAdministration"
    //   );
    // },
    getData(value) {
      let data = {};
      if (!value) {
        data = this.datas;
      } else {
        data = value;
        this.data = value;
      }
      this.list = [];
      this.totals = 0;
      let start = data.start;
      let pageSize = data.pageSize;
      let filterJson = data.filterJson;
      this.current = 1;
      this.loading = true;
      if (this.navigation == 1) {
        // Administration_stall_status_list({
        //   start,
        //   pageSize,
        //   filterJson,
        // }).then((res) => {
        //   this.totals = res.total;
        //   this.list = res.list;
        //   this.loading = false;
        // });
      } else if (this.navigation == 2) {
        Administration_camera_list({
          start,
          pageSize,
          filterJson,
        }).then((res) => {
          this.totals = res.total;
          this.list = res.list;
          this.loading = false;
        });
      } else if (this.navigation == 3) {
        filterJson.filters.map((res) => {
          if (res.property == "onlineStatus") {
            res.property = "cameraOnlineStatus";
          }
        });
        Administration_camera_info_list({
          start,
          pageSize,
          filterJson,
        }).then((res) => {
          this.totals = res.total;
          this.list = res.list;
          this.loading = false;
        });
      } else if (this.navigation == 4) {
        Administration_reverse_list({
          start,
          pageSize,
          filterJson,
        }).then((res) => {
          this.totals = res.total;
          this.list = res.list;
          this.loading = false;
        });
      } else if (this.navigation == 5) {
        Administration_screen_info_list({
          start,
          pageSize,
          filterJson,
        }).then((res) => {
          this.totals = res.total;
          this.list = res.list;
          this.loading = false;
        });
      } else if (this.navigation == 6) {
        Administration_admin_biz_screen_info_om_list({
          start,
          pageSize,
          filterJson,
        }).then((res) => {
          this.totals = res.total;
          this.list = res.list;
          this.loading = false;
        });
      } else if (this.navigation == 7) {
      }
    },
    delete_getData() {
      let data = {};
      if (!this.data) {
        data = this.datas;
      } else {
        data = this.data;
      }
      this.list = [];
      this.totals = 0;
      let start = data.start;
      let pageSize = data.pageSize;
      let filterJson = data.filterJson;
      this.current = 1;
      this.loading = true;
      if (this.navigation == 1) {
        // Administration_stall_status_list({
        //   start,
        //   pageSize,
        //   filterJson,
        // }).then((res) => {
        //   this.totals = res.total;
        //   this.list = res.list;
        //   this.loading = false;
        // });
      } else if (this.navigation == 2) {
        Administration_camera_list({
          start,
          pageSize,
          filterJson,
        }).then((res) => {
          this.totals = res.total;
          this.list = res.list;
          this.loading = false;
        });
      } else if (this.navigation == 3) {
        filterJson.filters.map((res) => {
          if (res.property == "onlineStatus") {
            res.property = "cameraOnlineStatus";
          }
        });
        Administration_camera_info_list({
          start,
          pageSize,
          filterJson,
        }).then((res) => {
          this.totals = res.total;
          this.list = res.list;
          this.loading = false;
        });
      } else if (this.navigation == 4) {
        Administration_reverse_list({
          start,
          pageSize,
          filterJson,
        }).then((res) => {
          this.totals = res.total;
          this.list = res.list;
          this.loading = false;
        });
      } else if (this.navigation == 5) {
        Administration_screen_info_list({
          start,
          pageSize,
          filterJson,
        }).then((res) => {
          this.totals = res.total;
          this.list = res.list;
          this.loading = false;
        });
      } else if (this.navigation == 6) {
        Administration_admin_biz_screen_info_om_list({
          start,
          pageSize,
          filterJson,
        }).then((res) => {
          this.totals = res.total;
          this.list = res.list;
          this.loading = false;
        });
      } else if (this.navigation == 7) {
      }
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
      this.totals = 0;
      this.current = value;
      let start = (value - 1) * data.pageSize;
      let pageSize = data.pageSize;
      let filterJson = data.filterJson;
      if (this.navigation == 1) {
        // Administration_stall_status_list({
        //   start,
        //   pageSize,
        //   filterJson,
        // }).then((res) => {
        //   this.totals = res.total;
        //   this.list = res.list;
        //   this.loading = false;
        // });
      } else if (this.navigation == 2) {
        Administration_camera_list({
          start,
          pageSize,
          filterJson,
        }).then((res) => {
          this.totals = res.total;
          this.list = res.list;
          this.loading = false;
        });
      } else if (this.navigation == 3) {
        Administration_camera_info_list({
          start,
          pageSize,
          filterJson,
        }).then((res) => {
          this.totals = res.total;
          this.list = res.list;
          this.loading = false;
        });
      } else if (this.navigation == 4) {
        Administration_reverse_list({
          start,
          pageSize,
          filterJson,
        }).then((res) => {
          this.totals = res.total;
          this.list = res.list;
          this.loading = false;
        });
      } else if (this.navigation == 5) {
        Administration_screen_info_list({
          start,
          pageSize,
          filterJson,
        }).then((res) => {
          this.totals = res.total;
          this.list = res.list;
          this.loading = false;
        });
      } else if (this.navigation == 6) {
        Administration_admin_biz_screen_info_om_list({
          start,
          pageSize,
          filterJson,
        }).then((res) => {
          this.totals = res.total;
          this.list = res.list;
          this.loading = false;
        });
      } else if (this.navigation == 7) {
      }
    },
    jump2(value) {
      this.loading_module2 = true;
      let data = "";
      let datas = {
        start: 0,
        pageSize: 5,
        filterJson: {
          filters: [
            {
              property: "bind",
              value: 0,
            },
          ],
        },
      };
      if (this.module2_serch_val) {
        datas.filterJson.filters.push({
          property: "deviceCode",
          value: this.module2_serch_val,
        });
        data = datas;
      } else {
        data = datas;
      }
      this.list_module2 = [];
      this.totals2 = 0;
      let start = (value - 1) * data.pageSize;
      let pageSize = data.pageSize;
      let filterJson = data.filterJson;
      Administration_camera_list({
        start,
        pageSize,
        filterJson,
      }).then((res) => {
        this.totals2 = res.total;
        this.current2 = value;
        this.list_module2 = res.list;
        this.loading_module2 = false;
      });
    },
    jump3(value) {
      this.loading_module3 = true;
      let data = "";
      let datas = {};
      datas = {
        start: 0,
        pageSize: 5,
        filterJson: {
          filters: [
            {
              property: "bind",
              value: 0,
            },
          ],
        },
      };
      if (this.module3_serch_val) {
        datas.filterJson.filters.push({
          property: "deviceCode",
          value: this.module3_serch_val,
        });
        data = datas;
      } else {
        data = datas;
      }
      this.totals3 = 0;
      this.list_module3 = [];
      let start = (value - 1) * data.pageSize;
      let pageSize = data.pageSize;
      let filterJson = data.filterJson;
      Administration_camera_info_list({
        start,
        pageSize,
        filterJson,
      }).then((res) => {
        this.totals3 = res.total;
        this.current3 = value;
        this.list_module3 = res.list;
        this.loading_module3 = false;
      });
    },
    jump5(value) {
      this.loading_module5 = true;
      let data = "";
      let datas = {
        start: 0,
        pageSize: 5,
        filterJson: {
          filters: [
            {
              property: "bind",
              value: 0,
            },
          ],
        },
      };
      if (this.module5_serch_val) {
        datas.filterJson.filters.push({
          property: "deviceCode",
          value: this.module5_serch_val,
        });
        data = datas;
      } else {
        data = datas;
      }
      let start = (value - 1) * data.pageSize;
      let pageSize = data.pageSize;
      let filterJson = data.filterJson;
      Administration_screen_info_list({
        start,
        pageSize,
        filterJson,
      }).then((res) => {
        this.totals5 = res.total;
        this.current5 = value;
        this.list_module5 = res.list;
        this.loading_module5 = false;
      });
    },
    jump6(value) {
      this.loading_module6 = true;
      let data = "";
      let datas = {
        start: 0,
        pageSize: 5,
        filterJson: {
          filters: [
            {
              property: "bind",
              value: 0,
            },
          ],
        },
      };
      if (this.module6_serch_val) {
        datas.filterJson.filters.push({
          property: "deviceCode",
          value: this.module6_serch_val,
        });
        data = datas;
      } else {
        data = datas;
      }
      let start = (value - 1) * data.pageSize;
      let pageSize = data.pageSize;
      let filterJson = data.filterJson;
      Administration_screen_info_list({
        start,
        pageSize,
        filterJson,
      }).then((res) => {
        this.totals6 = res.total;
        this.current6 = value;
        this.list_module6 = res.list;
        this.loading_module6 = false;
      });
    },
    //出入口相机启用
    option2_flag_open(val) {
      Administration_camera_update_flag({
        id: val.id,
        type: 1,
      }).then((res) => {
        if (res.success == true) {
          this.$Message.success(res.content);
        } else {
          this.$Message.error(res.content);
          this.option2();
          this.current2 = 1;
          let data = this.datas;
          let start = data.start;
          let pageSize = data.pageSize;
          let value = {};
          let filterJson = {
            filters: [{ property: "bind", value: "0" }],
          };
          this.loading_module2 = true;
          Administration_camera_list({
            start,
            pageSize,
            filterJson,
          }).then((res) => {
            this.list_module2 = res.list;
            this.totals2 = res.total;
            this.loading_module2 = false;
          });
        }
      });
    },
    //出入口相机禁用
    option2_flag_close(val) {
      Administration_camera_update_flag({
        id: val.id,
        type: 0,
      }).then((res) => {
        if (res.success == true) {
          this.$Message.success(res.content);
        } else {
          this.$Message.error(res.content);
          this.option2();
          this.current2 = 1;
          let data = this.datas;
          let start = data.start;
          let pageSize = data.pageSize;
          let filterJson = {
            filters: [{ property: "bind", value: "0" }],
          };
          this.loading_module2 = true;
          Administration_camera_list({
            start,
            pageSize,
            filterJson,
          }).then((res) => {
            this.list_module2 = res.list;
            this.totals2 = res.total;
            this.loading_module2 = false;
          });
        }
      });
    },

    //车道相机启用
    option3_flag_open(val) {
      Administration_lane_om_camera_update_flag({
        id: val.id,
        type: 1,
      }).then((res) => {
        if (res.success == true) {
          this.$Message.success(res.content);
        } else {
          this.$Message.error(res.content);
          this.option3();
          this.current3 = 1;
          let data = this.datas;
          let start = data.start;
          let pageSize = data.pageSize;
          let filterJson = {
            filters: [{ property: "bind", value: "0" }],
          };
          this.loading_module3 = true;
          Administration_camera_info_list({
            start,
            pageSize,
            filterJson,
          }).then((res) => {
            this.list_module3 = res.list;
            this.totals3 = res.total;
            this.loading_module3 = false;
          });
        }
      });
    },
    //车道相机禁用
    option3_flag_close(val) {
      Administration_lane_om_camera_update_flag({
        id: val.id,
        type: 0,
      }).then((res) => {
        if (res.success == true) {
          this.$Message.success(res.content);
        } else {
          this.$Message.error(res.content);
          this.option3();
          this.current3 = 1;
          let data = this.datas;
          let start = data.start;
          let pageSize = data.pageSize;
          let filterJson = {
            filters: [{ property: "bind", value: "0" }],
          };
          this.loading_module3 = true;
          Administration_camera_info_list({
            start,
            pageSize,
            filterJson,
          }).then((res) => {
            this.list_module3 = res.list;
            this.totals3 = res.total;
            this.loading_module3 = false;
          });
        }
      });
    },
    //出入口相机新增
    module2_add() {
      this.module2_dis = true;
      this.model2_add = true;
      this.module_title = "新增出入口相机";
      this.module2_data = {};
      Administration_selectList().then((res) => {
        this.preIdlist = res;
      });
    },
    //车道相机新增
    module3_add() {
      this.module3_dis = true;
      this.model3_add = true;
      this.module_title = "新增车道相机";
      this.module3_data = {};
      Administration_selectList().then((res) => {
        this.preIdlist = res;
      });
    },
    //导航信息屏新增
    module5_add() {
      this.model5_add = true;
      this.module_title = "新增导航信息屏";
      this.module5_data = {};
      Administration_selectList().then((res) => {
        this.preIdlist = res;
      });
      Administration_group_info_select_list().then((res) => {
        //
        this.scssModellist = res;
      });
    },
    //车位诱导屏新增
    module6_add() {
      this.model6_add = true;
      this.module_title = "新增车场诱导屏";
      this.module6_data = {};
      Administration_selectList().then((res) => {
        this.preIdlist = res;
      });
      Administration_admin_base_dict_group_list({
        code: "screen-pixel",
      }).then((res) => {
        this.screenPixellist = res;
      });
    },
    module2_edit(val) {
      this.module2_disselect = false;
      this.module2_dis = true;
      this.model2_add = true;
      this.module_title = "编辑出入口相机";
      this.module2_data = {};
      this.module2_data.id = val.id;
      this.module2_data.factoryId = val.factoryId;
      this.module2_data.deviceModel = val.deviceModel;
      this.module2_data.cameraCode = val.cameraCode;
      this.module2_data.operators = val.operators;
      this.module2_data.cameraSim = val.cameraSim;
      this.module2_data.remark = val.remark;
      Administration_selectList().then((res) => {
        this.preIdlist = res;
        res.map((res) => {
          if (!val.parkName) {
            this.module2_disselect = true;
          }
          if (res.name == val.parkName) {
            this.module2_data.preId = res.id;
            Administration_gate_list({
              preId: res.id,
            }).then((res) => {
              this.gateCodelist = res;
              this.module2_data.gateCode = String(val.gateCode);
              this.module2_dis = false;
            });
          }
        });
      });
      Administration_group_info_select_list().then((res) => {});
    },
    module3_edit(val) {
      this.lanelist = [];
      this.model3_add = true;
      this.module3_dis = true;
      this.module_title = "编辑车道相机";
      if (val.parkCode) {
        this.edit_true = 2;
      } else {
        this.edit_true = 3;
      }
      this.module3_data = {};
      this.module3_data.id = val.id;
      this.module3_data.preId = val.preId;
      this.module3_data.factoryId = val.factoryId;
      this.module3_data.deviceModel = val.deviceModel;
      this.module3_data.cameraCode = val.cameraCode;
      this.module3_data.firmwareVersion = val.firmwareVersion;
      this.module3_data.remark = val.remark;
      this.module3_data.parkName = val.parkName;
      Administration_selectList().then((res) => {
        this.preIdlist = res;
        Administration_om_select({
          preId: val.preId ? val.preId : "",
          floor: "",
        }).then((res) => {
          this.lanelist = res;
          this.module3_data.laneId = val.laneId;
          if (this.module3_data.preId) {
            this.module3_dis = false;
          } else {
            this.module3_dis = true;
          }
        });
      });
    },
    module4_edit(val) {
      this.$router.push({
        path:
          "/Administration/equipmentAdministration/equipmentAdministration_edit",
        query: val,
      });
    },
    module5_edit(val) {
      this.model5_add = true;
      this.lanelist = [];
      this.module5_data.laneId = "";
      this.module5_dis = true;
      this.module_title = "编辑导航信息屏";
      this.module5_data = {};
      this.module5_data.id = val.id;
      this.module5_data.preId = val.preId;
      this.module5_data.laneId = val.laneId;
      this.module5_data.factoryId = val.factoryId;
      this.module5_data.screenCode = val.screenCode;
      this.module5_data.firmwareVersion = val.firmwareVersion;
      this.module5_data.displaySize = val.displaySize;
      this.module5_data.resolutionRatio = val.resolutionRatio;
      this.module5_data.remark = val.remark;
      this.module5_data.groupCode = val.groupCode;
      this.parkName = val.parkName;
      this.module5_data.location = val.location;
      Administration_selectList().then((res) => {
        this.preIdlist = res;
        Administration_om_select({
          preId: val.preId ? val.preId : "",
          floor: "",
        }).then((res) => {
          this.lanelist = res;
          if (this.module5_data.preId) {
            this.module5_dis = false;
          } else {
            this.module5_dis = true;
          }
        });
      });
      Administration_group_info_select_list().then((res) => {
        //
        this.scssModellist = res;
      });
    },
    //编辑车场诱导屏
    module6_edit(val) {
      this.module6_data = {};
      this.model6_add = true;
      this.module_titles = "编辑车场诱导屏";
      this.module6_data = {
        id: val.id,
        factoryId: val.factoryId, //品牌
        operators: val.operators, //运营商
        preId: val.preId, //车场id
        screenCode: val.screenCode, //设备id
        screenSim: val.screenSim, //sim卡号
        remark: val.remark, //备注
        parkFloorIdList: val.parkFloorIdList, //显示内容
        screenPixel: val.screenPixel,
      };
      Administration_selectList().then((res) => {
        this.preIdlist = res;
      });
      Administration_admin_biz_park_floor_om_list({
        preId: val.preId,
      }).then((res) => {
        //
        this.contentList = res;
        this.module6_dis = false;
      });
      Administration_admin_base_dict_group_list({
        code: "screen-pixel",
      }).then((res) => {
        //
        this.screenPixellist = res;
      });
    },
    //删除车场诱导屏（未绑定）
    module6_unbind_delete(val) {
      this.$Modal.confirm({
        title: "确定删除",
        onOk: () => {
          Administration_admin_biz_screen_info_om_delete_screen_info({
            id: val.id,
          }).then((res) => {
            if (res.success == true) {
              this.$Message.success(res.content);
              this.add_equipment();
            } else {
              this.$Message.error(res.content);
            }
          });
        },
        onCancel: () => {},
      });
    },
    //出入口相机新增弹框确定
    module_ok2() {
      if (this.module_title == "新增出入口相机") {
        this.loading_btn2 = true;
        if (!this.module2_data.factoryId) {
          this.$Message.error("请选择相机品牌");
          this.loading_btn2 = false;
        } else if (!this.module2_data.cameraCode) {
          this.$Message.error("请输入相机ID");
          this.loading_btn2 = false;
        } else {
          Administration_camera_save(this.module2_data).then((res) => {
            if (res.success == true) {
              this.$Message.success(res.content);
              this.loading_btn2 = false;
              this.model2_add = false;
              if (this.module2_data.gateCode) {
                this.$emit("on-reset");
              } else {
                this.module2_serch_val = "";
                this.add_equipment();
              }
            } else {
              this.$Message.error(res.content);
              this.loading_btn2 = false;
            }
          });
        }
      } else if (this.module_title == "编辑出入口相机") {
        this.loading_btn2 = true;
        if (!this.module2_data.factoryId) {
          this.$Message.error("请选择相机品牌");
          this.loading_btn2 = false;
        } else {
          Administration_camera_info_update(this.module2_data).then((res) => {
            if (res.success == true) {
              this.$Message.success(res.content);
              this.loading_btn2 = false;
              this.model2_add = false;
              if (this.module2_data.gateCode) {
                this.delete_getData();
                if (this.model2 == true) {
                  this.add_equipment();
                }
              } else {
                if (this.model2 == true) {
                  this.add_equipment();
                }
                this.delete_getData();
              }
            } else {
              this.$Message.error(res.content);
              this.loading_btn2 = false;
            }
          });
        }
      }
    },
    //车道相机新增弹框确定
    module_ok3() {
      if (this.module_title == "新增车道相机") {
        this.loading_btn3 = true;
        if (!this.module3_data.factoryId) {
          this.$Message.error("请选择相机品牌");
          this.loading_btn3 = false;
        } else if (!this.module3_data.cameraCode) {
          this.$Message.error("请输入相机ID");
          this.loading_btn3 = false;
        } else {
          Administration_camera_info_save(this.module3_data).then((res) => {
            if (res.success == true) {
              this.$Message.success(res.content);
              this.loading_btn3 = false;
              this.model3_add = false;
              if (this.module3_data.laneId) {
                this.$emit("on-reset");
              } else {
                this.module3_serch_val = "";
                this.add_equipment();
              }
            } else {
              this.$Message.error(res.content);
              this.loading_btn3 = false;
            }
          });
        }
      } else if (this.module_title == "编辑车道相机") {
        this.loading_btn3 = true;
        if (!this.module3_data.factoryId) {
          this.$Message.error("请选择相机品牌");
          this.loading_btn3 = false;
        } else {
          this.module3_data.source = 0;
          Administration_lane_om_camera_update(this.module3_data).then(
            (res) => {
              if (res.success == true) {
                this.$Message.success(res.content);
                this.loading_btn3 = false;
                this.model3_add = false;
                if (this.module3_data.laneId) {
                  this.delete_getData();
                  if (this.model3 == true) {
                    this.add_equipment();
                  }
                } else {
                  if (this.model3 == true) {
                    this.add_equipment();
                  }
                  this.delete_getData();
                }
              } else {
                this.$Message.error(res.content);
                this.loading_btn3 = false;
              }
            }
          );
        }
      }
    },
    //新增反寻系统
    module_ok4() {
      if (!this.module4_data.factoryId) {
        this.$Message.error("请选择系统品牌");
        return;
      }

      if (!this.module4_data.accessMode) {
        this.$Message.error("请选择接入模式");
        return;
      }

      if (!this.module4_data.agreement) {
        this.$Message.error("请选择协议");
        return;
      }

      if (!this.module4_data.preId) {
        this.$Message.error("请选择车场名称");
        return;
      }
      this.loading_btn4 = true;
      Administration_reverse_save(this.module4_data).then((res) => {
        if (res.success == true) {
          this.$Message.success(res.content);
          this.model4 = false;
          this.option4();
        } else {
          this.$Message.error(res.content);
        }
        this.loading_btn4 = false;
      });
    },

    //取消新增反寻系统
    cancle4() {
      this.loading_btn4 = false;
      this.model4 = false;
    },
    //新增车场诱导屏
    module_ok6() {
      if (!this.module6_data.factoryId) {
        this.$Message.error("请选择品牌");
        return;
      }
      if (!this.module6_data.screenCode) {
        this.$Message.error("请输入设备ID");
        return;
      }
      if (!this.module6_data.preId) {
        this.$Message.error("请选择车场");
        return;
      }
      if (!this.module6_data.parkFloorIdList) {
        this.$Message.error("请选择显示内容");
        return;
      }
      if (!this.module6_data.screenPixel) {
        this.$Message.error("请选择诱导屏分辨率");
        return;
      }
      this.loading_btn6 = true;
      let data = {
        factoryId: this.module6_data.factoryId, //品牌
        operators: this.module6_data.operators, //运营商
        preId: this.module6_data.preId, //车场id
        screenCode: this.module6_data.screenCode, //设备id
        screenSim: this.module6_data.screenSim, //sim卡号
        remark: this.module6_data.remark, //备注
        parkFloorIdList: this.module6_data.parkFloorIdList.toString(), //显示内容
        screenPixel: this.module6_data.screenPixel, //诱导屏分辨率
      };
      if (this.module_titles == "新增车场诱导屏") {
        Administration_admin_biz_screen_info_om_save(data).then((res) => {
          if (res.success == true) {
            this.$Message.success(res.content);
            this.loading_btn6 = false;
            this.model6_add = false;
            this.$emit("on-reset");
          } else {
            this.$Message.error(res.content);
            this.loading_btn6 = false;
          }
        });
      } else {
        data.id = this.module6_data.id;
        Administration_admin_biz_screen_info_om_update(data).then((res) => {
          if (res.success == true) {
            this.$Message.success(res.content);
            this.loading_btn6 = false;
            this.model6_add = false;
            this.delete_getData();
            this.current6 = 1;
            let data6 = this.datas1;
            let start = data6.start;
            let pageSize = data6.pageSize;
            let filterJson = {
              filters: [{ property: "bind", value: "0" }],
            };
            let value = {};
            if (this.module6_serch_val) {
              value = {
                property: "parkCode",
                value: this.module6_serch_val,
              };
              filterJson.filters.push(value);
            }
            this.loading_module6 = true;
            Administration_admin_biz_screen_info_om_list({
              start,
              pageSize,
              filterJson,
            }).then((res) => {
              this.list_module6 = res.list;
              this.totals6 = res.total;
              this.loading_module6 = false;
            });
          } else {
            this.$Message.error(res.content);
            this.loading_btn6 = false;
          }
        });
      }
    },
    //取消新增车场诱导屏
    cancle6() {
      this.loading_btn6 = false;
      this.model6_add = false;
      //
    },
    //导航信息屏新增弹框确定
    module_ok5() {
      if (this.module_title == "新增导航信息屏") {
        this.loading_btn5 = true;
        if (!this.module5_data.factoryId) {
          this.$Message.error("请选择信息屏品牌");
          this.loading_btn5 = false;
        } else if (!this.module5_data.screenCode) {
          this.$Message.error("请输入设备ID");
          this.loading_btn5 = false;
        } else {
          Administration_screen_info_save(this.module5_data).then((res) => {
            if (res.success == true) {
              this.$Message.success(res.content);
              this.loading_btn5 = false;
              this.model5_add = false;
              if (this.module5_data.laneId) {
                this.$emit("on-reset");
              } else {
                this.module5_serch_val = "";
                this.add_equipment();
              }
            } else {
              this.$Message.error(res.content);
              this.loading_btn5 = false;
            }
          });
        }
      } else if (this.module_title == "编辑导航信息屏") {
        this.loading_btn5 = true;
        if (!this.module5_data.factoryId) {
          this.$Message.error("请选择信息屏品牌");
          this.loading_btn5 = false;
        } else {
          this.module5_data.source = 0;
          Administration_lane_om_screen_update(this.module5_data).then(
            (res) => {
              if (res.success == true) {
                this.$Message.success(res.content);
                this.loading_btn5 = false;
                this.model5_add = false;
                if (this.module5_data.laneId) {
                  this.delete_getData();
                  if (this.model5 == true) {
                    this.add_equipment();
                  }
                } else {
                  if (this.model5 == true) {
                    this.add_equipment();
                  }
                  this.delete_getData();
                }
              } else {
                this.$Message.error(res.content);
                this.loading_btn5 = false;
              }
              this.loading_btn5 = false;
            }
          );
        }
      }
    },
    //出入口相机新增弹框取消
    cancle2() {
      this.loading_btn2 = false;
      this.model2_add = false;
    },
    //车道相机新增弹框取消
    cancle3() {
      this.loading_btn3 = false;
      this.model3_add = false;
    },
    //导航信息屏新增弹框取消
    cancle5() {
      this.loading_btn5 = false;
      this.model5_add = false;
    },
    //出入口相机-未绑定列表删除
    module2_unbind_delete(val) {
      this.$Modal.confirm({
        title: "确定删除",
        onOk: () => {
          Administration_camera_info_unbind_delete({ id: val.id }).then(
            (res) => {
              if (res.success == true) {
                this.$Message.success(res.content);
                this.add_equipment();
              } else {
                this.$Message.error(res.content);
              }
            }
          );
        },
        onCancel: () => {},
      });
    },
    //车道相机-未绑定列表删除
    module3_unbind_delete(val) {
      this.$Modal.confirm({
        title: "确定删除",
        onOk: () => {
          Administration_camera_info_delete({ id: val.id }).then((res) => {
            if (res.success == true) {
              this.$Message.success(res.content);
              this.add_equipment();
            } else {
              this.$Message.error(res.content);
            }
          });
        },
        onCancel: () => {},
      });
    },
    //导航信息屏-未绑定列表删除
    module5_unbind_delete(val) {
      this.$Modal.confirm({
        title: "确定删除",
        onOk: () => {
          Administration_screen_info_delete({ id: val.id }).then((res) => {
            if (res.success == true) {
              this.$Message.success(res.content);
              this.add_equipment();
            } else {
              this.$Message.error(res.content);
            }
          });
        },
        onCancel: () => {},
      });
    },
    //出入口相机-已绑定列表删除
    module2_bind_delete(val) {
      this.$Modal.confirm({
        title: "确定删除",
        onOk: () => {
          Administration_camera_info_bind_delete({ id: val.id }).then((res) => {
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
    //车道相机-已绑定列表删除
    module3_bind_delete(val) {
      this.$Modal.confirm({
        title: "确定删除",
        onOk: () => {
          Administration_lane_om_camera_unbind({ id: val.id }).then((res) => {
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
    //反寻西永-已绑定列表删除
    module4_bind_delete(val) {
      this.$Modal.confirm({
        title: "确定删除",
        onOk: () => {
          Administration_reverse_delete({ id: val.id }).then((res) => {
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
    //导航信息屏-已绑定列表删除
    module5_bind_delete(val) {
      this.$Modal.confirm({
        title: "确定删除",
        onOk: () => {
          Administration_lane_om_screen_unbind({ id: val.id }).then((res) => {
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
    //删除车场诱导屏(已绑定)
    module6_bind_delete(val) {
      this.$Modal.confirm({
        title: "确定删除",
        onOk: () => {
          Administration_admin_biz_screen_info_om_clear_screen_info({
            id: val.id,
          }).then((res) => {
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
    //导航信息屏-已绑定列表启用
    screenFlag_open(val) {
      Administration_lane_om_screen_update_flag({
        id: val.id,
        type: 1,
      }).then((res) => {
        if (res.success == true) {
          this.$Message.success(res.content);
        } else {
          this.$Message.error(res.content);
          this.option5();
        }
      });
    },
    //导航信息屏-已绑定列表禁用
    screenFlag_close(val) {
      Administration_lane_om_screen_update_flag({
        id: val.id,
        type: 0,
      }).then((res) => {
        if (res.success == true) {
          this.$Message.success(res.content);
        } else {
          this.$Message.error(res.content);
          this.option5();
        }
      });
    },
    //反寻系统-开启
    system_open(val) {
      Administration_reverse_system_update_flagt({
        id: val.id,
        type: 1,
      }).then((res) => {
        if ((res.success = true)) {
          this.$Message.success(res.content);
        } else {
          this.$Message.error(res.content);
          this.option4();
        }
      });
    },
    //反寻系统-关闭
    system_close(val) {
      Administration_reverse_system_update_flagt({
        id: val.id,
        type: 0,
      }).then((res) => {
        if ((res.success = true)) {
          this.$Message.success(res.content);
        } else {
          this.$Message.error(res.content);
          this.option4();
        }
      });
    },
    module2_data_preId(e) {
      if (this.module2_disselect == true) {
        Administration_gate_list({
          preId: e.value,
        }).then((res) => {
          this.gateCodelist = res;
          this.module2_dis = false;
        });
      } else {
        this.module2_dis = true;
        this.module2_data.gateCode = "";
      }
    },
    //车场诱导屏启用
    enableParking6(e) {
      Administration_admin_biz_screen_info_om_update_flag({
        id: e.id,
        type: 1,
      }).then((res) => {
        if ((res.success = true)) {
          this.$Message.success(res.content);
        } else {
          this.$Message.error(res.content);
          this.option6();
        }
      });
    },
    //车场诱导屏禁用
    disabledParking6(e) {
      Administration_admin_biz_screen_info_om_update_flag({
        id: e.id,
        type: 0,
      }).then((res) => {
        if ((res.success = true)) {
          this.$Message.success(res.content);
        } else {
          this.$Message.error(res.content);
          this.option6();
        }
      });
    },
  },
};
</script>