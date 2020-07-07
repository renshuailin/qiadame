<template>
  <div class="group">
    <div class="input-text" :class="{ isfeedBack: error }">
      <input
        :type="type"
        :value="value"
        :placeholder="placeholder"
        :name="name"
        @input="input"
      />
      <!-- 输入框后面按钮 -->
      <button v-if="btnTitle" :disabled="disabled" @click="btnClick">
        {{ btnTitle }}
      </button>
    </div>
    <!-- 错误提醒 -->
    <div v-if="error" class="feedBack">{{ error }}</div>
  </div>
</template>
<script>
export default {
  name: "inputGroup",

  props: {
    type: {
      type: String,
      default: "text"
    },
    value: String,
    placeholder: String,
    name: String,
    btnTitle: String,
    disabled: Boolean,
    error: String
  },
  methods: {
    input(event) {
      console.log(event);

      this.$emit("input", event.target.value);
    },
    inputCheck() {},
    btnClick() {
      this.$emit("btnClick");
    }
  }
};
</script>
<style scoped>
.input-text {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.input-text input {
  height: 100%;
  width: 200px;
  padding-top: 4px;
  outline: none;
  border: transparent;
  /* display: flex; */
  /* justify-content: center; */
}
.input-text button {
  border: none;
  outline: none;
  background: #fff;
}
.input-text button[disabled] {
  color: #aaa;
}
.isfeedBack {
  border: 1px solid red;
}
.feedBack {
  color: red;
  padding-top: 5px;
  font-size: 10px;
}
</style>
