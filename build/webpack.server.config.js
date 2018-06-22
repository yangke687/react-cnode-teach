const webpackMerge = require('webpack-merge')
const baseConfig = require('./webpack.base.config')
const path = require('path')

module.exports = webpackMerge(baseConfig, {
  target: 'node',
  entry: {
    app: path.join(__dirname, '../client/server-entry.js',)
  },

  output: {
    filename: 'server-entry.js',
    libraryTarget: 'commonjs2'
  },

  resolve: {
    extensions: ['.js', '.jsx'],
  }

})
