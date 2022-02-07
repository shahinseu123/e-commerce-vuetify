<template>
  <v-container fluid class="mt-res">
    <v-row>
      <v-col cols="12" sm="6" md="4" lg="3" xl="2" class="padding_right">
        <user-sidebar class="margin__t" />
      </v-col>
      <v-col cols="12" sm="6" md="6" lg="9" xl="10" class="padding_left">
        <div class="margin__t">
          <updateuser />
          <updatePassword />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import updatePassword from "~/components/updatePassword.vue";
import updateuser from "~/components/updateUser.vue";
export default {
  components: { updatePassword, updateuser },
  name: "UpdateUserInfo",
  middleware: ["isAuth"],
  data: () => ({}),
  methods: {},
  mounted() {},
  asyncData({ store }) {
    if (store.state.product.products.length === 0) {
      store.dispatch("brand/get_all_brands");
      store.dispatch("category/get_all_category");
      store.dispatch("product/get_all_product");
      store.dispatch("product/get_sorted_product");
      store.dispatch("wish/get_wish");
    }
  }
};
</script>

<style scoped>
.margin__t {
  margin-top: 45px;
}
.padding_right {
  padding-right: 5px;
}
.padding_left {
  padding-left: 5px;
}
.gray {
  color: gray;
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
