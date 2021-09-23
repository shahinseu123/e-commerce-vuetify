<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="500px">
      <v-card>
        <v-form @submit.prevent="register">
          <v-card-title class="login_h">
            <span class="text-h4">USER REGISTER</span>
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12" sm="6" md="6" lg="6" xl="6">
                <v-text-field
                  label="Name*"
                  v-model="name"
                  :rules="nameRules"
                  required
                >
                  <v-icon slot="append" color="teal">
                    mdi-account
                  </v-icon></v-text-field
                >
              </v-col>
              <v-col cols="12" sm="6" md="6" lg="6" xl="6">
                <v-text-field
                  label="Phone*"
                  v-model="phone"
                  :rules="phoneRules"
                  required
                >
                  <v-icon slot="append" color="teal">
                    mdi-phone
                  </v-icon></v-text-field
                >
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Email*"
                  v-model="email"
                  :rules="emailRules"
                  required
                >
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
                  v-model="password"
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
                  v-model="password_confirmation"
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
            <v-btn type="submit" color="teal lighten-1" text>
              <v-icon left>mdi-login-variant</v-icon>
              Submit
            </v-btn>
          </v-card-actions>
        </v-form>
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
    passwordRules: [v => !!v || "Password is required"],
    password_confirmation: ""
  }),
  methods: {
    async register() {
      try {
        let res = await fetch("http://localhost:8000/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            name: this.name,
            email: this.email,
            phone: this.phone,
            password: this.password,
            password_confirmation: this.password_confirmation
          })
        });
        if (res.status == 200) {
          this.$store.dispatch("auth/get_auth_user");
          sessionStorage.setItem("myAuth", true);
          // await this.$router.push("/");
          // $nuxt.$emit("login-success");
          $nuxt.$emit("product-failed", "User registration successfull");
          this.dialog = false;
        } else {
          $nuxt.$emit(
            "product-failed",
            "Registration unsuccessfull, try again later"
          );
        }
      } catch (error) {
        sessionStorage.setItem("myAuth", false);

        $nuxt.$emit("product-failed", "There is some server issue happend");
      }
    },
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
