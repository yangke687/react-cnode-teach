const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'

const config = {
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
  },

  plugins: [
    new htmlWebpackPlugin({
      template: path.join(__dirname, '../client/template.html')
    })
  ]
}

if (isDev) {
  config.devServer = {
    host: '0.0.0.0',
    port: 8888,
    contentBase: path.join(__dirname, '../dist'),
    //hot: true,
    overlay: {
      errors: true,
    },
    publicPath: '/public',
    historyApiFallback: {
      index: '/public/index.html'
    }
  }
}

module.exports = config