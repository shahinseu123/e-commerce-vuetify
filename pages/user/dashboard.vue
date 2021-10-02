<template>
  <v-container fluid>
    <v-row>
      <v-col class="p__right" cols="12" sm="6" md="4" lg="3" xl="2">
        <user-sidebar class="margin__t" />
      </v-col>
      <v-col class="p__left" cols="12" sm="6" md="6" lg="9" xl="10">
        <v-card class="pa-5 margin__t height_f" elevation="1">
          <v-row>
            <v-col>
              <dash-card
                icon="mdi-cart-arrow-down"
                :products="filterProcessingedOrder"
                color="teal"
              ></dash-card>
            </v-col>

            <v-col>
              <dash-card
                icon="mdi-cart-check"
                :products="filterCompletedOrder"
                color="green"
              ></dash-card>
            </v-col>
            <v-col>
              <dash-card
                icon="mdi-cart-remove"
                :products="filterReturnededOrder"
                color="red"
              ></dash-card>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import userSidebar from "~/components/userSidebar.vue";
export default {
  middleware: ["isAuth"],
  components: { userSidebar },
  name: "Dashboard",
  data() {
    return {
      authUser: null
    };
  },
  computed: {
    filterCompletedOrder() {
      return this.authUser.order.filter(item => item.status == "Delivered");
    },
    filterProcessingedOrder() {
      return this.authUser.order.filter(item => item.status == "Processing");
    },
    filterReturnededOrder() {
      return this.authUser.order.filter(item => item.status == "Returned");
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
  created() {
    if (sessionStorage.getItem("myAuth") == "true") {
      this.authUser = JSON.parse(sessionStorage.getItem("authUser"));
    }
  }
};
</script>

<style scoped>
.margin__t {
  margin-top: 44px;
}
.p__right {
  padding-right: 0 !important;
}
.p_left {
  padding-left: 0 !important;
}

.height_f {
  height: 100vh;
}
</style>
