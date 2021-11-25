<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="290">
      <v-card>
        <v-card-title class="text-h5"> </v-card-title>
        <v-card-text>
          <div>
            <v-text-field
              v-model="newPassword"
              type="password"
              label="New password"
              required
              hide-details="auto"
            ></v-text-field>
          </div>
          <div>
            <v-text-field
              type="password"
              v-model="confirmnewPassword"
              label="Confirm password"
              required
              hide-details="auto"
            ></v-text-field>
            <span v-if="!match" class="text-red-500"
              >Password does not match</span
            >
            <span v-else class="text-green-500">Password match</span>
          </div>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="dialog = false">
            cancel
          </v-btn>
          <v-btn color="green darken-1" text @click="updatePassword">
            submit
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
export default {
  name: "SetNewPassword",
  data() {
    return {
      dialog: false,
      newPassword: "",
      confirmnewPassword: "",
      match: false,
      userId: null
    };
  },
  methods: {
    updatePassword() {
      try {
        if (this.match == true) {
          this.$store.dispatch("auth/update_password", {
            id: this.userId,
            password: this.newPassword
          });
        } else {
          $nuxt.$emit("product-failed", "Password does not match");
        }
      } catch (error) {
        console.log(error);
      }
    }
  },
  watch: {
    confirmnewPassword(newValue, oldValue) {
      if (newValue == this.newPassword) {
        this.match = true;
      } else {
        this.match = false;
      }
    }
  },
  mounted() {
    this.$nuxt.$on("hide-reset-modal", () => {
      this.dialog = false;
    });
    this.$nuxt.$on("hide-newpassword-modal", () => {
      this.dialog = false;
    });
    this.$nuxt.$on("show-newpassword-modal", id => {
      this.dialog = true;
      this.userId = id;
    });
  }
};
</script>
<style scoped>
.text-red-500 {
  color: red;
  font-size: 10px;
}
.text-green-500 {
  color: green;
  font-size: 10px;
}
</style>
