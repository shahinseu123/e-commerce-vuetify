<template>
  <v-card class="mx-1 mb-1 card_rel" max-width="250" elevation="0">
    <nuxt-link :to="localePath(`/product/${product.title}`)">
      <v-img
        style="height: 180px"
        :lazy-src="
          product.product_image != null
            ? 'http://localhost:8000/uploads/media/' + product.product_image
            : 'https://flatsome3.uxthemes.com/wp-content/uploads/woocommerce-placeholder.png'
        "
        :src="
          product.product_image != null
            ? 'http://localhost:8000/uploads/media/' + product.product_image
            : 'https://flatsome3.uxthemes.com/wp-content/uploads/woocommerce-placeholder.png'
        "
      ></v-img>
    </nuxt-link>
    <div class="mt-2">
      <h4 class="upcase gray__text">
        {{ $i18n.locale == "en" ? product.title : product.title_bd }}
      </h4>
    </div>
    <div v-if="product.productdata[0] != undefined" class="d__flex">
      <p class="upcase font__size_sm teal__text">
        {{ product.productdata[0].sale_price }} {{ $t("tk") }}
      </p>
      <p class="upcase font__size_sm under_line red__text">
        {{ product.productdata[0].regular_price }} {{ $t("tk") }}
      </p>
    </div>
    <div class="d__flex">
      <span @click="addToCart" class="cp upcase text__small flex__center">
        <v-icon class="mr-1" small>mdi-cart</v-icon>
        {{ $t("add_to_cart") }}
      </span>
      <!-- <v-btn icon small color="">
        <v-icon small>mdi-heart</v-icon>
      </v-btn> -->
      <span @click="buynow" class="cp upcase text__small flex__center">
        <v-icon class="mr-1" small>mdi-basket-plus</v-icon>
        {{ $t("buy_now") }}
      </span>
    </div>
    <span v-if="product.wish != undefined" class="heart_abssolute">
      <v-badge
        color="red"
        overlap
        :content="product.wish.length > 0 ? product.wish.length : 'O'"
      >
        <v-btn @click="addToWishList" fab x-small elevation="1">
          <v-icon small color="red">mdi-heart</v-icon>
        </v-btn>
      </v-badge>
    </span>
  </v-card>
</template>

<script>
export default {
  name: "Product",
  props: {
    product: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({
    qnty: 1,
    snackbar: false,
    textSnack: "",
    auth: ""
  }),
  methods: {
    addToWishList() {
      if (sessionStorage.getItem("myAuth") === "true") {
        this.$store.dispatch("wish/create_wish", this.product.id);
      } else {
        $nuxt.$emit("product-failed", "To make wish, you need to login first");
        $nuxt.$emit("show-login");
      }
    },
    buynow() {
      if (sessionStorage.getItem("myAuth") == "true") {
        let productQntyObject = {
          id: this.product.id,
          product_data_id: this.product.productdata[0].id,
          name: this.product.title,
          qnty: this.qnty,
          salePrice: this.product.productdata[0].sale_price,
          total_price:
            parseFloat(this.product.productdata[0].sale_price) * this.qnty
        };
        if (this.product.productdata[0].stock > 0) {
          if (
            // check qnty already exist
            sessionStorage.getItem("qntyArray") != null &&
            JSON.parse(sessionStorage.getItem("qntyArray").length > 0)
          ) {
            let oldProductQntyArray = JSON.parse(
              sessionStorage.getItem("qntyArray")
            );
            //check duplicate product id
            let checkDuplicatInArray = oldProductQntyArray.filter(item => {
              return item.id == productQntyObject.id;
            });

            if (checkDuplicatInArray.length > 0) {
              $nuxt.$emit(
                "product-failed",
                "Product already added to the cart"
              );
            } else {
              let newProductQntyArray = [
                productQntyObject,
                ...oldProductQntyArray
              ];
              sessionStorage.setItem(
                "qntyArray",
                JSON.stringify(newProductQntyArray)
              );
              $nuxt.$emit("product-failed", "Product added to the cart");
            }
          } else {
            let productQntyArray = [];
            productQntyArray.push(productQntyObject);
            sessionStorage.setItem(
              "qntyArray",
              JSON.stringify(productQntyArray)
            );
            $nuxt.$emit("product-failed", "Product added to the cart");
          }
          // add product
          if (
            sessionStorage.getItem("cartProduct") != null &&
            JSON.parse(sessionStorage.getItem("cartProduct")).length != 0
          ) {
            let oldCartProduct = JSON.parse(
              sessionStorage.getItem("cartProduct")
            );
            // check duplicate product
            if (oldCartProduct.length > 0) {
              let duplicateCartProduct = oldCartProduct.filter(item => {
                return item.id === this.product.id;
              });
              if (duplicateCartProduct.length > 0) {
                $nuxt.$emit(
                  "product-failed",
                  "Product already added to the cart"
                );
              } else {
                let cartProduct = [this.product, ...oldCartProduct];
                sessionStorage.setItem(
                  "cartProduct",
                  JSON.stringify(cartProduct)
                );
                if (sessionStorage.getItem("totalPrice") != undefined) {
                  let oldTotalPrice = sessionStorage.getItem("totalPrice");
                  if (oldTotalPrice != null) {
                    let newTotalPrice =
                      parseFloat(oldTotalPrice) + productQntyObject.total_price;
                    sessionStorage.setItem("totalPrice", newTotalPrice);
                  }
                }
                $nuxt.$emit("product-failed", "Product added to the cart");
              }
            }
          } else {
            let cartProduct = [];
            cartProduct.push(this.product);
            let totalPrice = productQntyObject.total_price;
            sessionStorage.setItem("totalPrice", totalPrice);
            sessionStorage.setItem("cartProduct", JSON.stringify(cartProduct));
            $nuxt.$emit("product-failed", "Product added to the cart");
          }

          $nuxt.$emit("add-to-cart");
        } else {
          $nuxt.$emit("product-failed", "Product is out of stock");
        }
        this.$router.push({ path: "order" });
      } else {
        $nuxt.$emit("product-failed", "You need to login for buy this item");
        $nuxt.$emit("open-login");
      }
    },

    addToCart() {
      let productQntyObject = {
        id: this.product.id,
        product_data_id: this.product.productdata[0].id,
        name: this.product.title,
        qnty: this.qnty,
        salePrice: this.product.productdata[0].sale_price,
        total_price:
          parseFloat(this.product.productdata[0].sale_price) * this.qnty
      };
      if (this.product.productdata[0].stock > 0) {
        if (
          // check qnty already exist
          sessionStorage.getItem("qntyArray") != null &&
          JSON.parse(sessionStorage.getItem("qntyArray").length > 0)
        ) {
          let oldProductQntyArray = JSON.parse(
            sessionStorage.getItem("qntyArray")
          );
          //check duplicate product id
          let checkDuplicatInArray = oldProductQntyArray.filter(item => {
            return item.id == productQntyObject.id;
          });

          if (checkDuplicatInArray.length > 0) {
            $nuxt.$emit("product-failed", "Product already added to the cart");
          } else {
            let newProductQntyArray = [
              productQntyObject,
              ...oldProductQntyArray
            ];
            sessionStorage.setItem(
              "qntyArray",
              JSON.stringify(newProductQntyArray)
            );
            $nuxt.$emit("product-failed", "Product added to the cart");
          }
        } else {
          let productQntyArray = [];
          productQntyArray.push(productQntyObject);
          sessionStorage.setItem("qntyArray", JSON.stringify(productQntyArray));
          $nuxt.$emit("product-failed", "Product added to the cart");
        }
        // add product
        if (
          sessionStorage.getItem("cartProduct") != null &&
          JSON.parse(sessionStorage.getItem("cartProduct")).length != 0
        ) {
          let oldCartProduct = JSON.parse(
            sessionStorage.getItem("cartProduct")
          );
          // check duplicate product
          if (oldCartProduct.length > 0) {
            let duplicateCartProduct = oldCartProduct.filter(item => {
              return item.id === this.product.id;
            });
            if (duplicateCartProduct.length > 0) {
              $nuxt.$emit(
                "product-failed",
                "Product already added to the cart"
              );
            } else {
              let cartProduct = [this.product, ...oldCartProduct];
              sessionStorage.setItem(
                "cartProduct",
                JSON.stringify(cartProduct)
              );
              if (sessionStorage.getItem("totalPrice") != undefined) {
                let oldTotalPrice = sessionStorage.getItem("totalPrice");
                if (oldTotalPrice != null) {
                  let newTotalPrice =
                    parseFloat(oldTotalPrice) + productQntyObject.total_price;
                  sessionStorage.setItem("totalPrice", newTotalPrice);
                }
              }
              $nuxt.$emit("product-failed", "Product added to the cart");
            }
          }
        } else {
          let cartProduct = [];
          cartProduct.push(this.product);
          let totalPrice = productQntyObject.total_price;
          sessionStorage.setItem("totalPrice", totalPrice);
          sessionStorage.setItem("cartProduct", JSON.stringify(cartProduct));
          $nuxt.$emit("product-failed", "Product added to the cart");
        }

        $nuxt.$emit("add-to-cart");
      } else {
        $nuxt.$emit("product-failed", "Product is out of stock");
      }
    }
  },
  mounted() {
    this.auth = sessionStorage.getItem("myAuth");
  }
};
</script>

<style scoped>
.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}
.color_bg {
  background: #f0f0f0;
}
.c__align {
  text-align: center;
}
.the_text {
  font-size: 16px;
  font-weight: 300;
}
.upcase {
  text-transform: uppercase;
}
.lignthrough {
  text-decoration: lightpink;
}
/* .btm_fix {
  position: fixed;
  bottom: 0;
} */
.font__size_sm {
  font-size: 15px;
}
.under_line {
  text-decoration: line-through;
}
.d__flex {
  display: flex;
  justify-content: space-between;
}
.red__text {
  color: red;
}
.teal__text {
  color: teal;
}
.text__small {
  font-size: 12px;
}
.flex__center {
  display: flex;
  align-items: center;
}
.gray__text {
  color: gray;
}
.cp {
  cursor: pointer;
}
.card_rel {
  position: relative;
}
.heart_abssolute {
  position: absolute;
  top: 10px;
  left: 5px;
}
</style>
