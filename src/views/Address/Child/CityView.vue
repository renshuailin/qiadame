<template>
  <div class="city">
    <div class="search-city">
      <div class="search">
        <i class="fa fa-search"></i>
        <input type="text" v-model="cityVal" placeholder="请输入城市名" />
      </div>
      <button
        @click="
          $router.push({
            name: 'address',
            params: { city: location.addressComponent.city }
          })
        "
      >
        取消
      </button>
    </div>
    <div style="height:100%" v-if="searchList.length == 0">
      <div class="loca">
        <app-Location
          @click.native="selectCity(location.addressComponent.city)"
          :address="location.addressComponent.city"
        />
      </div>
      <app-Alpha
        @selectCity="selectCity"
        ref="allcity"
        :cityInfo="cityInfo"
        :keys="keys"
      />
    </div>
    <div class="search-list" v-else>
      <ul>
        <li
          v-for="(item, index) in searchList"
          :key="index"
          @click="selectCity(item)"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
//引入位置
import Location from "./Location";

//引入城市信息
import Alpha from "./Alpha";

//引入vuex
import { mapGetters } from "vuex";

export default {
  name: "CityView",
  data() {
    return {
      cityVal: "",
      cityInfo: null,
      keys: [],
      fullCity: [],
      searchList: []
    };
  },
  computed: {
    ...mapGetters(["location"])
  },
  created() {
    this.getCity();
  },
  watch: {
    cityVal() {
      this.searchCity();
    }
  },
  methods: {
    getCity() {
      this.$axios("/api/posts/cities")
        .then(res => {
          // console.log(res.data);
          //保存数据
          this.cityInfo = res.data;
          // console.log(this.cityInfo);
          //保存key
          this.keys = Object.keys(res.data);
          //移除最后一个
          this.keys.pop();
          //排序
          this.keys.sort();
          //数据请求完毕 调用scroll
          this.$nextTick(() => {
            this.$refs.allcity.initScroll();
          });
          //存储所有城市，搜索过滤
          this.keys.forEach(item => {
            // console.log(item);

            this.cityInfo[item].forEach(item => {
              // console.log(item);
              //拿到所有城市
              this.fullCity.push(item);
            });
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    selectCity(city) {
      this.$router.push({ name: "address", params: { city: city.name } });
    },
    //搜索城市
    searchCity() {
      if (!this.cityVal) {
        //如果搜索框为空
        this.searchList = [];
      } else {
        //根据关键字过滤，并存入searchList
        this.searchList = this.fullCity.filter(
          item => item.name.indexOf(this.cityVal) != -1
        );
      }
      // console.log(this.searchList);
    }
  },
  components: {
    "app-Location": Location,
    "app-Alpha": Alpha
  }
};
</script>
<style scoped>
.city {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
  padding-top: 45px;
}
.search-city {
  position: fixed;
  top: 0;
  height: 45px;
  width: 100%;
  background: #fff;
  box-sizing: border-box;
  padding: 5px 16px;
  display: flex;
  justify-content: space-between;
}
.search {
  background-color: #eee;
  border-radius: 10px;
  line-height: 35px;
  width: 85%;
  box-sizing: border-box;
  padding: 0 16px;
}
.search input {
  background: #eee;
  outline: none;
  border: none;
  margin-left: 5px;
}
.search-city button {
  outline: none;
  color: #009eef;
  background-color: #fff;
  border: none;
}
.loca {
  background-color: #fff;
  padding: 8px 16px;
  box-sizing: border-box;
  height: 65px;
}

.search-list {
  background-color: #fff;
  padding: 5px 16px;
}
.search-list li {
  padding: 10px;
  border-bottom: 1px solid #ccc;
}
</style>
