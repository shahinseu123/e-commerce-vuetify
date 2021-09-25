<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" sm="6" md="4" lg="3" xl="2" class="p__right">
        <user-sidebar class="margin__t" />
      </v-col>
      <v-col cols="12" sm="6" md="6" lg="9" xl="10" class="p__left">
        <v-simple-table class="margin__t elevation-1">
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">
                  Name
                </th>
                <th class="text-left">
                  Email
                </th>
                <th class="text-left">
                  Phone
                </th>
                <th class="text-left">
                  Total
                </th>
                <th class="text-left">
                  Status
                </th>
                <th class="text-left">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Shahin</td>
                <td>shahin@gmail.cpm</td>
                <td>234523452</td>
                <td>345</td>
                <td><v-btn color="teal" dark small>processing</v-btn></td>
                <td>
                  <v-btn fab x-small color="teal" dark elevation="1"
                    ><v-icon small>mdi-eye-outline</v-icon></v-btn
                  >
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "MyOrder",
  middleware: ["isAuth"]
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
