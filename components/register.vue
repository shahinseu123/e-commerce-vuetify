<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="500px">
      <v-card>
        <v-card-title class="login_h">
          <span class="text-h4">USER REGISTER</span>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" sm="6" md="6" lg="6" xl="6">
              <v-text-field label="Name*" :rules="nameRules" required>
                <v-icon slot="append" color="teal">
                  mdi-account
                </v-icon></v-text-field
              >
            </v-col>
            <v-col cols="12" sm="6" md="6" lg="6" xl="6">
              <v-text-field label="Phone*" :rules="phoneRules" required>
                <v-icon slot="append" color="teal">
                  mdi-phone
                </v-icon></v-text-field
              >
            </v-col>
            <v-col cols="12">
              <v-text-field label="Email*" :rules="emailRules" required>
                <v-icon slot="append" color="teal">
                  mdi-email
                </v-icon></v-text-field
              >
            </v-col>

            <v-col cols="12">
              <v-text-field
                label="Password*"
                :rules="passwordRules"
                type="password"
                required
              >
                <v-icon slot="append" color="teal">
                  mdi-lock
                </v-icon></v-text-field
              >
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="Password*"
                :rules="passwordRules"
                type="password"
                required
              >
                <v-icon slot="append" color="teal">
                  mdi-lock
                </v-icon></v-text-field
              >
            </v-col>
          </v-row>
          <span>Already registered?</span
          ><v-btn @click="showLogin" small color="teal darken-2" text
            >click here</v-btn
          >
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red lighten-1" text @click="dialog = false">
            <v-icon left>mdi-close</v-icon>
            Close
          </v-btn>
          <v-btn color="teal lighten-1" text @click="dialog = false">
            <v-icon left>mdi-login-variant</v-icon>
            Submit
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
export default {
  name: "Register",
  data: () => ({
    dialog: false,
    valid: false,
    name: "",
    nameRules: [v => !!v || "Name is required"],
    phone: "",
    phoneRules: [
      v => !!v || "Phone number is required",
      v => /^[0-9]*\d$/.test(v) || "Phone number must be valid"
    ],
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+/.test(v) || "E-mail must be valid"
    ],
    password: "",
    passwordRules: [v => !!v || "Password is required"]
  }),
  methods: {
    showLogin() {
      this.dialog = false;
      $nuxt.$emit("show-login");
    }
  },
  mounted() {
    this.$nuxt.$on("show-register", () => {
      this.dialog = true;
    });
  }
};
</script>
<style scoped>
.login_h {
  display: flex;
  border-bottom: 1px solid teal;
  justify-content: center;
  color: white;
  background: teal;
}
</style>
