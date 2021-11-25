<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="290">
      <v-card>
        <v-card-title class="text-h5"> </v-card-title>
        <v-card-text>
          <div>
            <v-text-field
              v-model="email"
              label="Enter your user email"
              :rules="emailRules"
              required
              hide-details="auto"
            ></v-text-field>
          </div>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="dialog = false">
            cancel
          </v-btn>
          <v-btn color="green darken-1" text @click="sendCode">
            send code
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
export default {
  name: "ResetPassword",
  data() {
    return {
      dialog: false,
      email: "",
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+/.test(v) || "E-mail must be valid"
      ]
    };
  },
  methods: {
    sendCode() {
      try {
        this.$store.dispatch("auth/send_code", { email: this.email });
      } catch (error) {
        console.log(error);
      }
    }
  },
  mounted() {
    this.$nuxt.$on("hide-reset-modal", () => {
      this.dialog = false;
    });
    this.$nuxt.$on("reset-modal-open", () => {
      this.dialog = true;
    });
  }
};
</script>
