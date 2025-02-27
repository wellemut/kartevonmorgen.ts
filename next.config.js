const nextTranslate = require('next-translate')
const MomentLocalesPlugin = require('moment-locales-webpack-plugin')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})


module.exports = nextTranslate(
  withBundleAnalyzer({
    future: {
      webpack5: true,
    },

    webpack: (config, _options) => {
      config.plugins.push(
        new MomentLocalesPlugin({
          localesToKeep: [
            'en',
            'de',
            'es',
            'pt',
          ],
        }),
      )

      return config
    },

    redirects: async () => ([
      {
        source: '/maps',
        destination: '/m/main',
        permanent: true,
      },
      {
        source: '/m',
        destination: '/m/main',
        permanent: true,
      },
      {
        source: '/t',
        destination: '/t/main',
        permanent: true,
      },
      {
        source: '/tables',
        destination: '/t/main',
        permanent: true,
      },
      {
        source: '/tables/:path*',
        destination: '/t/:path*',
        permanent: true,
      },
      {
        source:'/renn.html/:slug*',
        destination: 'https://v0.kartevonmorgen.org/renn.html#/:slug*',
        permanent: false
      },
      {
        source:'/businesscard.html/:slug*',
        destination: 'https://v0.kartevonmorgen.org/businesscard.html#/:slug*',
        permanent: false
      },
      {
        source:'/map.html/:slug*',
        destination: 'https://v0.kartevonmorgen.org/map.html#/:slug*',
        permanent: false
      },
      {
        source:'/mapAndEntryList.html/:slug*',
        destination: 'https://v0.kartevonmorgen.org/mapAndEntryList.html#/:slug*',
        permanent: false
      }
    ]),

    i18n: {
      locales: [
        'en',
        'de',
        'fr',
        'nl',
        'es',
        'ru',
      ],

      defaultLocale: 'de',
    },

    cssModules: true,

  }),
)