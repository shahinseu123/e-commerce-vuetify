<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="500px">
      <v-card>
        <v-form @submit.prevent="userLogin">
          <v-card-title class="login_h">
            <span class="text-h4">USER LOGIN</span>
          </v-card-title>
          <v-card-text>
            <v-row>
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
            </v-row>

            <span>Not registered yet?</span
            ><v-btn @click="showRegister" small color="teal darken-2" text
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
  name: "Login",
  data: () => ({
    dialog: false,
    valid: false,
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+/.test(v) || "E-mail must be valid"
    ],
    password: "",
    passwordRules: [v => !!v || "Password is required"]
  }),
  methods: {
    showRegister() {
      this.dialog = false;
      $nuxt.$emit("show-register");
    },
    async userLogin() {
      try {
        let res = await fetch("http://localhost:8000/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            email: this.email,
            password: this.password
          })
        });
        if (res.status == 200) {
          this.$store.dispatch("auth/get_auth_user");
          sessionStorage.setItem("myAuth", true);
          // await this.$router.push("/user/dashboard");
          $nuxt.$emit("product-failed", "Login successfull");
          this.dialog = false;
        } else {
          $nuxt.$emit("product-failed", "Login unsuccessfull, try again later");
        }
      } catch (error) {
        sessionStorage.setItem("myAuth", false);
        $nuxt.$emit("product-failed", "There are some server issue happend");
        console.log(error);
      }
    }
  },
  mounted() {
    this.$nuxt.$on("show-login", () => {
      this.dialog = true;
    });
    this.$nuxt.$on("open-login", () => {
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
