<template>
  <div class="cat__slider pa-2 mx-4 my-3 elevation-1">
    <v-sheet class="mx-auto">
      <v-slide-group show-arrows v-if="getBrands.length !== 0" class="h__130">
        <v-slide-item
          v-for="n in getBrands"
          :key="n.id"
          v-slot="{ active, toggle }"
        >
          <BrandItem
            class="mx-2"
            :input-value="active"
            :brand="n"
            active-class="purple white--text"
            depressed
            rounded
            @click="toggle"
          >
          </BrandItem>
        </v-slide-item>
      </v-slide-group>
    </v-sheet>
  </div>
</template>

<script>
import VueSlickCarousel from "vue-slick-carousel";

import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";
import BrandItem from "./brandItem.vue";
export default {
  name: "Brand",
  components: {
    VueSlickCarousel,
    BrandItem
  },
  data() {
    return {
      model: null
    };
  },
  computed: {
    getBrands() {
      return this.$store.state.brand.brands;
    }
  },
  mounted() {}
};
</script>

<style scoped>
.cat__slider {
  background: white;
}
.h__130 {
  height: 130px;
}
</style>
