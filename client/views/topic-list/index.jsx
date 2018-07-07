import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
// import Button from '@material-ui/core/Button'
import AppState from '../../store/app-state'
import Container from '../components/container'

@inject('appState') @observer
export default class TopicList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tabIdx: 0,
    }
    this.changeTabIdx = this.changeTabIdx.bind(this)
  }

  componentDidMount() {

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
    const { appState } = this.props
    const { tabIdx } = this.state
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
        {appState.msg}
      </Container>
    )
  }
}

TopicList.propTypes = {
  appState: PropTypes.instanceOf(AppState),
}
