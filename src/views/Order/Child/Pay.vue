<template>
  <div class="pay">
    <app-Header title="在线支付" />
    <div class="main" v-if="orderInfo">
      <div class="tip">
        <p class="countdown-title">支付剩余时间</p>
        <h3 class="countdown-text">{{countDown}}</h3>
      </div>
      <section class="home">
        <ul class="list info-list">
          <li>
            <span class="order-name">{{orderInfo.shopInfo.name}}</span>
            <span class="text-highlight">¥{{total}}</span>
          </li>
        </ul>
        <div class="title">在线支付</div>
        <ul class="list payment-list">
          <li class="payment-list-item">
            <div class="icon">
              <img src="~assets/img/wechart.jpg" alt />
              <span>微信</span>
            </div>
            <i class="fa fa-check-circle selected"></i>
          </li>
        </ul>
      </section>
      <button :disabled="timeOut" @click="pay" class="btn-submit">确认支付</button>
    </div>
  </div>
</template>

<script>
// 头
import Header from "components/common/Header/Header";
// vuex--getters
import { mapGetters } from "vuex";
export default {
  name: "Pay",
  data() {
    return {
      countDown: "00:14:59",
      time: null,
      timeOut: false
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => vm.TimeDown());
  },
  methods: {
    TimeDown() {
      let min = 14;
      let sec = 59;
      this.time = setInterval(() => {
        sec--;
        if (sec == "00" && min == "00") {
          this.countDown = "订单已超时";
          clearInterval(this.time);
          this.timeOut = true;
        }
        if (sec == "00") {
          sec = 59;
          min--;
          if (min < 10) {
            min = "0" + min;
          }
        }
        if (sec < 10) {
          sec = "0" + sec;
        }
        this.countDown = "00:" + min + ":" + sec;
      }, 1000);
    },
    pay() {
      const data = {
        body: "米修在线",
        out_trade_no: new Date().getTime().toString(),
        total_fee: 1
      };
      alert("进入到支付中");
      // 请求 http://www.thenewstep.cn/wxzf/example/jsapi.php
      fetch("http://www.thenewstep.cn/wxzf/example/jsapi.php", {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(data)
      })
        .then(res => res.json())
        .then(data => {
          this.onBridgeReady(data);
        })
        .catch(err => {
          alert("无法支付");
          this.$router.push("/order");
        });
    },
    onBridgeReady(data) {
      WeixinJSBridge.invoke("getBrandWCPayRequest", data, res => {
        if (res.err_msg == "get_brand_wcpay_request:ok") {
          // 使用以上方式判断前端返回,微信团队郑重提示：
          //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
          // alert("支付成功");
          // 生成订单
          // this.addOrder();
        }
      });
    }
  },
  components: {
    "app-Header": Header
  },
  computed: {
    ...mapGetters(["userInfo", "orderInfo", "total"])
  }
};
</script>

<style scoped>
.pay {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding-top: 45px;
}

.main {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
}
.tip {
  display: block;
  text-align: center;
  background-color: #fff;
  color: #333;
  padding: 2rem;
  line-height: 2rem;
}
countdown-title {
  font-size: 0.88rem;
  color: #999;
}
.countdown-text {
  height: 2rem;
  color: #333;
  font-size: 1.8rem;
}
down-text {
  height: 2rem;
  color: #333;
  font-size: 1.8rem;
}
.list {
  border-bottom: 0.5px solid #eee;
  background: #fff;
}
.info-list {
  padding: 0 1.5rem;
}
.info-list li {
  border-top: 0.5px solid #eee;
  display: flex;
  padding: 1.5rem 0;
  font-size: 1rem;
  line-height: 1rem;
  justify-content: space-between;
}
.info-list li .order-name {
  color: #333;
  display: inline-block;
  vertical-align: bottom;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-right: 16px;
  max-width: 80%;
}
.text-highlight {
  color: #ff6000;
}
.title {
  background-color: #f5f5f5;
  font-size: 0.88rem;
  padding: 1.2rem 1.2rem 1rem;
  color: #999;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.payment-list-item {
  border-bottom: 0.5px solid #eee;
  padding: 0.9rem 1rem;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.icon {
  display: flex;
  align-items: center;
}
.payment-list-item img {
  width: 2.4rem;
  height: 2.4rem;
  margin-right: 20px;
}
.payment-list-item > i {
  font-size: 1.5rem;
  color: #eee;
}
.selected {
  color: #4cd964 !important;
}
.btn-submit-wrap {
  margin: 1rem auto;
  width: 90%;
}
.btn-submit {
  font-size: 1.1rem;
  line-height: 1.5rem;
  background-color: #4cd964;
  width: 100%;
  outline: none;
  border: none;
  color: #fff;
  border-radius: 5px;
  padding: 0.5rem;
  box-sizing: border-box;
}
</style>