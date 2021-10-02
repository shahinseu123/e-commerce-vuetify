<template>
  <v-card elevation="1" class="pa-5 mt-3">
    <h3 class="text-uppercase gray pb-3">
      Update Password
    </h3>
    <v-divider></v-divider>
    <div class="mt-4">
      <v-form @submit.prevent="updatePassword">
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
          <v-col cols="12" sm="12" md="6" lg="6" xl="6">
            <v-text-field
              label="Old Password*"
              :rules="passwordRules"
              required
              type="password"
              v-model="oldPassword"
            >
              <v-icon slot="append" color="teal">
                mdi-lock
              </v-icon></v-text-field
            >
          </v-col>
          <v-col cols="12" sm="12" md="6" lg="6" xl="6">
            <v-text-field
              label="New Password*"
              :rules="passwordRules"
              required
              type="password"
              v-model="newPassword"
            >
              <v-icon slot="append" color="teal">
                mdi-lock
              </v-icon></v-text-field
            >
          </v-col>

          <div class="px-2 pb-2">
            <v-btn outlined type="submit" text color="teal"
              ><v-icon left>mdi-lock-reset</v-icon> update password</v-btn
            >
          </div>
        </v-row>
      </v-form>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "UpdatePassword",
  data: () => ({
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+/.test(v) || "E-mail must be valid"
    ],
    email: null,
    oldPassword: null,
    passwordRules: [v => !!v || "Password is required"],
    newPassword: null
  }),
  methods: {
    updatePassword() {
      this.$store.dispatch("auth/upadte_password", {
        email: this.email,
        password_old: this.oldPassword,
        password_new: this.password_new
      });
    }
  }
};
</script>

<style></style>
