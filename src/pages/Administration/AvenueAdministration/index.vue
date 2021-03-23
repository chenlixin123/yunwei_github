<template>
  <div class="box">
    <!-- <div class="i-layout-page-header">
      <PageHeader title="查询表格" content="表格查询的复杂示例" hidden-breadcrumb />
    </div>-->
    <Card :bordered="false" dis-hover class="ivu-mt">
      <table-form ref="table_form" @on-submit="getData" @on-reset="getData" />
      <table-list ref="table" @Reset="Reset" />
    </Card>
  </div>
</template>
<style lang="less" scoped>
.box {
  margin: 24px;
}
</style>
<script>
import tableForm from "./avenue-table-form";
import tableList from "./avenue-table-list";

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
    Reset() {
      this.$refs.table_form.handleReset();
    },
  },
  mounted() {
    this.getData();
  },
};
</script>
