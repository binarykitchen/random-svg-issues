const path = require('path')
const express = require('express')
const webpackMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const http = require('http')
const expressLogUrl = require('express-log-url')

const rootPath = path.join(__dirname, '..', '..', '..')
const runner = require('./runner')

const port = 3000
const hostname = 'localhost'

const app = express()

function onReady () {
  console.info(
    '%s Listening on port %s. Open up http://%s:%s/ in your browser',
    runner.ARROW, port, hostname, port
  )
}

function boot () {
  const index = path.join(rootPath, 'target', 'index.html')
  const config = require('./config.js')

  const compiler = runner.webpack(config, function (err) {
    if (err) {
      console.error('Webpack threw error:', err)
      process.exit(1)
    } else {
      onReady()
    }
  })

  const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: path.join(rootPath, 'src'),
    stats: false,
    index: index
  })

  middleware.waitUntilValid(function () {
    app.use(expressLogUrl)

    // only serve index files when / is requested, this not to mess
    // with the rest of the webpack dev server, especially hot reloading
    app.get('/', function response (req, res, next) {
      middleware.fileSystem.readFile(index, function (err, data) {
        if (err) {
          next(err)
        } else {
          res.write(data)
          res.end()
        }
      })
    })
  })

  app.use(middleware)
  app.use(webpackHotMiddleware(compiler))

  // at last, start the local https server itself
  http.createServer(app).listen(port, hostname, function (err) {
    if (err) {
      console.error('Server threw error:', err)
    }
  })
}

boot()
