<template>
  <v-sheet class="mx-4 pa-2 my-3 elevation-1">
    <v-slide-group show-arrows>
      <v-slide-item
        v-for="product in products"
        :key="product.id"
        v-slot="{ active, toggle }"
      >
        <lazy-product-two
          class="margin__10"
          :input-value="active"
          :product="product"
          depressed
          height="210"
          width="210"
          rounded
          @click="toggle"
        />
      </v-slide-item>
    </v-slide-group>
  </v-sheet>
</template>

<script>
export default {
  name: "ProductGroup",
  props: {
    products: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
    model: null
  }),
  computed: {
    getSortedProduct() {
      return this.$store.state.product.sorted_products;
    }
  }
};
</script>

<style scoped>
.bg__white {
  background: white;
}
.margin__10 {
  margin: 2px 5px;
}
</style>
