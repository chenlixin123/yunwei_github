<template>
  <div class="box">
    <Card :bordered="false" dis-hover class="ivu-mt">
      <Tabs value="name1" @on-click="click">
        <TabPane label="模板功能组" name="name1">
          <tableList ref="table" />
        </TabPane>
        <TabPane label="基础模板" name="name2">
          <tableList1 ref="table1" />
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
import tableList from "./table-list";
import tableList1 from "./table-list1";

export default {
  components: { tableList, tableList1 },
  data() {
    return {};
  },
  created() {
    // const today = this.$Date().format("YYYY-MM-DD HH:mm:ss");
  },
  methods: {
    click(e) {
      if (e == "name1") {
        this.$refs.table.Refresh();
      } else {
        this.$refs.table1.Refresh();
      }
    },
  },
  mounted() {},
};
</script>
