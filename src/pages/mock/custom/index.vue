<template>
  <div>
    <echarts v-for="(item,index) in ind" :key="index" :ind="ind[index]" />
    <Button @click="add">添加</Button>
    <!-- <echarts :ind="ind[1]" :chartdata="data" />
    <echarts :ind="ind[2]" :chartdata="data" />-->
  </div>
</template>
<script>
import { echarts } from "@/api/mock";
export default {
  data() {
    return {
      ind: [],
    };
  },
  created() {
    // console.log(this.$route.query.inds);
    // this.ind = this.$route.query.inds;
  },
  mounted() {
    // console.log(this.$route.query.inds);
    this.ind = this.$route.query.inds;
  },
  methods: {
    add() {
      // console.log(this.ind.length);
      this.ind.push(-1);
    },
    // parentEvent1(data) {
    //   setTimeout(() => {
    //     // console.log(data);
    //     this.cityindex = [];
    //     for (let i = 0; i <= this.index; i++) {
    //       if (i == this.index) {
    //         this.cityindex.push(data);
    //       } else {
    //         this.cityindex.push("");
    //       }
    //     }
    //     // console.log(this.cityindex);
    //   }, 100);
    // },
    // parentEvent2(data) {
    // console.log(data);
    // this.data = [];
    // echarts(data).then(res => {
    //   // console.log(res);
    //   console.log(this.index);
    //   for (let i = 0; i <= this.index; i++) {
    //     if (i == this.index) {
    //       this.data[this.index] = res;
    //     }
    //   }
    //   console.log(this.data[this.index]);
    // });
    // },
    // parentindex(index) {
    //   console.log(index);
    //   this.index = index;
    // }
  },
};
</script>
<style scoped>
</style>