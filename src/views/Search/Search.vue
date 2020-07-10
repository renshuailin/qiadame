<template>
  <div class="search">
    <app-Header :isLeft="true" title="搜索" />
    <div class="search-header">
      <form class="search-wrap">
        <i class="fa fa-search"></i>
        <input type="text" v-model="keyword" placeholder="商家/商品信息" />
        <button>搜索</button>
      </form>
    </div>
  </div>
</template>

<script>
//引入头部组件
import Header from "components/common/Header/Header";
export default {
  name: "Search",
  data() {
    return {
      keyword: "",
      result: null
    };
  },
  components: {
    "app-Header": Header
  },
  watch: {
    keyword() {
      this.change();
    }
  },
  methods: {
    change() {
      // console.log(this.keyword);
      this.$axios(`/api/profile/typeahead/${this.keyword}`)
        .then(res => (this.result = res.data))
        .catch(err => (this.result = null));
    }
  }
};
</script>

<style  scoped>
/* 头部 */
.search {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
}
.search-header {
  margin-top: 45px;
  background: #fff;
  padding: 0 4vw;
}
.search-header .search-wrap {
  padding: 3vw 3vw 3vw 0;
  display: flex;
  align-items: center;
  position: relative;
}
.search-wrap .fa-search {
  width: 3vw;
  height: 3vw;
  color: #888;
  position: absolute;
  top: 5vw;
  left: 3vw;
}
.search-wrap input {
  flex-grow: 1;
  border-radius: 0.266667vw;
  background-color: #f8f8f8;
  padding: 1.8vw 4vw 1.8vw 8.8vw;
  color: #666;
  outline: none;
  border: none;
}
.search-wrap button {
  outline: none;
  border: none;
  color: #333;
  font-size: 0.5rem;
  background: #fff;
  font-weight: 700;
  margin-left: 3vw;
  font-size: 14px;
}
</style>
