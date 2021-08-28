<template>
  <v-carousel hide-delimiters>
    <v-carousel-item
      v-for="(item, i) in items"
      :key="i"
      :src="item.src"
      reverse-transition="fade-transition"
      transition="fade-transition"
    ></v-carousel-item>
  </v-carousel>
</template>
<script>
export default {
  name: "Carousel",
  data() {
    return {
      items: [
        {
          id: 1,
          src:
            "https://soliloquywp.com/wp-content/uploads/2019/04/nb_esc_cover.jpg"
        },
        {
          id: 2,
          src: "https://jssors8.azureedge.net/demos/img/gallery/980x380/023.jpg"
        },
        {
          id: 3,
          src:
            "https://smartslider3.com/wp-content/uploads/2019/01/imageslider-1-780x410.png"
        }
      ]
    };
  }
};
</script>
