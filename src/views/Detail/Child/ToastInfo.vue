<template>
  <transition name="fade">
    <div class="toast" v-show="isShow">
      <div class="toast-modle">
        <h2>
          <i v-if="rst.is_premium">品牌</i>
          <span>{{rst.name}}</span>
        </h2>
        <ul>
          <li>
            <h3>{{rst.rating}}</h3>
            <p>评分</p>
          </li>
          <li>
            <h3>{{rst.recent_order_num}}</h3>
            <p>月售</p>
          </li>
          <li v-if="rst.delivery_mode">
            <h3>蜂鸟专送</h3>
            <p>约{{rst.order_lead_time}}分钟</p>
          </li>
          <li>
            <h3>￥{{rst.float_delivery_fee}}元</h3>
            <p>配送费</p>
          </li>
          <li>
            <h3>{{(rst.distance/1000).toFixed(1)}}km</h3>
            <p>距离</p>
          </li>
        </ul>
        <h3 class="promotion">
          <span>公告</span>
        </h3>
        <p class="promotion-info">{{rst.promotion_info}}</p>
      </div>
      <!-- 关闭 -->
      <div class="close" @click="$emit('close')">
        <img
          src="https://fuss10.elemecdn.com/8/ba/bcfa8cc62b20e044bd2ea1c1c7f3dpng.png?imageMogr/format/webp/"
        />
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "ToastInfo",
  props: {
    rst: {
      type: Object
    },
    isShow: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style scoped>
.toast {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: rgba(0, 0, 0, 0.5);
  z-index: 99;
}
.toast-modle {
  position: relative;
  width: 80%;
  max-height: 85vw;
  padding: 7vw 7vw 7vw;
  border-radius: 1vw;
  overflow: hidden;
  background: #fff;
  z-index: 100;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}
.toast-modle h2 {
  font-size: 1rem;
  line-height: 7vw;
  color: #333;
  text-align: center;
  font-weight: bolder;
}
.toast-modle h2 i {
  position: relative;
  top: -0.5vw;
  margin-right: 1.5vw;
  border-radius: 0.2vw;
  background-image: linear-gradient(90deg, #fff100, #ffe339);
  color: #6a3709;
  font-style: normal;
  padding: 1vw;
  font-weight: 700;
  font-size: 1rem;
}
.toast-modle ul {
  display: flex;
  margin: 5vw -6vw 0;
}
.toast-modle ul li {
  flex: 1;
  text-align: center;
}
.toast-modle ul li h3 {
  font-size: 0.8rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 1.6vw;
}
.toast-modle ul li p {
  font-size: 0.3rem;
  color: #999;
}
.toast-modle .promotion {
  position: relative;
  text-align: center;
  margin: 5vw auto 2.5vw;
  width: 20vw;
  background-image: linear-gradient(90deg, #fff, #333 50%, #fff);
  background-size: 100% 1px;
  background-position: 50%;
  background-repeat: no-repeat;
}
.toast-modle .promotion span {
  font-size: 0.8rem;
  padding: 0 1vw;
  color: #999;
  background-color: #fff;
}
.promotion-info {
  font-size: 0.8rem;
  line-height: 1.5;
  color: #333;
  max-height: 25vw;
  overflow-y: auto;
}
.close {
  margin-top: 8vw;
  width: 8vw;
  height: 8vw;
}
.close img {
  width: 100%;
  height: 100%;
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

