<template>
  <div class="box">
    <!-- <button @click="clicks">666666</button>
    <div>{{number}}</div>-->
    <Card :bordered="false" dis-hover class="ivu-mt">
      <Tabs value="name" @on-click="tab_click">
        <TabPane label="车场功能总览" name="name">
          <table-form
            ref="table_form"
            @on-submit="getData"
            @on-reset="getData"
          />
          <!-- <Divider /> -->
          <table-list ref="table" />
        </TabPane>
        <TabPane label="车场设备总览" name="name1">
          <tableForm1
            ref="table_form1"
            @on-submit1="getData1"
            @on-reset1="getData1"
          />
          <tableList1 ref="table1" />
        </TabPane>
        <TabPane label="地图管理" name="name2">
          <tableForm2
            ref="table_form2"
            @on-submit2="getData2"
            @on-reset2="getData2"
          />
          <tableList2 ref="table2" />
        </TabPane>
        <TabPane label="场中场管理" name="name3">
          <tableForm3
            ref="table_form3"
            @on-submit3="getData3"
            @on-reset3="getData3"
          />
          <tableList3 ref="table3" @reset3="reset3" />
        </TabPane>
      </Tabs>
    </Card>
  </div>
</template>
<style lang="less" scoped>
.box {
  margin: 24px;
}
</style>
<script>
import tableForm from "./table-form";
import tableList from "./table-list";
import tableForm1 from "./table-form1";
import tableList1 from "./table-list1";
import tableForm2 from "./table-form2";
import tableList2 from "./table-list2";
import tableForm3 from "./table-form3";
import tableList3 from "./table-list3";

export default {
  name: "list-table-list",
  components: {
    tableForm,
    tableList,
    tableForm1,
    tableList1,
    tableForm2,
    tableList2,
    tableForm3,
    tableList3,
  },
  data() {
    return {
      value: new Date(),
      number: 0,
    };
  },
  created() {
    const today = this.$Date().format("YYYY-MM-DD HH:mm:ss");
  },
  methods: {
    tab_click(e) {
      let data = {
        start: 0,
        pageSize: 10,
        filterJson: "",
      };
      if (e == "name") {
        this.getData(data);
        this.$refs.table_form.carnames();
      } else if (e == "name1") {
        this.getData1(data);
        this.$refs.table_form1.floor();
      } else if (e == "name2") {
        this.getData2(data);
        this.$refs.table_form2.floor();
      } else if (e == "name3") {
        this.getData3(data);
        this.$refs.table_form3.floor();
      }
    },
    clicks() {
      let nn = 1000;
      this.number = 0;
      var dd = setInterval(() => {
        this.number = this.number + 1;
        if (this.number == nn - 5) {
          clearInterval(dd);
          var ss = setInterval(() => {
            this.number = this.number + 1;
            if (this.number == nn) {
              clearInterval(ss);
            }
          }, 200);
        }
      }, 10);
    },
    getData(value) {
      this.$refs.table.getData(value);
    },
    getData1(value) {
      this.$refs.table1.getData1(value);
    },
    getData2(value) {
      this.$refs.table2.getData2(value);
    },
    getData3(value) {
      this.$refs.table3.getData3(value);
    },
    reset3() {
      this.$refs.table_form3.handleReset();
    },
  },
  mounted() {},
};
</script>
