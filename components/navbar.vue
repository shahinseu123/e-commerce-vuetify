<template>
  <v-app>
    <v-app-bar color="white" dense app>
      <v-app-bar-nav-icon
        class="d-flex d-sm-flex d-md-none"
      ></v-app-bar-nav-icon>
      <v-toolbar-title>BD DESSERT</v-toolbar-title>
      <v-spacer></v-spacer>
      <div class="w_100 input__rel">
        <input
          v-model="searchInput"
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
        Login
      </v-btn>
    </v-app-bar>
    <v-app-bar class="t__48 ma-auto" color="white" elevation="0" dense app>
      <v-spacer></v-spacer>
      <nuxt-link to="/"><v-btn text small>Home</v-btn></nuxt-link>
      <nuxt-link to="/shop"><v-btn text small>Shop</v-btn></nuxt-link>
      <nuxt-link to="/blog"><v-btn text small>Blog</v-btn></nuxt-link>
      <nuxt-link to="/contact"><v-btn text small>contact</v-btn></nuxt-link>
      <nuxt-link to="/about"><v-btn text small>about</v-btn></nuxt-link>
    </v-app-bar>
  </v-app>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      searchInput: ""
    };
  },
  watch: {
    searchInput(newValue, oldValue) {
      console.log(newValue);
    }
  }
};
</script>

<style scoped>
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
