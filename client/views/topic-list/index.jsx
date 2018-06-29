import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import AppState from '../../store/app-state'

@inject('appState') @observer
export default class TopicList extends Component {
  constructor(props) {
    super(props)
    this.changeName = this.changeName.bind(this)
  }

  componentDidMount() {

  }

  bootstrap() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const { appState } = this.props
        appState.changeName('Jokey')
        resolve(true)
      }, 1000)
    })
  }

  changeName(evt) {
    const { appState } = this.props;
    appState.changeName(evt.target.value)
  }

  render() {
    const { appState } = this.props
    return (
      <div>
        <input onChange={this.changeName} />
        {appState.msg}
      </div>
    )
  }
}

TopicList.propTypes = {
  appState: PropTypes.instanceOf(AppState),
}
