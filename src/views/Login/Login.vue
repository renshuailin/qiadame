<template>
  <div class="login">
    <div class="logo">
      <img src="~assets/img/logo.jpg" />
    </div>
    <!-- 手机框 -->

    <app-input
      type="number"
      v-model="phone"
      placeholder="手机号"
      :btnTitle="btnTitle"
      :disabled="disabled"
      :error="error.phone"
      @btnClick="getCode"
    />
    <!-- 验证码框 -->

    <app-input type="number" v-model="validation" placeholder="请输入验证码" :error="error.code" />
    <!-- 协议 -->
    <div class="loginDes">
      <p>
        新用户登录即表示自动注册，表示已同意
        <span>《用户服务协议》</span>
      </p>
    </div>
    <div class="loginBtn">
      <button :disabled="isClick" @click="login">登录</button>
    </div>
    <div class="test">
      <span>测试号:15574346624</span>
      <span>验证码:786421</span>
    </div>
  </div>
</template>
<script>
//引入input组件
import input from "components/content/inputGroup/input";
export default {
  name: "Login",
  data() {
    return {
      phone: "",
      validation: "",
      error: {},
      btnTitle: "获取验证码",
      disabled: false
    };
  },
  computed: {
    isClick() {
      if (!this.phone || !this.validation) return true;
      else return false;
    }
  },

  methods: {
    login() {
      this.error = {};
      //验证成功
      this.$axios
        .post("/api/posts/sms_back", {
          phone: this.phone,
          code: this.validation
        })
        .then(res => {
          console.log(res);

          localStorage.setItem("ele_login", res.data.user._id);
          this.$router.push("/");
        })
        .catch(err => (this.error = { code: err.response.data.msg }));
    },
    getCode() {
      if (this.checkPhone()) {
        //发送提交请求
        this.$axios
          .post("/api/posts/sms_send", {
            sid: "a7ebd26211126ecd3f61c85f89d7a3fd",
            token: "ceef220e7a694ebd123d543cfee1a489",
            appid: "fa8442e1ee374ad690350f8f259f06c5",
            templateid: "554314",
            phone: this.phone
          })
          .then(res => {
            // console.log(res);
            this.checkBtn();
          });
      }
    },
    checkPhone() {
      //提示报错信息
      if (!this.phone) {
        this.error = {
          phone: "手机号码不能为空"
        };
        return false;
      } else if (!/^1[3456789]\d{9}$/.test(this.phone)) {
        this.error = {
          phone: "请填写正确的手机号"
        };
        return false;
      } else {
        this.error = {};
        return true;
      }
    },
    checkBtn() {
      //点击后显示倒计时
      let time = 10;
      let timer = setInterval(() => {
        if (time === 0) {
          clearInterval(timer);
          this.btnTitle = "获取验证码";
          this.disabled = false;
        } else {
          this.btnTitle = time + "s 后重试";
          this.disabled = true;
          time--;
        }
      }, 1000);
    }
  },

  components: {
    "app-input": input
  }
};
</script>
<style scoped>
.login {
  width: 100%;
  height: 100%;
  padding: 30px;
  box-sizing: border-box;
  background-color: #fff;
}
.logo {
  text-align: center;
}
.logo img {
  width: 150px;
}

.group,
.loginDes,
.loginBtn {
  margin-top: 20px;
}
.loginDes {
  color: #aaa;
  line-height: 22px;
}
.loginDes span {
  color: #4d90fe;
}
.loginBtn button {
  width: 100%;
  height: 40px;
  background-color: #48ca38;
  border-radius: 4px;
  color: white;
  font-size: 14px;
  border: none;
  outline: none;
}
.loginBtn button[disabled] {
  background-color: #8bda81;
}
.test {
  display: flex;
  flex-direction: column;
  color: red;
  line-height: 24px;
  font-size: 12px;
  margin-top: 12px;
  /* justify-content: space-between; */
}
</style>
