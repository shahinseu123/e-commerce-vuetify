<template>
  <div class="">
    <v-bottom-sheet v-model="sheet" inset>
      <!-- <template v-slot:activator="{ on, attrs }">
        <v-btn color="orange" dark v-bind="attrs" v-on="on">
          Open Inset
        </v-btn>
      </template> -->
      <v-sheet class="" height="600">
        <v-btn
          x-small
          fab
          class="ma-3"
          elevation="0"
          color="error"
          @click="sheet = !sheet"
        >
          <v-icon x-small>mdi-close</v-icon>
        </v-btn>
        <!-- <v-divider></v-divider> -->
        <div class="px-10" v-if="myOrder !== null">
          <v-img
            max-width="200"
            src="https://cdn6.f-cdn.com/contestentries/1263380/27388048/5a905e93737ce_thumb900.jpg"
          ></v-img>

          <v-row>
            <v-col lg="8" xl="8">
              <h5 class="mb-1 ">Billing to</h5>
              <h3 class="pb-2 uppercase">{{ myOrder[0].name }}</h3>

              <p class="text-xs">P: {{ myOrder[0].phone }}</p>
              <p class="text-xs">E: {{ myOrder[0].email }}</p>
              <p class="text-xs">
                A: {{ myOrder[0].street }} {{ myOrder[0].apartment }}
                {{ myOrder[0].city }} {{ myOrder[0].state }}
                {{ myOrder[0].zip }}
              </p>
            </v-col>
            <v-col lg="4" xl="4">
              <div class="">
                <h1 class="mb-1 uppercase text-teal darken-2 text-primary">
                  IN<span class="text__sec">VOICE</span>
                </h1>

                <p class="text-xs">Invoice: {{ myOrder[0].order_number }}</p>

                <p class="text-xs">
                  Date: {{ $moment(myOrder[0].created_at).format("MMM Do YY") }}
                </p>
              </div>
            </v-col>
          </v-row>
          <div>
            <table>
              <thead>
                <tr>
                  <th class="border c_teal">ST</th>
                  <th class="border c_teal">Details</th>
                  <th class="border c_teal">Quantity</th>
                  <th class="border c_teal">Rate</th>
                  <th class="border c_teal">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="prod in myOrder[0].order_products" :key="prod.id">
                  <td class="border">{{ prod.product.id }}</td>
                  <td class="border">{{ prod.product.title }}</td>
                  <td class="border">{{ prod.quantity }}</td>
                  <td class="border">{{ prod.sale_price }}</td>
                  <td class="border">
                    {{
                      parseFloat(prod.sale_price) * parseFloat(prod.quantity)
                    }}
                  </td>
                </tr>
              </tbody>
            </table>
            <div>
              <div class="mt-2">
                <p class="mp_0">
                  SUB TOTAL
                  <span class="">{{ myOrder[0].product_total }} TK</span>
                </p>
                <p class="mp_0">
                  TAX <span class="k">{{ myOrder[0].tax_amount }} TK</span>
                </p>
                <p class="mp_0">
                  Discount
                  <span class="">{{ myOrder[0].discount_amount }} TK</span>
                </p>
                <p class="mp_0">
                  Shipping charge
                  <span class="">{{ myOrder[0].shipping_charge }} TK</span>
                </p>
                <span class="" style=""></span>
                <p class="mp_0">
                  TOTAL
                  <span class="">{{ myOrder[0].product_total }} TK</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>
<script>
export default {
  props: {
    default: false
  },
  data: () => ({
    sheet: false,
    myOrder: null,
    desserts: [
      {
        name: "Frozen Yogurt",
        calories: 159
      },
      {
        name: "Ice cream sandwich",
        calories: 237
      },
      {
        name: "Eclair",
        calories: 262
      },
      {
        name: "Cupcake",
        calories: 305
      },
      {
        name: "Gingerbread",
        calories: 356
      },
      {
        name: "Jelly bean",
        calories: 375
      },
      {
        name: "Lollipop",
        calories: 392
      },
      {
        name: "Honeycomb",
        calories: 408
      },
      {
        name: "Donut",
        calories: 452
      },
      {
        name: "KitKat",
        calories: 518
      }
    ]
  }),
  mounted() {
    this.$nuxt.$on("open-sheet", id => {
      this.sheet = true;
      let auth = JSON.parse(sessionStorage.getItem("authUser"));
      this.myOrder = auth.order.filter(item => item.id == id);
    });
  }
};
</script>
<style scoped>
.uppercase {
  text-transform: uppercase;
}
.text-xs {
  font-size: 12px;
  margin: 0;
  padding: 0;
}
.text-primary {
  color: teal;
}
.text__sec {
  color: lightseagreen;
}
table,
th,
td {
  border: 1px solid gray;
  text-align: center;
}
table {
  margin-top: 10px;
  width: 100%;
  border-collapse: collapse;
}
.c_teal {
  background: teal;
  color: white;
}
.mp_0 {
  margin: 0;
  padding: 0;
  font-size: 13px;
  text-align: right;
}
</style>
