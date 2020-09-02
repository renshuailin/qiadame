<template>
  <div class="shop-cart">
    <transition name="fade">
      <div class="mask" @click.self="isshowMask=false" v-if="isshowMask && !isEmpty">
        <div class="cart-body">
          <div class="cart-header">
            <span>已选择</span>
            <button @click="clear">
              <i class="fa fa-trash-o"></i>
              <span>清空</span>
            </button>
          </div>
          <div class="list-cart">
            <ul class="list-cartlist">
              <li class="list-item" v-for="(item,index) in selectFood" :key="index">
                <h4>
                  <span>{{item.name}}</span>
                </h4>
                <span class="list-price">{{item.activity.fixed_price}}</span>
                <app-CartControl :count="item" />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </transition>
    <div class="cart-footer" :class="{'empty':isEmpty}">
      <span class="cart-icon" @click="isshowMask=!isshowMask">
        <i class="fa fa-cart-plus"></i>
        <span v-if="totalCount">{{totalCount}}</span>
      </span>
      <div class="cart-info" @click="isshowMask=!isshowMask">
        <p class="cart-total">
          <span v-if="isEmpty">未选购商品</span>
          <span v-else>￥{{totalPirce.toFixed(2)}}</span>
        </p>
        <p class="cart-delivery">另需配送费{{shopInfo.rst.float_delivery_fee}}元</p>
      </div>
      <button class="btn">
        <span v-if="isEmpty">￥{{shopInfo.rst.float_minimum_order_amount}}起送</span>
        <span v-else @click="settlement">去结算</span>
      </button>
    </div>
  </div>
</template>

<script>
// 引入数量控制
import CartControl from "components/content/CartControl/CartControl";
export default {
  name: "Cart",
  components: { "app-CartControl": CartControl },
  data() {
    return {
      totalCount: 0,
      totalPirce: 0,
      selectFood: [],
      isshowMask: false,
    };
  },
  props: {
    shopInfo: { type: Object },
  },
  methods: {
    // 清空
    clear() {
      this.shopInfo.recommend.forEach((recommend) => {
        recommend.items.forEach((item) => {
          item.count = 0;
        });
      });
      this.shopInfo.menu.forEach((menu) => {
        menu.foods.forEach((item) => {
          item.count = 0;
        });
      });
    },
    //结算
    settlement() {
      this.$store.dispatch("setOrederInfo", {
        shopInfo: this.shopInfo.rst,
        selectFood: this.selectFood,
      });
      this.$router.push("/settlement");
    },
  },

  computed: {
    isFiexd() {},
    isEmpty() {
      let empty = true;
      this.totalCount = 0;
      this.totalPirce = 0;
      // this.select = [];
      this.selectFood = [];
      this.shopInfo.recommend.forEach((recommend) => {
        recommend.items.forEach((item) => {
          if (item.count) {
            empty = false;
            this.totalPirce += item.activity.fixed_price * item.count;
            this.totalCount += item.count;
            // console.log(item.name);
            this.selectFood.push(item);

            // console.log(this.selectFood);

            // console.log(item);
          }
        });
      });
      this.shopInfo.menu.forEach((menu) => {
        menu.foods.forEach((item) => {
          if (item.count) {
            this.totalCount += item.count;
            this.totalPirce += item.activity.fixed_price * item.count;
            this.selectFood.push(item);
            empty = false;
          }
        });
      });
      return empty;
    },
  },
};
</script>

<style scoped>
.cart-footer {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  padding-left: 21vw;
  background-color: rgba(61, 61, 63, 0.9);
  height: 13vw;
  z-index: 1000;
}
.cart-icon {
  position: absolute;
  left: 3.2vw;
  bottom: 2vw;
  width: 13vw;
  height: 13vw;
  box-sizing: border-box;
  border-radius: 100%;
  background-color: #38c27e;
  border: 1vw solid #444;
  box-shadow: 0 -1vw 0.5vw 0 rgba(0, 0, 0, 0.1);
}
.cart-icon > i {
  position: absolute;
  top: 7px;
  right: 0;
  bottom: 0;
  left: 7px;
  color: #fff;
  font-size: 1.5rem;
}
.cart-info {
  flex: 1;
}
.cart-total {
  font-size: 1rem;
  line-height: normal;
  color: #fff;
}
.cart-delivery {
  color: #999;
  font-size: 0.5rem;
}
.btn {
  height: 100%;
  width: 28vw;
  background-color: #38ca73;
  color: #fff;
  text-align: center;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 600;
  line-height: 13vw;
  border: none;
  outline: none;
}
/* 购物车 选中样式 */
.empty > span {
  background-image: radial-gradient(circle, #363636 6vw, #444 0);
}
.empty > span > i {
  color: #606065 !important;
}
.empty .bottomNav-carttotal > span {
  color: #999;
}
.empty .btn {
  background-color: #535356 !important;
}
/* 购物车数量 选中样式 */
.cart-icon > span {
  width: 15px;
  height: 15px;

  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: -1.2vw;
  top: -1.3vw;
  line-height: 1;
  background-image: linear-gradient(-90deg, #ff7416, #ff3c15 98%);
  color: #fff;
  border-radius: 15px;
  /* padding: 1vw 1.3vw; */
  font-size: 0.7rem;
}
/* 选中商品遮罩 */
.mask {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 200;
}
.cart-body {
  position: fixed;
  left: 0;
  width: 100%;
  background-color: #fff;
  bottom: 13vw;
  z-index: 201;
  opacity: 1;
  font-size: 1rem;
}
.cart-header {
  display: flex;
  align-items: center;
  padding: 0 4vw;
  border-bottom: 0.13vw solid #ddd;
  background-color: #eceff1;
  color: #666;
  height: 10vw;
}
.cart-header > span {
  flex: 1;
  display: flex;
  align-items: center;
}
.cart-header > button {
  border: none;
  outline: none;
  flex: none;
  display: flex;
  align-items: center;
  padding-left: 4vw;
  color: #666;
  text-decoration: none;
  font-size: 1rem;
  line-height: 4vw;
  background: none;
}
.cart-header > button > span {
  margin-left: 1vw;
}
.list-cart {
  overflow: auto;
  max-height: 80vw;
}
.list-item {
  border-bottom: 0.15vw solid #eee;
  display: flex;
  align-items: center;
  padding: 2vw 3vw 2vw 0;
  min-height: 13vw;
  margin-left: 3vw;
}
.list-item > h4 {
  flex: 5.5;
  line-height: normal;
}
.list-item > h4 > span {
  display: inline-block;
  font-style: normal;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: middle;
  max-width: 45vw;
}
.list-price {
  color: rgb(255, 83, 57);
  flex: 2.5;
  text-align: left;
  white-space: nowrap;
  font-weight: 700;
}
.list-price::before {
  content: "\A5";
  font-size: 0.5rem;
  color: currentColor;
}
/* 动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease-out;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>