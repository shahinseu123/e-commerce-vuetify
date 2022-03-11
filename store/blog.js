export const state = () => ({
    blog: []
})

export const mutations = {
    SET_ALL_BLOG(state, payload) {
        state.blog = payload
    }
}

export const actions = {
    async get_all_blog({ commit }) {
        try {
            const res = await this.$axios.$get('http://localhost:8000/api/blogs')
            commit('SET_ALL_BLOG', res)
        } catch (error) {
            $nuxt.$emit('brand-failed', 'Brand fetching failed')   
            console.log(error)
        }
    }
}