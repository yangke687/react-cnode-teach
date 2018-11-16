import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import List from '@material-ui/core/List'
import CircularProgress from '@material-ui/core/CircularProgress'
import querystring from 'query-string'
// import Button from '@material-ui/core/Button'
import AppState from '../../store/app-state'
import TopicStore from '../../store/topic'
import Container from '../components/container'
import ListItem from './list-item'
import { tabs } from '../../util/variable-define'

@inject(stores => ({
  appState: stores.appState,
  topicStore: stores.topicStore,
})) @observer
export default class TopicList extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      // tabIdx: 0,
    }
    this.changeTabIdx = this.changeTabIdx.bind(this)
  }

  componentDidMount() {
    const { topicStore } = this.props
    const tab = this.getTab()
    topicStore.fetchTopics(tab)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.search !== this.props.location.search) { // eslint-disable-line
      nextProps.topicStore.fetchTopics(this.getTab(nextProps.location))
    }
  }

  getTab(location) {
    location = location || this.props.location // eslint-disable-line
    const query = querystring.parse(location.search)
    return query.tab || 'all'
  }

  changeTabIdx(evt, value) {
    const { router } = this.context
    router.history.push({
      pathName: '/list',
      search: `?tab=${value}`,
    })
  }

  bootstrap() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const { appState } = this.props
        console.log(appState)
        resolve(true)
      }, 1000)
    })
  }

  render() {
    const { appState, topicStore } = this.props
    const { loading, topics } = topicStore
    const tab = this.getTab()

    return (
      <Container>
        <Helmet>
          <title>
            话题列表
          </title>
          <meta name="description" content="this is description" />
        </Helmet>
        <Tabs value={tab || 'all'} onChange={this.changeTabIdx}>
          {
            Object.keys(tabs).map(tabKey => (
              <Tab label={tabs[tabKey]} value={tabKey} key={tabKey} />
            ))
          }
        </Tabs>
        <List>
          { // eslint-disable-next-line
            topics.map(t => <ListItem onClick={() => this.context.router.history.push(`/detail/${t.id}`)} topic={t} key={t.id} />)
          }
        </List>
        { loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '40px 0' }}>
            <CircularProgress color="primary" size={100} />
          </div>
        ) : null}
        {appState.msg}
      </Container>
    )
  }
}

TopicList.wrappedComponent.propTypes = {
  appState: PropTypes.instanceOf(AppState),
  topicStore: PropTypes.instanceOf(TopicStore),
}

TopicList.propTypes = {
  location: PropTypes.object.isRequired,
}
