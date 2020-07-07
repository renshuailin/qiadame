<template>
  <div class="area">
    <ul class="area-list" v-for="(item, index) in list" :key="index">
      <li @click="selectAddress(item)">
        <h4>{{ item.name }}</h4>
        <p>{{ item.district }}{{ item.address }}</p>
      </li>
    </ul>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "Area",
  props: {
    list: { type: Array }
  },
  methods: {
    //解构
    ...mapActions(["setAddress"]),
    selectAddress(item) {
      this.setAddress(item.district + item.address + item.name);

      //设置地址

      this.$router.push("/home");
    }
  }
};
</script>
<style scoped>
.area {
  margin-top: 16px;
  background: #fff;
}
.area li {
  border-bottom: 1px solid #eee;
  padding: 8px 16px;
  color: #aaa;
}
.area li h4 {
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
}
</style>
