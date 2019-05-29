const fs = require('fs')
const path = require('path')
const webpack = require('webpack')

module.exports = {
  mode: 'development',
  devtool: '#source-map',
  entry: fs.readdirSync(__dirname).reduce((entries, dir) => {
    const fullDir = path.join(__dirname, dir)
    const entry = path.join(fullDir, 'app.ts')
    if (fs.statSync(fullDir).isDirectory() && fs.existsSync(entry)) {
      entries[dir] = ['webpack-hot-middleware/client', entry]
    }
    return entries
  }, {}),

  output: {
    path: path.join(__dirname, '__build__'),
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
    publicPath: '/__build__/'
  },

  module: {
    rules: [
      // {
      //   test: /\.ts$/,
      //   enforce: 'pre',
      //   loader: 'tslint-loader'
      // },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'ts-loader'
      },
    ]
  },

  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      'exact-html': path.resolve(__dirname, '../src/index.ts'),
    }
  },
  optimization: {
    minimize: false
    // splitChunks:{}
  },
  plugins: [
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'shared',
    //   filename: 'shared.js'
    // }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()

  ]

}