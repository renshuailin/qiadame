<template>
  <div class="tab">
    <div v-for="(item,index) in title" :key="index" @click="itemClick(index)">
      <span :class="{active:index===currentIndex}">{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      currentIndex: 0,
    };
  },
  props: {
    title: {
      type: Array,
    },
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      this.$emit("tabclick", index);
    },
  },
};
</script>

<style scoped>
.tab {
  display: flex;
  text-align: center;
}
.tab > div {
  flex: 1;
  height: 40px;
  line-height: 40px;
  font-size: 15px;
  background-color: #fff;
}
span {
  padding: 3px 10px;
}
.active {
  border-bottom: 2px solid #38c27e;
}
</style>