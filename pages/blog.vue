<template>
  <div class="margin__t">
    <v-card
      v-for="b in allBlog.blog"
      :key="b.id"
      class="mx-auto mb-2"
      max-width="1000"
    >
      <v-card dark flat>
        <v-img
          :src="`http://localhost:8000/uploads/media/${b.blog_image}`"
          gradient="to top, rgba(0,0,0,.44), rgba(0,0,0,.44)"
        >
        </v-img>
      </v-card>
      <v-card-text class="p-5">
        <h1 class="pt-3 pb-5">
          {{ $i18n.locale == "en" ? b.blog_title : b.blog_title_bd }}
        </h1>
        <p
          v-html="
            $i18n.locale == 'en' ? b.blog_description : b.blog_description_bd
          "
        ></p>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Blog",
  data() {
    return {};
  },
  computed: {
    allBlog() {
      return this.$store.state.blog;
    }
  },
  created() {
    this.$store.dispatch("blog/get_all_blog");
    this.$store.dispatch("web_setting/get_all_settings");
  }
};
</script>

<style scoped>
.margin__t {
  margin-top: 54px;
  margin-bottom: 25px;
}
.p__right {
  padding-right: 0 !important;
}
.p_left {
  padding-left: 0 !important;
}

.height_f {
  height: 80vh;
}
@media only screen and (max-width: 959px) {
  .mt-res {
    margin-top: -42px;
  }
}
@media only screen and (min-width: 600px) {
  .mt__10 {
    margin-top: 0 !important;
  }
}
</style>
