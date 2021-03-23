<style lang="less">
</style>
<template>
  <div class="i-table-no-border">
    <Table
      ref="table"
      :columns="columns"
      :data="list"
      :loading="loading"
      class="ivu-mt"
    >
    </Table>
    <div class="ivu-mt ivu-text-center">
      <Page :total="totals" show-total :current="current" @on-change="jump" />
    </div>
  </div>
</template>
<script>
import {
  //设备日志列表
  Administration_admin_biz_device_log_om_list,
} from "@/api/Administration";
import Time from "@/api/time";
export default {
  data() {
    return {
      columns: [
        {
          title: "设备类型",
          key: "deviceType",
          minWidth: 150,
          align: "center",
          render: (h, params) => {
            let data = params.row.deviceType;
            let name = "";
            if (data == 1) {
              name = "出入口一体机";
            } else if (data == 2) {
              name = "诱导屏";
            } else if (data == 3) {
              name = "车道相机";
            } else {
              name = "";
            }
            return h("span", name);
          },
        },
        {
          title: "设备编号",
          key: "deviceCode",
          minWidth: 150,
          align: "center",
        },
        {
          title: "设备状态",
          key: "onlineStatus",
          minWidth: 100,
          align: "center",
          render: (h, params) => {
            let data = params.row.onlineStatus;
            let name = "";
            if (data == 0) {
              name = "离线";
            } else if (data == 1) {
              name = "在线";
            } else {
              name = "";
            }
            return h("span", name);
          },
        },
        {
          title: "时间",
          key: "createTime",
          minWidth: 180,
          align: "center",
          render: (h, params) => {
            let time = params.row.createTime;
            return h("span", Time.TT(time));
          },
        },
        {
          title: "运营商",
          key: "operators",
          minWidth: 100,
          align: "center",
        },
        {
          title: "备注",
          key: "remark",
          minWidth: 180,
          align: "center",
        },
      ],
      list: [],
      loading: true,
      totals: 0,
      current: 1,
      data: "",
    };
  },
  created() {
    this.getData();
  },
  methods: {
    jump(e) {
      console.log(e);
      this.loading = true;
      this.current = e;
      this.totals = 0;
      let start = 0;
      let pageSize = 10;
      let filterJson = "";
      start = (e - 1) * pageSize;
      if (this.data) {
        filterJson = this.data;
      }
      this.list = [];
      Administration_admin_biz_device_log_om_list({
        start: start,
        pageSize: pageSize,
        filterJson: filterJson,
      }).then((res) => {
        console.log(res);
        this.list = res.list;
        this.totals = res.total;
        this.loading = false;
      });
    },
    getData(val) {
      this.loading = true;
      console.log(val);
      this.current = 1;
      this.totals = 0;
      let start = 0;
      let pageSize = 10;
      let filterJson = "";
      if (val) {
        filterJson = val.filterJson;
        this.data = val.filterJson;
      }
      this.list = [];
      Administration_admin_biz_device_log_om_list({
        start: start,
        pageSize: pageSize,
        filterJson: filterJson,
      }).then((res) => {
        console.log(res);
        this.list = res.list;
        this.totals = res.total;
        this.loading = false;
      });
    },
  },
};
</script>