<template>
  <div class="goods" v-if="shopInfo">
    <!-- 商家推荐 -->
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
    <!-- 商品分类 -->
    <div class="menu">
      <!-- 左 -->
      <div class="menu-warp" ref="menu">
        <ul>
          <li
            :class="{'current':currentIndex===index}"
            @click="selectMenu(index)"
            v-for="(item,index) in shopInfo.menu"
            :key="index"
          >
            <img :src="item.icon_url" v-if="item.icon_url" />
            <span>{{item.name}}</span>
          </li>
        </ul>
      </div>
      <!-- 右 -->
      <div class="food-warp" ref="food">
        <ul>
          <li v-for="(item,index) in shopInfo.menu" :key="index" class="food-list">
            <!-- 上 -->
            <div class="cart">
              <strong>{{item.name}}</strong>
              <span>{{item.description}}</span>
            </div>
            <!-- 下 -->
            <div class="food-detail" v-for="(food,index) in item.foods" :key="index">
              <img :src="food.image_path" @click="handle(food)" />
              <section class="food-info">
                <h4>{{food.name}}</h4>
                <p class="des">{{food.description}}</p>
                <p class="sell">月售{{food.month_sales}}份 好评率{{food.satisfy_rate}}</p>
                <div class="food-price">
                  <span class="price">¥{{food.activity.fixed_price}}</span>
                  <app-CartControl :count="food" />
                </div>
              </section>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!-- 购物车 -->
    <app-Cart :shopInfo="shopInfo" />
    <!-- 商品详情 -->
    <app-Food :food="selectFood" :isshow="isshow" @close="isshow=false" />
  </div>
</template>
 
<script>
//引入-+计数组件
import CartControl from "components/content/CartControl/CartControl";
//引入bs
import BScroll from "better-scroll";
//购物车
import Cart from "./Cart";
// 点击详情
import Food from "./Food";
export default {
  name: "page-navbar",
  props: {
    shopInfo: {
      type: Object
    }
  },
  data() {
    return {
      menu: {},
      food: {},
      srcollY: 0,
      listHeight: [],
      selectFood: null,
      isshow: false
    };
  },
  computed: {
    currentIndex() {
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i];
        let height2 = this.listHeight[i + 1];
        if (!height2 || (this.srcollY >= height1 && this.srcollY < height2)) {
          return i;

          // console.log(i);
        }
        // if (this.srcollY >= 19690) {
        //   return 11;
        // }
      }
      return 0;
    }
  },
  methods: {
    handle(food) {
      this.selectFood = food;
      this.isshow = true;
    },
    selectMenu(index) {
      // console.log(index);
      let list = this.$refs.food.getElementsByClassName("food-list");
      let el = list[index];
      // console.log(el);
      this.food.scrollToElement(el, 500);
    },
    calculateHeight() {
      let list = this.$refs.food.getElementsByClassName("food-list");
      let height = 0;
      this.listHeight.push(height);
      for (let i = 0; i < list.length - 1; i++) {
        let item = list[i];
        height += item.clientHeight;
        this.listHeight.push(height);
      }
      // console.log(this.listHeight);
    },
    initScroll() {
      this.$nextTick(() => {
        this.menu = new BScroll(this.$refs.menu, { click: true });
        this.food = new BScroll(this.$refs.food, { probeType: 3, click: true });
        this.food.on("scroll", pos => {
          // console.log(pos.y);
          this.srcollY = Math.abs(Math.round(pos.y));
          // console.log(listHeight);
        });
      });
    }
  },
  mounted() {
    this.initScroll();
    this.calculateHeight();

    //
  },

  components: {
    "app-CartControl": CartControl,
    "app-Cart": Cart,
    "app-Food": Food
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
/* 左 */
.menu {
  /* height: 600px; */
  box-sizing: border-box;

  padding-bottom: 12vw;
  background-color: #fff;
  display: flex;
}
.menu-warp {
  height: 500px !important;
  overflow-y: hidden;
  /* height: 100%; */
  height: calc(100% - 12.8vw);
  background-color: #f1f1f1;
  padding-bottom: 10vw;
  width: 20vw;
}
.menu-warp li {
  padding: 5vw 2vw;
  font-size: 0.6rem;
  color: #666;
  line-height: 1.2;
}
.menu-warp li img {
  max-width: 100%;
  width: 3.5vw;
  height: 3.5vw;
  vertical-align: top;
  margin-right: 1vw;
}

/* 右 */
.food-warp {
  height: 500px !important;
  overflow-y: hidden;
  /* height: 100%; */
  /* height: calc(100% - 12.8vw) !important; */
  width: 80vw;
  padding-bottom: 10vw;
}
.cart {
  margin-left: 2.5vw;
  padding: 2vw 8vw 2vw 0;
  display: flex;
  align-items: center;
  overflow: hidden;
}
.cart strong {
  margin-right: 1.3vw;
  font-weight: 700;
  font-size: 0.8rem;
  color: #666;
  flex: none;
}
.cart span {
  flex: 1;
  color: #999;
  font-size: 0.6rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.food-detail {
  min-height: 30vw;
  padding: 2.5vw 0 2.5vw 2.5vw;
  margin-bottom: 0.15vw;
  display: flex;
}
.food-detail img {
  width: 25vw;
  height: 25vw;
  flex: none;
  margin-right: 2.5vw;
  border-radius: 0.5vw;
}
.food-info {
  flex: 1;
  padding-bottom: 7vw;
  padding-right: 4vw;
}
.food-info h4 {
  padding-right: 4vw;
  font-weight: 700;
  overflow: hidden;
  font-size: 1rem;
  white-space: nowrap;
  width: 40vw;
  text-overflow: ellipsis;
  color: #333;
}
.des {
  margin: 1.3vw 0;
  font-size: 0.6rem;
  color: #999;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 43vw;
}
.sell {
  margin: 1.7vw 0 !important;
  color: #999;
  font-size: 0.6rem;
  line-height: 1;
  min-height: 1em;
}
.food-price {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 3.8vw;
}
.food-price .price {
  font-size: 1rem;
  line-height: 4vw;
  color: #ff5339;
  padding-bottom: 1vw;
  display: flex;
  align-items: baseline;
}

.menu-warp .current {
  background-color: #fff !important;
  color: #333 !important;
}
</style>

