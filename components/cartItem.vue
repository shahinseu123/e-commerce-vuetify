<template>
  <v-card elevation="1" class="" max-width="600">
    <div class="d-flex">
      <div class="mr-2">
        <v-img
          width="100"
          height="92"
          :src="
            product.product_image != null
              ? 'http://localhost:8000/uploads/media/' + product.product_image
              : 'https://flatsome3.uxthemes.com/wp-content/uploads/woocommerce-placeholder.png'
          "
        >
        </v-img>
      </div>
      <div class="w__full">
        <div class="flex__c">
          <h5 class="text-uppercase gray">{{ product.title }}</h5>

          <div class="mt-1">
            <div class="counter_div mx-2">
              <span
                ><v-icon small class="cp" @click="addQnty"
                  >mdi-plus</v-icon
                ></span
              ><span class="counter">{{ qntyObj.qnty }}</span>
              <span
                ><v-icon small class="cp" @click="removeQnty"
                  >mdi-minus</v-icon
                ></span
              >
            </div>
          </div>
        </div>
        <div class="mt-1">
          <div class="flex__c">
            <div class="d-flex">
              <span class="mr-2 sm_text teal__text"
                >{{ product.productdata[0].sale_price }} TK</span
              >
              <span class=" sm_text line_through"
                >{{ product.productdata[0].regular_price }} TK</span
              >
            </div>
            <div>
              <v-btn
                class="mr-2"
                rounded
                x-small
                color="primary"
                dark
                depressed
              >
                In Stock
              </v-btn>
            </div>
          </div>
          <div>
            <div class="flex_c_d">
              <span class="mt-1 teal__text text-uppercase sm_text"
                >total price {{ qntyObj.total_price }} tk</span
              >
              <v-btn
                class="float__r mr-2 "
                fab
                x-small
                elevation="0"
                color="red lighten-4"
                ><v-icon @click="removeFromCart" small color="red lighten-1"
                  >mdi-delete</v-icon
                ></v-btn
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "CartItem",
  props: {
    product: {
      type: Object,
      default: () => ({})
    },
    qntyObj: {
      type: Object,
      default: () => ({})
    },
    index: {
      type: Number,
      default: 0
    }
  },
  data: () => ({
    qnty: 1
  }),
  methods: {
    removeFromCart() {
      let products = JSON.parse(sessionStorage.getItem("cartProduct"));
      let newArray = products.filter(item => {
        return item.id != this.product.id;
      });
      sessionStorage.setItem("cartProduct", JSON.stringify(newArray));
      let productQnty = JSON.parse(sessionStorage.getItem("qntyArray"));
      let newQnty = productQnty.filter(item => {
        return item.id != this.product.id;
      });
      sessionStorage.setItem("qntyArray", JSON.stringify(newQnty));

      let totalPrice = sessionStorage.getItem("totalPrice");

      let newTotal = totalPrice - this.qntyObj.total_price;
      sessionStorage.setItem("totalPrice", newTotal);
      $nuxt.$emit("total-price");

      $nuxt.$emit("add-to-cart");
    },
    addQnty() {
      if (this.product.productdata[0].stock > 0) {
        if (this.qntyObj.qnty == this.product.productdata[0].stock) {
          $nuxt.$emit("product-failed", "Products quantity excieeded");
        } else {
          this.qntyObj.qnty++;
          let productQnty = JSON.parse(sessionStorage.getItem("qntyArray"));
          this.qntyObj.total_price = this.qntyObj.qnty * this.qntyObj.salePrice;
          productQnty[this.index] = this.qntyObj;
          sessionStorage.setItem("qntyArray", JSON.stringify(productQnty));
          let totalPrice = sessionStorage.getItem("totalPrice");
          let newTotal =
            parseFloat(totalPrice) + parseFloat(this.qntyObj.salePrice);
          sessionStorage.setItem("totalPrice", newTotal);
          $nuxt.$emit("total-price");
        }
      } else {
        $nuxt.$emit("product-failed", "Product is out of stock");
      }
    },
    removeQnty() {
      if (this.qntyObj.qnty > 1) {
        this.qntyObj.qnty--;
        let productQnty = JSON.parse(sessionStorage.getItem("qntyArray"));
        this.qntyObj.total_price = this.qntyObj.qnty * this.qntyObj.salePrice;
        productQnty[this.index] = this.qntyObj;
        sessionStorage.setItem("qntyArray", JSON.stringify(productQnty));
        let totalPrice = sessionStorage.getItem("totalPrice");
        let newTotal =
          parseFloat(totalPrice) - parseFloat(this.qntyObj.salePrice);
        sessionStorage.setItem("totalPrice", newTotal);
        $nuxt.$emit("total-price");
      } else {
        this.textSnack = "Product can't be less then one";
        this.snackbar = true;
      }
    }
  }
};
</script>

<style scoped>
.flex__card {
  display: flex;

  -webkit-box-pack: start;
  -ms-flex-pack: start;
  justify-content: flex-start;
  -webkit-box-align: start;
  -ms-flex-align: start;
}
.w__full {
  width: 100%;
}
.flex__c {
  display: flex;
  justify-content: space-between;
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
.counter {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
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
  width: 75px;
  background: #d1e2e1;
  /* padding:; */
  border-radius: 4px;
  overflow: hidden;
}
.text-smal {
  font-size: 10px;
  font-weight: 500;
}
.cp {
  cursor: pointer;
}
.gray {
  color: gray;
}
.sm_text {
  font-size: 13px;
}
.teal__text {
  color: teal;
}
.line_through {
  text-decoration: line-through;
  color: red;
}
.float__r {
  float: right;
}
.ml__2 {
  margin-left: -8px;
}
.flex_c_d {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
