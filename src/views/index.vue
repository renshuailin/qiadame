<template>
  <div class="index">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>

    <app-TabBars :data="tabbarData" />
  </div>
</template>
<script>
import TabBars from "../components/common/TabBar/TabBar";
export default {
  name: "index",
  components: { "app-TabBars": TabBars },
  data() {
    return {
      tabbarData: [
        { title: "首页", icon: "home", path: "/home" },
        { title: "订单", icon: "file-text-o", path: "/order" },
        { title: "我的", icon: "user", path: "/me" }
      ]
    };
  }
};
</script>
<style scoped>
.index {
  width: 100%;
  height: calc(100% - 45px);
}
</style>
