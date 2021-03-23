<style lang="less">
</style>
<template>
  <div class="box">
    <Card :bordered="false" dis-hover class="ivu-mt">
      <tableForm ref="form" @on-submit="getData" @on-reset="getData" />
      <tableList ref="table" @getData="getData" />
    </Card>
  </div>
</template>
<script>
import tableForm from "./device_log_form.vue";
import tableList from "./device_log_list.vue";
export default {
  components: { tableForm, tableList },
  data() {
    return {
      data: "",
    };
  },
  methods: {
    getData(value) {
      this.$refs.table.getData(value);
    },
  },
};
</script>