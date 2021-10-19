export const state = () => ({
    coupon: null
})

export const mutations = {
    SET_ALL_COUPON(state, payload) {
        if (payload == "") {
            state.coupon = null
        } else {
            state.coupon = payload
        }
    }
}

export const actions = {
    async get_all_coupon({ commit }) {
        try {
            const res = await this.$axios.$get('http://localhost:8000/api/coupon')
            commit('SET_ALL_COUPON', res)
        } catch (error) {
            $nuxt.$emit('brand-failed', 'Coupon fetching failed')   
            console.log(error)
        }
    },
    async used_coupon({ commit }, payload) {
        try {
             const res = await fetch("http://localhost:8000/api/coupon/used", {
            method: "POST",    
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
            })
            if (res.status === 200) {
               let data = await res.json()
               if(data.err) {
                   $nuxt.$emit("product-failed",data.err)
               } else {
                   $nuxt.$emit("product-failed",data.msg)
                   $nuxt.$emit("get-auth-user")
                  
               }
           }
        } catch (error) {
            $nuxt.$emit('brand-failed', 'Coupon fetching failed')   
            console.log(error)
        }
    }
}