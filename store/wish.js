export const state = () => ({
    wish: []
})

export const mutations = {
   SET_ALL_WISH(state, payload) {
       state.wish = payload
   }
}

export const actions = {
    async create_wish({commit}, id) {
        try {
            let res = await fetch("http://localhost:8000/api/auth/wish/make-wish/" + id, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            
           });
           
           if (res.status === 200) {
               let data = await res.json()
               if(data.err) {
                   $nuxt.$emit("product-failed",data.err)
               } else {
                   $nuxt.$emit("product-failed",data.msg)
               }
           }
        } catch (error) {
            $nuxt.$emit("product-failed",'Something is wrong, please try again')
        }
    },

    async get_wish({commit}) {
        try {
            let res = await fetch("http://localhost:8000/api/auth/wish/make-wish/", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            
           });
           
           if (res.status === 200) {
               let data = await res.json()
               commit('SET_ALL_WISH', data)
               console.log(data)
           }
        } catch (error) {
            this.$toast.error('Something is wrong, please try again')
        }
    }
}