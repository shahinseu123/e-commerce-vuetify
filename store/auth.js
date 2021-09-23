export const state = () => ({
    user: null
})

export const mutations = {
    SET_AUTH_USER(state, payload) {
        state.user = payload
    }
}

export const actions = {
    async get_auth_user({ commit }) {
        try {
            const res =  await this.$axios.$get("http://localhost:8000/api/auth/user", {withCredentials: true});
            commit('SET_AUTH_USER', res)
            
        } catch (error) {
            this.$toast.error('Can not fetch auth user, please try again')
            console.log(error)
        }
    },

    async upadte_user({commit}, payload) {
        try {
            const res = await fetch("http://localhost:8000/api/auth/user/update-info", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(payload) 
                })
            if(res.status === 200) {
               this.$toast.success("User updated successfully")
               $nuxt.$emit("get-auth-user")
            }
        } catch (error) {
            this.$toast.error("User update failed, please try again")
        }
            
    },
    async upadte_password({commit}, payload) {
        try {
            const res = await fetch("http://localhost:8000/api/auth/user/update-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(payload) 
                })
            if(res.status === 200) {
               this.$toast.success("User password updated")
               $nuxt.$emit("get-auth-user")
            }
        } catch (error) {
            this.$toast.error("Paasword update failed, please try again")
        }
            
    }

    

}