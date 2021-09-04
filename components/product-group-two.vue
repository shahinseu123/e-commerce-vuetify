<template>
  <v-sheet class="mx-4 pa-2 my-3 elevation-1">
    <v-slide-group show-arrows>
      <v-slide-item
        v-for="product in getNewProducts"
        :key="product.id"
        v-slot="{ active, toggle }"
      >
        <lazy-product
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
  name: "ProductGroupTwo",
  data: () => ({
    model: null
  }),
  computed: {
    getNewProducts() {
      return this.$store.state.product.products.slice(0, 50);
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
