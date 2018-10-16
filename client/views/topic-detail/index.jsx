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
    const { topicStore, match } = this.props
    const { params } = match
    const { id } = params
    topicStore.getTopicDetail(id)
  }

  render() {
    const { topicStore, classes, match } = this.props
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
  topicStore: PropTypes.instanceOf(TopicStore),
}

TopicDetail.propTypes = {
  match: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
}

export default withStyles(topicDetailStyle)(TopicDetail)
