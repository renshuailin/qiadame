<template>
  <!-- 判断加载数据显示 -->
  <div class="alpha" ref="scroll" v-if="cityInfo">
    <div class="scroll">
      <!-- 热门城市 -->
      <div class="hot cityList">
        <div class="title">热门城市</div>
        <ul class="hot-city ">
          <li
            @click="$emit('selectCity', item)"
            v-for="(item, index) in cityInfo.hotCities"
            :key="index"
          >
            {{ item.name }}
          </li>
        </ul>
      </div>
      <!-- 所有城市 -->
      <div class="all-city">
        <!-- 遍历所有城市 -->
        <div
          class="content cityList"
          v-for="(item, index) in keys"
          :key="index"
        >
          <div class="title">{{ item }}</div>
          <!-- 根据字母展示所有文字 -->
          <ul>
            <li
              @click="$emit('selectCity', city)"
              v-for="(city, index) in cityInfo[item]"
              :key="index"
            >
              {{ city.name }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="area-key">
      <ul>
        <li @click="selectIndex(0)">#</li>
        <li
          @click="selectIndex(index + 1)"
          v-for="(item, index) in keys"
          :key="index"
        >
          {{ item }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
//引入better-scroll
import BScroll from "better-scroll";
export default {
  name: "Alpha",
  props: {
    cityInfo: {
      type: Object
    },
    keys: {
      type: Array
    }
  },
  data() {
    return { scroll: null };
  },
  methods: {
    initScroll() {
      this.scroll = new BScroll(this.$refs.scroll, { click: true });
    },
    selectIndex(index) {
      //获取到所有cityList元素
      // console.log(this.$refs.scroll.getElementsByClassName("cityList"));
      const cityList = this.$refs.scroll.getElementsByClassName("cityList");
      //根据下标滚动指定对应元素
      let el = cityList[index];
      //滚动动到相对应位置
      this.scroll.scrollToElement(el, 500);
    }
  }
};
</script>
<style scoped>
.alpha {
  margin-top: 10px;
  box-sizing: border-box;
  padding: 0 16px;
  background: #fff;
  height: calc(100% - 65px);
  overflow: hidden;
}
.scroll {
  background: #fff;
  overflow: auto;
}
.title {
  color: #aaa;
  padding: 15px 0;
}
.hot-city {
  padding: 0 16px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.hot-city li {
  width: 30%;
  background: #f1f1f1;
  margin: 0 10px 10px 0;
  text-align: center;
  padding: 10px;
  box-sizing: border-box;
}
.content li {
  padding: 10px;
  border-bottom: 1px solid #eee;
}
.area-key {
  position: fixed;
  right: 0;
  top: 20%;
  color: #aaa;
  font-size: 12px;
  line-height: 1.6;
  text-align: center;
  padding: 0 5px;
  z-index: 9;
}
</style>
