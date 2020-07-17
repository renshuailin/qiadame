<template>
  <section class="index">
    <div class="shop-info" @click="$router.push('/detail')">
      <!-- 图片 -->
      <div class="logo">
        <img :src="merchant.image_path" alt />
      </div>
      <!-- 右 -->
      <div class="mian">
        <!-- brand -->
        <div class="brand">
          <i v-if="merchant.is_premium">品牌</i>
          <span>{{merchant.name}}</span>
        </div>
        <!-- ratestar -->
        <div class="rate">
          <div>
            <app-Rating :rating="merchant.rating" />
            <span class="score">{{merchant.rating}}</span>
            <span>月售{{merchant.recent_order_num}}单</span>
          </div>
          <div v-if="merchant.delivery_mode" class="delivery">
            <span class="icon">{{merchant.delivery_mode.text}}</span>
          </div>
        </div>
        <!-- money -->
        <div class="money">
          <div>
            <span>￥{{merchant.float_minimum_order_amount}}起送</span> |
            <span>配送费{{merchant.float_delivery_fee}}</span>
          </div>
          <div class="distance">
            <span>{{(merchant.distance/1000).toFixed(2)}}km</span> |
            <span>{{merchant.order_lead_time}}分钟</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
// 引入星星组件
import Rating from "../../common/Rating/Rating";
export default {
  name: "Shop",
  components: {
    "app-Rating": Rating
  },
  props: {
    merchant: {
      type: Object
    }
  }
};
</script>

<style scoped>
.index {
  background: #fff;
  color: #666;
  padding: 4vw 0;
  border-bottom: 0.133333vw solid #eee;
}
.shop-info {
  display: flex;
  justify-content: flex-start;
  padding: 0 2.666667vw;
  align-items: stretch;
}
.logo {
  width: 17.333333vw;
  height: 17.333333vw;
}
.logo img {
  display: block;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border: 0.133333vw solid rgba(0, 0, 0, 0.08);
  border-radius: 0.533333vw;
}
.mian {
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  flex-direction: column;
  padding-left: 2.666667vw;
  font-size: 0.5rem;
  flex-grow: 1;
}
.brand {
  align-items: center;
  color: #333;
  font-weight: 700;
  font-size: 0.9rem;
}
.brand i {
  background: #ffe800;
  margin-right: 1.333333vw;
  padding: 0.266667vw 0.666667vw;
  text-align: center;
  white-space: nowrap;
  font-size: 0.6rem;
}
.brand span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.rate {
  display: flex;
  align-items: center;
  overflow: hidden;
  justify-content: space-between;
}

.money {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.money .distance {
  color: #999;
}
.delivery {
  display: flex;
  align-items: center;
  font-size: 0.6rem;
  margin-left: 1.066667vw;
}
.delivery .icon {
  color: #fff;
  background-color: #2395ff;
  padding: 2px;
  box-sizing: border-box;
}
</style>

