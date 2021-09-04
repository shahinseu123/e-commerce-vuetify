<template>
  <div>
    <carousel />
    <introduction />
    <div>
      <heading-line :h_title="'POPULAR BRANDS'" />
      <brand />
      <v-parallax
        height="300"
        src="https://www.chefkunalkapur.com/wp-content/uploads/2021/06/Rasmalai-3-scaled.jpg?v=1625130326"
      >
      </v-parallax>
      <heading-line :h_title="'POPULAR CATEGORIES'" />
      <category />
      <v-parallax
        height="300"
        src="https://www.chefkunalkapur.com/wp-content/uploads/2021/06/Rasmalai-3-scaled.jpg?v=1625130326"
      >
      </v-parallax>
      <heading-line :h_title="'TOP SELLING PRODUCTS'" />
      <product-group />
      <v-parallax
        height="300"
        src="https://www.chefkunalkapur.com/wp-content/uploads/2021/06/Rasmalai-3-scaled.jpg?v=1625130326"
      >
      </v-parallax>
      <heading-line :h_title="'FEATURE PRODUCTS'" />
      <product-group-two />
      <before-footer />
    </div>
  </div>
</template>

<script>
import BeforeFooter from "~/components/beforeFooter.vue";
import productGroup from "~/components/product-group.vue";
export default {
  components: { productGroup, BeforeFooter },
  name: "Home",
  data() {
    return {};
  },
  created() {
    this.$store.dispatch("brand/get_all_brands");
    this.$store.dispatch("category/get_all_category");
    this.$store.dispatch("product/get_all_product");
    this.$store.dispatch("product/get_sorted_product");
  }
};
</script>
<style scoped>
.test_sweet_div {
  text-align: center;
  padding: 20px 20px;
  display: inline-block;
  background-color: rgba(0, 128, 128, 0.5);
}
</style>
