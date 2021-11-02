<template>
  <div id="intro">
    <h1 class="my__heading white--text text-h4 pt-10">
      {{ $t("our_service") }}
    </h1>
    <v-container>
      <v-row>
        <v-col cols="12" sm="6" md="3" lg="3" xl="3">
          <div class="flex__card mt-5">
            <v-icon x-large color="white">mdi-truck-delivery</v-icon>
            <p class="text-uppercase mt-4 text-white">
              {{ $t("free_service") }}
            </p>
          </div>
        </v-col>
        <v-col cols="12" sm="6" md="3" lg="3" xl="3">
          <div class="flex__card mt-5">
            <v-icon x-large color="white">mdi-clipboard-arrow-left</v-icon>
            <p class="text-uppercase mt-4 text-white">
              {{ $t("return_policy") }}
            </p>
          </div>
        </v-col>
        <v-col cols="12" sm="6" md="3" lg="3" xl="3">
          <div class="flex__card mt-5">
            <v-icon x-large color="white">mdi-face-agent</v-icon>
            <p class="text-uppercase mt-4 text-white">{{ $t("support") }}</p>
          </div>
        </v-col>
        <v-col cols="12" sm="6" md="3" lg="3" xl="3">
          <div class="flex__card mt-5">
            <v-icon x-large color="white">mdi-basket</v-icon>
            <p class="text-uppercase mt-4 text-white">
              {{ $t("genuin_product") }}
            </p>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Services"
};
</script>

<style scoped>
#intro {
  height: auto;
  width: 100%;
  background: lightseagreen;
}
.promodiv {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}
.text-white {
  color: white;
}
.flex__card {
  text-align: center;
  padding: 20px;
}
.promocode {
  padding: 10px 20px;
  background: white;
  color: teal;
  text-align: center;
  width: 200px;
}
.pera {
  margin: 0;
  text-align: center;
  color: white;
}
.discount {
  text-align: center;
  font-weight: 300;
  text-shadow: 4px 4px gray;
  margin-top: 30px;
  margin-bottom: 20px;
}
.my__heading {
  display: flex;
  width: 100%;
  align-items: center;
}
.my__heading::before,
.my__heading::after {
  content: "";

  background: white;
  height: 1px;
  margin: 20px;
  flex: 1;
}
</style>
