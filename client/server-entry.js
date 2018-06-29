import React from 'react'
import { StaticRouter } from 'react-router'
import { Provider, useStaticRendering } from 'mobx-react'
import App from './views/App'
import { createStoreMap } from './store/store'

// stop dynamically re-render from memory leaking
useStaticRendering(true)

export default (stores, routerContext, url) => (
  <StaticRouter context={routerContext} location={url}>
    <Provider {...stores}>
      <App />
    </Provider>
  </StaticRouter>
)

export { createStoreMap }
