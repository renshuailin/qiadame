<template>
  <div class="header">
    <!-- 左侧按钮 -->
    <div class="header-btn" v-show="isLeft">
      <i class="fa fa-chevron-left"></i>
      <button @click=" $router.go(-1)">返回</button>
    </div>
    <!-- 中间 -->
    <h1 class="header-title">{{title}}</h1>
  </div>
</template>
<script>
export default {
  name: "Header",
  props: {
    title: {
      type: String
    },
    isLeft: {
      type: Boolean,
      default: false
    }
  }
};
</script>
<style scoped>
.header {
  display: flex;
  align-items: center;
  background-color: #009eef;
  box-sizing: border-box;
  color: #fff;
  font-size: 16px;
  height: 45px;
  line-height: 1;
  padding: 0 10px;
  position: relative;
  text-align: center;
  white-space: nowrap;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 99;
}

.header-btn button {
  background-color: transparent;
  border: 0;
  box-shadow: none;
  color: inherit;
  display: inline-block;
  padding: 0;
  font-size: inherit;
  outline: none;
}

.header-title {
  flex: 1;
  width: 80%;
}
.is-left {
  text-align: left;
}
</style>