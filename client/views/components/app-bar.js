import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import ToolBar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import SvgIcon from '@material-ui/core/SvgIcon'

const styleSheet = {
  root: {
    width: '100%',
  },
  flex: {
    flex: 1,
  },
}

const HomeIcon = props => (
  <SvgIcon {...props}>
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
  </SvgIcon>
)

class ButtonAppBar extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <AppBar position="fixed">
          <ToolBar>
            <IconButton color="inherit" onClick={() => null}>
              <HomeIcon />
            </IconButton>
            <Typography type="title" color="inherit" className={classes.flex}>
              JNode
            </Typography>
            <Button variant="raised" color="primary" onClick={() => null}>
              新建话题
            </Button>
            <Button color="inherit" onClick={() => null}>
              登录
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
