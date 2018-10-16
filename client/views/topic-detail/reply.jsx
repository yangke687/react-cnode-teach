import React from 'react'
import PropTypes from 'prop-types'
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core/styles'
import marked from 'marked'
import { replyStyle } from './styles'

const Reply = ({ reply, classes }) => (
  <div className={classes.root}>
    <div className={classes.left}>
      <Avatar src={reply.author.avatar_url} />
    </div>
    <div className={classes.right}>
      <span>
        {`${reply.author.loginname} ${reply.created_at}`}
      </span>
      <p dangerouslySetInnerHTML={{ __html: marked(reply.content) }} />
    </div>
  </div>
)

Reply.propTypes = {
  reply: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
}

export default withStyles(replyStyle)(Reply)