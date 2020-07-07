const path = require("path"); //引入path模块
function resolve(dir) {
  return path.join(__dirname, dir); //path.join(__dirname)设置绝对路径
}
module.exports = {
  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve("./src"))
      .set("network", resolve("src/network"))
      .set("components", resolve("./src/components"))
      .set("views", resolve("src/views"))
      .set("common", resolve("src/common"))
      .set("assets", resolve("src/assets"));
    //set第一个参数：设置的别名，第二个参数：设置的路径
  },
  devServer: {
    open: false,
    host: "localhost",
    port: 8080,
    https: false,
    hotOnly: false,
    proxy: {
      // 配置跨域
      "/api": {
        target: "https://ele-interface.herokuapp.com/api/",
        ws: true,
        changOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  }
};

//配置跨域
// module.exports = {};

// module.exports = {
//   configureWebpack: {
//     resolve: {
//       alias: {
//         views: "@/views",
//         components: "@/components",
//         network: "@/network",
//         common: "@/common",
//         assets: "@/assets",
//       },
//     },
//   },
// };
