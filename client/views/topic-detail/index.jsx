import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import { withStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Helmet from 'react-helmet'
import marked from 'marked'
import SimpleMDE from 'react-simplemde-editor'
import ReplyIcon from '@material-ui/icons/Reply'

import TopicStore from '../../store/topic'
import Container from '../components/container'
import { topicDetailStyle } from './styles'

import Reply from './reply'


@inject(stores => ({
  topicStore: stores.topicStore,
  user: stores.appState.user,
})) @observer
class TopicDetail extends Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  constructor() {
    super()
    this.state = {
      newReply: '',
    }
  }

  componentDidMount() {
    const { topicStore, match } = this.props
    const { params } = match
    const { id } = params
    topicStore.getTopicDetail(id)
  }

  handleNewReplyChange = (value) => {
    this.setState({ newReply: value })
  }

  gotoLogin = () => {
    const { router } = this.context
    router.history.push('/user/login')
  }

  doReply = () => {
    const { newReply } = this.state
    /** get topic doPost method */
    const { topicStore, match } = this.props
    const { params } = match
    const { id } = params
    const topic = topicStore.detailsMap[id]

    topic.doReply(newReply)
    this.setState({ newReply: '' })
  }

  render() {
    const {
      topicStore, classes, match,
      user,
    } = this.props
    const { params } = match
    const { id } = params
    const topic = topicStore.detailsMap[id]

    if (!topic) {
      return (
        <Container>
          <section className={classes.loadingContainer}>
            <CircularProgress color="primary" />
          </section>
        </Container>
      )
    }

    const { newReply } = this.state

    return (
      <div>
        <Container>
          <Helmet>
            <title>
              {topic.title}
            </title>
          </Helmet>
          <header className={classes.header}>
            <h3>
              {topic.title}
            </h3>
          </header>
          <section className={classes.body}>
            <p dangerouslySetInnerHTML={{ __html: marked(topic.content) }} />
          </section>
        </Container>

        {/** 我的最新回复 */}
        {
          topic.createdReplies && topic.createdReplies.length ? (
            <Paper elevation={4} className={classes.replies}>
              <header className={classes.replyHeader}>
                <span>
                  最新回复
                </span>
                <span>
                  {`${topic.createdReplies.length}条`}
                </span>
              </header>
              <section>
                {topic.createdReplies.map(reply => (
                  <Reply
                    reply={Object.assign({}, reply, {
                      author: {
                        avatar_url: user.info.avatar_url,
                        loginname: user.info.loginname,
                      },
                    })}
                  />
                ))}
              </section>
            </Paper>
          ) : null
        }

        <Paper elevation={4} className={classes.replies}>
          <header className={classes.replyHeader}>
            <span>
              {`${topic.reply_count}回复`}
            </span>
            <span>
              {`最新回复 ${topic.last_reply_at}`}
            </span>
          </header>
          { user.isLogin
            ? (
              <section className={classes.replyEditor}>
                <SimpleMDE
                  value={newReply}
                  onChange={this.handleNewReplyChange}
                  options={{
                    toolbar: false,
                    autofocus: false,
                    spellChecker: false,
                    placeholder: '请您回复精彩内容',
                  }}
                />
                <Button className={classes.replyButton} variant="raised" color="primary" onClick={this.doReply}>
                  <ReplyIcon />
                  回复
                </Button>
              </section>) : (
                <section className={classes.notLoginButton}>
                  <Button
                    variant="raised"
                    color="primary"
                    onClick={this.gotoLogin}
                  >
                    登录并回复
                  </Button>
                </section>
            )
          }

          <section>
            {
              topic.replies.map(reply => <Reply reply={reply} key={reply.id} />)
            }
          </section>
        </Paper>
      </div>
    )
  }
}

TopicDetail.wrappedComponent.propTypes = {
  topicStore: PropTypes.instanceOf(TopicStore),
  user: PropTypes.object.isRequired,
}

TopicDetail.propTypes = {
  match: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
}

export default withStyles(topicDetailStyle)(TopicDetail)
