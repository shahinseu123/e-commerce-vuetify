import colors from 'vuetify/es5/util/colors'

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - bd_ecommerce_vuetify',
    title: 'bd_ecommerce_vuetify',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    'nuxt-moment',
    '@nuxtjs/i18n',
  ],
  i18n: {
    locales: ['en', 'bn'],
    defaultLocale: 'en',
    vueI18n: {
      fallbackLocale: ['en', 'bn'],
      messages: {
        en: {
          welcome: 'Welcome',
          home: 'home',
          blog: 'blog',
          about: 'about',
          contact: 'contact',
          login: 'login',
          register: 'register',
          all_category: 'shop by category',
          search: 'Search for product',
          shop_now: 'shop now',
          discount: 'Discount',
          tk: 'Taka',
          intro_order_val: 'This discount is only valid online and on selected items only',
          coupon_valid: 'Coupon valid till',
          coupon_code: 'Coupon code',
          popular_brand: 'POPULAR BRANDS',
          popular_category: 'POPULAR CATEGORIES',
          top_selling_prod: 'TOP SELLING PRODUCT',
          feature_prod: 'FEATURED PRODUCTS',
          product_for_you: 'PRODUCTS FOR YOU',
          our_service: 'SERVICES',
          free_service: 'FREE HOME DELIVERY',
          return_policy: 'RETURN PRODUCT WITHIN 3 DAYS',
          support: '24/7 CUSTOMER SERVICE',
          genuin_product: '100% genuin product',
        },
        bn: {
          welcome: 'স্বাগতম',
          home: 'হোম',
          blog: 'ব্লগ',
          about: 'সম্পর্কিত',
          contact: 'যোগাযোগ',
          login: 'প্রবেশ',
          register: 'নিবন্ধন',
          all_category: 'সকল ক্যাটাগরি',
          search: 'পণ্য অনুসন্ধান করুন',
          shop_now: 'এখনই কিনুন',
          discount: 'ছাড়',
          tk: 'টাকা',
          intro_order_val: 'এই ছাড় শুধুমাত্র অনলাইনে এবং নির্বাচিত আইটেমগুলিতে বৈধ',
          coupon_valid: 'কুপন প্রযোজ্য',
          coupon_code: 'কুপন কোড',
          popular_brand: 'জনপ্রিয় ব্র্যান্ড',
          popular_category: 'জনপ্রিয় ক্যাটাগরি',
          top_selling_prod: 'শীর্ষ বিক্রয় পণ্য',
          feature_prod: 'বৈশিষ্ট্যযুক্ত পণ্য',
          product_for_you: 'আপনার জন্য পণ্য',
          our_service: 'আমাদের সেবাসমূহ',
          free_service: 'ফ্রি হোম ডেলিভারি',
          return_policy: '3 দিনের মধ্যে পণ্য ফেরত দিতে পারেন',
          support: '24/7 কাস্টমার সার্ভিস',
          genuin_product: '100% আসল পণ্য',
        },
       
      }
    }
  },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      light: true,
      themes: {
        light: {
          primary: colors.teal.darken2,
          accent: colors.teal.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
  ,auth: {
  strategies: {
    local: {
      token: {
        property: 'token',
        global: true,
        // required: true,
        // type: 'Bearer'
      },
      user: {
        property: 'user',
        // autoFetch: true
      },
      endpoints: {
        login: { url: '/api/auth/login', method: 'post' },
        logout: { url: '/api/auth/logout', method: 'post' },
        user: { url: '/api/auth/user', method: 'get' }
      }
    }
  }
}
}
