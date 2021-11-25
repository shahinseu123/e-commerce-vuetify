export const state = () => ({
  products: [],
  filtered_products: [],
  sorted_products: [],
  top_view_products: []
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
  SET_TOP_VIEWED_PRODUCT(state, payload) {
    state.top_view_products = payload
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
   async count_view({commit}, payload) {
       try {
         const res = await this.$axios.$get('http://localhost:8000/api/product/count_product/'+payload.productName);
       } catch (error) {
         $nuxt.$emit('product-failed', 'Product count failed')   
       }
   },
   async getTopViewProduct({commit}) {
       try {
          const res = await this.$axios.$get('http://localhost:8000/api/product/top-viewed')
          commit('SET_TOP_VIEWED_PRODUCT', res)
       } catch (error) {
          $nuxt.$emit('product-failed', 'Top viewed product fething failed')  
       }
   }

   
};
