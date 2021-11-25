<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="290">
      <v-card>
        <v-card-title class="text-h5"> </v-card-title>
        <v-card-text>
          <div>
            <v-text-field
              v-model="code"
              label="Enter code"
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
          <v-btn color="green darken-1" text @click="confirmCode">
            submit
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
export default {
  name: "CodeConfirmModal",
  data() {
    return {
      dialog: false,
      code: ""
    };
  },
  methods: {
    confirmCode() {
      try {
        this.$store.dispatch("auth/confirm_code", { code: this.code });
      } catch (error) {
        console.log(error);
      }
    }
  },
  mounted() {
    this.$nuxt.$on("show-confirmCode-modal", () => {
      this.dialog = true;
    });
    this.$nuxt.$on("hide-confirmCode-modal", () => {
      this.dialog = false;
    });
  }
};
</script>
