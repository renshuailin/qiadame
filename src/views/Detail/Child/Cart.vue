<template>
  <div class="shop-cart">
    <div class="cart-footer">
      <span class="cart-icon">
        <i class="fa fa-cart-plus"></i>
      </span>
      <div class="cart-info">
        <p class="cart-total">
          <span>￥0</span>
        </p>
        <p class="cart-delivery">另需配送费{{shopInfo.rst.float_delivery_fee}}元</p>
      </div>
      <button class="btn">
        <span>去结算</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Cart",
  props: {
    shopInfo: { type: Object }
  },
  computed: {
    isEmpty() {}
  }
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
  padding-left: 21.066667vw;
  background-color: rgba(61, 61, 63, 0.9);
  height: 12.8vw;
  z-index: 1000;
}
.cart-icon {
  position: absolute;
  left: 3.2vw;
  bottom: 2vw;
  width: 13.333333vw;
  height: 13.333333vw;
  box-sizing: border-box;
  border-radius: 100%;
  background-color: #3190e8;
  border: 1.333333vw solid #444;
  box-shadow: 0 -0.8vw 0.533333vw 0 rgba(0, 0, 0, 0.1);
}
.cart-icon > i {
  position: absolute;
  top: 7px;
  right: 0;
  bottom: 0;
  left: 7px;
  color: #fff;
  font-size: 1.6rem;
}
.cart-info {
  flex: 1;
}
.cart-total {
  font-size: 0.8rem;
  line-height: normal;
  color: #fff;
}
.cart-delivery {
  color: #999;
  font-size: 0.6rem;
}
.btn {
  height: 100%;
  width: 28vw;
  background-color: #38ca73;
  color: #fff;
  text-align: center;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 600;
  line-height: 12.8vw;
  border: none;
  outline: none;
}
</style>