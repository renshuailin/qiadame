<template>
  <div v-if="showSearch" class="address-search">
    <div class="search">
      <div class="box">
        <div class="input">
          <i class="fa fa-search"></i>
          <input type="text " placeholder="请输入" v-model="search" />
        </div>
        <button @click="$emit('close')" class="btn">取消</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: ""
    };
  },
  props: {
    showSearch: {
      type: Boolean
    }
  },
  methods: {}
};
</script>

<style scoped>
.address-search {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding-top: 45px;
}
.search {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
  background-color: #fff;
}
.box {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2vw 4vw 2vw;
}
.input {
  flex: 1;
  border: 1px solid #ddd;
  outline: 0;
  color: #999;
  height: 7.5vw;
  margin-right: 2.5vw;
  border-radius: 0.5vw;
  background: #f5f5f5;
  padding: 0 2vw;
  display: flex;
  align-items: center;
}
.input > input {
  margin-left: 2vw;
  width: 90%;
  background: none;
}
input,
button {
  outline: none;
  border: none;
}
.btn {
  color: #333;
  border-radius: 0.5vw;
  width: 15vw;
  height: 7.5vw;
  font-size: 1rem;
  white-space: nowrap;
}
</style>