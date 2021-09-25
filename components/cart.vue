<template>
  <div>
    <h3 class="text-uppercase py-2 teal__text">cart items</h3>
    <v-divider class="mb-2"></v-divider>
    <div v-if="cartItems.length > 0">
      <div v-for="(item, index) in cartItems" :key="item.id">
        <cart-item
          class="mt-1"
          :product="item"
          :qntyObj="qntyArray[index]"
          :index="index"
        />
      </div>
    </div>
    <div v-else>
      <v-card elevation="1">
        <div class="dis__flex py-15">
          <h2 class="gray text-uppercase">Your cart is empty</h2>
        </div>
      </v-card>
    </div>
    <v-card elevation="1" class="mt-2 pa-2">
      <h3 class="py-2  teal__text text-uppercase">
        Total
      </h3>
      <v-divider></v-divider>
      <div class="d__flex  mt-2 mb__10">
        <p class="text__bold text__gray">Sub total</p>
        <p class="text__bold text__gray">{{ totalPrice }} tk</p>
      </div>
      <div class="d__flex  mb__10">
        <p class="text__bold text__gray">Delivery</p>
        <p class="text__bold text__gray">00 tk</p>
      </div>
      <span class="text__sm">Delivery charge inside dhaka(Free)</span>
      <v-btn @click="gotocheckout" color="teal lighten-1 " dark small block
        ><v-icon small left>mdi-arrow-right-thick</v-icon> check out</v-btn
      >
    </v-card>
  </div>
</template>

<script>
import cartItem from "./cartItem.vue";
export default {
  components: { cartItem },
  name: "Cart",
  data: () => ({
    cartItems: [],
    qntyArray: [],
    totalPrice: 0
  }),
  methods: {
    gotocheckout() {
      if (this.cartItems.length > 0 && this.qntyArray.length > 0) {
        if (sessionStorage.getItem("myAuth") == "true") {
          this.$router.push({ path: "order" });
        } else {
          $nuxt.$emit("product-failed", "You need to login for buy this item");
          $nuxt.$emit("open-login");
        }
      } else {
        $nuxt.$emit("product-failed", "Your cart is empty");
      }
    }
  },
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
.teal__text {
  color: teal;
}
.d__flex {
  display: flex;
  justify-content: space-between;
}
.mb__10 {
  margin-bottom: -14px;
}
.text__bold {
  font-weight: 600;
}
.text__sm {
  font-size: 12px;
}
.text__gray {
  color: darkslategray;
}
.dis__flex {
  display: flex;
  justify-content: center;
  align-items: center;
}
.gray {
  color: gray;
}
</style>
