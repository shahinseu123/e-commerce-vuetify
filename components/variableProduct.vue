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
            `http://localhost:8000/uploads/media/${product[0].productgallery[activeIndex].product_g_img}`
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
              max-height="80"
              max-width="80"
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
            v-for="attr in product[0].productdata"
            :key="attr.id"
          >
            <span
              class=" flex_icons"
              v-if="Object.values(JSON.parse(attr.product_excerpt)).length == 2"
            >
              <v-btn
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
                fab
                small
                depressed
                :color="
                  Object.keys(JSON.parse(attr.product_excerpt))[0] == 'Color'
                    ? Object.values(
                        JSON.parse(attr.product_excerpt)
                      )[0].toLowerCase()
                    : 'white'
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
          <v-btn class="" color="teal" dark small>
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
        <div>
          <p>
            **We support's all kinds of payment system also support on payment
            delivery
          </p>
        </div>
      </v-card>
    </v-col>
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
