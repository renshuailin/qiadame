<template>
  <div v-if="seller" class="seller">
    <section>
      <img :src="seller.header_image" alt />
      <h3>{{seller.title}}</h3>
      <p>{{seller.brand_intros[0].brief}}</p>
      <div>查看品牌故事</div>
    </section>
  </div>
</template>

<script>
export default {
  name: "Seller",
  props: {
    seller: {
      type: Object
    }
  }
};
</script>

<style scoped>
.seller section {
  margin-bottom: 3vw;
  padding: 4vw 4vw 4vw;
  font-size: 1rem;
  background-color: #fff;
  color: #666;
  border-bottom: 1px solid #eee;
}
section > img {
  width: 92vw;
  height: 52vw;
  margin-bottom: 5vw;
}
section > h3 {
  color: #333;
  font-weight: 700;
  font-size: 1rem;
  margin-bottom: 2vw;
}
section > p {
  font-size: 0.6rem;
  height: 40px;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
section > div {
  margin: 4vw 0 -4vw;
  text-align: center;
  font-size: 0.4rem;
  padding: 4vw 0;
}
</style>