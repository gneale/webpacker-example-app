// Note: You must restart bin/webpack-watcher for changes to take effect

const webpack = require('webpack')
const merge   = require('webpack-merge')

const sharedConfig = require('./shared.js')
let distDir = process.env.WEBPACK_DIST_DIR

if (distDir === undefined) {
  distDir = 'packs'
}

module.exports = merge(sharedConfig.config, {
  output: {
    filename: '[name]-[chunkhash].js',
    publicPath: `/${distDir}/`,
  },

  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          Object.assign(
            sharedConfig.fileLoaderConfig,
            { name: '[name]-[hash].[ext]' }
          )
        ],
      },
    ]
  },

  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),

    new ExtractTextPlugin('[name]-[hash].css')
  ]
})
