<template>
  <div>
    <div v-if="$store.state.product.products.length > 0">
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
        <product-group :products="getFeatureProducts" />
        <v-parallax
          height="300"
          src="https://www.chefkunalkapur.com/wp-content/uploads/2021/06/Rasmalai-3-scaled.jpg?v=1625130326"
        >
        </v-parallax>
        <heading-line :h_title="'FEATURE PRODUCTS'" />
        <product-group :products="getFeatureProducts" />
        <v-parallax
          height="300"
          src="https://www.chefkunalkapur.com/wp-content/uploads/2021/06/Rasmalai-3-scaled.jpg?v=1625130326"
        >
        </v-parallax>
        <heading-line :h_title="'PRODUCTS FOR YOU'" />
        <product-group :products="getNewProducts" />
        <services />
      </div>
    </div>
    <div v-else>
      <div>
        <div class="flex__loading">
          <h1 class="text-uppercase text-gray lighten-3">Welcome</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BeforeFooter from "~/components/beforeFooter.vue";
import productGroup from "~/components/product-group.vue";
import Services from "~/components/services.vue";
export default {
  components: { productGroup, BeforeFooter, Services },
  name: "Home",
  data() {
    return {};
  },
  computed: {
    getNewProducts() {
      return this.$store.state.product.products.slice(0, 40);
    },
    getFeatureProducts() {
      return this.$store.state.product.products.slice(0, 40);
    }
  },

  asyncData({ store }) {
    if (store.state.product.products.length === 0) {
      store.dispatch("brand/get_all_brands");
      store.dispatch("category/get_all_category");
      store.dispatch("product/get_all_product");
      store.dispatch("product/get_sorted_product");
      store.dispatch("wish/get_wish");
    }
  },
  mounted() {}
};
</script>
<style scoped>
.test_sweet_div {
  text-align: center;
  padding: 20px 20px;
  display: inline-block;
  background-color: rgba(0, 128, 128, 0.5);
}
.flex__loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
}
</style>
