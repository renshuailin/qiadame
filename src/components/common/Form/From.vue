<template>
  <div class="from">
    <div class="label">{{label}}</div>
    <div class="input-group">
      <div class="input">
        <input
          v-if="!textarea"
          :type="type"
          :value="value"
          :placeholder="holder"
          @input="$emit('input',$event.target.value)"
        />
        <textarea
          v-else
          :type="type"
          :value="value"
          :placeholder="holder"
          @input="$emit('input',$event.target.value)"
          row="2"
          maxlength="100"
        ></textarea>
        <i v-if="icon" :class="'fa fa-'+icon"></i>
        <app-Tag v-if="tag" :tag="tag" :select="select" @checkTag="checkTag" />
      </div>
    </div>
  </div>
</template>

<script>
import Tag from "../Tag/Tag";
export default {
  name: "From",
  props: {
    type: {
      type: String,
      default: "text"
    },
    label: String,
    value: String,
    holder: String,
    icon: String,
    textarea: String,
    tag: Array,
    select: String
  },
  components: {
    "app-Tag": Tag
  },
  methods: {
    checkTag(item) {
      // console.log(item);
      this.$emit("check", item);
    }
  }
};
</script>

<style scoped>
.from {
  /* border-top: 0.266667vw solid #eee; */
  background-color: #fff;
  border-bottom: 1px solid #eee;
  display: flex;
}
.from .label {
  flex-basis: 17vw;
  padding: 3.8vw 0;
  line-height: 4.8vw;
  color: #333;
  font-weight: 700;
}
.input-group {
  flex: 1;
}
.input-group {
  flex: 1 1 0;
  padding: 3.5vw 0;
  display: flex;
  align-items: center;
  line-height: 4.8vw;
}

.input input {
  outline: none;
  line-height: 4.8vw;
  color: #333;
  border: none;
  flex: 1;
  padding-right: 4vw;
  padding-left: 0;
  font-size: 1rem;
}
/* textarea */
.input-group textarea {
  outline: none;
  font-size: 0.9rem;
  line-height: 4.8vw;
  color: #333;
  border: none;
  flex: 1;
  padding-right: 4vw;
  padding-left: 0;
}
.input-group i {
  /* margin-right: 3.2vw; */
  color: rgb(102, 102, 102);
  font-size: 1.2rem;
}
</style>