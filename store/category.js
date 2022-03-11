export const state = () => ({
   categories: []
})

export const mutations = {
   SET_ALL_CATEGORIES(state, payload) {
       state.categories = payload
   }
}

export const actions = {
   async get_all_category({ commit }) {
       try {
           const res = await this.$axios.$get(`${this.$domain.name}/api/all-category`)
           commit('SET_ALL_CATEGORIES', res)
       } catch (error) {
           $nuxt.$emit('category-failed', 'Category fetching failed')   
           console.log(error)
       }
   }
}