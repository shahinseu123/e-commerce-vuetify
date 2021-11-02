<template>
  <v-card elevation="1" class="pa-5">
    <h3 class="text-uppercase gray pb-3">
      {{ $t("update_user_info") }}
    </h3>
    <v-divider></v-divider>
    <div class="mt-4">
      <v-form @submit.prevent="updateUser">
        <v-row>
          <v-col cols="12" sm="12" md="12" lg="4" xl="4">
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
          <v-col cols="12" sm="12" md="12" lg="4" xl="4">
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
          <v-col cols="12" sm="12" md="12" lg="4" xl="4">
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
          <v-col cols="12" md="12" lg="6" xl="6">
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
          <v-col cols="12" md="12" lg="6" xl="6">
            <v-text-field :label="$t('apt')" v-model="appertment">
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
          <div class="px-2 pb-2">
            <v-btn type="submit" outlined text color="teal"
              ><v-icon left>mdi-account-convert</v-icon
              >{{ $t("update") }}</v-btn
            >
          </div>
        </v-row>
      </v-form>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "UpdateUser",
  data: () => ({
    authUser: null,
    name: null,
    email: null,
    phone: null,
    city: null,
    appertment: null,
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
    ]
  }),
  methods: {
    updateUser() {
      if (
        this.name == null ||
        this.email == null ||
        this.phone == null ||
        this.street == null ||
        this.state == null ||
        this.city == null ||
        this.zip == null
      ) {
        $nuxt.$emit("You need to fill required fields");
        return;
      } else {
      }
    },
    fillUserInfo() {
      this.name = this.authUser.name;
      this.email = this.authUser.email;
      this.phone = this.authUser.phone;
      this.street = this.authUser.street;
      this.city = this.authUser.city;
      this.zip = this.authUser.zip;
      if (this.authUser.appertment != null) {
        this.appertment = this.authUser.appertment;
      }
      this.state = this.authUser.state;
    },
    updateUser() {
      this.$store.dispatch("auth/upadte_user", {
        name: this.name,
        email: this.email,
        phone: this.phone,
        street: this.street,
        city: this.city,
        zip: this.zip,
        state: this.state,
        appertment: this.appertment
      });
    }
  },
  mounted() {
    if (sessionStorage.getItem("myAuth") == "true") {
      this.authUser = JSON.parse(sessionStorage.getItem("authUser"));
    }
    this.fillUserInfo();
  }
};
</script>

<style></style>
