import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

// types
const types = {
  SET_LOCATION: "SET_LOCATION",
  SET_ADDRESS: "SET_ADDRESS",
  ORDER: "ORDER",
  INFO: "INFO"
};

// state
const state = {
  location: {},
  address: "",
  orderInfo: null,
  userInfo: null
};

// getters
const getters = {
  location: state => state.location,
  address: state => state.address,
  orderInfo: state => state.orderInfo,
  userInfo: state => state.userInfo,
  total: state => {
    let price = 0;
    if (state.orderInfo) {
      const selectFood = state.orderInfo.selectFood;
      selectFood.forEach(item => {
        price += item.activity.fixed_price * item.count;
      });
      price += state.orderInfo.shopInfo.float_delivery_fee;
    }
    return price;
  }
};

// mutations
const mutations = {
  [types.SET_LOCATION](state, location) {
    if (location) {
      state.location = location;
    } else {
      state.location = null;
    }
  },
  [types.SET_ADDRESS](state, address) {
    if (address) {
      state.address = address;
    } else {
      state.address = "";
    }
  },
  [types.ORDER](state, orderInfo) {
    if (orderInfo) {
      state.orderInfo = orderInfo;
    } else {
      state.orderInfo = null;
    }
  },
  [types.INFO](state, userInfo) {
    if (userInfo) {
      state.userInfo = userInfo;
    } else {
      state.userInfo = null;
    }
  }
};

// actions
const actions = {
  setLocation: ({ commit }, location) => {
    commit(types.SET_LOCATION, location);
  },
  setAddress: ({ commit }, address) => {
    commit(types.SET_ADDRESS, address);
  },
  setOrederInfo: ({ commit }, orderInfo) => {
    commit(types.ORDER, orderInfo);
  },
  setUserInfo: ({ commit }, userInfo) => {
    commit(types.INFO, userInfo);
  }
};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
});
