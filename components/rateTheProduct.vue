<template>
  <div>
    <v-card class="mx-auto my-5 pa-5" max-width="600">
      <v-form @submit.prevent="createRating">
        <v-rating
          class="mb-3"
          v-model="form.rate"
          background-color="teal lighten-3"
          color="teal"
        ></v-rating>
        <v-textarea
          outlined
          name="review"
          label="Comment"
          v-model="form.review"
        ></v-textarea>
        <v-btn type="submit" color="teal" outlined block dark
          ><v-icon left>mdi-star</v-icon> {{ $t("rate_now") }}</v-btn
        >
      </v-form>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "RateTheProduct",
  props: {
    product: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({
    form: {
      review: null,
      rate: 0,
      product_id: null
    }
  }),
  methods: {
    createRating() {
      if (sessionStorage.getItem("myAuth") === "true") {
        this.$store.dispatch("review/make_review", this.form);
        this.form.review = "";
        this.form.rate = null;
      } else {
        $nuxt.$emit("show-login");
        $nuxt.$emit("product-failed", "You need to login first to rate");
      }
    }
  },

  mounted() {
    if (this.product) {
      this.form.product_id = this.product.id;
    } else {
      setTimeout(() => {
        this.product_id = this.product.id;
      }, 1000);
    }
  }
};
</script>

<style></style>
