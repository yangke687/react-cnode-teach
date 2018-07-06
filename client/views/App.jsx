import React, { Component } from 'react'
import Routes from '../config/router'
import ButtonAppBar from './components/app-bar'

export default class App extends Component {
  componentDidMount() {

  }

  render() {
    return [
      <div key="main">
        <ButtonAppBar />
      </div>,
      <Routes key="routes" />,
    ]
  }
}
