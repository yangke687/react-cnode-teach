import React, { Component } from 'react'
import axios from 'axios'

/* eslint-disable */
class ApiTest extends Component {

  topics() {
    axios.get('/api/topics')
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  }

  login() {
    axios.post('/api/user/login', {
      accessToken: '91104e7c-1344-41cc-a623-9c045ecc3c8f'
    }).then(res => {
      console.log(res)
    }).catch(err => {
      console.error(err)
    })
  }

  markAll() {
    axios.post('/api/message/mark_all?needAccessToken=true')
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  }

  render () {
    return (
      <div>
        <button onClick={this.topics}>Topics</button>
        <button onClick={this.login}>Login</button>
        <button onClick={this.markAll}>MarkAll</button>
      </div>
    );
  }
}
export default ApiTest
/* eslint-enable */
