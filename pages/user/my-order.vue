<template>
  <v-container fluid class="mt-res">
    <v-row class="mb-1">
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
            <tbody v-if="authUser !== null && authUser.order.length > 0">
              <tr v-for="order in authUser.order" :key="order.id">
                <td>{{ order.name }}</td>
                <td>{{ order.email }}</td>
                <td>{{ order.phone }}</td>
                <td>345</td>
                <td>
                  <v-btn
                    v-if="order.status == 'Processing'"
                    color="teal"
                    dark
                    small
                    >{{ order.status }}</v-btn
                  >
                  <v-btn
                    v-else-if="order.status == 'Delivered'"
                    color="green"
                    dark
                    small
                    >{{ order.status }}</v-btn
                  >
                  <v-btn v-else color="red" dark small>{{
                    order.status
                  }}</v-btn>
                </td>
                <td>
                  <v-btn
                    @click="openBottomSheet(order.id)"
                    fab
                    x-small
                    color="teal"
                    dark
                    elevation="1"
                    ><v-icon small>mdi-eye-outline</v-icon></v-btn
                  >
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>
    <bottm-sheet />
  </v-container>
</template>

<script>
import bottmSheet from "~/components/bottmSheet.vue";
export default {
  components: { bottmSheet },
  name: "MyOrder",
  middleware: ["isAuth"],
  data() {
    return {
      authUser: null
    };
  },
  asyncData({ store }) {
    if (store.state.product.products.length === 0) {
      store.dispatch("brand/get_all_brands");
      store.dispatch("category/get_all_category");
      store.dispatch("product/get_all_product");
      store.dispatch("product/get_sorted_product");
      store.dispatch("wish/get_wish");
    }
  },
  methods: {
    openBottomSheet(id) {
      $nuxt.$emit("open-sheet", id);
    }
  },
  mounted() {
    // if (sessionStorage.getItem("authUser") !== undefined) {
    this.authUser = JSON.parse(sessionStorage.getItem("authUser"));
    // }
    this.$store.dispatch("auth/get_auth_user");
  }
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
@media only screen and (max-width: 959px) {
  .mt-res {
    margin-top: -42px;
  }
}
@media only screen and (min-width: 600px) {
  .mt__10 {
    margin-top: 0 !important;
  }
}
</style>
