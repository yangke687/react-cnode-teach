const axios = require('axios')
const path = require('path')
const proxy = require('http-proxy-middleware')
const MemoryFs = require('memory-fs')
const webpack = require('webpack')

const ReactDOMServer = require('react-dom/server')

const getTemplate = () => new Promise((resolve, reject) => {
  axios.get('http://localhost:8888/public/index.html')
    .then(res => {
      resolve(res.data)
    })
    .catch(reject)
})

/** build bundle.js */
const webpackServerConfig = require('../../build/webpack.server.config')
const serverCompiler = webpack(webpackServerConfig)
const mfs = new MemoryFs()
/** compile bundle.js in memory */
let bundleJs, createStoreMap
serverCompiler.outputFileSystem = mfs
serverCompiler.watch({
  /** configuration objects */
}, (err, stats) => {
  if (err) throw err
  stats = stats.toJson()
  stats.errors.forEach(err => console.log(err))

  const bundlePath = path.join(
    webpackServerConfig.output.path,
    webpackServerConfig.output.filename
  )
  /** read bundle.js string from memory */
  const bundleJsStr = mfs.readFileSync(bundlePath, 'utf-8')
  /** next transform bundle.js string to bundle.js module */
  const Module = module.constructor
  const m = new Module()
  m._compile(bundleJsStr, 'server-entry.js')
  bundleJs = m.exports.default
  createStoreMap = m.exports.createStoreMap
})

module.exports = (app) => {
  app.use('/public', proxy({
    target: 'http://localhost:8888'
  }))
  app.use('*', (req, res) => {
    getTemplate().then(template => {
      const routerContext = {}
      const serverEntry = bundleJs(createStoreMap(), routerContext, req.url)
      const content = ReactDOMServer.renderToString(serverEntry)
      res.send(template.replace('<!-- app -->', content))
    })
  })
}
