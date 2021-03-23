<template>
  <i-link class="i-layout-header-logo" :class="{ 'i-layout-header-logo-stick': !isMobile }" to="/">
    <img class="img" src="@/assets/images/link.png" v-if="isMobile" />
    <img class="img" src="@/assets/images/link.png" v-else-if="headerTheme === 'light'" />
    <img class="img" src="@/assets/images/link.png" v-else />
  </i-link>
</template>
<script>
import { mapState } from "vuex";

export default {
  name: "iHeaderLogo",
  computed: {
    ...mapState("admin/layout", ["isMobile", "headerTheme"])
  }
};
</script>
<style  scoped>
.img {
  width: 80%;
  height: 70%;
}
</style>
