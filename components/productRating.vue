<template>
  <v-card class="pa-5">
    <div v-if="review.review.length > 0">
      <div v-for="rate in review.review" :key="rate.id">
        <v-card class=" pa-5 mb-2" elevation="0" color="grey lighten-5">
          <div class="flex__tar">
            <h4>{{ rate.user.name }}</h4>
            <div>
              <v-rating
                background-color="teal lighten-3"
                color="teal"
                :value="rate.rating"
              ></v-rating>
            </div>
          </div>
          <p class="p_small">{{ rate.created_at }}</p>
          <p class="mt-2">
            {{ rate.review_text }}
          </p>
        </v-card>
      </div>
    </div>
    <div v-else>
      <div class="dis__flex ">
        <h1 class="text-uppercase text__gray">{{ $t("no_review") }}</h1>
      </div>
    </div>
  </v-card>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Rating",
  props: {
    product: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({
    rating: null
  }),
  computed: {
    ...mapState(["review"])
  },
  mounted() {
    this.$store.dispatch("review/get_product_rating", {
      product_id: this.product.id
    });
  }
};
</script>

<style scope>
.flex__tar {
  display: flex;
  justify-content: space-between;
}
.p_small {
  font-size: 12px;
  margin-top: -14px;
}
.mt__nag {
  margin-top: -30px;
}
.dis__flex {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 250px;
}
.text__gray {
  color: gray;
}
</style>
