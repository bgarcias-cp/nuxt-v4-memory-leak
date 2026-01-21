// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  experimental: {
    asyncContext: true
  },
  typescript: {
    strict: true
  },
  modules: [],
  pages: true,
  nitro: {
        compressPublicAssets: {
            brotli: true,
        },
        prerender: {
            crawlLinks: false,
            routes: [],
        },
        routeRules: {
            '/api-internal/**': {
                cors: true,
            },
        },
    },
  vite: {
        plugins: [],
        css: {
            preprocessorOptions: {
                scss: {
                    api: 'modern-compiler',
                    quietDeps: true,
                    additionalData: '@use "~/assets/style/global.scss" as *;',
                },
            },
        },
        optimizeDeps: {
            exclude: ['#imports'],
        },
    },
  vue: {
        compilerOptions: {
            whitespace: 'preserve',
        },
    },
})

