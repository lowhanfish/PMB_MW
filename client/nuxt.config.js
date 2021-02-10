import colors from 'vuetify/es5/util/colors'

export default {
  // Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
  ssr: false,

  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  router : {
    middleware : 'mdlwr'
  },

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: '%s - kikenSinglePage',
    title: 'kikenSinglePage',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/png', href: '/icon3.png' }
    ],
    script: [
      {src: 'https://code.highcharts.com/highcharts.js'},
      {src: 'https://code.highcharts.com/modules/data.js'},
      {src: 'https://code.highcharts.com/modules/drilldown.js'},
      {src: 'https://code.highcharts.com/highcharts-more.js'},


      {src: 'https://code.highcharts.com/modules/exporting.js'},
      {src: 'https://code.highcharts.com/modules/export-data.js'},
      {src: 'https://code.highcharts.com/modules/accessibility.js'},

      {src: 'https://cdn.jsdelivr.net/npm/sweetalert2@10'},
      {src: 'https://cdn.jsdelivr.net/npm/promise-polyfill@8/dist/polyfill.js'},
    ],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    '@/assets/css/fontsFamilly.css',
    '@/assets/css/huruf.css',
    '@/assets/css/kiken.css',
    '@/assets/css/color.css',
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '~plugins/bl-components'
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',

  ],

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  }
}
