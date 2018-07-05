import React from 'react'
import { StaticRouter } from 'react-router'
import { Provider, useStaticRendering } from 'mobx-react'
/** material jss */
import JssProvider from 'react-jss/lib/JssProvider'
import { MuiThemeProvider } from '@material-ui/core/styles'
import App from './views/App'
import { createStoreMap } from './store/store'

// stop dynamically re-render from memory leaking
useStaticRendering(true)

export default (stores, routerContext, sheetsRegistry, generateClassName, theme, url) => (
  <Provider {...stores}>
    <StaticRouter context={routerContext} location={url}>
      <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
        <MuiThemeProvider theme={theme} sheetsManager={new Map()}>
          <App />
        </MuiThemeProvider>
      </JssProvider>
    </StaticRouter>
  </Provider>
)

export { createStoreMap }
