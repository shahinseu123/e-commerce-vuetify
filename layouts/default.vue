<template>
  <v-app light class="my__app">
    <v-app-bar color="white" dense app>
      <v-app-bar-nav-icon
        class="d-flex d-sm-flex d-md-none"
      ></v-app-bar-nav-icon>
      <v-toolbar-title class="pl-0">BD DESSERT</v-toolbar-title>
      <v-spacer></v-spacer>
      <div class="w_100 input__rel d-none d-sm-none d-md-flex">
        <input
          type="text"
          placeholder="Search product..."
          class="search__input"
        />
        <span class="icon__abs ">
          <v-icon>mdi-magnify</v-icon>
        </span>
      </div>
      <v-badge class="mx-1" overlap color="red" content="8">
        <v-btn small icon>
          <v-icon small>mdi-cart</v-icon>
        </v-btn>
      </v-badge>
      <v-badge class="mx-1" overlap color="red" content="8">
        <v-btn small icon>
          <v-icon small>mdi-heart</v-icon>
        </v-btn>
      </v-badge>
      <v-badge class="mx-1" overlap dot color="green">
        <v-btn small icon>
          <v-icon small>mdi-account</v-icon>
        </v-btn>
      </v-badge>
      <v-btn class="mx-1" x-small color="primary" elevation="0" dark>
        <v-icon left x-small>mdi-account-plus</v-icon>
        Login
      </v-btn>
    </v-app-bar>
    <v-app-bar class="t__48 ma-auto" color="white" elevation="0" dense app>
      <v-spacer></v-spacer>
      <v-btn text color="primary">
        <v-icon left>mdi-basket-plus</v-icon>
        shop by category
        <v-icon right>mdi-menu-down</v-icon>
      </v-btn>
      <nuxt-link to="/"><v-btn text small>Home</v-btn></nuxt-link>
      <nuxt-link to="/shop"><v-btn text small>Shop</v-btn></nuxt-link>
      <nuxt-link to="/blog"><v-btn text small>Blog</v-btn></nuxt-link>
      <nuxt-link to="/contact"><v-btn text small>contact</v-btn></nuxt-link>
      <nuxt-link to="/about"><v-btn text small>about</v-btn></nuxt-link>
      <v-spacer></v-spacer>
    </v-app-bar>
    <!-- main  -->
    <v-main>
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {};
</script>

<style scoped>
.my__app {
  background: #f5f5f5;
}
.t__48 {
  top: 48px;
}
.search__input {
  padding: 5px 5px;
  border: 1px solid lightgray;
  border-radius: 4px;
  width: 100%;
}
.w_100 {
  width: 69%;
}
.input__rel {
  position: relative;
}
.icon__abs {
  position: absolute;
  top: 0;
  right: 0;
  width: 40px;
  height: 100%;
  background: lightgray;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
