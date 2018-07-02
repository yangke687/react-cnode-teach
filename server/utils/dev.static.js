const axios = require('axios')
const path = require('path')
const proxy = require('http-proxy-middleware')
const MemoryFs = require('memory-fs')
const webpack = require('webpack')
const asyncBootstrapper = require('react-async-bootstrapper')
const ejs = require('ejs')
const serialize = require('serialize-javascript')
const ReactDOMServer = require('react-dom/server')
const Helmet = require('react-helmet').default

const getTemplate = () => new Promise((resolve, reject) => {
  axios.get('http://localhost:8888/public/server.template.ejs')
    .then(res => {
      resolve(res.data)
    })
    .catch(reject)
})

const NativeModule = require('module')
const vm = require('vm')
const getModuleFromString = (bundle, filename) => {
  const m = { exports: {} }
  const wrapper = NativeModule.wrap(bundle)
  const script = new vm.Script(wrapper, { filename })
  const result = script.runInThisContext({ displayErrors: true })
  result.call(m.exports, m.exports, require, m) // 'require' is in our current context, solve 'react is not found' error
  return m
}

/** build bundle.js */
const webpackServerConfig = require('../../build/webpack.server.config')
const serverCompiler = webpack(webpackServerConfig)
const mfs = new MemoryFs()
/** compile bundle.js in memory */
let bundleJsFunc, createStoreMap
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
  // const Module = module.constructor
  // const m = new Module()
  // m._compile(bundleJsStr, 'server-entry.js')
  const m = getModuleFromString(bundleJsStr, 'server-entry.js')
  bundleJsFunc = m.exports.default
  createStoreMap = m.exports.createStoreMap
})

const getStoreState = (stores) => {
  return Object.keys(stores).reduce((results, storeName) => {
    results[storeName] = stores[storeName].toJson()
    return results
  }, {})
}

module.exports = (app) => {
  app.use('/public', proxy({
    target: 'http://localhost:8888'
  }))
  app.get('*', (req, res, next) => {
    if (!bundleJsFunc || !createStoreMap) {
      res.send('waiting to compile, refresh later ')
    }
    getTemplate().then(template => {
      const routerContext = {}
      const stores = createStoreMap()
      const serverEntry = bundleJsFunc(stores, routerContext, req.url)

      asyncBootstrapper(serverEntry).then(() => {
        /** Redirect */
        if (routerContext.url) {
          res.writeHead(302, {
            Location: routerContext.url
          })
          res.end()
          return
        }

        const helmet = Helmet.renderStatic()
        const storeState = getStoreState(stores)
        const content = ReactDOMServer.renderToString(serverEntry)
        const html = ejs.render(template, {
          appString: content,
          initialState: serialize(storeState),
          meta: helmet.meta.toString(),
          title: helmet.title.toString(),
          style: helmet.style.toString(),
          link: helmet.link.toString()
        })
        res.send(html)
        // res.send(template.replace('<!-- app -->', content))
      })
    }).catch(next)
  })
}
