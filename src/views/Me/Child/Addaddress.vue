<template>
  <div class="add">
    <app-Header :isLeft="true" title="添加地址" />
    <!-- 添加地址 -->
    <div class="body">
      <div class="content">
        <app-From
          label="联系人"
          holder="姓名"
          :tag="['帅哥','美女']"
          @check="check"
          :select="addressInfo.gender"
          v-model="addressInfo.name"
        />
        <app-From label="电话" holder="手机号码" v-model="addressInfo.phone" />
        <app-From label="地址" holder="小区/写字楼" icon="edit" v-model="addressInfo.address" />
        <app-From label="门牌号" holder="xx号楼" icon="edit" v-model="addressInfo.bottom" />
        <div class="form">
          <div class="label">标签</div>
          <app-Tag :tag="['家','学校','公司']" :select="addressInfo.tag" @checkTag="checkTag" />
        </div>
      </div>
      <!-- 确认 -->
      <div class="form-button">
        <button @click="save" class="form-button">提交</button>
      </div>
    </div>

    <!-- 搜索 -->
    <app-Search @close="showSearch=false" :showSearch="showSearch" />
  </div>
</template>

<script>
import Header from "components/common/Header/Header";
// 表单
import From from "components/common/Form/From";
// 标签
import Tag from "components/common/Tag/Tag";
// 地址搜索
import Search from "./Search";
export default {
  name: "Addaddress",
  components: {
    "app-Header": Header,
    "app-From": From,
    "app-Tag": Tag,
    "app-Search": Search
  },
  data() {
    return {
      addressInfo: {
        tag: "",
        gender: ""
      },
      showSearch: false
    };
  },
  methods: {
    checkTag(item) {
      // console.log(item);
      this.addressInfo.tag = item;
    },
    check(item) {
      // console.log(item);
      this.addressInfo.gender = item;
    },
    save() {
      this.addAddress();

      console.log(this.addressInfo);
    },
    addAddress() {
      this.$axios
        .post(
          `/api/user/add_address/${localStorage.ele_login}`,
          this.addressInfo
        )
        .then(res => {
          // console.log(res.data);
          this.$router.push("/myaddress");
        });
    }
  }
};
</script>

<style scoped>
.add {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding-top: 45px;
}
.body {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
  background-color: #f5f5f5;
}
.content {
  padding-left: 4vw;
  background: #fff;
  font-size: 0.94rem;
}
/* 标签 */
.form {
  background-color: #fff;
  border-bottom: 1px solid #eee;
  display: flex;
}
.form .label {
  flex-basis: 17vw;
  padding: 3.8vw 0;
  line-height: 5vw;
  color: #333;
  font-weight: 700;
}
/*  */

.form-button {
  padding: 5.333333vw 4vw;
  display: flex;
}
.form-button .form-button {
  display: flex;
  justify-content: center;
  background: #00d762;
  text-align: center;
  border-radius: 0.533333vw;
  flex: 1;
  font-size: 1.1rem;
  line-height: 5.066667vw;
  color: #fff;
  padding: 3.333333vw 0;
  border: none;
  font-weight: 500;
}
</style>