<template>
  <v-sheet class="mx-auto" max-width="700">
    <v-slide-group multiple show-arrows>
      <v-slide-item
        v-for="n in partner"
        :key="n.id"
        v-slot="{ active, toggle }"
      >
        <v-img class="mx-2" :input-value="active" src="" @click="toggle">
        </v-img>
      </v-slide-item>
    </v-slide-group>
  </v-sheet>
</template>

<script>
export default {
  name: "Partner",
  data: () => ({
    model: null,
    partner: [{ id: 1, img: "" }]
  })
};
</script>

<style></style>
