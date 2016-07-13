'use strict'

const path = require('path')
const webpack = require('webpack')
const pkg = require('./package.json')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const cssImport = require('postcss-import')
const cssNext = require('postcss-cssnext')

const NODE_ENV = process.env.NODE_ENV || 'development'
const PATHS = {
  src: path.join(__dirname, 'src'),
  app: path.join(__dirname, 'app')
}

const getPlugins = ({
  minify = false
}) => {
  let plugins = []

  plugins.push(new webpack.DefinePlugin({
    NODE_ENV: JSON.stringify(NODE_ENV)
  }))

  plugins.push(new webpack.optimize.CommonsChunkPlugin({
    names: ['vendor', 'manifest']
  }))

  plugins.push(new ExtractTextPlugin('[name].css', {
    allChunks: true
  }))

  if (minify) {
    plugins.push(new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }))
  }

  return plugins
}

const config = {
  entry: {
    index: path.join(PATHS.src, 'index'),
    vendor: Object.keys(pkg.dependencies)
  },
  output: {
    path: PATHS.app,
    filename: '[name].js',
    publicPath: '/app/'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        loaders: ['babel?cacheDirectory'],
        include: PATHS.src
      },
      {
        test: /\.(png|jpg|svg)/,
        loader: 'file?name=images/[name].[hash].[ext]',
        include: PATHS.src
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss'),
        include: PATHS.src
      }
    ]
  },
  plugins: getPlugins({minify: NODE_ENV === 'production'}),
  devtool: NODE_ENV === 'production' ? 'source-map' : 'cheap-inline-module-source-map',
  watch: NODE_ENV === 'development',
  postcss: () => {
    return [
      cssImport({ addDependencyTo: webpack }),
      cssNext()
    ]
  }
}

module.exports = config
