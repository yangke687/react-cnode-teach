import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'
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
  constructor() {
    super()
    this.state = {
      title: '',
      content: '',
      tab: 'dev',
    }
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

  }

  render() {
    const { classes } = this.props
    const { title, content } = this.state
    return (
      <Container>
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

TopicCreate.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(topicCreateStyles)(TopicCreate)
