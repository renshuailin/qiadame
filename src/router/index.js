import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",

    component: () => import("views/index"),
    children: [
      { path: "", redirect: "/home" },
      {
        path: "/home",
        name: "home",
        component: () => import("views/Home/Home")
      },
      {
        path: "/me",
        name: "me",
        component: () => import("views/Me/Me")
      },
      {
        path: "/order",
        name: "order",
        component: () => import("views/Order/Order")
      },
      {
        path: "/address",
        name: "address",
        component: () => import("views/Address/Address")
      },
      {
        path: "/city",
        name: "city",
        component: () => import("../views/Address/Child/CityView")
      }
    ]
  },
  {
    path: "/login",
    name: "login",
    component: () => import("views/Login/Login")
  },
  {
    path: "/search",
    name: "search",
    component: () => import("views/Search/Search")
  },
  {
    path: "/detail",
    name: "detail",
    component: () => import("views/Detail/Detail")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

//路由守卫
router.beforeEach((to, from, next) => {
  //判断登录
  const isLogin = localStorage.ele_login ? true : false;
  if (to.path == "/login") {
    next();
  } else {
    //是否在登录状态
    isLogin ? next() : next("/login");
  }
});

export default router;
