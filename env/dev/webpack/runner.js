const webpack = function (config, cb) {
  return require('webpack')(config, function (err, stats) {
    if (err) {
      if (cb) {
        cb(err)
      } else {
        throw err
      }
    } else {
      if (stats.hasErrors()) {
        console.error(
          'There were some errors during webpack compilation:',
          stats.toString({
            'errors-only': true,
            assets: false,
            colors: true,
            hash: false,
            timings: false,
            chunks: false,
            chunkModules: false,
            modules: false,
            children: false
          })
        )
      } else if (stats.hasWarnings()) {
        console.warn(
          'There were some warnings during webpack compilation:',
          stats.toString({
            normal: true,
            colors: true,
            hash: false,
            timings: true,
            chunks: false,
            chunkModules: false,
            modules: false,
            children: false
          })
        )
      } else {
        console.info(
          stats.toString({
            colors: true,
            hash: false,
            timings: true,
            chunks: false,
            chunkModules: false,
            modules: false,
            children: false
          })
        )

        console.info('%s Done. Webpack\'ed all assests.')
      }

      cb && cb()
    }
  })
}

module.exports = {
  webpack: webpack
}
