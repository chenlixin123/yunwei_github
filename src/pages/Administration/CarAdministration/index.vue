<template>
  <div class="box">
    <Card :bordered="false" dis-hover class="ivu-mt">
      <table-form ref="table_form" @on-submit="getData" @on-reset="getData" />
      <table-list ref="table" @reset="reset" />
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

export default {
  name: "list-table-list",
  components: { tableForm, tableList },
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
    reset() {
      this.$refs.table_form.handleReset();
    },
  },
  mounted() {
    this.getData();
  },
};
</script>
