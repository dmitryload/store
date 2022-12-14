export default {
    // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
    ssr: false,

    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: 'store',
        htmlAttrs: {
            lang: 'en'
        },
        meta: [
            {charset: 'utf-8'},
            {name: 'viewport', content: 'width=device-width, initial-scale=1'},
            {hid: 'description', name: 'description', content: ''},
            {name: 'format-detection', content: 'telephone=no'}
        ]
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [
        '~/assets/styles/main.css'
    ],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        ['nuxt-lazy-load', {
            defaultImage: '/images/loader.gif',
        }],
        [
            '@nuxtjs/firebase',
            {
                config: {
                    apiKey: "AIzaSyCjEfIHCERfIpPT8v0ZPBS5nUJhxtyBW5w",
                    authDomain: "app-istore.firebaseapp.com",
                    databaseURL: "https://app-istore-default-rtdb.firebaseio.com",
                    projectId: "app-istore",
                    storageBucket: "app-istore.appspot.com",
                    messagingSenderId: "997479489249",
                    appId: "1:997479489249:web:33e213f6b25f1a4bba61a0",
                    measurementId: "G-WV97MH5JY7"
                },
                services: {
                    database: {}
                }
            }
        ]
    ],
    transition: {
        name: "my-layouts",
        mode: "out-in"
    },
    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {}
}
