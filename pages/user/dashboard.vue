<template>
  <v-container fluid>
    <v-row>
      <v-col class="p__right" cols="12" sm="6" md="4" lg="3" xl="2">
        <user-sidebar class="margin__t" />
      </v-col>
      <v-col class="p__left" cols="12" sm="6" md="6" lg="9" xl="10">
        <v-card class="pa-5 margin__t height_f" elevation="1">
          <v-row>
            <v-col>
              <dash-card color="teal"></dash-card>
            </v-col>
            <v-col>
              <dash-card color="green"></dash-card>
            </v-col>
            <v-col>
              <dash-card color="red"></dash-card>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import userSidebar from "~/components/userSidebar.vue";
export default {
  middleware: ["isAuth"],
  components: { userSidebar },
  name: "Dashboard"
};
</script>

<style scoped>
.margin__t {
  margin-top: 44px;
}
.p__right {
  padding-right: 0 !important;
}
.p_left {
  padding-left: 0 !important;
}

.height_f {
  height: 80vh;
}
</style>
