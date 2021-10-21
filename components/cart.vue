<template>
  <div>
    <h3 class="text-uppercase py-2 teal__text">{{ $t("cart_item") }}</h3>
    <v-divider class="mb-2"></v-divider>
    <div v-if="cartItems.length > 0">
      <div v-for="(item, index) in cartItems" :key="item.id">
        <cart-item
          class="mt-1"
          :product="item"
          :qntyObj="qntyArray[index]"
          :index="index"
          :promosubmitted="promoSubmitted"
        />
      </div>
      <div v-if="$store.state.coupon.coupon !== null">
        <p class="mt-4 text-uppercase bold__text ">
          {{ $t("put_the_promo") }}
        </p>
        <v-text-field
          class="mar__12"
          :rules="rules.name"
          v-model="promo_code"
          :label="$t('promo_code')"
          outlined
          clearable
        ></v-text-field>
        <v-btn
          @click="submitPromoCode"
          class="mar__25"
          outlined
          color="teal lighten-1"
          block
          ><v-icon left>mdi-emoticon-poop</v-icon>
          {{ $t("submit_the_promo") }}</v-btn
        >
      </div>
    </div>
    <div v-else>
      <v-card elevation="1">
        <div class="dis__flex py-15">
          <h2 class="gray text-uppercase">{{ $t("cart_empty") }}</h2>
        </div>
      </v-card>
    </div>
    <v-card elevation="1" class="mt-2 pa-2">
      <h3 class="py-2  teal__text text-uppercase">
        {{ $t("total") }}
      </h3>
      <v-divider></v-divider>
      <div class="d__flex  mt-2 mb__10">
        <p class="text__bold text__gray">{{ $t("subtotal") }}</p>
        <p class="text__bold text__gray">{{ totalPrice }} {{ $t("tk") }}</p>
      </div>
      <div v-if="getCoupon">
        <div v-show="promoSubmitted == 'true'" class="d__flex  mt-2 mb__10">
          <p
            v-if="getCoupon.discount_type == 'persentage_discount'"
            class="text__bold text__gray"
          >
            {{ $t("discount") }}
            <span class="red__text"
              >[{{ getCoupon.discount_amount }}% {{ $t("removed") }}]</span
            >
          </p>
          <p
            v-else-if="getCoupon.discount_type == 'fixed_cart_discount'"
            class="text__bold text__gray"
          >
            {{ $t("discount") }}
            <span class="red__text"
              >[{{ getCoupon.discount_amount }} {{ $t("tk") }}
              {{ $t("removed") }}]</span
            >
          </p>
          <p v-else class="text__bold text__gray">
            {{ $t("discount") }}
            <span class="red__text"
              >[{{ getCoupon.discount_amount }} {{ $t("tk") }}
              {{ $t("removed") }} {{ $t("from_each_item") }}]</span
            >
          </p>
          <p class="text__bold text__gray">
            {{ discountAmount != null ? discountAmount : discount }}
            {{ $t("tk") }}
          </p>
        </div>
      </div>

      <div v-show="promoSubmitted == 'true'" class="d__flex  mb__10">
        <p class="text__bold text__gray">{{ $t("total") }}</p>
        <p class="text__bold text__gray">
          {{ discountTotalPrice != null ? discountTotalPrice : newTotal }}
          {{ $t("tk") }}
        </p>
      </div>
      <!-- <span class="text__sm">Delivery charge inside dhaka(Free)</span> -->
      <v-btn
        class="mt-3"
        @click="gotocheckout"
        text
        outlined
        color="teal lighten-1"
        small
        block
        ><v-icon small left>mdi-arrow-right-thick</v-icon>
        {{ $t("check_out") }}</v-btn
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
    rules: {
      name: [val => (val || "").length > 0]
    },
    cartItems: [],
    qntyArray: [],
    totalPrice: 0,
    promo_code: null,
    discount: 0,
    showDiscount: false,
    newTotal: 0,
    authUser: null,
    promoSubmitted: "false",
    discountTotalPrice: null,
    discountAmount: null
  }),
  computed: {
    getCoupon() {
      return this.$store.state.coupon.coupon;
    }
  },
  methods: {
    submitPromoCode() {
      if (sessionStorage.getItem("myAuth") == "true") {
        if (this.promo_code != null) {
          if (this.getCoupon.cupon_name === this.promo_code) {
            if (this.getCoupon.min_amount != null) {
              if (this.getCoupon.discount_type == "persentage_discount") {
                //   // check if coupon limit exceeed
                if (this.authUser.cupon.length > 0) {
                  let usedCouponByUser = this.authUser.cupon.filter(item => {
                    return item.id == this.getCoupon.id;
                  });

                  if (
                    usedCouponByUser.length <
                    this.getCoupon.usage_limit_per_user
                  ) {
                    if (this.promoSubmitted == "false") {
                      let discount = parseInt(this.getCoupon.discount_amount);
                      let product_subtotal = parseInt(this.totalPrice);
                      if (product_subtotal >= this.getCoupon.min_amount) {
                        this.discount = (product_subtotal * discount) / 100;
                        this.newTotal = product_subtotal - this.discount;
                        sessionStorage.setItem(
                          "discountTotalPrice",
                          this.newTotal
                        );
                        sessionStorage.setItem("discountAmount", this.discount);
                        this.$store.dispatch("coupon/used_coupon", {
                          userId: this.authUser.id,
                          couponId: this.getCoupon.id,
                          promoUsed: 1
                        });
                        sessionStorage.setItem("promoSubmitted", true);
                        this.promoSubmitted = sessionStorage.getItem(
                          "promoSubmitted"
                        );
                      } else {
                        $nuxt.$emit(
                          "product-failed",
                          `You must order minium ${this.getCoupon.min_amount} TK`
                        );
                      }
                    } else {
                      $nuxt.$emit(
                        "product-failed",
                        "The coupon has already been used"
                      );
                    }
                  } else {
                    $nuxt.$emit(
                      "product-failed",
                      `Coupon useing limit has execeeded`
                    );
                  }
                } else {
                  if (this.promoSubmitted == "false") {
                    let discount = parseInt(this.getCoupon.discount_amount);
                    let product_subtotal = parseInt(this.totalPrice);
                    if (product_subtotal >= this.getCoupon.min_amount) {
                      this.discount = (product_subtotal * discount) / 100;
                      this.newTotal = product_subtotal - this.discount;
                      sessionStorage.setItem(
                        "discountTotalPrice",
                        this.newTotal
                      );
                      sessionStorage.setItem("discountAmount", this.discount);
                      this.$store.dispatch("coupon/used_coupon", {
                        userId: this.authUser.id,
                        couponId: this.getCoupon.id,
                        promoUsed: 1
                      });
                      sessionStorage.setItem("promoSubmitted", true);
                      this.promoSubmitted = sessionStorage.getItem(
                        "promoSubmitted"
                      );
                    } else {
                      $nuxt.$emit(
                        "product-failed",
                        `You must order minium ${this.getCoupon.min_amount} TK`
                      );
                    }
                  } else {
                    $nuxt.$emit(
                      "product-failed",
                      "The coupon has already been used"
                    );
                  }
                }
              } else if (
                this.getCoupon.discount_type == "fixed_cart_discount"
              ) {
                // fixed price discount
                if (this.authUser.cupon.length > 0) {
                  let usedCouponByUser = this.authUser.cupon.filter(item => {
                    return item.id == this.getCoupon.id;
                  });

                  if (
                    usedCouponByUser.length <
                    this.getCoupon.usage_limit_per_user
                  ) {
                    if (this.promoSubmitted == "false") {
                      let discount = parseInt(this.getCoupon.discount_amount);
                      let product_subtotal = parseInt(this.totalPrice);
                      if (product_subtotal >= this.getCoupon.min_amount) {
                        this.discount = discount;
                        this.newTotal = product_subtotal - this.discount;
                        sessionStorage.setItem(
                          "discountTotalPrice",
                          this.newTotal
                        );
                        sessionStorage.setItem("discountAmount", this.discount);
                        this.$store.dispatch("coupon/used_coupon", {
                          userId: this.authUser.id,
                          couponId: this.getCoupon.id,
                          promoUsed: 1
                        });
                        sessionStorage.setItem("promoSubmitted", true);
                        this.promoSubmitted = sessionStorage.getItem(
                          "promoSubmitted"
                        );
                      } else {
                        $nuxt.$emit(
                          "product-failed",
                          `You must order minium ${this.getCoupon.min_amount} TK`
                        );
                      }
                    } else {
                      $nuxt.$emit(
                        "product-failed",
                        "The coupon has already been used"
                      );
                    }
                  } else {
                    $nuxt.$emit(
                      "product-failed",
                      `Coupon useing limit has execeeded`
                    );
                  }
                } else {
                  if (this.promoSubmitted == "false") {
                    let discount = parseInt(this.getCoupon.discount_amount);
                    let product_subtotal = parseInt(this.totalPrice);
                    if (product_subtotal >= this.getCoupon.min_amount) {
                      this.discount = discount;
                      this.newTotal = product_subtotal - this.discount;
                      sessionStorage.setItem(
                        "discountTotalPrice",
                        this.newTotal
                      );
                      sessionStorage.setItem("discountAmount", this.discount);
                      this.$store.dispatch("coupon/used_coupon", {
                        userId: this.authUser.id,
                        couponId: this.getCoupon.id,
                        promoUsed: 1
                      });
                      sessionStorage.setItem("promoSubmitted", true);
                      this.promoSubmitted = sessionStorage.getItem(
                        "promoSubmitted"
                      );
                    } else {
                      $nuxt.$emit(
                        "product-failed",
                        `You must order minium ${this.getCoupon.min_amount} TK`
                      );
                    }
                  } else {
                    $nuxt.$emit(
                      "product-failed",
                      "The coupon has already been used"
                    );
                  }
                }
              } else {
                // fixed product discount
                if (this.authUser.cupon.length > 0) {
                  let usedCouponByUser = this.authUser.cupon.filter(item => {
                    return item.id == this.getCoupon.id;
                  });

                  if (
                    usedCouponByUser.length <
                    this.getCoupon.usage_limit_per_user
                  ) {
                    if (this.promoSubmitted == "false") {
                      let discount = parseInt(this.getCoupon.discount_amount);
                      let product_subtotal = parseInt(this.totalPrice);
                      if (product_subtotal >= this.getCoupon.min_amount) {
                        this.discount = discount * this.qntyArray.length;
                        this.newTotal = product_subtotal - this.discount;
                        sessionStorage.setItem(
                          "discountTotalPrice",
                          this.newTotal
                        );
                        sessionStorage.setItem("discountAmount", this.discount);
                        this.$store.dispatch("coupon/used_coupon", {
                          userId: this.authUser.id,
                          couponId: this.getCoupon.id,
                          promoUsed: 1
                        });
                        sessionStorage.setItem("promoSubmitted", true);
                        this.promoSubmitted = sessionStorage.getItem(
                          "promoSubmitted"
                        );
                      } else {
                        $nuxt.$emit(
                          "product-failed",
                          `You must order minium ${this.getCoupon.min_amount} TK`
                        );
                      }
                    } else {
                      $nuxt.$emit(
                        "product-failed",
                        "The coupon has already been used"
                      );
                    }
                  } else {
                    $nuxt.$emit(
                      "product-failed",
                      `Coupon useing limit has execeeded`
                    );
                  }
                } else {
                  if (this.promoSubmitted == "false") {
                    let discount = parseInt(this.getCoupon.discount_amount);
                    let product_subtotal = parseInt(this.totalPrice);
                    if (product_subtotal >= this.getCoupon.min_amount) {
                      this.discount = discount * this.qntyArray.length;
                      this.newTotal = product_subtotal - this.discount;
                      sessionStorage.setItem(
                        "discountTotalPrice",
                        this.newTotal
                      );
                      sessionStorage.setItem("discountAmount", this.discount);
                      this.$store.dispatch("coupon/used_coupon", {
                        userId: this.authUser.id,
                        couponId: this.getCoupon.id,
                        promoUsed: 1
                      });
                      sessionStorage.setItem("promoSubmitted", true);
                      this.promoSubmitted = sessionStorage.getItem(
                        "promoSubmitted"
                      );
                    } else {
                      $nuxt.$emit(
                        "product-failed",
                        `You must order minium ${this.getCoupon.min_amount} TK`
                      );
                    }
                  } else {
                    $nuxt.$emit(
                      "product-failed",
                      "The coupon has already been used"
                    );
                  }
                }
              }
            } else {
              $nuxt.$emit(
                "product-failed",
                `You must order minium ${this.getCoupon.min_amount} TK`
              );
            }
          } else {
            $nuxt.$emit("product-failed", "Coupon code does not match");
          }
        } else {
          $nuxt.$emit(
            "product-failed",
            "Please put the promo code before submit"
          );
        }
      } else {
        $nuxt.$emit("product-failed", "You need to login for buy this item");
        $nuxt.$emit("open-login");
      }
    },
    gotocheckout() {
      if (this.cartItems.length > 0 && this.qntyArray.length > 0) {
        if (sessionStorage.getItem("myAuth") == "true") {
          this.$router.push(this.localeLocation({ path: "/order" }));
          // this.localePath("/order");
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
    this.discountTotalPrice = sessionStorage.getItem("discountTotalPrice");
    this.discountAmount = sessionStorage.getItem("discountAmount");
    if (sessionStorage.getItem("promoSubmitted") != undefined) {
      this.promoSubmitted = sessionStorage.getItem("promoSubmitted");
    }

    this.$nuxt.$on("get-auth-user", () => {
      this.$store.dispatch("auth/get_auth_user");
    });
    this.$nuxt.$on("set-auth", () => {
      this.authUser = JSON.parse(sessionStorage.getItem("authUser"));
    });
    this.authUser = JSON.parse(sessionStorage.getItem("authUser"));
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
.bold__text {
  font-weight: bold;
  color: teal;
}
.red__text {
  color: red;
  font-weight: 400;
  font-size: 12px;
}
.mar__25 {
  margin-top: -25px;
}
.mar__12 {
  margin-top: -12px;
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
