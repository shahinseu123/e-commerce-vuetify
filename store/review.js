export const state = () => ({
   review: []
})

export const mutations = {
   SET_PROD_RATE(state, payload) {
       state.review = payload
   }
}

export const actions = {
    async make_review({commit}, payload) {
        try {
            const res = await fetch("http://localhost:8000/api/review/make-review", {
            method: "POST",    
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
            })
            if(res.status === 200) {
                $nuxt.$emit("product-failed", "Thanks for rate this product")
            }
        } catch (error) {
            
        }
        
    },

    async get_product_rating({commit}, payload) {
        try {
            const res = await fetch(`http://localhost:8000/api/review/get-review/${payload.product_id}`, {
                method: "GET",    
                credentials: "include",
                headers: { "Content-Type": "application/json" },
            })
           
            if (res.status == 200) {
               let data = await res.json()
               commit('SET_PROD_RATE', data)
            }
        } catch (error) {
            this.$toast.error("Rating can not be fatched")
        }
    }
}