<template>
  <div class="myaddress">
    <app-Header :isLeft="true" title="我的地址" />
    <!-- 显示 -->
    <div class="address-view">
      <div class="address-card" v-for="(address,index) in allAddress" :key="index">
        <div class="address-card-select">
          <i class="fa fa-check-circle"></i>
        </div>

        <div class="address-card-body">
          <p class="address-card-title">
            <span class="username">{{address.name}}</span>

            <span class="phone">{{address.phone}}</span>
          </p>
          <p class="address-card-address">
            <span class="tag" v-if="address.tag">{{address.tag}}</span>
            <span class="address-text">{{address.address}}</span>
          </p>
          <div class="address-card-edit">
            <i @click="handleDelete(address,index)" class="fa fa-close"></i>
          </div>
        </div>
      </div>
    </div>
    <!-- 新增 -->
    <div class="buttom" @click="$router.push('/addaddress')">
      <i class="fa fa-plus-circle"></i>
      <span>新增收货地址</span>
    </div>
  </div>
</template>

<script>
import Header from "components/common/Header/Header";
export default {
  name: "MeAddress",
  data() {
    return {
      allAddress: []
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => vm.getData());
  },
  methods: {
    getData() {
      this.$axios(`/api/user/user_info/${localStorage.ele_login}`).then(res => {
        console.log(res.data);
        this.allAddress = res.data.myAddress;
      });
    },
    handleDelete(address, index) {
      this.$axios
        .delete(`/api/user/address/${localStorage.ele_login}/${address._id}`)
        .then(res => {
          this.allAddress.splice(index, 1);
        });
    }
  },
  components: {
    "app-Header": Header
  }
};
</script>

<style scoped>
.myaddress {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding-top: 45px;
}

.buttom {
  position: fixed;
  height: 13.866667vw;
  bottom: 0;
  width: 100%;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 0.266667vw solid #ddd;
  color: #3190e8;
  font-size: 1rem;
}
.buttom > i {
  font-size: 1.3rem;
  margin-right: 8px;
}

/* 展示收货 */
.address-view {
  height: 100%;
  overflow-y: auto;
  padding-bottom: 13.866667vw;
}
.address-card {
  background-color: #fff;
  padding: 4vw;
  border-bottom: 1px solid #ddd;
  display: flex;
  min-height: 18.133333vw;
}
.address-card-body {
  flex: 1;
  overflow: hidden;
}
.address-card-title {
  font-size: 1rem;
  color: #666;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-bottom: 1.066667vw;
}
.address-card-title .username {
  color: #333;
  font-weight: 700;
}
.address-card-title .gender {
  padding: 0 1.6vw 0 0.8vw;
}
.address-card-address {
  color: #666;
  font-size: 0.84rem;
  display: flex;
  align-items: center;
}
.address-card-address .tag {
  display: inline-block;
  position: relative;
  margin-right: 0.8vw;
  padding: 0.533333vw;
  color: #ff5722;
  white-space: nowrap;
  border: 1px solid #ff5722;
  border-radius: 0.133333vw;
  font-size: 0.6rem !important;
  line-height: 2.666667vw;
}
.address-text {
  line-height: 4.533333vw;
}
.address-card-edit {
  flex-basis: 13.066667vw;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.address-card-edit > i {
  color: #aaa;
  font-size: 1.2rem;
}
.address-card-select {
  flex-basis: 7.333333vw;
  min-width: 7.333333vw;
  display: flex;
  align-items: center;
  margin-right: 10px;
}
.address-card-select > i {
  font-size: 1.5rem;
  color: #4cd964;
}
</style>