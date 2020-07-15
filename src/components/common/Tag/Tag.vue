<template>
  <div class="tag">
    <span
      class="from-span"
      :class="{'checked':select==item}"
      v-for="(item,index) in tag"
      :key="index"
      @click="$emit('checkTag',item)"
    >{{item}}</span>
  </div>
</template>

<script>
export default {
  name: "Tag",
  props: {
    tag: { type: Array },
    select: { type: String }
  }
};
</script>

<style scoped>
.tag {
  flex: 1 1 0;
  padding: 2.666667vw 0;
  display: flex;
  align-items: center;
  border-top: 1px solid #eee;
}
.tag .from-span {
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 1.066667vw;
  font-size: 0.9rem;
  color: #666;
  line-height: 7.466667vw;
  width: 18.133333vw;
  margin-right: 2.666667vw;
  text-align: center;
}
.checked {
  color: #2395ff !important;
  background: #eef7ff !important;
  border-color: rgba(35, 149, 255, 0.18) !important;
}
</style>