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
            "https://www.chefkunalkapur.com/wp-content/uploads/2021/06/Rasmalai-3-scaled.jpg?v=1625130326"
        },
        {
          id: 2,
          src: "https://i.ytimg.com/vi/I_hKHcXo1EA/maxresdefault.jpg"
        },
        {
          id: 3,
          src:
            "https://achalafood.com/wp-content/uploads/2018/09/Rasmalai-Recipe-main-photo.jpg"
        }
      ]
    };
  }
};
</script>
