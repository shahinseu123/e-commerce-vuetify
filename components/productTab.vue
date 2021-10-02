<template>
  <v-card class="mt-1">
    <v-toolbar color="white" light>
      <template>
        <v-tabs v-model="tab">
          <v-tabs-slider color="teal"></v-tabs-slider>

          <v-tab>
            related products
          </v-tab>
          <v-tab>
            top selling product
          </v-tab>
          <v-tab>
            product rateings
          </v-tab>
          <v-tab>
            rate the product
          </v-tab>
        </v-tabs>
      </template>
    </v-toolbar>

    <v-tabs-items v-model="tab">
      <v-tab-item>
        <v-card flat>
          <product-group :products="relatedProduct" />
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <product-group :products="topSellingProduct" />
        </v-card>
      </v-tab-item>
      <v-tab-item> <product-rating :product="product" /> </v-tab-item>
      <v-tab-item> <rate-the-product :product="product" /> </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import productGroup from "./product-group.vue";
import ProductRating from "./productRating.vue";
import RateTheProduct from "./rateTheProduct.vue";
export default {
  components: { productGroup, ProductRating, RateTheProduct },
  name: "ProductTab",
  props: {
    relatedProduct: {
      type: Array,
      default: () => []
    },
    topSellingProduct: {
      type: Array,
      default: () => []
    },
    product: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      tab: null,
      items: [
        "related products",
        "top selling product",
        "product rateings",
        "rate the product"
      ]
    };
  }
};
</script>

<style></style>
