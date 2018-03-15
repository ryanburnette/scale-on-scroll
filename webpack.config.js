/* jshint node: true, asi: true */
const path = require('path')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  entry: './lib/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    library: 'scaleOnScroll',
    libraryExport: 'default',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.es6.js$/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\/lib\/index.js/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /sticky-events.js/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      }
    ]
  },
  plugins: [
    new UglifyJSPlugin(),
  ]
}
