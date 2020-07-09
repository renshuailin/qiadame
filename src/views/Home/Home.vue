<template>
  <div class="home">
    <div class="header">
      <div class="address" @click="$router.push({ name: 'address', params: { city: city } })">
        <i class="fa fa-map-marker"></i>
        <span>{{ address }}</span>
        <i class="fa fa-sort-desc"></i>
      </div>
    </div>
    <div class="search-warp" :class="{fixed:showFilter}">
      <div class="search">
        <i class="fa fa-search"></i>
        搜索商家 商家名称
      </div>
    </div>
    <div id="container" style="height:1000px">
      <!-- 轮播图 -->
      <mt-swipe :auto="4000" class="swipe">
        <mt-swipe-item v-for="(item, index) in swipe" :key="index">
          <img :src="item" />
        </mt-swipe-item>
      </mt-swipe>
      <!-- 分类 -->
      <mt-swipe :auto="0" class="entries">
        <mt-swipe-item v-for="(item, index) in entries" :key="index" class="entries-wrap">
          <div class="food-classify" v-for="(item, index) in item" :key="index">
            <div class="img-wrap">
              <img :src="item.image" />
            </div>
            <span>{{ item.name }}</span>
          </div>
        </mt-swipe-item>
      </mt-swipe>
      <!-- 推荐商家 -->
      <div class="shoplist">推荐商家</div>
      <!-- 筛选选项卡 -->
      <app-Filter :filterData="filterData" @searchFixd="showView" @update="update" />
    </div>
  </div>
</template>
<script>
//使用轮播图组件
import { Swipe, SwipeItem } from "mint-ui";
//vuex
import { mapGetters } from "vuex";
//引入筛选选型卡
import Filter from "./Child/Filter";

export default {
  name: "Home",
  data() {
    return {
      swipe: [],
      entries: [],
      filterData: null,
      showFilter: false
    };
  },
  components: { "app-Filter": Filter },
  computed: {
    ...mapGetters(["address", "location"]),
    city() {
      return (
        this.location.addressComponent.city ||
        this.location.addressComponent.province
      );
    }
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.$axios("/api/profile/shopping").then(res => {
        this.swipe = res.data.swipeImgs;
        // console.log(res);
        this.entries = res.data.entries;
      }),
        this.$axios("/api/profile/filter").then(res => {
          // console.log(res.data);
          this.filterData = res.data;
        });
    },
    //切换
    showView(show) {
      this.showFilter = show;
    },
    update(data) {
      console.log(data);
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
.header,
.search-warp {
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
.search-warp .search {
  margin-top: 10px;
  background-color: #fff;
  padding: 10px 0;
  border-radius: 4px;
  text-align: center;
  color: #aaa;
}
.search-warp {
  position: sticky;
  top: 0;
  z-index: 99;
  box-sizing: border-box;
}
/* 轮播 */
.swipe {
  height: 100px;
}
.swipe img {
  width: 100%;
  height: 100px;
  display: inline-block;
  touch-action: none;
}
/* 分类 */
.entries {
  background: #fff;
  height: 47.2vw;
  text-align: center;
  overflow: hidden;
}
.food-classify {
  width: 20%;
  float: left;
  position: relative;
  margin-top: 2.933333vw;
}
.food-classify .img-wrap {
  position: relative;
  display: inline-block;
  width: 12vw;
  height: 12vw;
}
.img-wrap img {
  width: 100%;
  height: 100%;
}
.food-classify span {
  display: block;
  color: #666;
  font-size: 0.32rem;
}
/* 推荐商家 */
.shoplist {
  display: flex;
  align-items: flex;
  justify-content: center;
  height: 9.6vw;
  line-height: 9.6vw;
  font-size: 16px;
  color: #333;
  background: #fff;
}
.shoplist:after,
.shoplist:before {
  display: block;
  content: "----";
  width: 7vw;
  height: 0.5vw;
  /* margin-right: -1px; */
  color: #999;
}
.shoplist:before {
  margin-right: 3.5vw;
}
.shoplist:after {
  margin-left: 3.5vw;
}
.fixed {
  position: fixed;
  width: 100%;
  top: 0;
  /* z-index: 99; */
}
</style>
