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
      <div class="search" @click="$router.push('/search')">
        <i class="fa fa-search"></i>
        搜索商家 商家名称
      </div>
    </div>
    <div id="container">
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
      <!-- 商家信息 -->
      <mt-loadmore
        :top-method="loadData"
        :bottom-method="loadMore"
        :bottom-all-loaded="allLoaded"
        :auto-fill="false"
        :bottomPullText="bottomPullText"
        ref="loadmore"
      >
        <div class="shop-list">
          <app-Shop v-for="(item,index) in merchant" :key="index" :merchant="item.restaurant" />
        </div>
      </mt-loadmore>
    </div>
  </div>
</template>
<script>
//使用轮播图组件
import { Swipe, SwipeItem, Loadmore } from "mint-ui";
//vuex
import { mapGetters } from "vuex";
//引入筛选选型卡
import Filter from "components/content/Filter/Filter";
//引入商家列表组件
import Shop from "components/content/Shop/Shop";

export default {
  name: "Home",
  data() {
    return {
      swipe: [],
      entries: [],
      filterData: null,
      showFilter: false,
      page: 1,
      size: 7,
      merchant: [],
      allLoaded: false,
      bottomPullText: "",
      data: null
    };
  },
  components: { "app-Filter": Filter, "app-Shop": Shop },
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
        }),
        this.loadData();
    },
    //切换
    showView(show) {
      this.showFilter = show;
    },
    update(data) {
      // console.log(data);
      this.data = data;
      this.loadData();
    },
    //
    loadData() {
      this.page = 1;
      this.allLoaded = false;
      this.bottomPullText = "上拉加载更多";
      // 获取商家信息
      this.$axios
        .post(`/api/profile/restaurants/${this.page}/${this.size}`, this.data)
        .then(res => {
          // console.log(res.data);
          this.merchant = res.data;
          //下拉刷新 停止收回
          this.$refs.loadmore.onTopLoaded();
        });
    },
    //上拉加载更多
    loadMore() {
      if (!this.allLoaded) {
        this.page++;
        this.$axios
          .post(`/api/profile/restaurants/${this.page}/${this.size}`)
          .then(res => {
            console.log(res.data);
            this.$refs.loadmore.onBottomLoaded();
            if (res.data.length > 0) {
              res.data.forEach(item => {
                this.merchant.push(item);
              });
              if (res.data < this.size) {
                // this.allLoaded = true;
                this.bottomPullText = "木有更多数据了";
              }
            } else {
              // 数据为空
              this.allLoaded = true;
              this.bottomPullText = "木有更多数据了";
            }
          });
      }
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
  display: flex;
  align-items: center;
}
.address i {
  margin: 0 3px;
  font-size: 18px;
}
.address span {
  display: inline-block;
  width: 90%;
  overflow: hidden;
  height: 15px;
  line-height: 15px;
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
  height: 47vw;
  text-align: center;
  overflow: hidden;
}
.food-classify {
  width: 20%;
  float: left;
  position: relative;
  margin-top: 3vw;
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
  font-size: 0.5rem;
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

/* 保持高度不变 */
.mint-loadmore {
  height: calc(100% - 122px);
  overflow: auto;
}
</style>
