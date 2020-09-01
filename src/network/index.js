import { Indicator } from "mint-ui";
import axios from "axios";
axios.defaults.baseURL = "https://element-interface.herokuapp.com/";

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
export default {

}
