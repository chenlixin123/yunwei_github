<template>
  <div>
    <i-frame :src="url" id="ifr" ref="container" />
    <Button @click="handlePrint" type="success">打印</Button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      url: "",
      show: true
    };
  },
  created() {
    this.url =
      "https://datav.aliyuncs.com/share/62794636b5f77b40d549132af3af3fbe?timestamp=" +
      new Date().getTime(); //线上
  },
  methods: {
    handlePrint() {
      this.$Print(this.$refs.container);
    }
  }
};
</script>
<style scoped>
#ifr {
  margin-left: 256px;
  margin-top: 64px;
}
</style>