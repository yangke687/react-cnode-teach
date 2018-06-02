const path = require('path')

module.exports = {
  entry: {
    app: path.join(__dirname, '../client/app.js',)
  },

  output: {
    filename: '[name].[hash:5].js',
    path: path.join(__dirname, '../dist'),
    publicPath: '/public'
  },

  resolve: {
    extensions: ['.js', '.jsx'],
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'react']
          }
        }
      }
    ]
  }
}