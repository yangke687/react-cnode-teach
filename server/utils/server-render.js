const asyncBootstrapper = require('react-async-bootstrapper')
const ejs = require('ejs')
const serialize = require('serialize-javascript')
const ReactDOMServer = require('react-dom/server')
const Helmet = require('react-helmet').default

const getStoreState = (stores) => {
  return Object.keys(stores).reduce((results, storeName) => {
    results[storeName] = stores[storeName].toJson()
    return results
  }, {})
}

module.exports = (bundle, template, req, res) => {
  return new Promise((resolve, reject) => {
    const bundleJsFunc = bundle.default
    const createStoreMap = bundle.createStoreMap
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
      resolve()
    }).catch(reject)
  })
}
