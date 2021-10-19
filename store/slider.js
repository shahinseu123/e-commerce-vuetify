export const state = () => ({
    slider: []
})

export const mutations = {
    SET_ALL_SLIDER(state, payload) {
        state.slider = payload
    }
}

export const actions = {
    async get_all_slider({ commit }) {
        try {
            const res = await this.$axios.$get('http://localhost:8000/api/slider')
            commit('SET_ALL_SLIDER', res)
        } catch (error) {
            $nuxt.$emit('brand-failed', 'Brand fetching failed')   
            console.log(error)
        }
    }
}