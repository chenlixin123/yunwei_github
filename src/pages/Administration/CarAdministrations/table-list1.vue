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
</style>
<template>
  <div class="i-table-no-border">
    <!-- <Button type="primary" @click="authorization">批量导入授权</Button>
    <Button type="info" @click="out" :loading="btn_loading" class="ivu-ml-16">导出</Button>-->
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
  </div>
</template>
<script>
import random from "@/libs/random_str";
import { Administration_om_device_list } from "@/api/Administration";
import time from "@/api/time";

export default {
  data() {
    return {
      btn_loading: false,
      totals: 10,
      data: "",
      module_ellipsis: [],
      modal10: false,
      columns: [
        {
          title: "车场名称",
          key: "name",
          minWidth: 200,
          align: "center",
        },
        {
          title: "类型",
          key: "type",
          minWidth: 100,
          align: "center",
          render: (h, params) => {
            let value = "";
            if (params.row.type == 0) {
              value = "普通车区";
              return h("span", value);
            } else if (params.row.type == 2) {
              value = "定制车区";
              return h("span", value);
            } else {
              value = "";
              return h("span", value);
            }
          },
        },
        {
          title: "层数",
          key: "floorNumber",
          minWidth: 70,
          align: "center",
        },
        {
          title: "车位总数",
          key: "totalStallNum",
          minWidth: 95,
          align: "center",
        },
        {
          title: "管理车位",
          key: "manageStallNum",
          minWidth: 95,
          align: "center",
          // sortable: "custom"
        },
        {
          title: "车道数",
          key: "laneNumber",
          align: "center",
          minWidth: 80,
          // sortable: "custom"
        },
        {
          title: "闸机",
          key: "zhajiNum",
          align: "center",
          minWidth: 80,
          // sortable: "custom"
        },
        {
          title: "出入口相机",
          key: "inoutCameraNum",
          align: "center",
          minWidth: 110,
          // sortable: "custom"
        },
        {
          title: "车道相机",
          key: "laneCameraNum",
          align: "center",
          minWidth: 95,
          // sortable: "custom"
        },
        {
          title: "导航信息屏",
          key: "intelligentNavScreenNum",
          align: "center",
          minWidth: 110,
          // sortable: "custom"
        },
        {
          title: "车位相机",
          key: "stallCameraNum",
          align: "center",
          minWidth: 95,
          // sortable: "custom"
        },
        {
          title: "室内诱导屏",
          key: "indoorScreenNum",
          align: "center",
          minWidth: 110,
          // sortable: "custom"
        },

        {
          title: "车位锁",
          key: "totalStallNum",
          minWidth: 80,
          align: "center",
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
    };
  },
  created() {},
  methods: {
    list1() {
      this.current = 1;
      let data = this.datas;
      let start = data.start;
      let pageSize = data.pageSize;
      let filterJson = data.filterJson;
      this.loading = true;
      Administration_om_device_list({
        start,
        pageSize,
        filterJson,
      }).then((res) => {
        this.list = res.list;
        this.totals = res.total;
        this.loading = false;
      });
    },
    getData1(value) {
      if (!value) {
        value = {
          start: 0,
          pageSize: 10,
          filterJson: "",
        };
      }
      this.data = value;
      let start = value.start;
      let pageSize = value.pageSize;
      let filterJson = value.filterJson;
      this.current = 1;
      this.loading = true;
      Administration_om_device_list({
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
      Administration_om_device_list({
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
    // 编辑数据
    handleUpdate(index) {
      this.updateIndex = index;
      const item = this.list[index];
      this.createData.desc = item.desc;
      this.showCreate = true;
    },
    //跳转批量导入授权页面
    authorization() {
      this.$router.push({
        path: "/Administration/CarAdministration/CarAdministration_excel",
      });
    },
  },
};
</script>
