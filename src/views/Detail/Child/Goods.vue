<template>
  <div class="goods" v-if="shopInfo">
    <div class="recommend" v-for="(item,index) in shopInfo.recommend" :key="index">
      <p class="name">{{item.name}}</p>
      <div class="wrap">
        <ul>
          <li v-for="(item,index) in item.items" :key="index">
            <img :src="item.image_path" alt />
            <div class="food">
              <p class="food-name">{{item.name}}</p>
              <p class="food-sell">月售{{item.month_sales}} 好评率{{item.satisfy_rate}}</p>
            </div>
            <div class="price">
              <p>￥{{item.activity.fixed_price}}</p>
              <app-CartControl :count="item" />
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
 
<script>
//引入-+计数组件
import CartControl from "components/content/CartControl/CartControl";
export default {
  name: "page-navbar",
  props: {
    shopInfo: {
      type: Object
    }
  },
  components: {
    "app-CartControl": CartControl
  }
};
</script>

<style scoped>
.recommend {
  padding-top: 4vw;
  background-color: #fff;
}
.name {
  padding-left: 4vw;
  color: #333;
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 2.5vw;
}
.wrap {
  overflow-x: scroll;
  display: flex;
  width: 100%;
  height: 100%;
}
.wrap ul {
  display: flex;
  padding-left: 4vw;
}
.wrap ul li {
  flex: none;
  width: 32vw;
  margin-right: 2.5vw;
}
.wrap li img {
  display: block;
  width: 32vw;
  height: 32vw;
  border-top-left-radius: 0.8vw;
  border-top-right-radius: 0.8vw;
  max-width: 100%;
}
.food .food-name {
  color: #333;
  font-size: 0.8rem;
  margin: 2vw 0 1vw;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.food .food-sell {
  color: #999;
  font-size: 0.5rem;
  margin-bottom: 2vw;
  min-height: 1em;
}
.price {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 0.25vw;
}
.price p {
  font-size: 1rem;
  color: #ff5339;
}

::-webkit-scrollbar {
  width: 0 !important;
}
</style>

