<template>
  <v-card class="pa-5">
    <v-card class=" pa-5 mb-2" elevation="0" color="teal lighten-5">
      <div class="flex__tar">
        <h4>Shahin Alam</h4>
        <div>
          <v-rating
            v-model="rating"
            background-color="teal lighten-3"
            color="teal"
          ></v-rating>
        </div>
      </div>
      <p class="p_small">12.12.21345</p>
      <p class="mt-2">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officia
        maiores veritatis nisi iusto, consequuntur placeat minus totam laborum
        saepe excepturi at veniam dolore dolorem inventore. Voluptate a placeat
        quis ab.
      </p>
    </v-card>
    <v-card class=" pa-5 mb-2" elevation="0" color="teal lighten-5">
      <div class="flex__tar">
        <h4>Shahin Alam</h4>
        <div>
          <v-rating
            v-model="rating"
            background-color="teal lighten-3"
            color="teal"
          ></v-rating>
        </div>
      </div>
      <p class="p_small">12.12.21345</p>
      <p class="mt-2">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officia
        maiores veritatis nisi iusto, consequuntur placeat minus totam laborum
        saepe excepturi at veniam dolore dolorem inventore. Voluptate a placeat
        quis ab.
      </p>
    </v-card>
  </v-card>
</template>

<script>
export default {
  name: "Rating",
  data: () => ({
    rating: 4
  })
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
</style>
