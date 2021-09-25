<template>
  <v-container>
    <div v-if="authUser != null">
      <v-form @submit.prevent="orderNow">
        <v-row>
          <v-col cols="12" sm="6" md="6" lg="6" xl="6" class="right__p_0">
            <v-card elevation="1" class="pa-5 mt-11">
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    label="Name*"
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
                    label="Email*"
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
                    label="Phone*"
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
                    label="Street Address*"
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
                  <v-text-field label="Appertment*" v-model="appertment">
                    <v-icon slot="append" color="teal">
                      mdi-map-marker
                    </v-icon></v-text-field
                  >
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    label="City*"
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
                    label="State*"
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
                    label="Zip*"
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
                    label="Comment"
                    v-model="comment"
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6" md="6" lg="6" xl="6" class="left__p_0">
            <v-card class="pa-5 mt-11" elevation="1">
              <h3 class="text-uppercase grey-text mb-3">
                Product information
              </h3>
              <div>
                <table class="w__full">
                  <thead>
                    <tr>
                      <th class="text__left grey-text text-uppercase">
                        Product
                      </th>
                      <th class="text__right grey-text text-uppercase">
                        Information
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="prod in getCheckOutProduct" :key="prod.id">
                      <td class="text__left grey-text text__sm">
                        {{ prod.name }}
                      </td>
                      <td class="text__right grey-text text__sm">
                        {{ prod.total_price }} TK
                      </td>
                    </tr>
                    <tr>
                      <td class="text__left grey-text text__sm"></td>
                      <td class="text__right grey-text text__md pt-3">
                        Total {{ totalPrice }} TK
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </v-card>
            <v-card class="pa-5 mt-3" elevation="1">
              <h3 class="text-uppercase grey-text mb-3">
                summery
              </h3>
              <div>
                <table class="w__full">
                  <thead>
                    <tr>
                      <td class="text__left grey-text text__sm"></td>
                      <td class="text__left grey-text text__md">
                        Amount
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="text__left grey-text text__sm">Product</td>
                      <td class="text__left grey-text text__sm">
                        Price: {{ totalPrice }} TK
                      </td>
                    </tr>
                    <tr>
                      <td class="text__left grey-text text__sm">Shipping</td>
                      <td class="text__left grey-text text__sm">
                        <v-radio-group v-model="delivery_charge">
                          <v-radio
                            :label="
                              'Inside Dhaka home delivery - 50tk - 24/48H'
                            "
                            :value="50"
                          ></v-radio>
                          <v-radio
                            :label="
                              'Outside Dhaka home delivery - 150tk - 24/48H'
                            "
                            :value="150"
                          ></v-radio>
                          <v-radio
                            :label="
                              'Outside Dhaka courier delivery - 100tk - 24/48H'
                            "
                            :value="100"
                          ></v-radio>
                        </v-radio-group>
                      </td>
                    </tr>
                    <tr>
                      <td class="text__left grey-text text__md">Total</td>
                      <td class="text__left grey-text text__md">
                        {{ makeTotal }} TK
                      </td>
                    </tr>
                  </tbody>
                </table>
                <v-checkbox
                  v-model="termsCondition"
                  label="Agree to the terms and condition and privecy policy"
                  color="teal"
                  value="true"
                ></v-checkbox>
              </div>
              <div class="mt-3">
                <v-btn
                  block
                  type="submit"
                  class="mb-2"
                  text
                  color="teal lighten-2"
                  ><v-icon left>mdi-cart-arrow-down</v-icon> order now</v-btn
                >
              </div>
              <p class="text__sm">
                Your personal data will be used to process your order, support
                your experience throughout this website, and for other purposes
                described in our privacy policy.
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
    name: "",
    email: "",
    phone: null,
    city: "",
    appertment: "",
    state: "",
    zip: null,
    comment: "",
    street: "",
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
    authUser: null
  }),
  methods: {
    orderNow() {
      if (this.termsCondition == "true") {
        let cartQnty = JSON.parse(sessionStorage.getItem("qntyArray"));
        this.$store.dispatch("order/create_an_order", {
          user_id: this.authUser.id,
          name: this.name,
          email: this.email,
          phone: this.phone,
          street: this.street,
          city: this.city,
          state: this.state,
          zip: this.zip,
          quantity: cartQnty,

          // shipping
          shipping_charge: this.delivery_charge,
          // charge
          product_total: this.makeTotal,
          tax: 0,
          tax_amount: 0,
          other_cost: 0,
          discount: 0,
          discount_amount: 0,
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
      }
    }
  },
  computed: {
    getCheckOutProduct() {
      return JSON.parse(sessionStorage.getItem("qntyArray"));
    },
    makeTotal() {
      return parseFloat(this.totalPrice) + parseFloat(this.delivery_charge);
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
</style>
