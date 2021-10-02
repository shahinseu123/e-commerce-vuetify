<template>
  <v-container fluid>
    <div v-if="$store.state.product.products.length > 0">
      <div v-if="getSelectedProduct[0].type == 'simple'">
        <simple-product :product="getSelectedProduct" />
      </div>
      <div v-else>
        <variable-product :product="getSelectedProduct" />
      </div>
      <product-tab
        :relatedProduct="getRelatedProduct"
        :topSellingProduct="getTopSellingProduct"
        :product="getSelectedProduct[0]"
      ></product-tab>
    </div>
    <div v-else>
      <div class="flex__center h_80 ">
        <v-progress-circular
          indeterminate
          color="primary"
        ></v-progress-circular>
        <h1 class="ml-2 gray">Loading...</h1>
      </div>
    </div>
  </v-container>
</template>

<script>
import { ImageMagnifier } from "vue-image-magnifier";
import ProductTab from "~/components/productTab.vue";
import SimpleProduct from "~/components/simpleProduct.vue";
import VariableProduct from "~/components/variableProduct.vue";
export default {
  name: "SingleProduct",
  components: {
    ImageMagnifier,
    SimpleProduct,
    VariableProduct,
    ProductTab
  },
  data() {
    return {
      activeIndex: 0
    };
  },
  methods: {},
  computed: {
    getSelectedProduct() {
      return this.$store.state.product.products.filter(item => {
        return item.title === this.$route.params.product;
      });
    },
    getCategoryArray() {
      return this.getSelectedProduct[0].category.map(
        item => item.category_title
      );
    },
    getRelatedProduct() {
      let products = this.$store.state.product.products.filter(item => {
        for (let i = 0; i < item.category.length; i++) {
          for (let j = 0; j < this.getCategoryArray.length; j++) {
            if (item.category[i].category_title === this.getCategoryArray[j]) {
              return item.category[i].category_title;
            }
          }
        }
      });
      return products.slice(0, 50);
    },
    getTopSellingProduct() {
      return this.$store.state.product.sorted_products;
    }
  },

  asyncData({ store }) {
    if (store.state.product.products.length === 0) {
      store.dispatch("brand/get_all_brands");
      store.dispatch("category/get_all_category");
      store.dispatch("product/get_all_product");
      store.dispatch("product/get_sorted_product");
    }
  }
};
</script>

<style scoped>
.flex__center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.h_80 {
  height: 80vh;
}
.mt__28_28 {
  margin-top: 28px;
}
.gray {
  color: gray;
}
</style>
