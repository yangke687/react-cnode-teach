const asyncBootstrapper = require('react-async-bootstrapper')
const ejs = require('ejs')
const serialize = require('serialize-javascript')
const ReactDOMServer = require('react-dom/server')
const Helmet = require('react-helmet').default
/** material jss */
const createMuiTheme = require('@material-ui/core/styles').createMuiTheme
const createGenerateClassName = require('@material-ui/core/styles').createGenerateClassName
const SheetsRegistry = require('react-jss/lib/jss').SheetsRegistry
const lightBlue = require('@material-ui/core/colors').lightBlue
const pink = require('@material-ui/core/colors').pink

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
    /* jss */
    const generateClassName = createGenerateClassName()
    const sheetsRegistry = new SheetsRegistry()
    const theme = createMuiTheme({
      palette: {
        primary: lightBlue,
        accent: pink,
        type: 'light'
      }
    })
    const serverEntry = bundleJsFunc(stores, routerContext, sheetsRegistry, generateClassName, theme, req.url)

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
        link: helmet.link.toString(),
        materialCss: sheetsRegistry.toString()
      })
      res.send(html)
      resolve()
    }).catch(reject)
  })
}
