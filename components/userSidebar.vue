<template>
  <v-card class="mx-auto" tile elevation="1">
    <v-list dense>
      <div class="py-5 flex__dis">
        <div class="te_c">
          <h3>Shahin Alam</h3>
          <p>shahina@gmail.com</p>
        </div>
      </div>
      <v-divider></v-divider>
      <v-list-item-group v-model="selectedItem" color="primary">
        <v-list-item @click="goDashboard(0)">
          <v-list-item-icon>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title> Dashboard </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="goOrders(1)">
          <v-list-item-icon>
            <v-icon>mdi-basket</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title> My Order </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="goCart(2)">
          <v-list-item-icon>
            <v-icon>mdi-cart</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title> My Cart </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="goWishlist(3)">
          <v-list-item-icon>
            <v-icon>mdi-heart</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title> My Wish List </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="goUpdateAccount(4)">
          <v-list-item-icon>
            <v-icon>mdi-account</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title> Update Account </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="logout(5)">
          <v-list-item-icon>
            <v-icon color="red">mdi-logout-variant</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title> Logout </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
export default {
  name: "UserSidebar",
  data: () => ({
    selectedItem: 0
  }),
  methods: {
    goDashboard(index) {
      sessionStorage.setItem("userIndex", index);
      this.$router.push({ path: "/user/dashboard" });
    },
    goOrders(index) {
      sessionStorage.setItem("userIndex", index);
      this.$router.push({ path: "/user/my-order" });
    },
    goOrders(index) {
      sessionStorage.setItem("userIndex", index);
      this.$router.push({ path: "/user/my-order" });
    },
    goCart(index) {
      sessionStorage.setItem("userIndex", index);
      this.$router.push({ path: "/user/my-cart" });
    },
    goWishlist(index) {
      sessionStorage.setItem("userIndex", index);
      this.$router.push({ path: "/user/my-wishlist" });
    },
    goUpdateAccount(index) {
      sessionStorage.setItem("userIndex", index);
      this.$router.push({ path: "/user/update-user" });
    },
    logout(index) {}
  },
  mounted() {
    this.selectedItem = parseInt(sessionStorage.getItem("userIndex"));
  }
};
</script>

<style scoped>
.flex__dis {
  display: flex;
  justify-content: center;
  align-items: center;
}
.te_c {
  text-align: center;
}
</style>
