<template>
  <div class="filter" :class="{open:isShow||isScreen}" @click.self="hideView">
    <!-- 导航 -->
    <div v-if="filterData">
      <aside class="filter-content">
        <div
          class="filter-nav"
          v-for="(item, index) in filterData.navTab"
          :key="index"
          :class="{'filter-active':index===currentIndex}"
          @click="tabClick(index)"
        >
          <span>{{ item.name }}</span>
          <i v-if="item.icon" :class="'fa fa-' + item.icon"></i>
        </div>
      </aside>
    </div>
    <!-- 排序 -->
    <section v-if="isShow" class="sort">
      <ul>
        <li v-for="(item,index) in filterData.sortBy" :key="index" @click="selectItem(item,index)">
          <span :class="{'selectName':currentSort==index}">{{item.name}}</span>
          <i class="fa fa-check" v-show="currentSort==index"></i>
        </li>
      </ul>
    </section>
    <!-- 筛选 -->
    <section v-if="isScreen" class="sort">
      <div class="filter-sort">
        <div class="filter">
          <div class="more" v-for="(screenBy,index) in filterData.screenBy" :key="index">
            <p class="title">{{screenBy.title}}</p>
            <ul>
              <li
                v-for="(item,index) in screenBy.data"
                :key="index"
                @click="select(item,screenBy)"
                :class="{selected:item.select}"
              >
                <img v-if="item.icon" :src="item.icon" />
                <span>{{item.name}}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="sort-btn">
        <span class="clear" :class="{edit:isEdit}" @click="clear">清空</span>
        <span class="confirm" @click="confirm">确认</span>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "Filters",
  data() {
    return {
      currentIndex: 0,
      currentSort: 0,
      isShow: false,
      isScreen: false
    };
  },
  props: {
    filterData: {
      type: Object,
      default: {}
    }
  },
  computed: {
    isEdit() {
      let edit = false;
      this.filterData.screenBy.forEach(screen => {
        screen.data.forEach(item => {
          if (item.select) {
            edit = true;
          }
        });
      });
      return edit;
    }
  },
  methods: {
    tabClick(index) {
      this.currentIndex = index;
      //可以使用switch
      if (index == 0) {
        this.isShow = true;
        this.isScreen = false;
        this.$emit("searchFixd", true);
      } else if (index == 1) {
        this.$emit("update", {
          condition: this.filterData.navTab[1].condition
        });
        this.hideView();
      } else if (index == 2) {
        this.$emit("update", {
          condition: this.filterData.navTab[2].condition
        });
        this.hideView();
      } else if (index == 3) {
        this.isScreen = true;
        this.isShow = false;
        this.$emit("searchFixd", true);
      } else {
        this.hideView();
      }
    },
    // 隐藏选项
    hideView() {
      this.isShow = false;
      this.isScreen = false;
      this.$emit("searchFixd", false);
    },
    selectItem(item, index) {
      this.currentSort = index;
      // 点击title联动改变
      this.filterData.navTab[0].name = this.filterData.sortBy[index].name;
      this.hideView();
      // 更新数据
      this.$emit("update", { condition: item.code });
    },
    // 点击选中
    select(item, screenBy) {
      if (screenBy.id !== "MPI") {
        screenBy.data.forEach(item => {
          item.select = false;
        });
      }
      item.select = !item.select;
    },
    //清空
    clear() {
      this.filterData.screenBy.forEach(screen => {
        screen.data.forEach(item => {
          item.select = false;
        });
      });
    },
    //确认筛选
    confirm() {
      let screenData = {
        MPI: "",
        offer: "",
        per: ""
      };
      let mpiStr = "";
      this.filterData.screenBy.forEach(screen => {
        screen.data.forEach((item, index) => {
          if (item.select) {
            if (screen.id !== "MPI") {
              //单选框
              screenData[screen.id] = item.code;
            } else {
              //多选框
              mpiStr += item.code + ",";
              screenData[screen.id] = mpiStr;
            }
          }
        });
      });
      // console.log(mpiStr);

      this.$emit("update", { dconditionata: screenData });
      this.hideView();
    }
  }
};
</script>

<style scoped>
.filter {
  background: #fff;
  position: sticky;
  top: 77px;
  z-index: 10;
}
.filter-content {
  position: relative;
  border-bottom: 1px solid #ddd;
  line-height: 10vw;
  z-index: 101;
  height: 10vw;
  display: flex;
  justify-content: space-around;
  background-color: #fff;
}
.filter-nav {
  flex: 1;
  text-align: center;
  color: #666;
  font-size: 0.8rem;
}
.filter-nav i {
  width: 1.5vw;
  height: 1vw;
  margin-left: 1.5vw;
  margin-bottom: 0.5vw;
  fill: #333;
  will-change: transform;
}

.filter-active {
  font-weight: 600;
  color: #333;
}
.open {
  position: fixed;
  /* top: 0; */
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  transition: all 0.3s ease-in-out;
  z-index: 3;
}
/* 排序 */
.sort {
  background-color: #fff;
  color: #333;
  padding-top: 5vw;
  position: absolute;
  width: 100%;
  /* height: 100%; */
  z-index: 4;
  left: 0;
  /* top: 28vw; */
}
.sort li {
  position: relative;
  padding-left: 5vw;
  line-height: 12vw;
  overflow: hidden;
}
.fa-check {
  float: right;
  color: #009eef;
  margin-right: 4vw;
  line-height: 10vw;
}
.selectName {
  color: #009eef;
}
/* 筛选 */
.filter-sort {
  background: #fff;
  padding: 0 1vw;
  line-height: normal;
}
.more {
  margin: 4vw 0;
  overflow: hidden;
}
.more .title {
  margin-bottom: 2vw;
  color: #666;
  font-size: 0.5rem;
}
.more ul {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  font-size: 0.8rem;
}
.more li {
  box-sizing: border-box;
  width: 30%;
  height: 10vw;
  line-height: 10vw;
  margin: 1vw 1%;
  background: #fafafa;
}
.more li img {
  width: 3vw;
  height: 3vw;
  vertical-align: middle;
  margin-right: 1vw;
}
.more li span {
  margin-left: 2%;
  vertical-align: middle;
}
.sort-btn {
  /* z-index: 99; */
  /* height: 100px; */
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #fafafa;
  box-shadow: 0 -2vw 2vw 0 #ededed;
  line-height: 12vw;
  box-sizing: border-box;
}
.sort-btn span {
  font-size: 1rem;
  text-align: center;
  text-decoration: none;
  flex: 1;
}
.clear {
  color: #ccc;
  background: #fff;
}
.confirm {
  color: #fff;
  background: #00d762;
  border: 1px solid #00d762;
}

/* 选中 */
.selected {
  color: #1a7edb !important;
  background-color: #edf5ff !important;
}
/* 清空样式 */
.edit {
  color: #333 !important;
  background-color: #ddd;
  border: 1px solid #ddd;
}
</style>
