const webpack = require('webpack')

module.exports = {
  mode: 'development',
  entry: [
    'babel-polyfill',
    `${__dirname}/index.js`
  ],
  output: {
    path: __dirname,
    filename: 'dist.js'
  },
  // plugins: [
  //    new webpack.LoaderOptionsPlugin({
  //      // test: /\.xxx$/, // may apply this only for some modules
  //      options: {
  //        loaders: [
  //          {
  //            test: /.(js)?$/,
  //            exclude: /(node_modules)/,
  //            loader: 'babel-loader',
  //            query: {
  //              presets: ['env', 'stage-3', 'react']
  //            }
  //          }
  //        ]
  //      }
  //    })
  // ]
  module: {
    rules: [
      {
        test: /.(js)?$/,
        exclude: /(node_modules)/,
        use: 'babel-loader'
      }
    ]
  }
}
