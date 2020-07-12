<template>
  <div class="rate-full">
    <i v-for="(item,index) in item" :key="index" class="fa" :class="item"></i>
  </div>
</template>

<script>
const star = 5;
const on = "fa-star";
const half = "fa-star-half-empty";
const off = "fa-star-o";
export default {
  name: "Rating",
  props: {
    rating: {
      type: Number,
      default: 0
    }
  },
  computed: {
    item() {
      let res = [];
      let score = Math.floor(this.rating * 2) / 2;
      let halfStar = score % 1 != 0;
      let fullStar = Math.floor(score);
      // console.log(fullStar);

      for (let i = 0; i < fullStar; i++) {
        res.push(on);
      }
      if (halfStar) {
        res.push(half);
      }
      while (res.length < 5) {
        res.push(off);
      }
      return res;
    }
  }
};
</script>

<style scoped>
.rate-full {
  margin-right: 1.066667vw;
  color: #db7500;
  display: inline-block;
}
</style>