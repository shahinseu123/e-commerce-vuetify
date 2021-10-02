<template>
  <v-card elevation="1" class="mb-2" max-width="700">
    <div class="d-flex">
      <div class="mr-2">
        <v-img
          width="100"
          height="100"
          :src="
            product.product.product_image != null
              ? 'http://localhost:8000/uploads/media/' +
                product.product.product_image
              : 'https://flatsome3.uxthemes.com/wp-content/uploads/woocommerce-placeholder.png'
          "
        >
        </v-img>
      </div>
      <div class="w__full">
        <div class="flex__c">
          <h5 class="text-uppercase gray">{{ product.product.title }}</h5>
        </div>
        <div class="mt-1">
          <span
            class="text__small"
            v-html="product.product.description.substr(0, 130)"
          ></span>
          <div>
            <v-btn
              v-if="product.product.productdata[0].stock > 0"
              class="mt__10"
              rounded
              x-small
              color="primary"
              dark
              depressed
            >
              In Stock
            </v-btn>
            <v-btn
              v-else
              class="mt__10"
              rounded
              x-small
              color="red"
              dark
              depressed
            >
              Out of stock
            </v-btn>
          </div>
        </div>
      </div>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "WishItem",
  props: {
    product: {
      type: Object,
      default: () => ({})
    }
  }
};
</script>

<style scoped>
.text__small {
  font-size: 12px;
}
.mt__10 {
  margin-top: -10px;
}
</style>
