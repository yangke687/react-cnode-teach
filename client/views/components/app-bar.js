import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { inject, observer } from 'mobx-react'

import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import ToolBar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import HomeIcon from '@material-ui/icons/Home'

const styleSheet = {
  root: {
    width: '100%',
  },
  flex: {
    flex: 1,
  },
}

@inject(stores => ({
  appState: stores.appState,
}))
@observer
class ButtonAppBar extends Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  constructor(props) {
    super(props)
    this.state = {

    }
    this.loginBtnClick = this.loginBtnClick.bind(this)
    this.homeIconClick = this.homeIconClick.bind(this)
    this.createBtnClick = this.createBtnClick.bind(this)
  }

  homeIconClick() {
    const { router } = this.context
    router.history.push('/list?tab=all')
  }

  loginBtnClick() {
    const { router } = this.context
    const { appState } = this.props
    const { user } = appState

    if (user.isLogin) {
      router.history.push('/user/info')
    } else {
      router.history.push('/user/login')
    }
  }

  createBtnClick() {
    const { router } = this.context
    router.history.push('/topic/create')
  }

  render() {
    const { classes, appState } = this.props
    const { user } = appState
    return (
      <div className={classes.root}>
        <AppBar position="fixed">
          <ToolBar>
            <IconButton color="inherit" onClick={this.homeIconClick}>
              <HomeIcon />
            </IconButton>
            <Typography type="title" color="inherit" className={classes.flex}>
              JNode
            </Typography>
            <Button variant="raised" color="primary" onClick={this.createBtnClick}>
              新建话题
            </Button>
            <Button color="inherit" onClick={this.loginBtnClick}>
              { user.isLogin ? user.info.loginname : '登录' }
            </Button>
          </ToolBar>
        </AppBar>
      </div>
    )
  }
}

export default withStyles(styleSheet)(ButtonAppBar)

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
}

ButtonAppBar.wrappedComponent.propTypes = {
  appState: PropTypes.object.isRequired,
}
