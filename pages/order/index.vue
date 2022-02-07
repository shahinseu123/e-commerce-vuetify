<template>
  <v-container>
    <div v-if="authUser != null" class="mb-4 mt-res">
      <v-form @submit.prevent="orderNow">
        <v-row>
          <v-col cols="12" sm="6" md="6" lg="6" xl="6" class="right__p_0">
            <v-card elevation="1" class="pa-5 mt-11">
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    :label="$t('name')"
                    :rules="nameRules"
                    required
                    v-model="name"
                  >
                    <v-icon slot="append" color="teal">
                      mdi-account
                    </v-icon></v-text-field
                  >
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    :label="$t('email')"
                    :rules="emailRules"
                    required
                    v-model="email"
                  >
                    <v-icon slot="append" color="teal">
                      mdi-email
                    </v-icon></v-text-field
                  >
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    :label="$t('phone')"
                    :rules="phoneRules"
                    required
                    v-model="phone"
                  >
                    <v-icon slot="append" color="teal">
                      mdi-phone
                    </v-icon></v-text-field
                  >
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    :label="$t('street')"
                    :rules="streetRules"
                    required
                    v-model="street"
                  >
                    <v-icon slot="append" color="teal">
                      mdi-map-marker
                    </v-icon></v-text-field
                  >
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field :label="$t('apt')" v-model="apt">
                    <v-icon slot="append" color="teal">
                      mdi-map-marker
                    </v-icon></v-text-field
                  >
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    :label="$t('city')"
                    :rules="cityRules"
                    required
                    v-model="city"
                  >
                    <v-icon slot="append" color="teal">
                      mdi-map-marker
                    </v-icon></v-text-field
                  >
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    :label="$t('state')"
                    :rules="stateRules"
                    required
                    v-model="state"
                  >
                    <v-icon slot="append" color="teal">
                      mdi-map-marker
                    </v-icon></v-text-field
                  >
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    :label="$t('zip')"
                    :rules="zipRules"
                    required
                    v-model="zip"
                  >
                    <v-icon slot="append" color="teal">
                      mdi-map-marker
                    </v-icon></v-text-field
                  >
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    outlined
                    name="input-7-4"
                    :label="$t('comment')"
                    v-model="comment"
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6" md="6" lg="6" xl="6" class="left__p_0">
            <v-card class="pa-5 mt-11" elevation="1">
              <h3 class="text-uppercase grey-text mb-3">
                {{ $t("product_info") }}
              </h3>
              <div>
                <table class="w__full">
                  <thead>
                    <tr>
                      <th class="text__left grey-text text-uppercase">
                        {{ $t("product") }}
                      </th>
                      <th class="text__right grey-text text-uppercase">
                        {{ $t("info") }}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="prod in getCheckOutProduct" :key="prod.id">
                      <td class="text__left grey-text text__sm">
                        {{ $i18n.locale == "en" ? prod.name : prod.name_bd }}
                      </td>
                      <td class="text__right grey-text text__sm">
                        {{ prod.total_price }} {{ $t("tk") }}
                      </td>
                    </tr>
                    <tr v-show="promoSubmitted == 'true'">
                      <td class="text__left grey-text text__sm">
                        {{ $t("discount") }}
                      </td>
                      <td class="text__right grey-text text__sm">
                        {{ discount_amount }} {{ $t("tk") }}
                      </td>
                    </tr>
                    <tr>
                      <td class="text__left grey-text text__sm"></td>
                      <td class="text__right grey-text text__md pt-3">
                        {{ $t("total") }}
                        {{
                          promoSubmitted == "true"
                            ? discountTotalPrice
                            : totalPrice
                        }}
                        {{ $t("tk") }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </v-card>
            <v-card class="pa-5 mt-3" elevation="1">
              <h3 class="text-uppercase grey-text mb-3">
                {{ $t("summery") }}
              </h3>
              <div>
                <table class="w__full">
                  <thead>
                    <tr>
                      <td class="text__left grey-text text__sm"></td>
                      <td class="text__left grey-text text__md">
                        {{ $t("amount") }}
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="text__left grey-text text__sm">
                        {{ $t("product") }}
                      </td>
                      <td class="text__left grey-text text__sm">
                        {{ $t("price") }}:
                        {{
                          promoSubmitted == "true"
                            ? discountTotalPrice
                            : totalPrice
                        }}
                        {{ $t("tk") }}
                      </td>
                    </tr>
                    <tr>
                      <td class="text__left grey-text text__sm">
                        {{ $t("tax") }}:
                      </td>
                      <td class="text__left grey-text text__sm">
                        {{ calculateTax }} {{ $t("tk") }}
                      </td>
                    </tr>
                    <tr>
                      <td class="text__left grey-text text__sm">
                        {{ $t("shipping") }}
                      </td>
                      <td class="text__left grey-text text__sm">
                        <v-radio-group v-model="delivery_charge">
                          <v-radio
                            :label="$t('inside_dhaka_home_de')"
                            :value="50"
                          ></v-radio>
                          <v-radio
                            :label="$t('outside_dhaka_home_de')"
                            :value="150"
                          ></v-radio>
                          <v-radio
                            :label="$t('outside_dhaka_courier_de')"
                            :value="100"
                          ></v-radio>
                        </v-radio-group>
                      </td>
                    </tr>
                    <tr>
                      <td class="text__left grey-text text__md">
                        {{ $t("total") }}
                      </td>
                      <td class="text__left grey-text text__md">
                        {{ makeTotal }} {{ $t("tk") }}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <v-checkbox
                  v-model="termsCondition"
                  :label="$t('check_privecy')"
                  color="teal"
                  value="true"
                ></v-checkbox>
              </div>
              <div class="mt-3">
                <v-btn
                  block
                  outlined
                  type="submit"
                  class="mb-2"
                  text
                  color="teal lighten-2"
                  ><v-icon left>mdi-cart-arrow-down</v-icon>
                  {{ $t("order_now") }}</v-btn
                >
              </div>
              <p class="text__sm">
                {{ $t("privecy_on_order") }}
              </p>
            </v-card>
          </v-col>
        </v-row>
      </v-form>
    </div>
    <div v-else>
      <v-card class="dis__flex">
        <v-progress-circular
          indeterminate
          color="primary"
        ></v-progress-circular>
        <h3>Loading</h3>
      </v-card>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "Checkout",
  middleware: ["isAuth"],
  data: () => ({
    name: null,
    email: null,
    phone: null,
    city: null,
    apt: null,
    state: null,
    zip: null,
    comment: null,
    street: null,
    nameRules: [v => !!v || "Name is required"],
    stateRules: [v => !!v || "State is required"],
    cityRules: [v => !!v || "City is required"],
    streetRules: [v => !!v || "Street is required"],

    phoneRules: [
      v => !!v || "Phone number is required",
      v => /^[0-9]*\d$/.test(v) || "Phone number must be valid"
    ],
    zipRules: [
      v => !!v || "Zip is required",
      v => /^[0-9]*\d$/.test(v) || "Zip must be valid"
    ],

    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+/.test(v) || "E-mail must be valid"
    ],
    totalPrice: 0,
    delivery_charge: 50,
    radioGroup: 1,
    termsCondition: "false",
    authUser: null,
    promoSubmitted: "false",
    discountTotalPrice: 0,
    discount_amount: 0,
    tax: 0
  }),
  methods: {
    orderNow() {
      if (this.termsCondition == "true") {
        let cartQnty = JSON.parse(sessionStorage.getItem("qntyArray"));
        if (
          this.city == null ||
          this.state == null ||
          this.street == null ||
          this.zip == null
        ) {
          $nuxt.$emit("product-failed", "Please fill the required filed");
          return;
        }
        this.$store.dispatch("order/create_an_order", {
          user_id: this.authUser.id,
          name: this.name,
          email: this.email,
          phone: this.phone,
          street: this.street,
          city: this.city,
          state: this.state,
          apt: this.apt,
          zip: this.zip,
          quantity: cartQnty,

          // shipping
          shipping_charge: this.delivery_charge,
          // charge
          product_total: this.makeTotal,
          tax: this.tax,
          tax_amount: this.calculateTax,
          other_cost: 0,
          discount: 0,
          discount_amount: this.discount_amount,
          // payment
          payment_method: "Cash on delivery",
          payment_transaction_id: null,
          // note
          note: this.comment,
          staff_note: "",
          reference_no: null
        });
      } else {
        $nuxt.$emit(
          "product-failed",
          "You have to agree with terms and condition"
        );
      }
    },
    setTextFiledValue() {
      if (this.authUser != null) {
        this.name = this.authUser.name;
        this.email = this.authUser.email;
        this.phone = this.authUser.phone;
        this.street = this.authUser.street;
        this.appertment = this.authUser.appertment;
        this.city = this.authUser.city;
        this.state = this.authUser.state;
        this.zip = this.authUser.zip;
        this.apt = this.authUser.apt;
      }
    }
  },

  computed: {
    getCheckOutProduct() {
      return JSON.parse(sessionStorage.getItem("qntyArray"));
    },
    calculateTax() {
      let tax = 0;
      tax = (15 * this.totalPrice) / 100;
      return tax;
    },
    makeTotal() {
      return (
        parseFloat(
          this.promoSubmitted == "true"
            ? this.discountTotalPrice
            : this.totalPrice
        ) +
        parseFloat(this.delivery_charge) +
        this.calculateTax
      );
    }
  },
  asyncData({ store }) {
    if (store.state.product.products.length === 0) {
      store.dispatch("brand/get_all_brands");
      store.dispatch("category/get_all_category");
      store.dispatch("product/get_all_product");
      store.dispatch("product/get_sorted_product");
    }
  },
  mounted() {
    this.promoSubmitted = sessionStorage.getItem("promoSubmitted");
    this.discount_amount = sessionStorage.getItem("discountAmount");
    this.discountTotalPrice = sessionStorage.getItem("discountTotalPrice");
    if (this.getCheckOutProduct == null) {
      // this.$router.push({ path: "/" });
      this.$router.push(this.$i18n.localePath({ path: "/" }));
      $nuxt.$emit("product-failed", "Please add few items in cart");
    }
    setTimeout(() => {
      this.setTextFiledValue();
    }, 1000);

    if (sessionStorage.getItem("myAuth") == "true") {
      this.authUser = JSON.parse(sessionStorage.getItem("authUser"));
    }
    this.totalPrice = sessionStorage.getItem("totalPrice");
  }
};
</script>

<style scoped>
.grey-text {
  color: grey;
}
.w__full {
  width: 100%;
}
.text__left {
  text-align: left;
}
.text__right {
  text-align: right;
}
.text__sm {
  font-size: 15px;
}
.text__md {
  font-size: 20px;
  font-weight: 700;
}
.left__p_0 {
  padding-left: 4px;
}
.right__p_0 {
  padding-right: 4px;
}
.dis__flex {
  display: flex;
  justify-content: center;
  align-items: center;
}
@media only screen and (max-width: 959px) {
  .mt-res {
    margin-top: -55px;
  }
}
@media only screen and (min-width: 600px) {
  .mt__10 {
    margin-top: 0 !important;
  }
}
</style>
