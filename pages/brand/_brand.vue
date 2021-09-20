<template>
  <v-container fluid class="mt__10">
    <v-row>
      <v-col cols="12" sm="4" md="4" lg="3" xl="3" class="padding_right_0">
        <v-card class="elevation-0">
          <h3 class="py-3 text-center border_tt">product range</h3>
          <div class="price__el px-5 mt-5">
            <span>Start: {{ range[0] }}</span
            ><span>End: {{ range[1] }}</span>
          </div>
          <v-card-text>
            <v-row>
              <v-col class="px-4">
                <v-range-slider
                  @change="productByRange"
                  v-model="range"
                  :max="max"
                  :min="min"
                  hide-details
                  class="align-center"
                >
                </v-range-slider>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
        <v-card class="elevation-0 mt-1">
          <h3 class="py-3 mb-5 text-center border_tt">Shop by category</h3>
          <div v-for="cat in getAllCate" :key="cat.id" class="px-5">
            <v-checkbox
              @change="productByRange"
              class="margin__b_15"
              v-model="categories"
              :label="cat.category_title"
              color="teal"
              :value="cat.category_title"
              multiple
            ></v-checkbox>
          </div>
        </v-card>
      </v-col>
      <v-col
        v-if="$store.state.product.products.length > 0"
        cols="12"
        sm="8"
        md="8"
        lg="9"
        xl="9"
        class="padding_left_5"
      >
        <v-card v-if="!findByRange" class="pa-7" elevation="0">
          <v-row v-if="observeredLoad.length > 0 || productByBrand.length > 0">
            <v-row v-if="observeredLoad.length > 0">
              <v-col
                v-for="prod in observeredLoad"
                :key="prod.id"
                cols="6"
                sm="6"
                md="4"
                lg="3"
                xl="2"
                style="padding: 0;margin-top:6px"
              >
                <lazy-product-two :product="prod" />
              </v-col>
            </v-row>
            <v-row v-else>
              <v-col
                v-for="prod in productByBrand"
                :key="prod.id"
                cols="6"
                sm="6"
                md="4"
                lg="3"
                xl="2"
                style="padding: 0;margin-top:6px"
              >
                <lazy-product-two :product="prod" />
              </v-col>
            </v-row>
          </v-row>
          <v-row v-else>
            <v-col>
              <v-card class="loading__card" elevation="0">
                <h1 style="text-transform:uppercase">No product found!</h1>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
        <v-card v-else class="pa-5" elevation="0">
          <v-row v-if="product_found_by_range.length > 0">
            <v-col
              v-for="prod in product_found_by_range"
              :key="prod.id"
              cols="6"
              sm="6"
              md="4"
              lg="3"
              xl="2"
              style="padding: 0;margin-top:6px"
            >
              <lazy-product-two :product="prod" />
            </v-col>
          </v-row>
          <v-row v-else>
            <v-col>
              <v-card class="loading__card" elevation="0">
                <h1 style="text-transform: uppercase">No product found!</h1>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col v-else>
        <v-card elevation="0" class="loading__card">
          <h1>
            <span
              ><v-progress-circular
                :size="30"
                color="primary"
                indeterminate
              ></v-progress-circular
            ></span>
            Loading...
          </h1>
        </v-card>
      </v-col>
    </v-row>
    <obsever @intersection="intesected" />
  </v-container>
</template>

<script>
export default {
  name: "Brand",
  data() {
    return {
      categories: [],
      min: 1,
      max: 5000,
      range: [1, 5000],
      findByRange: false,
      product_found_by_range: [],
      countForLoad: 20,
      observeredLoad: []
    };
  },
  computed: {
    getAllCate() {
      return this.$store.state.category.categories;
    },

    productByBrand() {
      return this.$store.state.product.products
        .filter(item => {
          return (
            item.brand.map(
              i =>
                i.brand_title.toLowerCase() ==
                this.$route.params.brand.toLowerCase()
            )[0] === true
          );
        })
        .slice(0, 20);
    },
    productByBrandforObserve() {
      return this.$store.state.product.products.filter(item => {
        return (
          item.brand.map(
            i =>
              i.brand_title.toLowerCase() ==
              this.$route.params.brand.toLowerCase()
          )[0] === true
        );
      });
    }
  },
  methods: {
    intesected() {
      this.observeredLoad = this.productByBrandforObserve.slice(
        0,
        (this.countForLoad += 24)
      );
    },
    productByRange() {
      if (this.categories.length == 0) {
        this.product_found_by_range = this.productByBrandforObserve.filter(
          item => {
            if (item.productdata[0].id != undefined) {
              return (
                item.productdata[0].sale_price >= this.range[0] &&
                item.productdata[0].sale_price <= this.range[1]
              );
            }
          }
        );
        this.findByRange = true;
      } else {
        let primary = this.productByBrandforObserve.filter(item => {
          if (item.productdata[0].id != undefined) {
            return (
              item.productdata[0].sale_price >= this.range[0] &&
              item.productdata[0].sale_price <= this.range[1]
            );
          }
        });
        this.product_found_by_range = primary.filter(item => {
          for (let i = 0; i < item.category.length; i++) {
            for (let j = 0; j < this.categories.length; j++) {
              if (this.categories[j] == item.category[i].category_title) {
                return this.categories[j] == item.category[i].category_title;
              }
            }
          }
        });
        this.findByRange = true;
      }
    }
  },

  asyncData({ store }) {
    if (store.state.product.products.length === 0) {
      store.dispatch("brand/get_all_brands");
      store.dispatch("category/get_all_category");
      store.dispatch("product/get_all_product");
      store.dispatch("product/get_sorted_product");
    }
  },
  mounted() {}
};
</script>

<style scoped>
.mt__10 {
  margin-top: 40px;
}
.border_tt {
  border-bottom: 1px solid lightgray;
  font-size: 20px;
  font-weight: 500;
  color: gray;
  text-transform: uppercase;
}
.price__el {
  display: flex;
  justify-content: space-between;
}
.price__el span {
  font-size: 10px;
}
.v-input--selection-controls {
  margin-top: 0;
  padding-top: 0;
}
.margin__b_15 {
  margin-bottom: -15px;
}
.loading__card {
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.loading__card h1 {
  color: gray;
  font-size: 40px;
  font-weight: 500;
}

@media only screen and (max-width: 959px) {
  .mt__10 {
    margin-top: 0 !important;
  }
}
@media only screen and (min-width: 600px) {
  .padding_right_0 {
    padding-right: 0;
  }
  .padding_left_5 {
    padding-left: 5px;
  }
}
</style>
