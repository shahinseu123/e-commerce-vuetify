<template>
  <v-container fluid>
    <v-row class="">
      <v-col cols="12" sm="6" md="4" lg="3" xl="2" class="p__right">
        <user-sidebar class="margin__t" />
      </v-col>
      <v-col cols="12" sm="6" md="8" lg="9" xl="10" class="p__left">
        <div v-if="getMyWish.length > 0" class="margin__t">
          <div v-for="product in getMyWish" :key="product.id">
            <wish-item :product="product" />
          </div>
        </div>
        <div v-else>
          <div class="dis__flex">
            <h1 class="text-uppercase text__s gray">
              No Favourite items available
            </h1>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import cartItem from "~/components/cartItem.vue";
export default {
  components: { cartItem },
  name: "MyWishList",
  middleware: ["isAuth"],
  computed: {
    getMyWish() {
      return this.$store.state.wish.wish;
    }
  },
  mounted() {
    this.$store.dispatch("wish/get_wish");
  },
  asyncData({ store }) {
    if (store.state.product.products.length === 0) {
      store.dispatch("brand/get_all_brands");
      store.dispatch("category/get_all_category");
      store.dispatch("product/get_all_product");
      store.dispatch("product/get_sorted_product");
      store.dispatch("wish/get_wish");
    }
  }
};
</script>

<style scoped>
.margin__t {
  margin-top: 45px;
}
.gray {
  color: gray;
}
.text__s {
  font-size: 40px;
}
.dis__flex {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
}
.p__right {
  padding-right: 0;
}
.p_left {
  padding-left: 0;
}
</style>
