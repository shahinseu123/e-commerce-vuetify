<template>
  <v-card class="mx-1 color_bg" max-width="300" elevation="0">
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
    <v-card-actions>
      <v-btn text color="teal accent-4" @click="reveal = true">
        More
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn icon small color="teal accent-4">
        <v-icon small>mdi-cart</v-icon>
      </v-btn>
      <v-btn icon small color="teal accent-4">
        <v-icon small>mdi-heart</v-icon>
      </v-btn>
      <v-btn icon small color="teal accent-4">
        <v-icon small>mdi-basket-plus</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <v-card
        v-if="reveal"
        class="transition-fast-in-fast-out v-card--reveal"
        style="height: 100%;"
      >
        <v-card-text class="pb-0">
          <h3 class="the_text mb-5">
            {{ product.title }}
          </h3>
          <p v-if="product.productdata[0].stock > 0">
            <v-chip small color="red" style="color:white">Out of stock</v-chip>
          </p>
          <p v-else>
            <v-chip small color="green" style="color:white">In stock</v-chip>
          </p>
          <p class=" ma-0 upcase" style="color:green">
            <span
              >Sale price:
              <span>{{ product.productdata[0].sale_price }} Tk</span></span
            >
          </p>
          <p class=" upcase lignthrough" style="color:red">
            <span
              >Regular price:
              <span>{{ product.productdata[0].regular_price }} Tk</span></span
            >
          </p>
        </v-card-text>
        <v-card-actions class="pt-0 btm_fix">
          <v-btn text color="teal accent-4" @click="reveal = false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-expand-transition>
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
  data: () => ({
    reveal: false
  })
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
</style>
