<template>
  <div id="intro">
    <h1 class="my__heading text-uppercase white--text text-h4 pt-10">
      {{ $t("shop_now") }}
    </h1>
    <div v-if="$store.state.coupon.coupon !== null">
      <h2
        v-if="coupon.discount_type == 'persentage_discount'"
        class="white--text text-h3 discount"
      >
        {{ coupon.discount_amount }}% Discount
      </h2>
      <h2
        v-else-if="coupon.discount_type == 'fixed_cart_discount'"
        class="white--text text-h3 discount"
      >
        {{ coupon.discount_amount }} {{ $t("tk") }} {{ $t("discount") }}
      </h2>
      <h2 v-else class="white--text text-h3 discount">
        {{ coupon.discount_amount }} {{ $t("tk") }} {{ $t("discount") }}
      </h2>

      <p v-if="$i18n.locale == 'bn'" class="pera">
        {{ coupon.min_amount }} এবং তার উপরে অর্ডারের মান কুপনের জন্য প্রযোজ্য
      </p>
      <p v-else class="pera">
        On order value of {{ coupon.min_amount }} and above
      </p>

      <p class="pera">* {{ $t("intro_order_val") }}.</p>
      <div class="promodiv">
        <p class="promocode ">
          {{ $t("coupon_code") }}
          <v-icon color="teal lighten-1">mdi-arrow-right-bold</v-icon>
          {{ coupon.cupon_name }}
        </p>
      </div>
      <p class="flex__p">
        {{ $t("coupon_valid") }}
        <v-icon color="white">mdi-arrow-right-bold</v-icon>
        {{ $moment(coupon.expiry_date).format("ll") }}
      </p>
    </div>
    <div v-else>
      <h2 class="white--text text-h3 discount">
        No Coupon available
      </h2>

      <p class="pera">On order value of 300 and above</p>
      <p class="pera">
        * Our discount is only valid online and on selected items only.
      </p>
      <div class="promodiv">
        <p class="promocode">
          PROMO CODE
          <v-icon color="teal lighten-1">mdi-arrow-right-bold</v-icon>
          No promo code available
        </p>
      </div>
    </div>
    <!-- count down  -->
  </div>
</template>

<script>
export default {
  name: "Introduction",
  props: {
    coupon: {
      type: Object,
      default: () => ({})
    }
  },
  mounted() {}
};
</script>

<style scoped>
#intro {
  height: 365px;
  width: 100%;
  background: teal;
}
.flex__p {
  color: white;
  text-align: center;
}
.promodiv {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}
.promocode {
  padding: 10px 20px;
  background: white;
  color: teal;
  text-align: center;
}
.pera {
  margin: 0;
  text-align: center;
  color: white;
}
.discount {
  text-align: center;
  font-weight: 300;
  text-shadow: 4px 4px gray;
  margin-top: 30px;
  margin-bottom: 20px;
}
.my__heading {
  display: flex;
  width: 100%;
  align-items: center;
}
.my__heading::before,
.my__heading::after {
  content: "";

  background: white;
  height: 1px;
  margin: 20px;
  flex: 1;
}
</style>
