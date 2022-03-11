export const state = () => ({

})

export const mutations = {

}

export const actions = {
     async create_an_order({commit}, payload, app) {
         try {
            let res = await fetch(`${this.$domain.name}/api/auth/order`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(payload) 
           });
           if (res.status === 200) {
               sessionStorage.removeItem("cartProduct")
               sessionStorage.removeItem("qntyArray")
               sessionStorage.removeItem("totalPrice")
               sessionStorage.removeItem("promoSubmitted")
               sessionStorage.removeItem("discountTotalPrice")
               sessionStorage.removeItem("discountAmount")
               $nuxt.$emit('make-cart-zero')
               $nuxt.$emit('get-my-order')
               $nuxt.$emit("product-failed","Thanks for your order, we will contact you soon")
               this.$router.push(this.localeLocation({ path: "/user/my-order" }));
               // dispatch("auth/get_auth_user");
               // this.dispatch('auth/get_auth_user', null, {root:true})
           }
        } catch (error) {
            console.log(error)
        }
     }
}