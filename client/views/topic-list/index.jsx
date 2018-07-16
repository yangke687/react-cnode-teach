import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
// import Button from '@material-ui/core/Button'
import AppState from '../../store/app-state'
import TopicStore from '../../store/topic'
import Container from '../components/container'
import ListItem from './list-item'

const topic = {
  title: '前端想转后端, 如何进行下去?',
  username: '薰衣草',
  tab: '问答',
  reply_count: 20,
  visit_count: 30,
  create_at: '1小时前',
  avatar: 'https://avatars0.githubusercontent.com/u/4279697?v=4&s=120',
}
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
    console.log('here:', loading, topics) // eslint-disable-line
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
        <ListItem onClick={() => null} topic={topic} />
        {appState.msg}
      </Container>
    )
  }
}

TopicList.wrappedComponent.propTypes = {
  appState: PropTypes.instanceOf(AppState),
  topicStore: PropTypes.instanceOf(TopicStore),
}
