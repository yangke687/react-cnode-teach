import React from 'react'
import PropTypes from 'prop-types'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import { withStyles } from '@material-ui/core/styles'
import { topicPrimaryStyle, topicSecondaryStyle } from './styles'

const Primary = ({ classes, topic }) => (
  <div className={classes.root}>
    <span className={classes.tab}>
      {topic.tab}
    </span>
    <span className={classes.title}>
      {topic.title}
    </span>
  </div>
)

const StyledPrimary = withStyles(topicPrimaryStyle)(Primary)

Primary.propTypes = {
  classes: PropTypes.object.isRequired,
  topic: PropTypes.object.isRequired,
}

const Secondary = ({ classes, topic }) => (
  <div className={classes.root}>
    <span className={classes.userName}>
      {topic.username}
    </span>
    <div className={classes.count}>
      <span className={classes.accentColor}>
        {topic.reply_count}
      </span>
      <span>
        /
      </span>
      <span>
        {topic.visit_count}
      </span>
    </div>
    <span>
      {topic.create_at}
    </span>
  </div>
)

Secondary.propTypes = {
  classes: PropTypes.object.isRequired,
  topic: PropTypes.object.isRequired,
}

const StyledSecondary = withStyles(topicSecondaryStyle)(Secondary)

const TopicListItem = ({ onClick, topic }) => (
  <ListItem button onClick={onClick}>
    <ListItemAvatar>
      <Avatar src={topic.avatar} />
    </ListItemAvatar>
    <ListItemText
      primary={<StyledPrimary topic={topic} />}
      secondary={<StyledSecondary topic={topic} />}
    />
  </ListItem>
)

TopicListItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  topic: PropTypes.object.isRequired,
}

export default TopicListItem
