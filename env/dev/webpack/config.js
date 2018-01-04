const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const rootPath = path.join(__dirname, '..', '..', '..')
const indexPath = path.resolve(rootPath, 'src', 'modules', 'index.es')
const nodeModulesDir = path.resolve(rootPath, 'node_modules')
const libDir = path.resolve(rootPath, 'node_modules')
const pkg = require(path.join(rootPath, 'package.json'))

const config = {
  devtool: 'eval',

  entry: {
    vendor: Object.keys(pkg.dependencies),
    lib: ['jquery'],
    app: [
      'webpack-hot-middleware/client?reload=true',
      indexPath
    ]
  },

  output: {
    path: path.join(rootPath, 'target'),
    publicPath: '/',
    filename: '[name].js'
  },

  module: {
    rules: [{
      enforce: 'pre',
      test: /\.es?$/,
      loader: 'standard-loader',
      exclude: [nodeModulesDir, libDir]
    }, {
      test: /\.es?$/,
      exclude: [nodeModulesDir, libDir],
      use: {
        loader: 'babel-loader'
      }
    }, {
      test: /\.html$/, loader: 'html-loader'
    }, {
      test: /\.svg$/, loader: 'svg-sprite-loader'
    }]
  },

  resolve: {
    extensions: [
      '.es',
      '.js'
    ],
    modules: [
      'src/modules',
      'lib', // very important, place this before node modules so that our own jquery will be used!
      'node_modules',
      'src/vectors'
    ],
    mainFields: ['browser', 'main']
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),

    // this plugin will cause the relative path of the module to be displayed
    new webpack.NamedModulesPlugin(),

    new webpack.HotModuleReplacementPlugin(),

    // generates an `index.html` file with the <script> injected.
    new HtmlWebpackPlugin({
      template: 'src/indexes/index.tpl.ejs',
      inject: 'body',
      filename: 'index.html',
      title: 'random svg issues',
      dev: true,
      cache: false
    }),

    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'lib'],
      minChunks: Infinity
    })
  ]
}

module.exports = config
