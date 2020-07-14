<template>
  <div v-if="comments" class="comment">
    <div class="rating-wrap">
      <div class="info">
        <h4>{{comments.rating.shop_score.toFixed(1)}}</h4>
        <div class="shop-score">
          <span>商家评分</span>
          <app-Rating :rating="comments.rating.shop_score" />
        </div>
      </div>
      <div class="score">
        <div class="tp-score">
          <div>
            <span>味道</span>
            <p>{{comments.rating.taste_score.toFixed(1)}}</p>
          </div>
          <div>
            <span>包装</span>
            <p>{{comments.rating.package_score.toFixed(1)}}</p>
          </div>
        </div>
        <div class="ride-score">
          <span>配送</span>
          <p>{{comments.rating.rider_score.toFixed(1)}}</p>
        </div>
      </div>
    </div>
    <!-- 评论 -->
    <div class="comment">
      <ul class="tag">
        <li :class="{'bad':item.unsatisfied}" v-for="(item,index) in comments.tags" :key="index">
          {{item.name}}
          <span v-if="item.count>0">{{item.count}}</span>
        </li>
      </ul>
      <!-- 内容 -->
      <ul class="comment-warp">
        <li v-for="(item,index) in comments.comments" :key="index">
          <div class="user">
            <img
              :src="item.avatar||'https://shadow.elemecdn.com/faas/h5/static/sprite.3ffb5d8.png'"
              alt
            />
          </div>
          <div class="comment-info">
            <div class="comment-name">
              <h4>{{item.username}}</h4>
              <small>{{ item.rated_at}}</small>
            </div>
            <div class="comment-rating">
              <app-Rating :rating="item.rating" />
              <span :style="{color:zen(item.rating).color}">{{zen(item.rating).txt}}</span>
            </div>
            <div class="comment-text">{{item.rating_text}}</div>
            <div class="comment-reply">{{item.reply.content}}</div>
            <ul class="comment-img">
              <li v-for="(item,index) in item.order_images" :key="index">
                <img :src="item.image_hash" alt />
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Rating from "components/common/Rating/Rating";
export default {
  components: {
    "app-Rating": Rating
  },
  props: {
    comments: {
      type: Object
    }
  },
  methods: {
    zen(rating) {
      const content = [
        { txt: "吐槽", color: "rgb(137,159,188)" },
        { txt: "较差", color: "rgb(137, 159, 188)" },
        { txt: "一般", color: "rgb(251, 154, 11)" },
        { txt: "满意", color: "rgb(251, 154, 11)" },
        { txt: "超赞", color: "rgb(255, 96, 0)" }
      ];
      return content[rating - 1];
    }
  }
};
</script>

<style scoped>
.comments {
  height: calc(100% - 10vw);
  line-height: 1.2;
}
.rating-wrap {
  display: flex;
  margin-bottom: 2vw;
  padding: 5vw 0 8vw 6vw;
  background-color: #fff;
}
.info {
  display: flex;
  justify-content: space-between;
  width: 33.6vw;
  align-items: center;
  color: #666;
}
.info h4 {
  align-items: center;
  font-size: 2rem;
  color: #ff6000;
}
.info .shop-score {
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.rate-full {
  margin-top: 5px;
}
.score {
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #666;
}
.tp-score {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex: 1;
  padding: 0 7vw;
  align-items: center;
}
.tp-score > div {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.tp-score > div > span,
.ride-score > span {
  font-size: 1rem;
  margin-bottom: 1vw;
}
.tp-score > div > p,
.ride-score > p {
  font-size: 1rem;
}
.ride-score {
  width: 23vw;
  border-left: 1px solid #ddd;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
/* 评论 */
.comment {
  background-color: #fff;
  padding: 2.5vw 2vw 0;
  font-size: 0.8rem;
}
.tag {
  padding-bottom: 2.5vw;
  border-bottom: 1px solid #eee;
}
.tag li {
  color: #6d7885;
  background-color: #ebf5ff;
  display: inline-block;
  padding: 0 2.4vw;
  height: 7.5vw;
  line-height: 7.5vw;
  margin: 1vw;
  font-size: 0.7rem;
  border-radius: 0.5vw;
}
/* 差评 */
.bad {
  color: #aaa !important;
  background-color: #f5f5f5 !important;
}
/* 评论内容 */
.comment-warp > li {
  padding: 4vw 0 3vw;
  border-bottom: 0.1vw solid #eee;
  display: flex;
}
.comment-user {
  width: 10vw;
}
.user {
  margin-right: 10px;
}
.user img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}
.comment-info {
  flex: 1;
  font-size: 1rem;
}
.comment-name {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.comment-name h4 {
  margin-top: 0;
  color: #333;
  margin-right: 1.5vw;
}
.comment-name small {
  font-size: 0.5rem;
  color: #999;
}
.comment-rating {
  display: flex;
  margin: 1.6vw 0 0.533333vw;
  align-items: center;
}
.comment-rating > span {
  font-size: 0.5rem;
  margin-left: 1vw;
}
.comment-text {
  color: #333;
  word-break: break-word;
  margin: 2vw 0;
  font-size: 12px;
  font-weight: bold;
}
.comment-reply {
  margin: 2.5vw 0;
  padding: 2.5vw;
  border-radius: 1vw;
  background: #f3f3f3;
  position: relative;
  font-size: 0.7rem;
  line-height: 16px;
  color: rgb(121, 121, 121);
}
.comment-reply::after {
  content: " ";
  position: absolute;
  bottom: 100%;
  left: 4vw;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 2vw 2vw;
  border-color: transparent transparent #f3f3f3;
}
.comment-img {
  margin-top: 1vw;
  margin-bottom: 3vw;
}
.comment-img > li {
  display: inline-block;
  margin: 0 0.5vw;
}
.comment-img > li img {
  width: 40vw;
  height: 40vw;
}
</style>