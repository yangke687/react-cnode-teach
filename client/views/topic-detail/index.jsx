import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import { withStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import Paper from '@material-ui/core/Paper'
import Helmet from 'react-helmet'
import marked from 'marked'
import TopicStore from '../../store/topic'
import Container from '../components/container'
import { topicDetailStyle } from './styles'

import Reply from './reply'

@inject(stores => ({
  topicStore: stores.topicStore,
})) @observer
class TopicDetail extends Component {
  componentDidMount() {
    const { topicStore } = this.props
    topicStore.fetchTopics('all')
  }

  render() {
    const { topicStore, classes } = this.props
    const { topics } = topicStore
    const topic = topics.length ? topics[0] : null

    if (!topic) {
      return (
        <Container>
          <section className={classes.loadingContainer}>
            <CircularProgress color="primary" />
          </section>
        </Container>
      )
    }

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

        <Paper elevation={4} className={classes.replies}>
          <header className={classes.replyHeader}>
            <span>
              {`${topic.reply_count}回复`}
            </span>
            <span>
              {`最新回复 ${topic.last_reply_at}`}
            </span>
          </header>
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
  classes: PropTypes.object.isRequired,
  topicStore: PropTypes.instanceOf(TopicStore),
}

export default withStyles(topicDetailStyle)(TopicDetail)
