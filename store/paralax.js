export const state = () => ({
    paralax: []
})

export const mutations = {
    SET_ALL_PARALAX(state, payload) {
        state.paralax = payload
    }
}

export const actions = {
    async get_all_paralax({ commit }) {
        try {
            const res = await this.$axios.$get(`${this.$domain.name}/api/paralax`)
            commit('SET_ALL_PARALAX', res)
        } catch (error) {
            $nuxt.$emit('brand-failed', 'Paralax fetching failed')   
            console.log(error)
        }
    }
}