export const state = () => ({

})

export const mutations = {

}

export const actions = {
     async create_an_order({commit}, payload) {
         try {
            let res = await fetch("http://localhost:8000/api/auth/order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(payload) 
           });
           if (res.status === 200) {
               sessionStorage.removeItem("cartProduct")
               sessionStorage.removeItem("qntyArray")
               sessionStorage.removeItem("totalPrice")
               $nuxt.$emit("product-failed","Thanks for your order, we will contact you soon")
            //    $nuxt.$emit("my-custom-event")
               this.$router.push({path: "/user/my-order"})
           }
             
         } catch (error) {
             console.log(error)
         }
     }
}