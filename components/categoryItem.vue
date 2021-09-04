<template>
  <div class="brand__item p_relative rounded-lg elevation-2">
    <v-img
      class="rounded-lg brand__img"
      :lazy-src="
        category.category_image !== null
          ? 'http://localhost:8000/uploads/media/' + category.category_image
          : 'https://neilpatel.com/wp-content/uploads/2017/09/image-editing-tools.jpg'
      "
      height="120"
      width="160"
      :src="
        category.category_image !== null
          ? 'http://localhost:8000/uploads/media/' + category.category_image
          : 'https://neilpatel.com/wp-content/uploads/2017/09/image-editing-tools.jpg'
      "
    ></v-img>
    <span class="title_abs"
      ><span class="text-caption rounded-pill">{{
        category.category_title
      }}</span></span
    >
  </div>
</template>

<script>
export default {
  name: "BrandItem",
  props: {
    category: {
      type: Object,
      default: () => {
        return {};
      }
    }
  }
};
</script>

<style scoped>
.brand__item {
  height: 120px;
  width: 160px;
  object-fit: cover;
}
.p_relative {
  position: relative;
}
.title_abs {
  position: absolute;
  bottom: -8px;
  left: 0;
  width: 100%;
  height: 30px;
  /* background: crimson; */
}
.title_abs span {
  text-align: center;
  background: crimson;
  width: 90%;
  display: flex;
  align-items: center;
  margin: 0 auto;
  justify-content: center;
  height: 100%;
  color: white;
}
.brand__img {
  width: 100%;
  object-fit: cover;
}
</style>
