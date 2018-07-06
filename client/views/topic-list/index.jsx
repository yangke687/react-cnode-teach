import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import Button from '@material-ui/core/Button'
import AppState from '../../store/app-state'
import Container from '../components/container'

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
        appState.add()
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
      <Container>
        <Helmet>
          <title>
            Topics List Page
          </title>
          <meta name="description" content="this is description" />
        </Helmet>
        <Button color="primary" variant="raised">
          This is Button
        </Button>
        <input onChange={this.changeName} />
        {appState.msg}
      </Container>
    )
  }
}

TopicList.propTypes = {
  appState: PropTypes.instanceOf(AppState),
}
