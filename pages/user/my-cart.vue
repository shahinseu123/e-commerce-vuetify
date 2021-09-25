<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" sm="6" md="4" lg="3" xl="2" class="p__right">
        <user-sidebar class="margin__t" />
      </v-col>
      <v-col cols="12" sm="6" md="6" lg="9" xl="10" class="p__left">
        <div v-if="cartItems.length > 0" class="margin__t">
          <div v-for="(item, index) in cartItems" :key="item.id">
            <cart-item
              class="mt-1"
              :product="item"
              :qntyObj="qntyArray[index]"
              :index="index"
            />
          </div>
        </div>
        <div v-else class="margin__t">
          <v-card elevation="1">
            <div class="dis__flex height_f">
              <h1 class="gray text-uppercase">Your cart is empty</h1>
            </div>
          </v-card>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import cartItem from "~/components/cartItem.vue";
export default {
  components: { cartItem },
  name: "MyCart",
  middleware: ["isAuth"],
  data: () => ({
    cartItems: [],
    qntyArray: [],
    totalPrice: 0
  }),
  mounted() {
    this.$nuxt.$on("total-price", () => {
      this.totalPrice = JSON.parse(sessionStorage.getItem("totalPrice"));
    });
    this.$nuxt.$on("add-to-cart", () => {
      if (sessionStorage.getItem("cartProduct") != undefined) {
        this.cartItems = JSON.parse(sessionStorage.getItem("cartProduct"));
      }
      if (sessionStorage.getItem("totalPrice") != undefined) {
        this.totalPrice = JSON.parse(sessionStorage.getItem("totalPrice"));
      }
      if (sessionStorage.getItem("qntyArray") != undefined) {
        this.qntyArray = JSON.parse(sessionStorage.getItem("qntyArray"));
      }
    });
    if (sessionStorage.getItem("cartProduct") != undefined) {
      this.cartItems = JSON.parse(sessionStorage.getItem("cartProduct"));
    }
    if (sessionStorage.getItem("totalPrice") != undefined) {
      this.totalPrice = JSON.parse(sessionStorage.getItem("totalPrice"));
    }
    if (sessionStorage.getItem("qntyArray") != undefined) {
      this.qntyArray = JSON.parse(sessionStorage.getItem("qntyArray"));
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
  height: 80vh;
}
.dis__flex {
  display: flex;
  justify-content: center;
  align-items: center;
}
.gray {
  color: gray;
  font-size: 40px;
}
</style>
