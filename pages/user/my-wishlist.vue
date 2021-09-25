<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" sm="6" md="4" lg="3" xl="2">
        <user-sidebar class="margin__t" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "MyWishList",
  middleware: ["isAuth"]
};
</script>

<style scoped>
.margin__t {
  margin-top: 40px;
}
</style>
