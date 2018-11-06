import React from 'react'
import PropTypes from 'prop-types'

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import UserWrapper from './user'
import loginStyle from './styles/login-style'

class UserLogin extends React.Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  constructor() {
    super()
    this.state = {
      accesstoken: '',
      helpText: '',
    }
    this.handleInput = this.handleInput.bind(this)
  }

  handleInput(evt) {
    this.setState({
      accesstoken: evt.target.value.trim(),
    })
  }

  render() {
    const { classes } = this.props
    const { helpText, accesstoken } = this.state
    return (
      <UserWrapper>
        <div className={classes.root}>
          <TextField
            label="请输入 Cnode AccessToken"
            placeholder="请输入 Cnode AccessToken"
            required
            helperText={helpText}
            value={accesstoken}
            onChange={this.handleInput}
            className={classes.input}
          />
          <Button
            variant="raised"
            color="primary"
            onClick={this.handleLogin}
            className={classes.loginButton}
          >
            登 录
          </Button>
        </div>
      </UserWrapper>
    )
  }
}

UserLogin.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(loginStyle)(UserLogin)
