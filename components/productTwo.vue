<template>
  <v-card class="mx-1 mb-1" max-width="250" elevation="0">
    <nuxt-link :to="`/product/${product.title}`">
      <v-img
        style="height: 180px"
        :lazy-src="
          product.product_image != null
            ? 'http://localhost:8000/uploads/media/' + product.product_image
            : 'https://flatsome3.uxthemes.com/wp-content/uploads/woocommerce-placeholder.png'
        "
        :src="
          product.product_image != null
            ? 'http://localhost:8000/uploads/media/' + product.product_image
            : 'https://flatsome3.uxthemes.com/wp-content/uploads/woocommerce-placeholder.png'
        "
      ></v-img>
    </nuxt-link>
    <div class="mt-2">
      <h4 class="upcase gray__text">{{ product.title }}</h4>
    </div>
    <div class="d__flex">
      <p class="upcase font__size_sm teal__text">123 tk</p>
      <p class="upcase font__size_sm under_line red__text">
        123 tk
      </p>
    </div>
    <div class="d__flex">
      <span class="cp upcase text__small flex__center">
        <v-icon class="mr-1" small>mdi-cart</v-icon>
        add to cart
      </span>
      <!-- <v-btn icon small color="">
        <v-icon small>mdi-heart</v-icon>
      </v-btn> -->
      <span class="cp upcase text__small flex__center">
        <v-icon class="mr-1" small>mdi-basket-plus</v-icon>
        buy now
      </span>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "Product",
  props: {
    product: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({}),
  computed: {}
};
</script>

<style scoped>
.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}
.color_bg {
  background: #f0f0f0;
}
.c__align {
  text-align: center;
}
.the_text {
  font-size: 16px;
  font-weight: 300;
}
.upcase {
  text-transform: uppercase;
}
.lignthrough {
  text-decoration: lightpink;
}
/* .btm_fix {
  position: fixed;
  bottom: 0;
} */
.font__size_sm {
  font-size: 15px;
}
.under_line {
  text-decoration: line-through;
}
.d__flex {
  display: flex;
  justify-content: space-between;
}
.red__text {
  color: red;
}
.teal__text {
  color: teal;
}
.text__small {
  font-size: 12px;
}
.flex__center {
  display: flex;
  align-items: center;
}
.gray__text {
  color: gray;
}
.cp {
  cursor: pointer;
}
</style>
