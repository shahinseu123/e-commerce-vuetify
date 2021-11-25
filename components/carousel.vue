<template>
  <v-carousel hide-delimiters>
    <v-carousel-item
      v-for="(item, i) in getCarousel"
      :key="i"
      :src="'http://localhost:8000/uploads/media/' + item.slider_image"
      reverse-transition="fade-transition"
      transition="fade-transition"
    ></v-carousel-item>
  </v-carousel>
</template>
<script>
export default {
  name: "Carousel",
  data() {
    return {};
  },
  computed: {
    getCarousel() {
      return this.$store.state.slider.slider;
    }
  },
  mounted() {
    this.$store.dispatch("slider/get_all_slider");
  }
};
</script>
