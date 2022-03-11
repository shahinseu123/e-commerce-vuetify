export const state = () => ({
    web_settings: []
})

export const mutations = {
    SET_ALL_WEB_SET(state, payload) {
        state.web_settings = payload
    }
}

export const actions = {
    async get_all_settings({ commit }) {
        try {
            const res = await this.$axios.$get(`${this.$domain.name}/api/web-settings`)
            commit('SET_ALL_WEB_SET', res)
        } catch (error) {
            $nuxt.$emit('brand-failed', 'Web settings fetching failed')   
            console.log(error)
        }
    }
}