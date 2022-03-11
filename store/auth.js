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
            const res =  await this.$axios.$get(`${this.$domain.name}/api/auth/user`, {withCredentials: true});
            commit('SET_AUTH_USER', res)
            if (res) {      
                    $nuxt.$emit('set-auth')
            }
        } catch (error) {
            this.$toast.error('Can not fetch auth user, please try again')
            console.log(error)
        }
    },

    async upadte_user({commit}, payload) {
        try {
            const res = await fetch(`${this.$domain.name}/api/auth/user/update-info`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(payload) 
                })
            if(res.status === 200) {
               $nuxt.$emit("product-failed", "User updated successfully")
               $nuxt.$emit("get-auth-user") 
            }
        } catch (error) {
            this.$toast.error("User update failed, please try again")
        }
            
    },
    async upadte_password({commit}, payload) {
        try {
            const res = await fetch(`${this.$domain.name}/api/auth/user/update-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(payload) 
                })
            if(res.status === 200) {
               $nuxt.$emit("product-failed","User password updated")
               
            }
        } catch (error) {
            $nuxt.$emit("product-failed","Paasword update failed, please try again")
        }
            
    },

    async send_code({commit}, payload) {
        try {
            const res = await fetch(`${this.$domain.name}/api/auth/reset/sendcode`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(payload)
                })
            $nuxt.$emit("product-failed","Code sending")
            if (res.status == 200) {
                $nuxt.$emit('hide-reset-modal')
                $nuxt.$emit('show-confirmCode-modal')
                $nuxt.$emit("product-failed","Code sent to your email")
            }  
        } catch (error) {
            $nuxt.$emit("product-failed","Code sending failed")
        }
    },
    async confirm_code({commit}, payload) {
        try {
            const res = await fetch(`${this.$domain.name}/api/auth/reset/confirmcode`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(payload)
                })
            $nuxt.$emit("product-failed","Code confirming")
            if (res.status == 200) {
                let data = await res.json()
                if (data.message == 'failed') {
                    $nuxt.$emit("product-failed","Code confirmation failed")
                } else {
                    $nuxt.$emit('hide-confirmCode-modal')
                    $nuxt.$emit('show-newpassword-modal', data.message)
                    $nuxt.$emit("product-failed","Code confirmed")
                }
            }  
        } catch (error) {
            $nuxt.$emit("product-failed","Code confirming failed")
        }
    },
    async update_password({commit}, payload) {
        try {
             const res = await fetch(`${this.$domain.name}/api/auth/reset/set-new-pass`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(payload)
                })
            
            if (res.status == 200) {
                let data = await res.json()
                    $nuxt.$emit('hide-newpassword-modal')
                    $nuxt.$emit('show-login')
                    $nuxt.$emit("product-failed","Password successfully updated")   
            }  
        } catch (error) {
            console.log(error)
        }
    }
}