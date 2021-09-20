<template>
  <div>
    <v-card class="mx-auto my-5 pa-5" max-width="600">
      <v-form>
        <v-rating
          class="mb-3"
          v-model="rating"
          background-color="teal lighten-3"
          color="teal"
        ></v-rating>
        <v-textarea
          outlined
          name="input-7-4"
          label="Comment"
          value=""
        ></v-textarea>
        <v-btn color="teal" block dark
          ><v-icon left>mdi-star</v-icon> rate now</v-btn
        >
      </v-form>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "RateTheProduct",
  data: () => ({
    rating: null
  })
};
</script>

<style></style>
