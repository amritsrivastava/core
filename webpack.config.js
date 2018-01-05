const webpack = require('webpack')
const path = require('path')

const DIST_DIR = path.resolve(__dirname, 'dist')
const SRC_DIR = path.resolve(__dirname, 'src')

const CompressionPlugin = require('compression-webpack-plugin')

var config = {
  entry: SRC_DIR + '/index.jsx',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new CompressionPlugin({
      test: /\.jsx?$|\.css$|\.html$/,
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      threshold: 10240,
      minRation: 0.8
    })
  ],
  output: {
    path: DIST_DIR,
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: '/node_modules/'
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|svg|gif)$/,
        loader: 'file-loader'
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  watch: true,
  watchOptions: {
    ignored: /node_modules/
  }
}

module.exports = config
