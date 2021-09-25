<template>
  <v-card
    class="mx-auto pa-5 "
    :color="color"
    dark
    max-width="344"
    height="150"
  >
    <div class="d__flex">
      <div class="">
        <h1>23 Orders</h1>
      </div>
      <div>
        <v-icon x-large>mdi-basket</v-icon>
      </div>
    </div>
    <v-card-actions>
      <v-btn outlined text class="mt-5">
        more
        <v-icon small right>mdi-arrow-right</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "DashCard",
  props: {
    color: {
      type: String,
      required: true
    }
  }
};
</script>

<style scoped>
.d__flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
