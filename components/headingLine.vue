<template>
  <h3 class="heading__line pt-10 pb-5">{{ h_title }}</h3>
</template>

<script>
export default {
  name: "HeadingLine",
  props: {
    h_title: {
      type: String,
      default: "Dessert Zone"
    }
  }
};
</script>

<style scoped>
.heading__line {
  display: flex;
  width: 100%;
  align-items: center;
  color: teal;
}
.heading__line::before,
.heading__line::after {
  content: "";

  background: teal;
  height: 1px;
  margin: 20px;
  flex: 1;
}
</style>
