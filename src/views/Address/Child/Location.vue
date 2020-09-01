<template>
  <div class="location">
    <div class="title">当前定位</div>
    <div class="des">
      <i class="fa fa-location-arrow"></i>
      <span>{{ address }}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "Location",
  props: {
    address: {
      type: String,
    },
  },
};
</script>
<style scoped>
.location .title {
  margin: 10px 0;
  font-size: 12px;
}
.location .des i {
  color: #38c27e;
}
.location .des span {
  color: #333;
  font-weight: bold;
  margin-left: 5px;
  display: inline-block;
  width: 90%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
