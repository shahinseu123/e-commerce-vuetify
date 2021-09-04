export const state = () => ({
  products: [],
  filtered_products: [],
  sorted_products: []
})

export const mutations = {
  SET_ALL_PRODUCTS(state, payload) {
    state.products = payload;
  },
  SET_FILTERED_PRODUCTS(state, payload) {
    state.filtered_products = state.products.filter(item => item.id == payload.id)
  },
  SET_SORTED_PRODUCTS(state, payload) {
    state.sorted_products = payload
  },

}
export const actions = {
   async get_all_product({ commit }){
       try {
          const res = await this.$axios.$get('http://localhost:8000/api/all-product');
           commit('SET_ALL_PRODUCTS', res)
       } catch (error) {  
           $nuxt.$emit('product-failed', 'Product fetching failed')        
           console.log(error)
       }
   },
   async get_sorted_product({ commit }){
       try {
          const res = await this.$axios.$get('http://localhost:8000/api/sorted-product');
           commit('SET_SORTED_PRODUCTS', res)
          
       } catch (error) {
         $nuxt.$emit('product-failed', 'Product fetching failed')   
           console.log(error)
       }
   },

   
};
