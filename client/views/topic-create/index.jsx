import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'
import Snackbar from '@material-ui/core/Snackbar'
import { inject, observer } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles'
import Radio from '@material-ui/core/Radio'
import Button from '@material-ui/core/Button'
import IconReply from '@material-ui/icons/Reply'

import { tabs } from '../../util/variable-define'
import Container from '../components/container';
import topicCreateStyles from './styles'

import SimpleMDE from '../../components/simple-mde/index'

@inject(stores => ({
  topicStore: stores.topicStore,
  appState: stores.appState,
})) @observer
class TopicCreate extends Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  constructor() {
    super()
    this.state = {
      title: '',
      content: '',
      tab: 'dev',
      // err
      message: null,
      open: false,
    }
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  handleTitleChange = (e) => {
    this.setState({ title: e.target.value })
  }

  handleContentChange = (value) => {
    this.setState({
      content: value,
    })
  }

  handleChangeTab = (e) => {
    this.setState({
      tab: e.currentTarget.value,
    })
  }

  handleCreate = () => {
    const { topicStore } = this.props
    const { title, content, tab } = this.state
    const { router } = this.context
    if (!title) {
      this.setState({
        message: '标题不能为空',
        open: true,
      })
      return false
    }
    if (!content) {
      this.setState({
        message: '内容不能为空',
        open: true,
      })
      return false
    }
    return topicStore.createTopic(title, tab, content)
      .then(() => {
        router.history.push('/list')
      })
      .catch((err) => {
        console.error(err)
      })
  }

  render() {
    const { classes } = this.props
    const {
      title, content, message, open,
    } = this.state

    return (
      <Container>
        <Snackbar
          anchorOrigin={{
            horizontal: 'center',
            vertical: 'top',
          }}
          message={message}
          open={open}
          onClose={this.handleClose}
        />
        <div className={classes.root}>
          <TextField
            className={classes.title}
            label="标题"
            value={title}
            onChange={this.handleTitleChange}
            fullWidth
          />
          <SimpleMDE
            onChange={this.handleContentChange}
            value={content}
            options={{
              toolbar: false,
              spellChecker: false,
              placeholder: '发表你的精彩意见',
            }}
          />
          <div>
            {
              Object.keys(tabs).map(tab => (
                tab !== 'all' && tab !== 'good'
                  ? (
                    <span className={classes.selectItem} key={tab}>
                      <Radio
                        value={tab}
                        checked={tab === this.state.tab} // eslint-disable-line
                        onChange={this.handleChangeTab}
                      />
                      {tabs[tab]}
                    </span>
                  ) : null
              ))
            }
          </div>
          <Button
            variant="raised"
            color="primary"
            onClick={this.handleCreate}
            className={classes.replyButton}
          >
            <IconReply />
          </Button>
        </div>
      </Container>
    )
  }
}

TopicCreate.wrappedComponent.propTypes = {
  topicStore: PropTypes.object.isRequired,
  // appState: PropTypes.object.isRequired,
}

TopicCreate.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(topicCreateStyles)(TopicCreate)
