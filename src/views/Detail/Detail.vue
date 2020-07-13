<template>
  <div class="detail" v-if="detailInfo">
    <!-- 头 -->
    <nav class="header">
      <div class="nav-bg">
        <img :src="detailInfo.rst.scheme" alt />
      </div>
      <div class="nav-back">
        <i class="fa fa-chevron-left" @click="$router.go(-1)"></i>
      </div>
      <div class="shop-img">
        <img :src="detailInfo.rst.image_path" />
      </div>
    </nav>
    <!-- 信息 -->
    <div class="rst">
      <div class="rst-name">
        <span @click="isShow=true">{{detailInfo.rst.name}}</span>
        <i class="fa fa-caret-right"></i>
      </div>
      <!-- 弹窗 -->
      <app-ToastInfo :rst="detailInfo.rst" :isShow="isShow" @close="isShow=false" />
      <!-- 信息 -->
      <div class="rst-order">
        <span>评分{{detailInfo.rst.rating}}</span>
        <span>月售{{detailInfo.rst.recent_order_num}}</span>
        <span>蜂鸟专送约{{detailInfo.rst.order_lead_time}}分钟</span>
      </div>
      <!-- 优惠 -->
      <app-Active :active="detailInfo.rst.activities" />
      <!-- 公告 -->
      <p class="rst-notice">公告:{{detailInfo.rst.promotion_info}}</p>
    </div>
    <!-- 导航 -->
    <mt-navbar class="page-part" v-model="selected" :fixed="true">
      <mt-tab-item id="1">点餐</mt-tab-item>
      <mt-tab-item id="2">评价</mt-tab-item>
      <mt-tab-item id="3">商家</mt-tab-item>
    </mt-navbar>

    <!-- 点餐 -->

    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1">
        <app-Goods :shopInfo="detailInfo" />
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <app-Comment />
      </mt-tab-container-item>
      <mt-tab-container-item id="3">
        <app-Seller />
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
//
import { Navbar, TabItem } from "mint-ui";
// 引入弹窗
import ToastInfo from "./Child/ToastInfo";
//优惠
import Active from "./Child/Active";
//导航
// import Navbar from "../../components/common/Navbar/Navbar";
//点餐
import Goods from "./Child/Goods";
//评价
import Comment from "./Child/Comment";
//s商家
import Seller from "./Child/Seller";

export default {
  name: "Detail",
  data() {
    return {
      detailInfo: null,
      isShow: false,
      selected: "1"
    };
  },
  components: {
    "app-ToastInfo": ToastInfo,
    "app-Active": Active,
    // "app-Navbar": Navbar,
    "app-Goods": Goods,
    "app-Comment": Comment,
    "app-Seller": Seller
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.$axios(`/api/profile/batch_shop`).then(res => {
        // console.log(res);
        // 增加一个count记录个数
        res.data.recommend.forEach(item => {
          item.items.forEach(item => {
            item.count = 0;
          });
        });
        this.detailInfo = res.data;
      });
    }
  }
};
</script>

<style  scoped>
.detail {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
}
.header {
  position: relative;
}
.nav-bg {
  width: 100%;
  height: 27vw;
}
.nav-bg img {
  height: 100%;
  width: 100%;
  display: inline-block;
}
.nav-back {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 27vw;
  background: rgba(0, 0, 0, 0.5);
}
.nav-back i {
  color: #fff;
  font-size: 1.5rem;
  margin-left: 5vw;
  margin-top: 5vw;
}
.shop-img {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 12vw;
  box-shadow: 0 0vw 5vw 0 #ccc;
  border-radius: 1vw;
}
.shop-img img {
  width: 20vw;
  height: 20vw;
  border-radius: 1vw;
}

/* 弹窗 */

.rst {
  padding: 8vw 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  box-shadow: inset 0 -0.5vw 0.5vw hsla;
}
.rst .rst-name {
  flex: 1;
  width: 72vw;
  font-size: 1rem;
  font-weight: 600;
  white-space: nowrap;
  padding-right: 2.5vw;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1.5vw 0;
}
.rst-name span {
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
}
/* 信息 */
.rst .rst-order {
  white-space: nowrap;
  height: 3.2vw;
  margin-top: 1.8vw;
  color: #666;
  text-align: center;
  font-size: 0.6rem;
}
.rst-order span {
  margin: 0 3px;
}
.rst .rst-notice {
  width: 80vw;
  font-size: 0.6rem;
  color: #999;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 2.5vw auto 2.5vw;
  padding: 0;
  white-space: nowrap;
  text-align: center;
}
/* 选项卡 */
.mint-navbar .mint-tab-item.is-selected {
  /* background-color: aquamarine; */
  margin-bottom: 0;
}
.page-part {
  font-size: 14px !important;
  color: #333;
  position: sticky;
  top: 0px;
  z-index: 9;
}
.mint-tab-container {
  position: relative;
  height: calc(100% - -40vw);
}
</style>
