<style lang="less" scoped>
.ivu-text-center {
  font-size: 20px;
  position: absolute;
  top: 0;
  left: 40%;
}
</style>
<template>
  <div>
    <div class="ivu-text-center">凌猫停车运管平台</div>
    <!-- {{info.realname}} -->
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  name: "iHeaderTitle",
  computed: {
    ...mapState("admin/user", ["info"]),
  },
};
</script>
