import Vue from "vue";

import App from "./App.vue";
import router from "./router";
import store from "./store";
//引入mint ui
import MintUI from "mint-ui";
import "mint-ui/lib/style.css";
import qs from "qs";
//使用加载动画
import { Indicator } from "mint-ui";

import axios from "axios";
axios.defaults.baseURL = "https://ele-interface.herokuapp.com/";

Vue.prototype.$axios = axios;
Vue.config.productionTip = false;

Vue.use(MintUI);

//请求拦截
axios.interceptors.request.use(
  config => {
    if (config.method == "post") {
      config.data = qs.stringify(config.data);
    }
    // Do something before request is sent
    Indicator.open();
    return config;
  },
  error => {
    // Do something with request error
    return Promise.reject(error);
  }
);
//响应拦截
axios.interceptors.response.use(
  response => {
    // Do something before response is sent
    Indicator.close();
    return response;
  },
  error => {
    // Do something with response error
    Indicator.close();
    return Promise.reject(error);
  }
);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
