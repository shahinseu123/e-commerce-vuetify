export const state = () => ({
    brands: []
})

export const mutations = {
    SET_ALL_BRAND(state, payload) {
        state.brands = payload
    }
}

export const actions = {
    async get_all_brands({ commit }) {
        try {
            const res = await this.$axios.$get('http://localhost:8000/api/brands')
            commit('SET_ALL_BRAND', res)
        } catch (error) {
            $nuxt.$emit('brand-failed', 'Brand fetching failed')   
            console.log(error)
        }
    }
}