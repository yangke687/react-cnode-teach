import React, { Component as ReactComponent } from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader' // eslint-disable-line
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'mobx-react'
/** mui */
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { lightBlue, pink } from '@material-ui/core/colors'
import App from './views/App'
/** mobx */
import AppState from './store/app-state'
import TopicStore from './store/topic'

/** mui custom theme */
const theme = createMuiTheme({
  palette: {
    primary: pink,
    secondary: lightBlue,
    type: 'light',
  },
})

const createApp = (TheApp) => {
  class Main extends ReactComponent {
    // Remove the server-side injected CSS.
    componentDidMount() {
      const jssStyles = document.getElementById('jss-server-side');
      if (jssStyles && jssStyles.parentNode) {
        jssStyles.parentNode.removeChild(jssStyles);
      }
    }

    render() {
      return <TheApp />
    }
  }
  return Main
}

const initState = window.__INITIAL__STATE__ ? window.__INITIAL__STATE__.appState : {}// eslint-disable-line
const appState = new AppState(initState.appState)
const topicStore = new TopicStore(initState.topicStore)

const root = document.getElementById('root')
const render = (Component) => {
  ReactDOM.hydrate(
    <AppContainer>
      <Provider appState={appState} topicStore={topicStore}>
        <BrowserRouter>
          <MuiThemeProvider theme={theme}>
            <Component />
          </MuiThemeProvider>
        </BrowserRouter>
      </Provider>
    </AppContainer>,
    root,
  )
}

render(createApp(App))

if (module.hot) {
  module.hot.accept('./views/App', () => {
    const NextApp = require('./views/App').default // eslint-disable-line
    render(createApp(NextApp))
  })
}
