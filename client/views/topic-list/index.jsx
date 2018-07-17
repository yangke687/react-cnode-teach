import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import List from '@material-ui/core/List';
import CircularProgress from '@material-ui/core/CircularProgress';
// import Button from '@material-ui/core/Button'
import AppState from '../../store/app-state'
import TopicStore from '../../store/topic'
import Container from '../components/container'
import ListItem from './list-item'

@inject(stores => ({
  appState: stores.appState,
  topicStore: stores.topicStore,
})) @observer
export default class TopicList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tabIdx: 0,
    }
    this.changeTabIdx = this.changeTabIdx.bind(this)
  }

  componentDidMount() {
    const { topicStore } = this.props
    topicStore.fetchTopics()
  }

  changeTabIdx(evt, idx) {
    this.setState({
      tabIdx: idx,
    })
  }

  bootstrap() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const { appState } = this.props
        appState.changeName('Jokey')
        appState.add()
        resolve(true)
      }, 1000)
    })
  }

  render() {
    const { appState, topicStore } = this.props
    const { tabIdx } = this.state
    const { loading, topics } = topicStore
    return (
      <Container>
        <Helmet>
          <title>
            话题列表
          </title>
          <meta name="description" content="this is description" />
        </Helmet>
        <Tabs value={tabIdx} onChange={this.changeTabIdx}>
          <Tab label="全部" />
          <Tab label="精华" />
          <Tab label="分享" />
          <Tab label="问答" />
          <Tab label="招聘" />
          <Tab label="客户端测试" />
        </Tabs>
        <List>
          {topics.map(t => <ListItem onClick={() => null} topic={t} key={t.id} />)}
        </List>
        { loading ? (
          <div>
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
