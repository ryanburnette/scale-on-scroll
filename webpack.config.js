/* jshint node: true, asi: true */
var path = require('path')

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
        test: /sticky-events.js/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
}
