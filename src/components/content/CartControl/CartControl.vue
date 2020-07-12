<template>
  <div class="control">
    <span class="btn-min btn" v-if="count.count>0" @click.stop="decrease">
      <i class="fa fa-minus"></i>
    </span>
    <span class="count" v-if="count.count>0">{{count.count}}</span>
    <span class="btn-add btn" @click="increase">
      <i class="fa fa-plus-circle"></i>
    </span>
  </div>
</template>

<script>
export default {
  name: "CartControl",
  props: {
    count: { type: Object }
  },
  methods: {
    decrease() {
      // console.log("-");
      this.count.count--;
    },
    increase() {
      // console.log("+");
      this.count.count++;
    }
  }
};
</script>

<style scoped>
.control {
  display: inline-flex;
  align-items: center;
}
.btn {
  display: inline-block;
  vertical-align: middle;
}
.btn i {
  color: rgb(35, 149, 255) !important;
  vertical-align: middle;
  font-size: 1.2rem;
}
.btn-min {
  width: 4vw;
  height: 4vw;
  border: 1px solid rgb(35, 149, 255);
  border-radius: 50%;
  text-align: center;
}
.btn-min i {
  font-size: 1rem;
}
.count {
  display: inline-block;
  text-align: center;
  color: rgba(0, 0, 0, 0.87);
  vertical-align: middle;
  font-size: 0.8rem;
  width: 7vw;
  overflow: hidden;
}
</style>