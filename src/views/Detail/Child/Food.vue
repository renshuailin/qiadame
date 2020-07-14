<template>
  <transition name="fade">
    <div class="food" v-if="isshow">
      <div class="close" @click="$emit('close')">
        <img
          src="https://fuss10.elemecdn.com/8/ba/bcfa8cc62b20e044bd2ea1c1c7f3dpng.png?imageMogr/format/webp/"
        />
      </div>
      <div class="body">
        <div class="food-foodimg">
          <img :src="food.image_path" alt />
        </div>
        <div class="food-info">
          <h4>{{food.name}}</h4>
          <div class="food-sell">
            <span>月售{{food.month_sales}}</span>
            <span>好评率 {{food.satisfy_rate}}%</span>
          </div>
          <div class="food-price">
            <span>￥{{food.activity.fixed_price}}</span>
            <app-CartControl class="btn" :count="food" />
          </div>
          <p>{{food.description}}</p>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
// -+
import CartControl from "components/content/CartControl/CartControl";
export default {
  name: "Food",
  props: {
    food: { type: Object },
    isshow: { type: Boolean }
  },
  components: {
    "app-CartControl": CartControl
  }
};
</script>

<style scoped>
.food {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 100;
}
.close {
  width: 7.466667vw;
  height: 7.466667vw;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  z-index: 1;
  top: 2.133333vw;
  right: 4vw;
}
.close img {
  width: 5vw;
  height: 5vw;
}
.body {
  position: relative;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding-bottom: 20vw;
  box-sizing: border-box;
  overflow-x: hidden;
}
.food-foodimg {
  width: 100%;
  height: 100vw;
  display: block;
}
.food-foodimg img {
  width: 100%;
  height: 100%;
}
.food-info {
  padding: 4vw 4vw 0;
  width: 100%;
  min-height: 29.333333vw;
}
.food-info h4 {
  display: flex;
  align-items: center;
  margin-bottom: 2.4vw;
  font-size: 1.2rem;
  font-weight: 700;
  width: 74.666667vw;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.food-sell {
  font-size: 0.8rem;
  color: #666;
  line-height: 1;
  margin-bottom: 2.4vw;
}
.food-price {
  display: flex;
  align-items: center;
  margin-bottom: 2.4vw;
  position: relative;
}
.food-price > span {
  font-size: 1rem;
  line-height: 4.266667vw;
  color: #ff5339;
  padding-bottom: 0.933333vw;
  display: flex;
  align-items: baseline;
}
.food-price .btn {
  position: absolute;
  right: 8vw;
}
.food-info > p {
  font-size: 0.8rem;
  color: #666;
  line-height: 3.733333vw;
  padding-right: 8vw;
}

/* 动画 */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
  transform: translate(0, 0px);
}

.fade-enter,
.fade-leave-to {
  transform: translate(0, 600px);
}
</style>