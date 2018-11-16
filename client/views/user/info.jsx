import React from 'react'
import PropTypes from 'prop-types'

import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'

import { withStyles } from '@material-ui/core/styles'
import UserWrapper from './user'
import infoStyles from './styles/user-info-style'

const TopicItem = ({ topic }) => (
  <ListItem>
    <Avatar src={topic.author.avatar_url} />
    <ListItemText
      primary={topic.title}
      secondary={`最新回复 ${topic.last_reply_at}`}
    />
  </ListItem>
)

TopicItem.propTypes = {
  topic: PropTypes.object.isRequired,
}

class UserInfo extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    const { classes } = this.props
    const topics = []
    const replies = []
    const collections = []
    return (
      <UserWrapper>
        <div className={classes.root}>
          <Grid container spacing={16} align="stretch">
            {/** 最近发布的话题 */}
            <Grid item xs={12} md={4}>
              <Paper elevation={2}>
                <Typography className={classes.partTitle}>
                  <span>
                    最近发布的话题
                  </span>
                </Typography>
                <List>
                  {
                    topics.length > 0
                      ? topics.map(topic => <TopicItem topic={topic} key={topic.id} />)
                      : (
                        <Typography align="center">
                          最近没有发布过话题
                        </Typography>
                      )
                  }
                </List>
              </Paper>
            </Grid>
            {/** 最近的回复 */}
            <Grid item xs={12} md={4}>
              <Paper elevation={2}>
                <Typography className={classes.partTitle}>
                  <span>
                    新的回复
                  </span>
                </Typography>
                <List>
                  {
                    replies.length > 0
                      ? replies.map(topic => <TopicItem topic={topic} key={topic.id} />)
                      : (
                        <Typography align="center">
                          最近没有新的回复
                        </Typography>
                      )
                  }
                </List>
              </Paper>
            </Grid>
            {/** 最近的收藏 */}
            <Grid item xs={12} md={4}>
              <Paper elevation={2}>
                <Typography className={classes.partTitle}>
                  <span>
                    收藏的话题
                  </span>
                </Typography>
                <List>
                  {
                    collections.length > 0
                      ? collections.map(topic => <TopicItem topic={topic} key={topic.id} />)
                      : (
                        <Typography align="center">
                          还么有收藏话题哦
                        </Typography>
                      )
                  }
                </List>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </UserWrapper>
    )
  }
}

UserInfo.contextTypes = {
  router: PropTypes.object.isRequired,
}

UserInfo.propTypes = {
  classes: PropTypes.object.isRequired,
}

// UserInfo.wrappedComponent.propTypes = {
//   appState: PropTypes.object.isRequired,
// }

export default withStyles(infoStyles)(UserInfo)
