<template>
  <div class="address">
    <app-Header :isLeft="true" title="选择收货地址" />
    <div class="city-search">
      <div class="search">
        <span class="city" @click="$router.push('/city')">
          {{ city }}
          <i class="fa fa-angle-down"></i>
        </span>
        <i class="fa fa-search"></i>
        <input
          type="text"
          v-model="citySearch"
          placeholder="小区/写字楼/学校"
        />
      </div>
      <app-Location :address="address" @click.native="$router.push('/home')" />
    </div>
    <app-Area :list="placeList" />
  </div>
</template>
<script>
//引入头部
import Header from "components/common/Header/Header";
//引入位置
import Location from "./Child/Location";
//引入area
import Area from "./Child/Area";

//引入vuex
import { mapGetters } from "vuex";

export default {
  name: "Address",
  components: {
    "app-Header": Header,
    "app-Location": Location,
    "app-Area": Area
  },
  data() {
    return {
      city: "",
      citySearch: "",
      placeList: []
    };
  },
  watch: {
    citySearch() {
      this.searchPlace();
    }
  },
  methods: {
    searchPlace() {
      // console.log(this.citySearch);
      const self = this;
      AMap.plugin("AMap.Autocomplete", function() {
        // 实例化Autocomplete
        var autoOptions = {
          //city 限定城市，默认全国

          city: self.city
        };
        var autoComplete = new AMap.Autocomplete(autoOptions);
        autoComplete.search(self.citySearch, function(status, result) {
          // 搜索成功时，result即是对应的匹配数据
          console.log(result);
          self.placeList = result.tips;
        });
      });
    }
  },
  computed: {
    ...mapGetters(["address"])
  },
  beforeRouteEnter(to, from, next) {
    // console.log(to);
    // console.log(from);
    next(vm => (vm.city = to.params.city));
  }
};
</script>
<style scoped>
.address {
  width: 100%;
  height: 100%;
  padding-top: 45px;
  box-sizing: border-box;
  overflow: auto;
}

.city-search {
  background-color: #fff;
  padding: 10px 20px;
  color: #333;
}

.search {
  background-color: #eee;
  height: 40px;
  border-radius: 10px;
  box-sizing: border-box;
  line-height: 40px;
}
.search .city {
  padding: 0 10px;
}
.city i {
  margin-right: 10px;
}
.search input {
  margin-left: 5px;
  background-color: #eee;
  outline: none;
  border: none;
}
</style>
