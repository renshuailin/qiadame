<template>
  <div class="home">
    <div class="header">
      <div class="address" @click="$router.push({name:'address',params:{city:city}})">
        <i class="fa fa-map-marker"></i>
        <span>{{ address }}</span>
        <i class="fa fa-sort-desc"></i>
      </div>
      <div class="search">
        <i class="fa fa-search"></i>
        搜索商家 商家名称
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "home",
  computed: {
    ...mapGetters(["address", "location"]),
    city() {
      return (
        this.location.addressComponent.city ||
        this.location.addressComponent.province
      );
    }
  }
};
</script>
<style scoped>
.home {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
}
.header {
  background-color: #009eef;
  padding: 16px;
}
.header .address {
  color: #fff;
  font-weight: bold;
}
.address i {
  margin: 0 3px;
  font-size: 18px;
}
.address span {
  display: inline-block;
  width: 90%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.header .search {
  margin-top: 10px;
  background-color: #fff;
  padding: 10px 0;
  border-radius: 4px;
  text-align: center;
  color: #aaa;
}
</style>
