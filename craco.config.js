const webpack = require('webpack')
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')

module.exports = {
  webpack: {
    plugins: {
      add: [
        // Add node polyfill
        new webpack.ProvidePlugin({
          Buffer: ['buffer', 'Buffer'],
        }),
        new NodePolyfillPlugin({
          excludeAliases: ['console'],
        }),
      ],
    },
    configure: (webpackConfig) => {
      // Turn off source map warnings
      webpackConfig.ignoreWarnings = [/Failed to parse source map/]
      return webpackConfig
    },
  },
}
