<template>
  <div class="search">
    <app-Header :isLeft="true" title="搜索" />
    <div class="search-header">
      <form class="search-wrap">
        <i class="fa fa-search"></i>
        <input type="text" v-model="keyword" placeholder="商家/商品信息" />
        <button @click.prevent="search">搜索</button>
      </form>
    </div>
    <!-- 商家列表 -->
    <div class="shop" v-if="result&& !isShow">
      <div class="empty" v-if="empty">
        <img src="https://fuss10.elemecdn.com/d/60/70008646170d1f654e926a2aaa3afpng.png" alt />
        <div class="empty-txt">
          <h4>附近没有搜索结果</h4>
          <span>换个关键词试试吧</span>
        </div>
      </div>
      <div v-else>
        <app-searchIndex @click="$router.push('/detail')" :data="result.restaurants" />
        <app-searchIndex @itemclick="shopItemClick" :data="result.words" />
      </div>
    </div>
    <div class="container" v-if="isShow">
      <!-- 筛选选项卡 -->
      <app-Filter :filterData="filterData" @update="update" />
      <ul
        v-infinite-scroll="loadMore"
        :infinite-scroll-disabled="loading"
        infinite-scroll-distance="0"
      >
        <app-Shop v-for="(item,index) in merchant" :key="index" :merchant="item.restaurant" />
      </ul>
      <!-- <div class="shop-list" v-infinite-scroll="loadMore" :infinite-scroll-disabled="loading"></div> -->
    </div>
  </div>
</template>

<script>
//引入头部组件
import Header from "components/common/Header/Header";
//引入搜索列表
import searchIndex from "components/content/searchIndex/searchIndex";
//引入筛选选型卡
import Filter from "components/content/Filter/Filter";
//引入商家列表组件
import Shop from "components/content/Shop/Shop";
//
import { InfiniteScroll } from "mint-ui";
export default {
  name: "Search",
  data() {
    return {
      keyword: "",
      result: null,
      empty: false,
      isShow: false,
      filterData: null,
      page: 1,
      size: 7,
      merchant: [],
      loading: true,
      data: null
    };
  },
  created() {
    this.$axios("/api/profile/filter").then(res => {
      // console.log(res.data);
      this.filterData = res.data;
    });
  },

  components: {
    "app-Header": Header,
    "app-searchIndex": searchIndex,
    "app-Filter": Filter,
    "app-Shop": Shop
  },
  watch: {
    keyword() {
      this.isShow = false;
      this.empty = false;
      this.change();
    }
  },
  methods: {
    change() {
      // console.log(this.keyword);
      this.$axios(`/api/profile/typeahead/${this.keyword}`)
        .then(res => (this.result = res.data))
        .catch(err => (this.result = null));
    },
    search() {
      if (!this.keyword) {
        return;
      }
      if (
        (this.keyword && this.result.restaurants.length > 0) ||
        this.result.words.length > 0
      ) {
        // console.log();
        this.isShow = true;
      } else {
        this.empty = true;
      }
    },
    // 点击商品
    shopItemClick() {
      this.isShow = true;
    },
    update(data) {
      // console.log(data);
      this.data = data;
      this.shopItemClick(); // this.loadData();
    },
    loadMore() {
      // console.log(1);
      this.page++;
      this.$axios
        .post(`/api/profile/restaurants/${this.page}/${this.size}`, this.data)
        .then(res => {
          // console.log(res.data);
          if (res.data.length > 0) {
            res.data.forEach(item => {
              this.merchant.push(item);
            });
          } else {
            // console.log(33);
            this.loading = true;
          }

          //下拉刷新 停止收回
        });
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

/* / */
.shop {
  width: 100%;
  height: calc(100% - 95px);
  overflow: auto;
}

/* 搜索不到 */
.empty {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #fff;
  display: flex;
  justify-content: center;
}
.empty img {
  width: 35vw;
  height: 35vw;
}
.empty-txt h4 {
  color: #666;
  font-size: 1rem;
  margin: 12vw 0 2vw 0;
}
.empty-txt span {
  color: #999;
  font-size: 0.8rem;
}
.filter {
  background: #fff;
  position: -webkit-sticky;
  position: sticky;
  top: 45px;
  z-index: 10;
}
</style>
