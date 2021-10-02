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
      <v-spacer></v-spacer>
      <v-badge
        class="mx-1"
        overlap
        color="red"
        :content="numberOfCartItems > 0 ? numberOfCartItems : 'O'"
      >
        <v-btn @click.stop="cartDrawer = !cartDrawer" small icon>
          <v-icon small>mdi-cart</v-icon>
        </v-btn>
      </v-badge>
      <v-badge
        class="mx-1"
        overlap
        color="red"
        :content="wishCount.length > 0 ? wishCount.length : 'O'"
      >
        <v-btn small icon>
          <v-icon small>mdi-heart</v-icon>
        </v-btn>
      </v-badge>
      <v-badge v-show="auth == 'true'" class="mx-1" overlap dot color="green">
        <v-btn @click="gotoDashboard" small icon>
          <v-icon small>mdi-account</v-icon>
        </v-btn>
      </v-badge>
      <v-btn v-show="auth != 'true'" @click="showLogin" class="mx-1" small text>
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
        class="cat__rel ml__160"
      >
        <v-icon left>mdi-basket-plus</v-icon>
        shop by category
        <v-icon right>mdi-menu-down</v-icon>
        <!-- category items  -->
        <span v-show="showCatMenu" class="cat__abs">
          <ul v-if="getCategory.length > 0" class="cat_one_q">
            <li
              v-for="cat_one in getCategory"
              :key="cat_one.id"
              class="flex__li main_li_rel"
            >
              <div class="flex__li">
                <v-img
                  class="mr-2 rounded-circle"
                  height="35"
                  width="35"
                  :src="
                    cat_one.category_image != null
                      ? 'http://localhost:8000/uploads/media/' +
                        cat_one.category_image
                      : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM8oE5gpw4fs_EdFLXESrR88AOx4y6a2SawQ&usqp=CAU'
                  "
                ></v-img>
                <nuxt-link :to="`/category/${cat_one.category_title}`">{{
                  cat_one.category_title
                }}</nuxt-link>
              </div>
              <div>
                <v-icon v-if="cat_one.child.length > 0">mdi-menu-down</v-icon>
              </div>
              <ul v-if="cat_one.child.length > 0" class="cat_two_ul ">
                <li
                  v-for="cat_two in cat_one.child"
                  :key="cat_two.id"
                  class="flex__li cat_tree_rel"
                >
                  <div class="flex__li">
                    <v-img
                      class="mr-2 rounded-circle"
                      height="35"
                      width="35"
                      :src="
                        cat_two.category_image != null
                          ? 'http://localhost:8000/uploads/media/' +
                            cat_two.category_image
                          : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM8oE5gpw4fs_EdFLXESrR88AOx4y6a2SawQ&usqp=CAU'
                      "
                    ></v-img>
                    <nuxt-link :to="`/category/${cat_two.category_title}`">{{
                      cat_two.category_title
                    }}</nuxt-link>
                  </div>
                  <div>
                    <v-icon v-if="cat_two.child.length > 0"
                      >mdi-menu-down</v-icon
                    >
                  </div>
                  <ul v-if="cat_two.child.length > 0" class="cat_three_ul">
                    <li
                      v-for="cat_three in cat_two.child"
                      :key="cat_three.id"
                      class="flex__li"
                    >
                      <div class="flex__li">
                        <v-img
                          class="mr-2 rounded-circle"
                          height="35"
                          width="35"
                          :src="
                            cat_three.category_image != null
                              ? 'http://localhost:8000/uploads/media/' +
                                cat_three.category_image
                              : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM8oE5gpw4fs_EdFLXESrR88AOx4y6a2SawQ&usqp=CAU'
                          "
                        ></v-img>
                        <nuxt-link
                          :to="`/category/${cat_three.category_title}`"
                          >{{ cat_three.category_title }}</nuxt-link
                        >
                      </div>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </span>
      </v-btn>

      <div class="d-none d-sm-none d-md-flex ml__18">
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
              <v-icon>mdi-close</v-icon>
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
      width="350"
      temporary
      fixed
    >
      <v-card>
        <ul v-if="getCategory.length > 0" class="side__ul">
          <li
            v-for="cat_one in getCategory"
            :key="cat_one.id"
            class="side_ul_fir"
          >
            <div class="flex__li">
              <div class="flex__li">
                <v-img
                  class="mr-2 rounded-circle"
                  height="35"
                  width="35"
                  :src="
                    cat_one.category_image != null
                      ? 'http://localhost:8000/uploads/media/' +
                        cat_one.category_image
                      : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM8oE5gpw4fs_EdFLXESrR88AOx4y6a2SawQ&usqp=CAU'
                  "
                ></v-img>
                <nuxt-link :to="`/category/${cat_one.category_title}`">{{
                  cat_one.category_title
                }}</nuxt-link>
              </div>
              <div>
                <v-icon v-if="cat_one.child.length > 0">mdi-menu-down</v-icon>
              </div>
            </div>
            <div>
              <ul
                v-if="cat_one.child.length > 0"
                class="side__ul_two elevation-2"
              >
                <li
                  v-for="cat_two in cat_one.child"
                  :key="cat_two.id"
                  class="slide_cat_sec"
                >
                  <div class="flex__li">
                    <div class="flex__li">
                      <v-img
                        class="mr-2 rounded-circle"
                        height="35"
                        width="35"
                        :src="
                          cat_two.category_image != null
                            ? 'http://localhost:8000/uploads/media/' +
                              cat_two.category_image
                            : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM8oE5gpw4fs_EdFLXESrR88AOx4y6a2SawQ&usqp=CAU'
                        "
                      ></v-img>
                      <nuxt-link :to="`/category/${cat_two.category_title}`">{{
                        cat_two.category_title
                      }}</nuxt-link>
                    </div>
                    <div>
                      <v-icon v-if="cat_two.child.length > 0"
                        >mdi-menu-down</v-icon
                      >
                    </div>
                  </div>
                  <!-- here  -->
                  <div>
                    <ul
                      v-if="cat_two.child.length > 0"
                      class="side__ul_three elevation-2"
                    >
                      <li
                        v-for="cat_two in cat_one.child"
                        :key="cat_two.id"
                        class="slide_cat_sec"
                      >
                        <div class="flex__li">
                          <div class="flex__li">
                            <v-img
                              class="mr-2 rounded-circle"
                              height="35"
                              width="35"
                              :src="
                                cat_two.category_image != null
                                  ? 'http://localhost:8000/uploads/media/' +
                                    cat_two.category_image
                                  : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM8oE5gpw4fs_EdFLXESrR88AOx4y6a2SawQ&usqp=CAU'
                              "
                            ></v-img>
                            <nuxt-link
                              :to="`/category/${cat_two.category_title}`"
                              >{{ cat_two.category_title }}</nuxt-link
                            >
                          </div>
                          <!-- <div>
                            <v-icon v-if="cat_two.child.length > 0"
                              >mdi-menu-down</v-icon
                            >
                          </div> -->
                        </div>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </v-card>
    </v-navigation-drawer>
    <v-navigation-drawer
      color="grey lighten-5"
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
    <v-footer dark padless>
      <v-card flat tile class="teal darken-1 white--text text-center">
        <v-card-text>
          <v-btn
            v-for="icon in icons"
            :key="icon"
            class="mx-4 white--text"
            icon
          >
            <v-icon size="24px">
              {{ icon }}
            </v-icon>
          </v-btn>
        </v-card-text>

        <v-card-text class="white--text pt-0">
          Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet.
          Mauris cursus commodo interdum. Praesent ut risus eget metus luctus
          accumsan id ultrices nunc. Sed at orci sed massa consectetur dignissim
          a sit amet dui. Duis commodo vitae velit et faucibus. Morbi vehicula
          lacinia malesuada. Nulla placerat augue vel ipsum ultrices, cursus
          iaculis dui sollicitudin. Vestibulum eu ipsum vel diam elementum
          tempor vel ut orci. Orci varius natoque penatibus et magnis dis
          parturient montes, nascetur ridiculus mus.
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text class="white--text">
          {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
        </v-card-text>
      </v-card>
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
    icons: ["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"],
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
    auth: false,
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
    },
    wishCount() {
      return this.$store.state.wish.wish;
    },
    getCategory() {
      return this.$store.state.category.categories;
    }
  },
  methods: {
    gotoDashboard() {
      this.$router.push({ path: "/user/dashboard" });
    },
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
    this.$nuxt.$on("login-success", () => {
      this.auth = sessionStorage.getItem("myAuth");
    });
    this.auth = sessionStorage.getItem("myAuth");
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
.gray_c {
  color: #e9ebec;
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
  width: 135%;
  left: -14px;
  top: 35px;
  background: white;
}
.cat_one_q {
  padding: 0;
}
.cat_one_q li {
  list-style-type: none;
  padding: 5px;
  border-bottom: 1px solid #f0f0f4;
}

a {
  text-decoration: none;
}
.flex__li {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.main_li_rel {
  position: relative;
}
.cat_two_ul {
  position: absolute;
  right: -100%;
  top: 0;
  background: white;
  padding: 0;
  display: none;
}
.main_li_rel:hover .cat_two_ul {
  display: block;
}
.cat_tree_rel {
  position: relative;
}
.cat_three_ul {
  position: absolute;
  right: -87%;
  top: 0;
  background: white;
  padding: 0;
  display: none;
}
.cat_tree_rel:hover .cat_three_ul {
  display: block;
}
.ml__160 {
  margin-left: -160px;
}
.ml__18 {
  margin-left: 18px;
}
.side__ul {
  list-style-type: none;
  padding: 0;
}
.side__ul li {
  padding: 7px 10px;
  border-bottom: 1px solid #f0f0f4;
}
.side_ul_fir {
  position: relative;
}
.side__ul_two {
  position: absolute;
  left: 0;
  top: 49px;
  border-left: 4px solid teal;
  padding: 0;
  width: 100%;
  height: 0;
  overflow: hidden;
  transition: 0.5s all linear;
  background: white;
  z-index: 9;
}
.side_ul_fir:hover .side__ul_two {
  height: auto;
  transition: 1s;
}
.slide_cat_sec {
  position: relative;
}
.side__ul_three {
  position: absolute;
  left: 0;
  top: 49px;
  border-left: 4px solid teal;
  padding: 0;
  width: 100%;
  height: 0;
  overflow: hidden;
  transition: 0.5s all linear;
  background: white;
  z-index: 9;
}
.slide_cat_sec:hover .side__ul_three {
  height: auto;
  transition: 1s;
}
</style>
