<template>
  <v-app light class="my__app">
    <!-- navigation drawer  -->
    <v-navigation-drawer v-model="drawer" :clipped="clipped" temporary app>
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar color="white" dense app elevation="0">
      <v-app-bar-nav-icon
        @click.stop="drawer = !drawer"
        class="d-flex d-sm-flex d-md-none"
      ></v-app-bar-nav-icon>
      <v-toolbar-title class="pl-0">BD DESSERT</v-toolbar-title>
      <v-spacer></v-spacer>
      <div class="w_100 input__rel d-none d-sm-none d-md-flex">
        <input
          type="text"
          v-model="searchText"
          placeholder="Search product..."
          class="search__input"
        />
        <span class="icon__abs ">
          <v-icon>mdi-magnify</v-icon>
        </span>
        <!-- suggest  -->
        <v-card v-if="searchText != '' && suggest.length > 0" class="abs_sugg">
          <v-list dense>
            <v-list-item-group>
              <v-list-item
                @click="selectItem(item.title)"
                v-for="item in suggest"
                :key="item.id"
              >
                <v-list-item-avatar>
                  <v-img
                    :src="
                      item.product_image != null
                        ? 'http://localhost:8000/uploads/media/' +
                          item.product_image
                        : 'https://flatsome3.uxthemes.com/wp-content/uploads/woocommerce-placeholder.png'
                    "
                  ></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title v-html="item.title"></v-list-item-title>
                  <v-list-item-subtitle
                    v-html="item.description"
                  ></v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </div>
      <v-badge class="mx-1" overlap color="red" :content="numberOfCartItems">
        <v-btn @click.stop="cartDrawer = !cartDrawer" small icon>
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
      <v-btn @click="showLogin" class="mx-1" small text>
        <v-icon class="mx-1" small>mdi-login-variant</v-icon>
        Login
      </v-btn>
      <v-btn
        class="d-flex d-sm-flex d-md-none"
        icon
        @click.stop="categoryDrawer = !categoryDrawer"
      >
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>
    <v-app-bar
      class="t__48 ma-auto d-none d-sm-none d-md-block app_var_z"
      color="white"
      elevation="0"
      dense
      app
    >
      <v-spacer></v-spacer>
      <v-btn
        @click="showCatMenu = !showCatMenu"
        text
        color="primary"
        class="cat__rel"
      >
        <v-icon left>mdi-basket-plus</v-icon>
        shop by category
        <v-icon right>mdi-menu-down</v-icon>
        <!-- category items  -->
        <span v-show="showCatMenu" class="cat__abs">
          <ul class="cat__ul">
            <li class="li__dis">
              <nuxt-link to="/">Category</nuxt-link
              ><v-icon right>mdi-menu-down</v-icon>
              <!-- sub menu  -->
              <!-- <ul class="cat__ul_sub">
                <li class="li__dis_sub">
                  <nuxt-link to="/">Sub category</nuxt-link>
                </li>
              </ul> -->
            </li>
            <li><nuxt-link to="/">Category</nuxt-link></li>
            <li><nuxt-link to="/">Category</nuxt-link></li>
          </ul>
        </span>
      </v-btn>
      <div class="d-none d-sm-none d-md-flex">
        <nuxt-link to="/"><v-btn text small>Home</v-btn></nuxt-link>
        <!-- <nuxt-link to="/shop"><v-btn text small>Shop</v-btn></nuxt-link> -->
        <nuxt-link to="/blog"><v-btn text small>Blog</v-btn></nuxt-link>
        <nuxt-link to="/contact"><v-btn text small>contact</v-btn></nuxt-link>
        <nuxt-link to="/about"><v-btn text small>about</v-btn></nuxt-link>
      </div>
      <v-spacer></v-spacer>
    </v-app-bar>
    <!-- main  -->
    <v-main>
      <div>
        <nuxt />
        <!-- snackbar  -->
        <v-snackbar v-model="snackbar" left>
          {{ text }}

          <template v-slot:action="{ attrs }">
            <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
              Close
            </v-btn>
          </template>
        </v-snackbar>
      </div>
    </v-main>
    <login />
    <register />
    <v-navigation-drawer
      v-model="categoryDrawer"
      :right="right"
      temporary
      fixed
    >
      <v-list> </v-list>
    </v-navigation-drawer>
    <v-navigation-drawer
      color="teal lighten-5"
      v-model="cartDrawer"
      :right="right"
      width="400"
      temporary
      fixed
    >
      <div class="pa-2">
        <cart />
      </div>
    </v-navigation-drawer>
    <footer />
    <v-footer app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>
// https://materialdesignicons.com/
<script>
import login from "~/components/login.vue";
export default {
  name: "Default",
  components: { login },
  data: () => ({
    numberOfCartItems: 0,
    showCatMenu: false,
    drawer: false,
    categoryDrawer: false,
    cartDrawer: false,
    right: true,
    clipped: false,
    fixed: true,
    snackbar: false,
    text: "",
    searchText: "",
    items: [
      {
        icon: "mdi-home",
        title: "Home",
        to: "/"
      },
      // {
      //   icon: "mdi-store",
      //   title: "Shop",
      //   to: "/shop"
      // },
      {
        icon: "mdi-post-outline",
        title: "Blog",
        to: "/blog"
      },
      {
        icon: "mdi-information",
        title: "Contact",
        to: "/contact"
      },
      {
        icon: "mdi-account-box",
        title: "About",
        to: "/about"
      }
    ],
    suggest: []
  }),
  computed: {
    allRproduct() {
      return this.$store.state.product.products;
    }
  },
  methods: {
    selectItem(text) {
      this.searchText = text;
      this.$router.push({ path: "/product/" + text });
      setTimeout(() => {
        this.searchText = "";
      }, 2000);
    },
    showLogin() {
      $nuxt.$emit("show-login");
    },
    searchSuggession(query) {
      this.suggest = this.allRproduct
        .filter(item => {
          return item.title.includes(query);
        })
        .slice(0, 8);
    }
  },
  watch: {
    searchText(newValue, oldValue) {
      this.searchSuggession(newValue);
    }
  },
  mounted() {
    this.$nuxt.$on("add-to-cart", () => {
      if (sessionStorage.getItem("cartProduct") != undefined) {
        let cartItems = JSON.parse(sessionStorage.getItem("cartProduct"));
        this.numberOfCartItems = cartItems.length;
      }
    });
    this.$nuxt.$on("product-failed", text => {
      this.text = text;
      this.snackbar = true;
    });
    this.$nuxt.$on("category-failed", text => {
      this.text = text;
      this.snackbar = true;
    });
    this.$nuxt.$on("brand-failed", text => {
      this.text = text;
      this.snackbar = true;
    });
    if (sessionStorage.getItem("cartProduct") != undefined) {
      let cartItems = JSON.parse(sessionStorage.getItem("cartProduct"));
      this.numberOfCartItems = cartItems.length;
    }
  }
};
</script>

<style scoped>
.v-snack__wrapper {
  position: fixed;
  bottom: 0;
  left: 0;
}
.app_var_z {
  z-index: 2 !important;
}
.my__app {
  background: #f5f5f5;
}
.t__48 {
  top: 48px;
}
.text__teal {
  color: teal;
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
.abs_sugg {
  position: absolute;
  width: 100%;
  top: 38px;
  left: 0;
  background: white;
  height: auto;
  z-index: 9;
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
.cat__rel {
  position: relative;
}
.cat__abs {
  position: absolute;
  top: 34px;
  left: -15px;
  width: auto;
  width: 116%;
  background: white;
  padding-left: 0;
}
.cat__abs ul li {
  list-style-type: none;
  padding: 10px 10px;
  text-align: left;
}
.cat__abs ul li:hover {
  background: lightblue;
}
a {
  text-decoration: none;
}
.li__dis {
  display: flex;
  justify-content: space-between;
}
.cat__ul {
  padding: 0;
}
/* .li__dis {
  position: relative;
}
.li__dis_sub {
  position: absolute;
  left: 100%;
  top: 0;
  width: 100%;
  height: auto;
  background: white;
} */
</style>
