<template>
  <div class="box">
    <!-- <div class="i-layout-page-header">
      <PageHeader title="查询表格" content="表格查询的复杂示例" hidden-breadcrumb />
    </div>-->
    <Card :bordered="false" dis-hover class="ivu-mt">
      <tableForm ref="form" @on-submit="getData" @on-reset="getData" />
      <tableList ref="table" @on-reset="deletegetData" />
    </Card>
  </div>
</template>
<style lang="less" scoped>
.box {
  margin: 24px;
}
</style>
<script>
import tableForm from "./equipmentAdministration-table-form";
import tableList from "./equipmentAdministration-table-list";

export default {
  name: "list-table-list",
  components: { tableForm, tableList },
  data() {
    return {};
  },
  methods: {
    getData(value) {
      this.$refs.table.getData(value);
    },
    deletegetData() {
      this.$refs.form.handleReset();
    },
  },
  mounted() {},
};
</script>
