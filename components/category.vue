<template>
  <div class="cat__slider mx-4 pa-2 my-3 elevation-1">
    <v-sheet class="mx-auto">
      <v-slide-group show-arrows v-if="getCategory.length !== 0" class="h__130">
        <v-slide-item
          v-for="n in getCategory"
          :key="n.id"
          v-slot="{ active, toggle }"
        >
          <category-item
            class="mx-2"
            :input-value="active"
            :category="n"
            active-class="purple white--text"
            depressed
            rounded
            @click="toggle"
          >
          </category-item>
        </v-slide-item>
      </v-slide-group>
    </v-sheet>
  </div>
</template>

<script>
export default {
  name: "Category",

  data() {
    return {
      model: null
    };
  },
  computed: {
    getCategory() {
      return this.$store.state.category.categories;
    }
  },
  mounted() {}
};
</script>

<style scoped>
.cat__slider {
  background: white;
}
.h__130 {
  height: 130px;
}
</style>
