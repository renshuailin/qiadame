<template>
  <div class="active">
    <div class="txt">
      <span :style="{'background-color':'#'+active[0].icon_color}">{{active[0].icon_name}}</span>
      <span>{{active[0].description}}</span>
    </div>
    <div class="count" @click="isActive=true">
      <span>{{active.length}}个优惠</span>
      <i class="fa fa-caret-down"></i>
    </div>
    <!-- 弹窗 -->
    <transition name="fade">
      <div class="model" v-show="isActive " @click="isActive=false">
        <div class="sheet">
          <i class="fa fa-remove" @click="isActive=false"></i>
          <h2>优惠活动</h2>
          <ul>
            <li v-for="(item,index) in active" :key="index">
              <span :style="{'background-color':'#'+item.icon_color}">{{item.icon_name}}</span>
              <span>{{item.description}}</span>
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "Active",
  props: {
    active: {
      type: Array
    }
  },
  data() {
    return {
      isActive: false
    };
  }
};
</script>

<style scoped>
.active {
  display: flex;
  justify-content: space-between;
  color: #333;
  margin: 3.2vw auto 0;
  align-items: center;
  font-size: 0.6rem;
  width: 80vw;
}

.txt span:first-child {
  color: #fff;
  height: 4.5vw;
  line-height: 3.5vw;
  font-size: 0.6rem;
  padding: 0.5vw 1.2vw;
  margin-right: 1.6vw;
  display: inline-block;
  box-sizing: border-box;
  border-radius: 0.5vw;
}
.count {
  text-align: right;
  color: #999;
}
.count span {
  margin-right: 1vw;
}
/* 优惠 */
.model {
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
.sheet {
  position: absolute;
  background-color: #f5f5f5;
  box-shadow: 0 -1px 5px 0 rgba(0, 0, 0, 0.4);
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: 5.333333vw 6.933333vw;
  box-sizing: border-box;
}
.sheet h2 {
  text-align: center;
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 4.133333vw;
}
.sheet ul {
  height: 50.8vw;
  overflow-y: scroll;
}
.sheet ul li {
  margin-bottom: 3.066667vw;
  display: flex;
  font-size: 0.82rem;
  align-items: center;
}
.sheet ul li span:first-child {
  height: 4.266667vw;
  padding: 0.533333vw 1.6vw;
  margin-right: 1.6vw;
  display: inline-block;
  box-sizing: border-box;
  border-radius: 0.266667vw;
  color: #fff;
  white-space: nowrap;
}
.sheet ul li span:last-child {
  line-height: 1.38;
  flex: 1;
}
.fa-remove {
  position: absolute;
  font-size: 1.4rem;
  right: 2.666667vw;
  top: 2.666667vw;
  z-index: 1002;
  color: #888;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease-out;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>