<template>
  <ul class="search-list">
    <li v-for="(item,index) in data" :key="index" @click="$emit('itemclick')">
      <img v-if="item.image_path" :src="item.image_path" />
      <i v-else class="fa fa-search"></i>
      <div class="shopitem">
        <span class="title">{{item.name||item}}</span>
        <span v-if="item.rating" class="rating">评分{{item.rating}}</span>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: "searchIndex",
  props: {
    data: { type: Array }
  }
};
</script>

<style scoped>
.search-list {
  background: #fff;
}
.search-list li {
  padding: 0 4vw;
  display: flex;
  height: 14vw;
  align-items: center;
}
.search-list li img {
  width: 6vw;
  height: 6vw;
  margin-right: 4vw;
  border-radius: 0.1vw;
}
.shopitem {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  height: 14vw;
  border-bottom: 1px solid #e3e3e3;
}
.shopitem .title {
  display: inline-block;
  max-width: 56vw;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 1rem;
  color: #333;
  margin-right: 1vw;
}
.shopitem .rating {
  color: #999;
  font-size: 1rem;
}
/* i标签 */
.search-list li i {
  margin-right: 4.266667vw;
  color: #888;
}
</style>