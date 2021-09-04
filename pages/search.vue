<template>
  <v-container fluid>
    <v-card>
      <v-row v-if="searchedProduct != null && searchedProduct.length > 0">
        <v-col
          v-for="product in searchedProduct"
          :key="product.id"
          col="12"
          sm="6"
          md="4"
          lg="2"
          xl="2"
        >
          <product :product="product" />
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "Search",

  data() {
    return {
      searchedProduct: null
    };
  },
  computed: {
    getAllProduct() {
      return this.$store.state.product.products;
    }
  },
  mounted() {
    this.$nuxt.$on("search-event", query => {
      this.searchedProduct = this.getAllProduct.filter(item => {
        return item.title.includes(query);
      });
    });
  }
};
</script>

<style></style>
