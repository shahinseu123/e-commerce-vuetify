<template>
  <v-row
    class="mt__28"
    v-if="product.length == 1 && product[0].productgallery.length > 0"
  >
    <v-col cols="12" sm="12" md="5" lg="5" xl="5" class="p__left_0">
      <v-card id="over__hi__hight min__h">
        <v-img
          class="max__height"
          :src="
            `http://localhost:8000/uploads/media/${product[0].productdata[activeIndex].variation_img}`
          "
        ></v-img>
        <div class="flex__img_th">
          <div
            class="flex__img_th"
            v-for="(img, index) in product[0].productdata"
            :key="img.id"
          >
            <v-img
              @click="getActiveIndex(index)"
              class="mx-1 border"
              height="90"
              width="90"
              :lazy-src="
                `http://localhost:8000/uploads/media/${img.variation_img}`
              "
              :src="`http://localhost:8000/uploads/media/${img.variation_img}`"
            ></v-img>
          </div>
        </div>
      </v-card>
    </v-col>
    <v-col cols="12" sm="12" md="7" lg="7" xl="7" class="p__right_0">
      <v-card class="pa-5 min__h">
        <h2 class="text-uppercase mb-2 color__teal">Product details</h2>
        <v-divider></v-divider>
        <div class="flex__div my-3">
          <h4 class="gray__color text-uppercase">{{ product[0].title }}</h4>
          <v-btn
            v-if="product[0].productdata[activeIndex].stock > 0"
            rounded
            x-small
            color="primary"
            dark
            depressed
          >
            In Stock
          </v-btn>
          <v-btn v-else rounded x-small color="red lighten-2" dark depressed>
            Out of Stock
          </v-btn>
        </div>
        <v-divider></v-divider>
        <div class="d-flex my-3">
          <v-btn
            color="teal lighten-5"
            depressed
            small
            class="text-uppercase mr-2"
            >sale price:
            {{ product[0].productdata[activeIndex].sale_price }} TK</v-btn
          >
          <v-btn color="red lighten-5" depressed small class="text-uppercase"
            >old price:
            {{ product[0].productdata[activeIndex].regular_price }} TK</v-btn
          >
        </div>
        <v-divider></v-divider>
        <div class=" my-3">
          <div class="flex__ddis">
            <span class="text-uppercase text-smal">quantity</span>
            <div class="counter_div mx-2">
              <span><v-icon @click="addQnty" class="cp">mdi-plus</v-icon></span
              ><span class="counter">{{ qnty }}</span>
              <span
                ><v-icon @click="removeQnty" class="cp">mdi-minus</v-icon></span
              >
            </div>
            <span class="text-uppercase text-smal"
              >{{ product[0].productdata[activeIndex].stock }} products
              available</span
            >
          </div>
        </div>
        <v-divider></v-divider>
        <div class="my-3 ">
          <h4 class="text-uppercase gray mb-3">Product variation</h4>
          <span
            class="mr-3 d-inline-block"
            v-for="(attr, index) in product[0].productdata"
            :key="attr.id"
          >
            <span
              class=" flex_icons"
              v-if="Object.values(JSON.parse(attr.product_excerpt)).length == 2"
            >
              <v-btn
                @click="getActiveIndex(index)"
                fab
                small
                depressed
                dark
                :color="
                  Object.keys(JSON.parse(attr.product_excerpt))[1] == 'Color'
                    ? Object.values(
                        JSON.parse(attr.product_excerpt)
                      )[1].toLowerCase()
                    : Object.values(
                        JSON.parse(attr.product_excerpt)
                      )[0].toLowerCase()
                "
              >
                {{
                  Object.keys(JSON.parse(attr.product_excerpt))[0] == "Color"
                    ? Object.values(JSON.parse(attr.product_excerpt))[1]
                    : Object.values(JSON.parse(attr.product_excerpt))[0]
                }}
              </v-btn>
            </span>
            <span v-else>
              <v-btn
                @click="getActiveIndex(index)"
                fab
                small
                depressed
                :color="
                  Object.keys(JSON.parse(attr.product_excerpt))[0] == 'Color'
                    ? Object.values(
                        JSON.parse(attr.product_excerpt)
                      )[0].toLowerCase()
                    : 'gray'
                "
              >
                {{
                  Object.keys(JSON.parse(attr.product_excerpt))[0] == "Color"
                    ? ""
                    : Object.values(JSON.parse(attr.product_excerpt))[0]
                }}
              </v-btn>
            </span>
          </span>
        </div>
        <v-divider></v-divider>
        <div class=" my-3">
          <h4 class="text-uppercase gray">
            Product description
          </h4>

          <p v-html="product[0].description" class="small_text"></p>
        </div>
        <v-divider></v-divider>
        <div class=" my-3">
          <v-btn @click="addToCart" class="" color="teal" dark small>
            <v-icon left>
              mdi-cart
            </v-icon>
            add to cart
          </v-btn>
          <v-btn class="" color="red lighten-2" dark small>
            <v-icon left>
              mdi-basket
            </v-icon>
            buy this item
          </v-btn>
        </div>
        <v-divider></v-divider>
        <div class=" my-3">
          <h4 class="text-uppercase gray mb-2">follow us on</h4>
          <v-btn icon color="teal" class="ml_2">
            <v-icon color="red lighten-2">mdi-facebook</v-icon>
          </v-btn>
          <v-btn icon color="teal">
            <v-icon color="red lighten-2">mdi-twitter</v-icon>
          </v-btn>
          <v-btn icon color="teal">
            <v-icon color="red lighten-2">mdi-instagram</v-icon>
          </v-btn>
          <v-btn icon color="teal">
            <v-icon color="red lighten-2">mdi-linkedin</v-icon>
          </v-btn>
          <v-btn icon color="teal">
            <v-icon color="red lighten-2">mdi-youtube</v-icon>
          </v-btn>
          <v-btn icon color="teal">
            <v-icon color="red lighten-2">mdi-whatsapp</v-icon>
          </v-btn>
        </div>
      </v-card>
    </v-col>
    <!-- snackbar  -->

    <v-snackbar v-model="snackbar" left>
      {{ textSnack }}

      <template v-slot:action="{ attrs }">
        <v-btn color="pink" icon v-bind="attrs" @click="snackbar = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </v-row>
</template>

<script>
export default {
  name: "VariableProduct",
  props: {
    product: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      activeIndex: 0,
      qnty: 0,
      snackbar: false,
      textSnack: ""
    };
  },
  methods: {
    getActiveIndex(index) {
      this.activeIndex = index;
    },
    addToCart() {
      console.log("add to cart");
      let productQntyObject = {
        id: this.product[0].id,
        product_data_id: this.product[0].productdata[this.activeIndex].id,
        name: this.product[0].title,
        qnty: this.qnty,
        salePrice: this.product[0].productdata[this.activeIndex].sale_price,
        total_price:
          parseFloat(this.product[0].productdata[this.activeIndex].sale_price) *
          this.qnty
      };
      if (this.qnty > 0) {
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
            this.textSnack = "Product already added to the cart";
            this.snackbar = true;
          } else {
            let newProductQntyArray = [
              productQntyObject,
              ...oldProductQntyArray
            ];
            sessionStorage.setItem(
              "qntyArray",
              JSON.stringify(newProductQntyArray)
            );
            this.textSnack = "Product added to the cart";
            this.snackbar = true;
          }
        } else {
          let productQntyArray = [];
          productQntyArray.push(productQntyObject);
          sessionStorage.setItem("qntyArray", JSON.stringify(productQntyArray));
          this.textSnack = "Product added to the cart";
          this.snackbar = true;
        }
        // add product
        if (sessionStorage.getItem("cartProduct") != undefined) {
          let oldCartProduct = JSON.parse(
            sessionStorage.getItem("cartProduct")
          );
          // check duplicate product
          if (oldCartProduct.length > 0) {
            let duplicateCartProduct = oldCartProduct.filter(item => {
              return item.id === this.product[0].id;
            });
            if (duplicateCartProduct.length > 0) {
              this.textSnack = "Product already added to the cart";
              this.snackbar = true;
            } else {
              let cartProduct = [this.product[0], ...oldCartProduct];
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
                } else {
                  let totalPrice = productQntyObject.total_price;
                  sessionStorage.setItem("totalPrice", totalPrice);
                }
              } else {
                let totalPrice = productQntyObject.total_price;
                sessionStorage.setItem("totalPrice", totalPrice);
              }
              $nuxt.$emit("add-to-cart");
              // end
              this.textSnack = "Product  added to the cart";
              this.snackbar = true;
            }
          }
        } else {
          if (sessionStorage.getItem("totalPrice") != undefined) {
            let oldTotalPrice = sessionStorage.getItem("totalPrice");
            if (oldTotalPrice != null) {
              let newTotalPrice =
                parseFloat(oldTotalPrice) + productQntyObject.total_price;
              sessionStorage.setItem("totalPrice", newTotalPrice);
            } else {
              let totalPrice = productQntyObject.total_price;
              sessionStorage.setItem("totalPrice", totalPrice);
            }
          } else {
            let totalPrice = productQntyObject.total_price;
            sessionStorage.setItem("totalPrice", totalPrice);
          }
          $nuxt.$emit("add-to-cart");
          // end
          let cartProduct = [];
          cartProduct.push(this.product[0]);
          sessionStorage.setItem("cartProduct", JSON.stringify(cartProduct));
          this.textSnack = "Product  added to the cart";
          this.snackbar = true;
        }
      } else {
        this.textSnack = "At least add one quantity";
        this.snackbar = true;
      }
      // total price
      // if (sessionStorage.getItem("totalPrice") != undefined) {
      //   let oldTotalPrice = sessionStorage.getItem("totalPrice");
      //   if (oldTotalPrice != null) {
      //     let newTotalPrice =
      //       parseFloat(oldTotalPrice) + productQntyObject.total_price;
      //     sessionStorage.setItem("totalPrice", newTotalPrice);
      //   } else {
      //     let totalPrice = productQntyObject.total_price;
      //     sessionStorage.setItem("totalPrice", totalPrice);
      //   }
      // } else {
      //   let totalPrice = productQntyObject.total_price;
      //   sessionStorage.setItem("totalPrice", totalPrice);
      // }
      // $nuxt.$emit("add-to-cart");
    },
    addQnty() {
      if (this.product[0].productdata[this.activeIndex].stock > 0) {
        if (this.qnty == this.product[0].productdata[this.activeIndex].stock) {
          this.textSnack = "Product quantity excieeded";
          this.snackbar = true;
        } else {
          this.qnty++;
        }
      } else {
        this.textSnack = "Product out of stock";
        this.snackbar = true;
      }
    },
    removeQnty() {
      if (this.qnty > 0) {
        this.qnty--;
      } else {
        this.textSnack = "Product can't be less then zero";
        this.snackbar = true;
      }
    }
  }
};
</script>

<style scoped>
.snackbar__cl {
  position: fixed;
  left: 3px;
  bottom: 35px;
}
.gray {
  color: gray;
}
.ml_2 {
  margin-left: -9px;
}
.mt__28 {
  margin-top: 28px;
}
.small_text {
  font-size: 12px;
  font-weight: 300;
}
.flex__img_th {
  display: flex;
  justify-content: center;
  padding: 3px 0;
}
.p__right_0 {
  padding-left: 2px;
}
.p__left_0 {
  padding-right: 2px;
}
.over__hi {
}
.w-f {
  width: 100%;
}
.h-f {
  height: 100%;
}
.flex__div {
  display: flex;
  justify-content: space-between;
}
.gray__color {
  color: gray;
}
.color__teal {
  color: teal;
}
.counter {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: teal;
  color: white;
}
.counter_div {
  display: flex;
  justify-content: space-around;
  -webkit-box-pack: center;
  -ms-flex-pack: center;

  align-items: center;
  width: 120px;
  background: #d1e2e1;
  padding: 1px 0;
  border-radius: 4px;
  overflow: hidden;
}
.flex__ddis {
  display: flex;
  align-items: center;
  -webkit-box-pack: start;
  -ms-flex-pack: start;
  justify-content: flex-start;
  -webkit-box-align: start;
  -ms-flex-align: start;
  align-items: center;
}
.text-smal {
  font-size: 12px;
  font-weight: 500;
}
.cp {
  cursor: pointer;
}
.max__height {
  height: 458px;
  /* height: 100%; */
  overflow: hidden;
}
.min__h {
  height: 560px;
  overflow: hidden;
}
.border {
  border: 2px solid teal;
}
</style>
