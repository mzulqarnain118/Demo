// const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
module.exports = {
  async headers() {
    return [
      {
        source: '/:all*(css|scss)',
        locale: false,
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=9999999999, must-revalidate',
          }
        ],
      },
    ]
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/login',
        permanent: true,
      },
    ]
  },
  reactStrictMode: true,
  webpack(config) {
    // config.plugins = config.plugins.filter(p => p.constructor.name !== 'UglifyJsPlugin')
    //   config.plugins.push(  new UglifyJsPlugin({
    //     parallel: true
    //   }))
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            svgoConfig: {
              plugins: [
                {
                  removeViewBox: false,
                },
              ],
            },
          },
        },
      ],
    });

    return config;
  },
  // images: {
  //   domains: ['tailwindui.com', 'dummyimage.com','wowslider.com'],
  // },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  // For Docker Hot Reloading
  webpackDevMiddleware: (config) => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    };

    return config;
  }
}
