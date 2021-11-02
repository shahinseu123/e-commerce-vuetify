<template>
  <v-card
    class="mx-auto pa-5 "
    :color="color"
    dark
    max-width="344"
    height="170"
  >
    <div class="d__flex">
      <div class="">
        <h1>{{ products.length }} {{ $t("order") }} {{ status }}</h1>
        <p>{{ products.status }}</p>
      </div>
      <div>
        <v-icon x-large>{{ icon }}</v-icon>
      </div>
    </div>
    <!-- <v-card-actions>
      <v-btn @click="goMyOrder" outlined text>
        more
        <v-icon small right>mdi-arrow-right</v-icon>
      </v-btn>
    </v-card-actions> -->
  </v-card>
</template>

<script>
export default {
  name: "DashCard",
  props: {
    color: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    },
    products: {
      type: Array,
      default: () => ({})
    },
    status: {
      type: String,
      default: ""
    }
  },
  methods: {
    goMyOrder() {
      this.$router.push({ path: "/user/my-order" });
    }
  }
};
</script>

<style scoped>
.d__flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
