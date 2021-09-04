<template>
  <v-container fluid class="elevation-1 rounded-lg">
    <v-row class="bg__white">
      <v-col cols="12" sm="12" md="4">
        <v-img
          lazy-src="https://picsum.photos/id/11/10/6"
          src="https://picsum.photos/id/11/500/300"
        ></v-img>
      </v-col>
      <v-col cols="12" sm="6" md="4">
        <v-img
          lazy-src="https://picsum.photos/id/11/10/6"
          src="https://picsum.photos/id/11/500/300"
        ></v-img>
      </v-col>
      <v-col cols="12" sm="6" md="4">
        <v-img
          lazy-src="https://picsum.photos/id/11/10/6"
          src="https://picsum.photos/id/11/500/300"
        ></v-img>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "BannerTopHome"
};
</script>

<style scoped>
.bg__white {
  background: white;
}
</style>
