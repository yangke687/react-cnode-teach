import React from 'react'
import PropTypes from 'prop-types'
import Avatar from '@material-ui/core/Avatar'
import { withStyles } from '@material-ui/core/styles'
import UserIcon from '@material-ui/icons/AccountCircle'

import { inject, observer } from 'mobx-react'

import Container from '../components/container'
import userStyles from './styles/user-style'

@inject(stores => ({
  user: stores.appState.user,
}))
@observer
class User extends React.Component {
  componentDidMount() {
    // do something here
  }

  render() {
    const { classes, children, user } = this.props
    // const isLogin = user.isLogin
    const userInfo = user.info
    return (
      <Container>
        <div className={classes.avatar}>
          <div className={classes.bg} />
          {
            userInfo.avatar_url
              ? <Avatar className={classes.avatarImg} src={userInfo.avatar_url} />
              : (
                <Avatar className={classes.avatarImg}>
                  <UserIcon />
                </Avatar>
              )
          }
          <span className={classes.userName}>
            {userInfo.loginname || '未登录'}
          </span>
        </div>
        {children}
      </Container>
    )
  }
}

User.wrappedComponent.propTypes = {
  user: PropTypes.object.isRequired,
}

User.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.element.isRequired,
}

export default withStyles(userStyles)(User)
